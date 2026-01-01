"use client";

import { ScrollSpy } from "@repo/design-system/components/ui/scroll-spy";
import type { Header as HeaderData, Page } from "@/payload-types";
import type { AnimeScrollSectionData } from "@/types";
import { AnimeScrollBarSpy } from "../anime-scroll-bar-spy";

type Props = {
  blocks: Page["layout"];
  children: React.ReactNode;
  hasHero?: boolean;
  headerData?: HeaderData;
};

export const LayoutSpyWrapper = ({
  children,
  blocks,
  hasHero = false,
  headerData,
}: Props) => {
  const sections: AnimeScrollSectionData[] = [];

  if (hasHero) {
    sections.push({ id: "hero", title: "Hero" });
  }

  if (blocks) {
    blocks.forEach((block, index) => {
      // Try to find a meaningful title from the block data
      // @ts-expect-error - Adjust based on your actual block fields
      const rawTitle = block.scrollLabel || block.title || block.blockType;

      // Capitalize first letter if it's a blockType string
      let title = "Section";
      if (typeof rawTitle === "string") {
        title = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);
      }

      sections.push({
        id: `section-${index}`,
        title,
      });
    });
  }

  sections.push({ id: "footer", title: "Footer" });

  const defaultActive = hasHero
    ? "hero"
    : blocks && blocks.length > 0
      ? "section-0"
      : "footer";

  return (
    <ScrollSpy defaultValue={defaultActive} offset={500}>
      <AnimeScrollBarSpy navItems={headerData?.navItems} sections={sections} />
      <div className="relative w-full">{children}</div>
    </ScrollSpy>
  );
};
