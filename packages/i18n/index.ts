/**
 * @repo/i18n
 *
 * Minimal exports for common use cases.
 * Import from subpaths for specific functionality.
 */

export { hasLocale, NextIntlClientProvider } from "next-intl";
export type { Locale } from "./config";
export {
  defaultLocale,
  localeLabelsEnglish,
  localeNames,
  locales,
} from "./config";

// Navigation

/**
 * For other exports, import from specific files:
 *
 * @example
 * ```ts
 * import { createMiddleware } from '@repo/i18n/middleware';
 * import { useRouter } from '@repo/i18n/navigation';
 * import { routing } from '@repo/i18n/routing';
 * ```
 */
