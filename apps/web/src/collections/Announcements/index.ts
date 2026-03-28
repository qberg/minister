import type { CollectionConfig } from "payload";
import {
  ContentManagerAccess,
  EveryoneAccess,
} from "@/access/collection-level-access";
import { isFeat } from "@/Fields/is-featured";

export const Announcements: CollectionConfig<"announcements"> = {
  slug: "announcements",
  labels: {
    singular: "Announcement",
    plural: "Announcements",
  },
  admin: {
    useAsTitle: "title",
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
        description: "Brief title or headline of the announcement",
      },
    },

    {
      name: "linkType",
      type: "radio",
      options: [
        { label: "File/Image", value: "internal" },
        { label: "External", value: "external" },
      ],
      defaultValue: "internal",
      admin: {
        layout: "horizontal",
      },
    },

    {
      name: "fileType",
      type: "select",
      options: [
        { label: "Image", value: "image" },
        { label: "File", value: "file" },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.linkType === "internal",
      },
      //@ts-expect-error types are not yet generated for siblingData destructuring
      validate: (val, { siblingData }) => {
        if (siblingData?.linkType === "internal" && !val) {
          return "File type is required for internal links";
        }
        return true;
      },
    },
    {
      name: "externalLink",
      type: "text",
      admin: {
        condition: (_, siblingData) => siblingData?.linkType === "external",
        description: "Link to the external site",
      },
      //@ts-expect-error types are not yet generated for siblingData destructuring
      validate: (val, { siblingData }) => {
        if (siblingData?.linkType === "external" && !val) {
          return "URL is required for external links";
        }
        return true;
      },
    },
    {
      name: "file",
      type: "upload",
      relationTo: "documents",
      admin: {
        condition: (_, siblingData) =>
          siblingData?.linkType === "internal" &&
          siblingData?.fileType === "file",
        description: "Upload the file",
      },
      //@ts-expect-error types are not yet generated for siblingData destructuring
      validate: (val, { siblingData }) => {
        if (
          siblingData?.linkType === "internal" &&
          siblingData?.fileType === "file" &&
          !val
        ) {
          return "File is required";
        }
        return true;
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: {
        condition: (_, siblingData) =>
          siblingData?.linkType === "internal" &&
          siblingData?.fileType === "image",
        description: "Upload the image",
      },
      //@ts-expect-error types are not yet generated for siblingData destructuring
      validate: (val, { siblingData }) => {
        if (
          siblingData?.linkType === "internal" &&
          siblingData?.fileType === "image" &&
          !val
        ) {
          return "Image is required";
        }
        return true;
      },
    },

    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: false,
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
        name: "badge",
        type: "text",
        localized: true, 
    },
    isFeat,
  ],
};
