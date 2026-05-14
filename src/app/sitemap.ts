// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://[PLACEHOLDER: site URL]";

export default function sitemap(): MetadataRoute.Sitemap {
  const localised = ["", "/survey"];
  const legal = ["/privacy", "/terms", "/cookies", "/disclaimer"];

  const entries: MetadataRoute.Sitemap = [];

  for (const path of localised) {
    for (const locale of routing.locales) {
      const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
      entries.push({
        url: `${SITE}${prefix}${path}`,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [
              l,
              `${SITE}${l === routing.defaultLocale ? "" : `/${l}`}${path}`,
            ])
          ),
        },
      });
    }
  }

  for (const path of legal) {
    entries.push({ url: `${SITE}${path}` });
  }

  return entries;
}
