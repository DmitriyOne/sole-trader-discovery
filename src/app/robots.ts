import type { MetadataRoute } from "next";
import { API_PREFIX } from "@/shared/config/api";
import { PATHS } from "@/shared/config/paths";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://[PLACEHOLDER: site URL]";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: PATHS.HOME,
        disallow: [API_PREFIX],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
