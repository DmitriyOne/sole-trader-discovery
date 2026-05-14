// src/app/[locale]/not-found.tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NotFoundPage } from "@/pages/not-found";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("NotFoundPage.meta");
  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <NotFoundPage />;
}
