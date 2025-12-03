import "server-only";

import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { formats } from "./formats";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = (await import(`./messages/${locale}.json`)).default;

  return {
    locale,
    messages,
    formats,
    timeZone: "Asia/Kolkata",
    now: new Date(),
  };
});

export {
  getFormatter,
  getLocale,
  getMessages,
  getNow,
  getTimeZone,
  getTranslations,
} from "next-intl/server";
