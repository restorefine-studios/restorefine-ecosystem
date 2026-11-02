import { blogPosts } from "@/lib/blogContent";
import { getSupaPosts } from "@/lib/supabase";
import type { ResourcePost } from "@/blocks/resources-v2";
import { V2Shell } from "@/blocks/home-v2";
import { ResourcesV2 } from "@/blocks/resources-v2";

export const revalidate = 0;

export default async function BlogPage() {
  const supaPosts = await getSupaPosts();

  const supaItems: ResourcePost[] = supaPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    thumbnail: p.thumbnail,
    thumbnailAlt: p.thumbnail_alt,
    author: p.author,
    authorImage: p.author_image,
    date: p.date,
    excerpt: p.excerpt,
    postType: p.post_type,
  }));

  const supaSlugSet = new Set(supaPosts.map((p) => p.slug));

  const hardcodedItems: ResourcePost[] = blogPosts
    .filter((p) => !supaSlugSet.has(p.slug))
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      thumbnail: p.thumbnail,
      thumbnailAlt: p.thumbnailAlt,
      author: p.author,
      authorImage: p.authorImage,
      date: p.date,
      excerpt: p.excerpt,
    }));

  const allPosts = [...supaItems, ...hardcodedItems];

  return (
    <V2Shell>
      <ResourcesV2 posts={allPosts} />
    </V2Shell>
  );
}
