# Legitimate Interests Assessment — Vercel Web Analytics

**Date:** 2026-05-15
**Controller:** Dmytro Fenko (publishing as Dmitry Fenko), UK sole trader trading as Fenko Team
**Processing activity:** Anonymous page-view tracking via `@vercel/analytics`
**Lawful basis claimed:** Legitimate Interests, UK GDPR Art. 6(1)(f)

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

## Review

This LIA should be reviewed:

- Before adding any new analytics tool
- Before changing the lawful basis claim
- If Vercel changes its data collection materially
- Annually as part of the project's privacy posture review

**Next review due:** 2027-05-15
