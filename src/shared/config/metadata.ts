import { env } from "./env";

// Shared metadataBase for all page-level generateMetadata exports.
// Next.js merges layout + page metadata, but leaf-page metadata must
// include metadataBase explicitly to guarantee og/twitter image resolution.
// env.NEXT_PUBLIC_SITE_URL is validated at boot — no fallback needed.
export const SITE_METADATA_BASE = new URL(env.NEXT_PUBLIC_SITE_URL);
