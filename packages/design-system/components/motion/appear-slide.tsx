"use client";

import { cn } from "@repo/design-system/lib/utils";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

type AppearSlideProps = {
  children: React.ReactNode;
  visible?: boolean;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  variant?: "x" | "y";
};

const AppearSlide: React.FC<AppearSlideProps> = ({
  children,
  visible = true,
  className = "",
  delay = 0,
  duration = 1,
  once = true,
  variant = "y",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    amount: 0.01,
  });
  const shouldAnimate = isInView && visible;

  const getInitialState = () => {
    if (variant === "y") {
      return { y: "95%", opacity: 0 };
    }
    return { x: "-50%", opacity: 0 };
  };

  const getAnimateState = () => {
    if (variant === "y") {
      return shouldAnimate ? { y: "0%", opacity: 1 } : { y: "95%", opacity: 0 };
    }
    return shouldAnimate ? { x: "0%", opacity: 1 } : { x: "-50%", opacity: 0 };
  };

  return (
    <div className={cn(className, "inline-block w-full overflow-hidden")}>
      <motion.div
        animate={getAnimateState()}
        initial={getInitialState()}
        ref={ref}
        transition={{
          duration,
          delay,
          type: "spring",
          stiffness: 500,
          damping: 75,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export { AppearSlide };
