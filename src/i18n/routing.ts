import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en", "ru"],
  defaultLocale: "de",
  localePrefix: "as-needed", // '/' for DE, '/en' for EN, '/ru' for RU
  localeDetection: false,    // user picks language manually — no auto-detect from cookie/header
});
