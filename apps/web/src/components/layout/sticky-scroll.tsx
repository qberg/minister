"use client";
import { cn } from "@repo/design-system/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import React from "react";

export type StickyScrollProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  overlayClassName?: string;
  gradientIntensity?: [number, number, number];
  showOverlay?: boolean;
};

const StickyScroll = ({
  children,
  className,
  contentClassName,
  overlayClassName,
  gradientIntensity = [0, 0.4, 0.7],
  showOverlay = true,
}: StickyScrollProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const gradientOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6],
    gradientIntensity
  );

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <motion.section
        className={cn(
          "sticky top-0 flex h-screen w-full items-center justify-center",
          contentClassName
        )}
      >
        {children}

        {showOverlay && (
          <motion.div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-transparent",
              overlayClassName
            )}
            style={{ opacity: gradientOpacity }}
          />
        )}
      </motion.section>
    </div>
  );
};

StickyScroll.displayName = "StickyScroll";

export { StickyScroll };
