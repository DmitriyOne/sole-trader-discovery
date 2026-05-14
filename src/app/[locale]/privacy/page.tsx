// src/app/[locale]/privacy/page.tsx
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PrivacyPage } from "@/pages/privacy";

type TPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: TPageProps): Promise<Metadata> {
  const { locale } = await params;
  // Force EN for legal page metadata to match content
  const t = await getTranslations({ locale: "en", namespace: "PrivacyPage.meta" });
  return {
    title: t("title"),
    description: t("description"),
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }: TPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PrivacyPage />;
}
