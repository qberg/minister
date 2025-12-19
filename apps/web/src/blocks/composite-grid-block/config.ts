import type { Block } from "payload";
import { link } from "@/Fields/link";

export const CompositeGridBlock: Block = {
  slug: "comp-grid",
  interfaceName: "CompositeGrid",
  labels: {
    singular: "Composite Grid",
    plural: "Composite Grids",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
    },
    {
      name: "items",
      type: "array",
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: "cardType",
          type: "select",
          required: true,
          options: [
            { label: "Image Card", value: "image" },
            { label: "Content Card", value: "content" },
          ],
          defaultValue: "image",
        },
        {
          name: "imageCard",
          type: "group",
          admin: {
            condition: (_, siblingData) => siblingData?.cardType === "image",
          },
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              required: true,
            },
          ],
        },
        {
          name: "contentCard",
          type: "group",
          admin: {
            condition: (_, siblingData) => siblingData?.cardType === "content",
          },
          fields: [
            {
              name: "title",
              type: "text",
              localized: true,
              required: true,
            },
            {
              name: "text",
              type: "textarea",
              localized: true,
              required: true,
            },
            link(),
          ],
        },
      ],
    },
  ],
};
