"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type ShowcaseItem = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  items: string[];
  href: string;
  image: { src: string; alt: string };
};

/** How long each service stays up before the next one, in ms (drives the progress bar) */
const DURATION = 7000;

const label = (tagline: string) => tagline.replace(/\.$/, "");

/**
 * Featured-story style services. The active service fills the frame; the list sits in a
 * glass panel inside the frame on desktop and as a swipeable row of cards under it on
 * phones. It advances on its own, holding while hovered. Every service's copy stays in the HTML;
 * only the active one is visible.
 */
export function ServicesShowcase({ items }: { items: ShowcaseItem[] }) {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  // Holds while the pointer is over it or keyboard focus is inside (taps do not count), and never runs for reduced motion
  const paused = reduced || hovered || focused;
  const rail = useRef<HTMLUListElement>(null);

  // No autoplay for people who prefer reduced motion
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setReduced(true);
  }, []);

  // Phones: keep the active card in view in the row (scrolls the row only, never the page)
  useEffect(() => {
    const ul = rail.current;
    if (!ul || ul.scrollWidth <= ul.clientWidth) return;
    const li = ul.children[active] as HTMLElement | undefined;
    if (li) ul.scrollTo({ left: li.offsetLeft - ul.offsetLeft, behavior: "smooth" });
  }, [active]);

  const next = () => setActive((i) => (i + 1) % items.length);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(e) => e.target.matches(":focus-visible") && setFocused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
    >
      {/* Frame: photo, shade and the active service */}
      <div className="relative isolate overflow-hidden rounded-[1.5rem] bg-zinc-900 sm:rounded-[1.75rem] lg:min-h-[44rem]">
        {items.map((s, i) => (
          <Image
            key={s.id}
            src={s.image.src}
            alt={i === active ? s.image.alt : ""}
            fill
            sizes="100vw"
            className={`-z-20 object-cover transition-opacity duration-700 ease-out ${i === active ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div aria-hidden="true" className="absolute inset-0 -z-10 hidden bg-[linear-gradient(90deg,rgba(9,9,11,0.88)_0%,rgba(9,9,11,0.55)_50%,rgba(9,9,11,0.25)_100%)] lg:block" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-3/4 bg-gradient-to-t from-zinc-950/95 via-zinc-950/50 to-transparent" />

        {/* Slides, stacked in one cell so the frame fits the tallest */}
        <div className="grid aspect-[4/5] p-6 sm:p-10 lg:aspect-auto lg:min-h-[44rem] lg:w-7/12 lg:p-16">
          {items.map((s, i) => {
            const on = i === active;
            return (
              <article
                key={s.id}
                aria-hidden={!on}
                inert={!on}
                className={`[grid-area:1/1] self-end transition-[opacity,transform] duration-700 ease-out ${on ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
              >
                <h3 className="font-[family-name:var(--v2-display)] text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-white sm:mt-6">
                  <Link href={s.href} tabIndex={on ? undefined : -1} className="no-underline">
                    {s.title}
                  </Link>
                </h3>
                <p className="mt-4 text-lg font-medium text-white/90">{s.tagline}</p>
                <p className="v2-body mt-4 line-clamp-2 max-w-[56ch] text-white/75 lg:mt-6 lg:line-clamp-none">{s.description}</p>
                <ul className="mt-6 hidden flex-wrap gap-2 lg:flex">
                  {s.items.map((item) => (
                    <li key={item} className="rounded-full border border-white/20 px-3 py-1.5 text-sm text-white/85">
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={s.href}
                  tabIndex={on ? undefined : -1}
                  className="group mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-[0.9375rem] font-medium text-zinc-950 no-underline transition-colors hover:bg-zinc-100 sm:mt-8"
                >
                  Learn more
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
                </Link>
              </article>
            );
          })}
        </div>
      </div>

      {/* The list: a row of cards under the frame on phones, a glass panel inside it on desktop */}
      <div className="mt-3 lg:absolute lg:inset-y-6 lg:right-6 lg:mt-0 lg:flex lg:w-[min(30rem,38%)] lg:flex-col lg:rounded-[1.25rem] lg:border lg:border-white/15 lg:bg-white/[0.08] lg:p-3 lg:backdrop-blur-2xl">
        <ul ref={rail} className="v2-rail flex gap-3 overflow-x-auto lg:flex-1 lg:flex-col lg:justify-around lg:gap-1 lg:overflow-visible">
          {items.map((s, i) => {
            const on = i === active;
            return (
              <li key={s.id} className="w-[82%] shrink-0 sm:w-[46%] lg:w-auto">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={on}
                  className={`relative flex h-full w-full items-center gap-4 rounded-2xl border p-3 text-left transition-colors duration-300 lg:border-transparent lg:p-4 ${
                    on ? "border-white bg-zinc-900 lg:bg-white/[0.12]" : "border-white/10 bg-zinc-900/60 hover:bg-zinc-900 lg:bg-transparent lg:hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-zinc-800 lg:h-16 lg:w-16">
                    <Image src={s.image.src} alt="" fill sizes="64px" className="object-cover" />
                  </span>
                  <span className="min-w-0 pb-2">
                    <span className={`block truncate text-xs font-medium sm:text-sm ${on ? "text-red-400" : "text-white/55"}`}>{label(s.tagline)}</span>
                    <span className={`mt-1 block truncate text-base font-medium sm:text-lg ${on ? "text-white" : "text-white/75"}`}>{s.title}</span>
                  </span>
                  {on && (
                    <span aria-hidden="true" className="absolute inset-x-4 bottom-2 h-0.5 overflow-hidden rounded-full bg-white/15">
                      <span
                        key={active}
                        onAnimationEnd={next}
                        className="block h-full origin-left rounded-full bg-red-500 lg:bg-white"
                        style={{ animation: `v2-progress ${DURATION}ms linear forwards`, animationPlayState: paused ? "paused" : "running" }}
                      />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
