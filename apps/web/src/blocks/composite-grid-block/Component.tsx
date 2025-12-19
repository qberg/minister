import BackgroundImage from "@/components/background-image";
import Heading from "@/components/heading";
import { getMediaUrl } from "@/lib/payload-media-utils";
import type { CompositeGridBlock as CompositeGridBlockProps } from "@/payload-types";
import { Box } from "@repo/design-system/components/layout/box";
import { Stack } from "@repo/design-system/components/layout/stack";
import { Typography } from "@repo/design-system/components/ui/typography";
import type { TypedLocale } from "payload";
import { ContentCard, ImageCard } from "./cards";

type Props = {
  locale?: TypedLocale;
  block: CompositeGridBlockProps;
};

export function CompositeGridBlock({ block }: Props) {
  const bgImageSrc = getMediaUrl(block.bgImg);
  const heading = block.heading;
  const description = block.description;

  return (
    <Box as="section" className="min-h-screen bg-surface">
      {bgImageSrc && (
        <BackgroundImage priority src={bgImageSrc} className="opacity-10" />
      )}
      <Stack className="relative z-10">
        {heading && <Heading text="About" />}

        {description && (
          <Typography
            as="p"
            variant="headingXXS"
            className="lg:max-w-[55ch] text-surface-muted"
          >
            {description}
          </Typography>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-3 gap-4 lg:gap-4 4xl:gap-8 md:auto-rows-fr">
          {block.items?.map((item, index) => {
            const key = item.id || index;

            switch (item.cardType) {
              case "image":
                return <ImageCard key={key} data={item} position={index % 4} />;
              case "content":
                return (
                  <ContentCard key={key} data={item} position={index % 4} />
                );
              default:
                return (
                  <div className="" key={key}>
                    Content
                  </div>
                );
            }
          })}
        </div>
      </Stack>
    </Box>
  );
}
