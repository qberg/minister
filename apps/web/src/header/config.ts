import type { GlobalConfig } from "payload";
import {
  ContentManagerAccess,
  EveryoneAccess,
} from "@/access/collection-level-access";
import { link } from "@/Fields/link";
import { revalidateHeader } from "./hooks/revalidate-header";

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    update: ContentManagerAccess,
    read: EveryoneAccess,
  },
  fields: [
    {
      name: "navItems",
      type: "array",
      fields: [
        link(),
        {
          name: "icon",
          type: "select",
          label: "Icon (for mobile nav)",
          admin: {
            description: "Icon shown in the mobile bottom navigation bar",
          },
          defaultValue: "house",
          options: [
            { label: "Home", value: "house" },
            { label: "User (About)", value: "user" },
            { label: "Map", value: "map" },
            { label: "Bar Chart (Results)", value: "bar-chart-2" },
            { label: "Newspaper (Updates)", value: "newspaper" },
            { label: "Globe", value: "globe" },
            { label: "Info", value: "info" },
            { label: "Star", value: "star" },
            { label: "Building", value: "building-2" },
            { label: "Trophy", value: "trophy" },
          ],
        },

        {
          name: "mobileLabel",
          type: "text",
          label: "Short Label (mobile nav)",
          defaultValue: "Home",
          localized: true,
          admin: {
            description:
              "Keep it under 8 characters. Falls back to full label if empty.",
          },
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: "@/header/row-label#RowLabel",
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};
