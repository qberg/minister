import { Box } from "@repo/design-system/components/layout/box";
import { Stack } from "@repo/design-system/components/layout/stack";
import { Typography } from "@repo/design-system/components/ui/typography";
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
    <Box as="section" className="relative min-h-screen bg-foreground">
      <Stack>
        {heading && <Heading text={heading} />}
        {tagLine && (
          <Typography as="h2" className="text-yellow-100" variant="headingLG">
            {tagLine}
          </Typography>
        )}

        <TimeLineContent items={block.items || []} />
      </Stack>
    </Box>
  );
}
