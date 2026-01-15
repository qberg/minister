import { Box } from "@repo/design-system/components/layout/box";
import { Stack } from "@repo/design-system/components/layout/stack";
import { Typography } from "@repo/design-system/components/ui/typography";
import type { TypedLocale } from "payload";
import type React from "react";
import BackgroundImage from "@/components/background-image";
import { getMediaUrl } from "@/lib/payload-media-utils";
import type { HeroBlock } from "@/types";
import ParallaxSection from "./parallax-section";

type ParallaxHeroBlockType = Extract<HeroBlock, { blockType: "parallax-hero" }>;

type ParallaxHeroProps = {
  block: ParallaxHeroBlockType;
  locale?: TypedLocale;
};

const ParallaxHero: React.FC<ParallaxHeroProps> = ({ block }) => {
  const centerImageSrc = getMediaUrl(block.centerImg);
  const bgImageSrc = getMediaUrl(block.bgImg);
  const bgDisplayText = block.bgText;

  return (
    <Box as="section" className="relative min-h-screen" invert padding="none">
      {bgImageSrc && <BackgroundImage priority src={bgImageSrc} />}
      <Stack className="relative z-10 mx-auto mt-24 lg:mt-[12vw]" gap="lg">
        <div className="whitespace-nowrap text-center">
          <Typography as="h1">{block.title}</Typography>
        </div>

        <Stack className="mt-0">
          {centerImageSrc && (
            <ParallaxSection
              src={centerImageSrc}
              text={bgDisplayText || "TMAnbarasan"}
            />
          )}
          <div className="mx-auto 4xl:mb-20 lxl:mb-16 mb-10 sxl:mb-10 flex flex-col gap-4 lg:mb-8 lg:gap-6">
            {Array.isArray(block.content) &&
              block.content.map((item) => (
                <Typography
                  as="h5"
                  className="max-w-[72vw] text-pretty lg:max-w-[50vw]"
                  key={item.id}
                  variant="h6"
                >
                  {item.para}
                </Typography>
              ))}
          </div>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ParallaxHero;
