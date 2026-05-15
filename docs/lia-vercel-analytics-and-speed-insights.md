# Legitimate Interests Assessment — Vercel Web Analytics & Speed Insights

**Date:** 2026-05-15
**Controller:** Dmytro Fenko (publishing as Dmitry Fenko), UK sole trader trading as Fenko Team
**Processing activities:**
1. Anonymous page-view tracking via `@vercel/analytics`
2. Real-user Web Vitals measurement via `@vercel/speed-insights`

**Lawful basis claimed (both):** Legitimate Interests, UK GDPR Art. 6(1)(f)

---

## Why this document exists

UK GDPR Art. 6(1)(f) allows processing where it is "necessary for the
purposes of the legitimate interests pursued by the controller... except
where such interests are overridden by the interests or fundamental
rights and freedoms of the data subject."

Recital 47 and ICO guidance both require a documented Legitimate Interests
Assessment (LIA) — purpose, necessity, and balancing — to be on file
before relying on this basis. This document fulfils that requirement.

It is not published. It is shown to the supervisory authority (ICO) only
on request, e.g. following a data subject complaint.

---

## 1. Purpose Test — what is the legitimate interest?

**Interest:** Understanding which discovery posts reach the right audience
during the validation phase of the Sole Trader Discovery research project.

**Why pursued:** The project relies on roughly 30 high-quality survey
responses to decide whether to build a product. Without page-level signal
I cannot distinguish a post that drove 0 visits (channel does not work)
from a post that drove 50 visits and 1 conversion (channel reaches the
audience but messaging fails). Without this, post-mortem channel analysis
is impossible — invalidating the discovery design.

**Lawful, ethical, and real?** Yes — this is a clear, narrow, time-bounded
business purpose for a non-commercial research project. Not speculative.

---

## 2. Necessity Test — is the data necessary, and is it minimal?

**What Vercel Web Analytics collects (per its documentation):**

| Field | Used for | Necessary? |
|---|---|---|
| Page route + URL (no query strings) | Counting which discovery pages convert | Yes |
| Country (ISO 3166-1 alpha-2) | Verifying UK reach (target audience) | Yes |
| Device type (mobile / desktop / tablet) | UX optimisation | Yes |
| Browser + OS | Compatibility debugging | Yes |
| Visitor hash (IP + UA + daily salt → SHA256) | Page-view deduplication within 24h | Yes |
| Day-rotating salt | Prevents cross-day visitor linkage | Mitigation, not data |

**Data NOT collected:**

- Full IP address (used only as input to one-way hash, then discarded)
- Persistent visitor ID across days
- Cross-site tracking
- Cookies or localStorage on the visitor's device
- PII of any kind
- User behaviour replays / heatmaps

**Could the purpose be achieved with less?** No. Without country I cannot
verify the UK-reach claim required by the project's stated audience.
Without route-level page views I cannot do post-mortem channel analysis.
The visitor hash with 24-hour rotation is the minimum to deduplicate
within-day page views without enabling cross-day tracking.

**Necessity confirmed.**

---

## 3. Balancing Test — does the interest outweigh the data subject's rights?

### Subject impact

| Risk factor | Severity |
|---|---|
| Identification of individuals | Effectively impossible — hash is salted and rotated daily; full IP is discarded |
| Linking visits across days | Impossible by design |
| Cross-site tracking | Impossible by design |
| Profiling for decisions about the subject | Not performed — analytics data is never joined to survey responses |
| Marketing reuse | Not performed — no ad networks, no email marketing |
| Disclosure to third parties | None beyond Vercel (the processor) under the existing DPA |

### Reasonable expectations

A visitor to a research-MVP discovery website in 2026 reasonably expects
the operator to count anonymous page views. Industry-standard cookieless
analytics (Plausible, Fathom, Vercel Analytics, Cloudflare Analytics) are
widely deployed without consent banners on this basis. The visitor's
expectation does not include being tracked across sites or sessions —
neither of which Vercel Web Analytics enables.

### Mitigations applied

- Disclosed in the Privacy notice with full description of fields collected,
  retention, and lawful basis.
- Disclosed in the Cookies notice with explicit statement that nothing is
  stored on the visitor's device.
- "What I don't do" section makes clear no third-party tracking, profiling,
  or advertising is involved.
- Right to object (Art. 21) explicitly offered with a contact email and
  subject-line instruction for opt-out requests.
- Data retention bounded by Vercel's plan defaults (12 months on Pro plan
  reporting window).
- Vercel acts as data processor under their published DPA; the relationship
  is covered by SCCs and the UK IDTA.
- The site is an opt-in research project — visitors arrive intentionally
  via promotional posts and are not retargeted.

### Conclusion

The legitimate interest in operating effective discovery research is
proportionate to the minimal, anonymous, server-side data collected. The
balancing test favours processing under Art. 6(1)(f) without consent.

---

## Right to object (Art. 21)

Data subjects have an absolute right to object to processing under
Art. 6(1)(f). The Privacy notice informs of this right and provides a
contact email (`support@fenko.dev`) and a subject-line convention
(`opt-out analytics`) for handling opt-out requests.

Vercel Analytics does not currently expose a per-visitor opt-out switch.
On receipt of an opt-out request I will:

1. Note the request and the requester's contact details.
2. Respond confirming exclusion (best effort — given the anonymous nature
   of analytics, exclusion of future visits cannot be technically guaranteed
   without configuring server-side blocking by IP, which would itself
   require processing the IP).
3. Offer the alternative of using browser DNT signals or an extension that
   blocks the Vercel Analytics endpoint.

---

## Activity 2 — Vercel Speed Insights (`@vercel/speed-insights`)

The same three-part LIA applies. The differences from Activity 1 are tabulated
below; everything else (purpose framing, balancing logic, mitigations, right to
object) is identical.

### Purpose Test

**Interest:** Detecting and prioritising real-user performance regressions.

**Why pursued:** Lab-only metrics (Lighthouse, synthetic tests) do not reflect
the experience of actual visitors on slow networks, low-end devices, or in
distant regions. Without real-user data I cannot tell whether a Friday deploy
shifted INP from 180 ms to 380 ms for half the audience until I happen to
notice. For a research site asking visitors for 15 minutes of their time, a
laggy survey is a real conversion killer.

### Necessity Test

**What Vercel Speed Insights collects (per its documentation):**

| Field | Used for | Necessary? |
|---|---|---|
| Route + URL | Pinpointing which page a regression hit | Yes |
| Country (ISO 3166-1 alpha-2) | Identifying region-specific issues | Yes |
| Device type, browser, OS | Reproducing the affected configuration | Yes |
| Network speed bucket (4g / 3g / etc.) | Diagnosing low-bandwidth performance | Yes |
| Web Vital reading (LCP, CLS, INP, FCP, TTFB) + selector attribution | The actual measurement | Yes |
| Server-Received Event Time | Correlating with deploys | Yes |

**Data NOT collected:**

- Any visitor identifier (Speed Insights does not generate a hash; readings are
  not associated with a visitor at all)
- IP address (not stored)
- Cookies or any client-side storage
- Cross-page session reconstruction
- Any PII

**Could the purpose be achieved with less?** No. Real-user Web Vitals require
the readings themselves, plus enough context (route, country, device class) to
diagnose regressions. Without route attribution, a regression spike is
unactionable.

### Balancing Test

The data is even more anonymous than analytics — there is no visitor hash at
all. Speed Insights cannot link two readings to the same person; each
measurement is a standalone data point. Subject impact is effectively zero.

The same balancing factors as Activity 1 apply (no profiling, no marketing,
no third-party disclosure beyond Vercel as processor under DPA + SCCs/IDTA).

**Conclusion:** Legitimate interests is the appropriate lawful basis. Consent
is not required.

---

## Review

This LIA should be reviewed:

- Before adding any new analytics or telemetry tool
- Before changing the lawful basis claim
- If Vercel changes its data collection materially
- Annually as part of the project's privacy posture review

**Next review due:** 2027-05-15
