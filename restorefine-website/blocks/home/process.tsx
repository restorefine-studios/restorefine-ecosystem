"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { Phone, Search, Lightbulb, Zap, TrendingUp, type LucideIcon } from "lucide-react";

/* ─── Step data ─────────────────────────────────────────────────────────── */

const steps = [
  {
    number: "01",
    title: "Reach Out",
    description: "We start by listening — understanding your goals and what you're aiming to achieve, so we're fully aligned from day one.",
    Icon: Phone,
  },
  {
    number: "02",
    title: "Evaluate",
    description: "We assess your current situation and ideas, identifying exactly what you need — whether starting fresh or refining what already exists.",
    Icon: Search,
  },
  {
    number: "03",
    title: "Strategize",
    description: "With your needs clear, we craft a tailored plan designed to address your unique challenges and set a clear path for action.",
    Icon: Lightbulb,
  },
  {
    number: "04",
    title: "Transform",
    description: "We execute the plan with precision — bringing your vision to life with quality, care, and attention to every detail.",
    Icon: Zap,
  },
  {
    number: "05",
    title: "Optimize",
    description: "After delivery we don't walk away. We refine based on results, ensuring you get ongoing value and continuous improvement.",
    Icon: TrendingUp,
  },
];

/* ─── Helpers ───────────────────────────────────────────────────────────── */

/** Render the title with the first letter in red (spells RESTO). */
function HighlightTitle({ title }: { title: string }) {
  return (
    <h3 className="text-xl md:text-2xl font-bold text-zinc-950 mb-2 leading-tight">
      <span className="text-red-600">{title[0]}</span>
      {title.slice(1)}
    </h3>
  );
}

/* ─── Mobile step node ──────────────────────────────────────────────────── */

function MobileStepNode({ step, index, total, progress }: { step: (typeof steps)[0]; index: number; total: number; progress: MotionValue<number> }) {
  const { Icon } = step;
  const nodeMid = Math.min(index / (total - 1), 0.95);

  const bgOpacity = useTransform(progress, [nodeMid - 0.001, nodeMid], [0, 1]);
  const iconWhiteOpacity = useTransform(progress, [nodeMid - 0.001, nodeMid], [0, 1]);
  const iconGrayOpacity = useTransform(progress, [nodeMid - 0.001, nodeMid], [1, 0]);

  return (
    <div className="relative flex-none w-11 h-11 shrink-0 z-10">
      <div className="absolute inset-0 rounded-full bg-zinc-100 border-2 border-zinc-200" />
      <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-rose-600 shadow-md shadow-red-200" />
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.span style={{ opacity: iconGrayOpacity }} className="absolute">
          <Icon size={18} className="text-zinc-400" />
        </motion.span>
        <motion.span style={{ opacity: iconWhiteOpacity }} className="absolute">
          <Icon size={18} className="text-white" />
        </motion.span>
      </div>
    </div>
  );
}

/* ─── Individual step card ──────────────────────────────────────────────── */

function StepCard({ step, index, total, isLeft, progress }: { step: (typeof steps)[0]; index: number; total: number; isLeft: boolean; progress: MotionValue<number> }) {
  const { Icon } = step;

  // The node becomes "active" as progress moves through its band.
  // Band: node i is active when progress crosses i/(total-1)
  const nodeMid = index / (total - 1);
  const nodeStart = Math.max(0, nodeMid - 0.08);
  const nodeEnd = Math.min(1, nodeMid + 0.08);

  // Icon container background: zinc-100 → red-500
  const bgOpacity = useTransform(progress, [nodeStart, nodeEnd], [0, 1]);
  // Icon colour opacity (white icon fades in over red bg)
  const iconWhiteOpacity = useTransform(progress, [nodeStart, nodeEnd], [0, 1]);
  // Icon colour opacity (gray icon fades out)
  const iconGrayOpacity = useTransform(progress, [nodeStart, nodeEnd], [1, 0]);

  // Pulse ring that fires once as the node activates
  const ringScale = useTransform(progress, [nodeStart, nodeEnd], [0.5, 2.2]);
  const ringOpacity = useTransform(progress, [nodeStart, nodeMid, nodeEnd], [0, 0.7, 0]);

  // Text: slide in + fade in as the node activates
  const textOpacity = useTransform(progress, [Math.max(0, nodeStart - 0.05), nodeEnd], [0.25, 1]);
  const textX = useTransform(progress, [Math.max(0, nodeStart - 0.1), nodeEnd], [isLeft ? -24 : 24, 0]);

  const textBlock = (
    <motion.div style={{ opacity: textOpacity, x: textX }} className={`max-w-xs ${isLeft ? "text-right" : "text-left"}`}>
      <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 font-medium mb-1">{step.number}</p>
      <HighlightTitle title={step.title} />
      <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>
    </motion.div>
  );

  return (
    <div className="grid grid-cols-[1fr_64px_1fr] md:grid-cols-[1fr_80px_1fr] items-center min-h-[120px] py-6">
      {/* Left slot — desktop only for left-side steps (mobile shows content on the right) */}
      <div className={`${isLeft ? "hidden md:flex justify-end pr-10" : "flex justify-end pr-6 md:pr-10 md:invisible"}`}>{isLeft && textBlock}</div>

      {/* Centre — node, z-10 keeps circles above the drip dot */}
      <div className="flex flex-col items-center justify-center relative z-10">
        <div className="relative flex items-center justify-center">
          {/* Pulse ring */}
          <motion.div style={{ scale: ringScale, opacity: ringOpacity }} className="absolute inset-0 rounded-full bg-red-400" />
          {/* Gray base circle */}
          <div className="absolute inset-0 rounded-full bg-zinc-100 border-2 border-zinc-200" />
          {/* Red fill circle */}
          <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-200" />
          {/* Icons */}
          <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
            <motion.span style={{ opacity: iconGrayOpacity }} className="absolute">
              <Icon size={20} className="text-zinc-400" />
            </motion.span>
            <motion.span style={{ opacity: iconWhiteOpacity }} className="absolute">
              <Icon size={20} className="text-white" />
            </motion.span>
          </div>
        </div>
      </div>

      {/* Right slot — always visible for right-side steps; mobile-only duplicate for left-side steps */}
      <div className={`flex ${!isLeft ? "justify-start pl-6 md:pl-10" : "justify-start pl-6"}`}>
        {!isLeft && textBlock}
        {/* Mobile only: left-side steps show their content here instead of the hidden left slot */}
        {isLeft && (
          <motion.div style={{ opacity: textOpacity, x: textX }} className="max-w-xs text-left md:hidden">
            <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 font-medium mb-1">{step.number}</p>
            <HighlightTitle title={step.title} />
            <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ─── Process section ────────────────────────────────────────────────────── */

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);

  // Track scroll across the whole section so fill runs full duration
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 35%"],
  });

  // Smooth spring — this is the "fluid" feel
  const smooth = useSpring(scrollYProgress, {
    stiffness: 35,
    damping: 18,
    restDelta: 0.001,
  });

  // Header slide-in (separate spring for the header only)
  const headerProgress = useTransform(smooth, [0, 0.12], [0, 1]);
  const headerY = useTransform(headerProgress, [0, 1], [28, 0]);
  const headerOpacity = headerProgress;

  return (
    <section ref={sectionRef} className="section-bleed py-20 md:py-32 overflow-x-clip bg-white">
      {/* Section header */}
      <motion.div style={{ y: headerY, opacity: headerOpacity }} className="flex flex-col items-center text-center mb-16 md:mb-20 gap-y-3">
        <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-medium">How It Works</p>
        <h2 className="text-3xl md:text-5xl font-black text-zinc-950 leading-tight tracking-tight">
          Our <span className="text-red-600" style={{ fontFamily: "var(--font-holiday), serif", fontWeight: 400 }}>Process</span>
        </h2>
        <p className="text-zinc-500 text-sm md:text-base max-w-xs leading-relaxed">
          Our service is as simple as <span className="text-red-600 font-semibold">RESTO</span>
        </p>
        <span className="w-8 h-1 rounded-full bg-red-600 mt-1" />
      </motion.div>

      {/* ── MOBILE layout — progressive spine ── */}
      {/* icon = w-11 (44px), container px-5 (20px) → center at 20+22=42px */}
      <div className="md:hidden relative px-5 max-w-sm mx-auto">
        {/* Gray track spine — aligned to icon center */}
        <div className="absolute top-[22px] bottom-[22px] w-[2px] bg-zinc-100 rounded-full" style={{ left: "calc(1.25rem + 1.375rem - 1px)" }} />

        {/* Red fill spine — driven by same scroll spring as desktop */}
        <motion.div
          aria-hidden
          style={{
            scaleY: smooth,
            transformOrigin: "top",
            left: "calc(1.25rem + 1.375rem - 1px)",
          }}
          className="absolute top-[22px] bottom-[22px] w-[2px] rounded-full bg-gradient-to-b from-red-500 via-red-400 to-rose-500"
        />

        {/* Drip dot */}
        <motion.div
          aria-hidden
          style={{
            top: useTransform(smooth, (v) => `calc(22px + ${v} * (100% - 44px))`),
            opacity: useTransform(smooth, [0.02, 0.1, 0.9, 1], [0, 1, 1, 0]),
            left: "calc(1.25rem + 1.375rem - 6px)",
          }}
          className="absolute w-3 h-3 rounded-full bg-red-500 shadow-md shadow-red-300 z-[1] -translate-y-1/2"
        />

        <div className="flex flex-col gap-0">
          {steps.map((step, i) => (
            <div key={step.number} className="flex items-start gap-5 pb-10 last:pb-0">
              <MobileStepNode step={step} index={i} total={steps.length} progress={scrollYProgress} />
              <div className="pt-1 flex-1 min-w-0">
                <p className="text-[9px] tracking-[0.25em] uppercase text-zinc-400 font-medium mb-1">{step.number}</p>
                <h3 className="text-lg font-bold text-zinc-950 mb-1.5 leading-tight">
                  <span className="text-red-600">{step.title[0]}</span>
                  {step.title.slice(1)}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP layout — zigzag animated roadmap ── */}
      <div ref={roadmapRef} className="hidden md:block relative max-w-3xl mx-auto">
        {/* ── Spine track (gray background line) ── */}
        <div aria-hidden className="absolute left-1/2 -translate-x-1/2 top-[60px] bottom-[60px] w-[2px] bg-zinc-100 rounded-full" />

        {/* ── Spine fill (red fluid line) ── */}
        <motion.div aria-hidden style={{ scaleY: smooth, transformOrigin: "top" }} className="absolute left-1/2 -translate-x-1/2 top-[60px] bottom-[60px] w-[2px] rounded-full bg-gradient-to-b from-red-500 via-red-400 to-rose-500" />

        {/* ── Fluid drip "head" indicator ── */}
        <motion.div
          aria-hidden
          style={{
            top: useTransform(smooth, (v) => `calc(60px + ${v} * (100% - 120px))`),
            opacity: useTransform(smooth, [0.02, 0.1, 0.9, 1], [0, 1, 1, 0]),
          }}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-red-500 shadow-md shadow-red-300 z-[1]"
        />

        {/* ── Steps ── */}
        {steps.map((step, i) => (
          <StepCard key={step.number} step={step} index={i} total={steps.length} isLeft={i % 2 === 0} progress={smooth} />
        ))}
      </div>
    </section>
  );
}
