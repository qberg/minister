import type { CollectionConfig } from "payload";
import {
  ContentManagerAccess,
  EveryoneAccess,
} from "@/access/collection-level-access";
import { CompositeGridBlock } from "@/blocks/composite-grid-block/config";
import { LatestUpdatesBlock } from "@/blocks/latest-updates-block/config";
import { StickyStatsBlock } from "@/blocks/sticky-stats-block/config";
import { TabbedContentBlock } from "@/blocks/tabbed-content-block/config";
import { TimelineBlock } from "@/blocks/timeline-block/config";
import { createPublishedDateField } from "@/Fields/published-date";
import { createSlugField } from "@/Fields/slug";
import { MinimalHero } from "@/heros/minimal-hero/config";
import { ParallaxHero } from "@/heros/parallax-hero/config";
import { PopulatePublishDateHook } from "@/hooks/populate-publish-date";
import { generatePreviewPath } from "@/utils/generate-preview-path";

export const Pages: CollectionConfig<"pages"> = {
  slug: "pages",
  labels: {
    singular: "Page",
    plural: "Pages",
  },
  access: {
    create: ContentManagerAccess,
    read: EveryoneAccess,
    update: ContentManagerAccess,
    delete: ContentManagerAccess,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: "pages",
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: "pages",
        req,
      }),
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },

    {
      name: "excerpt",
      type: "textarea",
      localized: true,
      maxLength: 160,
      admin: {
        description: "Brief summary. Used as SEO description fallback.",
      },
    },

    {
      type: "tabs",
      tabs: [
        {
          fields: [
            {
              name: "hero",
              type: "blocks",
              minRows: 0,
              maxRows: 1,
              blocks: [ParallaxHero, MinimalHero],
            },
          ],
          label: "Hero",
        },
        {
          fields: [
            {
              name: "layout",
              type: "blocks",
              blocks: [
                StickyStatsBlock,
                LatestUpdatesBlock,
                CompositeGridBlock,
                TimelineBlock,
                TabbedContentBlock,
              ],
            },
          ],
          label: "Content",
        },
      ],
    },

    ...createSlugField("title"),
    ...createPublishedDateField(),
  ],

  hooks: { beforeChange: [PopulatePublishDateHook] },

  trash: true,

  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 10,
  },
};
