import type { Block } from "payload";

export const MinimalHero: Block = {
  slug: "minimal-hero",
  fields: [
    { name: "title", type: "text", localized: true, required: true },
    {
      name: "bgImg",
      type: "upload",
      relationTo: "media",
      label: "Background Image",
    },
    {
      name: "breadcrumb",
      type: "checkbox",
      label: "Enable Breadcrumbs",
    },
  ],
};
