"ue client";

import { Typography } from "@repo/design-system/components/ui/typography";
import { cn } from "@repo/design-system/lib/utils";
import { motion } from "motion/react";

export function SurveyStepper({
  currentStepIndex,
  steps,
}: {
  currentStepIndex: number;
  steps: { label: string }[];
}) {
  return (
    <div className="mx-auto flex w-full items-start justify-between md:w-[80%]">
      {steps.map((step, idx) => {
        const isActive = idx === currentStepIndex;
        const isCompleted = idx < currentStepIndex;
        const isLast = idx === steps.length - 1;

        return (
          <div className="relative flex flex-1 flex-col items-center" key={idx}>
            {!isLast && (
              <div
                className={cn(
                  "-z-10 absolute top-[15px] left-[55%] h-px w-[90%]",
                  idx < currentStepIndex ? "bg-accent" : "bg-white/20"
                )}
              />
            )}

            {/* Circle Number */}
            <motion.div
              animate={{
                scale: isActive ? 1.1 : 1,
                backgroundColor:
                  isActive || isCompleted
                    ? "var(--color-accent)"
                    : "rgba(0, 0, 0 ,0)",
                borderColor:
                  isActive || isCompleted
                    ? "var(--color-accent)"
                    : "rgba(255,255,255,0.2)",
                color:
                  isActive || isCompleted
                    ? "var(--color-blue-950)"
                    : "rgba(255,255,255,0.5)",
              }}
              className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-black font-bold text-sm transition-colors"
              initial={false}
            >
              {isCompleted ? (
                // Checkmark for completed
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>SVG</title>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <span>{idx + 1}</span>
              )}
            </motion.div>

            <Typography
              as="span"
              className={cn(
                "mt-2 text-center font-medium text-xs tracking-wide transition-colors",
                isActive ? "text-accent" : "text-neutral-500"
              )}
            >
              {step.label}
            </Typography>
          </div>
        );
      })}
    </div>
  );
}
