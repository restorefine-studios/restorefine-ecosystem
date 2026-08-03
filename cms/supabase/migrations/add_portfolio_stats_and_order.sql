-- Adds the Stats section and a per-project section_order to portfolio_projects.
-- Run this in the Supabase SQL editor, after portfolio_projects.sql.

alter table public.portfolio_projects
  add column if not exists section_order jsonb not null default
    '["overview","liveWebsite","challenges","strategy","execution","results","stats","faq"]'::jsonb;
