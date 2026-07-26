# CMS Portfolio Section: Design

Date: 2026-07-26

## Context

The CMS (`cms/`) manages blog posts only. Every portfolio case study on the website is
hardcoded: an entry in `restorefine-website/lib/portfolio.ts`, a bespoke
`blocks/portfolio/<client>-content.tsx` component, an entry in the `project.id === "..."`
chain inside `PortfolioStoryClient.tsx`, and a card in the `clients` array inside
`blocks/work/WorkGrid.tsx`. Adding a client means four code edits and a deploy.

Goal: let a non-developer publish a new client case study from the CMS. The
`/portfolio/itspadel` layout is the agreed base template.

## Decisions

| Question | Decision |
|---|---|
| Template flexibility | Fixed section order, each section individually toggleable |
| Existing 19 projects | Stay hardcoded. CMS is for new clients. Website merges both. |
| Storage | New `portfolio_projects` Supabase table |
| Hero | Clean hero (full-bleed image, no overlay), matching It's Padel |
| FAQ | Extra optional section, off by default |
| Image uploads | Same pipeline as blogs: WebP, quality 0.95, slug-derived filenames, alt text |
| Grid | Published CMS entries appear on `/portfolio` automatically |

## Data model

New table `portfolio_projects`:

```
id uuid pk            slug text unique      client_name text      title text
description text      category text         project_date date     published bool
noindex bool          hero_image text       hero_image_alt text
card_logo text        card_logo_alt text    card_bg text
services jsonb        sections jsonb        cta_heading text      cta_body text
meta_title text       meta_description text seo_keyphrase text
created_at timestamptz updated_at timestamptz
```

`services` is `[{ label, icon }]`: the pill row at the top, icons picked with the
existing `IconPicker`.

`sections` is a keyed object rather than an array, so toggles are explicit and order
can never drift:

```json
{
  "overview":    { "enabled": true,  "body": "" },
  "liveWebsite": { "enabled": true,  "url": "", "domain": "", "label": "" },
  "challenges":  { "enabled": true,  "items": [{ "title": "", "description": "" }] },
  "strategy":    { "enabled": true,  "groups": [{ "title": "", "items": [""] }] },
  "execution":   { "enabled": true,  "intro": "", "items": [""] },
  "results":     { "enabled": true,  "items": [""] },
  "faq":         { "enabled": false, "items": [{ "question": "", "answer": "" }] }
}
```

Render order is fixed: overview → liveWebsite → challenges → strategy → execution →
results → faq. Section numbers (01, 02, …) and the table-of-contents entries are
derived at render time from enabled sections only, so numbering is always contiguous.
This also avoids the numbering gap the hardcoded It's Padel page has (03 → 05).

## CMS

Routes:

| Route | Purpose |
|---|---|
| `/dashboard` | Chooser: Blogs card and Portfolio card, each with a live count |
| `/dashboard/blogs`, `/blogs/new`, `/blogs/[slug]` | Existing blog screens, moved down a level |
| `/dashboard/portfolio`, `/portfolio/new`, `/portfolio/[slug]` | New portfolio screens |

Blogs move under `/dashboard/blogs/*` because leaving them at `/dashboard/[slug]` means
a post slugged `portfolio` would shadow the new section.

Components:

- `lib/upload.ts` (new): `compressImage`, `buildUploadPath`, `uploadToBucket` extracted
  verbatim from `PostForm.tsx`. `PostForm` and `PortfolioForm` both import it, so the
  compression pipeline has one implementation.
- `lib/portfolio.ts` (new): `PortfolioProject` type, default empty sections, and the
  fetch helpers used by the list and edit screens.
- `components/PortfolioForm.tsx` (new): identity → images → service pills → the seven
  collapsible section panels each with an on/off switch → CTA → SEO.
- `components/SeoPanel.tsx`: input type generalised from `BlogPost` to a small
  `SeoTarget` shape so both forms can feed it.

## Website

- `lib/portfolio-cms.ts` (new): types plus `getPortfolioProject(slug)`,
  `getPortfolioProjects()`, `getPortfolioSlugs()`, and a `toPortfolioItem()` adapter so
  existing consumers keep seeing the `PortfolioItem` shape.
- `blocks/portfolio/cms-content.tsx` (new): `itspadel-content.tsx` ported to props.
  Reuses `LightHeader`, `PortfolioBrowserPreview`, `TableOfContents`, `FaqAccordion`,
  `ExpandingCta`.
- `app/portfolio/[slug]/page.tsx`: hardcoded array first, CMS fallback.
  `revalidate = 0` so edits are live, matching the blog route.
- `PortfolioStoryClient.tsx`: optional `cmsProject` prop. When set: clean hero, custom
  content path, renders `CmsPortfolioContent` instead of the id chain.
- `blocks/work/WorkGrid.tsx`: optional `extraClients` prop.
  `app/portfolio/page.tsx` becomes a server component that fetches and passes them.
- `app/sitemap.ts`: appends CMS portfolio slugs, mirroring the existing blog handling.

## Out of scope for the first pass

The services case-study strip (`blocks/service/resto-services/case-studies.tsx`) is a
client component nested under four other client components. Merging CMS entries there
means threading a prop through five service pages. Left on hardcoded data; tracked as a
follow-up.

## Verification

1. Apply `supabase/migrations/portfolio_projects.sql` in the Supabase SQL editor.
2. `pnpm dev` in `cms/`: log in, confirm the chooser, create a portfolio project with
   every section on, upload hero and card images, save as draft.
3. Confirm the draft does not appear on the website, then publish.
4. `pnpm dev` in `restorefine-website/`: `/portfolio` shows the new card;
   `/portfolio/<slug>` renders all sections with contiguous numbering and a working TOC;
   `/sitemap.xml` includes the slug.
5. Toggle sections off, save, reload: numbering and TOC renumber with no gaps.
6. `npx tsc --noEmit` clean in both packages.
