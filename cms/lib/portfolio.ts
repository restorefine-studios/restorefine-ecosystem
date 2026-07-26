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
  faq: SectionBase & { items: FaqItem[] };
}

export type SectionKey = keyof PortfolioSections;

/** Fixed render order. Numbering and the table of contents derive from this. */
export const SECTION_ORDER: SectionKey[] = [
  "overview",
  "liveWebsite",
  "challenges",
  "strategy",
  "execution",
  "results",
  "faq",
];

/** Default heading shown for each section when the editor hasn't overridden it. */
export const SECTION_LABELS: Record<SectionKey, string> = {
  overview: "Project Overview",
  liveWebsite: "Live Website",
  challenges: "The Challenges",
  strategy: "How We Solved It",
  execution: "Creative Execution",
  results: "Results",
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
    faq: { ...base.faq, ...(stored.faq ?? {}) },
  };
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
