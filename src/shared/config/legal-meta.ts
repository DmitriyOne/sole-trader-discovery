// Server-only metadata — not text strings, not localised.
// Stamped onto every response row to record which notice version
// the user consented under.

export const PRIVACY_NOTICE_VERSION = "2026-05-07";

// Drop-in section the operator may append to TEXT.PrivacyPage.sections
// after deciding on ICO registration. Kept here because it's a
// structural decision, not a translation target.
export const PRIVACY_ICO_REGISTRATION_OPTIONAL = {
  heading: "ICO Registration",
  body: "[PLACEHOLDER: ICO registration details — add after deciding on registration]",
};
