import { shaderMaterial } from "@react-three/drei";
import type { ThreeElement } from "@react-three/fiber";
import { Texture, Vector2 } from "three";

export const GalleryShaderMaterial = shaderMaterial(
  {
    uTexture: new Texture(),
    uVelocity: 0,
    uBowStrength: 0.04,
    uOpacity: 1,
    uPlaneRes: new Vector2(1, 1),
    uMediaRes: new Vector2(1, 1),
  },

  // ─── Vertex Shader ─────────────────────────────────────────────────────────
  `
    uniform float uVelocity;
    uniform float uBowStrength;

    varying vec2 vUv;

    #define PI 3.14159265358979323846

    void main() {
      vUv = uv;

      vec3 distorted = position;

      // sin(uv.y * PI) creates a bow that peaks at the middle of the plane
      // and returns to zero at both edges — edges stay anchored, middle bows
      float bow = sin(uv.y * PI) * uVelocity * uBowStrength;
      distorted.x += bow;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(distorted, 1.0);
    }
  `,

  // ─── Fragment Shader ────────────────────────────────────────────────────────
  `
    uniform sampler2D uTexture;
    uniform float uOpacity;
    uniform vec2 uPlaneRes;
    uniform vec2 uMediaRes;

    varying vec2 vUv;

    void main() {
      // Calculate aspect ratios for the geometry and the image
      vec2 ratio = vec2(
        min((uPlaneRes.x / uPlaneRes.y) / (uMediaRes.x / uMediaRes.y), 1.0),
        min((uPlaneRes.y / uPlaneRes.x) / (uMediaRes.y / uMediaRes.x), 1.0)
      );

      // Remap UVs to crop from the center
      vec2 uv = vec2(
        vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
      );

      vec4 texColor = texture2D(uTexture, uv);
      gl_FragColor = vec4(texColor.rgb, texColor.a * uOpacity);
      #include <colorspace_fragment>
    }
  `
);

// ─── Types ────────────────────────────────────────────────────────────────────

export type GalleryShaderMaterialUniforms = {
  uTexture: Texture;
  uVelocity: number;
  uBowStrength: number;
  uOpacity: number;
  uPlaneRes: [number, number] | Vector2;
  uMediaRes: [number, number] | Vector2;
};

declare module "@react-three/fiber" {
  // biome-ignore lint: need this
  interface ThreeElements {
    galleryShaderMaterial: ThreeElement<typeof GalleryShaderMaterial> &
      GalleryShaderMaterialUniforms;
  }
}
