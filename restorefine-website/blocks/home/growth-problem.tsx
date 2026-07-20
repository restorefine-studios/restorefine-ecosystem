"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { homeContent } from "@/lib/data";

const { eyebrow, fragments, headline, body, unifiedTag, closing, cta } = homeContent.growthProblem;

const fragmentStyles = ["-rotate-3 -translate-y-1", "rotate-2 translate-y-1.5", "-rotate-1 -translate-y-0.5"];

/* Diagram nodes: drift scattered at the top of the section, snap into an
 * orbit around the red core as the reader scrolls. Coordinates are % of the
 * square diagram box. */
const NODES = [
  { label: "Brand", scattered: { x: "18%", y: "14%", r: -9 }, connected: { x: "50%", y: "10%", r: 0 } },
  { label: "Marketing", scattered: { x: "78%", y: "26%", r: 7 }, connected: { x: "90%", y: "50%", r: 0 } },
  { label: "Website", scattered: { x: "24%", y: "74%", r: -6 }, connected: { x: "50%", y: "90%", r: 0 } },
  { label: "Strategy", scattered: { x: "74%", y: "82%", r: 10 }, connected: { x: "10%", y: "50%", r: 0 } },
];

const LINE_ENDS: [number, number][] = [
  [50, 10],
  [90, 50],
  [50, 90],
  [10, 50],
];

/* The scroll window (as fractions of section progress) where pieces converge */
const SNAP_START = 0.25;
const SNAP_END = 0.6;

function DiagramNode({
  node,
  progress,
  connected,
}: {
  node: (typeof NODES)[number];
  progress: MotionValue<number>;
  connected: boolean;
}) {
  const left = useTransform(progress, [SNAP_START, SNAP_END], [node.scattered.x, node.connected.x]);
  const top = useTransform(progress, [SNAP_START, SNAP_END], [node.scattered.y, node.connected.y]);
  const rotate = useTransform(progress, [SNAP_START, SNAP_END], [node.scattered.r, node.connected.r]);

  return (
    // Centering lives in motion's x/y: rotate would overwrite class-based translates
    <motion.div style={{ left, top, rotate, x: "-50%", y: "-50%" }} className="absolute z-10">
      <span
        className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold whitespace-nowrap shadow-sm transition-colors duration-500 ${
          connected ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-500"
        }`}
      >
        {node.label}
      </span>
    </motion.div>
  );
}

function ConnectionDiagram({ progress }: { progress: MotionValue<number> }) {
  const [connected, setConnected] = useState(false);
  useMotionValueEvent(progress, "change", (v) => setConnected(v > SNAP_END - 0.05));

  const lineDraw = useTransform(progress, [SNAP_END - 0.05, SNAP_END + 0.2], [0, 1]);
  const lineOpacity = useTransform(progress, [SNAP_END - 0.05, SNAP_END], [0, 1]);
  const coreScale = useTransform(progress, [SNAP_END - 0.1, SNAP_END + 0.1], [0, 1]);

  return (
    // Centered against the full height of the text column
    <div className="h-full flex flex-col justify-center">
      <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
        {/* Connector lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          {LINE_ENDS.map(([x, y], i) => (
            <motion.line
              key={i}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="#dc2626"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: lineDraw, opacity: lineOpacity }}
            />
          ))}
        </svg>

        {/* Red core */}
        <motion.div style={{ scale: coreScale, x: "-50%", y: "-50%" }} className="absolute left-1/2 top-1/2 z-20">
          <span className="inline-flex items-center rounded-full bg-red-600 px-5 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-[0_16px_40px_-12px_rgba(220,38,38,0.5)] whitespace-nowrap">
            One System
          </span>
        </motion.div>

        {/* Discipline chips */}
        {NODES.map((node) => (
          <DiagramNode key={node.label} node={node} progress={progress} connected={connected} />
        ))}
      </div>

      {/* Caption swaps once the pieces snap together */}
      <p className="text-center text-xs tracking-[0.2em] uppercase font-medium mt-6">
        <span className={`transition-colors duration-500 ${connected ? "text-red-600" : "text-zinc-400"}`}>
          {connected ? "Connected. Moving as one." : "Disconnected. Pulling apart."}
        </span>
      </p>
    </div>
  );
}

export function GrowthProblem() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.8", "end 0.7"] });

  return (
    <section ref={sectionRef} className="py-20 md:py-32">
      <div className="w-full">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-10 md:mb-14">
          <span className="w-6 h-px bg-red-600" />
          <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-zinc-400 font-medium">{eyebrow}</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_minmax(360px,440px)] gap-12 xl:gap-24 items-start">
          {/* Text column */}
          <div>
            {/* Scattered fragments, mobile only: the diagram tells this story on desktop */}
            <div className="lg:hidden flex flex-wrap items-center gap-3 mb-8" aria-hidden="true">
              {fragments.map((f, i) => (
                <span
                  key={f}
                  className={`inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-[11px] font-medium text-zinc-500 ${fragmentStyles[i % fragmentStyles.length]}`}
                >
                  {f}
                </span>
              ))}
            </div>

            {/* Headline */}
            <h2 className="leading-tight mb-10 md:mb-14">
              {headline.lead.map((line) => (
                <span key={line} className="block text-zinc-400 font-medium text-lg md:text-2xl leading-snug">
                  {line}
                </span>
              ))}
              <span className="block text-zinc-950 font-black tracking-tight mt-4 md:mt-5" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
                {headline.emphasisPrefix}
              </span>
              <span className="flex flex-wrap items-baseline gap-x-4 mt-1">
                <span className="text-zinc-950 font-black tracking-tight" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
                  {headline.emphasisBlack}
                </span>
                <span
                  className="text-red-600 font-normal leading-none"
                  style={{ fontFamily: "var(--font-holiday), serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
                >
                  {headline.emphasis}
                </span>
              </span>
            </h2>

            {/* Body: two column */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-16">
              {body.map((p) => (
                <p key={p} className="text-zinc-500 text-sm md:text-base leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Resolution: fragments made whole */}
            <div className="border-l-2 border-red-600 pl-6 md:pl-8 max-w-3xl">
              <span className="inline-flex items-center rounded-full bg-red-600 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white mb-4">
                {unifiedTag}
              </span>
              <p className="text-zinc-950 text-lg md:text-2xl font-medium leading-snug">{closing}</p>
            </div>

            {/* CTA */}
            <Link
              href={cta.href}
              className="mt-10 md:mt-12 inline-flex items-center gap-3 bg-red-600 hover:bg-red-500 transition-colors rounded-full px-7 py-4 group"
            >
              <span className="text-white font-semibold text-xs tracking-[0.2em] uppercase">{cta.label}</span>
              <ArrowRight size={14} className="text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Scroll-story diagram, desktop only */}
          <div className="hidden lg:block self-stretch">
            <ConnectionDiagram progress={scrollYProgress} />
          </div>
        </div>
      </div>
    </section>
  );
}
