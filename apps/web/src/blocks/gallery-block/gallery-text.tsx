"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  selectActiveIndex,
  selectItems,
  useGalleryScrollStore,
} from "@/store/gallery-scroll.store";

const SPRING = {
  type: "spring",
  stiffness: 500,
  damping: 75,
  duration: 1,
} as const;

export function GalleryText() {
  const activeIndex = useGalleryScrollStore(selectActiveIndex);
  const items = useGalleryScrollStore(selectItems);

  const wrappedIndex =
    items.length > 0
      ? ((activeIndex % items.length) + items.length) % items.length
      : 0;

  const activeItem = items[wrappedIndex];

  const location = activeItem?.location ?? null;
  const caption = activeItem?.caption ?? null;

  return (
    <>
      {/*
        Desktop: absolute overlay at bottom-left of the canvas container
        Mobile: static block sitting in the 25vh text zone below the canvas
      */}
      <div className="pointer-events-none z-20 flex w-[90vw] flex-col items-start gap-4 p-6 md:absolute md:top-[75vh] md:left-[2vw] md:w-[40vw] md:p-0">
        {/* Location — small uppercase */}
        <div className="w-full overflow-hidden">
          <AnimatePresence mode="wait">
            {location && (
              <motion.p
                animate={{ y: "0%", opacity: 1 }}
                className="font-body font-light text-base text-white leading-none [html[lang='ta-IN']_&]:leading-normal"
                exit={{ y: "-95%", opacity: 0 }}
                initial={{ y: "95%", opacity: 0 }}
                key={`loc-${wrappedIndex}`}
                transition={{ ...SPRING, delay: 0.1 }}
              >
                {location}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Title — large heading */}
        <div className="w-full overflow-hidden">
          <AnimatePresence mode="wait">
            {caption && (
              <motion.h2
                animate={{ y: "0%", opacity: 1 }}
                className="font-heading font-normal text-4xl text-white [html[lang='ta-IN']_&]:leading-normal"
                exit={{ y: "-95%", opacity: 0 }}
                initial={{ y: "95%", opacity: 0 }}
                key={`title-${wrappedIndex}`}
                transition={SPRING}
              >
                {caption}
              </motion.h2>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
