"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Compass, Link2, Rocket, BarChart3, type LucideIcon } from "lucide-react";
import { homeContent } from "@/lib/data";

const { eyebrow, headline, intro, features, closing } = homeContent.whyWorkWithUs;

const iconMap: Record<string, LucideIcon> = {
  compass: Compass,
  link: Link2,
  rocket: Rocket,
  chart: BarChart3,
};

/* Words picked out in red inside the closing statement */
const RED_WORDS = new Set(["disconnected", "services.", "connected", "thinking."]);

/* ------------------------------------------------------------------ */
/* Closing statement: words ink in one by one as the reader scrolls    */
/* ------------------------------------------------------------------ */
function Word({ progress, range, word }: { progress: MotionValue<number>; range: [number, number]; word: string }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className={RED_WORDS.has(word) ? "text-red-600" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

function ClosingReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.4"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className="text-zinc-950 font-black tracking-tight leading-[1.15] max-w-4xl" style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.75rem)" }}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} word={word} />
      ))}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export function WhyWorkWithUs() {
  return (
    <section className="py-20 md:py-32">
      <div className="w-full">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-8 md:mb-10">
          <span className="w-6 h-px bg-red-600" />
          <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-zinc-400 font-medium">{eyebrow}</span>
        </div>

        {/* Headline + intro */}
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 md:gap-16 mb-12 md:mb-16 items-end">
          <h2 className="font-black text-zinc-950 tracking-tight leading-[1.05]" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
            <span className="uppercase">{headline.prefix}</span>{" "}
            <span
              className="text-red-600 font-normal normal-case"
              style={{ fontFamily: "var(--font-holiday), serif", fontSize: "clamp(2.75rem, 6vw, 4.75rem)" }}
            >
              {headline.brand}
            </span>
          </h2>
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed">{intro}</p>
        </div>

        {/* Numbered rows: a red curtain wipes across the row on hover */}
        <div className="mb-16 md:mb-24">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden border-t border-zinc-200 last:border-b"
              >
                {/* Red curtain */}
                <div className="absolute inset-0 bg-red-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />

                <div className="relative grid grid-cols-[auto_1fr] lg:grid-cols-[3.5rem_1.1fr_1fr_auto] items-center gap-x-6 lg:gap-x-10 gap-y-3 py-8 md:py-10 px-2 md:px-4">
                  <span className="text-sm font-black tabular-nums text-red-600 group-hover:text-white/70 transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-black uppercase tracking-tight text-zinc-950 group-hover:text-white text-2xl md:text-3xl xl:text-4xl leading-none transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="col-start-2 lg:col-auto text-zinc-500 group-hover:text-white/85 text-sm md:text-base leading-relaxed max-w-xl transition-colors duration-300">
                    {feature.description}
                  </p>
                  <div className="hidden lg:flex w-12 h-12 rounded-full border border-zinc-200 group-hover:border-white/40 items-center justify-center text-red-600 group-hover:text-white transition-colors duration-300">
                    <Icon size={18} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing statement: scroll-linked word reveal */}
        <ClosingReveal text={closing} />
      </div>
    </section>
  );
}
