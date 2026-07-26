"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchProject, type PortfolioProject } from "@/lib/portfolio";
import PortfolioForm from "@/components/PortfolioForm";

export default function EditProjectPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: project, isLoading, isError } = useQuery<PortfolioProject>({
    queryKey: ["project", slug],
    queryFn: () => fetchProject(slug),
  });

  if (isLoading) return <p className="text-zinc-500 text-sm">Loading...</p>;
  if (isError || !project) return <p className="text-zinc-500 text-sm">Project not found.</p>;

  return (
    <div>
      <h2 className="text-xl font-black uppercase tracking-tight mb-6">Edit Project</h2>
      <PortfolioForm mode="edit" initialData={project} />
    </div>
  );
}
