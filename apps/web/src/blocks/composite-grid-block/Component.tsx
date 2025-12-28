import { Box } from "@repo/design-system/components/layout/box";
import { Stack } from "@repo/design-system/components/layout/stack";
import { Typography } from "@repo/design-system/components/ui/typography";
import type { TypedLocale } from "payload";
import BackgroundImage from "@/components/background-image";
import Heading from "@/components/heading";
import { getMediaUrl } from "@/lib/payload-media-utils";
import type { CompositeGridBlock as CompositeGridBlockProps } from "@/payload-types";
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
    <Box as="section" className="relative bg-surface">
      {bgImageSrc && (
        <BackgroundImage className="opacity-10" src={bgImageSrc} />
      )}
      <Stack className="relative z-10">
        {heading && <Heading text="About" />}

        {description && (
          <Typography
            as="p"
            className="text-surface-muted lg:max-w-[55ch]"
            variant="headingXXS"
          >
            {description}
          </Typography>
        )}

        <div className="grid grid-cols-1 4xl:gap-8 gap-4 md:auto-rows-fr lg:grid-cols-3 lg:grid-rows-3 lg:gap-4">
          {block.items?.map((item, index) => {
            const key = item.id || index;

            switch (item.cardType) {
              case "image":
                return <ImageCard data={item} key={key} position={index % 4} />;
              case "content":
                return (
                  <ContentCard data={item} key={key} position={index % 4} />
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
