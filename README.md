# Sole Trader Discovery

A two-page Next.js survey app. I built it to ask UK sole traders which parts of running their business take the most time and energy. It is a validation tool, not a product: 7 questions, and the answers go into Supabase.

The idea was simple. Share the link with UK sole traders, freelancers and one-person businesses, collect 30 to 50 answers, then look for a pain that three or more people mention. A real problem found this way is better than one I guessed.

## Stack

- **Next.js 16** (App Router, TypeScript, typed routes)
- **Tailwind CSS 4** (one CSS file, theme with `@theme`)
- **Feature-Sliced Design** (`shared`, `entities`, `features`, `widgets`, `app`)
- **react-hook-form and zod** (one schema for validation)
- **Supabase** (Postgres on the free tier, EU region)
- **@t3-oss/env-nextjs** (typed env vars, the build fails if one is missing)
- **Vercel** (deploy target)

## Run it

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Create a Supabase project. I chose an EU region (Frankfurt or Ireland) to keep personal data in the EU for UK GDPR. In the SQL Editor, run `supabase-setup.sql`.

3. Copy the example env file and fill in the values from Supabase (Settings, API):

   ```bash
   cp .env.example .env.local
   ```

   | Variable | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
   | `SUPABASE_SECRET_KEY` | The secret key (`sb_secret_...`). Server only, never in the browser. |
   | `NEXT_PUBLIC_SITE_URL` | Public URL of the site |
   | `CRON_SECRET` | A random string of at least 16 characters, used by the health route |

4. Start it:

   ```bash
   npm run dev
   ```

   Open `http://localhost:3000`, fill in the survey, and check the `responses` table in Supabase.

5. Deploy to Vercel with the GitHub integration and add the same env vars there.

## Supabase free tier

A free Supabase project pauses after 7 days of inactivity. The `/api/health` route runs a simple query on the database, and a scheduled job calls it to keep the project awake. It is protected with `CRON_SECRET`. The scheduled ping is switched off now that the research phase is closed.

## Architecture

```
src/
├── app/                      # Next.js App Router
│   ├── api/submit/route.ts   # POST /api/submit
│   ├── api/health/           # keep-alive route
│   ├── survey/page.tsx       # /survey
│   ├── privacy/page.tsx      # /privacy (UK GDPR notice)
│   └── page.tsx              # /
├── widgets/                  # landing-hero, landing-deal, survey-flow
├── features/                 # multi-step-form, submit-survey
├── entities/response/        # schema and insert function
└── shared/                   # ui, lib, api/supabase.ts, config (env.ts, text.ts)
```

Conventions I followed:

- All UI text lives in `shared/config/text.ts` as the `TEXT` constant.
- TypeScript types start with `T`, for example `TResponseInput`.
- Styles are Tailwind utility classes only.
- Env vars are validated with `@t3-oss/env-nextjs`.

## UK GDPR notes

- A privacy notice at `/privacy`.
- Explicit consent: a checkbox on the last step, stored as a `consent_at` timestamp.
- Data stays in an EU region.
- Deletion is manual: I delete the row in Supabase when someone asks.
- No analytics and no tracking, on purpose.

## Reading the answers

I open the `responses` table in Supabase, or the `responses_summary` view for short previews, and read the answers in one sitting. I look for the same specific pain from three or more people, for people who already pay for a partial solution, and for strong feeling in the free-text questions.
