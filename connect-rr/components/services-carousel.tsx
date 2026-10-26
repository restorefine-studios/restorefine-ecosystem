"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Globe, Image as ImageIcon, Megaphone, PenTool, Play, Search, Video } from "lucide-react";
import { services } from "@/lib/business";

const tagIcons = { pen: PenTool, globe: Globe, video: Video, image: ImageIcon, megaphone: Megaphone, search: Search } as const;

// Hidden on short screens so the whole page still fits without scrolling
const visualClass = "mt-3 flex h-10 [@media(max-height:720px)]:hidden";
const tile = "size-10 rounded-xl ring-2 ring-surface";

function Visual({ kind }: { kind: (typeof services)[number]["visual"] }) {
  if (kind === "swatches") {
    return (
      <div className={`${visualClass} -space-x-1.5`} aria-hidden="true">
        <span className={`${tile} grid place-items-center bg-brand text-[13px] font-bold text-white`}>R.</span>
        <span className={`${tile} grid place-items-center bg-neutral-900 text-[13px] font-bold text-white dark:bg-neutral-700`}>Aa</span>
        <span className={`${tile} bg-[#d9d2c9]`} />
        <span className={`${tile} bg-[repeating-linear-gradient(135deg,#e8e2da_0_6px,#f5f1ec_6px_12px)]`} />
        <span className={`${tile} grid place-items-center bg-white shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08)]`}>
          <span className="size-3 rounded-full bg-brand" />
        </span>
      </div>
    );
  }
  if (kind === "reels") {
    const shades = ["from-[#b07a52] to-[#6e4528]", "from-[#d0a273] to-[#8a5a34]", "from-[#6b6458] to-[#2f2b26]"];
    return (
      <div className={`${visualClass} -space-x-1.5`} aria-hidden="true">
        {shades.map((shade) => (
          <span key={shade} className={`${tile} grid place-items-center bg-gradient-to-br ${shade}`}>
            <Play className="size-3.5 fill-white text-white" />
          </span>
        ))}
      </div>
    );
  }
  const bars = [30, 45, 40, 62, 78, 100];
  return (
    <div className={`${visualClass} items-end gap-1`} aria-hidden="true">
      {bars.map((h, i) => (
        <span
          key={i}
          style={{ height: `${h}%` }}
          className={`w-3 rounded-[4px] ${i === bars.length - 1 ? "bg-brand" : "bg-brand/25"}`}
        />
      ))}
    </div>
  );
}

// Arrows sit in the gutters beside the card; at either end they fade rather than vanish so nothing shifts
const arrow =
  "grid size-8 shrink-0 place-items-center rounded-full bg-surface text-ink transition active:scale-90 disabled:pointer-events-none disabled:opacity-30";

export function ServicesCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 10), behavior: "smooth" });
  };

  return (
    <section aria-label="What we do" className="-mx-2 flex items-center gap-1.5">
      <button type="button" aria-label="Previous service" onClick={() => step(-1)} disabled={atStart} className={arrow}>
        <ChevronLeft className="size-4" />
      </button>

      <ul
        ref={trackRef}
        onScroll={updateEdges}
        className="flex min-w-0 flex-1 snap-x snap-mandatory gap-2.5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {services.map((s) => (
          <li key={s.name} className="w-full shrink-0 snap-center">
            <a href={s.href} target="_blank" rel="noopener noreferrer" className="block h-full rounded-2xl bg-surface px-4 py-3.5 transition active:scale-[0.98]">
              <h2 className="text-lg font-semibold tracking-tight">
                {s.name}
                <span className="text-brand">.</span>
              </h2>
              <ul className="mt-1 flex gap-3.5 text-[13px] font-medium text-muted">
                {s.tags.map((t) => {
                  const Icon = tagIcons[t.icon];
                  return (
                    <li key={t.label} className="flex items-center gap-1">
                      <Icon className="size-3.5" aria-hidden="true" />
                      {t.label}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-2 line-clamp-2 text-sm leading-snug text-muted">{s.description}</p>
              <Visual kind={s.visual} />
            </a>
          </li>
        ))}
      </ul>

      <button type="button" aria-label="Next service" onClick={() => step(1)} disabled={atEnd} className={arrow}>
        <ChevronRight className="size-4" />
      </button>
    </section>
  );
}
