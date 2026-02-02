import type { Media } from "@/payload-types";

export function isPopulatedMedia(
  media: number | Media | null | undefined
): media is Media {
  return typeof media === "object" && media !== null && "url" in media;
}
