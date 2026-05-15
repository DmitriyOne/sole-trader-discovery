-- Stamp the locale a respondent submitted under, server-side.
-- Set from x-next-intl-locale header in /api/submit.
-- Default 'en' backfills existing rows safely.

alter table responses
  add column if not exists language text not null default 'en'
    check (language in ('en', 'ru', 'uk'));
