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

export const HomePreloader = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // 1. Lock scroll
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    // 2. Preload Images
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

    // 3. Counter & Logic
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

    // 4. Cleanup and Exit
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => {
      clearInterval(shuffleInterval);
      clearInterval(counterInterval);
      clearTimeout(timer);

      // Unlock scroll after animation finishes
      setTimeout(() => {
        document.body.style.overflow = "";
      }, 1000);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <>
            {/* THE CURTAIN (Solid Div) 
               - Replaces the SVG.
               - Uses a spring transition on 'exit' to slide up cleanly.
            */}
            <motion.div
              className="fixed inset-0 z-[9999] flex h-screen w-full items-center justify-center bg-[#112955]"
              exit={{
                y: "-100%", // Slide up completely
                transition: {
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1], // Custom bezier for a premium "snap"
                  delay: 0.2, // Wait slightly for the content to fade out first
                },
              }}
              initial={{ y: 0 }}
              key="curtain-bg"
            >
              {/* PRELOADER CONTENT
                 - Sits inside the curtain div now, so it moves with it 
                   OR we can fade it out before the curtain moves.
                 - Here we fade it out quickly so the curtain is plain when it slides up.
              */}
              <motion.div
                className="absolute inset-0 flex h-full w-full items-center justify-center text-white"
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                initial={{ opacity: 1 }}
              >
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
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT REVEAL */}
      <div className="relative z-0">
        <AnimatePresence mode="wait">
          {!isLoading && (
            <motion.div
              animate={{
                y: 0,
                scale: 1,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  mass: 1,
                  delay: 0.3, // Wait for curtain to start lifting
                },
              }}
              initial={{
                y: 100, // Starts slightly down
                scale: 0.95, // Starts slightly small
                opacity: 0,
              }}
              key="main-content"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// Helper for text reveal (Unchanged)
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
