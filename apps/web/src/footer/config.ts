import type { GlobalConfig } from "payload";
import {
  ContentManagerAccess,
  EveryoneAccess,
} from "@/access/collection-level-access";
import { link } from "@/Fields/link";
import { revalidateFooter } from "./hooks/revalidate-footer";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    update: ContentManagerAccess,
    read: EveryoneAccess,
  },

  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      required: true,
    },

    {
      name: "desc",
      type: "text",
      localized: true,
      required: true,
    },

    {
      name: "bgImg",
      type: "upload",
      relationTo: "media",
      label: "Background Image",
    },

    {
      name: "socialLinks",
      type: "array",
      label: "Social Media Links",
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: "platform",
          type: "select",
          label: "Platform",
          required: true,
          options: [
            { label: "Instagram", value: "instagram" },
            { label: "Twitter/X", value: "twitter" },
            { label: "Facebook", value: "facebook" },
            { label: "YouTube", value: "youtube" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "GitHub", value: "github" },
          ],
        },
      ],
    },

    {
      name: "contacts",
      type: "group",
      fields: [
        {
          name: "phone",
          type: "text",
        },
        {
          name: "email",
          type: "text",
        },
        {
          name: "address",
          type: "text",
        },
      ],
    },

    {
      name: "navItems",
      type: "array",
      fields: [link()],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: "@/footer/row-label#RowLabel",
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
};
