import type { ReactNode } from "react";
import "./globals.css";

// Minimal root layout — required by Next.js so the root-level not-found.tsx
// can render. The locale-aware app shell lives in [locale]/layout.tsx and
// applies to all real routes. This root layout is hit only when a request
// bypasses [locale] entirely (e.g. paths with file-like extensions such as
// /kk.xt that the proxy matcher excludes from i18n middleware).
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
