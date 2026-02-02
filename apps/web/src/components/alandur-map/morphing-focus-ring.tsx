"use client";

import { motion } from "motion/react";

type Props = {
  d: string;
};

function MorphingFocusRing({ d }: Props) {
  return (
    <motion.path
      animate={{ d }}
      fill="none"
      filter="drop-shadow(0px 0px 4px rgba(37, 99, 235, 0.5))"
      stroke="#2563EB" // Blue-600
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      style={{ zIndex: 50, pointerEvents: "none" }}
      // Optional: Add a glow filter
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 1,
      }}
    />
  );
}

export default MorphingFocusRing;
