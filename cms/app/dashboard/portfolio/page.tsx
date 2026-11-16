"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAllProjects, type PortfolioListItem } from "@/lib/portfolio";
import { ContentList, ContentListError, ContentListSkeleton } from "@/components/ContentList";

export default function PortfolioListPage() {
  const { data: projects = [], isLoading, isError, error } = useQuery<PortfolioListItem[]>({
    queryKey: ["projects"],
    queryFn: fetchAllProjects,
    retry: false,
  });

  if (isLoading) return <ContentListSkeleton />;
  if (isError) {
    return (
      <ContentListError
        title="Could not load portfolio projects."
        detail={(error as Error)?.message}
        hint={
          <>
            If this is the first run, apply <code className="font-mono">supabase/migrations/portfolio_projects.sql</code> in the
            Supabase SQL editor.
          </>
        }
      />
    );
  }

  return (
    <ContentList
      title="Projects"
      noun="project"
      newHref="/dashboard/portfolio/new"
      items={projects.map((project) => ({
        id: project.id ?? project.slug,
        href: `/dashboard/portfolio/${project.slug}`,
        title: project.client_name || project.slug,
        summary: project.title || project.description,
        // The hero if there is one, otherwise the grid card's logo on its colour
        image: project.hero_image || project.card_logo,
        imageAlt: project.hero_image ? project.client_name : project.card_logo_alt || project.client_name,
        imageContain: !project.hero_image && !!project.card_logo,
        imageBg: project.card_bg,
        published: project.published,
        meta: [
          project.category,
          project.project_date
            ? new Date(project.project_date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })
            : "",
        ],
      }))}
    />
  );
}
