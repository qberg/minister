import type { CheckboxField, TextField } from "payload";
import { formatSlugHook } from "@/hooks/format-slug-hook";
import { deepMerge } from "@/utils";

export type SlugFieldOverrides = {
  checkboxOverrides?: Partial<CheckboxField>;
  slugOverrides?: Partial<TextField>;
};

type Slug = (
  fieldToUse?: string,
  overrides?: SlugFieldOverrides
) => [TextField, CheckboxField];

/**
 * Factory function that creates a slug field with auto-sync functionality
 *
 * @param fieldToUse - The field name to generate slug from (default: 'title')
 * @param overrides - Optional configuration overrides for both fields
 * @returns Tuple of [slugField, checkboxField]
 *
 * @example
 * // Basic usage
 * ...createSlugField('title')
 *
 * @example
 * // With overrides
 * ...createSlugField('name', {
 *   slugOverrides: { label: 'URL Path' },
 *   checkboxOverrides: { defaultValue: false }
 * })
 */
export const createSlugField: Slug = (fieldToUse = "title", overrides = {}) => {
  const { checkboxOverrides = {}, slugOverrides = {} } = overrides;

  const checkBoxField = deepMerge<CheckboxField>(
    {
      admin: {
        hidden: true,
        position: "sidebar",
      },
      defaultValue: true,
      name: "slugLock",
      type: "checkbox",
    },
    checkboxOverrides
  );

  const slugField = deepMerge<TextField>(
    {
      admin: {
        position: "sidebar",
      },
      index: true,
      label: "Slug",
      name: "slug",
      type: "text",
      hooks: {
        beforeValidate: [formatSlugHook(fieldToUse)],
      },
    },
    slugOverrides
  );

  return [slugField, checkBoxField];
};
