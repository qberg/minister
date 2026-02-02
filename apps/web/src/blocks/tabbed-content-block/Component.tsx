import { Box } from "@repo/design-system/components/layout/box";
import { Stack } from "@repo/design-system/components/layout/stack";
import { Typography } from "@repo/design-system/components/ui/typography";
import type { TypedLocale } from "payload";
import BackgroundImage from "@/components/background-image";
import Heading from "@/components/heading";
import { getMediaUrl } from "@/lib/payload-media-utils";
import type { TabbedContentBlock as TabbedContentBlockProps } from "@/payload-types";
import MorphCards from "./morph-cards";
import ScrollCards from "./scroll-cards";

type Props = {
  locale?: TypedLocale;
  block: TabbedContentBlockProps;
};

export function TabbedContentBlock({ block }: Props) {
  const bgImageSrc = getMediaUrl(block.bgImg);
  const heading = block.heading;
  const description = block.description;

  return (
    <Box
      as="section"
      className="theme-dark relative min-h-screen bg-surface"
      overflow="visible"
    >
      {bgImageSrc && (
        <BackgroundImage className="opacity-40" src={bgImageSrc} />
      )}

      <Stack className="relative z-10">
        {heading && <Heading text={heading} />}

        {description && (
          <Typography
            as="p"
            className="text-surface-muted lg:max-w-[98ch]"
            variant="headingXS"
          >
            {description}
          </Typography>
        )}

        {block.tabs && <ScrollCards items={block.tabs || []} />}

        {block.tabs && block.tabs.length !== 0 && (
          <MorphCards items={block.tabs || []} />
        )}
      </Stack>
    </Box>
  );
}
