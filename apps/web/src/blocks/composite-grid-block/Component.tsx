import { Box } from "@repo/design-system/components/layout/box";
import { Stack } from "@repo/design-system/components/layout/stack";
import { Typography } from "@repo/design-system/components/ui/typography";
import type { TypedLocale } from "payload";
import BackgroundImage from "@/components/background-image";
import Heading from "@/components/heading";
import { getMediaUrl } from "@/lib/payload-media-utils";
import type { CompositeGridBlock as CompositeGridBlockProps } from "@/payload-types";
import { ContentCard, ImageCard } from "./cards";
import { Carousel } from "@/components/timeout-carousel";

type Props = {
  locale?: TypedLocale;
  block: CompositeGridBlockProps;
};

// export type CarouselItem = NonNullable<CompositeGridBlockProps["items"]>[number] & {
//   cardType: "carousel",
//   carouselCard: NonNullable<NonNullable<CompositeGridBlockProps["items"]>[number]["carouselCard"]>
// }

export type CarouselCard = NonNullable<NonNullable<CompositeGridBlockProps["items"]>[number]["carouselCard"]>[number]

const getPositionVariant = (index: number): "0" | "1" | "2" | "3" => {
  const position = index % 4;
  return position.toString() as "0" | "1" | "2" | "3";
};

export function CompositeGridBlock({ block }: Props) {
  const bgImageSrc = getMediaUrl(block.bgImg);
  const heading = block.heading;
  const description = block.description;

  const carouselCards: CarouselCard[] = block.items?.filter(item => item.cardType === "carousel" && item.carouselCard?.length).flatMap(item => item.carouselCard ?? []) ?? []
  const imageCards = block.items?.filter(item => item.cardType === "image")
  const contentCards = block.items?.filter(item => item.cardType === "content")

  return (
    <Box as="section" className="theme-dark relative bg-surface">
      {bgImageSrc && (
        <BackgroundImage className="opacity-10" src={bgImageSrc} />
      )}
      <Stack className="relative z-10">
        {heading && <Heading text={heading} />}

        {description && (
          <Typography
            as="p"
            className="lg:max-w-[92ch]"
            intent={"body"}
            variant="headingXS"
          >
            {description}
          </Typography>
        )}

        <div className="grid grid-cols-1 4xl:gap-8 gap-6 md:auto-rows-fr md:grid-cols-3 md:grid-rows-3 md:gap-4">
          {imageCards?.map((item, index) => {
            return (
              <ImageCard
                data={item}
                key={item.id || index}
                position={getPositionVariant(index)}
              />
            )
          })}
          {contentCards?.map((item, index) => {
            return (
              <ContentCard
                data={item}
                key={item.id || index}
                position={getPositionVariant(index)}
              />
            )
          })}
          {/* {block.items?.map((item, index) => {
            const key = item.id || index;

            switch (item.cardType) {
              case "image":
                return (
                  <ImageCard
                    data={item}
                    key={key}
                    position={getPositionVariant(index)}
                  />
                );
              case "content":
                return (
                  <ContentCard
                    data={item}
                    key={key}
                    position={getPositionVariant(index)}
                  />
                );
              default:
                return (
                  <div className="" key={key}>
                    Content
                  </div>
                );
            }
          })} */}
          <Carousel array={carouselCards} />
        </div>
      </Stack>
    </Box>
  );
}
