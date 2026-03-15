"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { GalleryScene } from "./gallery-scene";

function GalleryCanvasInner() {
  return (
    <Canvas
      frameloop="always"
      gl={{ toneMapping: 0 }}
      style={{ background: "black" }}
    >
      <Suspense fallback={null}>
        <GalleryScene />
      </Suspense>
    </Canvas>
  );
}

export default GalleryCanvasInner;
