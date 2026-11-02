"use client";

import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { pushGTMEvent } from "@/lib/gtm";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-[0.9375rem] font-medium no-underline transition-[background-color,border-color,color,transform] duration-300 ease-out-expo active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600";

const tones = {
  red: "bg-red-600 text-white hover:bg-red-500",
  white: "bg-white text-zinc-950 hover:bg-zinc-100",
  dark: "bg-zinc-950 text-white hover:bg-zinc-800",
  outline: "border border-zinc-300 text-zinc-950 hover:border-zinc-950",
  outlineLight: "border border-white/25 text-white hover:border-white",
} as const;

type Tone = keyof typeof tones;

export function EnquireAction({ label, href, tone = "red" }: { label: string; href: string; tone?: Tone }) {
  return (
    <Link href={href} className={`${base} ${tones[tone]}`}>
      {label}
      <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
    </Link>
  );
}

/** Keeps the site's WhatsApp GTM event */
export function WhatsAppAction({ label, href, tone = "white" }: { label: string; href: string; tone?: Tone }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={() => pushGTMEvent("whatsapp_click", { location: "page" })} className={`${base} ${tones[tone]}`}>
      <MessageCircle aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
      {label}
    </a>
  );
}
