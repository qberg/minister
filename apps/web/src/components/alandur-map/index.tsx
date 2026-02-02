"use client";

import { cn } from "@repo/design-system/lib/utils";
import { AnimatePresence, useMotionValue } from "motion/react";
import { useState } from "react";
import MapPath from "./map-path";
import Tooltip from "./tooltip";
import { ZONES } from "./zones";

type Props = {
  activeZoneSlug: string | null;
  onZoneSelect: (slug: string) => void;
  zoneNames?: Record<string, string>;
  className?: string;
};

export function AlandurMap({
  activeZoneSlug,
  onZoneSelect,
  zoneNames = {},
  className,
}: Props) {
  // --- Tooltip & Interaction Logic ---
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handlePointerMove = (e: React.PointerEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const getName = (slug: string) => zoneNames[slug] || slug.replace(/-/g, " ");

  return (
    <div
      className={cn("relative h-full w-full", className)}
      onClick={(e) => {
        if (
          (e.target === e.currentTarget ||
            (e.target as Element).tagName === "svg") &&
          activeZoneSlug
        )
          onZoneSelect("");
      }}
      onPointerLeave={() => setHoveredName(null)}
      // Clicking the background (the div/svg area) deselects the current zone
      onPointerMove={handlePointerMove}
      style={{ viewTransitionName: "alandur-map" }}
    >
      <AnimatePresence>
        {hoveredName && (
          <Tooltip mouseX={mouseX} mouseY={mouseY} text={hoveredName} />
        )}
      </AnimatePresence>

      <svg
        className="h-auto w-full touch-manipulation select-none"
        fill="none"
        viewBox="0 0 1441 1040"
        xmlns="http://www.w3.org/2000/svg"
      >
        {ZONES.map((zone) => (
          <MapPath
            d={zone.d}
            isActive={activeZoneSlug === zone.slug}
            key={zone.slug}
            name={getName(zone.slug)}
            onHover={(n, _e) => setHoveredName(n)}
            onLeave={() => setHoveredName(null)}
            onSelect={onZoneSelect}
            slug={zone.slug}
            type={zone.type}
          />
        ))}
      </svg>
    </div>
  );
}
