# Sole Trader Discovery — Validation MVP

A two-page Next.js app for finding out which parts of running a UK sole trader business eat the most time and energy. Built on FSD architecture, Tailwind 4, Supabase.

## What this is

It's a **survey**, not a product.

You deploy this site. You share the link with UK sole traders / freelancers / one-person businesses. They fill out 7 honest questions about what's painful in their work week. After 30-50 responses, you read the answers and look for **a pain that 3+ people mention**. That's your product idea — a real one, validated by real people, instead of guessed.

If no shared pain emerges → the segment doesn't have an urgent enough problem → you pivot or stop. Either way, you saved yourself months of building the wrong thing.

---
## Free tier gotcha

Supabase free tier **pauses your project after 7 days of inactivity**. To prevent this during the validation phase:

Add a Vercel cron job (free) that pings your API once a week:

`vercel.json`:
```json
{
  "crons": [{ "path": "/api/health", "schedule": "0 9 * * 1" }]
}
```

(You'd need to add a simple `/api/health` route that does a Supabase `select count(*)`.)

Or just remember to visit your Supabase dashboard once a week.

---

## Stack

- **Next.js 16** (App Router, TypeScript, typed routes)
- **Tailwind CSS 4.1** (single CSS file, theme via `@theme`)
- **Feature Sliced Design** (`shared` → `entities` → `features` → `widgets` → `app`)
- **react-hook-form + zod** (single source of truth for validation)
- **Supabase** (Postgres, free tier, EU region)
- **@t3-oss/env-nextjs** (typed env vars, fail-fast)
- **Vercel** (deploy target)

---

## Setup (45 minutes from clone to live)

### 1. Install dependencies

```bash
cd sole-trader-discovery
npm install
```

### 2. Set up Supabase (10 min)

1. Go to [supabase.com](https://supabase.com) → New project (free tier)
2. **CRITICAL: choose an EU region** (Frankfurt or Ireland) — this keeps personal data within EU/UK for UK GDPR compliance
3. Wait ~2 min for provisioning
4. **SQL Editor** → New query → paste contents of `supabase-setup.sql` → Run
5. **Settings → API** → copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role** key (NOT anon key) → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Configure environment

```bash
cp .env.example .env.local
```

Fill in values from step 2.

### 4. Run locally

```bash
npm run dev
```

Open `http://localhost:3000` → click "Open the survey" → fill it out → check Supabase Studio → table editor → `responses`.

### 5. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or use the GitHub integration. Add the same env vars in Vercel dashboard → Settings → Environment Variables.

---

## Architecture (FSD)

```
src/
├── app/                      # Next.js App Router
│   ├── api/submit/route.ts   # POST /api/submit
│   ├── survey/page.tsx       # /survey
│   ├── privacy/page.tsx      # /privacy  (UK GDPR notice)
│   ├── page.tsx              # /
│   ├── layout.tsx
│   └── globals.css
│
├── widgets/
│   ├── landing-hero/
│   ├── landing-deal/
│   └── survey-flow/
│
├── features/
│   ├── multi-step-form/
│   └── submit-survey/
│
├── entities/
│   └── response/
│       ├── model/schema.ts
│       └── api/insertResponse.ts
│
└── shared/
    ├── ui/                   # Button, TextInput, Checkbox, RadioGroup, Field, SectionLabel, TextArea
    ├── lib/cn.ts
    ├── api/supabase.ts
    └── config/
        ├── env.ts
        └── text.ts           # All UI strings (TEXT constant)
```

### Conventions

- All UI text lives in `shared/config/text.ts` as the `TEXT` constant
- All TypeScript types prefixed with `T` (e.g. `TResponseInput`)
- All styles via Tailwind utility classes
- Env vars validated with `@t3-oss/env-nextjs` — fails at build time if missing

---

## What to change before launch

- [ ] `src/shared/config/text.ts` → update author name, contact email, last-updated date in privacy
- [ ] Replace `hello@example.com` everywhere (`grep -r "hello@example.com" src/`)
- [ ] Add your favicon to `src/app/`
- [ ] Optional OG image: add `src/app/opengraph-image.tsx`

---

## UK GDPR / ICO checklist

- [x] **Privacy notice** at `/privacy` — update author name + contact email there
- [x] **Explicit consent** — checkbox on final step of survey, stored as `consent_at` timestamp
- [x] **Data residency** — Supabase project must be in EU region (Frankfurt/Ireland)
- [x] **Right to deletion** — handled manually via Supabase Studio when someone emails
- [ ] **ICO registration** — if you process personal data as a sole trader, register with the ICO (£40-60/year). [Check here](https://ico.org.uk/for-organisations/data-protection-fee/self-assessment/). Most validation projects skip it; bigger / longer-running projects shouldn't.
- [x] **No analytics, no tracking** — this app intentionally has zero. Don't add Google Analytics / Plausible / Posthog without updating the privacy notice.

---

## Where to share the survey

UK sole trader / freelancer / small business communities. Some places to start:

- **Reddit**: r/UKFreelance, r/UKsmallbusiness, r/UKPersonalFinance (read rules first — never lead with the link)
- **LinkedIn**: search "sole trader UK", "freelance UK" — connect, then DM
- **Facebook groups**: "UK Freelancers", "UK Sole Traders Network" (search yourself; names change)
- **Twitter/X**: hashtags #ukfreelance #soletrader and replies in relevant threads
- **AccountingWeb / FreeAgent / Crunch communities** — sole traders hang out where their tools live
- **IndieHackers** — UK section
- **Direct**: anyone you personally know who runs their own thing

The single highest-leverage action is messaging 5-10 people you already know. Cold posting comes second. Paid ads are not needed at this stage.

---

## Reading responses

1. Open Supabase dashboard → Table Editor → `responses`
2. Or use the `responses_summary` view for quick scannable previews
3. After 25-30 completions, read them in one sitting
4. Look for: same specific pain mentioned by 3+ different people; existing payment for partial solutions; emotional intensity in Q2 / Q6
5. If pattern emerges → you have your product idea
6. If no pattern → you've saved months. Pivot the audience or stop.

---

## When NOT to come back

Don't add features. Don't tweak copy obsessively. Don't switch databases.

Come back when:
- ✅ You have **30+ completed responses** → analyse together
- 🛑 After **7 days** of distribution you have **<10 completions** → debug channels
- 🚫 You hit a hard technical blocker

Good luck.
