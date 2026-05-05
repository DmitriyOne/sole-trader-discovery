import type { Metadata } from "next";
import { TEXT } from "@/shared/config/text";

export { PrivacyPage as default } from "@/pages/privacy";

export const metadata: Metadata = {
  title: TEXT.PrivacyPage.meta.title,
  description: TEXT.PrivacyPage.meta.description,
  robots: { index: true, follow: true },
};
