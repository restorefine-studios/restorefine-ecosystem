"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MapPin } from "lucide-react";
import { Reveal } from "@/blocks/home/reveal";
import { type } from "@/blocks/home/type-scale";
import { AREA_PATHS, projectToMap } from "@/lib/uk-map";
import type { LocationExtras } from "@/lib/locations/london";

type KnowAboutContent = LocationExtras["knowAbout"];
type Place = KnowAboutContent["places"][number];
const ease = [0.16, 1, 0.3, 1] as const;

/* Bounding box of a generated "M x yLx y...Z" path, padded so labels fit */
function frame(d: string) {
  const nums = d.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let i = 0; i < nums.length - 1; i += 2) {
    minX = Math.min(minX, nums[i]);
    maxX = Math.max(maxX, nums[i]);
    minY = Math.min(minY, nums[i + 1]);
    maxY = Math.max(maxY, nums[i + 1]);
  }
  const pad = (maxX - minX) * 0.08;
  return { x: minX - pad, y: minY - pad, w: maxX - minX + pad * 2, h: maxY - minY + pad * 2 };
}

/* Labels are laid out in pixel units: browsers mangle glyph spacing at the ~1-unit
 * font sizes the raw map coordinates would need. */
function LabelText({ place, x, y, active }: { place: Place; x: number; y: number; active: boolean }) {
  const gap = 13;
  const pos = {
    top: { x, y: y - gap, anchor: "middle" },
    bottom: { x, y: y + gap + 11, anchor: "middle" },
    left: { x: x - gap, y: y + 5, anchor: "end" },
    right: { x: x + gap, y: y + 5, anchor: "start" },
  }[place.label];

  return (
    <text
      x={pos.x}
      y={pos.y}
      textAnchor={pos.anchor as "middle" | "start" | "end"}
      paintOrder="stroke"
      strokeWidth={5}
      strokeLinejoin="round"
      fontSize={14}
      className={`stroke-white font-bold transition-colors duration-300 ${active ? "fill-red-600" : "fill-zinc-950"}`}
    >
      {place.name}
    </text>
  );
}

function LondonMap({ knowAbout, active, onActive }: { knowAbout: KnowAboutContent; active: string | null; onActive: (name: string | null) => void }) {
  const reduce = useReducedMotion();
  const d = AREA_PATHS[knowAbout.boundary];
  if (!d) return null;
  const view = frame(d);
  // Everything is drawn on a 600px-wide canvas; only the boundary path is scaled into it
  const W = 600;
  const s = W / view.w;
  const H = Math.round(view.h * s);
  const toCanvas = (lat: number, lon: number) => {
    const p = projectToMap(lat, lon);
    return { x: (p.x - view.x) * s, y: (p.y - view.y) * s };
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-[#f2f4f6]">
      <p className="pointer-events-none absolute left-6 top-6 text-sm font-semibold text-zinc-500 sm:left-9 sm:top-8">Greater London</p>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`Map of Greater London showing ${knowAbout.places.map((p) => p.name).join(", ")}`}
      >
        <g transform={`scale(${s}) translate(${-view.x} ${-view.y})`}>
          <path d={d} className="fill-white" />
          <motion.path
            d={d}
            fill="none"
            strokeWidth={2 / s}
            strokeLinejoin="round"
            className="stroke-red-600"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.6, ease }}
          />
        </g>

        {knowAbout.places.map((place, i) => {
          const { x, y } = toCanvas(place.lat, place.lon);
          const isActive = active === place.name;
          return (
            <motion.g
              key={place.name}
              onMouseEnter={() => onActive(place.name)}
              onMouseLeave={() => onActive(null)}
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.12, ease }}
            >
              {isActive && <circle cx={x} cy={y} r={14} className="fill-red-600/15" />}
              <circle cx={x} cy={y} r={isActive ? 6.5 : 5} className={`transition-colors duration-300 ${isActive ? "fill-red-600" : "fill-zinc-950"}`} />
              <circle cx={x} cy={y} r={2} className="fill-white" />
              <LabelText place={place} x={x} y={y} active={isActive} />
            </motion.g>
          );
        })}
      </svg>
      <p className="pointer-events-none absolute bottom-3 right-5 text-[11px] text-zinc-500">Contains OS data © Crown copyright and database right 2024</p>
    </div>
  );
}

export function KnowAbout({ knowAbout }: { knowAbout: KnowAboutContent }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="grid gap-12 py-24 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-32">
      <div className="lg:col-span-5">
        <Reveal>
          <h2 className={`${type.section} font-black uppercase leading-[0.98] tracking-[-0.04em] text-zinc-950`}>{knowAbout.heading}</h2>
          <p className="mt-6 max-w-[60ch] leading-relaxed text-zinc-600 sm:text-lg">{knowAbout.body}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <ul className="mt-10 flex flex-wrap gap-2">
            {knowAbout.places.map((place) => {
              const isActive = active === place.name;
              return (
                <li
                  key={place.name}
                  tabIndex={0}
                  onMouseEnter={() => setActive(place.name)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(place.name)}
                  onBlur={() => setActive(null)}
                  className={`inline-flex cursor-default items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-red-600 ${
                    isActive ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-800"
                  }`}
                >
                  <MapPin aria-hidden="true" className={`h-4 w-4 ${isActive ? "text-red-500" : "text-red-600"}`} strokeWidth={2} />
                  {place.name}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="lg:col-span-7">
        <LondonMap knowAbout={knowAbout} active={active} onActive={setActive} />
      </Reveal>
    </section>
  );
}
