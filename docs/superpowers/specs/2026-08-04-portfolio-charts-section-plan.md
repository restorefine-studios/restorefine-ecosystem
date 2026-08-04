# Portfolio CMS Charts Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 9th portfolio case-study section, "Charts": a grid (1/2/3 columns, editable per project) of animated Recharts charts (bar/line/pie/area, with legend, axis labels, and per-series colors) mixed freely with plain text cards, editable in the CMS with a live preview.

**Architecture:** Same duplicated-data-model pattern as every prior section (`cms/lib/portfolio.ts` and `restorefine-website/lib/portfolio-cms.ts` independently declare the same shape). A new `charts` section is added to `PortfolioSections`, `ALL_SECTION_KEYS`, and `SECTION_LABELS` in both files, following exactly the mechanism `stats` used (see `docs/superpowers/specs/2026-08-03-portfolio-stats-section-design.md` and its plan). A shared Recharts-rendering component is written once for the CMS live preview (`cms/components/ChartPreview.tsx`) and duplicated, with a scroll-into-view gate added, for the website's real render (`restorefine-website/blocks/portfolio/chart-tile.tsx`).

**Tech Stack:** Next.js (App Router), TypeScript, Supabase (Postgres + RLS), Tailwind, Recharts (new dependency, `^2.15.0`, added to both `cms/` and `restorefine-website/`). No test framework exists in either package, verification is `tsc --noEmit` plus manual walkthroughs in `pnpm dev` (the manual/browser portion is this user's own responsibility to run, not the implementing agent's, per this repo's established convention).

## Global Constraints

- No em dashes anywhere (chat, comments, or copy) — use a comma or period instead.
- Do not introduce a test framework. Recharts is the one new dependency this plan adds; do not add any other new dependency (no separate animation library, the scroll-gate uses `framer-motion`, already a dependency of `restorefine-website/`).
- Follow the existing duplication pattern: every type/constant change to `cms/lib/portfolio.ts` must be mirrored in `restorefine-website/lib/portfolio-cms.ts`, and `cms/components/ChartPreview.tsx`'s rendering logic is duplicated (not imported) into `restorefine-website/blocks/portfolio/chart-tile.tsx`, exactly as this codebase already does for the rest of the type layer.
- `charts` sits between `stats` and `faq` in `ALL_SECTION_KEYS` / `DEFAULT_SECTION_ORDER`, defaults to `enabled: false` (like `stats` and `faq`), and is reorderable afterward via the existing up/down buttons, same as every other section.
- The `sections` and `section_order` Supabase columns are both `jsonb` with no fixed schema, so **no new SQL migration is needed** for this feature (unlike the `stats` section, which needed a new `section_order` column; that column already exists and `normaliseSectionOrder` already auto-appends any key missing from a stored row, including the new `"charts"` key, at read time).

---

### Task 1: Recharts dependency and CMS data model (`cms/lib/portfolio.ts`)

**Files:**
- Modify: `cms/pnpm-workspace.yaml`
- Modify: `cms/package.json`
- Modify: `cms/lib/portfolio.ts` (full replacement below)

**Interfaces:**
- Consumes: nothing new (base data layer).
- Produces: `ChartSeries`, `ChartBullet`, `ChartTile`, `DEFAULT_CHART_PALETTE: string[]`,
  `PortfolioSections.charts: SectionBase & { columns: 1 | 2 | 3; items: ChartTile[] }`,
  `"charts"` added to `ALL_SECTION_KEYS` and `SECTION_LABELS`.
- **Known, expected fallout:** `cms/components/PortfolioForm.tsx` will fail to type-check after
  this task, because its `sectionBodies: Record<SectionKey, React.ReactNode>` object literal
  will be missing the now-required `"charts"` property. This is fixed in Task 3, not this task.
  Do not touch `PortfolioForm.tsx` in this task.

- [ ] **Step 1: Fix the broken pnpm workspace config**

`cms/pnpm-workspace.yaml` is currently missing a `packages` field, which breaks `pnpm` entirely
in that directory (even `pnpm --version` fails with `ERROR packages field missing or empty`).
This blocks installing the new dependency this task needs. Replace the full file content:

Old content:
```yaml
ignoredBuiltDependencies:
  - sharp
  - unrs-resolver
```

New content:
```yaml
packages:
  - "."
ignoredBuiltDependencies:
  - sharp
  - unrs-resolver
```

Verify the fix: run `pnpm --version` from inside `cms/`, expect it to print a version number
(e.g. `9.15.4`) instead of the error.

- [ ] **Step 2: Add the recharts dependency**

In `cms/package.json`, in the `"dependencies"` object, change:

```json
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
```

to:

```json
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "recharts": "^2.15.0"
  },
```

Then run `pnpm install` from inside `cms/` to fetch it. Verify: `ls node_modules/recharts`
shows a real package directory (not a broken/missing install).

- [ ] **Step 3: Replace `cms/lib/portfolio.ts` with the following**

```ts
import { createClient } from "@/lib/supabase";

/** Categories the /portfolio grid filters by. Must match the website's filter list. */
export const PORTFOLIO_CATEGORIES = ["Branding", "Menus", "Media", "Web & Mobile"] as const;
export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

export interface ServicePill {
  label: string;
  /** Lucide icon name, chosen with IconPicker. */
  icon?: string;
}

export interface ChallengeItem {
  title: string;
  description: string;
}

export interface StrategyGroup {
  title: string;
  items: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface StatItem {
  /** The big number, e.g. "315.78K". */
  value: string;
  /** The caption below it, e.g. "TOTAL IMPRESSIONS". */
  label: string;
  /** Free text delta, e.g. "+44.98% Growth". Color derives from a leading "-". */
  growth?: string;
}

export interface ChartSeries {
  /** Legend label, e.g. "Impressions". */
  name: string;
  /** Hex color. Ignored for pie charts, which auto-cycle DEFAULT_CHART_PALETTE per slice. */
  color: string;
  /** One value per category, stored as text, parsed with Number(...) at render time. */
  values: string[];
}

export interface ChartBullet {
  /** Bold lead-in, e.g. "Geographic Dominance". */
  lead: string;
  body: string;
}

export interface ChartTile {
  kind: "chart" | "text";

  // kind === "chart"
  chartType?: "bar" | "line" | "pie" | "area";
  /** Bar only, ignored otherwise. */
  orientation?: "vertical" | "horizontal";
  title?: string;
  /** Ignored for pie. */
  xAxisLabel?: string;
  /** Ignored for pie. */
  yAxisLabel?: string;
  showLegend?: boolean;
  /** X-axis labels, or pie slice names. */
  categories?: string[];
  /** Pie charts use exactly series[0]; its values are slice sizes. */
  series?: ChartSeries[];

  // kind === "text"
  heading?: string;
  bullets?: ChartBullet[];
}

/** Auto-assigned to new chart series, and cycled per-slice for pie charts. */
export const DEFAULT_CHART_PALETTE = ["#dc2626", "#18181b", "#f59e0b", "#059669", "#2563eb", "#7c3aed"];

/** Every section carries an on/off switch and an overridable label. */
interface SectionBase {
  enabled: boolean;
  label?: string;
}

export interface PortfolioSections {
  overview: SectionBase & { body: string };
  liveWebsite: SectionBase & { url: string; domain: string; linkLabel: string };
  challenges: SectionBase & { items: ChallengeItem[] };
  strategy: SectionBase & { groups: StrategyGroup[] };
  execution: SectionBase & { intro: string; items: string[] };
  results: SectionBase & { items: string[] };
  stats: SectionBase & { items: StatItem[] };
  charts: SectionBase & { columns: 1 | 2 | 3; items: ChartTile[] };
  faq: SectionBase & { items: FaqItem[] };
}

export type SectionKey = keyof PortfolioSections;

/** The full valid key set. Used for validation/normalization, not render order. */
export const ALL_SECTION_KEYS: SectionKey[] = [
  "overview",
  "liveWebsite",
  "challenges",
  "strategy",
  "execution",
  "results",
  "stats",
  "charts",
  "faq",
];

/** Initial order for new projects, and the fallback/backfill order for existing rows. */
export const DEFAULT_SECTION_ORDER: SectionKey[] = [...ALL_SECTION_KEYS];

/** Default heading shown for each section when the editor hasn't overridden it. */
export const SECTION_LABELS: Record<SectionKey, string> = {
  overview: "Project Overview",
  liveWebsite: "Live Website",
  challenges: "The Challenges",
  strategy: "How We Solved It",
  execution: "Creative Execution",
  results: "Results",
  stats: "Stats",
  charts: "Charts",
  faq: "FAQs",
};

export interface PortfolioProject {
  id?: string;
  slug: string;
  client_name: string;
  title: string;
  description: string;
  category: string;
  project_date: string;
  hero_image: string;
  hero_image_alt: string;
  card_logo: string;
  card_logo_alt: string;
  card_bg: string;
  services: ServicePill[];
  sections: PortfolioSections;
  section_order: SectionKey[];
  cta_heading: string;
  cta_body: string;
  meta_title: string;
  meta_description: string;
  seo_keyphrase: string;
  noindex: boolean;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export function emptySections(): PortfolioSections {
  return {
    overview: { enabled: true, body: "" },
    liveWebsite: { enabled: true, url: "", domain: "", linkLabel: "" },
    challenges: { enabled: true, items: [{ title: "", description: "" }] },
    strategy: { enabled: true, groups: [{ title: "", items: [""] }] },
    execution: { enabled: true, intro: "", items: [""] },
    results: { enabled: true, items: [""] },
    stats: { enabled: false, items: [{ value: "", label: "", growth: "" }] },
    charts: {
      enabled: false,
      columns: 2,
      items: [
        {
          kind: "chart",
          chartType: "bar",
          orientation: "vertical",
          title: "",
          xAxisLabel: "",
          yAxisLabel: "",
          showLegend: true,
          categories: [""],
          series: [{ name: "", color: DEFAULT_CHART_PALETTE[0], values: [""] }],
        },
      ],
    },
    faq: { enabled: false, items: [{ question: "", answer: "" }] },
  };
}

/**
 * Fill in any section missing from a stored row. Rows saved before a section
 * existed would otherwise render as undefined in the form.
 */
export function normaliseSections(raw: unknown): PortfolioSections {
  const base = emptySections();
  if (!raw || typeof raw !== "object") return base;
  const stored = raw as Partial<PortfolioSections>;
  return {
    overview: { ...base.overview, ...(stored.overview ?? {}) },
    liveWebsite: { ...base.liveWebsite, ...(stored.liveWebsite ?? {}) },
    challenges: { ...base.challenges, ...(stored.challenges ?? {}) },
    strategy: { ...base.strategy, ...(stored.strategy ?? {}) },
    execution: { ...base.execution, ...(stored.execution ?? {}) },
    results: { ...base.results, ...(stored.results ?? {}) },
    stats: { ...base.stats, ...(stored.stats ?? {}) },
    charts: { ...base.charts, ...(stored.charts ?? {}) },
    faq: { ...base.faq, ...(stored.faq ?? {}) },
  };
}

/**
 * Repairs a stored section_order: drops unknown keys, then appends any
 * missing keys (e.g. "charts" on a row saved before it existed) at the end.
 */
export function normaliseSectionOrder(raw: unknown): SectionKey[] {
  const stored = Array.isArray(raw) ? (raw as SectionKey[]).filter((k) => ALL_SECTION_KEYS.includes(k)) : [];
  const missing = ALL_SECTION_KEYS.filter((k) => !stored.includes(k));
  return [...stored, ...missing];
}

export function emptyProject(): PortfolioProject {
  return {
    slug: "",
    client_name: "",
    title: "",
    description: "",
    category: "Branding",
    project_date: new Date().toISOString().split("T")[0],
    hero_image: "",
    hero_image_alt: "",
    card_logo: "",
    card_logo_alt: "",
    card_bg: "#000000",
    services: [],
    sections: emptySections(),
    section_order: DEFAULT_SECTION_ORDER,
    cta_heading: "Ready to Elevate Your Brand?",
    cta_body: "Get in touch and let's build something exceptional together.",
    meta_title: "",
    meta_description: "",
    seo_keyphrase: "",
    noindex: false,
    published: false,
  };
}

const LIST_COLUMNS =
  "id, slug, client_name, title, description, category, project_date, published, card_logo, card_logo_alt, card_bg, hero_image, created_at";

export type PortfolioListItem = Pick<
  PortfolioProject,
  | "id"
  | "slug"
  | "client_name"
  | "title"
  | "description"
  | "category"
  | "project_date"
  | "published"
  | "card_logo"
  | "card_logo_alt"
  | "card_bg"
  | "hero_image"
>;

export async function fetchAllProjects(): Promise<PortfolioListItem[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select(LIST_COLUMNS)
    .order("project_date", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as PortfolioListItem[];
}

export async function fetchProject(slug: string): Promise<PortfolioProject> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) throw new Error(error.message);
  const row = data as PortfolioProject;
  return {
    ...row,
    services: Array.isArray(row.services) ? row.services : [],
    sections: normaliseSections(row.sections),
    section_order: normaliseSectionOrder(row.section_order),
  };
}

export async function countProjects(): Promise<number> {
  const supabase = createClient();
  const { count, error } = await supabase
    .from("portfolio_projects")
    .select("id", { count: "exact", head: true });
  if (error) throw new Error(error.message);
  return count ?? 0;
}

export async function countPosts(): Promise<number> {
  const supabase = createClient();
  const { count, error } = await supabase
    .from("blog_posts")
    .select("id", { count: "exact", head: true });
  if (error) throw new Error(error.message);
  return count ?? 0;
}
```

- [ ] **Step 4: Verify**

Run: `cd cms && ./node_modules/.bin/tsc --noEmit`
Expected: errors only in `cms/components/PortfolioForm.tsx` (`Property "charts" is missing in
type ... Record<SectionKey, ReactNode>`, or similar). No errors in any other file. This is
expected and fixed in Task 3.

- [ ] **Step 5: Commit**

```bash
git add cms/pnpm-workspace.yaml cms/package.json cms/pnpm-lock.yaml cms/lib/portfolio.ts
git commit -m "Add charts section to portfolio data model and fix pnpm workspace config"
```

---

### Task 2: Shared chart-rendering component (`cms/components/ChartPreview.tsx`)

**Files:**
- Create: `cms/components/ChartPreview.tsx`

**Interfaces:**
- Consumes: `ChartTile`, `DEFAULT_CHART_PALETTE` from `@/lib/portfolio` (Task 1).
- Produces: `ChartPreview({ tile: ChartTile }): JSX.Element`, used by Task 3's
  `PortfolioForm.tsx`.

- [ ] **Step 1: Create `cms/components/ChartPreview.tsx` with the following**

```tsx
"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DEFAULT_CHART_PALETTE, type ChartTile } from "@/lib/portfolio";

/** Turns parallel categories/series arrays into the row-per-category shape Recharts wants. */
function toRows(categories: string[], series: ChartTile["series"]) {
  return categories.map((category, i) => {
    const row: Record<string, string | number> = { category };
    (series ?? []).forEach((s, si) => {
      row[s.name || `Series ${si + 1}`] = Number(s.values[i]) || 0;
    });
    return row;
  });
}

/**
 * Renders a ChartTile with Recharts. Shared by the CMS live preview here and
 * duplicated, with a scroll-into-view gate added, in
 * restorefine-website/blocks/portfolio/chart-tile.tsx, per this codebase's
 * cross-app duplication convention.
 */
export function ChartPreview({ tile }: { tile: ChartTile }) {
  const categories = tile.categories ?? [];
  const series = tile.series ?? [];
  const showLegend = tile.showLegend ?? true;

  if (tile.chartType === "pie") {
    const data = categories.map((name, i) => ({
      name,
      value: Number(series[0]?.values[i]) || 0,
    }));
    return (
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} label>
            {data.map((_, i) => (
              <Cell key={i} fill={DEFAULT_CHART_PALETTE[i % DEFAULT_CHART_PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip />
          {showLegend && <Legend />}
        </PieChart>
      </ResponsiveContainer>
    );
  }

  const rows = toRows(categories, series);
  const isHorizontalBar = tile.chartType === "bar" && tile.orientation === "horizontal";

  if (tile.chartType === "line") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={rows}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 11 }}
            label={tile.xAxisLabel ? { value: tile.xAxisLabel, position: "insideBottom", offset: -5 } : undefined}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            label={tile.yAxisLabel ? { value: tile.yAxisLabel, angle: -90, position: "insideLeft" } : undefined}
          />
          <Tooltip />
          {showLegend && <Legend />}
          {series.map((s, i) => (
            <Line
              key={i}
              type="monotone"
              dataKey={s.name || `Series ${i + 1}`}
              stroke={s.color || DEFAULT_CHART_PALETTE[i % DEFAULT_CHART_PALETTE.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (tile.chartType === "area") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={rows}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 11 }}
            label={tile.xAxisLabel ? { value: tile.xAxisLabel, position: "insideBottom", offset: -5 } : undefined}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            label={tile.yAxisLabel ? { value: tile.yAxisLabel, angle: -90, position: "insideLeft" } : undefined}
          />
          <Tooltip />
          {showLegend && <Legend />}
          {series.map((s, i) => {
            const color = s.color || DEFAULT_CHART_PALETTE[i % DEFAULT_CHART_PALETTE.length];
            return (
              <Area
                key={i}
                type="monotone"
                dataKey={s.name || `Series ${i + 1}`}
                stroke={color}
                fill={color}
                fillOpacity={0.25}
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  // bar (default)
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={rows} layout={isHorizontalBar ? "vertical" : "horizontal"}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
        {isHorizontalBar ? (
          <>
            <XAxis
              type="number"
              tick={{ fontSize: 11 }}
              label={tile.yAxisLabel ? { value: tile.yAxisLabel, position: "insideBottom", offset: -5 } : undefined}
            />
            <YAxis
              type="category"
              dataKey="category"
              width={100}
              tick={{ fontSize: 11 }}
              label={tile.xAxisLabel ? { value: tile.xAxisLabel, angle: -90, position: "insideLeft" } : undefined}
            />
          </>
        ) : (
          <>
            <XAxis
              dataKey="category"
              tick={{ fontSize: 11 }}
              label={tile.xAxisLabel ? { value: tile.xAxisLabel, position: "insideBottom", offset: -5 } : undefined}
            />
            <YAxis
              tick={{ fontSize: 11 }}
              label={tile.yAxisLabel ? { value: tile.yAxisLabel, angle: -90, position: "insideLeft" } : undefined}
            />
          </>
        )}
        <Tooltip />
        {showLegend && <Legend />}
        {series.map((s, i) => (
          <Bar
            key={i}
            dataKey={s.name || `Series ${i + 1}`}
            fill={s.color || DEFAULT_CHART_PALETTE[i % DEFAULT_CHART_PALETTE.length]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
```

- [ ] **Step 2: Verify**

Run: `cd cms && ./node_modules/.bin/tsc --noEmit`
Expected: the same single-file error set as Task 1 (`PortfolioForm.tsx` only), and no error in
`ChartPreview.tsx` itself. If any new error appears outside `PortfolioForm.tsx`, that is a real
regression from this task and must be fixed before proceeding.

- [ ] **Step 3: Commit**

```bash
git add cms/components/ChartPreview.tsx
git commit -m "Add shared Recharts preview component for the charts section"
```

---

### Task 3: CMS Charts panel (`cms/components/PortfolioForm.tsx`)

**Files:**
- Modify: `cms/components/PortfolioForm.tsx` (full replacement below)

**Interfaces:**
- Consumes: `ChartTile`, `ChartSeries`, `DEFAULT_CHART_PALETTE`, `PortfolioSections.charts`
  from Task 1; `ChartPreview` from Task 2.
- Produces: nothing consumed elsewhere (leaf UI). Writes `form.sections.charts` (columns and
  items), persisted by the existing `saveMutation` unchanged.

- [ ] **Step 1: Replace `cms/components/PortfolioForm.tsx` with the following**

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { createClient, type ContentBlock } from "@/lib/supabase";
import { uploadImage as uploadToStorage } from "@/lib/upload";
import {
  emptyProject,
  normaliseSections,
  normaliseSectionOrder,
  PORTFOLIO_CATEGORIES,
  SECTION_LABELS,
  DEFAULT_CHART_PALETTE,
  type ChartSeries,
  type ChartTile,
  type PortfolioProject,
  type PortfolioSections,
  type SectionKey,
  type ServicePill,
} from "@/lib/portfolio";
import type { SeoInput } from "./SeoPanel";

const SeoPanel = dynamic(() => import("./SeoPanel"), { ssr: false });
const IconPicker = dynamic(() => import("./IconPicker"), { ssr: false });
const ChartPreview = dynamic(() => import("./ChartPreview").then((m) => m.ChartPreview), { ssr: false });

interface PortfolioFormProps {
  initialData?: PortfolioProject;
  mode: "new" | "edit";
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

/**
 * Flatten a project into the shape the SEO analyser reads, so portfolio copy is
 * scored on the same checks as blog copy. Disabled sections are left out -
 * they never reach the page, so they shouldn't count towards word count.
 */
function toSeoInput(form: PortfolioProject): SeoInput {
  const s = form.sections;
  const content: ContentBlock[] = [];

  if (s.overview.enabled && s.overview.body) {
    content.push({ type: "section", heading: SECTION_LABELS.overview, content: s.overview.body });
  }
  if (s.challenges.enabled) {
    content.push({
      type: "section",
      heading: SECTION_LABELS.challenges,
      content: s.challenges.items.map((c) => `${c.title}. ${c.description}`).join(" "),
    });
  }
  if (s.strategy.enabled) {
    content.push({
      type: "section",
      heading: SECTION_LABELS.strategy,
      content: s.strategy.groups.map((g) => `${g.title}. ${g.items.join(". ")}`).join(" "),
    });
  }
  if (s.execution.enabled) {
    content.push({
      type: "section",
      heading: SECTION_LABELS.execution,
      content: `${s.execution.intro} ${s.execution.items.join(". ")}`,
    });
  }
  if (s.results.enabled) {
    content.push({
      type: "section",
      heading: SECTION_LABELS.results,
      content: s.results.items.join(". "),
    });
  }
  if (s.stats.enabled) {
    content.push({
      type: "section",
      heading: SECTION_LABELS.stats,
      content: s.stats.items.map((i) => `${i.value} ${i.label} ${i.growth ?? ""}`).join(" "),
    });
  }
  if (s.charts.enabled) {
    const chartText = s.charts.items
      .map((t) =>
        t.kind === "text"
          ? `${t.heading ?? ""} ${(t.bullets ?? []).map((b) => `${b.lead}. ${b.body}`).join(" ")}`
          : `${t.title ?? ""} ${(t.categories ?? []).join(" ")}`
      )
      .join(" ");
    content.push({ type: "section", heading: SECTION_LABELS.charts, content: chartText });
  }
  if (s.faq.enabled) {
    content.push({ type: "faq", heading: SECTION_LABELS.faq, faqs: s.faq.items });
  }

  return {
    title: form.title,
    slug: form.slug,
    meta_title: form.meta_title,
    meta_description: form.meta_description,
    excerpt: form.description,
    thumbnail: form.hero_image,
    thumbnail_alt: form.hero_image_alt,
    noindex: form.noindex,
    seo_keyphrase: form.seo_keyphrase,
    content,
  };
}

export default function PortfolioForm({ initialData, mode }: PortfolioFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const heroInputRef = useRef<HTMLInputElement>(null);
  const cardInputRef = useRef<HTMLInputElement>(null);

  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingCard, setUploadingCard] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [slugLocked, setSlugLocked] = useState(mode === "edit");
  // The slug the DB row is keyed by right now: kept separate from form.slug so
  // updates still find the row after a slug change.
  const [originalSlug, setOriginalSlug] = useState(initialData?.slug ?? "");

  const [form, setForm] = useState<PortfolioProject>(
    initialData
      ? {
          ...initialData,
          services: initialData.services ?? [],
          sections: normaliseSections(initialData.sections),
          section_order: normaliseSectionOrder(initialData.section_order),
        }
      : emptyProject()
  );

  function update<K extends keyof PortfolioProject>(field: K, value: PortfolioProject[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateSection<K extends SectionKey>(key: K, patch: Partial<PortfolioSections[K]>) {
    setForm((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [key]: { ...prev.sections[key], ...patch },
      } as PortfolioSections,
    }));
  }

  function moveSection(key: SectionKey, direction: -1 | 1) {
    setForm((prev) => {
      const order = normaliseSectionOrder(prev.section_order);
      const i = order.indexOf(key);
      const j = i + direction;
      if (j < 0 || j >= order.length) return prev;
      const next = [...order];
      [next[i], next[j]] = [next[j], next[i]];
      return { ...prev, section_order: next };
    });
  }

  function handleClientNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const clientName = e.target.value;
    setForm((prev) => ({
      ...prev,
      client_name: clientName,
      slug: !slugLocked ? slugify(clientName) : prev.slug,
    }));
  }

  // ── Uploads ────────────────────────────────────────────────────────────────

  async function handleUpload(file: File, kind: "hero" | "card") {
    const isHero = kind === "hero";
    const setUploading = isHero ? setUploadingHero : setUploadingCard;
    const field: keyof PortfolioProject = isHero ? "hero_image" : "card_logo";

    setUploading(true);
    let publicUrl: string;
    try {
      publicUrl = await uploadToStorage({
        file,
        folder: isHero ? "portfolio-hero" : "portfolio-card",
        base: form.slug?.trim() || "",
        suffix: isHero ? `-hero-${Date.now()}` : `-card-${Date.now()}`,
        // Hero images run full-bleed; card logos never render above ~600px
        maxPx: isHero ? 2400 : 1200,
      });
    } catch (err) {
      alert("Upload failed: " + (err as Error).message);
      setUploading(false);
      return;
    }

    update(field, publicUrl);

    // Persist straight away so the image survives a refresh before saving
    if (originalSlug && mode === "edit") {
      const supabase = createClient();
      await supabase
        .from("portfolio_projects")
        .update({ [field]: publicUrl, updated_at: new Date().toISOString() })
        .eq("slug", originalSlug);
      queryClient.invalidateQueries({ queryKey: ["project", originalSlug] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setSavedMsg("Image saved ✓");
    }

    setUploading(false);
  }

  // ── Services ───────────────────────────────────────────────────────────────

  function updateService(index: number, patch: Partial<ServicePill>) {
    setForm((prev) => ({
      ...prev,
      services: prev.services.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    }));
  }

  function addService() {
    setForm((prev) => ({ ...prev, services: [...prev.services, { label: "", icon: "" }] }));
  }

  function removeService(index: number) {
    setForm((prev) => ({ ...prev, services: prev.services.filter((_, i) => i !== index) }));
  }

  // ── Save / delete ──────────────────────────────────────────────────────────

  const saveMutation = useMutation({
    mutationFn: async (publish?: boolean) => {
      if (!form.slug.trim()) throw new Error("Slug is required.");
      if (!form.client_name.trim()) throw new Error("Client name is required.");

      const supabase = createClient();
      const isPublished = publish !== undefined ? publish : form.published;
      const { id: _id, created_at: _createdAt, ...rest } = form;
      const payload = {
        ...rest,
        published: isPublished,
        updated_at: new Date().toISOString(),
      };
      if (mode === "new") {
        const { error } = await supabase.from("portfolio_projects").insert([payload]);
        if (error) throw new Error(error.message);
      } else {
        const { error } = await supabase.from("portfolio_projects").update(payload).eq("slug", originalSlug);
        if (error) throw new Error(error.message);
      }
      return { published: isPublished };
    },
    onSuccess: ({ published }) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", originalSlug] });
      if (form.slug !== originalSlug) queryClient.invalidateQueries({ queryKey: ["project", form.slug] });
      setForm((prev) => ({ ...prev, published }));
      setSavedMsg(published ? "Published" : "Saved");
      if (mode === "new") {
        router.push(`/dashboard/portfolio/${form.slug}`);
      } else if (form.slug !== originalSlug) {
        setOriginalSlug(form.slug);
        router.replace(`/dashboard/portfolio/${form.slug}`);
      }
    },
    onError: (err) => alert("Save failed: " + err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const supabase = createClient();
      const { error } = await supabase.from("portfolio_projects").delete().eq("slug", originalSlug);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      router.push("/dashboard/portfolio");
    },
    onError: (err) => alert("Delete failed: " + err.message),
  });

  useEffect(() => {
    if (!savedMsg) return;
    const t = setTimeout(() => setSavedMsg(null), 3000);
    return () => clearTimeout(t);
  }, [savedMsg]);

  // Section order and numbers are per-project now, not a fixed constant.
  const sectionOrder = normaliseSectionOrder(form.section_order);
  const enabledOrder = sectionOrder.filter((key) => form.sections[key].enabled);
  const sectionNumber = (key: SectionKey) => {
    const i = enabledOrder.indexOf(key);
    return i === -1 ? "--" : String(i + 1).padStart(2, "0");
  };

  const s = form.sections;

  function updateChartTile(tileIndex: number, patch: Partial<ChartTile>) {
    updateSection("charts", {
      items: s.charts.items.map((t, j) => (j === tileIndex ? { ...t, ...patch } : t)),
    });
  }

  const sectionBodies: Record<SectionKey, React.ReactNode> = {
    overview: (
      <Field label="Overview Text">
        <textarea
          value={s.overview.body}
          onChange={(e) => updateSection("overview", { body: e.target.value })}
          rows={5}
          placeholder="What the project set out to do, and what RestoRefine delivered."
          className={inputCls}
        />
      </Field>
    ),

    liveWebsite: (
      <>
        <Field label="Website URL">
          <input
            value={s.liveWebsite.url}
            onChange={(e) => updateSection("liveWebsite", { url: e.target.value })}
            placeholder="https://www.itspadel.co.uk/"
            className={inputCls}
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Domain">
            <input
              value={s.liveWebsite.domain}
              onChange={(e) => updateSection("liveWebsite", { domain: e.target.value })}
              placeholder="itspadel.co.uk"
              className={inputCls}
            />
          </Field>
          <Field label="Label">
            <input
              value={s.liveWebsite.linkLabel}
              onChange={(e) => updateSection("liveWebsite", { linkLabel: e.target.value })}
              placeholder="It's Padel"
              className={inputCls}
            />
          </Field>
        </div>
      </>
    ),

    challenges: (
      <>
        <div className="space-y-3">
          {s.challenges.items.map((item, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-2 bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Challenge {String(i + 1).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => updateSection("challenges", { items: s.challenges.items.filter((_, j) => j !== i) })}
                  className={removeBtnCls}
                >
                  Remove
                </button>
              </div>
              <input
                value={item.title}
                onChange={(e) =>
                  updateSection("challenges", {
                    items: s.challenges.items.map((it, j) => (j === i ? { ...it, title: e.target.value } : it)),
                  })
                }
                placeholder="Lack of a Consistent Brand Identity"
                className={inputCls}
              />
              <textarea
                value={item.description}
                onChange={(e) =>
                  updateSection("challenges", {
                    items: s.challenges.items.map((it, j) => (j === i ? { ...it, description: e.target.value } : it)),
                  })
                }
                rows={2}
                placeholder="What the problem was, in one or two sentences."
                className={inputCls}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => updateSection("challenges", { items: [...s.challenges.items, { title: "", description: "" }] })}
          className={addBtnCls}
        >
          + Add Challenge
        </button>
        <p className="text-[11px] text-gray-400">Four challenges fill the dark block evenly.</p>
      </>
    ),

    strategy: (
      <>
        <div className="space-y-3">
          {s.strategy.groups.map((group, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-2 bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Column {String(i + 1).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => updateSection("strategy", { groups: s.strategy.groups.filter((_, j) => j !== i) })}
                  className={removeBtnCls}
                >
                  Remove
                </button>
              </div>
              <input
                value={group.title}
                onChange={(e) =>
                  updateSection("strategy", {
                    groups: s.strategy.groups.map((g, j) => (j === i ? { ...g, title: e.target.value } : g)),
                  })
                }
                placeholder="Branding"
                className={inputCls}
              />
              <StringList
                items={group.items}
                placeholder="Designed logo and brand guidelines"
                addLabel="+ Add Bullet"
                onChange={(items) =>
                  updateSection("strategy", {
                    groups: s.strategy.groups.map((g, j) => (j === i ? { ...g, items } : g)),
                  })
                }
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => updateSection("strategy", { groups: [...s.strategy.groups, { title: "", items: [""] }] })}
          className={addBtnCls}
        >
          + Add Column
        </button>
        <p className="text-[11px] text-gray-400">Three columns match the It&apos;s Padel layout.</p>
      </>
    ),

    execution: (
      <>
        <Field label="Intro Line">
          <textarea
            value={s.execution.intro}
            onChange={(e) => updateSection("execution", { intro: e.target.value })}
            rows={2}
            placeholder="Our team produced a wide range of creative assets, including:"
            className={inputCls}
          />
        </Field>
        <Field label="Deliverables">
          <StringList
            items={s.execution.items}
            placeholder="Logo and brand identity design"
            addLabel="+ Add Deliverable"
            onChange={(items) => updateSection("execution", { items })}
          />
        </Field>
      </>
    ),

    results: (
      <StringList
        items={s.results.items}
        placeholder="Increased social media engagement through strategic content"
        addLabel="+ Add Result"
        onChange={(items) => updateSection("results", { items })}
      />
    ),

    stats: (
      <>
        <div className="space-y-3">
          {s.stats.items.map((item, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-2 bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Stat {String(i + 1).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => updateSection("stats", { items: s.stats.items.filter((_, j) => j !== i) })}
                  className={removeBtnCls}
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={item.value}
                  onChange={(e) =>
                    updateSection("stats", {
                      items: s.stats.items.map((it, j) => (j === i ? { ...it, value: e.target.value } : it)),
                    })
                  }
                  placeholder="315.78K"
                  className={inputCls}
                />
                <input
                  value={item.label}
                  onChange={(e) =>
                    updateSection("stats", {
                      items: s.stats.items.map((it, j) => (j === i ? { ...it, label: e.target.value } : it)),
                    })
                  }
                  placeholder="TOTAL IMPRESSIONS"
                  className={inputCls}
                />
              </div>
              <input
                value={item.growth ?? ""}
                onChange={(e) =>
                  updateSection("stats", {
                    items: s.stats.items.map((it, j) => (j === i ? { ...it, growth: e.target.value } : it)),
                  })
                }
                placeholder="+44.98% Growth"
                className={inputCls}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => updateSection("stats", { items: [...s.stats.items, { value: "", label: "", growth: "" }] })}
          className={addBtnCls}
        >
          + Add Stat
        </button>
        <p className="text-[11px] text-gray-400">
          Growth is free text; start it with &quot;-&quot; to show it in red instead of green.
        </p>
      </>
    ),

    charts: (
      <>
        <Field label="Grid Columns">
          <div className="flex gap-2">
            {([1, 2, 3] as const).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => updateSection("charts", { columns: n })}
                className={`px-4 py-2 rounded-lg border text-xs font-bold uppercase tracking-widest transition ${
                  s.charts.columns === n
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 text-gray-500 hover:border-gray-400"
                }`}
              >
                {n} Column{n > 1 ? "s" : ""}
              </button>
            ))}
          </div>
        </Field>

        <div className="space-y-4">
          {s.charts.items.map((tile, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => updateChartTile(i, { kind: "chart" })}
                    className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-widest transition ${
                      tile.kind === "chart" ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 text-gray-500"
                    }`}
                  >
                    Chart
                  </button>
                  <button
                    type="button"
                    onClick={() => updateChartTile(i, { kind: "text" })}
                    className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-widest transition ${
                      tile.kind === "text" ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 text-gray-500"
                    }`}
                  >
                    Text Card
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => updateSection("charts", { items: s.charts.items.filter((_, j) => j !== i) })}
                  className={removeBtnCls}
                >
                  Remove Tile
                </button>
              </div>

              <ChartOrTextTile tile={tile} onChange={(patch) => updateChartTile(i, patch)} />
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              updateSection("charts", {
                items: [
                  ...s.charts.items,
                  {
                    kind: "chart",
                    chartType: "bar",
                    orientation: "vertical",
                    title: "",
                    xAxisLabel: "",
                    yAxisLabel: "",
                    showLegend: true,
                    categories: [""],
                    series: [{ name: "", color: DEFAULT_CHART_PALETTE[0], values: [""] }],
                  },
                ],
              })
            }
            className={addBtnCls}
          >
            + Add Chart
          </button>
          <button
            type="button"
            onClick={() =>
              updateSection("charts", {
                items: [...s.charts.items, { kind: "text", heading: "", bullets: [{ lead: "", body: "" }] }],
              })
            }
            className={addBtnCls}
          >
            + Add Text Card
          </button>
        </div>
        <p className="text-[11px] text-gray-400">
          Pie charts use one series (categories become slices); other chart types support any
          number of series.
        </p>
      </>
    ),

    faq: (
      <>
        <div className="space-y-3">
          {s.faq.items.map((item, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-2 bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Question {i + 1}</span>
                <button
                  type="button"
                  onClick={() => updateSection("faq", { items: s.faq.items.filter((_, j) => j !== i) })}
                  className={removeBtnCls}
                >
                  Remove
                </button>
              </div>
              <input
                value={item.question}
                onChange={(e) =>
                  updateSection("faq", {
                    items: s.faq.items.map((it, j) => (j === i ? { ...it, question: e.target.value } : it)),
                  })
                }
                placeholder="Question"
                className={inputCls}
              />
              <textarea
                value={item.answer}
                onChange={(e) =>
                  updateSection("faq", {
                    items: s.faq.items.map((it, j) => (j === i ? { ...it, answer: e.target.value } : it)),
                  })
                }
                rows={3}
                placeholder="Answer"
                className={inputCls}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => updateSection("faq", { items: [...s.faq.items, { question: "", answer: "" }] })}
          className={addBtnCls}
        >
          + Add Question
        </button>
        <p className="text-[11px] text-gray-400">Published as FAQ schema so it can win rich results.</p>
      </>
    ),
  };

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 items-start">
        {/* ── Left: form ── */}
        <div className="space-y-6">

          {/* Project details */}
          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Project Details</h3>

            <Field label="Client Name">
              <input value={form.client_name} onChange={handleClientNameChange} placeholder="It's Padel" className={inputCls} />
            </Field>

            <Field label="Slug">
              <div className="flex gap-2 items-center">
                <input
                  value={form.slug}
                  onChange={(e) => { setSlugLocked(true); update("slug", e.target.value); }}
                  placeholder="itspadel"
                  className={inputCls + " flex-1"}
                />
                <button
                  type="button"
                  title={slugLocked ? "Unlock: auto-generate from client name" : "Lock: editing manually"}
                  onClick={() => {
                    if (slugLocked) {
                      setSlugLocked(false);
                      update("slug", slugify(form.client_name));
                    } else {
                      setSlugLocked(true);
                    }
                  }}
                  className={`flex-shrink-0 px-3 py-2.5 rounded-lg border text-[10px] font-black uppercase tracking-widest transition ${
                    slugLocked
                      ? "border-gray-200 bg-gray-100 text-gray-500 hover:text-white"
                      : "border-emerald-700 bg-emerald-950 text-emerald-400"
                  }`}
                >
                  {slugLocked ? "Locked" : "Auto"}
                </button>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Live at /portfolio/{form.slug || "your-slug"}
              </p>
            </Field>

            <Field label="Project Title">
              <input
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="Building a Digital Presence for a Padel Academy"
                className={inputCls}
              />
            </Field>

            <Field label="Short Description">
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                rows={3}
                placeholder="One or two lines shown on listings and used as the fallback meta description."
                className={inputCls}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">
                <select value={form.category} onChange={(e) => update("category", e.target.value)} className={inputCls}>
                  {PORTFOLIO_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Project Date">
                <input
                  type="date"
                  value={form.project_date}
                  onChange={(e) => update("project_date", e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>
          </section>

          {/* Images */}
          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Images</h3>

            <Field label="Hero Image">
              <div className="flex gap-3 items-start">
                <input
                  value={form.hero_image}
                  onChange={(e) => update("hero_image", e.target.value)}
                  placeholder="URL or upload"
                  className={inputCls + " flex-1"}
                />
                <button type="button" onClick={() => heroInputRef.current?.click()} disabled={uploadingHero} className={uploadBtnCls}>
                  {uploadingHero ? "Uploading..." : "Upload"}
                </button>
                <input
                  ref={heroInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "hero")}
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Full-bleed banner at the top of the case study. Wide images work best (roughly 32:15).
              </p>
              {form.hero_image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.hero_image} alt="hero preview" className="mt-3 w-full aspect-video object-cover rounded-xl border border-gray-200" />
              )}
            </Field>

            <Field label="Hero Alt Text">
              <input
                value={form.hero_image_alt}
                onChange={(e) => update("hero_image_alt", e.target.value)}
                placeholder="Describe the image for SEO"
                className={inputCls}
              />
            </Field>

            <div className="h-px bg-gray-100" />

            <Field label="Grid Card Logo">
              <div className="flex gap-3 items-start">
                <input
                  value={form.card_logo}
                  onChange={(e) => update("card_logo", e.target.value)}
                  placeholder="URL or upload (SVG keeps its crispness)"
                  className={inputCls + " flex-1"}
                />
                <button type="button" onClick={() => cardInputRef.current?.click()} disabled={uploadingCard} className={uploadBtnCls}>
                  {uploadingCard ? "Uploading..." : "Upload"}
                </button>
                <input
                  ref={cardInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "card")}
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                The client logo shown on the /portfolio grid. Upload a white or light logo to sit on the card colour.
              </p>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Card Logo Alt Text">
                <input
                  value={form.card_logo_alt}
                  onChange={(e) => update("card_logo_alt", e.target.value)}
                  placeholder="It's Padel logo"
                  className={inputCls}
                />
              </Field>
              <Field label="Card Background">
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={/^#[0-9a-fA-F]{6}$/.test(form.card_bg) ? form.card_bg : "#000000"}
                    onChange={(e) => update("card_bg", e.target.value)}
                    className="w-11 h-11 rounded-lg border border-gray-200 bg-white p-1 cursor-pointer flex-shrink-0"
                  />
                  <input value={form.card_bg} onChange={(e) => update("card_bg", e.target.value)} placeholder="#000000" className={inputCls} />
                </div>
              </Field>
            </div>

            {form.card_logo && (
              <div
                className="rounded-xl border border-gray-200 h-32 flex items-center justify-center"
                style={{ background: form.card_bg }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.card_logo} alt={form.card_logo_alt || "card preview"} className="max-h-[45%] max-w-[55%] object-contain" />
              </div>
            )}
          </section>

          {/* Service pills */}
          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Services</h3>
              <p className="text-[11px] text-gray-400 mt-1">The pill row above the case study, e.g. Branding, Web Development.</p>
            </div>

            {form.services.length === 0 && (
              <p className="text-gray-400 text-sm py-2">No services yet.</p>
            )}

            <div className="space-y-3">
              {form.services.map((service, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-2 bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Service {i + 1}</span>
                    <button type="button" onClick={() => removeService(i)} className={removeBtnCls}>Remove</button>
                  </div>
                  <IconPicker value={service.icon || ""} onChange={(icon) => updateService(i, { icon })} />
                  <input
                    value={service.label}
                    onChange={(e) => updateService(i, { label: e.target.value })}
                    placeholder="Branding"
                    className={inputCls}
                  />
                </div>
              ))}
            </div>

            <button type="button" onClick={addService} className={addBtnCls}>+ Add Service</button>
          </section>

          {/* ── Case study sections ── */}
          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Case Study Sections</h3>
              <p className="text-[11px] text-gray-400 mt-1">
                Use the arrows to reorder. Switch off anything this client doesn&apos;t need:
                numbering and the sidebar contents renumber automatically.
              </p>
            </div>

            {sectionOrder.map((key, i) => (
              <SectionPanel
                key={key}
                num={sectionNumber(key)}
                label={SECTION_LABELS[key]}
                enabled={s[key].enabled}
                onToggle={(enabled) => updateSection(key, { enabled })}
                onMoveUp={i > 0 ? () => moveSection(key, -1) : undefined}
                onMoveDown={i < sectionOrder.length - 1 ? () => moveSection(key, 1) : undefined}
              >
                {sectionBodies[key]}
              </SectionPanel>
            ))}
          </section>

          {/* CTA */}
          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Call to Action</h3>
            <Field label="CTA Heading">
              <input
                value={form.cta_heading}
                onChange={(e) => update("cta_heading", e.target.value)}
                placeholder="Ready to Elevate Your Brand?"
                className={inputCls}
              />
            </Field>
            <Field label="CTA Body">
              <textarea
                value={form.cta_body}
                onChange={(e) => update("cta_body", e.target.value)}
                rows={3}
                placeholder="Short persuasive line under the CTA heading"
                className={inputCls}
              />
            </Field>
          </section>

          {/* SEO */}
          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Search</h3>
            <Field label="Meta Title">
              <input
                value={form.meta_title}
                onChange={(e) => update("meta_title", e.target.value)}
                placeholder={form.title || "Defaults to the project title"}
                className={inputCls}
              />
              <p className="text-[11px] text-gray-400 mt-1">
                {(form.meta_title || form.title || "").length}/60 chars
                {(form.meta_title || form.title || "").length > 60 && <span className="text-red-400 ml-1">Too long</span>}
              </p>
            </Field>
            <Field label="Meta Description">
              <textarea
                value={form.meta_description}
                onChange={(e) => update("meta_description", e.target.value)}
                placeholder={form.description || "Defaults to the short description"}
                rows={3}
                className={inputCls}
              />
              <p className="text-[11px] text-gray-400 mt-1">
                {(form.meta_description || form.description || "").length}/155 chars
                {(form.meta_description || form.description || "").length > 155 && <span className="text-red-400 ml-1">Too long</span>}
              </p>
            </Field>
            <Field label="Search Engine Indexing">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!form.noindex}
                  onChange={(e) => update("noindex", !e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300"
                />
                Allow search engines to index this project
              </label>
              {form.noindex && (
                <p className="text-[11px] text-amber-500 mt-1">This project will be hidden from search results (noindex).</p>
              )}
            </Field>
          </section>
        </div>

        {/* ── Right: SEO panel ── */}
        <div className="hidden xl:block sticky top-6 self-start max-h-[calc(100vh-5rem)] overflow-y-auto pr-1 scrollbar-thin">
          <SeoPanel form={toSeoInput(form)} onKeyphrase={(v) => update("seo_keyphrase", v)} />
        </div>
      </div>

      {/* ── Actions — fixed bottom bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-screen-2xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => saveMutation.mutate(undefined)}
              disabled={saveMutation.isPending}
              className="bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg hover:bg-gray-200 transition disabled:opacity-50 border border-gray-200"
            >
              {saveMutation.isPending ? "Saving..." : "Save Draft"}
            </button>
            <button
              onClick={() => saveMutation.mutate(true)}
              disabled={saveMutation.isPending}
              className="bg-gray-900 text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
            >
              {form.published ? "Update & Publish" : "Publish"}
            </button>
            {savedMsg && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                {savedMsg}
              </span>
            )}
          </div>
          {mode === "edit" && (
            <button
              onClick={() => { if (!confirm("Delete this project? This cannot be undone.")) return; deleteMutation.mutate(); }}
              disabled={deleteMutation.isPending}
              className="text-xs font-semibold text-red-400 hover:text-red-600 transition disabled:opacity-50"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete Project"}
            </button>
          )}
        </div>
      </div>

      {/* Spacer so content isn't hidden behind the fixed bar */}
      <div className="h-16" />
    </>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function SectionPanel({
  num,
  label,
  enabled,
  onToggle,
  onMoveUp,
  onMoveDown,
  children,
}: {
  num: string;
  label: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className={`border rounded-xl overflow-hidden transition-colors ${enabled ? "border-gray-200 bg-white" : "border-gray-100 bg-gray-50"}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-3">
          <span className={`text-[11px] font-black tabular-nums ${enabled ? "text-red-600" : "text-gray-300"}`}>{num}</span>
          <span className={`text-[11px] font-black uppercase tracking-widest ${enabled ? "text-gray-700" : "text-gray-400"}`}>
            {label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-0.5">
            <button
              type="button"
              onClick={onMoveUp}
              disabled={!onMoveUp}
              aria-label={`Move ${label} up`}
              className="w-5 h-4 flex items-center justify-center rounded text-gray-400 hover:text-gray-700 hover:bg-gray-200 disabled:opacity-25 disabled:hover:bg-transparent transition"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 5.5L4 1.5L7 5.5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={onMoveDown}
              disabled={!onMoveDown}
              aria-label={`Move ${label} down`}
              className="w-5 h-4 flex items-center justify-center rounded text-gray-400 hover:text-gray-700 hover:bg-gray-200 disabled:opacity-25 disabled:hover:bg-transparent transition"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 2.5L4 6.5L7 2.5" />
              </svg>
            </button>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            aria-label={`${enabled ? "Hide" : "Show"} ${label}`}
            onClick={() => onToggle(!enabled)}
            className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${enabled ? "bg-emerald-500" : "bg-gray-300"}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-5" : "translate-x-0"}`}
            />
          </button>
        </div>
      </div>
      {enabled && <div className="p-4 space-y-4">{children}</div>}
    </div>
  );
}

/** Editable list of plain strings: bullets, deliverables, results. */
function StringList({
  items,
  placeholder,
  addLabel,
  onChange,
}: {
  items: string[];
  placeholder: string;
  addLabel: string;
  onChange: (items: string[]) => void;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            value={item}
            onChange={(e) => onChange(items.map((it, j) => (j === i ? e.target.value : it)))}
            placeholder={placeholder}
            className={inputCls + " flex-1"}
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            aria-label="Remove item"
            className="w-8 h-8 flex-shrink-0 rounded-md flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 transition"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M1 1l8 8M9 1L1 9" />
            </svg>
          </button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, ""])} className={addBtnCls}>
        {addLabel}
      </button>
    </div>
  );
}

/** Routes a charts-section tile to its chart config editor or its text card editor. */
function ChartOrTextTile({
  tile,
  onChange,
}: {
  tile: ChartTile;
  onChange: (patch: Partial<ChartTile>) => void;
}) {
  if (tile.kind === "text") {
    const bullets = tile.bullets ?? [];
    return (
      <div className="space-y-3">
        <Field label="Heading">
          <input
            value={tile.heading ?? ""}
            onChange={(e) => onChange({ heading: e.target.value })}
            placeholder="Audience Demographics & Geography"
            className={inputCls}
          />
        </Field>
        <div className="space-y-2">
          {bullets.map((b, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-2 bg-white">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Bullet {i + 1}</span>
                <button
                  type="button"
                  onClick={() => onChange({ bullets: bullets.filter((_, j) => j !== i) })}
                  className={removeBtnCls}
                >
                  Remove
                </button>
              </div>
              <input
                value={b.lead}
                onChange={(e) => onChange({ bullets: bullets.map((bb, j) => (j === i ? { ...bb, lead: e.target.value } : bb)) })}
                placeholder="Geographic Dominance"
                className={inputCls}
              />
              <textarea
                value={b.body}
                onChange={(e) => onChange({ bullets: bullets.map((bb, j) => (j === i ? { ...bb, body: e.target.value } : bb)) })}
                rows={2}
                placeholder="92.17% of overall audience is located in the UK."
                className={inputCls}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onChange({ bullets: [...bullets, { lead: "", body: "" }] })}
          className={addBtnCls}
        >
          + Add Bullet
        </button>
      </div>
    );
  }
  return <ChartTileEditor tile={tile} onChange={onChange} />;
}

/** Chart-type-specific fields plus the category/series spreadsheet editor and live preview. */
function ChartTileEditor({
  tile,
  onChange,
}: {
  tile: ChartTile;
  onChange: (patch: Partial<ChartTile>) => void;
}) {
  const categories = tile.categories ?? [];
  const series = tile.series ?? [];
  const isPie = tile.chartType === "pie";
  const isBar = tile.chartType === "bar";

  function addCategory() {
    onChange({
      categories: [...categories, ""],
      series: series.map((sr) => ({ ...sr, values: [...sr.values, ""] })),
    });
  }
  function removeCategory(i: number) {
    onChange({
      categories: categories.filter((_, j) => j !== i),
      series: series.map((sr) => ({ ...sr, values: sr.values.filter((_, j) => j !== i) })),
    });
  }
  function updateCategory(i: number, value: string) {
    onChange({ categories: categories.map((c, j) => (j === i ? value : c)) });
  }
  function addSeries() {
    const color = DEFAULT_CHART_PALETTE[series.length % DEFAULT_CHART_PALETTE.length];
    onChange({ series: [...series, { name: "", color, values: categories.map(() => "") }] });
  }
  function removeSeries(i: number) {
    onChange({ series: series.filter((_, j) => j !== i) });
  }
  function updateSeries(i: number, patch: Partial<ChartSeries>) {
    onChange({ series: series.map((sr, j) => (j === i ? { ...sr, ...patch } : sr)) });
  }
  function updateValue(seriesIndex: number, catIndex: number, value: string) {
    onChange({
      series: series.map((sr, j) =>
        j === seriesIndex ? { ...sr, values: sr.values.map((v, k) => (k === catIndex ? value : v)) } : sr
      ),
    });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Chart Type">
          <select
            value={tile.chartType ?? "bar"}
            onChange={(e) => onChange({ chartType: e.target.value as ChartTile["chartType"] })}
            className={inputCls}
          >
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="area">Area</option>
            <option value="pie">Pie / Donut</option>
          </select>
        </Field>
        {isBar && (
          <Field label="Orientation">
            <select
              value={tile.orientation ?? "vertical"}
              onChange={(e) => onChange({ orientation: e.target.value as ChartTile["orientation"] })}
              className={inputCls}
            >
              <option value="vertical">Vertical</option>
              <option value="horizontal">Horizontal</option>
            </select>
          </Field>
        )}
      </div>

      <Field label="Chart Title">
        <input
          value={tile.title ?? ""}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Cross-Platform Performance Breakdown"
          className={inputCls}
        />
      </Field>

      {!isPie && (
        <div className="grid grid-cols-2 gap-4">
          <Field label="X Axis Label">
            <input
              value={tile.xAxisLabel ?? ""}
              onChange={(e) => onChange({ xAxisLabel: e.target.value })}
              placeholder="Platform"
              className={inputCls}
            />
          </Field>
          <Field label="Y Axis Label">
            <input
              value={tile.yAxisLabel ?? ""}
              onChange={(e) => onChange({ yAxisLabel: e.target.value })}
              placeholder="Impressions (%)"
              className={inputCls}
            />
          </Field>
        </div>
      )}

      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
        <input
          type="checkbox"
          checked={tile.showLegend ?? true}
          onChange={(e) => onChange({ showLegend: e.target.checked })}
          className="w-4 h-4 rounded border-gray-300"
        />
        Show legend
      </label>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                {isPie ? "Slice" : "Category"}
              </th>
              {series.map((sr, si) => (
                <th key={si} className="p-2 min-w-[160px]">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={/^#[0-9a-fA-F]{6}$/.test(sr.color) ? sr.color : "#000000"}
                      onChange={(e) => updateSeries(si, { color: e.target.value })}
                      className="w-7 h-7 rounded border border-gray-200 bg-white p-0.5 cursor-pointer flex-shrink-0"
                    />
                    <input
                      value={sr.name}
                      onChange={(e) => updateSeries(si, { name: e.target.value })}
                      placeholder={isPie ? "Value" : `Series ${si + 1}`}
                      className={inputCls}
                    />
                    {!isPie && (
                      <button type="button" onClick={() => removeSeries(si)} className={removeBtnCls}>
                        &times;
                      </button>
                    )}
                  </div>
                </th>
              ))}
              <th className="p-2 align-bottom">
                {!isPie && (
                  <button type="button" onClick={addSeries} className={addBtnCls}>+ Series</button>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, ci) => (
              <tr key={ci} className="border-t border-gray-100">
                <td className="p-2">
                  <div className="flex items-center gap-1.5">
                    <input
                      value={cat}
                      onChange={(e) => updateCategory(ci, e.target.value)}
                      placeholder={isPie ? "Slice label" : "Category"}
                      className={inputCls}
                    />
                    <button type="button" onClick={() => removeCategory(ci)} className={removeBtnCls}>
                      &times;
                    </button>
                  </div>
                </td>
                {series.map((sr, si) => (
                  <td key={si} className="p-2">
                    <input
                      value={sr.values[ci] ?? ""}
                      onChange={(e) => updateValue(si, ci, e.target.value)}
                      placeholder="0"
                      className={inputCls}
                    />
                  </td>
                ))}
                <td />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="button" onClick={addCategory} className={addBtnCls}>
        + Add {isPie ? "Slice" : "Category"}
      </button>

      <div className="border border-gray-100 rounded-xl p-4 bg-white">
        <ChartPreview tile={tile} />
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-gray-400 placeholder:text-gray-400 resize-none";
const uploadBtnCls = "text-xs font-bold uppercase tracking-widest bg-gray-100 text-gray-700 px-3 py-2.5 rounded-lg hover:bg-gray-200 transition whitespace-nowrap disabled:opacity-50";
const addBtnCls = "text-xs font-bold text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-400 px-4 py-2 rounded-lg transition";
const removeBtnCls = "text-[10px] text-red-400 hover:text-red-600 font-semibold";
```

- [ ] **Step 2: Verify the CMS package type-checks**

Run: `cd cms && ./node_modules/.bin/tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manually verify in the browser**

Run: `cd cms && pnpm dev`. Log in, open an existing project. Confirm all 8 original sections
still render with their existing content intact, and a new "Charts" panel appears, off by
default. Turn it on, add a bar chart with 2 categories and 2 series, confirm the live preview
below the table updates as you type and as you change series colors. Switch chart type to Pie,
confirm the series column count locks to one and the preview becomes a pie chart. Add a Text
Card tile, confirm its bullet editor works. Save Draft, reload: confirm everything persisted.

- [ ] **Step 4: Commit**

```bash
git add cms/components/PortfolioForm.tsx
git commit -m "Add Charts section panel with live preview to portfolio form"
```

---

### Task 4: Website data model (`restorefine-website/lib/portfolio-cms.ts`)

**Files:**
- Modify: `restorefine-website/package.json`
- Modify: `restorefine-website/lib/portfolio-cms.ts` (full replacement below)

**Interfaces:**
- Consumes: nothing (mirrors Task 1, independently maintained per the existing duplication
  pattern).
- Produces: `ChartSeries`, `ChartBullet`, `ChartTile`, `DEFAULT_CHART_PALETTE`,
  `PortfolioSections.charts`, `"charts"` in `ALL_SECTION_KEYS` and `SECTION_LABELS`.
- **Known, expected fallout:** `restorefine-website/blocks/portfolio/cms-content.tsx` will fail
  to type-check after this task with two errors in that one file: its
  `SECTION_IDS: Record<SectionKey, string>` and `sectionBlocks: Record<SectionKey,
  React.ReactNode>` object literals will both be missing the now-required `"charts"` property.
  Both are fixed in Task 6, not this task. Do not touch `cms-content.tsx` here.

- [ ] **Step 1: Add the recharts dependency**

In `restorefine-website/package.json`, in `"dependencies"`, change:

```json
    "react-dom": "^18",
    "resend": "^4.0.1",
```

to:

```json
    "react-dom": "^18",
    "recharts": "^2.15.0",
    "resend": "^4.0.1",
```

Run `pnpm install` from inside `restorefine-website/` to fetch it. Verify: `ls
node_modules/recharts` shows a real package directory.

- [ ] **Step 2: Replace `restorefine-website/lib/portfolio-cms.ts` with the following**

```ts
import { createClient } from "@supabase/supabase-js";
import type { PortfolioItem } from "@/lib/portfolio";

// Mirrors cms/lib/portfolio.ts. The CMS and the website are separate apps, so
// the shape is declared in both rather than shared through a package.

export interface ServicePill {
  label: string;
  /** Lucide icon name. */
  icon?: string;
}

export interface ChallengeItem {
  title: string;
  description: string;
}

export interface StrategyGroup {
  title: string;
  items: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface StatItem {
  value: string;
  label: string;
  growth?: string;
}

export interface ChartSeries {
  name: string;
  /** Ignored for pie charts, which auto-cycle DEFAULT_CHART_PALETTE per slice. */
  color: string;
  values: string[];
}

export interface ChartBullet {
  lead: string;
  body: string;
}

export interface ChartTile {
  kind: "chart" | "text";

  chartType?: "bar" | "line" | "pie" | "area";
  orientation?: "vertical" | "horizontal";
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  showLegend?: boolean;
  categories?: string[];
  series?: ChartSeries[];

  heading?: string;
  bullets?: ChartBullet[];
}

/** Auto-assigned to new chart series, and cycled per-slice for pie charts. */
export const DEFAULT_CHART_PALETTE = ["#dc2626", "#18181b", "#f59e0b", "#059669", "#2563eb", "#7c3aed"];

interface SectionBase {
  enabled: boolean;
  label?: string;
}

export interface PortfolioSections {
  overview: SectionBase & { body: string };
  liveWebsite: SectionBase & { url: string; domain: string; linkLabel: string };
  challenges: SectionBase & { items: ChallengeItem[] };
  strategy: SectionBase & { groups: StrategyGroup[] };
  execution: SectionBase & { intro: string; items: string[] };
  results: SectionBase & { items: string[] };
  stats: SectionBase & { items: StatItem[] };
  charts: SectionBase & { columns: 1 | 2 | 3; items: ChartTile[] };
  faq: SectionBase & { items: FaqItem[] };
}

export type SectionKey = keyof PortfolioSections;

/** The full valid key set. Used for validation/normalization, not render order. */
export const ALL_SECTION_KEYS: SectionKey[] = [
  "overview",
  "liveWebsite",
  "challenges",
  "strategy",
  "execution",
  "results",
  "stats",
  "charts",
  "faq",
];

/** Fallback order for rows saved before section_order existed. */
export const DEFAULT_SECTION_ORDER: SectionKey[] = [...ALL_SECTION_KEYS];

export const SECTION_LABELS: Record<SectionKey, string> = {
  overview: "Project Overview",
  liveWebsite: "Live Website",
  challenges: "The Challenges",
  strategy: "How We Solved It",
  execution: "Creative Execution",
  results: "Results",
  stats: "Stats",
  charts: "Charts",
  faq: "FAQs",
};

export interface PortfolioProject {
  id: string;
  slug: string;
  client_name: string;
  title: string;
  description: string;
  category: string;
  project_date: string;
  hero_image: string;
  hero_image_alt: string;
  card_logo: string;
  card_logo_alt: string;
  card_bg: string;
  services: ServicePill[];
  sections: PortfolioSections;
  section_order: SectionKey[];
  cta_heading: string;
  cta_body: string;
  meta_title: string;
  meta_description: string;
  seo_keyphrase: string;
  noindex: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}

const EMPTY_SECTIONS: PortfolioSections = {
  overview: { enabled: false, body: "" },
  liveWebsite: { enabled: false, url: "", domain: "", linkLabel: "" },
  challenges: { enabled: false, items: [] },
  strategy: { enabled: false, groups: [] },
  execution: { enabled: false, intro: "", items: [] },
  results: { enabled: false, items: [] },
  stats: { enabled: false, items: [] },
  charts: { enabled: false, columns: 2, items: [] },
  faq: { enabled: false, items: [] },
};

/**
 * Fill in sections a stored row is missing, so a project saved before a section
 * existed can never crash the renderer.
 */
function normaliseSections(raw: unknown): PortfolioSections {
  if (!raw || typeof raw !== "object") return EMPTY_SECTIONS;
  const stored = raw as Partial<PortfolioSections>;
  return {
    overview: { ...EMPTY_SECTIONS.overview, ...(stored.overview ?? {}) },
    liveWebsite: { ...EMPTY_SECTIONS.liveWebsite, ...(stored.liveWebsite ?? {}) },
    challenges: { ...EMPTY_SECTIONS.challenges, ...(stored.challenges ?? {}) },
    strategy: { ...EMPTY_SECTIONS.strategy, ...(stored.strategy ?? {}) },
    execution: { ...EMPTY_SECTIONS.execution, ...(stored.execution ?? {}) },
    results: { ...EMPTY_SECTIONS.results, ...(stored.results ?? {}) },
    stats: { ...EMPTY_SECTIONS.stats, ...(stored.stats ?? {}) },
    charts: { ...EMPTY_SECTIONS.charts, ...(stored.charts ?? {}) },
    faq: { ...EMPTY_SECTIONS.faq, ...(stored.faq ?? {}) },
  };
}

/**
 * Repairs a stored section_order: drops unknown keys, then appends any
 * missing keys (e.g. "charts" on a row saved before it existed) at the end.
 */
export function normaliseSectionOrder(raw: unknown): SectionKey[] {
  const stored = Array.isArray(raw) ? (raw as SectionKey[]).filter((k) => ALL_SECTION_KEYS.includes(k)) : [];
  const missing = ALL_SECTION_KEYS.filter((k) => !stored.includes(k));
  return [...stored, ...missing];
}

function hydrate(row: PortfolioProject): PortfolioProject {
  return {
    ...row,
    services: Array.isArray(row.services) ? row.services : [],
    sections: normaliseSections(row.sections),
    section_order: normaliseSectionOrder(row.section_order),
  };
}

/** Published projects, newest first. Returns [] rather than throwing if Supabase is unreachable. */
export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("*")
      .eq("published", true)
      .order("project_date", { ascending: false });
    if (error) return [];
    return ((data ?? []) as PortfolioProject[]).map(hydrate);
  } catch {
    return [];
  }
}

export async function getPortfolioProject(slug: string): Promise<PortfolioProject | null> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (error || !data) return null;
    return hydrate(data as PortfolioProject);
  } catch {
    return null;
  }
}

export async function getPortfolioSlugs(): Promise<string[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("slug")
      .eq("published", true);
    if (error) return [];
    return (data ?? []).map((r: { slug: string }) => r.slug);
  } catch {
    return [];
  }
}

/**
 * Published CMS projects as portfolio items, for the service-page case-study
 * strips. Returns [] when Supabase is unreachable, so a service page never
 * fails to render over a missing case study.
 */
export async function getCmsCaseStudies(): Promise<PortfolioItem[]> {
  const projects = await getPortfolioProjects();
  return projects.map(toPortfolioItem);
}

/** Adapt a CMS project to the shape the existing portfolio components consume. */
export function toPortfolioItem(project: PortfolioProject): PortfolioItem {
  return {
    id: project.slug,
    title: project.title || project.client_name,
    clientName: project.client_name,
    description: project.description,
    thumbnail: project.card_logo || project.hero_image,
    heroImage: project.hero_image || project.card_logo,
    images: [],
    date: project.project_date,
    category: project.category,
    // Only meaningful when the thumbnail is a logo that needs a backdrop
    cardBgHex: project.card_logo ? project.card_bg || "#000000" : undefined,
  };
}
```

Note `normaliseSectionOrder` is exported here (not local), because
`blocks/portfolio/cms-content.tsx` (Task 6) imports it directly, matching how the `stats`
feature ended up (see that plan's Task 5 ledger note).

- [ ] **Step 3: Verify**

Run: `cd restorefine-website && ./node_modules/.bin/tsc --noEmit`
Expected: errors only in `blocks/portfolio/cms-content.tsx`. No errors anywhere else. This is
expected and fixed in Task 6.

- [ ] **Step 4: Commit**

```bash
git add restorefine-website/package.json restorefine-website/pnpm-lock.yaml restorefine-website/lib/portfolio-cms.ts
git commit -m "Mirror charts section into website portfolio data model"
```

---

### Task 5: Website chart renderer (`restorefine-website/blocks/portfolio/chart-tile.tsx`)

**Files:**
- Create: `restorefine-website/blocks/portfolio/chart-tile.tsx`

**Interfaces:**
- Consumes: `ChartTile`, `DEFAULT_CHART_PALETTE` from `@/lib/portfolio-cms` (Task 4);
  `useInView` from `framer-motion` (existing dependency).
- Produces: `ChartTileRender({ tile: ChartTile }): JSX.Element`, used by Task 6's
  `cms-content.tsx`.

- [ ] **Step 1: Create `restorefine-website/blocks/portfolio/chart-tile.tsx` with the following**

```tsx
"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DEFAULT_CHART_PALETTE, type ChartTile } from "@/lib/portfolio-cms";

/** Turns parallel categories/series arrays into the row-per-category shape Recharts wants. */
function toRows(categories: string[], series: ChartTile["series"]) {
  return categories.map((category, i) => {
    const row: Record<string, string | number> = { category };
    (series ?? []).forEach((s, si) => {
      row[s.name || `Series ${si + 1}`] = Number(s.values[i]) || 0;
    });
    return row;
  });
}

/**
 * Renders a ChartTile with Recharts, gated behind a one-time scroll-into-view
 * check so the mount animation plays when the visitor scrolls to it instead
 * of immediately on page load. Duplicates cms/components/ChartPreview.tsx's
 * rendering logic per this codebase's cross-app convention.
 */
export function ChartTileRender({ tile }: { tile: ChartTile }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return <div ref={ref}>{isInView && <ChartBody tile={tile} />}</div>;
}

function ChartBody({ tile }: { tile: ChartTile }) {
  const categories = tile.categories ?? [];
  const series = tile.series ?? [];
  const showLegend = tile.showLegend ?? true;

  if (tile.chartType === "pie") {
    const data = categories.map((name, i) => ({
      name,
      value: Number(series[0]?.values[i]) || 0,
    }));
    return (
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} label>
            {data.map((_, i) => (
              <Cell key={i} fill={DEFAULT_CHART_PALETTE[i % DEFAULT_CHART_PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip />
          {showLegend && <Legend />}
        </PieChart>
      </ResponsiveContainer>
    );
  }

  const rows = toRows(categories, series);
  const isHorizontalBar = tile.chartType === "bar" && tile.orientation === "horizontal";

  if (tile.chartType === "line") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={rows}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 11 }}
            label={tile.xAxisLabel ? { value: tile.xAxisLabel, position: "insideBottom", offset: -5 } : undefined}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            label={tile.yAxisLabel ? { value: tile.yAxisLabel, angle: -90, position: "insideLeft" } : undefined}
          />
          <Tooltip />
          {showLegend && <Legend />}
          {series.map((s, i) => (
            <Line
              key={i}
              type="monotone"
              dataKey={s.name || `Series ${i + 1}`}
              stroke={s.color || DEFAULT_CHART_PALETTE[i % DEFAULT_CHART_PALETTE.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (tile.chartType === "area") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={rows}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 11 }}
            label={tile.xAxisLabel ? { value: tile.xAxisLabel, position: "insideBottom", offset: -5 } : undefined}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            label={tile.yAxisLabel ? { value: tile.yAxisLabel, angle: -90, position: "insideLeft" } : undefined}
          />
          <Tooltip />
          {showLegend && <Legend />}
          {series.map((s, i) => {
            const color = s.color || DEFAULT_CHART_PALETTE[i % DEFAULT_CHART_PALETTE.length];
            return (
              <Area
                key={i}
                type="monotone"
                dataKey={s.name || `Series ${i + 1}`}
                stroke={color}
                fill={color}
                fillOpacity={0.25}
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  // bar (default)
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={rows} layout={isHorizontalBar ? "vertical" : "horizontal"}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
        {isHorizontalBar ? (
          <>
            <XAxis
              type="number"
              tick={{ fontSize: 11 }}
              label={tile.yAxisLabel ? { value: tile.yAxisLabel, position: "insideBottom", offset: -5 } : undefined}
            />
            <YAxis
              type="category"
              dataKey="category"
              width={100}
              tick={{ fontSize: 11 }}
              label={tile.xAxisLabel ? { value: tile.xAxisLabel, angle: -90, position: "insideLeft" } : undefined}
            />
          </>
        ) : (
          <>
            <XAxis
              dataKey="category"
              tick={{ fontSize: 11 }}
              label={tile.xAxisLabel ? { value: tile.xAxisLabel, position: "insideBottom", offset: -5 } : undefined}
            />
            <YAxis
              tick={{ fontSize: 11 }}
              label={tile.yAxisLabel ? { value: tile.yAxisLabel, angle: -90, position: "insideLeft" } : undefined}
            />
          </>
        )}
        <Tooltip />
        {showLegend && <Legend />}
        {series.map((s, i) => (
          <Bar
            key={i}
            dataKey={s.name || `Series ${i + 1}`}
            fill={s.color || DEFAULT_CHART_PALETTE[i % DEFAULT_CHART_PALETTE.length]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
```

- [ ] **Step 2: Verify**

Run: `cd restorefine-website && ./node_modules/.bin/tsc --noEmit`
Expected: the same single-file error set as Task 4 (`cms-content.tsx` only), and no error in
`chart-tile.tsx` itself. If any new error appears outside `cms-content.tsx`, that is a real
regression from this task and must be fixed before proceeding.

- [ ] **Step 3: Commit**

```bash
git add restorefine-website/blocks/portfolio/chart-tile.tsx
git commit -m "Add website chart renderer with scroll-triggered animation"
```

---

### Task 6: Wire the Charts section into the website render (`restorefine-website/blocks/portfolio/cms-content.tsx`)

**Files:**
- Modify: `restorefine-website/blocks/portfolio/cms-content.tsx` (full replacement below)

**Interfaces:**
- Consumes: `ChartTileRender` from Task 5; `normaliseSectionOrder`, `SECTION_LABELS` from Task 4.
- Produces: nothing consumed elsewhere (leaf render component for `/portfolio/[slug]`).

- [ ] **Step 1: Replace `restorefine-website/blocks/portfolio/cms-content.tsx` with the following**

```tsx
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PortfolioBrowserPreview } from "./portfolio-browser-preview";
import { ExpandingCta } from "./expanding-cta";
import { ChartTileRender } from "./chart-tile";
import { TableOfContents, type TocItem } from "@/blocks/blog/toc";
import { FaqAccordion } from "@/blocks/blog/faq-accordion";
import { jsonLd } from "@/lib/utils";
import {
  normaliseSectionOrder,
  SECTION_LABELS,
  type PortfolioProject,
  type SectionKey,
} from "@/lib/portfolio-cms";

/** Anchor ids, kept stable so a section keeps its link when others are toggled off. */
const SECTION_IDS: Record<SectionKey, string> = {
  overview: "overview",
  liveWebsite: "live-website",
  challenges: "challenges",
  strategy: "strategy",
  execution: "execution",
  results: "results",
  stats: "stats",
  charts: "charts",
  faq: "faqs",
};

const CHART_GRID_COLS: Record<1 | 2 | 3, string> = {
  1: "",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

function LightHeader({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-red-600 font-black text-xs tracking-widest uppercase">{num}</span>
      <div className="h-px flex-1 bg-zinc-100" />
      <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-medium">{label}</span>
    </div>
  );
}

export function CmsPortfolioContent({ project }: { project: PortfolioProject }) {
  const s = project.sections;

  /**
   * A section shows only when it's switched on *and* has something to show.
   * A toggled-on but empty section would otherwise render a bare header.
   */
  const isVisible = (key: SectionKey): boolean => {
    if (!s[key].enabled) return false;
    switch (key) {
      case "overview":
        return !!s.overview.body.trim();
      case "liveWebsite":
        return !!s.liveWebsite.url.trim();
      case "challenges":
        return s.challenges.items.some((c) => c.title.trim() || c.description.trim());
      case "strategy":
        return s.strategy.groups.some((g) => g.title.trim() || g.items.some((i) => i.trim()));
      case "execution":
        return !!s.execution.intro.trim() || s.execution.items.some((i) => i.trim());
      case "results":
        return s.results.items.some((r) => r.trim());
      case "stats":
        return s.stats.items.some((i) => i.value.trim() || i.label.trim());
      case "charts":
        return s.charts.items.some((t) =>
          t.kind === "text"
            ? !!t.heading?.trim() || (t.bullets ?? []).some((b) => b.lead.trim() || b.body.trim())
            : (t.categories ?? []).some((c) => c.trim()) &&
              (t.series ?? []).some((sr) => sr.name.trim() || sr.values.some((v) => v.trim()))
        );
      case "faq":
        return s.faq.items.some((f) => f.question.trim() && f.answer.trim());
    }
  };

  const order = normaliseSectionOrder(project.section_order);
  const visible = order.filter(isVisible);
  const labelFor = (key: SectionKey) => s[key].label?.trim() || SECTION_LABELS[key];
  const numberFor = (key: SectionKey) => String(visible.indexOf(key) + 1).padStart(2, "0");

  const tocItems: TocItem[] = visible.map((key) => ({
    id: SECTION_IDS[key],
    label: labelFor(key),
  }));

  const faqs = s.faq.items.filter((f) => f.question.trim() && f.answer.trim());

  const faqSchema = isVisible("faq")
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  const visibleChartTiles = s.charts.items.filter((t) =>
    t.kind === "text"
      ? !!t.heading?.trim() || (t.bullets ?? []).some((b) => b.lead.trim() || b.body.trim())
      : (t.categories ?? []).some((c) => c.trim()) &&
        (t.series ?? []).some((sr) => sr.name.trim() || sr.values.some((v) => v.trim()))
  );

  const sectionBlocks: Record<SectionKey, React.ReactNode> = {
    overview: isVisible("overview") && (
      <div id={SECTION_IDS.overview} key="overview">
        <LightHeader num={numberFor("overview")} label={labelFor("overview")} />
        <p className="text-zinc-600 text-base leading-relaxed max-w-3xl whitespace-pre-line">
          {s.overview.body}
        </p>
      </div>
    ),

    liveWebsite: isVisible("liveWebsite") && (
      <div id={SECTION_IDS.liveWebsite} key="liveWebsite">
        <LightHeader num={numberFor("liveWebsite")} label={labelFor("liveWebsite")} />
        <PortfolioBrowserPreview
          url={s.liveWebsite.url}
          domain={s.liveWebsite.domain || s.liveWebsite.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
          label={s.liveWebsite.linkLabel || project.client_name}
        />
      </div>
    ),

    challenges: isVisible("challenges") && (
      <div id={SECTION_IDS.challenges} key="challenges" className="bg-zinc-950 rounded-3xl px-8 py-12">
        <div className="flex items-center gap-3 mb-10">
          <span className="text-red-500 font-black text-xs tracking-widest uppercase">
            {numberFor("challenges")}
          </span>
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-medium">
            {labelFor("challenges")}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {s.challenges.items
            .filter((c) => c.title.trim() || c.description.trim())
            .map((c, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors"
              >
                <span className="text-5xl font-black text-zinc-800 leading-none tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-bold text-white leading-snug">{c.title}</p>
                <p className="text-xs text-zinc-400 leading-relaxed">{c.description}</p>
              </div>
            ))}
        </div>
      </div>
    ),

    strategy: isVisible("strategy") && (
      <div id={SECTION_IDS.strategy} key="strategy">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-zinc-100" />
          <span className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 font-medium px-3">
            {labelFor("strategy")}
          </span>
          <div className="h-px flex-1 bg-zinc-100" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {s.strategy.groups
            .filter((g) => g.title.trim() || g.items.some((i) => i.trim()))
            .map((group, i) => (
              <div
                key={i}
                className="border border-zinc-200 rounded-2xl p-6 hover:border-red-200 hover:bg-red-50/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-[9px] font-black text-white shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm font-black uppercase text-zinc-900">{group.title}</p>
                </div>
                <ul className="space-y-2">
                  {group.items
                    .filter((item) => item.trim())
                    .map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-zinc-500 leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-600 shrink-0" />
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    ),

    execution: isVisible("execution") && (
      <div id={SECTION_IDS.execution} key="execution">
        <LightHeader num={numberFor("execution")} label={labelFor("execution")} />
        {s.execution.intro.trim() && (
          <p className="text-zinc-500 text-sm leading-relaxed max-w-2xl mb-6">{s.execution.intro}</p>
        )}
        <div className="flex flex-wrap gap-3">
          {s.execution.items
            .filter((item) => item.trim())
            .map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 text-xs font-medium text-zinc-700"
              >
                <span className="w-1 h-1 rounded-full bg-red-600" />
                {item}
              </span>
            ))}
        </div>
      </div>
    ),

    results: isVisible("results") && (
      <div id={SECTION_IDS.results} key="results">
        <LightHeader num={numberFor("results")} label={labelFor("results")} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {s.results.items
            .filter((r) => r.trim())
            .map((r, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-zinc-50 border border-zinc-100 rounded-2xl p-5"
              >
                <span className="mt-1 w-5 h-5 rounded-full bg-red-100 border border-red-200 flex items-center justify-center shrink-0 text-[9px] font-black text-red-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-zinc-700 leading-relaxed">{r}</p>
              </div>
            ))}
        </div>
      </div>
    ),

    stats: isVisible("stats") && (
      <div id={SECTION_IDS.stats} key="stats">
        <LightHeader num={numberFor("stats")} label={labelFor("stats")} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {s.stats.items
            .filter((i) => i.value.trim() || i.label.trim())
            .map((item, i) => {
              const growth = (item.growth ?? "").trim();
              const isNegative = growth.startsWith("-");
              return (
                <div
                  key={i}
                  className="flex flex-col items-center text-center gap-2 bg-zinc-50 border border-zinc-100 rounded-2xl p-6"
                >
                  <span className="text-3xl md:text-4xl font-black text-zinc-900 tabular-nums">{item.value}</span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">{item.label}</span>
                  {growth && (
                    <span className={`text-xs font-semibold ${isNegative ? "text-red-500" : "text-emerald-600"}`}>
                      {growth}
                    </span>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    ),

    charts: isVisible("charts") && (
      <div id={SECTION_IDS.charts} key="charts">
        <LightHeader num={numberFor("charts")} label={labelFor("charts")} />
        <div className={`grid grid-cols-1 gap-6 ${CHART_GRID_COLS[s.charts.columns] ?? CHART_GRID_COLS[2]}`}>
          {visibleChartTiles.map((tile, i) =>
            tile.kind === "text" ? (
              <div key={i} className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6">
                {tile.heading && (
                  <p className="text-sm font-black uppercase text-zinc-900 mb-4">{tile.heading}</p>
                )}
                <ul className="space-y-3">
                  {(tile.bullets ?? [])
                    .filter((b) => b.lead.trim() || b.body.trim())
                    .map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-zinc-600 leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-600 shrink-0" />
                        <span>
                          <span className="font-bold text-zinc-900">{b.lead}:</span> {b.body}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            ) : (
              <div key={i} className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6">
                {tile.title && <p className="text-sm font-bold text-zinc-900 mb-2">{tile.title}</p>}
                <ChartTileRender tile={tile} />
              </div>
            )
          )}
        </div>
      </div>
    ),

    faq: isVisible("faq") && (
      <div id={SECTION_IDS.faq} key="faq">
        <LightHeader num={numberFor("faq")} label={labelFor("faq")} />
        <FaqAccordion faqs={faqs} />
      </div>
    ),
  };

  return (
    <>
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-zinc-100">

        {/* Services */}
        {project.services.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            {project.services.map((service, i) => {
              const Icon = service.icon
                ? (LucideIcons[service.icon as keyof typeof LucideIcons] as LucideIcon | undefined)
                : undefined;
              return (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-700"
                >
                  {Icon && <Icon size={14} />}
                  {service.label}
                </span>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[260px_1fr] gap-x-14 xl:gap-x-16">
          <TableOfContents title="Case Study" items={tocItems} />
          <div className="space-y-16">
            {order.map((key) => sectionBlocks[key])}
          </div>
        </div>
      </div>

      <ExpandingCta
        heading={project.cta_heading || "Ready to Elevate Your Brand?"}
        body={project.cta_body || "Get in touch and let's build something exceptional together."}
      />
    </>
  );
}
```

- [ ] **Step 2: Verify**

Run: `cd restorefine-website && ./node_modules/.bin/tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add restorefine-website/blocks/portfolio/cms-content.tsx
git commit -m "Render Charts section grid on portfolio pages"
```

---

### Task 7: End-to-end verification

**Files:** none (manual verification only, per this repo's convention of no automated test
suite).

**Interfaces:**
- Consumes: everything from Tasks 1-6.
- Produces: nothing (this task validates the feature works end to end).

- [ ] **Step 1: Confirm both packages type-check cleanly**

Run: `cd cms && ./node_modules/.bin/tsc --noEmit` — expect no errors.
Run: `cd restorefine-website && ./node_modules/.bin/tsc --noEmit` — expect no errors.

- [ ] **Step 2: Confirm an existing published project is unaffected**

In `cms/`, `pnpm dev`. Open an already-published project. Confirm Charts shows disabled and
every other section's content is unchanged from before this work. In `restorefine-website/`,
`pnpm dev`, load that project's live page and confirm it renders identically to before (no
Charts block, same section order and numbering).

- [ ] **Step 3: Build a grid matching the reference screenshot**

In the CMS, on a draft or test project, enable Charts, set columns to 2, and add:
- A vertical grouped bar chart (categories: Instagram, TikTok, Total; two series: Impressions,
  Interactions) with axis labels and legend on.
- A horizontal bar chart (5 categories, one series) titled "Top 5 Performing Content
  Initiatives".
- A vertical bar chart for age distribution (5-6 categories, one series).
- A text card titled "Audience Demographics & Geography" with 2 bullets, each with a bold lead
  and body.

Confirm the live preview updates for each as data is entered. Save as draft, confirm it does
not appear on the live site, then publish.

- [ ] **Step 4: Verify the website render**

Load the published project's page. Confirm the 4 tiles render in a 2-column grid (1 column on
mobile), the bar charts show the correct orientation, colors match what was set in the CMS, the
legend and axis labels appear, and each chart animates in as you scroll to it (reload the page
and scroll down slowly rather than jumping directly to the anchor, to see the animation trigger).

- [ ] **Step 5: Verify a pie chart and grid column changes**

Add a 5th tile, a Pie chart with 3-4 slices. Confirm the CMS preview shows a pie with distinct
auto-assigned colors per slice, and that the series-add controls are hidden for it. Change the
section's grid columns to 3, confirm the CMS and website layouts both reflow to 3 columns
(1 column still on mobile).

- [ ] **Step 6: Verify graceful handling of bad input**

In one chart's data table, enter a non-numeric value (e.g. "abc") in a cell. Save, reload the
website page, confirm that bar/point renders as 0 rather than crashing the page.

- [ ] **Step 7: Verify section toggling and reordering still work**

Toggle Charts off, confirm numbering/TOC collapse with no gap. Use the up/down arrows to move
Charts to a different position among the other 8 sections, save, confirm the website reflects
the new position with contiguous numbering.

- [ ] **Step 8: Clean up**

If a throwaway test project was created in Step 3, delete it via the CMS's "Delete Project"
button.
