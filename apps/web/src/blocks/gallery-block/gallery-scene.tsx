"use client";

import { OrthographicCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import type * as THREE from "three";
import {
  selectIsMobile,
  useGalleryScrollStore,
} from "@/store/gallery-scroll.store";

const DESKTOP_HALF_VH = 50; // camera sees -50 to +50 vertically = 100vh
const MOBILE_HALF_VH = 37.5; // camera sees -37.5 to +37.5 vertically = 75vh

export function GalleryScene() {
  return (
    <>
      <OrthographicCamera far={100} makeDefault near={-100} />
      <CameraRig />

      <mesh>
        <planeGeometry args={[33, 50]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </>
  );
}

function CameraRig() {
  const { camera, size } = useThree();
  const isMobile = useGalleryScrollStore(selectIsMobile);

  const halfVH = isMobile ? MOBILE_HALF_VH : DESKTOP_HALF_VH;

  const aspect = size.width / size.height;
  const halfVW = halfVH * aspect;

  const ortho = camera as THREE.OrthographicCamera;
  ortho.left = -halfVW;
  ortho.right = halfVW;
  ortho.top = halfVH;
  ortho.bottom = -halfVH;
  ortho.updateProjectionMatrix();

  return null;
}
