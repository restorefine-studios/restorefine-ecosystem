"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

/** Zooms its content in once it scrolls into view. Visible from the start; reduced motion skips the zoom. */
export function GlobeZoom({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`origin-[50%_60%] transition-transform duration-[1600ms] ease-out-expo motion-reduce:transition-none ${inView ? "scale-100" : "scale-[0.82] motion-reduce:scale-100"} ${className}`}
    >
      {children}
    </div>
  );
}

/* Which location the visitor is pointing at in the list, shared with the map */
const FocusContext = createContext<{ focus: string | null; setFocus: (name: string | null) => void }>({ focus: null, setFocus: () => {} });

export function AreaFocusProvider({ children }: { children: ReactNode }) {
  const [focus, setFocus] = useState<string | null>(null);
  return <FocusContext.Provider value={{ focus, setFocus }}>{children}</FocusContext.Provider>;
}

/** A list entry that points the map at its location on hover and keyboard focus */
export function FocusItem({ name, children, className = "" }: { name: string; children: ReactNode; className?: string }) {
  const { setFocus } = useContext(FocusContext);
  return (
    <li
      className={className}
      onMouseEnter={() => setFocus(name)}
      onMouseLeave={() => setFocus(null)}
      onFocus={() => setFocus(name)}
      onBlur={() => setFocus(null)}
    >
      {children}
    </li>
  );
}

type Box = { x: number; y: number; w: number; h: number };
export type GlobePin = { name: string; x: number; y: number; hub?: boolean };

/**
 * The map's <svg>. Once in view it eases from the whole frame to `base` (a close-up),
 * and when a list entry is in focus it eases further in on that pin. Zooming moves the
 * viewBox, so outlines stay crisp; pins are drawn at a fixed on-screen size.
 */
export function FocusSvg({
  width,
  height,
  pins,
  base,
  focusZoom = 1.7,
  children,
  className = "",
}: {
  width: number;
  height: number;
  pins: GlobePin[];
  base?: Box;
  focusZoom?: number;
  children: ReactNode;
  className?: string;
}) {
  const { focus } = useContext(FocusContext);
  const full = { x: 0, y: 0, w: width, h: height };
  const [box, setBox] = useState<Box>(full);
  const [inView, setInView] = useState(false);
  const current = useRef(box);
  const ref = useRef<SVGSVGElement>(null);
  const target = focus ? pins.find((p) => p.name === focus) ?? null : null;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const rest = inView && base ? base : full;
    const goal = target ? { w: rest.w / focusZoom, h: rest.h / focusZoom, x: target.x - rest.w / focusZoom / 2, y: target.y - rest.h / focusZoom / 2 } : rest;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      current.current = goal;
      setBox(goal);
      return;
    }
    const from = { ...current.current };
    const start = performance.now();
    const duration = base && !target ? 1800 : 900;
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const e = 1 - Math.pow(1 - t, 4);
      const next = { x: from.x + (goal.x - from.x) * e, y: from.y + (goal.y - from.y) * e, w: from.w + (goal.w - from.w) * e, h: from.h + (goal.h - from.h) * e };
      current.current = next;
      setBox(next);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target?.name, inView, width, height, base?.x, base?.y, base?.w, base?.h, focusZoom]);

  // Map units per screen-ish pixel, so pins keep their size at any zoom
  const u = box.w / width;

  return (
    <svg ref={ref} viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`} preserveAspectRatio="xMidYMid slice" className={className}>
      {children}
      {pins.map((p) => (
        <g key={p.name}>
          {p.hub && <circle cx={p.x} cy={p.y} r={16 * u} className="fill-white/40" />}
          {p.hub && (
            <circle cx={p.x} cy={p.y} r={14 * u} className="animate-ping fill-white/50 [animation-duration:2.6s] [transform-box:fill-box] [transform-origin:center] motion-reduce:animate-none" />
          )}
          <circle cx={p.x} cy={p.y} r={(p.hub ? 8 : 6) * u} className="fill-white stroke-zinc-950" strokeWidth={p.hub ? 2.5 : 2} vectorEffect="non-scaling-stroke" />
        </g>
      ))}
      {target && (
        <g>
          <circle cx={target.x} cy={target.y} r={22 * u} className="fill-red-600/15" />
          <circle cx={target.x} cy={target.y} r={10 * u} fill="none" className="stroke-red-600" strokeWidth={2.5} vectorEffect="non-scaling-stroke" />
        </g>
      )}
    </svg>
  );
}
