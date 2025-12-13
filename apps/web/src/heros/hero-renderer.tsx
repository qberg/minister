import type { Page } from "@/payload-types";

import ParallaxHero from "./parallax-hero/Component";
import MinimalHero from "./minimal-hero/Component";

type HeroRendererProps = {
  hero: Page["hero"];
};

const heroComponents = {
  "parallax-hero": ParallaxHero,
  "minimal-hero": MinimalHero,
};

export function HeroRenderer({ hero }: HeroRendererProps) {
  if (!hero || hero.length === 0) {
    return null;
  }

  const heroBlock = hero[0];

  if (!heroBlock) {
    return null;
  }

  const HeroComponent =
    heroComponents[heroBlock.blockType as keyof typeof heroComponents];

  if (!HeroComponent) {
    console.warn(`Hero block type "${heroBlock.blockType}" not found`);
    return null;
  }

  return <HeroComponent block={heroBlock} />;
}
