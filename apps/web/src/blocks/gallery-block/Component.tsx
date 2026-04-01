"use client";

import type { TypedLocale } from "payload";
import { useMemo } from "react";
import { getMediaSize, getMediaUrl } from "@/lib/payload-media-utils";
import type { GalleryImageItem, LayoutBlock } from "@/types";
import { GalleryCanvas } from "./gallery-canvas";

type GalleryBlockProps = {
  locale?: TypedLocale;
  block: Extract<LayoutBlock, { blockType: "gallery" }>;
};

////////////////////////////////////////////////////////////////////////////////////////////
// Things this dude needs to do, he is a orechestrator
// 1. Map raw payload gallery image to GalleryImageItem, so no null down the tree
// 2. Guard against unpopulated Media (number IDs) via util fallbacks
// 3.Filter out any items that failed to resolve a valid URL
// 4. Invoke gallery canvas
///////////////////////////////////////////////////////////////////////////////////////////

export function GalleryBlock({ block }: GalleryBlockProps) {
  const items: GalleryImageItem[] = useMemo(() => {
    if (!block.galleryImage?.length) {
      return [];
    }

    return block.galleryImage.flatMap((entry, index) => {
      const url = getMediaUrl(entry.image, "");

      if (!url) {
        return [];
      }

      const { width, height } = getMediaSize(entry.image, {
        width: 100,
        height: 150,
      });

      const image =
        typeof entry.image === "object" && entry.image !== null
          ? entry.image
          : null;

      if (!image) {
        return [];
      }

      const item: GalleryImageItem = {
        id: image.id ?? index,
        image,
        caption: entry.caption ?? null,
        location: entry.location ?? null,
        width,
        height,
      };

      return [item];
    });
  }, [block.galleryImage]);

  if (items.length === 0) {
    return null;
  }
  return <GalleryCanvas items={items} />;
}
