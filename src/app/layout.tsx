import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fraunces, JetBrains_Mono, Caveat } from "next/font/google";
import { env } from "@/shared/config/env";
import { TEXT } from "@/shared/config/text";
import { SurveyDraftProvider } from "@/features/multi-step-form";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: TEXT.GlobalMeta.title,
  description: TEXT.GlobalMeta.description,
  openGraph: {
    title: TEXT.GlobalMeta.title,
    description: TEXT.GlobalMeta.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TEXT.GlobalMeta.title,
    description: TEXT.GlobalMeta.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f0e8",
};

type TRootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: TRootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.18em]"
        >
          Skip to content
        </a>
        <SurveyDraftProvider>
          <div className="container max-w-[720px] mx-auto px-6 relative z-10">
            {children}
          </div>
        </SurveyDraftProvider>
      </body>
    </html>
  );
}
