import type { Metadata } from "next";
import { TEXT } from "@/shared/config/text";

export { DisclaimerPage as default } from "@/pages/disclaimer";

export const metadata: Metadata = {
  title: TEXT.DisclaimerPage.meta.title,
  description: TEXT.DisclaimerPage.meta.description,
  robots: { index: true, follow: true },
};
