-- ─────────────────────────────────────────────────────────────────
-- Sole Trader Discovery — Supabase database setup
-- ─────────────────────────────────────────────────────────────────
-- IMPORTANT: When creating your Supabase project, choose an
--            EU region (Frankfurt or Ireland). This keeps personal
--            data inside EU/UK for UK GDPR compliance.
--
-- How to use:
--   1. Open https://supabase.com/dashboard → your project
--   2. SQL Editor → New query
--   3. Paste this entire file → Run
--   4. Done. Table is created with RLS enabled.
-- ─────────────────────────────────────────────────────────────────

create table if not exists public.responses (
  id              uuid primary key default gen_random_uuid(),
  submitted_at    timestamptz not null default now(),

  -- Contact + context
  email           text not null,
  business        text not null,
  tenure          text not null check (tenure in ('under-1y', '1-3y', '3-5y', '5y-plus')),

  -- Mom Test responses (numbered in survey order)
  q1_admin_task        text not null,
  q2_currently_paying  text not null,
  q3_magic_wand        text not null,

  -- GDPR consent record (regulatory requirement)
  consent             boolean not null,
  consent_at          timestamptz not null default now(),
  -- Privacy notice version the subject consented to (e.g. '2026-04').
  -- Lets us prove which text the user actually agreed to if the notice
  -- is later updated. Server stamps this from PRIVACY_NOTICE_VERSION.
  notice_version      text not null default '2026-04'
);

-- Useful indexes for analysis queries
create index if not exists responses_submitted_at_idx
  on public.responses (submitted_at desc);

create index if not exists responses_tenure_idx
  on public.responses (tenure);

-- ─────────────────────────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────────────────────────
-- Threat model: only our Next.js API route (under service_role key)
-- inserts into this table; browser never talks to Supabase directly,
-- and there is no auth system. So anon and authenticated must be
-- locked out completely. service_role bypasses RLS by design.
--
-- Why explicit deny policies instead of just "RLS enabled, no policy"?
-- Functionally identical (Postgres denies access when RLS is on and
-- no policy matches), but explicit policies:
--   1. silence the "RLS Enabled No Policy" lint warning,
--   2. document the security intent in version-controlled SQL,
--   3. surface as a conflict if someone later adds a permissive policy.
-- ─────────────────────────────────────────────────────────────────

alter table public.responses enable row level security;

-- Anon: no read/insert/update/delete via PostgREST
create policy "responses_deny_anon"
on public.responses
for all
to anon
using (false)
with check (false);

-- Authenticated: no auth system in this MVP, but lock the role anyway
create policy "responses_deny_authenticated"
on public.responses
for all
to authenticated
using (false)
with check (false);

-- ─────────────────────────────────────────────────────────────────
-- Convenience view for quick analysis in Supabase Studio
-- ─────────────────────────────────────────────────────────────────
-- security_invoker=true makes the view execute with the caller's
-- privileges instead of the owner's. Without it, the view bypasses
-- the RLS on `responses` (Postgres default), and PostgREST exposes
-- /rest/v1/responses_summary to anyone with the anon key. With it,
-- anon callers hit RLS (no policy = 0 rows) and only service_role
-- (used by Studio + our API route) can read.
-- ─────────────────────────────────────────────────────────────────
create or replace view public.responses_summary
with (security_invoker = true) as
select
  id,
  submitted_at,
  tenure,
  business,
  email,
  notice_version,
  -- Show first 100 chars of each long answer for quick scanning
  left(q1_admin_task, 100)        as q1_preview,
  left(q2_currently_paying, 100)  as q2_preview,
  left(q3_magic_wand, 100)        as q3_preview
from public.responses
order by submitted_at desc;

alter view public.responses_summary owner to postgres;
