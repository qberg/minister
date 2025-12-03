/**
 * Convert a string to a URL-friendly slug
 * @example slugify("Hello World!") // "hello-world"
 */
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export { slugify };
