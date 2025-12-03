import { hasAnyRole, hasRole } from "@/utils";
import { Access } from "payload";

/**
 * Admin only access
 * Use for: User management, payload system settings...
 */
export const AdminAccess: Access = ({ req: { user } }): boolean => {
  if (!user) return false;

  return hasRole(user, "admin");
};

/**
 * Admin or Coord rep access
 * Use for: Journal entries creation/ content management ig
 */
export const CoordRepAccess: Access = ({ req: { user } }): boolean => {
  if (!user) return false;

  return hasAnyRole(user, ["admin", "content-manager"]);
};

/**
 * Any authenticated user
 * Use for: Basic read operations, profile access
 */
export const LoggedInAccess: Access = ({ req: { user } }): boolean => {
  return Boolean(user);
};

/**
 * Public Access
 * Use for: Public content
 */
export const EveryoneAccess: Access = (): boolean => {
  return true;
};

/**
 * Users can only see their own profiles, admins can see all
 * Use for: User profile access
 */
export const SelfOrAdminAccess: Access = ({ req: { user } }) => {
  if (!user) return false;

  if (hasRole(user, "admin")) return true;

  return {
    id: {
      equals: user.id,
    },
  };
};

/**
 * Published access
 * Use for: Published content
 */
export const LoggedInOrPublishedAccess: Access = ({ req: { user } }) => {
  if (user) {
    return true;
  }

  return {
    _status: {
      equals: "published",
    },
  };
};
