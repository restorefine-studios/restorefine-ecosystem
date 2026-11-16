"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAllPosts, type BlogPost } from "@/lib/supabase";
import { ContentList, ContentListError, ContentListSkeleton } from "@/components/ContentList";

const formatDate = (date?: string) =>
  date ? new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "";

export default function DashboardPage() {
  const { data: posts = [], isLoading, isError } = useQuery<BlogPost[]>({
    queryKey: ["posts"],
    queryFn: fetchAllPosts,
  });

  if (isLoading) return <ContentListSkeleton />;
  if (isError) return <ContentListError title="Could not load posts." detail="Check your Supabase connection, then reload." />;

  return (
    <ContentList
      title="Posts"
      noun="post"
      newHref="/dashboard/blogs/new"
      items={posts.map((post) => ({
        id: post.id ?? post.slug,
        href: `/dashboard/blogs/${post.slug}`,
        title: post.title || post.slug,
        summary: post.excerpt,
        image: post.thumbnail,
        imageAlt: post.thumbnail_alt ?? post.title,
        published: post.published,
        meta: [formatDate(post.date)],
      }))}
    />
  );
}
