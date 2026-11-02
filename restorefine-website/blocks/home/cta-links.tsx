"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { pushGTMEvent } from "@/lib/gtm";

const base =
  "group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full px-6 py-4 text-sm font-semibold no-underline transition-[transform,background-color,border-color] duration-300 ease-out-expo hover:-translate-y-0.5 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600";

export function EnquireLink({ label, href, tone = "red" }: { label: string; href: string; tone?: "red" | "light" }) {
  const toneClass = tone === "red" ? "bg-red-600 text-white hover:bg-red-500" : "bg-white text-zinc-950 hover:bg-zinc-100";
  return (
    <Link href={href} className={`${base} ${toneClass}`}>
      {label}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
    </Link>
  );
}

export function WhatsAppLink({ label, href, tone = "outline" }: { label: string; href: string; tone?: "outline" | "dark" | "light" }) {
  const toneClass =
    tone === "outline"
      ? "border border-zinc-950/15 bg-white/70 text-zinc-950 hover:border-zinc-950/30 hover:bg-white"
      : tone === "light"
        ? "bg-white text-zinc-950 hover:bg-zinc-100"
        : "bg-zinc-950 text-white hover:bg-zinc-800";
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={() => pushGTMEvent("whatsapp_click", { location: "page" })} className={`${base} ${toneClass}`}>
      <MessageCircle className="h-4 w-4" strokeWidth={2} />
      {label}
    </a>
  );
}
