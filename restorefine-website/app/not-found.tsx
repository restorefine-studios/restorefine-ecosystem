import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: false },
};

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Our Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact Us", href: "/contact" },
];

export default function NotFound() {
  return (
    <main className="bg-white min-h-screen flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-32 text-center relative overflow-hidden">
        {/* Background number */}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center text-[28vw] font-black uppercase tracking-tighter text-zinc-100 select-none pointer-events-none leading-none"
        >
          404
        </span>

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
          {/* Eyebrow */}
          <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
            Error 404
          </span>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-zinc-900 leading-[0.9]">
            This Page{" "}
            <span className="text-red-600">Walked Out</span>
          </h1>

          {/* Subtext */}
          <p className="text-sm text-zinc-500 leading-relaxed max-w-sm mt-2">
            Looks like this page doesn&apos;t exist — or it moved somewhere new.
            Let&apos;s get you back on track.
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 w-full max-w-xs mt-2">
            <div className="h-px flex-1 bg-zinc-200" />
            <span className="text-red-600 font-black text-sm">✦</span>
            <div className="h-px flex-1 bg-zinc-200" />
          </div>

          {/* CTA */}
          <Link
            href="/"
            className="flex items-center gap-2 group mt-2"
          >
            <span className="text-sm font-black uppercase tracking-[0.2em] bg-zinc-900 text-white px-8 py-4 rounded-full group-hover:bg-red-600 transition-colors duration-300">
              Back to Home
            </span>
            <span className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center group-hover:bg-zinc-900 transition-colors duration-300">
              <ArrowRight className="w-5 h-5 text-white" />
            </span>
          </Link>
        </div>
      </section>

      {/* Quick nav strip */}
      <section className="border-t border-zinc-200 px-6 md:px-12 lg:px-24 py-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/restorefine-logoblack.svg"
              alt="RestoRefine"
              width={110}
              height={36}
              className="h-8 w-auto"
            />
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-2">
            {quickLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 px-5 py-2.5 rounded-full border border-zinc-200 hover:border-zinc-900 hover:text-zinc-900 transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/enquire-now"
            className="text-xs font-black uppercase tracking-[0.2em] bg-zinc-900 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-colors duration-300 whitespace-nowrap"
          >
            Start a Project
          </Link>
        </div>
      </section>
    </main>
  );
}
