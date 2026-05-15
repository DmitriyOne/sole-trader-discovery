import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // typedRoutes off temporarily — next-intl Link doesn't satisfy Next.js's
  // typed Route constraint (string href vs Route literal). Re-enable when
  // either next-intl ships typed-route integration or we add `as Route` casts.
  typedRoutes: false,
};

export default withNextIntl(nextConfig);
