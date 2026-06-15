import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function fetchAllPosts(): Promise<BlogPost[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, slug, title, date, published, created_at, thumbnail, thumbnail_alt, excerpt")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as BlogPost[];
}

export async function fetchPost(slug: string): Promise<BlogPost> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) throw new Error(error.message);
  return data as BlogPost;
}

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

export interface BlogPost {
  id?: string;
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
  meta_title?: string;
  meta_description?: string;
  noindex?: boolean;
  seo_keyphrase?: string;
  cta_heading?: string;
  cta_body?: string;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}
