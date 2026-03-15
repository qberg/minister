import config from "@payload-config";
import { ScrollSpyContent } from "@repo/design-system/components/ui/scroll-spy";
import { getPayload, type TypedLocale } from "payload";
import type { IssueOption } from "@/app/actions/get-issues";
import type { Page } from "@/payload-types";
import { CompositeGridBlock } from "./composite-grid-block/Component";
import { GalleryBlock } from "./gallery-block/Component";
import InteractiveMapBlock from "./interactive-map-block/Component";
import { LatestUpdatesBlock } from "./latest-updates-block/Component";
import SocialMediaBlock from "./social-media-block/Component";
import StickyStatsBlock from "./sticky-stats-block/Component";
import { SurveyFormBlock } from "./survey-form-block/Component";
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
  survey: SurveyFormBlock,
  gallery: GalleryBlock,
};

export async function BlockRenderer({ locale, blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  const payload = await getPayload({ config });

  const [mapZonesReq, issuesReq] = await Promise.all([
    payload.find({
      collection: "map-zones",
      limit: 100,
      pagination: false,
      locale,
    }),
    payload.find({
      collection: "issues",
      limit: 100,
      pagination: false,
      locale,
    }),
  ]);

  const mapZones = mapZonesReq.docs.map((d) => ({
    id: d.id,
    label: d.name || `Zone ${d.id}`,
  }));

  const visionCategories = issuesReq.docs.map((d) => ({
    id: d.id,
    label: d.name || `Category ${d.id}`,
  }));

  const issueOptions: IssueOption[] = issuesReq.docs.map((d) => ({
    id: d.id,
    name: d.name,
    slug: d.slug as string,
  }));

  return (
    <>
      {blocks.map((block, index) => {
        const sectionId = `section-${index}`;
        const BlockComponent =
          blockComponents[block.blockType as keyof typeof blockComponents];

        if (!BlockComponent) {
          return null;
        }

        return (
          <ScrollSpyContent
            className="relative"
            key={block.id || index}
            value={sectionId}
          >
            {block.blockType === "survey" ? (
              <SurveyFormBlock
                block={block}
                locale={locale || "ta-IN"}
                mapZones={mapZones}
                visionCategories={visionCategories}
              />
            ) : block.blockType === "int-map" ? (
              <InteractiveMapBlock
                block={block}
                issueOptions={issueOptions}
                locale={locale || "ta-IN"}
              />
            ) : (
              <>
                {/* @ts-expect-error there may be some mismatch between the expected types here */}
                <BlockComponent block={block} locale={locale || "ta-IN"} />
              </>
            )}
          </ScrollSpyContent>
        );
      })}
    </>
  );
}
