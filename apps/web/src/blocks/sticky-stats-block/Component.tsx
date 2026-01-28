import { Box } from "@repo/design-system/components/layout/box";
import { Stack } from "@repo/design-system/components/layout/stack";
import { Typography } from "@repo/design-system/components/ui/typography";
import Image from "next/image";
import type { TypedLocale } from "payload";
import BackgroundImage from "@/components/background-image";
import { StickyScroll } from "@/components/layout/sticky-scroll";
import { getMediaUrl } from "@/lib/payload-media-utils";
import type { LayoutBlock, StickyStatsVariant } from "@/types";
import { StatBlock, StatGrid, StatItem } from "./stat-block";
import { stickyStatsVariants } from "./variants";

type StickyStatsBlockProps = {
  block: Extract<LayoutBlock, { blockType: "sticky-stats" }>;
  locale?: TypedLocale;
};

const StickyStatsBlock = ({ block, locale }: StickyStatsBlockProps) => {
  const variant = (block.variant as StickyStatsVariant) ?? "midnight";
  const bgImageUrl = getMediaUrl(block.bgImg, "/images/about-bg.png");

  const theme = variant === "light" ? "theme-light" : "theme-dark";

  const tImg = block.hls?.tImg;
  const tImgUrl = getMediaUrl(tImg, "/images/about-bg.png");

  const wImg = block.hls?.wImg;
  const wImgUrl = typeof wImg === "object" ? wImg?.url : null;

  return (
    <>
      <StickyScroll className={`${theme} relative min-h-[200vh]`}>
        <BackgroundImage overlay="dark" src={bgImageUrl} />

        <div className="sticky top-0 z-10 flex h-screen flex-wrap items-center justify-center">
          <Typography
            as="h1"
            className="z-10 max-w-[90%] break-words text-center text-[#fafafa]"
            variant="display"
          >
            {block.headline}
          </Typography>
        </div>
      </StickyScroll>

      <Box
        as="section"
        className={stickyStatsVariants({ variant })}
        invert={variant === "light"}
      >
        {variant === "blue" && (
          <BackgroundImage className="opacity-30" src="/images/about-bg.png" />
        )}
        <Stack>
          <div className="border-secondary border-b-2">
            <Typography as="h6" className="mb-2 text-secondary" variant="h6">
              {block.headline}
            </Typography>
          </div>

          {block.description?.map((item, index) => (
            <Typography
              as="p"
              intent={"body"}
              key={item.id ?? `desc-${index}`}
              variant="headingXS"
            >
              {item.para}
            </Typography>
          ))}

          <Typography as="h2" intent={"title"} variant="headingLG">
            {block.hls?.title || "Key Highlights"}
          </Typography>

          <div className="flex w-full flex-col gap-9 lg:flex-row lg:justify-between">
            {/* deco Images*/}
            <div className="flex w-full flex-col gap-4 lg:w-[33%] lg:gap-[25vw]">
              {tImgUrl && (
                <div className="relative aspect-[0.75/1] w-full overflow-hidden rounded-md lg:w-[90%]">
                  <div className="absolute inset-0">
                    <Image
                      alt="Deco Image"
                      className="object-cover"
                      fill
                      priority
                      src={tImgUrl}
                      unoptimized
                    />
                  </div>
                </div>
              )}

              {wImgUrl && (
                <div className="relative aspect-[1.75/1] w-full overflow-hidden rounded-md lg:w-[90%]">
                  <div className="absolute inset-0">
                    <Image
                      alt="Deco Image"
                      className="object-cover"
                      fill
                      priority
                      src={wImgUrl}
                      unoptimized
                    />
                  </div>
                </div>
              )}
            </div>

            {/* stat block*/}
            <Stack className="z-10 w-full lg:w-[57%]">
              <Stack>
                {block.hls?.sBlk?.map((statBlock, index) => (
                  <StatBlock
                    description={statBlock.desc}
                    key={statBlock.id || `stat-${index}`}
                    title={statBlock.title}
                    variant={variant}
                  >
                    <StatGrid>
                      {statBlock.stats?.map((stat, statIndex) => (
                        <StatItem
                          index={statIndex}
                          key={stat.id ?? `stat-item-${statIndex}`}
                          label={stat.l}
                          value={stat.v}
                          variant={variant}
                        />
                      ))}
                    </StatGrid>
                  </StatBlock>
                ))}
              </Stack>
            </Stack>
          </div>
        </Stack>
      </Box>
    </>
  );
};

export default StickyStatsBlock;
