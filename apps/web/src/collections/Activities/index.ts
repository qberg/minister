import type { CollectionConfig } from "payload";
import {
  ContentManagerAccess,
  EveryoneAccess,
} from "@/access/collection-level-access";

export const Activities: CollectionConfig<"activities"> = {
  slug: "activities",
  labels: {
    singular: "Development Activity",
    plural: "Development Activities",
  },
  access: {
    create: ContentManagerAccess,
    read: EveryoneAccess,
    update: ContentManagerAccess,
    delete: ContentManagerAccess,
  },
  admin: {
    group: "Real Results of Alandur",
    useAsTitle: "title",
    defaultColumns: ["title", "cost", "type", "zone"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Activity Name",
      admin: {
        placeholder:
          "Providing Cement concrete Pavement to VOC street in srinivasapuram village at Paraniputhur Panchayat.",
      },
    },
    {
      name: "cost",
      type: "number",
      required: true,
      label: "Amount Spent",
    },

    {
      name: "type",
      type: "relationship",
      relationTo: "issues",
      hasMany: false,
      label: "Issue/Work Category",
      admin: {
        position: "sidebar",
      },
    },

    {
      name: "zone",
      type: "relationship",
      relationTo: "map-zones",
      label: "Ward/Village where the activity was undertaken",
      admin: {
        position: "sidebar",
      },
    },

    {
      name: "scheme",
      type: "text",
      label: "Scheme Name",
      admin: {
        placeholder: "e.g., MLACDS, 15th CFC, SIDS",
      },
    },
    {
      name: "financialYear",
      type: "text",
      label: "Year",
      defaultValue: "2021-2022",
    },
    {
      name: "status",
      type: "select",
      defaultValue: "completed",
      options: [
        { label: "Planned", value: "planned" },
        { label: "In Progress", value: "in-progress" },
        { label: "Completed", value: "completed" },
      ],
    },
  ],
};
