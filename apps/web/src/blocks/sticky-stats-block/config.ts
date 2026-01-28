import type { Block } from "payload";
import { scrollLabel } from "@/Fields/scroll-label";

export const StickyStatsBlock: Block = {
  slug: "sticky-stats",

  fields: [
    {
      name: "bgImg",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Background Image",
    },

    scrollLabel,

    {
      name: "headline",
      type: "text",
      required: true,
      localized: true,
      admin: {
        description: "The text overlay on top of image",
      },
    },

    {
      name: "variant",
      type: "radio",
      defaultValue: "midnight",
      options: [
        {
          value: "midnight",
          label: "Midnight",
        },

        {
          value: "blue",
          label: "Blue",
        },

        {
          value: "light",
          label: "Light",
        },
      ],
    },

    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },

    {
      name: "description",
      type: "array",
      fields: [
        {
          name: "para",
          type: "textarea",
          label: "Paragraph",
          localized: true,
          required: true,
        },
      ],
    },

    {
      name: "hls",
      label: "Highlights",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
          defaultValue: "Key Highlights",
        },

        {
          name: "tImg",
          type: "upload",
          relationTo: "media",
          label: "Tall Image",
        },

        {
          name: "wImg",
          type: "upload",
          relationTo: "media",
          label: "Wide Image",
        },
        {
          name: "sBlk",
          type: "array",
          label: "Stat Block",
          fields: [
            {
              name: "title",
              type: "text",
              localized: true,
              required: true,
            },

            {
              name: "desc",
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
    },
  ],
};
