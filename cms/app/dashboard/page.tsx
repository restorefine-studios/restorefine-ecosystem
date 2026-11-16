"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, FileText, Briefcase, Plus } from "lucide-react";
import { countPosts, countProjects } from "@/lib/portfolio";

export default function DashboardHomePage() {
  const posts = useQuery({ queryKey: ["posts", "count"], queryFn: countPosts, retry: false });
  const projects = useQuery({ queryKey: ["projects", "count"], queryFn: countProjects, retry: false });

  return (
    <div className="mx-auto max-w-4xl pb-20 pt-8 sm:pt-14">
      <h1 className="text-4xl leading-[1.05] text-zinc-950 sm:text-5xl">
        What are you{" "}
        <span className="mx-[0.12em] font-[family-name:var(--font-script)] text-[1.15em] font-normal leading-none tracking-normal text-red-600">working</span>{" "}
        on?
      </h1>
      <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-zinc-600">
        Pick a section to edit what is live on restorefine.co.uk, or start something new.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SectionCard
          href="/dashboard/blogs"
          newHref="/dashboard/blogs/new"
          newLabel="New post"
          icon={<FileText className="h-5 w-5" strokeWidth={1.75} />}
          title="Blogs"
          blurb="Articles and guides shown on /resources."
          count={posts.data}
          loading={posts.isLoading}
          error={posts.isError}
          unit="post"
        />
        <SectionCard
          href="/dashboard/portfolio"
          newHref="/dashboard/portfolio/new"
          newLabel="New project"
          icon={<Briefcase className="h-5 w-5" strokeWidth={1.75} />}
          title="Portfolio"
          blurb="Client case studies shown on /portfolio."
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
  newHref: string;
  newLabel: string;
  icon: React.ReactNode;
  title: string;
  blurb: string;
  count?: number;
  loading: boolean;
  error: boolean;
  unit: string;
  errorHint?: string;
}

function SectionCard({ href, newHref, newLabel, icon, title, blurb, count, loading, error, unit, errorHint }: SectionCardProps) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-zinc-950/5 transition hover:ring-zinc-950/15">
      <div className="flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-white">{icon}</span>
        {/* The count is the one big number on the card */}
        <span className="text-right">
          {loading ? (
            <span className="block h-9 w-10 animate-pulse rounded-lg bg-zinc-100" />
          ) : error ? (
            <span className="block max-w-[14rem] text-xs text-red-600">{errorHint ?? "Unavailable"}</span>
          ) : (
            <>
              <span className="block font-[family-name:var(--font-display)] text-4xl font-semibold leading-none tracking-tight tabular-nums text-zinc-950">
                {count ?? 0}
              </span>
              <span className="mt-1 block text-xs text-zinc-500">
                {unit}
                {count === 1 ? "" : "s"}
              </span>
            </>
          )}
        </span>
      </div>

      <h2 className="mt-6 text-2xl text-zinc-950">{title}</h2>
      <p className="mt-1 text-sm leading-relaxed text-zinc-600">{blurb}</p>

      <div className="mt-6 flex items-center gap-2">
        <Link
          href={href}
          className="group flex items-center gap-1.5 rounded-full bg-zinc-950 py-2 pl-4 pr-3 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Open
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} aria-hidden="true" />
        </Link>
        <Link
          href={newHref}
          className="flex items-center gap-1.5 rounded-full bg-zinc-100 py-2 pl-3 pr-4 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
        >
          <Plus className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          {newLabel}
        </Link>
      </div>
    </div>
  );
}
