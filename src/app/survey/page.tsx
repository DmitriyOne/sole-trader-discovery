import type { Metadata } from "next";
import { TEXT } from "@/shared/config/text";

export { SurveyPage as default } from "@/pages/survey";

export const metadata: Metadata = {
  title: TEXT.SurveyPage.meta.title,
  description: TEXT.SurveyPage.meta.description,
  openGraph: {
    title: TEXT.SurveyPage.meta.title,
    description: TEXT.SurveyPage.meta.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TEXT.SurveyPage.meta.title,
    description: TEXT.SurveyPage.meta.description,
  },
};
