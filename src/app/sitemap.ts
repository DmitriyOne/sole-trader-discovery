import type { MetadataRoute } from "next";
import { PATHS } from "@/shared/config/paths";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://[PLACEHOLDER: site URL]";

type TSitemapEntry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const ENTRIES: ReadonlyArray<TSitemapEntry> = [
  { path: PATHS.HOME, changeFrequency: "weekly", priority: 1.0 },
  { path: PATHS.SURVEY, changeFrequency: "weekly", priority: 0.9 },
  { path: PATHS.PRIVACY, changeFrequency: "monthly", priority: 0.5 },
  { path: PATHS.TERMS, changeFrequency: "monthly", priority: 0.5 },
  { path: PATHS.COOKIES, changeFrequency: "monthly", priority: 0.5 },
  { path: PATHS.DISCLAIMER, changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ENTRIES.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
