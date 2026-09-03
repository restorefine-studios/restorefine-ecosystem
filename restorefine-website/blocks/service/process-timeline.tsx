"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

// A single node on the desktop timeline: a bordered circle that fills red
// (crossfading its number to white) once scroll progress reaches its band.
function ProcessNode({
  step,
  index,
  total,
  progress,
}: {
  step: ProcessStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const nodeMid = total > 1 ? index / (total - 1) : 0;
  const nodeStart = Math.max(0, nodeMid - 0.08);
  const nodeEnd = Math.min(1, nodeMid + 0.08);

  const fillOpacity = useTransform(progress, [nodeStart, nodeEnd], [0, 1]);
  const darkOpacity = useTransform(progress, [nodeStart, nodeEnd], [1, 0]);

  return (
    <div className="relative flex flex-col items-center text-center px-2">
      <div className="relative w-12 h-12 mb-6 flex-shrink-0">
        <div className="absolute inset-0 rounded-full bg-zinc-50 border-2 border-zinc-900" />
        <motion.div
          style={{ opacity: fillOpacity }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-200"
        />
        <div className="relative w-full h-full flex items-center justify-center font-black text-sm">
          <motion.span style={{ opacity: darkOpacity }} className="absolute text-zinc-900">
            {step.number}
          </motion.span>
          <motion.span style={{ opacity: fillOpacity }} className="absolute text-white">
            {step.number}
          </motion.span>
        </div>
      </div>
      <h3 className="mb-2 text-sm font-black uppercase tracking-wide text-zinc-900">{step.title}</h3>
      <p className="text-sm leading-relaxed text-zinc-500 max-w-[16rem]">{step.description}</p>
    </div>
  );
}

// Horizontal process timeline shared by the Brand/Content/Performance pillar
// pages. Below `lg` it falls back to a plain 2-column grid (no connecting
// line — a single row across N steps doesn't fit, and a wrapped line would
// need its own layout). At `lg` and up it renders one row with a track that
// fills red and a dot that travels along it as the section scrolls.
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 80%", "end 40%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 35, damping: 18, restDelta: 0.001 });

  const total = steps.length;
  const inset = 50 / total; // % — matches the center of a `1fr` column when its content is centered
  const span = 100 - 2 * inset;

  const dotLeft = useTransform(smooth, (v) => `calc(${inset}% + ${v} * ${span}%)`);
  const dotOpacity = useTransform(smooth, [0.02, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div>
      {/* Mobile/tablet — plain grid, no line */}
      <div className="grid grid-cols-2 lg:hidden gap-x-8 gap-y-12">
        {steps.map((step) => (
          <div key={step.number} className="relative">
            <div className="relative z-10 w-12 h-12 rounded-full bg-zinc-50 border-2 border-zinc-900 flex items-center justify-center font-black text-sm text-zinc-900 mb-6">
              {step.number}
            </div>
            <h3 className="mb-2 text-sm font-black uppercase tracking-wide text-zinc-900">{step.title}</h3>
            <p className="text-sm leading-relaxed text-zinc-500">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Desktop — single row, scroll-filled connecting line + travelling dot */}
      <div ref={trackRef} className="hidden lg:block relative">
        <div aria-hidden className="absolute top-6 h-px bg-zinc-200" style={{ left: `${inset}%`, right: `${inset}%` }} />
        <motion.div
          aria-hidden
          style={{ left: `${inset}%`, right: `${inset}%`, scaleX: smooth, transformOrigin: "left" }}
          className="absolute top-6 h-px bg-gradient-to-r from-red-500 via-red-400 to-rose-500"
        />
        <motion.div
          aria-hidden
          style={{ left: dotLeft, opacity: dotOpacity, top: "1.5rem" }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-red-500 shadow-md shadow-red-300 z-[1]"
        />

        <div className="grid gap-x-8" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}>
          {steps.map((step, i) => (
            <ProcessNode key={step.number} step={step} index={i} total={total} progress={smooth} />
          ))}
        </div>
      </div>
    </div>
  );
}
