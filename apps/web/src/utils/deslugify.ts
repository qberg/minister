/**
 * Converts a URL segment into a human-readable label
 *
 * @example
 * deslugify("user-profile") // "User Profile"
 * deslugify("latest_updates") // "Latest Updates"
 * deslugify("api") // "API"
 */
export function deslugify(segment: string): string {
  return segment
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
