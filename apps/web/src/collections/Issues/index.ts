import type { CollectionConfig } from "payload";
import {
  ContentManagerAccess,
  EveryoneAccess,
} from "@/access/collection-level-access";
import { createSlugField } from "@/Fields/slug";

export const Issues: CollectionConfig<"issues"> = {
  slug: "issues",
  labels: {
    singular: "Issue/Work Type",
    plural: "Issues/Work Types",
  },
  access: {
    create: ContentManagerAccess,
    read: EveryoneAccess,
    update: ContentManagerAccess,
    delete: ContentManagerAccess,
  },
  admin: {
    group: "Real Results of Alandur",
    defaultColumns: ["name", "slug"],
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      localized: true,
      required: true,
      label: "Name of the issue adressed",
      admin: {
        placeholder: "Road, Water,...",
      },
    },

    ...createSlugField("name"),

    {
      name: "icon",
      type: "upload",
      relationTo: "media",
      label: "Image",
    },

    {
      name: "color",
      type: "select",
      label: "Colour of the overlay",
      options: [
        {
          value: "blue",
          label: "Blue",
        },
        {
          value: "yellow",
          label: "Yellow",
        },
        {
          value: "neutral",
          label: "Neutral",
        },
      ],
      defaultValue: "blue",
      admin: {
        position: "sidebar",
      },
    },

    {
      name: "overlayType",
      type: "select",
      label: "Overlay Type",
      options: [
        {
          value: "solid",
          label: "Solid",
        },
        {
          value: "gradient",
          label: "Gradient",
        },
      ],
      defaultValue: "solid",
      admin: {
        position: "sidebar",
      },
    },
  ],
};
