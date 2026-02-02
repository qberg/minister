"use client";

import { cn } from "@repo/design-system/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export const PixelPageLoader = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const GRID_SIZE = 10;
  const COLOR = "bg-[#112955]";

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, 800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  const blocks = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i);

  return (
    <div className="relative min-h-screen w-full">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-10000 flex flex-wrap"
            exit={{ opacity: 0, transition: { duration: 0.1, delay: 1 } }}
            key="pixel-loader"
          >
            {blocks.map((i) => (
              <motion.div
                className={cn("relative", COLOR)}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.6,
                    delay: Math.random() * 0.5,
                    ease: [0.76, 0, 0.24, 1],
                  },
                }}
                initial={{ opacity: 1 }}
                key={i}
                style={{
                  width: `${100 / GRID_SIZE}%`, // Responsive width
                  height: `${100 / GRID_SIZE}%`, // Responsive height
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </div>
  );
};
