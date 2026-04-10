import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { damp, damp3 } from "maath/easing";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  selectIsMobile,
  selectItems,
  useGalleryScrollStore,
} from "@/store/gallery-scroll.store";
import "@/blocks/gallery-block/gallery-shader-material-ext";
import type { GalleryShaderMaterial } from "./gallery-shader-material";

type GalleryImagePlaneProps = {
  index: number;
};

// this is the image height, will be 50vh in md and above, in mobile it will
// be whatever 75vh/2 will be
const FRUSTUM_DESKTOP = 100;
const FRUSTUM_MOBILE = 75;
const PLANE_HEIGHT_PCT_DESKTOP = 50;
const PLANE_HEIGHT_PCT_MOBILE = 40;

const SPREAD_X = 98;
const SPREAD_Y = 60;
const CURVE = 10;

//const MIN_SCALE = 1;
const SCALE_RANGE = -0.5;

const SMOOTH_TIME = 0.25;
const MIN_OPACITY = 0.6;

THREE.TextureLoader.prototype.crossOrigin = "anonymous";

////////////////////////////////////////////////////////////////////////////////////
// needs to wrap scene in suspense, for all or nothing rendering,
// i.e. we want all images planes to resolve not planes popping one at a time
////////////////////////////////////////////////////////////////////////////////////
export function GalleryImagePlane({ index }: GalleryImagePlaneProps) {
  const items = useGalleryScrollStore(selectItems);
  const isMobile = useGalleryScrollStore(selectIsMobile);
  const item = items[index];

  const prevTCenteredRef = useRef<number | null>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<InstanceType<typeof GalleryShaderMaterial>>(null);
  const MIN_SCALE = isMobile ? 0.75 : 0.95;

  // basically aspect ratio
  const [planeDims, setPlaneDims] = useState(() => {
    const frustumHeight = isMobile ? FRUSTUM_MOBILE : FRUSTUM_DESKTOP;
    const planePct = isMobile
      ? PLANE_HEIGHT_PCT_MOBILE
      : PLANE_HEIGHT_PCT_DESKTOP;
    const heightInUnits = frustumHeight * (planePct / 100);
    if (!item) {
      return {
        planeWidth: heightInUnits * (2 / 3),
        planeHeight: heightInUnits,
      };
    }
    return {
      planeWidth: heightInUnits * (item.width / item.height),
      planeHeight: heightInUnits,
    };
  });

  useEffect(() => {
    const frustumHeight = isMobile ? FRUSTUM_MOBILE : FRUSTUM_DESKTOP;
    const planePct = isMobile
      ? PLANE_HEIGHT_PCT_MOBILE
      : PLANE_HEIGHT_PCT_DESKTOP;
    const heightInUnits = frustumHeight * (planePct / 100);
    if (!item) {
      setPlaneDims({
        planeWidth: heightInUnits * (2 / 3),
        planeHeight: heightInUnits,
      });
      return;
    }
    setPlaneDims({
      planeWidth: heightInUnits * (item.width / item.height),
      planeHeight: heightInUnits,
    });
  }, [item, isMobile]);

  const { planeWidth, planeHeight } = planeDims;

  const texture = useTexture(item?.image.url ?? "");

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  useEffect(
    () => () => {
      texture.dispose();
    },
    [texture]
  );

  useEffect(() => {
    if (!materialRef.current) {
      return;
    }
    materialRef.current.uVelocity = 0;
    materialRef.current.uOpacity = 1;
  }, []);

  ////////////////////////////////////////////////////////////////////
  // PHYSICS
  ///////////////////////////////////////////////////////////////////
  useFrame((_, delta) => {
    if (!(meshRef.current && materialRef.current)) {
      return;
    }

    const { virtualIndex, items: storeItems } =
      useGalleryScrollStore.getState();
    const N = storeItems.length;
    if (N === 0) {
      return;
    }

    const rawT = (((index - virtualIndex) % N) + N) % N;
    const tCentered = rawT > N / 2 ? rawT - N : rawT;

    const prev = prevTCenteredRef.current;
    const didWrap = prev !== null && Math.abs(tCentered - prev) > N / 2;
    prevTCenteredRef.current = tCentered;

    const targetX = tCentered * SPREAD_X;
    const targetY = tCentered * -SPREAD_Y + tCentered * tCentered * CURVE;

    const absT = Math.abs(tCentered);
    const targetScale = MIN_SCALE + absT * SCALE_RANGE;
    const targetOpacity =
      absT > 1.5 ? 0 : absT > 1 ? MIN_OPACITY : 1 - (1 - MIN_OPACITY) * absT;

    if (didWrap) {
      meshRef.current.position.set(targetX, targetY, 0);
      meshRef.current.scale.setScalar(targetScale);
      materialRef.current.opacity = targetOpacity;
    } else {
      damp3(
        meshRef.current.position,
        [targetX, targetY, 0],
        SMOOTH_TIME,
        delta
      );
      damp3(
        meshRef.current.scale,
        [targetScale, targetScale, targetScale],
        SMOOTH_TIME,
        delta
      );
      const { velocity } = useGalleryScrollStore.getState();
      const safeVelocity =
        useGalleryScrollStore.getState().items.length > 0 ? velocity : 0;
      damp(materialRef.current, "uVelocity", safeVelocity, SMOOTH_TIME, delta);

      damp(materialRef.current, "uOpacity", targetOpacity, SMOOTH_TIME, delta);
    }
  });

  if (!item) {
    return null;
  }

  return (
    <mesh position={[0, 0, 0]} ref={meshRef}>
      <planeGeometry args={[planeWidth, planeHeight, 1, 32]} />
      <galleryShaderMaterial
        ref={materialRef}
        toneMapped={false}
        transparent
        uBowStrength={0.75}
        uMediaRes={[item.width, item.height]}
        uOpacity={1}
        uPlaneRes={[planeWidth, planeHeight]}
        uTexture={texture}
        uVelocity={0}
      />
    </mesh>
  );
}
