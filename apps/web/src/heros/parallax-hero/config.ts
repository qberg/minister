import type { Block } from "payload";

export const ParallaxHero: Block = {
  slug: "parallax-hero",
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      required: true,
    },

    {
      type: "row",
      fields: [
        {
          name: "centerImg",
          type: "upload",
          relationTo: "media",
          required: true,
          admin: {
            width: "50%",
          },
        },
        {
          name: "bgImg",
          type: "upload",
          label: "Background Image",
          relationTo: "media",
          admin: {
            width: "50%",
          },
        },
      ],
    },

    {
      name: "bgText",
      type: "text",
      label: "Background Display Text",
      required: true,
      localized: true,
    },

    {
      name: "content",
      type: "array",
      fields: [
        {
          name: "para",
          type: "textarea",
          label: "Para",
          localized: true,
          required: true,
        },
      ],
    },
  ],
};
