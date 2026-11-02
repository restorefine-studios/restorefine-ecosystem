"use client";

import Link from "next/link";
import { useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { homeContent } from "@/lib/homepageData";
import { AREA_PATHS, UK_MAP, projectToMap } from "@/lib/uk-map";
import { Reveal } from "./reveal";
import { type } from "./type-scale";

const { areas } = homeContent;
type Location = (typeof areas.groups)[number]["locations"][number];

const locations = areas.groups.flatMap((g) => g.locations.map((l) => ({ ...l, group: g.title, point: projectToMap(l.lat, l.lon) })));
type MapLocation = (typeof locations)[number];
const hub = locations.find((l) => l.hub) ?? locations[0];
const ease = [0.16, 1, 0.3, 1] as const;

/** Pointer must be within this many map units of a city to select it */
const SNAP_RADIUS = 45;

/* Bounding box of a generated "M x yLx y...Z" path, used to frame the close-up */
function pathBounds(d: string) {
  const nums = d.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let i = 0; i < nums.length - 1; i += 2) {
    minX = Math.min(minX, nums[i]);
    maxX = Math.max(maxX, nums[i]);
    minY = Math.min(minY, nums[i + 1]);
    maxY = Math.max(maxY, nums[i + 1]);
  }
  const size = Math.max(maxX - minX, maxY - minY) * 1.15;
  return { x: (minX + maxX) / 2 - size / 2, y: (minY + maxY) / 2 - size / 2, size };
}

const AREA_BOUNDS = Object.fromEntries(Object.entries(AREA_PATHS).map(([name, d]) => [name, pathBounds(d)]));

/* Crop the map to the served areas so they read large; the rest of the UK is
 * allowed to fall out of frame. Padding leaves room for the labels. */
const VIEW = (() => {
  const nums = Object.values(AREA_PATHS).join(" ").match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let i = 0; i < nums.length - 1; i += 2) {
    minX = Math.min(minX, nums[i]);
    maxX = Math.max(maxX, nums[i]);
    minY = Math.min(minY, nums[i + 1]);
    maxY = Math.max(maxY, nums[i + 1]);
  }
  const pad = { left: 55, right: 85, top: 30, bottom: 25 };
  return { x: minX - pad.left, y: minY - pad.top, w: maxX - minX + pad.left + pad.right, h: maxY - minY + pad.top + pad.bottom };
})();

/** Zoom factor versus the full map; divides sizes so labels and dots keep their on-screen size */
const Z = UK_MAP.width / VIEW.w;

/* Curved connector from the hub, bowed eastwards so lines fan over land */
function arcPath(to: { x: number; y: number }) {
  const { x: x1, y: y1 } = hub.point;
  const dx = to.x - x1;
  const dy = to.y - y1;
  let nx = -dy * 0.22;
  let ny = dx * 0.22;
  if (nx < 0) {
    nx = -nx;
    ny = -ny;
  }
  const r = (v: number) => Math.round(v * 100) / 100;
  return `M${x1} ${y1}Q${r(x1 + dx / 2 + nx)} ${r(y1 + dy / 2 + ny)} ${to.x} ${to.y}`;
}

function CityChip({ location, active, onActive }: { location: Location; active: boolean; onActive: (name: string | null) => void }) {
  // onActive here also sets the chip focus (see Areas), which zooms the whole map card into the area
  const className = `inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
    active ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"
  }`;
  const handlers = {
    onMouseEnter: () => onActive(location.name),
    onMouseLeave: () => onActive(null),
    onFocus: () => onActive(location.name),
    onBlur: () => onActive(null),
  };

  return location.href ? (
    <Link href={location.href} className={className} {...handlers}>
      {location.name}
    </Link>
  ) : (
    <button type="button" className={`${className} cursor-default`} {...handlers}>
      {location.name}
    </button>
  );
}

/* Full-card close-up of one served area: the map "flies" in to frame it, with the
 * surrounding coastline for context and the boundary traced in red. */
function AreaFocus({ name }: { name: string }) {
  const reduce = useReducedMotion();
  const location = locations.find((l) => l.name === name);
  const d = AREA_PATHS[name];
  const b = AREA_BOUNDS[name];
  if (!location || !d || !b) return null;

  // Wider frame than the corner close-up so neighbouring coastline gives context
  const size = b.size * 1.6;
  const x = b.x + b.size / 2 - size / 2;
  const y = b.y + b.size / 2 - size / 2;

  return (
    <motion.div
      className="absolute inset-0 z-[1] bg-[#f7f8f9]"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: 0.35, ease }}
      aria-live="polite"
    >
      <motion.svg
        viewBox={`${x} ${y} ${size} ${size}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        initial={reduce ? false : { scale: 1.25 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease }}
      >
        <path d={UK_MAP.ireland} className="fill-zinc-200/50" />
        {/* Land in a soft grey so the card keeps its edge when the frame is mostly land */}
        <path d={UK_MAP.uk} className="fill-[#e6e8eb] stroke-zinc-300" strokeWidth={1} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        {locations.map((l) =>
          AREA_PATHS[l.name] && l.name !== name ? <path key={l.name} d={AREA_PATHS[l.name]} className="fill-red-600/[0.07]" /> : null,
        )}
        <path d={d} className="fill-red-600/15" />
        <motion.path
          d={d}
          fill="none"
          strokeWidth={size / 220}
          strokeLinejoin="round"
          className="stroke-red-600"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.15, ease }}
        />
      </motion.svg>

      <div className="pointer-events-none absolute right-6 top-6 text-right sm:right-10 sm:top-9">
        <p className="text-sm font-semibold text-zinc-500">{location.group}</p>
        <p className="text-4xl font-black uppercase leading-none tracking-[-0.04em] text-zinc-950 sm:text-5xl">{location.name}</p>
      </div>
    </motion.div>
  );
}

function ServiceMap({ active, onActive, focus }: { active: string | null; onActive: (name: string | null) => void; focus: string | null }) {
  const reduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const current = locations.find((l) => l.name === active) ?? hub;

  // Snap to the nearest city so small areas (Liverpool, Glasgow) stay easy to hit
  function handleMove(event: PointerEvent) {
    const svg = svgRef.current;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return;
    const { x, y } = new DOMPoint(event.clientX, event.clientY).matrixTransform(ctm.inverse());
    let nearest: string | null = null;
    let best = SNAP_RADIUS / Z;
    for (const l of locations) {
      const d = Math.hypot(l.point.x - x, l.point.y - y);
      if (d < best) {
        best = d;
        nearest = l.name;
      }
    }
    // Otherwise fall back to whichever served area is under the pointer
    nearest ??= (event.target as Element).closest("[data-area]")?.getAttribute("data-area") ?? null;
    if (nearest !== active) onActive(nearest);
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-[#f2f4f6]">
      {/* Chip hover takes over the whole card */}
      <AnimatePresence>{focus && <AreaFocus key={focus} name={focus} />}</AnimatePresence>

      {/* Selected area readout (map hover) */}
      <div className={`pointer-events-none absolute right-6 top-6 text-right transition-opacity sm:right-10 sm:top-9 ${focus ? "opacity-0" : ""}`} aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.name}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease }}
          >
            <p className="text-sm font-semibold text-zinc-500">{current.group}</p>
            <p className="text-3xl font-black uppercase leading-none tracking-[-0.04em] text-zinc-950 sm:text-4xl">{current.name}</p>
            {AREA_PATHS[current.name] && (
              <svg
                viewBox={`${AREA_BOUNDS[current.name].x} ${AREA_BOUNDS[current.name].y} ${AREA_BOUNDS[current.name].size} ${AREA_BOUNDS[current.name].size}`}
                className="ml-auto mt-5 h-24 w-24 sm:h-32 sm:w-32"
                aria-hidden="true"
              >
                <path d={AREA_PATHS[current.name]} className="fill-red-600/10" />
                <motion.path
                  d={AREA_PATHS[current.name]}
                  fill="none"
                  strokeWidth={(2 * AREA_BOUNDS[current.name].size) / 128}
                  strokeLinejoin="round"
                  className="stroke-red-600"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease }}
                />
              </svg>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <svg
        ref={svgRef}
        viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
        className="block h-auto w-full touch-pan-y"
        role="img"
        aria-label={`Map of the UK showing ${locations.map((l) => l.name).join(", ")}`}
        onPointerMove={handleMove}
        onPointerDown={handleMove}
        onPointerLeave={() => onActive(null)}
      >
        <path d={UK_MAP.ireland} className="fill-zinc-200/50" />
        <path d={UK_MAP.uk} className="fill-white stroke-zinc-300" strokeWidth={0.75} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />

        {/* Served areas: faint tint at rest, traced in red when selected */}
        {locations.map((location) => {
          const d = AREA_PATHS[location.name];
          if (!d) return null;
          const isActive = current.name === location.name && active !== null;
          return (
            <g key={`area-${location.name}`}>
              <path d={d} data-area={location.name} className={`transition-[fill] duration-300 ${isActive ? "fill-red-600/15" : "fill-red-600/[0.07]"}`} />
              <path d={d} fill="none" strokeWidth={0.75} vectorEffect="non-scaling-stroke" strokeLinejoin="round" className="stroke-red-600/30" />
              {isActive && (
                <motion.path
                  d={d}
                  fill="none"
                  strokeWidth={2 / Z}
                  strokeLinejoin="round"
                  className="stroke-red-600"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, ease }}
                />
              )}
            </g>
          );
        })}

        {locations
          .filter((l) => !l.hub)
          .map((location, i) => (
            <motion.path
              key={location.name}
              d={arcPath(location.point)}
              fill="none"
              strokeWidth={1.25 / Z}
              strokeLinecap="round"
              className="stroke-red-600/35"
              initial={reduce ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.4, delay: 0.3 + i * 0.15, ease }}
            />
          ))}

        {/* The selected route redraws from the hub each time it changes */}
        {active && active !== hub.name && (
          <motion.path
            key={`route-${active}`}
            d={arcPath(current.point)}
            fill="none"
            strokeWidth={2.5 / Z}
            strokeLinecap="round"
            className="stroke-red-600"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease }}
          />
        )}

        {locations.map((location) => {
          const { x, y } = location.point;
          const isActive = current.name === location.name && active !== null;
          const left = location.label === "left";
          return (
            <g key={location.name} className="pointer-events-none">
              <circle cx={x} cy={y} r={(location.hub ? 6.5 : 5) / Z} className={`transition-colors duration-300 ${location.hub || isActive ? "fill-red-600" : "fill-zinc-950"}`} />
              <circle cx={x} cy={y} r={2 / Z} className="fill-white" />
              <text
                x={left ? x - 14 / Z : x + 14 / Z}
                y={y + 5 / Z}
                textAnchor={left ? "end" : "start"}
                paintOrder="stroke"
                strokeWidth={5 / Z}
                strokeLinejoin="round"
                fontSize={15 / Z}
                className={`stroke-white transition-colors duration-300 ${location.hub ? "font-black" : "font-bold"} ${isActive ? "fill-red-600" : "fill-zinc-950"}`}
              >
                {location.name}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="pointer-events-none absolute bottom-3 right-5 text-[11px] text-zinc-500">Contains OS data © Crown copyright and database right 2024</p>
    </div>
  );
}

export function Areas() {
  const [active, setActive] = useState<string | null>(null);
  // Set only by the chips: zooms the whole map card into that area
  const [focus, setFocus] = useState<string | null>(null);
  const fromChip = (name: string | null) => {
    setActive(name);
    setFocus(name);
  };

  return (
    <section className="grid gap-12 py-24 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-32">
      <div className="lg:col-span-5">
        <Reveal>
          <h2 className={`${type.section} font-black uppercase leading-[0.98] tracking-[-0.04em] text-zinc-950`}>{areas.heading}</h2>
          {areas.body.map((paragraph) => (
            <p key={paragraph} className="mt-6 max-w-[60ch] leading-relaxed text-zinc-600 sm:text-lg">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <div className="mt-10 space-y-6">
          {areas.groups.map((group, g) => (
            <Reveal key={group.title} delay={0.08 + g * 0.08}>
              <p className="text-sm font-semibold text-zinc-500">{group.title}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.locations.map((location) => (
                  <li key={location.name}>
                    <CityChip location={location} active={active === location.name} onActive={fromChip} />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.1} className="lg:col-span-7">
        <ServiceMap active={active} onActive={setActive} focus={focus} />
      </Reveal>
    </section>
  );
}
