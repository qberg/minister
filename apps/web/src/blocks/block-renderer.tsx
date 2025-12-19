import type { Page } from "@/payload-types";

import StickyStatsBlock from "./sticky-stats-block/Component";
import { LatestUpdatesBlock } from "./latest-updates-block/Component";
import type { TypedLocale } from "payload";

type BlockRendererProps = {
  blocks: Page["layout"];
  locale?: TypedLocale;
};

const blockComponents = {
  "sticky-stats": StickyStatsBlock,
  "latest-updates": LatestUpdatesBlock,
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
