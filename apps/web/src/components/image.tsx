"use client";
import { cn } from "@repo/design-system/lib/utils";
import NextImage, { type ImageProps as NextImageProps } from "next/image";
import type { CSSProperties, Ref } from "react";

const DESKTOP_BREAKPOINT = 767;
const SHIMMER_VALUE = 700;

export type ImageProps = Omit<NextImageProps, "alt"> & {
  objectFit?: CSSProperties["objectFit"];
  block?: boolean;
  mobileSize?: `${number}vw`;
  desktopSize?: `${number}vw`;
  alt?: string;
  aspectRatio?: number;
  ref?: Ref<HTMLImageElement>;
};

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const generateShimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="rgba(255,255,255,0.1)" offset="20%" />
        <stop stop-color="rgba(255,255,255,0.2)" offset="50%" />
        <stop stop-color="rgba(255,255,255,0.1)" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="rgba(0,0,0,0)" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>
`;

function Image({
  className,
  style,
  alt = "",
  quality = 90,
  priority = false,
  placeholder = "blur",
  loading,
  fill,
  block = !fill,
  width = block ? 1 : undefined,
  height = block ? 1 : undefined,
  sizes,
  mobileSize = "100vw",
  desktopSize = "100vw",
  src,
  aspectRatio,
  objectFit = "cover",
  unoptimized,
  ref,
  ...props
}: ImageProps) {
  if (!src) {
    return null;
  }

  const isSvg = typeof src === "string" && src.includes(".svg");
  const finalLoading = loading ?? (priority ? "eager" : "lazy");
  const finalSizes =
    sizes ||
    `(max-width: ${DESKTOP_BREAKPOINT}px) ${mobileSize}, ${desktopSize}`;

  let blurDataURL = props.blurDataURL;
  let finalPlaceholder = placeholder;

  if (!isSvg && placeholder === "blur" && !blurDataURL && aspectRatio) {
    const shimmerSvg = generateShimmer(
      SHIMMER_VALUE,
      Math.round(SHIMMER_VALUE / aspectRatio)
    );
    blurDataURL = `data:image/svg+xml;base64,${toBase64(shimmerSvg)}`;
  }

  if (placeholder === "blur" && !blurDataURL && !isSvg) {
    finalPlaceholder = "empty";
  }

  return (
    <NextImage
      alt={alt}
      blurDataURL={blurDataURL}
      className={cn(block && "block h-auto w-full", className)}
      draggable={false}
      fill={!block}
      height={height}
      loading={finalLoading}
      onDragStart={(e) => e.preventDefault()}
      placeholder={finalPlaceholder}
      priority={priority}
      quality={quality}
      ref={ref}
      sizes={finalSizes}
      src={src}
      style={{
        objectFit,
        ...style,
      }}
      unoptimized={unoptimized || isSvg}
      width={width}
      {...props}
    />
  );
}

Image.displayName = "Image";

export { Image };
