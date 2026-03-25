"use client";

import { Typography } from "@repo/design-system/components/ui/typography";
import { cn } from "@repo/design-system/lib/utils";
import { useForm } from "@tanstack/react-form";
import { AlertCircle, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useSurveyFormStore } from "@/lib/stores/use-survey-form-store";
import { getErrorMessage } from "@/lib/survey-utils";
import { personalInfoSchema } from "@/lib/validations/survey.schema";
import type { SurveyBlock } from "@/payload-types";

type Props = { block: SurveyBlock };

export function StepPersonalInfo({ block }: Props) {
  const { setPersonalInfo, goToNextStep, personalInfo } = useSurveyFormStore();

  const form = useForm({
    defaultValues: {
      name: personalInfo?.name || "",
      mobile: personalInfo?.mobile || "",
    },
    validators: { onChange: personalInfoSchema },
    onSubmit: ({ value }) => {
      setPersonalInfo(value); // sync on submit only
      goToNextStep();
    },
  });

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
        validators={{ onChange: personalInfoSchema.shape.name }}
      >
        {(field) => (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-2 md:gap-4"
            initial={{ opacity: 0, x: -20 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <label className="pl-1 opacity-80" htmlFor={field.name}>
              <Typography as="span" intent="title" variant="headingXXS">
                {block.nameLabel}
              </Typography>
            </label>
            <div className="group relative">
              <input
                className={cn(
                  "w-full rounded-full px-5 py-4 text-base md:text-lg",
                  "bg-neutral-950/20 text-body backdrop-blur-md placeholder:text-neutral-500",
                  "border border-neutral-200/10",
                  "focus:border-accent/60 focus:bg-neutral-950/40 focus:outline-none focus:ring-1 focus:ring-accent/20",
                  "transition-all duration-300 ease-out",
                  field.state.meta.isTouched && !field.state.meta.isValid
                    ? "border-red-500/50 text-red-100 focus:border-red-500 focus:ring-red-500/20"
                    : "hover:border-neutral-200/20"
                )}
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
        validators={{ onChange: personalInfoSchema.shape.mobile }}
      >
        {(field) => (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-2 md:gap-4"
            initial={{ opacity: 0, x: -20 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <label className="pl-1 opacity-80" htmlFor={field.name}>
              <Typography as="span" intent="title" variant="headingXXS">
                {block.mobileLabel}
              </Typography>
            </label>
            <div className="group relative">
              <span className="-translate-y-1/2 absolute top-1/2 left-5 font-heading text-body-subtle/50 text-lg transition-colors duration-300 group-focus-within:text-accent/80">
                +91
              </span>
              <input
                className={cn(
                  "w-full rounded-full px-5 py-4 pl-14 text-base tracking-wider md:text-lg",
                  "bg-neutral-950/20 text-body backdrop-blur-md placeholder:text-neutral-500",
                  "border border-neutral-200/10",
                  "focus:border-accent/60 focus:bg-neutral-950/40 focus:outline-none focus:ring-1 focus:ring-accent/20",
                  "transition-all duration-300 ease-out",
                  field.state.meta.isTouched && !field.state.meta.isValid
                    ? "border-red-500/50 text-red-100 focus:border-red-500 focus:ring-red-500/20"
                    : "hover:border-neutral-200/20"
                )}
                id={field.name}
                inputMode="numeric"
                maxLength={10}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) =>
                  field.handleChange(e.target.value.replace(/\D/g, ""))
                }
                placeholder={block.mobilePlaceholder || "98XXXXXXXX"}
                type="tel"
                value={field.state.value}
              />
            </div>
            <AnimatePresence mode="wait">
              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <motion.p
                    animate={{ opacity: 1, y: 0 }}
                    className="pl-1 font-medium text-red-400 text-sm"
                    exit={{ opacity: 0, y: -10 }}
                    initial={{ opacity: 0, y: -10 }}
                  >
                    {getErrorMessage(field.state.meta.errors[0])}
                  </motion.p>
                )}
            </AnimatePresence>
          </motion.div>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => [state.canSubmit]}>
        {([canSubmit]) => (
          <motion.button
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "relative mx-auto w-full cursor-pointer overflow-hidden rounded-full py-2 font-body font-bold text-lg md:w-[50%] md:py-3 2xl:py-4",
              "flex items-center justify-center gap-2 transition-all duration-300 ease-out",
              canSubmit
                ? "bg-white/85 text-blue-950 shadow-accent/20 shadow-lg hover:bg-accent/90"
                : "cursor-not-allowed border border-white/5 bg-neutral-800/50 text-neutral-500"
            )}
            disabled={!canSubmit}
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            type="submit"
            whileTap={canSubmit ? { scale: 0.98 } : {}}
          >
            <span>{block.personalInfoCta || "Continue"}</span>
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
          </motion.button>
        )}
      </form.Subscribe>
    </motion.form>
  );
}
