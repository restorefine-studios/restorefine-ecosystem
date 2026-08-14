"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase-browser";
import { StructuredBlogPost } from "@/blocks/blog/structured-post";
import { CaseStudyPost } from "@/blocks/blog/case-study-post";
import { SupabasePost } from "@/blocks/blog/supabase-post";
import type { SupaBlogPost } from "@/lib/supabase";

type Status = "checking" | "loading" | "ready" | "not-found";

export default function BlogPreviewPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [status, setStatus] = useState<Status>("checking");
  const [post, setPost] = useState<SupaBlogPost | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const supabase = getBrowserSupabase();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.replace(`/preview/login?next=/preview/blog/${slug}`);
        return;
      }
      if (cancelled) return;

      setStatus("loading");
      const { data } = await supabase.from("blog_posts").select("*").eq("slug", slug).maybeSingle();
      if (cancelled) return;

      if (!data) {
        setStatus("not-found");
        return;
      }
      setPost(data as SupaBlogPost);
      setStatus("ready");
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [slug, router]);

  if (status === "checking" || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-400 text-sm">Loading preview…</div>
    );
  }

  if (status === "not-found" || !post) {
    return <div className="min-h-screen flex items-center justify-center text-zinc-400 text-sm">Post not found.</div>;
  }

  if (post.structured_data && post.post_type === "blog") {
    return <StructuredBlogPost post={post.structured_data} />;
  }
  if (post.structured_data && post.post_type === "case-study") {
    return <CaseStudyPost caseStudy={post.structured_data} />;
  }
  return <SupabasePost post={post} />;
}
