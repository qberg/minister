import { Box } from "@repo/design-system/components/layout/box";
import { Stack } from "@repo/design-system/components/layout/stack";
import { Typography } from "@repo/design-system/components/ui/typography";
import BackgroundImage from "@/components/background-image";
import { BreadCrumb } from "@/components/bread-crumb";
import { getMediaUrl } from "@/lib/payload-media-utils";

type MinimalHeroBlockType = Extract<HeroBlock, { blockType: "minimal-hero" }>;

type MinimalHeroProps = {
  block: MinimalHeroBlockType;
};

const MinimalHero = ({ block }: MinimalHeroProps) => {
  const bgImageSrc = getMediaUrl(block.bgImg);
  const isBreadcrumb = block.breadcrumb;

  return (
    <Box as="section" className="relative min-h-[25vw] bg-surface">
      {/*bg image*/}
      {bgImageSrc && (
        <BackgroundImage className="opacity-10" priority src={bgImageSrc} />
      )}
      <Stack className="relative z-10 mt-24 lg:mt-[8vw]" gap="sm">
        {/*bread crumbs*/}
        {isBreadcrumb && <BreadCrumb />}
        {/*title*/}
        <Typography as="h2" className="text-accent" variant="headingLG">
          {block.title}
        </Typography>
      </Stack>
    </Box>
  );
};

export default MinimalHero;
