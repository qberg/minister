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
    // 1. Lock scroll
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    // 2. Set dimensions
    setDimension({ width: window.innerWidth, height: window.innerHeight });

    // 3. Load Images
    const loadImages = async () => {
      const promises = FRAME_IMAGES.map(
        (src) =>
          new Promise((resolve, _) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve;
          })
      );
      await Promise.all(promises);
    };

    loadImages();

    // 4. Counter & Logic
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

    // 5. Cleanup and Exit
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => {
      clearInterval(shuffleInterval);
      clearInterval(counterInterval);
      clearTimeout(timer);

      setTimeout(() => {
        document.body.style.overflow = "";
      }, 1000);
    };
  }, []);

  // SVG Curve Logic
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;

  // The target path pulls the curve UPPPPP
  // We set Q control point to 0 to flatten it at the top.
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} 0 0 0 L0 0`;

  return (
    <>
      {/* PRELOADER LAYER 
        We use AnimatePresence to handle the exit animation. go away in style
      */}
      <AnimatePresence mode="wait">
        {isLoading && dimension.width > 0 && (
          <>
            {/* LAYER 1: THE CURTAIN (SVG) 
               - This is a direct child of AnimatePresence (via the fragment).
               - It has its own exit animation (lifting up).
            */}
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

            {/* LAYER 2: THE CONTENT (Text/Images) 
               - This sits ON TOP of the curtain (z-[10000]).
               - Its exit animation is a simple fade out.
               - Crucially: It fades out BEFORE the curtain lifts (no delay on exit).
            */}
            <motion.div
              className="fixed inset-0 z-10000 flex cursor-wait items-center justify-center text-white"
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              initial={{ opacity: 1 }}
              key="preloader-content"
            >
              {/* Background Solid Fill (Failsafe before SVG loads) */}
              {dimension.width === 0 && (
                <div className="absolute inset-0 bg-black" />
              )}

              {/* Top: Counter */}
              <div className="absolute top-10 right-10 left-10 flex justify-between font-mono text-sm uppercase tracking-widest mix-blend-difference">
                <span>Loading Assets</span>
                <span>{counter}%</span>
              </div>

              {/* Center: Image Shuffle & Name */}
              <div className="pointer-events-none relative flex items-center justify-center">
                {/* Images */}
                <div className="relative h-[400px] w-[300px] overflow-hidden opacity-100 grayscale-0">
                  {FRAME_IMAGES.map((src, i) => (
                    // biome-ignore lint: need for anim
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

                {/* Text Overlay */}
                <div className="absolute z-30 text-center mix-blend-difference">
                  <MaskedText className="font-black font-times-new-roman text-6xl uppercase leading-[0.85] tracking-tighter md:text-8xl">
                    T.M. Anbarasan
                  </MaskedText>
                </div>
              </div>

              {/* Bottom: Label */}
              <div className="absolute bottom-10 w-full text-center font-mono text-sm uppercase tracking-widest mix-blend-difference">
                Grassroots Leader
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT 
         - Logic:  use the `key` prop to force React to re-render 
           the children when `isLoading` changes. 
         - When `isLoading` is true, the key is "loading".
         - When `isLoading` becomes false, the key becomes "loaded".
         - This Re-Mounts the children, resetting their `initial` -> `animate` 
           transitions so they play EXACTLY when the curtain lifts.
      */}

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
