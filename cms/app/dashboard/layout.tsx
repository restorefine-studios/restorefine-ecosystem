"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ChevronLeft, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase";

const SECTIONS = [
  { key: "blogs", label: "Blogs", base: "/dashboard/blogs", newLabel: "New post" },
  { key: "portfolio", label: "Portfolio", base: "/dashboard/portfolio", newLabel: "New project" },
] as const;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  // null on the home screen at /dashboard, where no section is open yet
  const section = SECTIONS.find((s) => pathname === s.base || pathname.startsWith(`${s.base}/`)) ?? null;
  // Inside an editor (new or edit) rather than on a section's list page
  const isEditor = !!section && pathname !== section.base;

  return (
    <div className="min-h-screen bg-canvas text-zinc-950">
      <header className="cms-bar sticky top-0 z-50 border-b border-zinc-950/10">
        <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between gap-6 px-4 sm:px-6">
          {/* Left: brand, then the section switch */}
          <div className="flex min-w-0 items-center gap-5">
            <Link href="/dashboard" className="flex shrink-0 items-center gap-2" aria-label="RestoRefine CMS home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/restorefine-logoblack.svg" alt="RestoRefine" style={{ height: 24, width: "auto" }} />
              <span className="rounded-full bg-zinc-950/5 px-2 py-0.5 text-xs font-medium text-zinc-500">CMS</span>
            </Link>

            {/* Segmented control: always visible, so either section is one click away */}
            <nav aria-label="Sections" className="flex items-center rounded-full bg-zinc-950/5 p-0.5">
              {SECTIONS.map((s) => {
                const active = section?.key === s.key;
                return (
                  <Link
                    key={s.key}
                    href={s.base}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                      active ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-500 hover:text-zinc-950"
                    }`}
                  >
                    {s.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: actions */}
          <div className="flex shrink-0 items-center gap-2">
            {isEditor && section && (
              <Link
                href={section.base}
                className="hidden items-center gap-1 rounded-full py-1.5 pl-2 pr-3 text-sm font-medium text-zinc-500 transition hover:bg-zinc-950/5 hover:text-zinc-950 sm:flex"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                All {section.label.toLowerCase()}
              </Link>
            )}
            {section && (
              <Link
                href={`${section.base}/new`}
                className="flex items-center gap-1.5 rounded-full bg-zinc-950 py-1.5 pl-3 pr-4 text-sm font-medium text-white transition hover:bg-zinc-700"
              >
                <Plus className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                {section.newLabel}
              </Link>
            )}
            <button
              onClick={handleSignOut}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-zinc-500 transition hover:bg-zinc-950/5 hover:text-zinc-950"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
