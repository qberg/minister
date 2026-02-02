export const locales = ["en", "ta-IN"] as const;

export const defaultLocale = "en" as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  "ta-IN": "தமிழ்",
};

export const localeLabelsEnglish: Record<Locale, string> = {
  en: "Eng",
  "ta-IN": "Tamil",
};

export const localeConfig = {
  locales,
  defaultLocale,
  localeNames,
} as const;
