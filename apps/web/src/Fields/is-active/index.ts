import { AdminFieldAccess } from "@/access/field-level-access";
import type { Field } from "payload";

export const isActive: Field = {
  name: "isActive",
  type: "checkbox",
  label: "Active",
  defaultValue: true,
  admin: {
    position: "sidebar",
    description: "Inactive users cannot login",
  },
  access: {
    update: AdminFieldAccess,
  },
};
