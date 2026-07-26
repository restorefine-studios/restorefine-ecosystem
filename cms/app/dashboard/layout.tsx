"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase";

const SECTIONS = [
  { key: "blogs", label: "Blogs", base: "/dashboard/blogs", newLabel: "+ New Post" },
  { key: "portfolio", label: "Portfolio", base: "/dashboard/portfolio", newLabel: "+ New Project" },
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

  // null on the chooser screen at /dashboard, where there's nothing to act on yet
  const section = SECTIONS.find((s) => pathname === s.base || pathname.startsWith(`${s.base}/`)) ?? null;
  // Inside an editor (new or edit) rather than on a section's list page
  const isEditor = !!section && pathname !== section.base;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between gap-6">

          {/* Left: brand + nav */}
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/restorefine-logoblack.svg" alt="RestoRefine" style={{ height: 28, width: "auto" }} />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">CMS</span>
            </Link>

            {section && (
              <nav className="flex items-center gap-1">
                {SECTIONS.map((s) => (
                  <Link
                    key={s.key}
                    href={s.base}
                    className={`text-[11px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-md transition ${
                      section.key === s.key
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {s.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-3">
            {isEditor && section && (
              <Link
                href={section.base}
                className="text-[11px] font-semibold text-gray-400 hover:text-gray-700 transition"
              >
                ← Back
              </Link>
            )}
            {section && (
              <Link
                href={`${section.base}/new`}
                className="text-[11px] font-bold uppercase tracking-widest bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                {section.newLabel}
              </Link>
            )}
            <div className="w-px h-5 bg-gray-200" />
            <button
              onClick={handleSignOut}
              className="text-[11px] font-semibold text-gray-400 hover:text-gray-700 uppercase tracking-widest transition"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="px-6 py-8 max-w-screen-2xl mx-auto">{children}</main>
    </div>
  );
}
