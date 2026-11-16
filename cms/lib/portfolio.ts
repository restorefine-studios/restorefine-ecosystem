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
  /**
   * "month" switches the category editor to a year + month picker (for
   * time-series data); "custom"/undefined keeps free-text categories
   * (e.g. platform names). Ignored for pie, which is always custom.
   */
  categoryMode?: "month" | "custom";
  /** The single year this chart's data covers. Only used when categoryMode is "month". */
  year?: string;
  showLegend?: boolean;
  /** X-axis labels (month names when categoryMode is "month"), or pie slice names. */
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
  charts: SectionBase & { items: ChartTile[] };
  tiktok: SectionBase & { intro: string; videos: TikTokItem[]; ctaLabel: string; ctaHref: string };
  faq: SectionBase & { items: FaqItem[] };
}

export type SectionKey = keyof PortfolioSections;

/** One picture inside an image block. */
export interface ImageItem {
  src: string;
  alt: string;
  caption?: string;
}

/**
 * A free-standing block of images. A project can hold any number of these, and
 * each is placed anywhere between the sections through `section_order`, where
 * it appears as `image:<id>`.
 */
export interface ImageBlock {
  id: string;
  /** Optional title. A block with a title also gets a table-of-contents entry. */
  heading?: string;
  /** How many images sit side by side on a wide screen. */
  layout: "full" | "two" | "three";
  items: ImageItem[];
}

/** One TikTok in the TikTok section. The view count is read from TikTok by the website. */
export interface TikTokItem {
  /** The full video link: https://www.tiktok.com/@handle/video/123... */
  url: string;
  /** Name shown under the video. Falls back to the @handle. */
  client: string;
}

export type ImageOrderKey = `image:${string}`;
/** An entry in section_order: a fixed section, or one image block. */
export type OrderKey = SectionKey | ImageOrderKey;
export const imageKey = (id: string): ImageOrderKey => `image:${id}`;
export const isImageKey = (key: string): key is ImageOrderKey => key.startsWith("image:");

/** What is stored in the `sections` column: the fixed sections plus the image blocks. */
export type ProjectSections = PortfolioSections & { imageBlocks: ImageBlock[] };

/** Splits a TikTok video link into its handle and video id, or null if it isn't one. */
export function parseTikTokUrl(url: string): { handle: string; id: string } | null {
  const m = /tiktok\.com\/@([^/?#]+)\/video\/(\d+)/i.exec(url.trim());
  return m ? { handle: m[1], id: m[2] } : null;
}

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
  "tiktok",
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
  tiktok: "On TikTok",
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
  sections: ProjectSections;
  section_order: OrderKey[];
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

export function emptySections(): ProjectSections {
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
      items: [
        {
          kind: "chart",
          chartType: "bar",
          orientation: "vertical",
          title: "",
          xAxisLabel: "",
          yAxisLabel: "",
          categoryMode: "custom",
          showLegend: true,
          categories: [""],
          series: [{ name: "", color: DEFAULT_CHART_PALETTE[0], values: [""] }],
        },
      ],
    },
    tiktok: { enabled: false, intro: "", videos: [{ url: "", client: "" }], ctaLabel: "", ctaHref: "" },
    faq: { enabled: false, items: [{ question: "", answer: "" }] },
    imageBlocks: [],
  };
}

/**
 * Fill in any section missing from a stored row. Rows saved before a section
 * existed would otherwise render as undefined in the form.
 */
export function normaliseSections(raw: unknown): ProjectSections {
  const base = emptySections();
  if (!raw || typeof raw !== "object") return base;
  const stored = raw as Partial<ProjectSections>;
  return {
    overview: { ...base.overview, ...(stored.overview ?? {}) },
    liveWebsite: { ...base.liveWebsite, ...(stored.liveWebsite ?? {}) },
    challenges: { ...base.challenges, ...(stored.challenges ?? {}) },
    strategy: { ...base.strategy, ...(stored.strategy ?? {}) },
    execution: { ...base.execution, ...(stored.execution ?? {}) },
    results: { ...base.results, ...(stored.results ?? {}) },
    stats: { ...base.stats, ...(stored.stats ?? {}) },
    charts: { ...base.charts, ...(stored.charts ?? {}) },
    tiktok: { ...base.tiktok, ...(stored.tiktok ?? {}) },
    faq: { ...base.faq, ...(stored.faq ?? {}) },
    imageBlocks: Array.isArray(stored.imageBlocks) ? stored.imageBlocks : [],
  };
}

/**
 * Repairs a stored section_order: drops unknown keys and image blocks that no
 * longer exist, then appends anything missing (a section added after the row
 * was saved, or an image block without a position) at the end.
 */
export function normaliseSectionOrder(raw: unknown, imageBlocks: ImageBlock[] = []): OrderKey[] {
  const imageKeys = imageBlocks.map((b) => imageKey(b.id));
  const valid = new Set<string>([...ALL_SECTION_KEYS, ...imageKeys]);
  const stored: OrderKey[] = [];
  for (const k of Array.isArray(raw) ? (raw as OrderKey[]) : []) {
    if (valid.has(k) && !stored.includes(k)) stored.push(k);
  }
  const missing = ([...ALL_SECTION_KEYS, ...imageKeys] as OrderKey[]).filter((k) => !stored.includes(k));
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
    section_order: normaliseSectionOrder(row.section_order, normaliseSections(row.sections).imageBlocks),
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
