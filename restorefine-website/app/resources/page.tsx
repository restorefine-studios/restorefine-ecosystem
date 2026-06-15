import { blogPosts } from "@/lib/blogContent";
import { getSupaPosts } from "@/lib/supabase";
import BlogPageClient, { type BlogPostItem } from "./BlogPageClient";

export const revalidate = 0;

export default async function BlogPage() {
  const supaPosts = await getSupaPosts();

  const supaItems: BlogPostItem[] = supaPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    thumbnail: p.thumbnail,
    thumbnailAlt: p.thumbnail_alt,
    author: p.author,
    authorImage: p.author_image,
    date: p.date,
  }));

  const supaSlugSet = new Set(supaPosts.map((p) => p.slug));

  const hardcodedItems: BlogPostItem[] = blogPosts
    .filter((p) => !supaSlugSet.has(p.slug))
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      thumbnail: p.thumbnail,
      thumbnailAlt: p.thumbnailAlt,
      author: p.author,
      authorImage: p.authorImage,
      date: p.date,
    }));

  const allPosts = [...supaItems, ...hardcodedItems];

  return <BlogPageClient posts={allPosts} />;
}
