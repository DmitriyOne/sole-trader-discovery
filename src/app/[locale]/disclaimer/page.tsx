// src/app/[locale]/disclaimer/page.tsx
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DisclaimerPage } from "@/pages/disclaimer";

type TPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: TPageProps): Promise<Metadata> {
  const { locale } = await params;
  // Force EN for legal page metadata to match content
  const t = await getTranslations({ locale: "en", namespace: "DisclaimerPage.meta" });
  return {
    title: t("title"),
    description: t("description"),
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }: TPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DisclaimerPage />;
}
