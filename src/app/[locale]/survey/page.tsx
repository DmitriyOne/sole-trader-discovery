// src/app/[locale]/survey/page.tsx
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SurveyPage } from "@/pages/survey";

type TPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: TPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SurveyPage.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function Page({ params }: TPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SurveyPage />;
}
