import { Box } from "@repo/design-system/components/layout/box";
import { Stack } from "@repo/design-system/components/layout/stack";
import { Typography } from "@repo/design-system/components/ui/typography";
import BackgroundImage from "@/components/background-image";
import { StickyScroll } from "@/components/layout/sticky-scroll";
import { getMediaUrl } from "@/lib/payload-media-utils";
import type { LayoutBlock, StickyStatsVariant } from "@/types";
import { StatBlock, StatGrid, StatItem } from "./stat-block";
import { stickyStatsTextVariants, stickyStatsVariants } from "./variants";

type StickyStatsBlockProps = Extract<
  LayoutBlock,
  { blockType: "sticky-stats" }
>;

const StickyStatsBlock = ({ block }: { block: StickyStatsBlockProps }) => {
  const variant = (block.variant as StickyStatsVariant) ?? "midnight";
  const bgImageUrl = getMediaUrl(block.bgImg, "/images/about-bg.png");

  return (
    <>
      <StickyScroll className="min-h-[200vh]">
        <BackgroundImage overlay="dark" src={bgImageUrl} />

        <Typography as="h1" className="z-10 text-background" variant="display">
          Political
          <br /> Impact
        </Typography>
      </StickyScroll>

      <Box as="section" className={stickyStatsVariants({ variant })}>
        {variant === "blue" && (
          <BackgroundImage className="opacity-30" src="/images/about-bg.png" />
        )}
        <Stack>
          <div className="border-secondary border-b-2">
            <Typography as="h6" className="mb-2 text-secondary" variant="h6">
              Political Impact
            </Typography>
          </div>

          {block.description?.map((item, index) => (
            <Typography
              as="p"
              className={stickyStatsTextVariants({ variant })}
              key={item.id ?? `desc-${index}`}
              variant="headingXXS"
            >
              {item.para}
            </Typography>
          ))}

          <Typography as="h2" className="text-secondary" variant="headingLG">
            Key Highlights
          </Typography>

          <div className="flex w-full flex-col gap-9 lg:flex-row lg:justify-between">
            {/* deco Images*/}
            <div className="w-full lg:w-[33%]">Images</div>

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
