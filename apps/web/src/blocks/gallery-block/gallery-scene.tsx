"use client";

import { OrthographicCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import type * as THREE from "three";
import {
  selectIsMobile,
  selectItems,
  useGalleryScrollStore,
} from "@/store/gallery-scroll.store";
import { GalleryImagePlane } from "./gallery-image-plane";

const DESKTOP_HALF_VH = 50; // camera sees -50 to +50 vertically = 100vh
const MOBILE_HALF_VH = 37.5; // camera sees -37.5 to +37.5 vertically = 75vh

export function GalleryScene() {
  const items = useGalleryScrollStore(selectItems);
  return (
    <>
      <OrthographicCamera far={100} makeDefault manual near={-100} />
      <CameraRig />

      {/*
      <mesh position={[0, 0, 10]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="red" />
      </mesh>
      */}

      {items.map((_, index) => (
        <GalleryImagePlane index={index} key={index} />
      ))}
    </>
  );
}

function CameraRig() {
  const { camera, size } = useThree();
  const isMobile = useGalleryScrollStore(selectIsMobile);

  useLayoutEffect(() => {
    const halfVH = isMobile ? MOBILE_HALF_VH : DESKTOP_HALF_VH;
    const aspect = size.width / size.height;
    const halfVW = halfVH * aspect;

    const ortho = camera as THREE.OrthographicCamera;

    ortho.left = -halfVW;
    ortho.right = halfVW;
    ortho.top = halfVH;
    ortho.bottom = -halfVH;

    ortho.updateProjectionMatrix();
  }, [camera, size.width, size.height, isMobile]);

  return null;
}
