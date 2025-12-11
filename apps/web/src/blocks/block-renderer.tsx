import type { Page } from "@/payload-types";

import StickyStatsBlock from "./sticky-stats-block/Component";

type BlockRendererProps = {
  blocks: Page["layout"];
};

const blockComponents = {
  "sticky-stats": StickyStatsBlock,
};

export function BlockRenderer({ blocks }: BlockRendererProps) {
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

        return <BlockComponent block={block} key={block.id || index} />;
      })}
    </>
  );
}
