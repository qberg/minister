import {
  ContentManagerAccess,
  EveryoneAccess,
} from "@/access/collection-level-access";
import { createSlugField } from "@/Fields/slug";
import type { CollectionConfig } from "payload";

export const Tags: CollectionConfig<"tags"> = {
  slug: "tags",
  labels: {
    singular: "Tag",
    plural: "Tags",
  },
  access: {
    create: ContentManagerAccess,
    read: EveryoneAccess,
    update: ContentManagerAccess,
    delete: ContentManagerAccess,
  },
  fields: [
    {
      name: "label",
      type: "text",
      localized: true,
      required: true,
    },
    ...createSlugField("label"),
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Display order (lower numbers first)",
      },
    },
  ],
};
