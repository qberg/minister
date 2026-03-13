"use server";

import config from "@payload-config";
import { headers } from "next/headers";
import { getPayload } from "payload";
import { requestOTP, verifyOtp } from "@/services/otp/otp.service";

export type SendOTPResult = {
  success: boolean;
  message: string;
  waitSeconds?: number;
  blockedUntil?: string;
};

export type VerifyOTPResult = {
  success: boolean;
  message: string;
  attemptsRemaining?: number;
};

export async function sendOTPAction(mobile: string): Promise<SendOTPResult> {
  try {
    const headerStore = await headers();
    const ip =
      headerStore.get("x-forwarded-for") ||
      headerStore.get("x-real-ip") ||
      "unknown";

    const payload = await getPayload({ config });
    const result = await requestOTP(payload, mobile, ip);

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        waitSeconds: result.waitSeconds,
        blockedUntil: result.blockedUntil?.toISOString(),
      };
    }

    // TODO: Send SMS here

    // for dev
    console.log(`[DEV] OTP for ${mobile}: ${result.otp}`);

    return {
      success: true,
      message: "OTP sent successfully",
    };
  } catch (error) {
    // biome-ignore lint: needed for debugging
    console.error("Send OTP error:", error);
    return {
      success: false,
      message: "Failed to send OTP. Please try again.",
    };
  }
}

export async function verifyOTPAction(
  mobile: string,
  otp: string
): Promise<VerifyOTPResult> {
  try {
    const payload = await getPayload({ config });
    const result = await verifyOtp(payload, mobile, otp);

    return {
      success: result.success,
      message: result.message,
      attemptsRemaining: result.attemptsRemaining,
    };
  } catch (error) {
    console.error("Verify OTP error:", error);
    return {
      success: false,
      message: "Failed to verify OTP. Please try again.",
    };
  }
}
