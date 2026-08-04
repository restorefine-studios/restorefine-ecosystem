# Portfolio CMS: Charts Section

Date: 2026-08-04

## Context

The portfolio CMS ships eight toggleable case-study sections, the most recent being `stats`
(see `docs/superpowers/specs/2026-08-03-portfolio-stats-section-design.md`), which established
the pattern: a new section key, disabled by default, slotted into `section_order` so nothing
changes for projects that predate it.

The user wants a "Charts" section: a grid of animated charts (bar, line, pie, area), each with
configurable legend, axis labels, and per-series colors, plus optional plain text cards in the
same grid, matching a reference screenshot (a 2x2 grid: grouped bar chart, horizontal bar
chart, bar chart, and a text card with a heading and bulleted key facts).

## Decisions

| Question | Decision |
|---|---|
| Chart types | Bar, Line, Pie/Donut, Area. Bar has a vertical/horizontal orientation toggle, not a separate type |
| Data entry | Spreadsheet-style table: rows are categories (x-axis labels), columns are series (name + color), cells are values |
| Grid content | Charts and text cards, mixed in the same grid |
| Grid columns | Editable per-project: 1, 2, or 3 (collapses to 1 on mobile regardless of setting) |
| Chart library | Recharts (SVG, declarative, built-in animation, easiest to theme with Tailwind) |
| Text card format | Heading + bullet list, each bullet a bold lead-in plus body text (matches the screenshot's "Geographic Dominance: ..." style) |
| CMS preview | Live: the chart renders in the CMS as the editor fills in the table, using the same Recharts components as the website |
| Default state | Disabled by default (like `stats`, `faq`), existing projects unaffected |

## Data model

New section `charts`, added to `PortfolioSections` (both `cms/lib/portfolio.ts` and
`restorefine-website/lib/portfolio-cms.ts`), and added to `ALL_SECTION_KEYS` /
`DEFAULT_SECTION_ORDER` (position: after `stats`, before `faq` — reorderable afterward like any
other section via the existing up/down buttons).

```ts
export interface ChartSeries {
  name: string;      // legend label, e.g. "Impressions"
  color: string;      // hex, e.g. "#dc2626"
  values: string[];   // one value per category, stored as text, parsed to number at render
}

export interface ChartBullet {
  lead: string;   // bold lead-in, e.g. "Geographic Dominance"
  body: string;   // rest of the sentence
}

export interface ChartTile {
  kind: "chart" | "text";

  // kind === "chart"
  chartType?: "bar" | "line" | "pie" | "area";
  orientation?: "vertical" | "horizontal";  // bar only, ignored otherwise
  title?: string;
  xAxisLabel?: string;   // ignored for pie
  yAxisLabel?: string;   // ignored for pie
  showLegend?: boolean;
  categories?: string[];    // x-axis labels, or pie slice names
  series?: ChartSeries[];   // pie charts use exactly one series; its values are slice sizes

  // kind === "text"
  heading?: string;
  bullets?: ChartBullet[];
}

// Added to PortfolioSections:
charts: SectionBase & { columns: 1 | 2 | 3; items: ChartTile[] };
```

Default item when adding a chart tile: `{ kind: "chart", chartType: "bar", orientation:
"vertical", title: "", xAxisLabel: "", yAxisLabel: "", showLegend: true, categories: [""],
series: [{ name: "", color: <next default palette color>, values: [""] }] }`.

Default item when adding a text tile: `{ kind: "text", heading: "", bullets: [{ lead: "", body:
"" }] }`.

A default color palette (6-8 hex values spanning the site's red/zinc palette plus a few
categorical accents) is used to auto-assign each new series' color; the editor can override via
a color swatch input, same pattern as the existing "Card Background" color field.

Numeric cell values are stored as strings (plain text inputs, consistent with how `StatItem`
already stores `value` as a string) and parsed with `Number(...)` at render time on the
website, defaulting to `0` on invalid input so a stray non-numeric entry never crashes the
chart.

A chart tile counts as visible if it has at least one non-empty category and at least one
series with a non-empty name or at least one non-empty value. A text tile counts as visible if
its heading or any bullet's lead/body is non-empty. This mirrors the existing per-section
visibility rules (e.g. `stats` requiring a non-empty value or label).

## Chart library

Recharts, added as a dependency to both `cms/` (for the live preview) and
`restorefine-website/` (for the real render). It is SVG-based, so it themes cleanly with
existing Tailwind classes, and its components (`BarChart`, `LineChart`, `PieChart`, `AreaChart`,
`Legend`, `XAxis`, `YAxis`, `Tooltip`) map directly onto the data model above with minimal
adapter code. Its default mount animation (`isAnimationActive`, on by default) provides the
"animated" requirement without extra work.

## CMS (`cms/`)

- `lib/portfolio.ts`: add `ChartSeries`, `ChartBullet`, `ChartTile`, extend `PortfolioSections`
  with `charts`, add `"charts"` to `ALL_SECTION_KEYS` (after `stats`, before `faq`) and
  `SECTION_LABELS`, extend `emptySections()` / `normaliseSections()` for `charts`.
- `components/ChartPreview.tsx` (new): a small Recharts wrapper component, shared by the CMS
  form's live preview and reused (copied, per the existing cross-app duplication convention) as
  the basis for the website's render component. Takes a `ChartTile` and renders the appropriate
  Recharts chart type.
- `components/PortfolioForm.tsx`: new Charts panel (added to `sectionBodies`, same
  move-up/move-down mechanics as every other section) with:
  - A grid-columns selector (1/2/3 buttons).
  - An add/remove list of tiles; each tile has a Chart/Text kind toggle.
  - Chart tile: chart-type dropdown, orientation toggle (shown only when `chartType === "bar"`),
    title field, x/y axis label fields (hidden for pie), legend toggle, then the
    category/series table (add/remove rows via a shared category list, add/remove series
    columns, each series a name input + color swatch), and a live `<ChartPreview>` underneath.
  - Text tile: heading field, add/remove bullets (lead + body inputs each).
  - `toSeoInput()`: add a `charts` content block (joined tile titles/headings/bullet text) so
    the SEO analyser accounts for it.

## Website (`restorefine-website/`)

- `lib/portfolio-cms.ts`: mirror the `charts` type/constant additions from `cms/lib/portfolio.ts`.
- `blocks/portfolio/chart-tile.tsx` (new): the render-side counterpart to `ChartPreview`, plus a
  scroll-into-view gate (a small `useInView`-style hook, consistent with this site's existing
  scroll-triggered animation patterns) so each chart's mount animation plays when it first
  scrolls into the viewport rather than on page load.
- `blocks/portfolio/cms-content.tsx`: add a `charts` entry to `SECTION_IDS`, `isVisible`, and
  `sectionBlocks`, rendering a `grid grid-cols-1 md:grid-cols-{columns}` of `<ChartTileRender>`
  / text-card components.

## Out of scope

- Chart types beyond Bar/Line/Pie/Area (radar, scatter, etc.).
- Per-tile export/download of chart data or images.
- Editable animation speed/easing (uses Recharts' defaults).
- Drag-and-drop reordering within the grid (tiles reorder via simple up/down, same as every
  other section's items, consistent with the earlier decision to avoid a DnD library).

## Verification

1. `pnpm dev` in `cms/`: open a project, enable Charts, add one tile of each type (bar
   vertical, bar horizontal, line, pie, area) plus a text card, confirm the live preview
   updates as data is entered and colors are changed.
2. Set grid columns to 1, 2, and 3, confirm the CMS preview grid reflows.
3. Save as draft, confirm it does not appear on the live site; publish.
4. `pnpm dev` in `restorefine-website/`: confirm `/portfolio/<slug>` renders the same grid, the
   same chart types and colors as the CMS preview, and that charts animate in when scrolled
   into view rather than immediately on page load.
5. Toggle Charts off, confirm numbering/TOC collapse with no gap, matching existing
   section-toggle behavior.
6. Enter a non-numeric value in a chart cell, confirm it renders as 0 rather than crashing the
   page.
7. `npx tsc --noEmit` clean in both packages.
