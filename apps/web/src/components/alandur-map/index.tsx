"use client";

import { cn } from "@repo/design-system/lib/utils";
import { useState } from "react";
import MapPath from "./map-path";
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const getName = (slug: string) =>
    zoneNames[slug] || slug.replace(/-/g, " ").toUpperCase();

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
      // Clicking the background (the div/svg area) deselects the current zone
      onPointerLeave={() => setHoveredName(null)}
      onPointerMove={handlePointerMove}
    >
      {hoveredName && (
        <div
          className="pointer-events-none fixed z-50 rounded bg-black/80 px-2 py-1 text-white text-xs"
          style={{ top: mousePos.y + 10, left: mousePos.x + 10 }}
        >
          {hoveredName}
        </div>
      )}

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
            onHover={(n, e) => setHoveredName(n)}
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
