import type { Metadata } from "next";
import { TEXT } from "@/shared/config/text";

export { NotFoundPage as default } from "@/pages/not-found";

export const metadata: Metadata = {
  title: TEXT.NotFoundPage.meta.title,
  description: TEXT.NotFoundPage.meta.description,
  robots: { index: false, follow: false },
};
