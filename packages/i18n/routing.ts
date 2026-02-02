import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ta-IN"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "ta-IN",
  localePrefix: "as-needed",
});
