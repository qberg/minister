"use client";

import { useLenis } from "lenis/react";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
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
    scrollPerItemRef.current = window.innerHeight * SCROLL_PER_ITEM;
  }, []);

  useEffect(() => {
    setItems(items);
  }, [items, setItems]);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [setIsMobile]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!(lenisRef.current && containerRef.current)) return;
      const el = containerRef.current;
      const rect = el.getBoundingClientRect();
      const offsetTop = lenisRef.current.scroll + rect.top;
      const singleCopyPx = items.length * scrollPerItemRef.current;
      lenisRef.current.scrollTo(offsetTop + singleCopyPx, { immediate: true });
    }, 100);
    return () => clearTimeout(timeout);
  }, [items.length]);

  useLenis((lenis) => {
    lenisRef.current = lenis;
    const el = containerRef.current;
    if (!el || isJumping.current) return;

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

    if (scrollable <= 0) return;

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

  const totalHeight = items.length * scrollPerItemRef.current * 3;

  return (
    <div ref={containerRef} style={{ height: `${totalHeight}px` }}>
      <div className="sticky top-0 flex h-screen flex-col md:block">
        {/* Canvas — 75vh mobile, full screen desktop */}
        <div className="relative h-[75vh] md:h-screen">
          <GalleryBackground />
          <GalleryCanvasInner />

          <div className="pointer-events-none absolute inset-0 hidden md:block">
            <GalleryText />
          </div>
        </div>

        <div className="flex h-[25vh] items-center bg-black md:hidden">
          <GalleryText />
        </div>
      </div>
    </div>
  );
}
