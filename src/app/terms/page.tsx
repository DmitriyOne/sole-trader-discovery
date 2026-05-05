import type { Metadata } from "next";
import { TEXT } from "@/shared/config/text";

export { TermsPage as default } from "@/pages/terms";

export const metadata: Metadata = {
  title: TEXT.TermsPage.meta.title,
  description: TEXT.TermsPage.meta.description,
  robots: { index: true, follow: true },
};
