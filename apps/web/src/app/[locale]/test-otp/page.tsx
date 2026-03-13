// src/app/[locale]/test-otp/page.tsx

import { TestOTPForm } from "@/components/test-otp-form";

export default function TestOTPPage() {
  return (
    <main className="container mx-auto max-w-2xl py-16">
      <div className="space-y-6">
        <div>
          <h1 className="font-bold text-3xl">OTP Service Test</h1>
          <p className="mt-2 text-muted-foreground">
            Testing Server Actions integration
          </p>
        </div>

        <TestOTPForm />
      </div>
    </main>
  );
}
