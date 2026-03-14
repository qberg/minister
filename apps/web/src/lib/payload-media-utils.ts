import type { Media } from "@/payload-types";

/**
 * Media utility functions for Payload CMS
 * Pure functions for extracting/computing media properties
 */

export function getMediaUrl(
  media: number | Media | null | undefined,
  fallback = "/map-bg.png"
): string {
  if (typeof media !== "object" || media === null || !("url" in media)) {
    return fallback;
  }
  return media.url as string;
}

export function getMediaSize(
  media: number | Media | null | undefined,
  fallback = {width: 100, height: 100 }
): {width: number; height: number} {
  if (typeof media !== "object" || media === null || !("url" in media)) {
    return fallback;
  }
  return {width: media.width ?? fallback.width, height: media.height ?? fallback.height};
}

export function getBlurDataUrl(
  media: Media | null | undefined
): string | undefined {
  return media?.sizes?.blur?.url as string;
}

export function getThumbnailUrl(
  media: Media | null | undefined
): string | undefined {
  return media?.sizes?.thumbnail?.url || (media?.url as string);
}
