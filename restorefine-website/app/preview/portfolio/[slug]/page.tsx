"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase-browser";
import { PortfolioStoryClient } from "@/app/portfolio/[slug]/PortfolioStoryClient";
import { hydrate, toPortfolioItem, type PortfolioProject } from "@/lib/portfolio-cms";

type Status = "checking" | "loading" | "ready" | "not-found";

export default function PortfolioPreviewPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [status, setStatus] = useState<Status>("checking");
  const [project, setProject] = useState<PortfolioProject | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const supabase = getBrowserSupabase();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.replace(`/preview/login?next=/preview/portfolio/${slug}`);
        return;
      }
      if (cancelled) return;

      setStatus("loading");
      const { data } = await supabase.from("portfolio_projects").select("*").eq("slug", slug).maybeSingle();
      if (cancelled) return;

      if (!data) {
        setStatus("not-found");
        return;
      }
      setProject(hydrate(data as PortfolioProject));
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

  if (status === "not-found" || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-400 text-sm">Project not found.</div>
    );
  }

  const item = toPortfolioItem(project);

  return (
    <PortfolioStoryClient
      project={item}
      prevProject={null}
      nextProject={null}
      heroBg={item.heroImage ?? item.thumbnail}
      cmsProject={project}
    />
  );
}
