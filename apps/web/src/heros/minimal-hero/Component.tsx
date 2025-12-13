import BackgroundImage from "@/components/background-image";
import { BreadCrumb } from "@/components/bread-crumb";
import { getMediaUrl } from "@/lib/payload-media-utils";
import { Box } from "@repo/design-system/components/layout/box";
import { Stack } from "@repo/design-system/components/layout/stack";
import { Typography } from "@repo/design-system/components/ui/typography";

type MinimalHeroBlockType = Extract<HeroBlock, { blockType: "minimal-hero" }>;

type MinimalHeroProps = {
  block: MinimalHeroBlockType;
};

const MinimalHero = ({ block }: MinimalHeroProps) => {
  const bgImageSrc = getMediaUrl(block.bgImg);
  const isBreadcrumb = block.breadcrumb;

  return (
    <Box as="section" className="min-h-[25vw] relative bg-surface">
      {/*bg image*/}
      {bgImageSrc && (
        <BackgroundImage priority src={bgImageSrc} className="opacity-10" />
      )}
      <Stack gap="sm" className="mt-24 lg:mt-[8vw] relative z-10">
        {/*bread crumbs*/}
        {isBreadcrumb && <BreadCrumb />}
        {/*title*/}
        <Typography as="h2" variant="headingLG" className="text-accent">
          {block.title}
        </Typography>
      </Stack>
    </Box>
  );
};

export default MinimalHero;
