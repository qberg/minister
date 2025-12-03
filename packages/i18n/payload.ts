import {
  defaultLocale,
  localeLabelsEnglish,
  localeNames,
  locales,
} from "./config";

export const payloadLocalization = {
  defaultLocale,
  fallback: true,
  locales: locales.map((locale) => ({
    code: locale,
    label:
      locale === "en"
        ? localeNames[locale]
        : `${localeLabelsEnglish[locale]} (${localeNames[locale]})`,
    ...(locale !== defaultLocale && { fallbackLocale: defaultLocale }),
  })),
} as const;

export default payloadLocalization;
