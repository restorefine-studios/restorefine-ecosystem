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
  /** "month" means categories are month names, paired with `year`. Ignored for pie. */
  categoryMode?: "month" | "custom";
  /** The single year this chart's data covers. Only used when categoryMode is "month". */
  year?: string;
  showLegend?: boolean;
  /** X-axis labels (month names when categoryMode is "month"), or pie slice names. */
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
  tiktok: "On TikTok",
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
  sections: ProjectSections;
  section_order: OrderKey[];
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

const EMPTY_SECTIONS: ProjectSections = {
  overview: { enabled: false, body: "" },
  liveWebsite: { enabled: false, url: "", domain: "", linkLabel: "" },
  challenges: { enabled: false, items: [] },
  strategy: { enabled: false, groups: [] },
  execution: { enabled: false, intro: "", items: [] },
  results: { enabled: false, items: [] },
  stats: { enabled: false, items: [] },
  charts: { enabled: false, items: [] },
  tiktok: { enabled: false, intro: "", videos: [], ctaLabel: "", ctaHref: "" },
  faq: { enabled: false, items: [] },
  imageBlocks: [],
};

/**
 * Fill in sections a stored row is missing, so a project saved before a section
 * existed can never crash the renderer.
 */
function normaliseSections(raw: unknown): ProjectSections {
  if (!raw || typeof raw !== "object") return EMPTY_SECTIONS;
  const stored = raw as Partial<ProjectSections>;
  return {
    overview: { ...EMPTY_SECTIONS.overview, ...(stored.overview ?? {}) },
    liveWebsite: { ...EMPTY_SECTIONS.liveWebsite, ...(stored.liveWebsite ?? {}) },
    challenges: { ...EMPTY_SECTIONS.challenges, ...(stored.challenges ?? {}) },
    strategy: { ...EMPTY_SECTIONS.strategy, ...(stored.strategy ?? {}) },
    execution: { ...EMPTY_SECTIONS.execution, ...(stored.execution ?? {}) },
    results: { ...EMPTY_SECTIONS.results, ...(stored.results ?? {}) },
    stats: { ...EMPTY_SECTIONS.stats, ...(stored.stats ?? {}) },
    charts: { ...EMPTY_SECTIONS.charts, ...(stored.charts ?? {}) },
    tiktok: { ...EMPTY_SECTIONS.tiktok, ...(stored.tiktok ?? {}) },
    faq: { ...EMPTY_SECTIONS.faq, ...(stored.faq ?? {}) },
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

export function hydrate(row: PortfolioProject): PortfolioProject {
  return {
    ...row,
    services: Array.isArray(row.services) ? row.services : [],
    sections: normaliseSections(row.sections),
    section_order: normaliseSectionOrder(row.section_order, normaliseSections(row.sections).imageBlocks),
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
