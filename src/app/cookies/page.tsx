import type { Metadata } from "next";
import { TEXT } from "@/shared/config/text";

export { CookiesPage as default } from "@/pages/cookies";

export const metadata: Metadata = {
  title: TEXT.CookiesPage.meta.title,
  description: TEXT.CookiesPage.meta.description,
  robots: { index: true, follow: true },
};
