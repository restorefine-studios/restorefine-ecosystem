"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { homeContent, type PageContent } from "@/lib/homepageData";
import { AccentText } from "./accent-text";
import { EnquireLink } from "./cta-links";
import { type } from "./type-scale";

type Step = PageContent["process"]["steps"][number];

/* One step. Its letter fills red, bottom to top, across its own slice of the
 * section's scroll progress, so R fills first and O completes at the end. */
function ProcessStep({ step, index, total, progress, reduce }: { step: Step; index: number; total: number; progress: MotionValue<number>; reduce: boolean }) {
  const start = index / total;
  const end = (index + 1) / total;
  const fill = useTransform(progress, [start, end], [100, 0]);
  const clipPath = useTransform(fill, (v) => `inset(${v}% 0 0 0)`);
  const textOpacity = useTransform(progress, [start, start + (end - start) * 0.6], [0.35, 1]);

  return (
    <li className="border-t border-zinc-800 pt-6">
      <span aria-hidden="true" className="relative block text-[clamp(5rem,9vw,8.5rem)] font-black leading-[0.85] tracking-[-0.06em] text-zinc-800">
        {step.title.charAt(0)}
        <motion.span className="absolute inset-0 text-red-600" style={reduce ? undefined : { clipPath }}>
          {step.title.charAt(0)}
        </motion.span>
      </span>
      <motion.div style={reduce ? undefined : { opacity: textOpacity }}>
        <h3 className="mt-6 text-2xl font-black uppercase tracking-[-0.03em] text-white">
          <span className="block text-sm font-semibold normal-case tracking-normal tabular-nums text-zinc-500">{step.number}</span>{" "}
          <span className="mt-2 block">{step.title}</span>
        </h3>
        <p className="mt-3 leading-relaxed text-zinc-400">{step.description}</p>
      </motion.div>
    </li>
  );
}

export function Process({ process = homeContent.process }: { process?: PageContent["process"] }) {
  const reduce = Boolean(useReducedMotion());
  const stepsRef = useRef<HTMLOListElement>(null);
  // 0 when the steps enter the lower part of the viewport, 1 once they reach its upper third
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ["start 0.85", "end 0.35"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section className="full-bleed my-8 overflow-hidden rounded-[2.5rem] bg-zinc-950 px-[calc(1.5rem-4px)] py-24 md:px-[calc(3.25rem-4px)] lg:py-32 min-[1201px]:px-[calc(13rem-18px)]">
      <div className="mx-auto max-w-[1400px]">
        <h2 className={`max-w-[18ch] ${type.section} font-black uppercase leading-[0.98] tracking-[-0.04em] text-white`}>{process.heading}</h2>
        <p className="mt-6 text-xl font-bold text-zinc-300 sm:text-2xl">
          <AccentText text={process.lead} accent="RESTO" className="text-[1.6em] text-red-500" />
        </p>

        <ol ref={stepsRef} className="mt-16 grid gap-y-12 sm:grid-cols-2 sm:gap-x-10 lg:mt-20 lg:grid-cols-5 lg:gap-x-8">
          {process.steps.map((step, i) => (
            <ProcessStep key={step.number} step={step} index={i} total={process.steps.length} progress={progress} reduce={reduce} />
          ))}
        </ol>

        <div className="mt-16">
          <EnquireLink {...process.cta} />
        </div>
      </div>
    </section>
  );
}
