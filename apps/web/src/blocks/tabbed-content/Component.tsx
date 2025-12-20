import BackgroundImage from "@/components/background-image";
import Heading from "@/components/heading";
import { getMediaUrl } from "@/lib/payload-media-utils";
import type { TabbedContentBlock as TabbedContentBlockProps } from "@/payload-types";
import { Box } from "@repo/design-system/components/layout/box";
import { Stack } from "@repo/design-system/components/layout/stack";
import { Typography } from "@repo/design-system/components/ui/typography";
import type { TypedLocale } from "payload";
import { TestScrollSpy } from "./test";

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
      overflow="visible"
      className="min-h-screen relative bg-surface"
    >
      {bgImageSrc && (
        <BackgroundImage src={bgImageSrc} className="opacity-10" />
      )}

      <Stack className="relative z-10">
        {heading && <Heading text={heading} />}

        {description && (
          <Typography
            as="p"
            variant="headingXXS"
            className="lg:max-w-[55ch] text-surface-muted"
          >
            {description}
          </Typography>
        )}

        <TestScrollSpy />
      </Stack>
    </Box>
  );
}
