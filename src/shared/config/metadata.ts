// Shared metadataBase for all page-level generateMetadata exports.
// Next.js merges layout + page metadata, but leaf-page metadata must
// include metadataBase explicitly to guarantee og/twitter image resolution.
export const SITE_METADATA_BASE = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
);
