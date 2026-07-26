"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchAllProjects, type PortfolioListItem } from "@/lib/portfolio";

export default function PortfolioListPage() {
  const { data: projects = [], isLoading, isError, error } = useQuery<PortfolioListItem[]>({
    queryKey: ["projects"],
    queryFn: fetchAllProjects,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="w-full aspect-[16/10] bg-gray-100 rounded-2xl mb-4" />
            <div className="h-5 bg-gray-100 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-100 rounded w-24" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="border border-dashed border-red-200 bg-red-50 rounded-2xl p-10 text-center">
        <p className="text-red-600 text-sm font-semibold mb-1">Could not load portfolio projects.</p>
        <p className="text-red-400 text-xs mb-3">{(error as Error)?.message}</p>
        <p className="text-gray-500 text-xs">
          If this is the first run, apply <code className="font-mono">supabase/migrations/portfolio_projects.sql</code> in
          the Supabase SQL editor.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black uppercase tracking-tight text-gray-900">
          All Projects ({projects.length})
        </h2>
        <Link
          href="/dashboard/portfolio/new"
          className="bg-gray-900 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          + New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-2xl p-16 text-center">
          <p className="text-gray-400 text-sm mb-4">No portfolio projects yet.</p>
          <Link
            href="/dashboard/portfolio/new"
            className="text-xs font-bold uppercase tracking-widest text-white bg-gray-900 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Create your first project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/portfolio/${project.slug}`}
              className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-200"
            >
              {/* Preview: hero if uploaded, otherwise the grid card logo */}
              <div
                className="relative w-full aspect-[16/9] bg-gray-100 overflow-hidden flex items-center justify-center"
                style={!project.hero_image && project.card_logo ? { background: project.card_bg } : undefined}
              >
                {project.hero_image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.hero_image}
                    alt={project.client_name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : project.card_logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.card_logo}
                    alt={project.card_logo_alt || project.client_name}
                    className="max-h-[45%] max-w-[55%] object-contain"
                  />
                ) : (
                  <span className="text-gray-300 text-xs uppercase tracking-widest font-semibold">No image</span>
                )}
                <span
                  className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                    project.published ? "bg-emerald-100 text-emerald-700" : "bg-white/90 text-gray-500"
                  }`}
                >
                  {project.published ? "Published" : "Draft"}
                </span>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                    {project.category}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {project.project_date
                      ? new Date(project.project_date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })
                      : ""}
                  </span>
                </div>

                <h3 className="text-sm font-black uppercase tracking-tight text-gray-900 leading-snug mb-1 group-hover:text-gray-600 transition-colors line-clamp-1">
                  {project.client_name || project.slug}
                </h3>
                <p className="text-[12px] text-gray-400 leading-relaxed line-clamp-2 mb-3">
                  {project.title || project.description}
                </p>

                <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-gray-900 transition-colors">
                  Edit Project
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
