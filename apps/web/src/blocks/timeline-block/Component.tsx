import { Box } from "@repo/design-system/components/layout/box";
import { Stack } from "@repo/design-system/components/layout/stack";
import { Typography } from "@repo/design-system/components/ui/typography";
import Image from "next/image";
import type { TypedLocale } from "payload";
import Heading from "@/components/heading";
import type { TimelineBlock as TimelineBlockProps } from "@/payload-types";
import TimeLineContent from "./timeline-content";

type Props = {
  locale?: TypedLocale;
  block: TimelineBlockProps;
};

export function TimelineBlock({ block }: Props) {
  const heading = block.heading;
  const tagLine = block.tagLine;
  return (
    <Box
      as="section"
      className="theme-dark relative min-h-screen bg-foreground"
    >
      <div className="absolute top-16 right-0 hidden aspect-square w-[50%] md:block">
        <Image
          alt="Bg Pattern"
          className="object-contain"
          fill
          loading="lazy"
          src={"/pattern-right.svg"}
        />
      </div>
      <Stack>
        {heading && <Heading text={heading} />}
        {tagLine && (
          <Typography as="h2" intent={"body"} variant="headingLG">
            {tagLine}
          </Typography>
        )}

        <TimeLineContent items={block.items || []} />
      </Stack>
    </Box>
  );
}
