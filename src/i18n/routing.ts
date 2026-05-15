import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ru", "uk"] as const,
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: true,
});

export type TLocale = (typeof routing.locales)[number];
