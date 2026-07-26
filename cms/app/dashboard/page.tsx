"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, FileText, Briefcase } from "lucide-react";
import { countPosts, countProjects } from "@/lib/portfolio";

export default function DashboardHomePage() {
  const posts = useQuery({ queryKey: ["posts", "count"], queryFn: countPosts, retry: false });
  const projects = useQuery({ queryKey: ["projects", "count"], queryFn: countProjects, retry: false });

  return (
    <div className="max-w-4xl mx-auto pt-10 pb-20">
      <p className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-400 mb-2">
        Restorefine CMS
      </p>
      <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-10">
        What are you working on?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <SectionCard
          href="/dashboard/blogs"
          icon={<FileText className="w-5 h-5" />}
          title="Blogs"
          blurb="Articles, guides and case-study posts for /resources."
          count={posts.data}
          loading={posts.isLoading}
          error={posts.isError}
          unit="post"
        />
        <SectionCard
          href="/dashboard/portfolio"
          icon={<Briefcase className="w-5 h-5" />}
          title="Portfolio"
          blurb="Client case studies for /portfolio, built on the It's Padel layout."
          count={projects.data}
          loading={projects.isLoading}
          error={projects.isError}
          unit="project"
          errorHint="Run the portfolio_projects migration in Supabase."
        />
      </div>
    </div>
  );
}

interface SectionCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  blurb: string;
  count?: number;
  loading: boolean;
  error: boolean;
  unit: string;
  errorHint?: string;
}

function SectionCard({ href, icon, title, blurb, count, loading, error, unit, errorHint }: SectionCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-white border border-gray-200 rounded-2xl p-7 hover:border-gray-400 hover:shadow-md transition-all duration-200"
    >
      <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-lg font-black uppercase tracking-tight text-gray-900 mb-1.5">{title}</h3>
      <p className="text-[13px] text-gray-400 leading-relaxed mb-6 min-h-[38px]">{blurb}</p>

      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-gray-500">
          {loading
            ? "Loading…"
            : error
              ? (errorHint ?? "Unavailable")
              : `${count ?? 0} ${unit}${count === 1 ? "" : "s"}`}
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-gray-900 transition-colors">
          Open
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
