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

  -- Mom Test responses
  q1_typical_week     text not null,
  q2_last_stress_day  text not null,
  q3_uk_bureaucracy   text not null,
  q4_what_costs_most  text not null,
  q5_currently_paying text not null,
  q6_magic_wand       text not null,
  q7_referrals        text,

  -- GDPR consent record (regulatory requirement)
  consent             boolean not null,
  consent_at          timestamptz not null default now(),
  -- Privacy notice version the subject consented to (e.g. '2026-04').
  -- Lets us prove which text the user actually agreed to if the notice
  -- is later updated. Server stamps this from PRIVACY_NOTICE_VERSION.
  notice_version      text not null default '2026-04'
);

-- ─────────────────────────────────────────────────────────────────
-- Migration for existing installations (idempotent)
-- ─────────────────────────────────────────────────────────────────
-- Safe to re-run. Adds notice_version to a pre-existing responses
-- table without dropping data. Rows that pre-date the column are
-- labelled 'pre-2026-04' so they remain distinguishable from rows
-- that consented under the current notice.
-- ─────────────────────────────────────────────────────────────────

alter table public.responses
  add column if not exists notice_version text;

update public.responses
  set notice_version = 'pre-2026-04'
  where notice_version is null;

alter table public.responses
  alter column notice_version set not null;

alter table public.responses
  alter column notice_version set default '2026-04';

-- Useful indexes for analysis queries
create index if not exists responses_submitted_at_idx
  on public.responses (submitted_at desc);

create index if not exists responses_tenure_idx
  on public.responses (tenure);

-- ─────────────────────────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────────────────────────
-- RLS enabled but no anon policies — only the service_role key
-- (used by our Next.js API route) can read/write. Browser requests
-- with the anon key are blocked. Secure default for survey data.
-- ─────────────────────────────────────────────────────────────────

alter table public.responses enable row level security;

-- ─────────────────────────────────────────────────────────────────
-- Convenience view for quick analysis in Supabase Studio
-- ─────────────────────────────────────────────────────────────────
create or replace view public.responses_summary as
select
  id,
  submitted_at,
  tenure,
  business,
  email,
  notice_version,
  -- Show first 100 chars of each long answer for quick scanning
  left(q1_typical_week, 100)     as q1_preview,
  left(q2_last_stress_day, 100)  as q2_preview,
  left(q3_uk_bureaucracy, 100)   as q3_preview,
  left(q4_what_costs_most, 100)  as q4_preview,
  left(q5_currently_paying, 100) as q5_preview,
  left(q6_magic_wand, 100)       as q6_preview
from public.responses
order by submitted_at desc;

alter view public.responses_summary owner to postgres;
