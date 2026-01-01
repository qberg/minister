"use client";

import { cn } from "@repo/design-system/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type Tile = {
  id: number;
  width: number;
  order: number;
};

type VerticalTilesProps = {
  tileClassName?: string;
  minTileWidth?: number;
  animationDuration?: number;
  animationDelay?: number;
  stagger?: number;
  children?: React.ReactNode;
};

export default function VerticalTiles({
  tileClassName,
  minTileWidth = 64,
  animationDuration = 0.4,
  animationDelay = 0,
  stagger = 0.02,
  children,
}: VerticalTilesProps) {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateTiles = useCallback(() => {
    if (containerRef.current) {
      const { offsetWidth: width } = containerRef.current;
      const tileCount = Math.max(3, Math.floor(width / minTileWidth));
      const tileWidth = width / tileCount + 1;

      const newTiles = Array.from({ length: tileCount }, (_, index) => ({
        id: index,
        width: tileWidth,
        order: Math.abs(index - Math.floor((tileCount - 1) / 2)),
      }));

      setTiles(newTiles);
    }
  }, [minTileWidth]);

  useEffect(() => {
    calculateTiles();

    // Calculate total animation time
    const maxOrder = Math.floor(tiles.length / 2);
    const totalDuration =
      animationDelay + maxOrder * stagger + animationDuration;

    // End loading after animation completes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, totalDuration * 1000);

    const resizeObserver = new ResizeObserver(calculateTiles);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [
    calculateTiles,
    tiles.length,
    animationDelay,
    stagger,
    animationDuration,
  ]);

  return (
    <div className="relative" ref={containerRef}>
      {/* Tiles Overlay */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <div
            className="pointer-events-none fixed inset-0 z-9999 flex"
            key="tiles"
          >
            {tiles.map((tile) => (
              <motion.div
                animate={{ y: "100%" }}
                className={cn("bg-blue-800", tileClassName)}
                exit={{ y: "100%" }}
                initial={{ y: 0 }}
                key={tile.id}
                style={{
                  width: tile.width,
                  position: "absolute",
                  left: `${(tile.id * 100) / tiles.length}%`,
                  top: 0,
                  height: "100%",
                }}
                transition={{
                  duration: animationDuration,
                  delay: animationDelay + tile.order * stagger,
                  ease: [0.45, 0, 0.55, 1],
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Content */}

      {children}
    </div>
  );
}
