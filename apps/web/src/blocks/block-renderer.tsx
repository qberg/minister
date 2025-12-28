import type { TypedLocale } from "payload";
import type { Page } from "@/payload-types";
import { CompositeGridBlock } from "./composite-grid-block/Component";
import InteractiveMapBlock from "./interactive-map-block/Component";
import { LatestUpdatesBlock } from "./latest-updates-block/Component";
import SocialMediaBlock from "./social-media-block/Component";
import StickyStatsBlock from "./sticky-stats-block/Component";
import { TabbedContentBlock } from "./tabbed-content-block/Component";
import { TimelineBlock } from "./timeline-block/Component";

type BlockRendererProps = {
  blocks: Page["layout"];
  locale?: TypedLocale;
};

const blockComponents = {
  "sticky-stats": StickyStatsBlock,
  "latest-updates": LatestUpdatesBlock,
  "comp-grid": CompositeGridBlock,
  "tab-content": TabbedContentBlock,
  timeline: TimelineBlock,
  "int-map": InteractiveMapBlock,
  "social-media": SocialMediaBlock,
};

export function BlockRenderer({ locale, blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <>
      {blocks.map((block, index) => {
        const BlockComponent =
          blockComponents[block.blockType as keyof typeof blockComponents];

        if (!BlockComponent) {
          return null;
        }

        return (
          <BlockComponent
            block={block}
            key={block.id || index}
            locale={locale || "ta-IN"}
          />
        );
      })}
    </>
  );
}
