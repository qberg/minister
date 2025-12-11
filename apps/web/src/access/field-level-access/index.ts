import type { FieldAccess } from "payload";
import { hasRole } from "@/utils";

/**
 * Admin-only field access
 * Use for: Sensitive fields like roles, internal notes..
 */
export const AdminFieldAccess: FieldAccess = ({ req: { user } }): boolean => {
  if (!user) return false;
  return hasRole(user, "admin");
};
