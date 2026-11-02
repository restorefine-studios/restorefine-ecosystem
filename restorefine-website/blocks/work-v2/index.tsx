"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { pushGTMEvent } from "@/lib/gtm";
import { homeContent } from "@/lib/homepageData";
import { clients, type ClientCard } from "@/blocks/work/WorkGrid";
import { EnquireAction, WhatsAppAction } from "@/blocks/home-v2/actions";

const HEADING = "What could your brand become with the";
const ACCENT = "Right Team?";
const LEAD = "See how we help hospitality brands launch, grow and stand out.";

/* Perceived brightness of a #rrggbb colour, 0 to 1 */
function brightness(hex: string | undefined) {
  const m = hex ? /#([0-9a-f]{6})/i.exec(hex) : null;
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
}

/* Card surface: the project's own colour (a Tailwind class, or a CMS hex). Pale colours
 * take dark text, and pure white becomes a light grey so the card shows on the page. */
function surface(client: ClientCard): { className: string; style: CSSProperties; light: boolean } {
  const raw = client.cardColorHex ?? client.cardColor ?? "";
  const b = brightness(raw) ?? (client.cardColor === "bg-white" ? 1 : null);
  const light = Boolean(client.lightCard) || (b !== null && b > 0.65);
  if (b !== null && b > 0.97) return { className: "bg-zinc-100", style: {}, light: true };
  if (client.cardColorHex) return { className: "", style: { backgroundColor: client.cardColorHex }, light };
  const c = client.cardColor ?? "bg-zinc-900";
  return { className: c.includes("from-") ? `bg-gradient-to-br ${c}` : c, style: {}, light };
}

/**
 * A folder-shaped project card: a tab on the top left, the logo on the
 * project's colour, and a pill with the name and an arrow at the foot.
 */
function FolderCard({ client }: { client: ClientCard }) {
  const { className, style, light } = surface(client);
  const ink = light ? "text-zinc-950" : "text-white";
  const pill = light ? "bg-zinc-950/[0.06]" : "bg-white/10 backdrop-blur-sm";
  const arrow = light ? "bg-zinc-950 text-white" : "bg-white text-zinc-950";

  const body = (
    <>
      {/* Tab, carrying the category like a folder label */}
      <span className={`flex h-9 w-fit min-w-[42%] items-center rounded-t-[1.1rem] px-5 pt-1 text-sm font-medium ${light ? "text-zinc-600" : "text-white/70"} ${className}`} style={style}>
        {client.category}
      </span>
      {/* Body */}
      <span className={`relative -mt-px flex flex-col overflow-hidden rounded-[1.5rem] rounded-tl-none p-5 aspect-[3/4] ${className}`} style={style}>
        <span className="relative mb-4 flex-1">
          <Image src={client.logo} alt={client.name} fill sizes="(min-width: 1024px) 18vw, 45vw" className="object-contain p-4 transition-transform duration-500 ease-out-expo group-hover:scale-[1.04]" />
        </span>
        <span className={`flex items-center justify-between gap-3 rounded-full py-2 pl-5 pr-2 ${pill}`}>
          <span className={`truncate text-[0.9375rem] font-medium ${ink}`}>{client.name}</span>
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-out-expo group-hover:rotate-45 ${arrow}`}>
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </span>
        </span>
      </span>
    </>
  );

  const base = "group block no-underline transition-transform duration-500 ease-out-expo hover:-translate-y-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600";
  return client.portfolioId ? (
    <Link href={`/portfolio/${client.portfolioId}`} onClick={() => pushGTMEvent("portfolio_item_click", { item: client.portfolioId! })} className={base}>
      {body}
    </Link>
  ) : (
    <div className={base}>{body}</div>
  );
}

/* Splits items across columns left to right, so reading order stays row by row */
function toColumns<T>(items: T[], n: number): T[][] {
  const cols: T[][] = Array.from({ length: n }, () => []);
  items.forEach((item, i) => cols[i % n].push(item));
  return cols;
}

/* A column drifting against the scroll: even columns rise, odd columns sink */
function ParallaxColumn({ progress, index, distance, children, className = "" }: { progress: MotionValue<number>; index: number; distance: number; children: React.ReactNode; className?: string }) {
  const dir = index % 2 === 0 ? 1 : -1;
  const y = useTransform(progress, [0, 1], [distance * dir, -distance * dir]);
  return (
    <motion.ul className={`flex flex-col gap-3 lg:gap-4 ${className}`} style={{ y }}>
      {children}
    </motion.ul>
  );
}

export function WorkV2({ extraClients = [] }: { extraClients?: ClientCard[] }) {
  // CMS-published projects lead, so the newest work is seen first
  const all = extraClients.length ? [...extraClients, ...clients] : clients;
  const { ctas } = homeContent;

  const reduce = Boolean(useReducedMotion());
  const gridRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, restDelta: 0.001 });
  // Reduced motion: hold every column still
  const still = useTransform(progress, () => 0.5);
  const p = reduce ? still : progress;

  const card = (client: ClientCard) => (
    <li key={client.id}>
      <FolderCard client={client} />
    </li>
  );

  return (
    <>
      <section className="v2-wrap pb-12 pt-32 text-center lg:pt-40">
        <h1 className="v2-display mx-auto max-w-[16ch] text-[clamp(2.5rem,5.4vw,5rem)] text-zinc-950">
          {HEADING}{" "}
          <span className="v2-script block pt-[0.62em] text-[1.1em] leading-[0.8] text-red-600">{ACCENT}</span>
        </h1>
        <p className="v2-lead mx-auto mt-12 max-w-[40ch] text-zinc-600">{LEAD}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <EnquireAction {...ctas.enquire} />
          <WhatsAppAction {...ctas.whatsapp} tone="outline" />
        </div>
      </section>

      {/* Every project, same size, in columns drifting against each other */}
      <section ref={gridRef} aria-label="Projects" className="v2-wrap overflow-hidden pb-32 pt-16 lg:pb-40 lg:pt-24">
        <div className="grid grid-cols-2 items-start gap-3 lg:hidden">
          {toColumns(all, 2).map((col, i) => (
            <ParallaxColumn key={i} progress={p} index={i} distance={50} className={i === 1 ? "pt-14" : ""}>
              {col.map(card)}
            </ParallaxColumn>
          ))}
        </div>
        <div className="hidden grid-cols-4 items-start gap-4 lg:grid">
          {toColumns(all, 4).map((col, i) => (
            <ParallaxColumn key={i} progress={p} index={i} distance={110} className={i % 2 === 1 ? "pt-20" : ""}>
              {col.map(card)}
            </ParallaxColumn>
          ))}
        </div>
      </section>
    </>
  );
}
