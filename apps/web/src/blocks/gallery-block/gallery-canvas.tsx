"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useGalleryScrollStore } from "@/store/gallery-scroll.store";
import type { GalleryImageItem } from "@/types";

type GalleryCanvasProps = {
  items: GalleryImageItem[];
};

const GalleryCanvasInner = dynamic(() => import("./gallery-canvas-inner"), {
  ssr: false,
});

const MOBILE_BREAKPOINT = 768;

//////////////////////////////////////////////////////////////////////////////////////////////
// This is the public-facing component. It:
// 1. Resolves Media objects into clean GalleryImageItems with guaranteed dimensions
// 2. Syncs itemCount and isMobile into the Zustand store
// 3. Delegates all WebGL rendering to GalleryCanvasInner (SSR-safe boundary)
//////////////////////////////////////////////////////////////////////////////////////////////
export function GalleryCanvas({ items }: GalleryCanvasProps) {
  const setItems = useGalleryScrollStore((s) => s.setItems);
  const setIsMobile = useGalleryScrollStore((s) => s.setIsMobile);

  // Sync item count into store on mount and when items change
  useEffect(() => {
    setItems(items);
  }, [items, setItems]);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [setIsMobile]);

  return (
    <>
      {/*
        Canvas container:
        - Desktop: fixed full screen behind all content (z-index -10)
        - Mobile: fixed top 75vh, leaving 25vh for text below
        The Tailwind class switching here mirrors the store's isMobile logic
        so both the DOM layout and the camera frustum stay in sync.
      */}
      <div className="-z-10 fixed inset-x-0 top-0 h-[75vh] md:h-screen">
        <GalleryCanvasInner />
      </div>
    </>
  );
}
