import type { CollectionConfig } from "payload";
import {
  ContentManagerAccess,
  EveryoneAccess,
} from "@/access/collection-level-access";

export const VisionCategories: CollectionConfig<"vision-categories"> = {
  slug: "vision-categories",
  labels: {
    singular: "Vision Category",
    plural: "Vision Categories",
  },
  access: {
    create: ContentManagerAccess,
    read: EveryoneAccess,
    update: ContentManagerAccess,
    delete: ContentManagerAccess,
  },
  admin: {
    useAsTitle: "name",
    group: "Real Results of Alandur",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
    },
  ],
};
