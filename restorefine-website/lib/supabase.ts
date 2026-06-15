import { createClient } from "@supabase/supabase-js";

export interface FeatureItem {
  icon?: string;
  title?: string;
  description?: string;
}

export type ContentBlock =
  | { type: "paragraph"; content: string }
  | { type: "heading"; content: string }
  | { type: "image"; src: string; alt?: string; caption?: string }
  | { type: "features"; heading?: string; description?: string; footerDescription?: string; items: FeatureItem[] }
  | { type: "section"; heading: string; content: string };

export interface SupaBlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  thumbnail: string;
  thumbnail_alt?: string;
  author: string;
  author_image: string;
  date: string;
  excerpt: string;
  content: ContentBlock[];
  cta_heading?: string;
  cta_body?: string;
  post_type: "blog" | "case-study" | "simple";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  structured_data?: any;
  meta_title?: string;
  meta_description?: string;
  noindex?: boolean;
  published: boolean;
  created_at: string;
}

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}

export async function getSupaPosts(): Promise<SupaBlogPost[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("blog_posts").select("*").eq("published", true).order("date", { ascending: false });

  if (error || !data) return [];
  return data as SupaBlogPost[];
}

export async function getSupaPost(slug: string): Promise<SupaBlogPost | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("published", true).single();

  if (error || !data) return null;
  return data as SupaBlogPost;
}

export async function getAllSupaSlugs(): Promise<string[]> {
  const supabase = getSupabase();
  const { data } = await supabase.from("blog_posts").select("slug").eq("published", true);
  return (data ?? []).map((r: { slug: string }) => r.slug);
}
