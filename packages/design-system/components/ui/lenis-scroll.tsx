"use client";

import { ReactLenis } from "lenis/react";

export function LenisScroll() {
  return (
    <ReactLenis
      options={{
        lerp: 0.1,
        duration: 1.2,
        easing: (t) => 1 - (1 - t) ** 3.5,
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,

        syncTouch: false,
        touchMultiplier: 1,

        infinite: false,
        autoResize: true,
        overscroll: true,
        autoRaf: true,
        anchors: true,
        autoToggle: false,
        allowNestedScroll: false,

        prevent: (node) =>
          node?.classList.contains("no-smooth-scroll") ||
          node?.hasAttribute("data-lenis-prevent") ||
          node?.nodeName === "VERCEL-LIVE-FEEDBACK",
      }}
      root
    />
  );
}
