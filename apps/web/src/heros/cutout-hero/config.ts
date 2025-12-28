import type { Block } from "payload";

export const CutoutHero: Block = {
  slug: "cutout-hero",
  interfaceName: "CutoutHero",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      defaultValue: "Over 45 Years in Public Service",
    },

    {
      name: "desc",
      type: "textarea",
      localized: true,
      required: true,
      defaultValue:
        "Minister for MSME, Rural Industries & Urban Habitat Development. Three-term MLA of Alandur with a focus on development.",
    },

    {
      name: "portraits",
      type: "array",
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: "image",
          type: "upload",
          required: true,
          relationTo: "media",
        },
      ],
    },

    {
      name: "cutout",
      type: "upload",
      label: "Cutout Portrait of TMA",
      relationTo: "media",
    },

    {
      name: "stats",
      type: "array",
      fields: [
        {
          name: "l",
          type: "text",
          localized: true,
          label: "Label",
          required: true,
        },
        {
          name: "v",
          type: "text",
          localized: true,
          label: "Label",
          required: true,
        },
      ],
    },
  ],
};
