"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "../../lib/utils";

type Grid = {
  rows: number;
  cols: number;
};

const DEFAULT_GRIDS: Record<string, Grid> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
};

type PredefinedGridKey = keyof typeof DEFAULT_GRIDS;

interface PixelImageProps {
  src: string;
  grid?: PredefinedGridKey;
  customGrid?: Grid;
  grayscaleAnimation?: boolean;
  pixelFadeInDuration?: number; // in ms
  maxAnimationDelay?: number; // in ms
  colorRevealDelay?: number; // in ms
  delay?: number;
  className?: string;
}

export const PixelImage = ({
  src,
  grid = "4x6",
  grayscaleAnimation = true,
  pixelFadeInDuration = 600,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1200,
  delay = 0,
  customGrid,
  className,
}: PixelImageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const MIN_GRID = 1;
  const MAX_GRID = 16;

  const { rows, cols } = useMemo(() => {
    const isValidGrid = (grid?: Grid) => {
      if (!grid) {
        return false;
      }
      const { rows, cols } = grid;
      return (
        Number.isInteger(rows) &&
        Number.isInteger(cols) &&
        rows >= MIN_GRID &&
        cols >= MIN_GRID &&
        rows <= MAX_GRID &&
        cols <= MAX_GRID
      );
    };

    return isValidGrid(customGrid) ? customGrid! : DEFAULT_GRIDS[grid];
  }, [customGrid, grid]);

  useEffect(() => {
    // 1. Trigger Entrance
    const startTimeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    // 2. Trigger Color Reveal
    const colorTimeout = setTimeout(() => {
      setShowColor(true);
    }, delay + colorRevealDelay);

    // 3. Trigger Cleanup (Swap to single image)
    // We add a small buffer (100ms) to ensure CSS transitions are fully done
    const totalDuration = delay + maxAnimationDelay + pixelFadeInDuration + 100;
    const cleanupTimeout = setTimeout(() => {
      setIsAnimationComplete(true);
    }, totalDuration);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(colorTimeout);
      clearTimeout(cleanupTimeout);
    };
  }, [delay, colorRevealDelay, maxAnimationDelay, pixelFadeInDuration]);

  const pieces = useMemo(() => {
    const total = rows * cols;
    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;

      const clipPath = `polygon(
        ${col * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${(row + 1) * (100 / rows)}%,
        ${col * (100 / cols)}% ${(row + 1) * (100 / rows)}%
      )`;

      const delay = Math.random() * maxAnimationDelay;
      return {
        clipPath,
        delay,
      };
    });
  }, [rows, cols, maxAnimationDelay]);

  // RENDER: Clean Single Image (After Animation)
  if (isAnimationComplete) {
    return (
      <div className={cn("relative h-full w-full select-none", className)}>
        <img
          alt="Pixel image full"
          className={cn(
            "h-full w-full rounded-[2.5rem] object-cover",
            grayscaleAnimation && (showColor ? "grayscale-0" : "grayscale")
          )}
          draggable={false}
          src={src}
          style={{
            // Maintain the filter transition in case colorReveal is longer than animation
            transition: grayscaleAnimation
              ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
              : "none",
          }}
        />
      </div>
    );
  }

  // RENDER: Grid Pieces (During Animation)
  return (
    <div className={cn("relative h-full w-full select-none", className)}>
      {pieces.map((piece, index) => (
        <div
          className={cn(
            "absolute inset-0 transition-all ease-out",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          key={index}
          style={{
            clipPath: piece.clipPath,
            transitionDelay: `${piece.delay}ms`,
            transitionDuration: `${pixelFadeInDuration}ms`,
          }}
        >
          <img
            alt={`Pixel image piece ${index + 1}`}
            className={cn(
              "h-full w-full rounded-[2.5rem] object-cover",
              grayscaleAnimation && (showColor ? "grayscale-0" : "grayscale")
            )}
            draggable={false}
            src={src}
            style={{
              transition: grayscaleAnimation
                ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
            }}
          />
        </div>
      ))}
    </div>
  );
};
