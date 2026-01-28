import type { Block } from "payload";
import { scrollLabel } from "@/Fields/scroll-label";

export const TimelineBlock: Block = {
  slug: "timeline",
  interfaceName: "TimelineBlock",
  labels: {
    singular: "Timeline",
    plural: "Timelines",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      localized: true,
    },

    scrollLabel,

    {
      name: "tagLine",
      type: "text",
      localized: true,
      label: "Tagline",
    },

    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        {
          name: "year",
          type: "text",
          required: true,
        },

        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },

        {
          name: "title",
          type: "text",
          localized: true,
          required: true,
        },

        {
          name: "description",
          type: "textarea",
          localized: true,
        },
      ],
    },
  ],
};
