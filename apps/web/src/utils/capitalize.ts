/**
 * Capitalize the first letter of a string
 * @example capitalize("hello") // "Hello"
 */
export function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
