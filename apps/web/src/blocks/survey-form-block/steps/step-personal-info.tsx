"use client";

import { Typography } from "@repo/design-system/components/ui/typography";
import { cn } from "@repo/design-system/lib/utils";
import { useForm } from "@tanstack/react-form";
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react"; // Added useEffect
import { toast } from "sonner";
import { sendOTPAction } from "@/app/actions/otp-actions";
import { useSurveyFormStore } from "@/lib/stores/use-survey-form-store";
import { personalInfoSchema } from "@/lib/validations/survey.schema";
import type { SurveyBlock } from "@/payload-types";

type StepPersonalInfoProps = {
  block: SurveyBlock;
};

// biome-ignore lint: @typescript-eslint/no-explicit-any
const getErrorMessage = (error: any): string => {
  if (!error) {
    return "";
  }
  if (typeof error === "string") {
    return error;
  }
  if (typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return "Invalid value";
};

export function StepPersonalInfo({ block }: StepPersonalInfoProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Destructure personalInfo to set default values
  const { setPersonalInfo, goToNextStep, personalInfo } = useSurveyFormStore();

  const form = useForm({
    defaultValues: {
      name: personalInfo?.name || "",
      mobile: personalInfo?.mobile || "",
    },
    validators: {
      onChange: personalInfoSchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);

      try {
        const result = await sendOTPAction(value.mobile);

        if (!result.success) {
          toast.error(result.message);
          if (result.waitSeconds) {
            toast.error(`Please wait ${result.waitSeconds} seconds`);
          }
          return;
        }

        // Final sync on submit (redundant but safe)
        setPersonalInfo(value);
        toast.success("OTP sent successfully!");

        setTimeout(() => {
          goToNextStep();
        }, 300);
      } catch (_error) {
        toast.error("Failed to send OTP. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  // --- SYNC LOGIC START ---
  // This ensures that as the user types, the Zustand store is updated.
  // When they navigate back, the store persists these values.
  useEffect(() => {
    const unsubscribe = form.store.subscribe(() => {
      const { values } = form.state;
      setPersonalInfo({
        name: values.name,
        mobile: values.mobile,
      });
    });
    return () => unsubscribe();
  }, [form, setPersonalInfo]);
  // --- SYNC LOGIC END ---

  return (
    <motion.form
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
      initial={{ opacity: 0, y: 20 }}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Name Field */}
      <form.Field
        name="name"
        validators={{
          onChange: personalInfoSchema.shape.name,
        }}
      >
        {(field) => (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-2 md:gap-4"
            initial={{ opacity: 0, x: -20 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <label className="pl-1 opacity-80" htmlFor={field.name}>
              <Typography as={"span"} intent={"title"} variant={"headingXXS"}>
                {block.nameLabel}
              </Typography>
            </label>

            <div className="group relative">
              <input
                className={cn(
                  "w-full rounded-full px-5 py-4 text-base md:text-lg",
                  // Colors & Glassmorphism (Adapted to theme-dark)
                  "bg-neutral-950/20 backdrop-blur-md",
                  "text-body placeholder:text-neutral-500",
                  "border border-neutral-200/10",
                  // Interaction
                  "focus:border-accent/60 focus:bg-neutral-950/40 focus:outline-none focus:ring-1 focus:ring-accent/20",
                  "transition-all duration-300 ease-out",
                  // Error State
                  field.state.meta.isTouched && !field.state.meta.isValid
                    ? "border-red-500/50 text-red-100 focus:border-red-500 focus:ring-red-500/20"
                    : "hover:border-neutral-200/20"
                )}
                disabled={isLoading}
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={block.namePlaceholder || "Enter your full name"}
                value={field.state.value}
              />

              <AnimatePresence>
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    className="-translate-y-1/2 absolute top-1/2 right-4 text-red-400"
                    exit={{ opacity: 0, scale: 0.8 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AlertCircle className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <motion.p
                    animate={{ opacity: 1, y: 0 }}
                    className="pl-1 font-medium text-red-400 text-sm"
                    exit={{ opacity: 0, y: -10 }}
                    initial={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {getErrorMessage(field.state.meta.errors[0])}
                  </motion.p>
                )}
            </AnimatePresence>
          </motion.div>
        )}
      </form.Field>

      {/* Mobile Field */}
      <form.Field
        name="mobile"
        validators={{
          onChange: personalInfoSchema.shape.mobile,
        }}
      >
        {(field) => (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-2 md:gap-4"
            initial={{ opacity: 0, x: -20 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <label className="pl-1 opacity-80" htmlFor={field.name}>
              <Typography as={"span"} intent={"title"} variant={"headingXXS"}>
                {block.mobileLabel}
              </Typography>
            </label>

            <div className="group relative">
              <span className="-translate-y-1/2 absolute top-1/2 left-5 font-heading text-body-subtle/50 text-lg transition-colors duration-300 group-focus-within:text-accent/80">
                +91
              </span>
              <input
                className={cn(
                  // Layout & Shape
                  "w-full rounded-full px-5 py-4 pl-14 text-base tracking-wider md:text-lg",
                  // Colors & Glassmorphism
                  "bg-neutral-950/20 backdrop-blur-md",
                  "text-body placeholder:text-neutral-500",
                  "border border-neutral-200/10",
                  // Interaction
                  "focus:border-accent/60 focus:bg-neutral-950/40 focus:outline-none focus:ring-1 focus:ring-accent/20",
                  "transition-all duration-300 ease-out",
                  // Error State
                  field.state.meta.isTouched && !field.state.meta.isValid
                    ? "border-red-500/50 text-red-100 focus:border-red-500 focus:ring-red-500/20"
                    : "hover:border-neutral-200/20"
                )}
                disabled={isLoading}
                id={field.name}
                inputMode="numeric"
                maxLength={10}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  field.handleChange(value);
                }}
                placeholder={block.mobilePlaceholder || "98XXXXXXXX"}
                type="tel"
                value={field.state.value}
              />

              <AnimatePresence>
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    className="-translate-y-1/2 absolute top-1/2 right-4 text-red-400"
                    exit={{ opacity: 0, scale: 0.8 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AlertCircle className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <motion.p
                    animate={{ opacity: 1, y: 0 }}
                    className="pl-1 font-medium text-red-400 text-sm"
                    exit={{ opacity: 0, y: -10 }}
                    initial={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {getErrorMessage(field.state.meta.errors[0])}
                  </motion.p>
                )}
            </AnimatePresence>
          </motion.div>
        )}
      </form.Field>

      {/* Submit Button (Brand Themed) */}
      <form.Subscribe selector={(state) => [state.canSubmit]}>
        {([canSubmit]) => (
          <motion.button
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "relative mx-auto w-full cursor-pointer overflow-hidden rounded-full py-4 font-body font-bold text-lg md:w-[50%]",
              "flex items-center justify-center gap-2",
              "transition-all duration-300 ease-out",
              canSubmit && !isLoading
                ? "bg-white/85 text-blue-950 shadow-accent/20 shadow-lg hover:bg-accent/90 hover:shadow-accent/40 active:scale-[0.98]"
                : "cursor-not-allowed border border-white/5 bg-neutral-800/50 text-neutral-500"
            )}
            disabled={!canSubmit || isLoading}
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            type="submit"
            whileTap={canSubmit && !isLoading ? { scale: 0.98 } : {}}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  animate={{ opacity: 1, rotate: 0 }}
                  className="flex items-center gap-2"
                  exit={{ opacity: 0, rotate: 180 }}
                  initial={{ opacity: 0, rotate: -180 }}
                  key="loading"
                >
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>{block.loadingSendOtp || "Sending..."}</span>
                </motion.div>
              ) : (
                <motion.div
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                  exit={{ opacity: 0, x: 10 }}
                  initial={{ opacity: 0, x: -10 }}
                  key="ready"
                >
                  <span>
                    {block.personalInfoCta || "Get Verification Code"}
                  </span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </form.Subscribe>
    </motion.form>
  );
}
