import type { formats } from "./formats";
import type { routing } from "./routing";
import type en from "./messages/en.json";

declare module "next-intl" {
  interface AppConfig {
    Messages: typeof en;
    Formats: typeof formats;
    Locale: (typeof routing.locales)[number];
  }
}
