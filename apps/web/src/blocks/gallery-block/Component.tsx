"use client";

import { useLenis } from "lenis/react";
import {
  type MotionValue,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import Image from "next/image";
import type { TypedLocale } from "payload";
import { useEffect, useRef, useState } from "react";
import type { Media } from "@/payload-types";
import type { LayoutBlock } from "@/types";

type GalleryBlockProps = {
  locale?: TypedLocale;
  block: Extract<LayoutBlock, { blockType: "gallery" }>;
};

const SCROLL_PER_ITEM = 1;

type GalleryItemType = number | Media | Record<string, unknown>;

type GalleryItemProps = {
  item: GalleryItemType;
  index: number;
  activeIndex: MotionValue<number>;
  totalVisible: number;
};

type LenisInstance = {
  scroll: number;
  scrollTo: (target: number, options?: { immediate?: boolean }) => void;
};

function GalleryItem({
  item,
  index,
  activeIndex,
  totalVisible,
}: GalleryItemProps) {
  const x = useTransform(activeIndex, (v) => `${(index - v) * 55}vw`);
  const y = useTransform(activeIndex, (v) => `${(index - v) * 70}vh`);

  const scale = useTransform(activeIndex, (v) => {
    const distance = Math.abs(index - v);
    return 1 + distance * 0.4;
  });

  const opacity = useTransform(
    activeIndex,
    [index - 1.5, index, index + 1.5],
    [0, 1, 0]
  );

  const imageData =
    typeof item === "object" && item !== null && "image" in item
      ? (item.image as Media)
      : null;

  if (!imageData) {
    return null;
  }

  return (
    <motion.div
      className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 aspect-square w-[80vw] md:h-[60vh] md:w-[35vw]"
      style={{ x, y, scale, opacity }}
    >
      <Image
        alt={imageData.alt ?? ""}
        className="rounded-xl object-cover shadow-2xl"
        fill
        priority={index === totalVisible}
        src={imageData.url ?? ""}
        {...(imageData.sizes?.blur?.url && {
          placeholder: "blur",
          blurDataURL: imageData.sizes.blur.url,
        })}
      />
    </motion.div>
  );
}

export const GalleryBlock = ({ block }: GalleryBlockProps) => {
  const items = block.galleryImage ?? [];
  const tripled = items.length > 0 ? [...items, ...items, ...items] : [];

  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<LenisInstance | null>(null);

  const activeIndex = useMotionValue(items.length);
  const [currentIndex, setCurrentIndex] = useState(items.length);

  const isJumping = useRef(false);
  const singleCopyPxRef = useRef(0);

  useMotionValueEvent(activeIndex, "change", (latest) => {
    setCurrentIndex(Math.round(latest));
  });

  useEffect(() => {
    singleCopyPxRef.current =
      items.length * SCROLL_PER_ITEM * window.innerHeight;
  }, [items.length]);

  useLenis((lenis) => {
    lenisRef.current = lenis;

    const el = containerRef.current;
    if (!el) {
      return;
    }

    const { scroll } = lenis;
    const rect = el.getBoundingClientRect();
    const offsetTop = scroll + rect.top;
    const singleCopyPx = singleCopyPxRef.current;

    const middleStart = offsetTop + singleCopyPx;
    const middleEnd = offsetTop + singleCopyPx * 2;

    const relativeScroll = scroll - middleStart;
    const scrollable = singleCopyPx - window.innerHeight;

    const p = scrollable > 0 ? relativeScroll / scrollable : 0;
    const index = p * (items.length - 1) + items.length;

    if (!isJumping.current) {
      activeIndex.set(index);
    }

    if (isJumping.current) {
      return;
    }

    if (scroll >= middleEnd) {
      isJumping.current = true;
      const jumpTarget = scroll - singleCopyPx;

      const newRelative = jumpTarget - middleStart;
      const newP = newRelative / scrollable;
      activeIndex.set(newP * (items.length - 1) + items.length);

      lenis.scrollTo(jumpTarget, { immediate: true });

      requestAnimationFrame(() => {
        isJumping.current = false;
      });
      return;
    }

    if (scroll < middleStart) {
      isJumping.current = true;
      const jumpTarget = scroll + singleCopyPx;

      const newRelative = jumpTarget - middleStart;
      const newP = newRelative / scrollable;
      activeIndex.set(newP * (items.length - 1) + items.length);

      lenis.scrollTo(jumpTarget, { immediate: true });

      requestAnimationFrame(() => {
        isJumping.current = false;
      });
    }
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (lenisRef.current) {
        const el = containerRef.current;
        if (!el) {
          return;
        }

        const singleCopyPx =
          items.length * SCROLL_PER_ITEM * window.innerHeight;
        const rect = el.getBoundingClientRect();
        const offsetTop = lenisRef.current.scroll + rect.top;

        lenisRef.current.scrollTo(offsetTop + singleCopyPx, {
          immediate: true,
        });
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [items.length]);

  if (items.length === 0) {
    return null;
  }

  const activeData = tripled[currentIndex];
  const title =
    typeof activeData === "object" &&
    activeData !== null &&
    "title" in activeData
      ? String(activeData.title)
      : "";
  const location =
    typeof activeData === "object" &&
    activeData !== null &&
    "location" in activeData
      ? String(activeData.location)
      : "";

  return (
    <div
      ref={containerRef}
      style={{ height: `${tripled.length * SCROLL_PER_ITEM * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        {tripled.map((item, i) => (
          <GalleryItem
            activeIndex={activeIndex}
            index={i}
            item={item}
            key={`img-${typeof item === "object" && item !== null && "id" in item ? item.id : i}-${i}`}
            totalVisible={items.length}
          />
        ))}

        <div className="pointer-events-none absolute top-[75vh] left-[2vw] z-20 flex w-[40vw] flex-col items-start gap-4">
          {location && (
            <div className="inline-block w-full overflow-hidden">
              <motion.p
                animate={{ y: "0%", opacity: 1 }}
                className="font-body text-base text-gray-300 uppercase leading-none tracking-tight drop-shadow-md"
                initial={{ y: "95%", opacity: 0 }}
                key={`loc-${currentIndex}`}
                transition={{
                  duration: 1,
                  delay: 0.1,
                  type: "spring",
                  stiffness: 500,
                  damping: 75,
                }}
              >
                {location}
              </motion.p>
            </div>
          )}

          {title && (
            <div className="inline-block w-full overflow-hidden">
              <motion.h2
                animate={{ y: "0%", opacity: 1 }}
                className="font-heading font-normal text-5xl text-white leading-none tracking-normal drop-shadow-lg"
                initial={{ y: "95%", opacity: 0 }}
                key={`title-${currentIndex}`}
                transition={{
                  duration: 1,
                  type: "spring",
                  stiffness: 500,
                  damping: 75,
                }}
              >
                {title}
              </motion.h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
