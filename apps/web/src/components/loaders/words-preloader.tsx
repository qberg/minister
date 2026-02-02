"use client";

import { cn } from "@repo/design-system/lib/utils";
import { useTranslations } from "@repo/i18n";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useEffect, useState } from "react";

export const WordsPreloader = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      document.body.style.cursor = "wait";
    } else {
      document.body.style.overflow = "";
      document.body.style.cursor = "default";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.cursor = "default";
    };
  }, [isLoading]);

  return (
    <div className="relative min-h-screen w-full">
      {children}

      <AnimatePresence mode="wait">
        {isLoading && (
          <PreloaderOverlay onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

const PreloaderOverlay = ({ onComplete }: { onComplete: () => void }) => {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const t = useTranslations("WordsPreloader");
  const words = t.raw("words") as string[];

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (index === words.length - 1) {
      const timeout = setTimeout(onComplete, 800);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(
      () => {
        setIndex(index + 1);
      },
      index === 0 ? 1000 : 150
    );

    return () => clearTimeout(timeout);
  }, [index, onComplete, words.length]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curveVariants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  } as const;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-primary"
      exit="exit"
      initial="initial"
      variants={{
        initial: { top: 0 },
        exit: {
          top: "-100vh",
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
        },
      }}
    >
      {dimension.width > 0 && (
        <>
          <motion.p
            animate="enter"
            className={cn(
              "absolute z-10 flex items-center gap-2 font-bold text-5xl tracking-tighter md:text-6xl",
              "text-primary-foreground"
            )}
            exit="exit"
            initial="initial"
            key={index}
            variants={{
              initial: { opacity: 0, y: 10 },
              enter: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 },
              },
              exit: {
                opacity: 0,
                transition: { duration: 0.5 },
              },
            }}
          >
            <span className="mt-2 mr-4 inline-block h-3 w-3 rounded-full bg-secondary" />
            {words[index]}
          </motion.p>

          <svg className="pointer-events-none absolute top-0 h-[calc(100%+300px)] w-full">
            <motion.path
              className="fill-[#112955]"
              exit="exit"
              initial="initial"
              variants={curveVariants}
            />
          </svg>
        </>
      )}
    </motion.div>
  );
};
