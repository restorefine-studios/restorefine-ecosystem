-- Portfolio case studies managed from the CMS.
-- Mirrors the structure of the hardcoded /portfolio/itspadel page.
-- Run this in the Supabase SQL editor.

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),

  -- Identity
  slug text not null unique,
  client_name text not null default '',
  title text not null default '',
  description text not null default '',
  category text not null default 'Branding',
  project_date date not null default current_date,

  -- Hero (full-bleed, no overlay)
  hero_image text not null default '',
  hero_image_alt text not null default '',

  -- /portfolio grid card
  card_logo text not null default '',
  card_logo_alt text not null default '',
  card_bg text not null default '#000000',

  -- Service pills shown above the case study
  services jsonb not null default '[]'::jsonb,

  -- Toggleable case-study sections, keyed by section id
  sections jsonb not null default '{}'::jsonb,

  -- Closing call to action
  cta_heading text not null default 'Ready to Elevate Your Brand?',
  cta_body text not null default 'Get in touch and let''s build something exceptional together.',

  -- SEO
  meta_title text not null default '',
  meta_description text not null default '',
  seo_keyphrase text not null default '',
  noindex boolean not null default false,

  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists portfolio_projects_published_date_idx
  on public.portfolio_projects (published, project_date desc);

alter table public.portfolio_projects enable row level security;

-- Anyone (including the anon key used by the public website) may read published rows.
drop policy if exists "portfolio_projects public read published" on public.portfolio_projects;
create policy "portfolio_projects public read published"
  on public.portfolio_projects for select
  using (published = true);

-- Signed-in CMS users may read everything, including drafts.
drop policy if exists "portfolio_projects auth read all" on public.portfolio_projects;
create policy "portfolio_projects auth read all"
  on public.portfolio_projects for select
  to authenticated
  using (true);

-- Signed-in CMS users may create, edit and delete.
drop policy if exists "portfolio_projects auth insert" on public.portfolio_projects;
create policy "portfolio_projects auth insert"
  on public.portfolio_projects for insert
  to authenticated
  with check (true);

drop policy if exists "portfolio_projects auth update" on public.portfolio_projects;
create policy "portfolio_projects auth update"
  on public.portfolio_projects for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "portfolio_projects auth delete" on public.portfolio_projects;
create policy "portfolio_projects auth delete"
  on public.portfolio_projects for delete
  to authenticated
  using (true);

-- ── Storage ─────────────────────────────────────────────────────────────────
-- Portfolio images go to the existing `blog-images` bucket under two new
-- prefixes: `portfolio-hero/` and `portfolio-card/`.
--
-- If your bucket policy is scoped per folder rather than per bucket, uploads
-- will fail with a row-level security error until those prefixes are allowed.
-- Check what you have with:
--
--   select policyname, cmd, qual, with_check
--   from pg_policies
--   where schemaname = 'storage' and tablename = 'objects';
--
-- A bucket-wide policy (recommended) needs nothing further. Otherwise widen the
-- existing policy, or add:
--
--   create policy "blog-images authenticated write"
--     on storage.objects for insert to authenticated
--     with check (bucket_id = 'blog-images');
--
--   create policy "blog-images authenticated update"
--     on storage.objects for update to authenticated
--     using (bucket_id = 'blog-images') with check (bucket_id = 'blog-images');
