import type { Block } from "payload";
import { link } from "@/Fields/link";

export const VideoHero: Block = {
  slug: "video-hero",
  interfaceName: "VideoHero",
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

    link(),

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
      name: "bgVideo",
      type: "upload",
      relationTo: "media",
      label: "Desktop Video (Landscape)",
    },

    {
      name: "mobileBgVideo",
      type: "upload",
      relationTo: "media",
      required: false,
      label: "Mobile Video (Portrait)",
      admin: {
        description: "If left empty, the Desktop video will be used.",
      },
    },

    {
      name: "cutout",
      type: "upload",
      label: "Cutout Portrait of TMA",
      relationTo: "media",
    },
  ],
};
