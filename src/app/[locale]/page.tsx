// src/app/[locale]/page.tsx
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomePage } from "@/pages/home";
import { SITE_METADATA_BASE } from "@/shared/config/metadata";

type TPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: TPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "GlobalMeta" });
  return {
    metadataBase: SITE_METADATA_BASE,
    title: t("title"),
    description: t("description"),
  };
}

export default async function Page({ params }: TPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomePage />;
}
