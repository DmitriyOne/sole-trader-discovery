# Brief: Launch Stories for Sole Trader Discovery

This is a content brief. Hand it to a human content manager, or paste the whole thing into an LLM (Claude / ChatGPT / Gemini) and ask it to deliver the package described in **§ Deliverable format** at the bottom.

---

## What I'm asking you to write

Three formats:

1. **Telegram Story** — sequence of 4–5 vertical screens (1080×1920, mostly text on color)
2. **WhatsApp Status** — sequence of 3–4 vertical screens (same canvas as Telegram)
3. **LinkedIn post** — single text post, ~200–250 words

Each format in **two languages**:

- **English** — primary (the destination site is in English)
- **Russian** — secondary (for the Russian-speaking part of the contact list)

And in **two voices**:

- **Voice A — Dmitry's own** (the project owner / first-person)
- **Voice B — Dmitry's wife signal-boosting** (third-person, "my husband / my partner is doing this…")

**Total deliverable:** 3 formats × 2 languages × 2 voices = **12 pieces**.

---

## Project context (write fresh — don't paraphrase the site)

I'm Dmitry Fenko, a UK sole trader and fullstack developer. I'm running a 2-week discovery survey for UK sole traders, freelancers, and one-person businesses. The goal is to find out which boring/painful parts of running a one-person business — admin, taxes, chasing invoices, talking to HMRC — quietly eat the most hours, so I can build something narrow that actually solves it.

If a real pattern emerges in the responses, the people who took the survey get **6 months free** access to whatever I build. If no pattern emerges, I email them and tell them I'm not building it. No funnel. No upsell. No hype.

**Live site:** [PLACEHOLDER: site URL]
**Direct survey link:** [PLACEHOLDER: site URL]/survey
**Existing approved copy** (use as voice reference, do not quote verbatim): `src/shared/config/text.ts`

---

## The audience tension — read this carefully

There are two distinct audiences in play and the content has to serve both:

| | Survey audience | Story / post audience |
|---|---|---|
| Who | UK sole traders, freelancers, one-person businesses | My personal contacts on TG / WhatsApp / LinkedIn |
| Where they are | UK | International — many countries |
| What you want from them | Take the 7-question survey | Either take the survey (if they fit) **or forward the link** to a UK sole trader they know |

**Implication:** most of the people seeing these stories are *not* the survey's target. They're a **distribution layer**. So the content has to make sense for both reader types — those who fit and those who can refer.

Don't open with "Are you a UK sole trader? Click here." That's a hard filter and 90% of viewers self-disqualify in screen 1. Open with curiosity that works for everyone.

---

## Voice — load-bearing rules

- **First person, "I", not "we".** This is one person, not a startup.
- **Plain, direct, anti-corporate.** No "thrilled to announce", no "game-changer", no "transforming the way we…"
- **Under-promise.** "I haven't built anything yet." "I might find no pattern and stop." This is part of the credibility.
- **Self-aware.** It's a small research project, not a product launch. Frame it that way.
- **No emoji slop.** Maximum 1 emoji per screen if it earns its place. Default: zero.
- **No hashtag soup.** LinkedIn gets 2–4 well-chosen tags max. Stories get none.
- **No urgency tropes** — "limited spots", "first 100 only", "closing soon" — none of that. The honest pitch is "I'll keep collecting for ~2 weeks, then read everything in one sitting."

The site itself is editorial / print-zine in tone (Issue № 001 · 2026 framing). Match that register, especially in English. Russian voice can be a touch more casual since it's going to friends/family.

---

## Voice B — wife's version

She's not Dmitry, she's signal-boosting. The voice shifts:

- "My husband / my partner is running a small research project…"
- More casual, more human, less editorial
- She's allowed to be slightly enthusiastic in a way Dmitry can't ("he's been quietly working on this — actually really proud of him")
- Still under-promises — she also says "he doesn't even have a product yet, he's literally just listening"
- **Don't make it sycophantic.** Real partner energy, not promo energy.

The factual content is identical. Only the framing flips.

---

## Multi-screen story structure (TG + WhatsApp)

**Don't open with the CTA.** A story that starts with a link gets swiped past. Build narrative.

Suggested structure (adapt as needed):

| Screen | Role | What it does | Has the link? |
|---|---|---|---|
| 1 | **Hook** | One sharp sentence or question. Creates curiosity. No link, no project name, no logo. | No |
| 2 | **Context** | "Here's what's actually happening." Me + the project + who it's for. | No |
| 3 | **The ask** | What I want from the viewer. Take it OR forward it. | No |
| 4 | **The link** | URL appears here, large and obvious. Plus what to do with it. | **Yes** |
| 5 (optional) | **Soft thanks / signature** | "Thanks for reading. If you don't fit but know someone who does — please send them this." | Optional |

**Per-screen length:** ~12–18 words max. Story screens are skim-read in 2–3 seconds.

**Channel-specific notes:**

- **Telegram Stories** support **clickable link stickers** — use them on the link screen. Place sticker over the URL text so taps work.
- **WhatsApp Status** does **not** support clickable links. The URL must be readable enough that someone can copy/type it. Keep it short (one short domain, no UTM tags). Add a line like "(tap and hold to copy)" or "(open in your browser)".
- Both platforms: avoid heavy backgrounds. The site palette is cream `#f4f0e8` with ink `#1a1815` text and a rust `#b8482a` accent — match it for visual coherence with the destination site.

---

## LinkedIn post structure

Different beast. Long-form-ish, single post, one shot.

- **Hook line** (line 1, before the "see more" cutoff, ~140 chars). Make it stop the scroll.
- **2–3 short paragraphs** (1–3 sentences each, blank lines between).
- **The ask**, naming both reader types: "If you run a one-person business in the UK, here's the link. If you don't but know someone who does, please pass it along."
- **Link** at the end of the post, OR in the first comment (LinkedIn de-ranks reach when there's a link in the post body — first-comment is the standard workaround).
- **2–4 hashtags** at the very end. Suggested options: `#UKFreelance`, `#SoleTrader`, `#SmallBusinessUK`, `#IndieBusiness`. Pick what actually fits, don't pad.

**Length:** 200–250 words. Anything longer dilutes.

**Tone for LinkedIn:** more professional than the stories, but still first-person and direct. No bullet lists with emoji. No "hot takes" framing.

---

## Hook examples (for inspiration only — write your own)

These are starting points, not the final lines. They show the register I'm after.

For Dmitry's voice:

- "I'm not building anything yet. That's the point."
- "I want 15 minutes of your truth, not your money."
- "Most freelancer tools were built by people who've never freelanced."
- "There's at least one task in your week that everyone hates and nobody's solved. I want to know which one."

For wife's voice:

- "My husband's spent more nights on his self-assessment than on Netflix."
- "Quick favor, if you know any UK freelancers."
- "He's been working on something for a year and refuses to call it a startup."

The thread between them: a small, true, surprising statement that doesn't sound like marketing.

---

## What NOT to write

- ❌ "I'm building the future of freelancer admin"
- ❌ "Game-changing AI for sole traders"
- ❌ "Revolutionary new tool"
- ❌ "Limited spots — first 100 only"
- ❌ "Would mean the world to me 🙏" (the begging posture)
- ❌ Any version of "we're excited to announce"
- ❌ Corporate "we" — there is no we, this is one person
- ❌ Stock-photo-style language like "leveraging", "synergy", "ecosystem"
- ❌ Before/after promises
- ❌ Any claim that a product exists or that something has been built

---

## Visual / production notes (optional but useful)

For the story slides, the visual direction matches the site:

- Background: cream `#f4f0e8` (or paper `#fbf8f1` for variety)
- Body text: ink `#1a1815`
- Accent / emphasis: rust `#b8482a` or rust-deep `#8a3520`
- Headline font: Fraunces (serif, 600 weight, optical sizing on)
- Body / mono labels: JetBrains Mono (700 for kickers, uppercase, letterspaced)
- Signature touch (last screen): Caveat (handwritten) — same as the site's hero signature

If the producer mocks up screens in Figma or Canva: 1080×1920 canvas, single-column safe zone (margins ~64px), all type left-aligned. No drop shadows, no gradients, no patterns.

---

## Reference URLs

These are placeholders until the real domain is set. Replace `[PLACEHOLDER: site URL]` with the live domain before publishing.

- Site: `[PLACEHOLDER: site URL]`
- Survey direct: `[PLACEHOLDER: site URL]/survey`
- Privacy notice (good to know it exists, no need to link in stories): `[PLACEHOLDER: site URL]/privacy`

---

## Deliverable format

Return a single Markdown document with this exact structure. One section per piece:

```
## Telegram Story — English — Voice A (Dmitry)

### Screen 1 — Hook
[copy]
*Style note: [optional]*

### Screen 2 — Context
[copy]

### Screen 3 — The ask
[copy]

### Screen 4 — The link
[copy]
*Link: [PLACEHOLDER: site URL]*

### Screen 5 — Thanks (optional)
[copy]

---

## Telegram Story — Russian — Voice A (Dmitry)
…

## Telegram Story — English — Voice B (Wife)
…

## Telegram Story — Russian — Voice B (Wife)
…

## WhatsApp Status — English — Voice A
…

(repeat for all 12 combinations)

## LinkedIn Post — English — Voice A (Dmitry)

**Hook line:** [≤140 chars]

**Body:**
[full post]

**Link comment (first comment):** [text + URL]

**Hashtags:** [2–4]

…
```

For the **hook screens specifically** (screen 1 of every story), provide **3 alternate options**, not just one. I want to A/B-feel them before committing.

Everything else: one strong version per piece. Don't pad with variants.

---

## Constraints summary (one screen)

- 12 pieces total: 3 channels × 2 languages × 2 voices
- Stories: 3–5 screens each, link only on penultimate or last screen
- LinkedIn: 200–250 words, link at end or in first comment
- Voice: first-person (or third-person for wife), plain, under-promise, no corporate slop
- **Don't open with the CTA**
- 3 alternate hooks for every screen 1
- One strong version for every other screen
- No emoji-heavy or hashtag-heavy output
- Match the site's editorial tone (cream/ink/rust, Fraunces serif, "Issue 001" framing)

---

*Source of truth for project facts: `src/shared/config/text.ts` and the live site. If anything in this brief contradicts the site, the site wins — flag the contradiction in your reply.*
