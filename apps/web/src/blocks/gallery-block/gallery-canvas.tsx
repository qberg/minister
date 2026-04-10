"use client";

import { useLenis } from "lenis/react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useGalleryScrollStore } from "@/store/gallery-scroll.store";
import type { GalleryImageItem } from "@/types";
import { GalleryBackground } from "./gallery-background";
import { GalleryText } from "./gallery-text";

const GalleryCanvasInner = dynamic(() => import("./gallery-canvas-inner"), {
  ssr: false,
});

const MOBILE_BREAKPOINT = 768;
const SCROLL_PER_ITEM = 1;

type GalleryCanvasProps = {
  items: GalleryImageItem[];
};

export function GalleryCanvas({ items }: GalleryCanvasProps) {
  const setItems = useGalleryScrollStore((s) => s.setItems);
  const setIsMobile = useGalleryScrollStore((s) => s.setIsMobile);
  const setVirtualIndex = useGalleryScrollStore((s) => s.setVirtualIndex);
  const setActiveIndex = useGalleryScrollStore((s) => s.setActiveIndex);
  const setVelocity = useGalleryScrollStore((s) => s.setVelocity);

  const [windowHeight, setWindowHeight] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPerItemRef = useRef<number>(800);
  const lastScrollRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const isJumping = useRef(false);
  const lenisRef = useRef<{
    scrollTo: (v: number, o?: { immediate?: boolean }) => void;
    scroll: number;
  } | null>(null);
  const hasInitializedScrollRef = useRef(false);

  useEffect(() => {
    setItems(items);
  }, [items, setItems]);

  // ── THE FIX: Robust Resize Teleportation ─────────────────────────
  useEffect(() => {
    const handleResize = () => {
      const currentHeight = window.innerHeight;

      // 1. Grab our exact mathematical position BEFORE the layout changes
      const currentVirtualIndex = useGalleryScrollStore.getState().virtualIndex;

      // 2. Update the physical metrics
      setWindowHeight(currentHeight);
      scrollPerItemRef.current = currentHeight * SCROLL_PER_ITEM;
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

      // 3. Teleport the scrollbar to match the new coordinates
      if (lenisRef.current && containerRef.current && items.length > 0) {
        const el = containerRef.current;
        const containerTop =
          lenisRef.current.scroll + el.getBoundingClientRect().top;

        const singleCopyPx = items.length * (currentHeight * SCROLL_PER_ITEM);
        const scrollable = singleCopyPx - currentHeight;

        // Calculate the exact percentage (p) of the current scroll
        const maxIndex = Math.max(1, items.length - 1);
        const p = currentVirtualIndex / maxIndex;

        // Find the matching pixel offset in the middle copy
        const targetScroll = containerTop + singleCopyPx + p * scrollable;

        // Instantly jump the browser to this pixel so the user sees zero visual disruption
        lenisRef.current.scrollTo(targetScroll, { immediate: true });
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [items.length, setIsMobile]);

  // ── Initial Mount Jump ───────────────────────────────────────────
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!(lenisRef.current && containerRef.current)) {
        return;
      }
      const el = containerRef.current;
      const rect = el.getBoundingClientRect();
      const offsetTop = lenisRef.current.scroll + rect.top;
      const singleCopyPx = items.length * scrollPerItemRef.current;
      lenisRef.current.scrollTo(offsetTop + singleCopyPx, { immediate: true });
    }, 100);
    return () => clearTimeout(timeout);
  }, [items.length]);

  // ── The Core Loop ────────────────────────────────────────────────
  useLenis((lenis) => {
    lenisRef.current = lenis;
    const el = containerRef.current;
    if (!el || isJumping.current) {
      return;
    }

    const { scroll } = lenis;

    if (!hasInitializedScrollRef.current) {
      lastScrollRef.current = scroll;
      lastTimeRef.current = performance.now();
      hasInitializedScrollRef.current = true;
      return;
    }

    const rect = el.getBoundingClientRect();
    const offsetTop = scroll + rect.top;
    const singleCopyPx = items.length * scrollPerItemRef.current;
    const middleStart = offsetTop + singleCopyPx;
    const middleEnd = offsetTop + singleCopyPx * 2;
    const relativeScroll = scroll - middleStart;
    const scrollable = singleCopyPx - window.innerHeight;

    if (scrollable <= 0) {
      return;
    }

    const p = relativeScroll / scrollable;
    const virtualIndex = p * (items.length - 1);

    const now = performance.now();
    const dt = now - lastTimeRef.current;
    const dScroll = scroll - lastScrollRef.current;
    const velocity = dt > 0 ? Math.max(-2, Math.min(2, dScroll / dt)) : 0;
    lastScrollRef.current = scroll;
    lastTimeRef.current = now;

    setVirtualIndex(virtualIndex);
    setActiveIndex(Math.round(virtualIndex));
    setVelocity(velocity);

    if (scroll >= middleEnd) {
      isJumping.current = true;
      lenis.scrollTo(scroll - singleCopyPx, { immediate: true });
      requestAnimationFrame(() => {
        isJumping.current = false;
      });
      return;
    }

    if (scroll < middleStart) {
      isJumping.current = true;
      lenis.scrollTo(scroll + singleCopyPx, { immediate: true });
      requestAnimationFrame(() => {
        isJumping.current = false;
      });
    }
  });

  const totalHeight =
    windowHeight === 0
      ? "300vh"
      : items.length * windowHeight * SCROLL_PER_ITEM * 3;

  return (
    <div
      ref={containerRef}
      style={{
        height:
          typeof totalHeight === "number" ? `${totalHeight}px` : totalHeight,
      }}
    >
      <div className="relative sticky top-0 flex h-dvh flex-col md:block md:h-screen">
        <GalleryBackground />

        <div className="relative h-[75dvh] md:h-screen">
          <GalleryCanvasInner />

          <div className="pointer-events-none absolute inset-0 hidden md:block">
            <GalleryText />
          </div>
        </div>

        <div className="z-10 flex h-[25dvh] items-center md:hidden">
          <GalleryText />
        </div>
      </div>
    </div>
  );
}
