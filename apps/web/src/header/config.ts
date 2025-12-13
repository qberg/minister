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
      fields: [link()],
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
