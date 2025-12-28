"use client";

import { Typography } from "@repo/design-system/components/ui/typography";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  text: string;
  className?: string;
};

export function AnimatedHeading({ text, className }: Props) {
  return (
    <div className="relative overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -25, filter: "blur(4px)" }}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          key={text}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          }}
        >
          <Typography as="h2" className={className} variant="headingLG">
            {text}
          </Typography>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
