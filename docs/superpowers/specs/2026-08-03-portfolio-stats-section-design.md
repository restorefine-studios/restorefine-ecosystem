# Portfolio CMS: Stats Section + Section Reordering

Date: 2026-08-03

## Context

The portfolio CMS (`docs/superpowers/specs/2026-07-26-cms-portfolio-section-design.md`) ships
seven toggleable case-study sections (overview, liveWebsite, challenges, strategy, execution,
results, faq) in a fixed render order defined by a `SECTION_ORDER` constant, duplicated in
`cms/lib/portfolio.ts` and `restorefine-website/lib/portfolio-cms.ts`.

The user wants an 8th section — a row of highlight stat tiles (big number, label, a
"+44.98% Growth"-style delta) similar to a marketing dashboard summary strip. Since they
weren't sure where in the order it belongs, and the fixed order was already a known
limitation, this is paired with making section order editable per-project.

## Decisions

| Question | Decision |
|---|---|
| New section placement | New standalone "Stats" section, not folded into Results |
| Tile count | Variable — editor adds/removes tiles like Challenges/Results |
| Growth color | Auto-derived from sign: leading `-` → red, otherwise green |
| Growth field shape | Single free-text field per tile (e.g. `"+44.98% Growth"`) |
| Section ordering | Made data-driven and editable per-project (see below), instead of picking one fixed spot for Stats |
| Reorder UI | Up/down move buttons per panel — no new dependency, no drag-and-drop library |
| Stats default state | Disabled by default (like FAQ), so it never appears on existing published projects until an editor turns it on |

## Data model

### New `StatItem` type and `stats` section

```ts
export interface StatItem {
  value: string;    // "315.78K"
  label: string;     // "TOTAL IMPRESSIONS"
  growth?: string;   // "+44.98% Growth" — free text, color derived from leading "-"
}

// Added to PortfolioSections:
stats: SectionBase & { items: StatItem[] };
```

Default item when adding a tile: `{ value: "", label: "", growth: "" }`.

Color rule at render time: `growth.trim().startsWith("-") ? "text-red-500" : "text-emerald-600"`.
A tile only counts as visible if `value` or `label` is non-empty.

### Section order becomes data, not a constant

Today `SECTION_ORDER: SectionKey[]` is a hardcoded constant used directly for render order,
panel order, and numbering. This becomes:

- `ALL_SECTION_KEYS: SectionKey[]` — the full valid key set (renamed from `SECTION_ORDER`),
  used only for validation/normalization, never for render order directly.
- `DEFAULT_SECTION_ORDER: SectionKey[]` — the initial order for new projects and the
  fallback/backfill value for existing rows:
  `["overview", "liveWebsite", "challenges", "strategy", "execution", "results", "stats", "faq"]`.
- `section_order: SectionKey[]` — new field on `PortfolioProject`, persisted as a jsonb column,
  editable per-project via the up/down buttons.

```ts
export function normaliseSectionOrder(raw: unknown): SectionKey[] {
  const stored = Array.isArray(raw) ? (raw as SectionKey[]).filter((k) => ALL_SECTION_KEYS.includes(k)) : [];
  const missing = ALL_SECTION_KEYS.filter((k) => !stored.includes(k));
  return [...stored, ...missing];
}
```

This repairs three cases: a legacy row with no `section_order` at all (`stored` is empty,
result is `ALL_SECTION_KEYS` in default order), a row missing just `stats` (appended at the
end), and any corrupted/duplicate entries (deduped by construction).

This mirrors how `normaliseSections()` already repairs rows saved before a section existed —
same pattern, applied to order instead of content.

## Migration

New file `cms/supabase/migrations/add_portfolio_stats_and_order.sql`:

```sql
alter table public.portfolio_projects
  add column if not exists section_order jsonb not null default
    '["overview","liveWebsite","challenges","strategy","execution","results","stats","faq"]'::jsonb;
```

Run manually in the Supabase SQL editor, same as the existing migration file. No changes
needed to the `sections` column — `stats` is added to it the same way old rows already handle
missing keys (`normaliseSections` merge), no backfill required.

## CMS (`cms/`)

- `lib/portfolio.ts`: add `StatItem`, extend `PortfolioSections` with `stats`, rename
  `SECTION_ORDER` → `ALL_SECTION_KEYS`, add `DEFAULT_SECTION_ORDER`, add
  `normaliseSectionOrder`, extend `emptySections()`/`normaliseSections()` for `stats`,
  extend `emptyProject()` with `section_order: DEFAULT_SECTION_ORDER`, add `"Stats"` to
  `SECTION_LABELS`.
- `components/PortfolioForm.tsx`:
  - `sectionNumber()` and panel rendering iterate `form.section_order` (normalised) instead
    of the fixed constant.
  - `SectionPanel` gains `onMoveUp`/`onMoveDown` props rendering small ↑/↓ buttons next to
    the toggle switch; disabled at the first/last position. Moving swaps the key's index in
    `form.section_order`.
  - New Stats panel: same add/remove list pattern as Challenges, three inputs per tile
    (Value, Label, Growth) with a placeholder example matching the screenshot
    (`"315.78K"`, `"TOTAL IMPRESSIONS"`, `"+44.98% Growth"`).
  - `toSeoInput()`: add a `stats` content block (joined `value label growth` per tile) so the
    SEO word-count analyzer accounts for it, consistent with the other sections.
- `supabase/migrations/add_portfolio_stats_and_order.sql`: new file as above.

## Website (`restorefine-website/`)

- `lib/portfolio-cms.ts`: mirror all type/constant changes from `cms/lib/portfolio.ts`
  (same duplication pattern already used for every other section), including
  `normaliseSectionOrder` and defaulting `section_order` in `hydrate()`.
- `blocks/portfolio/cms-content.tsx`:
  - `visible` is computed from `normaliseSectionOrder(project.section_order).filter(isVisible)`
    instead of the fixed constant.
  - Add `SECTION_IDS.stats = "stats"`.
  - Add `isVisible` case: `s.stats.items.some((i) => i.value.trim() || i.label.trim())`.
  - Render block: `grid grid-cols-2 md:grid-cols-4 gap-4`, each tile
    `flex flex-col items-center text-center gap-2 bg-zinc-50 border border-zinc-100 rounded-2xl p-6`
    with value (`text-3xl md:text-4xl font-black text-zinc-900 tabular-nums`), label
    (`text-[11px] font-bold uppercase tracking-widest text-zinc-500`), and growth (green/red
    per the sign rule above) — reusing the site's existing card language rather than the
    screenshot's blue dashboard styling.

## Out of scope

- True drag-and-drop reordering (rejected in favor of up/down buttons — no new dependency).
- Per-tile icons or images on stat tiles (screenshot has none).
- Reordering service pills or anything outside the 8 case-study sections.

## Verification

1. Apply `add_portfolio_stats_and_order.sql` in the Supabase SQL editor.
2. `pnpm dev` in `cms/`: open an existing published project (e.g. It's Padel) — confirm it
   still renders correctly with `stats` defaulted off and `section_order` backfilled.
3. Enable Stats, add 4 tiles matching the screenshot, save as draft — confirm it does not
   appear on the live site yet.
4. Use the ↑/↓ buttons to move Stats to a different position, save, publish.
5. `pnpm dev` in `restorefine-website/`: confirm `/portfolio/<slug>` renders Stats in the
   chosen position, numbering and TOC are contiguous and match the new order.
6. Toggle Stats off again — confirm numbering/TOC collapse with no gap, matching existing
   section-toggle behavior.
7. `npx tsc --noEmit` clean in both packages.
