"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { PageContent } from "@/lib/homepageData";

const ease = [0.16, 1, 0.3, 1] as const;

export type PostSummary = { slug: string; title: string; thumbnail: string; thumbnailAlt?: string; date: string };

type TabId = keyof PageContent["resources"]["tiles"];
const TAB_ORDER: TabId[] = ["blogs", "caseStudies"];

const formatDate = (date: string) => new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

function BlogsPanel({ posts }: { posts: PostSummary[] }) {
  const [featured, ...others] = posts;
  if (!featured) return null;

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <Link href={`/resources/${featured.slug}`} className="group no-underline lg:col-span-7">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-zinc-100">
          <Image
            src={featured.thumbnail}
            alt={featured.thumbnailAlt ?? featured.title}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
          />
        </div>
        <p className="mt-5 text-sm font-medium text-zinc-500">{formatDate(featured.date)}</p>
        <p className="mt-2 max-w-[30ch] text-2xl font-black leading-[1.1] tracking-[-0.03em] text-zinc-950 transition-colors group-hover:text-red-600 sm:text-3xl">
          {featured.title}
        </p>
      </Link>

      <ul className="divide-y divide-zinc-200 lg:col-span-5 lg:flex lg:flex-col lg:justify-between">
        {others.map((post) => (
          <li key={post.slug} className="py-6 first:pt-0">
            <Link href={`/resources/${post.slug}`} className="group grid grid-cols-[9rem_1fr] items-start gap-5 no-underline sm:grid-cols-[12rem_1fr] sm:gap-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-zinc-100">
                <Image src={post.thumbnail} alt={post.thumbnailAlt ?? post.title} fill sizes="12rem" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500">{formatDate(post.date)}</p>
                <p className="mt-2 text-lg font-black leading-[1.15] tracking-[-0.02em] text-zinc-950 transition-colors group-hover:text-red-600 sm:text-xl">{post.title}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CaseStudiesPanel({ caseStudies }: { caseStudies: PageContent["clientSpotlight"] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {caseStudies.map((c, i) => (
        <li key={c.id} className={i % 2 === 1 ? "lg:mt-12" : undefined}>
          <Link href={c.href} className="group block no-underline">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]" style={{ backgroundColor: c.logoBg }}>
              <Image
                src={c.logo}
                alt={`${c.meta.Client} logo`}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 50vw, 100vw"
                className="object-contain p-8 transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
              />
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-xl font-black uppercase leading-none tracking-[-0.03em] text-zinc-950 transition-colors group-hover:text-red-600">{c.meta.Client}</p>
                <p className="mt-2 text-sm text-zinc-500">{c.services.slice(0, 2).join(", ")}</p>
              </div>
              <ArrowUpRight aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red-600" strokeWidth={1.75} />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function ResourcesTabs({ posts, resources, caseStudies }: { posts: PostSummary[]; resources: PageContent["resources"]; caseStudies: PageContent["clientSpotlight"] }) {
  const [active, setActive] = useState<TabId>("blogs");
  const reduce = useReducedMotion();
  const panels: Record<TabId, JSX.Element> = {
    blogs: <BlogsPanel posts={posts} />,
    caseStudies: <CaseStudiesPanel caseStudies={caseStudies} />,
  };

  return (
    <div className="mt-14">
      <div className="flex items-end justify-between gap-4 border-b border-zinc-200">
        <div role="tablist" aria-label={resources.heading} className="-mb-px flex min-w-0 gap-5 overflow-x-auto sm:gap-10">
          {TAB_ORDER.map((id) => {
            const isActive = id === active;
            return (
              <button
                key={id}
                id={`resources-tab-${id}`}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={`resources-panel-${id}`}
                onClick={() => setActive(id)}
                className={`relative whitespace-nowrap pb-4 text-[clamp(1.1rem,4.2vw,2.1rem)] font-black uppercase leading-none tracking-[-0.04em] transition-colors duration-300 ${
                  isActive ? "text-zinc-950" : "text-zinc-300 hover:text-zinc-500"
                }`}
              >
                {resources.tiles[id].label}
                {isActive && (
                  <motion.span layoutId="resources-tab-underline" className="absolute inset-x-0 bottom-0 h-[3px] bg-red-600" transition={{ duration: reduce ? 0 : 0.45, ease }} />
                )}
              </button>
            );
          })}
        </div>
        <Link
          href={resources.tiles[active].href}
          aria-label={resources.tiles[active].label}
          className="mb-3 inline-flex h-10 w-10 shrink-0 items-center sm:mb-4 sm:h-12 sm:w-12 justify-center rounded-full bg-zinc-950 text-white no-underline transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-red-600"
        >
          <ArrowUpRight className="h-5 w-5" strokeWidth={1.75} />
        </Link>
      </div>

      {/* All panels stay in the DOM so every link remains crawlable */}
      <div className="mt-10">
        {TAB_ORDER.map((id) => (
          <div key={id} id={`resources-panel-${id}`} role="tabpanel" aria-labelledby={`resources-tab-${id}`} hidden={id !== active}>
            {id === active ? (
              <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
                {panels[id]}
              </motion.div>
            ) : (
              panels[id]
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
