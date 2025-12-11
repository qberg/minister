import type { CollectionConfig } from "payload";
import {
  AdminAccess,
  SelfOrAdminAccess,
} from "@/access/collection-level-access";
import { AdminFieldAccess } from "@/access/field-level-access";
import { isActive } from "@/Fields/is-active";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    group: "Site Config",
    useAsTitle: "email",
  },
  access: {
    create: AdminAccess,
    read: SelfOrAdminAccess,
    update: SelfOrAdminAccess,
    delete: AdminAccess,
  },
  auth: true,
  fields: [
    // === Authentication & Security (Sidebar) ===
    {
      name: "username",
      type: "text",
      admin: {
        position: "sidebar",
      },
      unique: true,
    },

    {
      name: "roles",
      type: "select",
      hasMany: true,
      saveToJWT: true,
      defaultValue: ["user"],
      options: [
        { label: "Admin", value: "admin" },
        { label: "Content Manager", value: "content-manager" },
        { label: "User", value: "user" },
      ],
      admin: {
        position: "sidebar",
      },
      access: {
        update: AdminFieldAccess,
      },
    },

    isActive,

    {
      name: "lastLoginAt",
      type: "date",
      admin: {
        description: "Last successful login timestamp",
        readOnly: true,
        position: "sidebar",
      },
      access: {
        update: () => false,
      },
    },
  ],

  hooks: {
    afterLogin: [
      async ({ req, user }) => {
        await req.payload.update({
          collection: "users",
          id: user.id,
          data: {
            lastLoginAt: new Date().toISOString(),
          },
          context: {
            skipHooks: true,
          },
        });
      },
    ],
  },
};
