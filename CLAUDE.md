# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A two-page Next.js validation MVP — a research survey, not a product. Visitors land on `/`, optionally take a 7-question survey at `/survey`, and submissions are written to a Supabase Postgres table. Used to discover whether there's a real, repeated pain point worth building a product around for UK sole traders. After 30+ responses the operator reads them in one sitting and decides whether to build, pivot, or stop.

This framing matters when making changes: **add only what serves discovery**. Don't add analytics, tracking, complex routing, or anything that could compromise UK GDPR compliance — that's an explicit anti-goal of the project.

## Commands

```bash
npm run dev         # next dev — local development
npm run build       # next build — required to regenerate typed-routes types
npm run start       # next start — production server
npm run lint        # next lint
npm run typecheck   # tsc --noEmit (no test runner is configured)
```

After adding a new page directory under `src/app/`, run `npm run dev` or `npm run build` once to regenerate `.next/types/` — otherwise `Link` to the new route will fail typecheck (`typedRoutes: true` is enabled in `next.config.ts`).

There is no test suite. Verify changes via `npm run typecheck` + manual browser check.

## Architecture

### FSD layering (strict)

Imports flow downward only: `app → widgets → features → entities → shared`. A lower layer must never import from a higher one. Path aliases (`@/app/*`, `@/widgets/*`, `@/features/*`, `@/entities/*`, `@/shared/*`) make accidental upward imports visible at review time.

- `app/` — Next.js App Router only. Pages, layouts, API routes. No business logic.
- `widgets/` — Page-level compositions (`landing-hero`, `landing-deal`, `survey-flow`).
- `features/` — User-facing capabilities (`multi-step-form`, `submit-survey`).
- `entities/response/` — The single domain entity. Owns the zod schema, types, step definitions, and DB insert.
- `shared/` — `ui/` (primitives), `api/supabase.ts`, `config/env.ts`, `config/text.ts` (single `TEXT` constant, keyed per page), `lib/`.

### Single source of truth: `src/entities/response/model/schema.ts`

`responseSchema` (zod) is reused by:
- the client form (via `zodResolver`),
- the API route (`responseSchema.parse` in `src/app/api/submit/route.ts`),
- the Supabase insert payload type.

`SURVEY_STEPS` in the same file defines step order and which fields belong to each step. The survey-flow widget reads it to render the multi-step UI. **Add a survey question by editing this one file** — the form, validation, and API all pick up the change.

### Submission path

`SurveyFlow` (widget) → `useMultiStepForm` + react-hook-form → `submitSurvey` (feature) → POST `/api/submit` → `responseSchema.parse` → `insertResponse` (entity) → Supabase. Server-side validation is mandatory; never trust the client.

`insertResponse` stamps server-only fields: `submitted_at`, `consent_at`, and `notice_version` (read from `PRIVACY_NOTICE_VERSION` in `text.ts`). These must not appear in `responseSchema` — the client should not be able to set them.

## Conventions

- **All UI text lives in `src/shared/config/text.ts`** as the single `TEXT` constant. Top-level keys are PascalCase: page-scoped (`HomePage`, `SurveyPage`, `PrivacyPage`, `TermsPage`, `CookiesPage`, `DisclaimerPage`, `NotFoundPage`, `ErrorPage`) and cross-page (`GlobalMeta` used by `layout.tsx`, `Footer` used everywhere). Two standalone exports live alongside `TEXT`: `PRIVACY_NOTICE_VERSION` (server-stamped into DB rows) and `PRIVACY_ICO_REGISTRATION_OPTIONAL` (drop-in section the operator may add to `TEXT.PrivacyPage.sections` after deciding on ICO registration). The four legal pages all share the same `{ heading, body }[]` section shape and the same renderer pattern (see `src/app/privacy/page.tsx` as the reference) — keep that shape if adding new sections.
- **Type names are prefixed `T`** (e.g. `TResponseInput`, `TStep`).
- **Env vars** are validated by `@t3-oss/env-nextjs` in `src/shared/config/env.ts`. Always import `env` from there — never read `process.env` directly. Adding a new var means updating the schema and `runtimeEnv` map in that file. Build fails if a required var is missing.
- **Supabase client**: only `getSupabaseAdmin()` from `src/shared/api/supabase.ts`. It uses the service role key and bypasses RLS — server-only. There is no anon client because the browser never talks to Supabase directly.
- **Styles**: Tailwind 4 utilities only. Theme tokens live in `src/app/globals.css` under `@theme` (custom names like `text-ink`, `bg-rust`, `border-rule` are project tokens, not arbitrary classes).

## UK GDPR / privacy (load-bearing)

The privacy posture is part of the product. Before changing anything in this area, read `src/shared/config/text.ts` (`TEXT.privacy`) and `supabase-setup.sql`.

- **No analytics, no cookies, no tracking, no fingerprinting** anywhere on the site. Adding any of these requires updating the privacy notice, the consent mechanism, the cookie page, and likely a new lawful basis. Don't add them casually.
- **Lawful basis is consent.** The checkbox at the final survey step is opt-in (unchecked by default), and `consent`, `consent_at`, `notice_version` are persisted on every row.
- **`PRIVACY_NOTICE_VERSION`** in `text.ts` is the version stamp written into each row. Bump it (and `TEXT.PrivacyPage.lastUpdated`) when the notice changes materially. Existing rows retain the version they consented under, so you can tell who agreed to what.
- **Supabase project must be in an EU region** (Frankfurt/Ireland). Supabase Inc. is a US entity and the privacy notice discloses the IDTA/SCCs as transfer mechanism — keep that disclosure aligned with reality.
- The notice contains `[PLACEHOLDER: contact email]` and other `[PLACEHOLDER: …]` markers that must be replaced before launch. Don't quietly change placeholders to real values without checking with the operator.
- `robots.ts` and `sitemap.ts` use `process.env.NEXT_PUBLIC_SITE_URL` — when that env var is missing, both fall back to `https://[PLACEHOLDER: site URL]` so the broken URL is visible. Same for `opengraph-image.tsx`. Set the env var in Vercel before going live.

## Things that look optional but aren't

- `notice_version` is server-stamped, not part of `responseSchema`. If you add it to the zod schema, clients can spoof it.
- `responseSchema.consent` is `z.literal(true)` — refusing to submit `true` is the consent-required behaviour; don't relax it to `boolean`.
- The privacy/terms/cookies/disclaimer pages render `sections: { heading, body }[]`. Don't introduce nested structures (lists, links inside body, etc.) without updating the renderer in `src/app/privacy/page.tsx` (and its three siblings).

## Deployment

Vercel. Env vars listed in `.env.example` must be set in the Vercel dashboard. The Supabase service role key is server-only — never expose it via a `NEXT_PUBLIC_` prefix.
