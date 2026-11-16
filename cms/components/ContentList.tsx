"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";

export interface ContentListItem {
  id: string;
  href: string;
  title: string;
  /** One or two lines under the title. */
  summary?: string;
  image?: string;
  imageAlt?: string;
  /** A logo on a colour: shown small and whole, on `imageBg`, rather than filling the frame. */
  imageContain?: boolean;
  imageBg?: string;
  published: boolean;
  /** Short facts shown in one line: category, date, author. */
  meta: string[];
}

type Filter = "all" | "published" | "draft";
const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Drafts" },
];

/**
 * The list screen shared by Blogs and Portfolio: a title with the count, a
 * search box, a published/draft filter, and a grid of items to open.
 */
export function ContentList({
  title,
  noun,
  newHref,
  items,
}: {
  title: string;
  /** Singular name of one item, e.g. "post". */
  noun: string;
  newHref: string;
  items: ContentListItem[];
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (filter === "published" && !item.published) return false;
      if (filter === "draft" && item.published) return false;
      if (!q) return true;
      return [item.title, item.summary ?? "", ...item.meta].some((text) => text.toLowerCase().includes(q));
    });
  }, [items, query, filter]);

  const counts: Record<Filter, number> = {
    all: items.length,
    published: items.filter((i) => i.published).length,
    draft: items.filter((i) => !i.published).length,
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl text-zinc-950">
          {title} <span className="text-zinc-400">{items.length}</span>
        </h1>

        {items.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center rounded-full bg-zinc-950/5 p-0.5" role="group" aria-label="Filter by status">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  aria-pressed={filter === f.value}
                  onClick={() => setFilter(f.value)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    filter === f.value ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-500 hover:text-zinc-950"
                  }`}
                >
                  {f.label} <span className="tabular-nums text-zinc-400">{counts[f.value]}</span>
                </button>
              ))}
            </div>
            <label className="relative block">
              <span className="sr-only">Search {title.toLowerCase()}</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" strokeWidth={2} aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-56 rounded-full border border-zinc-200 bg-white py-1.5 pl-9 pr-4 text-sm text-zinc-950 placeholder:text-zinc-400"
              />
            </label>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl bg-white px-6 py-20 text-center ring-1 ring-zinc-950/5">
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-zinc-950">No {noun}s yet</p>
          <p className="mt-2 text-sm text-zinc-600">Your first {noun} will show up here once you create it.</p>
          <Link
            href={newHref}
            className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-zinc-950 py-2 pl-3 pr-4 text-sm font-medium text-white transition hover:bg-zinc-700"
          >
            <Plus className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            New {noun}
          </Link>
        </div>
      ) : shown.length === 0 ? (
        <div className="rounded-2xl bg-white px-6 py-16 text-center ring-1 ring-zinc-950/5">
          <p className="text-sm text-zinc-600">Nothing matches that search or filter.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
            className="mt-4 rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
          >
            Show everything
          </button>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="group block overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-950/5 transition hover:ring-zinc-950/20"
              >
                <div
                  className="flex aspect-[16/9] w-full items-center justify-center overflow-hidden bg-zinc-100"
                  style={item.imageContain && item.imageBg ? { background: item.imageBg } : undefined}
                >
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.imageAlt ?? item.title}
                      loading="lazy"
                      className={item.imageContain ? "max-h-[45%] max-w-[55%] object-contain" : "h-full w-full object-cover"}
                    />
                  ) : (
                    <span className="text-xs text-zinc-400">No image</span>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="min-w-0 truncate text-xs text-zinc-500">{item.meta.filter(Boolean).join(" / ")}</p>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                        item.published ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {item.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <h2 className="mt-2 line-clamp-2 text-lg leading-snug text-zinc-950">{item.title}</h2>
                  {item.summary && <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-600">{item.summary}</p>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Placeholder cards shown while a list loads, in the same shape as the real ones. */
export function ContentListSkeleton() {
  return (
    <div>
      <div className="mb-6 h-9 w-40 animate-pulse rounded-lg bg-zinc-200/70" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-950/5">
            <div className="aspect-[16/9] w-full bg-zinc-100" />
            <div className="space-y-2 p-4">
              <div className="h-3 w-24 rounded bg-zinc-100" />
              <div className="h-5 w-3/4 rounded bg-zinc-100" />
              <div className="h-4 w-full rounded bg-zinc-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** A load failure, with what went wrong and what to try. */
export function ContentListError({ title, detail, hint }: { title: string; detail?: string; hint?: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white px-6 py-12 text-center ring-1 ring-red-600/20">
      <p className="text-sm font-medium text-red-600">{title}</p>
      {detail && <p className="mt-1 text-xs text-zinc-600">{detail}</p>}
      {hint && <p className="mt-3 text-xs text-zinc-600">{hint}</p>}
    </div>
  );
}
