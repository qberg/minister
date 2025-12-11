import type { User } from "@/payload-types";
import type { UserRole } from "@/types";

/**
 * Checks if the user has a specific role. i.e. is the user admin?
 */
export const hasRole = (user: User, role: UserRole): boolean =>
  user.roles?.includes(role) ?? false;

/**
 * Checks if the user has atleast one of the roles. i.e. is the user admin or author?
 */
export const hasAnyRole = (user: User, roles: UserRole[]): boolean =>
  roles.some((role) => hasRole(user, role));
