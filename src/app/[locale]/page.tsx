// src/app/[locale]/page.tsx
import { setRequestLocale } from "next-intl/server";
import { HomePage } from "@/pages/home";

type TPageProps = { params: Promise<{ locale: string }> };

export default async function Page({ params }: TPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomePage />;
}
