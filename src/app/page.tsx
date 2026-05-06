import type { Metadata } from "next";
import { TEXT } from "@/shared/config/text";

export { HomePage as default } from "@/pages/home";

export const metadata: Metadata = {
  title: TEXT.HomePage.meta.title,
  description: TEXT.HomePage.meta.description,
  openGraph: {
    title: TEXT.HomePage.meta.title,
    description: TEXT.HomePage.meta.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TEXT.HomePage.meta.title,
    description: TEXT.HomePage.meta.description,
  },
};
