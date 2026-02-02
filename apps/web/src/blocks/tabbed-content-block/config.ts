import type { Block } from "payload";
import { scrollLabel } from "@/Fields/scroll-label";

export const TabbedContentBlock: Block = {
  slug: "tab-content",
  interfaceName: "TabbedContentBlock",
  labels: {
    singular: "Tabbed Content",
    plural: "Tabbed Contents",
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
      name: "description",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "bgImg",
      type: "upload",
      relationTo: "media",
    },

    {
      name: "tabs",
      type: "array",
      minRows: 1,
      fields: [
        {
          name: "label",
          type: "text",
          localized: true,
          required: true,
        },

        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },

        {
          name: "logo",
          type: "upload",
          relationTo: "media",
          required: true,
        },

        {
          name: "description",
          type: "textarea",
          localized: true,
          required: true,
        },

        {
          name: "stats",
          type: "array",
          fields: [
            {
              name: "v",
              label: "Value",
              type: "text",
              required: true,
              localized: true,
            },

            {
              name: "l",
              label: "Label",
              type: "text",
              required: true,
              localized: true,
            },
          ],
        },
      ],
    },
  ],
};
