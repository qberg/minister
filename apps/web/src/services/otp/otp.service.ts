import crypto from "node:crypto";
import type { Payload } from "payload";
import { OTP_CONFIG } from "./otp.constants";
import type { OTPRequestResult, OTPVerifyResult } from "./otp.types";

function hashOtp(otp: string): string {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

function generateOTP(): string {
  const buffer = crypto.randomBytes(4);
  const num = buffer.readUInt32BE(0);
  return (num % 1_000_000).toString().padStart(OTP_CONFIG.LENGTH, "0");
}

export async function requestOTP(
  payload: Payload,
  mobile: string,
  ipAddress?: string
): Promise<OTPRequestResult> {
  const now = new Date();

  const blockedRecord = await payload.find({
    collection: "otp-verifications",
    where: {
      mobile: { equals: mobile },
      blockedUntil: { greater_than: now.toISOString() },
    },
    limit: 1,
    overrideAccess: true,
  });

  if (blockedRecord.docs.length > 0) {
    const doc = blockedRecord.docs[0];
    const blockedUntilStr = doc.blockedUntil || now.toISOString();
    const blockedUntil = new Date(blockedUntilStr);

    const waitSeconds = Math.ceil(
      (blockedUntil.getTime() - now.getTime()) / 1000
    );

    return {
      success: false,
      message: "Too many failed attempts. Please try again later.",
      blockedUntil,
      waitSeconds,
    };
  }

  const rateLimitCheck = new Date(
    now.getTime() - OTP_CONFIG.RATE_LIMIT_WINDOW_SECONDS * 1000
  );

  const recentRequests = await payload.find({
    collection: "otp-verifications",
    where: {
      mobile: { equals: mobile },
      createdAt: { greater_than: rateLimitCheck.toISOString() },
    },
    limit: 1,
    overrideAccess: true,
  });

  if (recentRequests.docs.length > 0) {
    const doc = recentRequests.docs[0];
    // biome-ignore lint: need
    const lastRequest = new Date(doc.createdAt!);

    const waitSeconds = Math.ceil(
      OTP_CONFIG.RATE_LIMIT_WINDOW_SECONDS -
        (now.getTime() - lastRequest.getTime()) / 1000
    );

    return {
      success: false,
      message: "Please wait before requesting a new OTP.",
      waitSeconds,
    };
  }

  const otp = generateOTP();
  const otpHash = hashOtp(otp);
  const expiresAt = new Date(
    now.getTime() + OTP_CONFIG.EXPIRY_MINUTES * 60 * 1000
  );

  const existingOTPs = await payload.find({
    collection: "otp-verifications",
    where: {
      mobile: { equals: mobile },
      verified: { equals: false },
    },
    overrideAccess: true,
  });

  await Promise.all(
    existingOTPs.docs.map((doc) =>
      payload.update({
        collection: "otp-verifications",
        id: doc.id,
        data: { expiresAt: now.toISOString() },
        overrideAccess: true,
      })
    )
  );

  await payload.create({
    collection: "otp-verifications",
    data: {
      mobile,
      otpHash,
      expiresAt: expiresAt.toISOString(),
      verified: false,
      attempts: 0,
      maxAttempts: 3,
      ipAddress,
    },
    overrideAccess: true,
  });

  return {
    success: true,
    otp,
    message: "OTP sent successfully",
  };
}

export async function verifyOtp(
  payload: Payload,
  mobile: string,
  otp: string
): Promise<OTPVerifyResult> {
  const now = new Date();
  const otpHash = hashOtp(otp);

  const records = await payload.find({
    collection: "otp-verifications",
    where: {
      mobile: { equals: mobile },
      verified: { equals: false },
      expiresAt: { greater_than: now.toISOString() },
    },
    sort: "-createdAt",
    limit: 1,
    overrideAccess: true,
  });

  if (records.docs.length === 0) {
    return {
      success: false,
      message: "Invalid or expired OTP",
    };
  }

  const record = records.docs[0];

  const maxAttempts = record.maxAttempts || 3;

  if (record.attempts >= maxAttempts) {
    const blockedUntil = new Date(
      now.getTime() + OTP_CONFIG.BLOCK_DURATION_MINUTES * 60 * 1000
    );

    await payload.update({
      collection: "otp-verifications",
      id: record.id,
      data: {
        blockedUntil: blockedUntil.toISOString(),
      },
      overrideAccess: true,
    });

    return {
      success: false,
      message: "Maximum attempts exceeded. Account blocked temporarily.",
    };
  }

  if (record.otpHash !== otpHash) {
    const newAttempts = record.attempts + 1;
    await payload.update({
      collection: "otp-verifications",
      id: record.id,
      data: {
        attempts: newAttempts,
      },
      overrideAccess: true,
    });

    const attemptsRemaining = maxAttempts - newAttempts;

    return {
      success: false,
      message: "Invalid OTP",
      attemptsRemaining: Math.max(0, attemptsRemaining),
    };
  }

  await payload.update({
    collection: "otp-verifications",
    id: record.id,
    data: {
      verified: true,
    },
    overrideAccess: true,
  });

  return {
    success: true,
    message: "OTP verified successfully",
  };
}
