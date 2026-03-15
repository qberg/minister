"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@repo/design-system/components/ui/input-otp";
import { Typography } from "@repo/design-system/components/ui/typography";
import { cn } from "@repo/design-system/lib/utils";
import { useForm } from "@tanstack/react-form";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Loader2,
  RefreshCcw,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { sendOTPAction, verifyOTPAction } from "@/app/actions/otp-actions";
import { useSurveyFormStore } from "@/lib/stores/use-survey-form-store";
import { otpSchema } from "@/lib/validations/survey.schema";
import type { SurveyBlock } from "@/payload-types";

type Props = {
  block: SurveyBlock;
};

export function StepOtpVerification({ block }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(30);

  const {
    personalInfo,
    setOTP,
    setOTPVerified,
    goToNextStep,
    goToPreviousStep,
    otp,
  } = useSurveyFormStore();

  // Handle Resend Countdown
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const form = useForm({
    defaultValues: { otp: otp?.otp || "" },
    validators: { onChange: otpSchema },
    onSubmit: async ({ value }) => {
      if (!personalInfo?.mobile) {
        toast.error("Mobile number missing. Please go back.");
        return;
      }

      setIsLoading(true);
      try {
        const result = await verifyOTPAction(personalInfo.mobile, value.otp);

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        setOTP({ otp: value.otp });
        setOTPVerified(true);
        toast.success("Identity Verified!");

        setTimeout(() => goToNextStep(), 300);
      } catch (error) {
        toast.error("Verification failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Sync Logic
  useEffect(() => {
    const unsubscribe = form.store.subscribe(() => {
      setOTP({ otp: form.state.values.otp });
    });
    return () => unsubscribe();
  }, [form, setOTP]);

  const handleResendOtp = async () => {
    if (resendCountdown > 0 || !personalInfo?.mobile) {
      return;
    }

    const toastId = toast.loading("Resending code...");
    const res = await sendOTPAction(personalInfo.mobile);

    if (res.success) {
      toast.success("Code sent!", { id: toastId });
      setResendCountdown(30);
    } else {
      toast.error(res.message, { id: toastId });
    }
  };

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8 px-2 md:px-0"
      initial={{ opacity: 0, y: 20 }}
    >
      {/* 1. Context Header */}
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
          <Typography className="text-neutral-400 text-sm" variant="bodySM">
            Sent to{" "}
            <span className="font-mono text-white tracking-wide">
              +91 {personalInfo?.mobile}
            </span>
          </Typography>
          <button
            aria-label="Change number"
            className="ml-1 rounded-full bg-white/10 p-1 transition-colors hover:bg-white/20"
            onClick={goToPreviousStep}
            type="button"
          >
            <ArrowLeft className="h-3 w-3 text-accent" />
          </button>
        </div>
      </div>

      {/* 2. OTP Input Form */}
      <form
        className="flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field name="otp">
          {(field) => (
            <div className="group relative flex justify-center">
              <InputOTP
                autoComplete="one-time-code"
                disabled={isLoading}
                maxLength={6}
                onChange={(val) => {
                  field.handleChange(val);
                  if (val.length === 6) {
                    form.handleSubmit();
                  }
                }}
                value={field.state.value}
              >
                <InputOTPGroup className="gap-1 sm:gap-3">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <InputOTPSlot
                      className={cn(
                        "h-12 w-10 rounded-xl sm:h-14 sm:w-12",
                        "border-2",

                        // 2. Glassmorphism & Colors
                        "bg-neutral-950/20 backdrop-blur-md",
                        "border-white/25 font-bold text-white text-xl",

                        "first:rounded-xl last:rounded-xl",
                        "border-y border-r border-l",

                        // 4. Active State Animation
                        "transition-all duration-200",
                        "data-[active=true]:scale-105 data-[active=true]:border-accent data-[active=true]:ring-0",
                        "data-[active=true]:shadow-[0_0_15px_rgba(var(--color-accent),0.3)]",
                        "data-[active=true]:z-10",

                        // 5. Error State
                        field.state.meta.errors.length > 0 &&
                          "border-red-500/50 text-red-100"
                      )}
                      index={index}
                      key={index}
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>

              {/* Error Message */}
              <AnimatePresence>
                {field.state.meta.errors.length > 0 && (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="-bottom-8 absolute right-0 left-0 flex items-center justify-center gap-2 font-medium text-red-400 text-sm"
                    initial={{ opacity: 0, y: -10 }}
                  >
                    <AlertCircle className="h-4 w-4" />
                    <span>{String(field.state.meta.errors[0])}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </form.Field>

        {/* 3. Actions */}
        <div className="space-y-4">
          <form.Subscribe selector={(state) => [state.canSubmit]}>
            {([canSubmit]) => (
              <motion.button
                className={cn(
                  "relative w-full overflow-hidden rounded-full py-4 font-body font-bold text-lg",
                  "flex items-center justify-center gap-2",
                  "transition-all duration-300 ease-out",
                  canSubmit && !isLoading
                    ? "bg-white/90 text-blue-950 shadow-accent/20 shadow-lg hover:bg-accent hover:shadow-accent/40"
                    : "cursor-not-allowed border border-white/5 bg-neutral-800/50 text-neutral-500"
                )}
                disabled={!canSubmit || isLoading}
                whileTap={canSubmit && !isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>{block.loadingVerifyOtp || "Verifying..."}</span>
                  </>
                ) : (
                  <>
                    <span>{block.otpCta || "Verify Identity"}</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </motion.button>
            )}
          </form.Subscribe>

          {/* Resend Button */}
          <div className="flex justify-center">
            <button
              className={cn(
                "flex items-center gap-2 font-medium text-sm transition-colors",
                resendCountdown > 0
                  ? "cursor-not-allowed text-neutral-600"
                  : "text-accent hover:text-accent/80 hover:underline"
              )}
              disabled={resendCountdown > 0}
              onClick={handleResendOtp}
              type="button"
            >
              {resendCountdown > 0 ? (
                <>
                  <RefreshCcw className="h-3 w-3 animate-spin duration-[3000ms]" />
                  Resend code in 00:
                  {resendCountdown.toString().padStart(2, "0")}
                </>
              ) : (
                block.resendOtpCta || "Resend Code"
              )}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
