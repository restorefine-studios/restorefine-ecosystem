"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchPost, type BlogPost } from "@/lib/supabase";
import PostForm from "@/components/PostForm";

export default function EditPostPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, isError } = useQuery<BlogPost>({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isLoading) return <p className="text-zinc-500 text-sm">Loading...</p>;
  if (isError || !post) return <p className="text-zinc-500 text-sm">Post not found.</p>;

  return (
    <div>
      <h2 className="text-xl font-black uppercase tracking-tight mb-6">Edit Post</h2>
      <PostForm mode="edit" initialData={post} />
    </div>
  );
}
