"use client";

import { motion } from "motion/react";

const StaggerItem = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    animate={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 20 }}
    transition={{
      duration: 0.6,
      delay,
      // biome-ignore lint: magic numbers
      ease: [0.76, 0, 0.24, 1],
    }}
  >
    {children}
  </motion.div>
);

export default StaggerItem;
