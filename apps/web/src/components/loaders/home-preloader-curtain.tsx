"use client";

import { cn } from "@repo/design-system/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const FRAME_IMAGES = [
  "/images/about-bg.png",
  "/images/minister.png",
  "/images/test.jpg",
  "/images/about-bg-2.png",
];

export const HomePreloaderCurtain = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    window.scrollTo(0, 0);

    setDimension({ width: window.innerWidth, height: window.innerHeight });

    const loadImages = async () => {
      const promises = FRAME_IMAGES.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve;
          })
      );
      await Promise.all(promises);
    };

    loadImages();

    const counterInterval = setInterval(() => {
      setCounter((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(counterInterval);
        return 100;
      });
    }, 25);

    const shuffleInterval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % FRAME_IMAGES.length);
    }, 150);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => {
      clearInterval(shuffleInterval);
      clearInterval(counterInterval);
      clearTimeout(timer);
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const unlockTimer = setTimeout(() => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
      }, 1000);

      return () => clearTimeout(unlockTimer);
    }
  }, [isLoading]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} 0 0 0 L0 0`;

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && dimension.width > 0 && (
          <>
            <motion.svg
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 z-9999 h-[calc(100%+300px)] w-full"
              key="curtain"
            >
              <motion.path
                exit="exit"
                fill="#112955"
                initial="initial"
                variants={{
                  initial: {
                    d: initialPath,
                    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
                  },
                  exit: {
                    d: targetPath,
                    transition: {
                      duration: 0.6,
                      ease: [0.76, 0, 0.24, 1],
                      delay: 0.1,
                    },
                  },
                }}
              />
            </motion.svg>

            <motion.div
              className="fixed inset-0 z-10000 flex cursor-wait items-center justify-center text-white"
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              initial={{ opacity: 1 }}
              key="preloader-content"
            >
              {dimension.width === 0 && (
                <div className="absolute inset-0 bg-black" />
              )}

              <div className="absolute top-10 right-10 left-10 flex justify-between font-mono text-sm uppercase tracking-widest mix-blend-difference">
                <span>Loading Assets</span>
                <span>{counter}%</span>
              </div>

              <div className="pointer-events-none relative flex items-center justify-center">
                <div className="relative h-[400px] w-[300px] overflow-hidden opacity-100 grayscale-0">
                  {FRAME_IMAGES.map((src, i) => (
                    <img
                      alt=""
                      className={cn(
                        "absolute inset-0 h-full w-full object-cover transition-opacity duration-0",
                        i === imgIndex ? "opacity-100" : "opacity-0"
                      )}
                      key={src}
                      src={src}
                    />
                  ))}
                </div>

                <div className="absolute z-30 text-center mix-blend-difference">
                  <MaskedText className="font-black font-times-new-roman text-6xl uppercase leading-[0.85] tracking-tighter md:text-8xl">
                    T.M. Anbarasan
                  </MaskedText>
                </div>
              </div>

              <div className="absolute bottom-10 w-full text-center font-mono text-sm uppercase tracking-widest mix-blend-difference">
                Grassroots Leader
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isLoading && <motion.div key="main-content">{children}</motion.div>}
      </AnimatePresence>
    </>
  );
};

const MaskedText = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <div className={cn("overflow-hidden", className)}>
    <motion.div
      animate={{
        y: 0,
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay },
      }}
      initial={{ y: "110%" }}
    >
      {children}
    </motion.div>
  </div>
);
