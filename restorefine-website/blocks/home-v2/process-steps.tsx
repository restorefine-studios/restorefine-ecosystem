"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import type { PageContent } from "@/lib/homepageData";

type Step = PageContent["process"]["steps"][number];

/* One step. Its letter fills red, bottom to top, across its own slice of the
 * scroll, so R fills first and O completes last (same as the original homepage). */
function ProcessStep({ step, index, total, progress, reduce }: { step: Step; index: number; total: number; progress: MotionValue<number>; reduce: boolean }) {
  const start = index / total;
  const end = (index + 1) / total;
  const fill = useTransform(progress, [start, end], [100, 0]);
  const clipPath = useTransform(fill, (v) => `inset(${v}% 0 0 0)`);
  const textOpacity = useTransform(progress, [start, start + (end - start) * 0.6], [0.4, 1]);
  const letter = step.title.charAt(0);

  return (
    <li className="v2-dash pt-6 text-center text-zinc-300 sm:text-left">
      <span aria-hidden="true" className="relative block font-[family-name:var(--font-display)] text-[clamp(4.5rem,8vw,7.5rem)] font-medium leading-[0.8] tracking-[-0.05em] text-zinc-200">
        {letter}
        <motion.span className="absolute inset-0 text-red-600" style={reduce ? undefined : { clipPath }}>
          {letter}
        </motion.span>
      </span>
      <motion.div style={reduce ? undefined : { opacity: textOpacity }}>
        <h3 className="v2-h3 mt-6 text-zinc-950">{step.title}</h3>
        <p className="v2-small mx-auto mt-3 max-w-[38ch] text-zinc-600 sm:mx-0 sm:max-w-none">{step.description}</p>
      </motion.div>
    </li>
  );
}

export function ProcessSteps({ steps }: { steps: Step[] }) {
  const reduce = Boolean(useReducedMotion());
  const ref = useRef<HTMLOListElement>(null);
  // 0 as the steps enter the lower part of the screen, 1 once they reach its upper third
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.35"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <ol ref={ref} className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step, i) => (
        <ProcessStep key={step.title} step={step} index={i} total={steps.length} progress={progress} reduce={reduce} />
      ))}
    </ol>
  );
}
