"use client";

import { GrainGradient } from "@paper-design/shaders-react";

// const COLORS = [
//   "#1a0800", // deep maroon — top left (dark, like pre-dawn)
//   "#7a1800", // DMK red-brown — top right
//   "#c45000", // burnt orange — bottom right (sunset fire)
//   "#e8a020", // warm gold — bottom left (sun warmth)
// ];
//
// //const COLOR_BACK = "#080400"; // near black with the faintest warm tint

const COLORS = ["#001845", "#002E71", "#4A6FA5", "#D7A647"];

const COLOR_BACK = "#0A0F1A";

export function GalleryBackground() {
  return (
    <div className="-z-10 absolute inset-0">
      <GrainGradient
        colorBack={COLOR_BACK}
        colors={COLORS}
        fit="cover"
        height="100%"
        intensity={0.3}
        noise={0.05}
        shape="corners"
        softness={0.6}
        speed={0.8}
        width="100%"
      />
    </div>
  );
}
