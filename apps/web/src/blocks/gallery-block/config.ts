import type { Block } from "payload";

export const GalleryBlock: Block = {
  slug: "gallery",
  interfaceName: "GalleryBlock",
  fields: [
    {
      name: "galleryImage",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "location",
          type: "text",
          localized: true,
          required: true,
        },
        {
          name: "caption",
          type: "text",
          localized: true,
        }
      ],
    },
  ],
};

