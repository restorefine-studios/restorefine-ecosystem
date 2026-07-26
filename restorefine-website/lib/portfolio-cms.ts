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
    faq: { ...EMPTY_SECTIONS.faq, ...(stored.faq ?? {}) },
  };
}

function hydrate(row: PortfolioProject): PortfolioProject {
  return {
    ...row,
    services: Array.isArray(row.services) ? row.services : [],
    sections: normaliseSections(row.sections),
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
