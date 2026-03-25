"use client";

import { Typography } from "@repo/design-system/components/ui/typography";
import { cn } from "@repo/design-system/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useSurveyFormStore } from "@/lib/stores/use-survey-form-store";
import type { SurveyBlock } from "@/payload-types";

type Props = { block: SurveyBlock };

export function StepSuccess({ block }: Props) {
  const reset = useSurveyFormStore((s) => s.reset);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-6 py-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        animate={{ scale: 1, opacity: 1 }}
        initial={{ scale: 0.5, opacity: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
      >
        <CheckCircle2 className="h-16 w-16 text-accent" />
      </motion.div>

      <div className="flex flex-col gap-2">
        <Typography as="h3" intent="title" variant="headingMD">
          {block.successTitle}
        </Typography>
        <Typography as="p" intent="subtle" variant="headingXXS">
          {block.successDesc}
        </Typography>
      </div>

      <motion.button
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "mx-auto w-full rounded-full py-4 font-body font-bold text-lg md:w-[60%]",
          "flex items-center justify-center",
          "bg-white/85 text-blue-950 shadow-accent/20 shadow-lg",
          "transition-all duration-300 hover:bg-accent/90"
        )}
        initial={{ opacity: 0, y: 20 }}
        onClick={reset}
        transition={{ delay: 0.4, duration: 0.3 }}
        whileTap={{ scale: 0.98 }}
      >
        {block.successCta || "Submit Another Vision"}
      </motion.button>
    </motion.div>
  );
}
