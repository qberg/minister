"use client";

import { motion } from "motion/react";

function Title({ text }: { text: string }) {
  return (
    <motion.h1 className="font-times-new-roman text-[12vw] leading-[0.8] tracking-tighter opacity-90 mix-blend-multiply">
      {text || "VISIONARY"}
    </motion.h1>
  );
}

export default Title;
