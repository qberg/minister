import type { Block } from "payload";

export const InteractiveMapBlock: Block = {
  slug: "int-map",
  interfaceName: "InteractiveMapBlock",
  labels: {
    singular: "Interactive Map Section",
    plural: "Interactive Map Sections",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      localized: true,
      defaultValue: "Real Results of Alandur",
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
      label: "Instructional Text",
      defaultValue:
        "Explore completed projects, ongoing work, and constituency wide improvements all mapped and organized for you.",
    },
    {
      name: "mode",
      type: "select",
      defaultValue: "summary",
      label: "Display Mode",
      options: [
        { label: "Summary (Home Page)", value: "summary" },
        { label: "Full Dashboard (Dedicated Page)", value: "full" },
      ],
      admin: {
        description:
          "Summary mode shows a simplified view. Full mode allows deep linking.",
      },
    },

    {
      name: "headline",
      type: "text",
      localized: true,
      label: "Section Headline",
      defaultValue: "Real Results of Alandur",
      admin: {
        condition: (_, siblingData) => siblingData.mode === "summary",
      },
    },
  ],
};
