import type { ReactNode } from "react";
import "./globals.css";

// Pass-through root layout. A root layout file is required by Next.js because
// a root-level not-found.tsx exists, but it must NOT render <html>/<body>:
// the locale-aware app shell in [locale]/layout.tsx renders those (with
// lang={locale}, fonts and providers) for every real route. Rendering them
// here too would nest a second <html> inside that one and break hydration
// (server lang="en" vs client lang="ru"). The root not-found.tsx therefore
// renders its own <html>/<body>. This layout only forwards children.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
