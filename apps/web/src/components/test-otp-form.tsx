"use client";

import { useState } from "react";
import { sendOTPAction, verifyOTPAction } from "@/app/actions/otp-actions";

export function TestOTPForm() {
  const [mobile, setMobile] = useState("9876543210");
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await sendOTPAction(mobile);
      setResult(res);
    } catch (_error) {
      setResult({ success: false, message: "Error calling action" });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await verifyOTPAction(mobile, otp);
      setResult(res);
    } catch (error) {
      setResult({ success: false, message: "Error calling action" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 rounded-lg border p-6">
      {/* Mobile Input */}
      <div className="space-y-2">
        <label className="font-medium text-sm" htmlFor="mobile">
          Mobile Number
        </label>
        <input
          className="w-full rounded-md border px-3 py-2"
          id="mobile"
          maxLength={10}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="9876543210"
          type="text"
          value={mobile}
        />
      </div>

      {/* Send OTP Button */}
      <button
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        disabled={loading || mobile.length !== 10}
        onClick={handleSendOTP}
      >
        {loading ? "Sending..." : "Send OTP"}
      </button>

      {/* OTP Input */}
      <div className="space-y-2">
        <label className="font-medium text-sm" htmlFor="otp">
          Enter OTP (check console for dev OTP)
        </label>
        <input
          className="w-full rounded-md border px-3 py-2"
          id="otp"
          maxLength={6}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="123456"
          type="text"
          value={otp}
        />
      </div>

      {/* Verify OTP Button */}
      <button
        className="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
        disabled={loading || otp.length !== 6}
        onClick={handleVerifyOTP}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      {/* Result Display */}
      {result && (
        <div
          className={`rounded-md p-4 ${
            result.success
              ? "border border-green-200 bg-green-50 text-green-900"
              : "border border-red-200 bg-red-50 text-red-900"
          }`}
        >
          <p className="font-medium">{result.success ? "Success" : "Failed"}</p>
          <p className="mt-1 text-sm">{result.message}</p>
          {result.waitSeconds && (
            <p className="mt-1 text-sm">Wait {result.waitSeconds} seconds</p>
          )}
          {result.attemptsRemaining !== undefined && (
            <p className="mt-1 text-sm">
              Attempts remaining: {result.attemptsRemaining}
            </p>
          )}
        </div>
      )}

      {/* Raw Response */}
      {result && (
        <details className="text-xs">
          <summary className="cursor-pointer text-muted-foreground">
            View raw response
          </summary>
          <pre className="mt-2 overflow-auto rounded bg-gray-100 p-2">
            {JSON.stringify(result, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}
