// proxy.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match everything except api, _next internals, icon routes, and files with a dot.
    // Also exclude [locale]/opengraph-image so Next.js serves the file-based OG image
    // without the i18n middleware redirecting /en/opengraph-image → /opengraph-image.
    "/((?!api|_next|_vercel|icon|apple-icon|opengraph-image|[a-z]{2}/opengraph-image|.*\\..*).*)",
  ],
};
