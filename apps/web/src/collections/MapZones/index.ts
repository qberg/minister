import type { CollectionConfig } from "payload";
import {
  ContentManagerAccess,
  EveryoneAccess,
} from "@/access/collection-level-access";
import { createSlugField } from "@/Fields/slug";

export const MapZones: CollectionConfig<"map-zones"> = {
  slug: "map-zones",
  labels: {
    singular: "Map Zone",
    plural: "Map Zones",
  },
  access: {
    create: ContentManagerAccess,
    read: EveryoneAccess,
    update: ContentManagerAccess,
    delete: ContentManagerAccess,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "type"],
    group: "Real Results of Alandur",
  },
  fields: [
    {
      name: "name",
      type: "text",
      localized: true,
      required: true,
      label: "Display Name",
      admin: {
        description:
          'The name shown in the tooltip and header (e.g., "Ward 160" or "Iyyapanthangal")',
      },
    },

    ...createSlugField("name"),

    {
      name: "type",
      type: "select",
      options: [
        { value: "panchayat", label: "Panchayat" },
        { value: "ward", label: "Ward" },
      ],
      required: true,
      defaultValue: "ward",
      admin: {
        position: "sidebar",
      },
    },

    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Zone Preview Image",
      admin: {
        description: "Shown in the map tooltip on hover",
      },
    },

    {
      type: "row",
      fields: [
        {
          name: "population",
          type: "number",
          admin: { description: "Approximate population" },
        },
        {
          name: "areaSqKm",
          type: "number",
          label: "Area (sq km)",
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "totalAmount",
          type: "number",
          admin: { description: "Amount Spent for this zone" },
        },
        {
          name: "totalActivities",
          type: "number",
          label: "Development Activities"
        },
        {
          name: "totalIssues",
          type: "number",
          label: "Issues Addressed"
        },
      ],
    },
    {
      name: 'issuesBreakdown',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'issueType',
              type: 'relationship',
              relationTo: 'issues',
              hasMany: false,
            },
            {
              name: 'activityCount',
              type: 'number',
            }
          ]
        }
      ]
    }
  ],
};
