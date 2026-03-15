import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { damp, damp3 } from "maath/easing";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  selectIsMobile,
  selectItems,
  useGalleryScrollStore,
} from "@/store/gallery-scroll.store";

type GalleryImagePlaneProps = {
  index: number;
};

// this is the image height, will be 50vh in md and above, in mobile it will
// be whatever 75vh/2 will be
const PLANE_HEIGHT = 50;

const SPREAD_X = 98;
const SPREAD_Y = 60;
const CURVE = 10;

const MIN_SCALE = 0.75;
const SCALE_RANGE = 0.4;

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
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  // basically aspect ratio
  const { planeWidth, planeHeight } = useMemo(() => {
    if (!item) {
      return { planeWidth: 33, planeHeight: PLANE_HEIGHT };
    }
    const aspectRatio = item.width / item.height;

    return {
      planeWidth: PLANE_HEIGHT * aspectRatio,
      planeHeight: PLANE_HEIGHT,
    };
  }, [item]);

  // same URL = same texture object, no duplicate uploads
  //const texture = useTexture(item?.image.url ?? "");
  const texture = useTexture(
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop&crossOrigin=anonymous"
  );

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  useEffect(
    () => () => {
      texture.dispose();
    },
    [texture]
  );

  ////////////////////////////////////////////////////////////////////
  // PHYSICS
  ///////////////////////////////////////////////////////////////////
  useFrame((_, delta) => {
    if (!(meshRef.current && materialRef.current)) return;

    const { virtualIndex, items: storeItems } =
      useGalleryScrollStore.getState();
    const N = storeItems.length;
    if (N === 0) return;

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
      damp(materialRef.current, "opacity", targetOpacity, SMOOTH_TIME, delta);
    }
  });

  if (!item) {
    return null;
  }

  return (
    <mesh position={[0, 0, 0]} ref={meshRef}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial
        map={texture}
        ref={materialRef}
        toneMapped={false}
        transparent
      />
    </mesh>
  );
}
