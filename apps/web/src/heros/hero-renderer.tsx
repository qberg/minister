import type { TypedLocale } from "payload";
import type { Page } from "@/payload-types";
import CutoutHero from "./cutout-hero/Component";
import MinimalHero from "./minimal-hero/Component";
import ParallaxHero from "./parallax-hero/Component";
import { VideoHero } from "./video-hero/Component";

type HeroRendererProps = {
  heroes: Page["hero"];
  locale?: TypedLocale;
};

export function HeroRenderer({ heroes, locale }: HeroRendererProps) {
  if (!heroes || heroes.length === 0) {
    return null;
  }

  const heroBlock = heroes[0];

  switch (heroBlock.blockType) {
    case "parallax-hero":
      return <ParallaxHero block={heroBlock} locale={locale} />;
    case "cutout-hero":
      return <CutoutHero block={heroBlock} locale={locale} />;
    case "minimal-hero":
      return <MinimalHero block={heroBlock} locale={locale} />;
    case "video-hero":
      return <VideoHero block={heroBlock} locale={locale} />;
    default:
      return null;
  }
}
