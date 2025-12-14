import {
  ContentManagerAccess,
  EveryoneAccess,
} from "@/access/collection-level-access";
import type { CollectionConfig } from "payload";

export const NewspaperFeatuers: CollectionConfig<"news-feat"> = {
  slug: "news-feat",
  labels: {
    singular: "Newspaper Feature",
    plural: "Newspaper Features",
  },
  access: {
    create: ContentManagerAccess,
    read: EveryoneAccess,
    update: ContentManagerAccess,
    delete: ContentManagerAccess,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      admin: {
        description: "Brief title or headline of the feature",
      },
    },
    {
      name: "newspaper",
      type: "text",
      localized: true,
      admin: {
        description: 'Name of newspaper (e.g., "The Hindu", "Times of India")',
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: false,
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "publishedDate",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "externalLink",
      type: "text",
      admin: {
        description: "Optional: Link to online version of article",
      },
    },
  ],
};
