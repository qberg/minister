import type { Payload } from "payload";
import { requestOTP, verifyOtp } from "@/services/otp/otp.service";

export const testOTPFlow = async (payload: Payload) => {
  payload.logger.info("Starting OTP service tests...");

  const testMobile = "9876543210";
  let testsRun = 0;
  let testsPassed = 0;
  let testsFailed = 0;

  try {
    // Test 1: Request OTP
    payload.logger.info("Test 1: Requesting OTP");
    const request1 = await requestOTP(payload, testMobile, "127.0.0.1");
    testsRun++;

    if (!(request1.success && request1.otp)) {
      payload.logger.error("FAILED: OTP generation failed");
      testsFailed++;
      throw new Error("OTP not generated");
    }

    payload.logger.info(`PASSED: OTP generated: ${request1.otp}`);
    payload.logger.info(`Message: ${request1.message}`);
    testsPassed++;

    const validOTP = request1.otp;

    // Test 2: Rate limiting
    payload.logger.info("Test 2: Testing rate limiting (should fail)");
    const request2 = await requestOTP(payload, testMobile, "127.0.0.1");
    testsRun++;

    if (request2.success) {
      payload.logger.error("FAILED: Rate limiting not working");
      testsFailed++;
      throw new Error("Rate limiting bypass detected");
    }

    payload.logger.info("PASSED: Request blocked by rate limit");
    payload.logger.info(`Wait time: ${request2.waitSeconds} seconds`);
    testsPassed++;

    // Test 3: Wrong OTP
    payload.logger.info("Test 3: Verifying wrong OTP (should fail)");
    const wrongVerify = await verifyOtp(payload, testMobile, "000000");
    testsRun++;

    if (wrongVerify.success) {
      payload.logger.error("FAILED: Wrong OTP was accepted");
      testsFailed++;
      throw new Error("Invalid OTP verification");
    }

    payload.logger.info("PASSED: Wrong OTP rejected");
    payload.logger.info(`Attempts remaining: ${wrongVerify.attemptsRemaining}`);
    testsPassed++;

    // Test 4: Correct OTP
    payload.logger.info("Test 4: Verifying correct OTP (should succeed)");
    const correctVerify = await verifyOtp(payload, testMobile, validOTP);
    testsRun++;

    if (!correctVerify.success) {
      payload.logger.error("FAILED: Valid OTP was rejected");
      testsFailed++;
      throw new Error("Valid OTP verification failed");
    }

    payload.logger.info("PASSED: OTP verified successfully");
    testsPassed++;

    // Test 5: Reuse OTP
    payload.logger.info("Test 5: Testing OTP reuse (should fail)");
    const reuseVerify = await verifyOtp(payload, testMobile, validOTP);
    testsRun++;

    if (reuseVerify.success) {
      payload.logger.error("FAILED: Verified OTP was reusable");
      testsFailed++;
      throw new Error("OTP reuse not prevented");
    }

    payload.logger.info("PASSED: OTP reuse blocked");
    testsPassed++;

    // Summary
    payload.logger.info("---");
    payload.logger.info("Test Summary:");
    payload.logger.info(`Total: ${testsRun}`);
    payload.logger.info(`Passed: ${testsPassed}`);
    payload.logger.info(`Failed: ${testsFailed}`);
    payload.logger.info("---");
    payload.logger.info("All OTP service tests passed");
    payload.logger.info(
      "Check admin panel: /admin/collections/otp-verifications"
    );
  } catch (error) {
    payload.logger.error("Test suite failed");
    payload.logger.error(`Tests run: ${testsRun}`);
    payload.logger.error(`Tests passed: ${testsPassed}`);
    payload.logger.error(`Tests failed: ${testsFailed}`);
    throw error;
  }
};
