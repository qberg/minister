"use client";

import type { TypedLocale } from "payload";
import {
  selectVirtualIndex,
  useGalleryScrollStore,
} from "@/store/gallery-scroll.store";
import type { LayoutBlock } from "@/types";
import { GalleryCanvas } from "./gallery-canvas";

type GalleryBlockProps = {
  locale?: TypedLocale;
  block: Extract<LayoutBlock, { blockType: "gallery" }>;
};

export function GalleryBlock({ block }: GalleryBlockProps) {
  const virtualIndex = useGalleryScrollStore(selectVirtualIndex);
  console.log(virtualIndex);
  return <GalleryCanvas items={[]} />;
}
