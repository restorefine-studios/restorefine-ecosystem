"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { Compass, Palette, TrendingUp, MonitorSmartphone, Cpu, type LucideIcon } from "lucide-react";
import { homeContent } from "@/lib/data";

const { eyebrow, headline, intro, features, poweredBy } = homeContent.framework;

const iconMap: Record<string, LucideIcon> = {
  compass: Compass,
  palette: Palette,
  trending: TrendingUp,
  monitor: MonitorSmartphone,
};

/* Scroll choreography: each discipline owns a slice of the pinned scroll.
 * A layer drops onto the stack at the start of its slice. */
const PHASE_START = 0.06;
const PHASE = 0.22;
const PLATE_GAP = 64;
const PLATE_SIZE = 300;

function activeIndexFor(progress: number) {
  return Math.min(features.length - 1, Math.max(0, Math.floor((progress - PHASE_START) / PHASE)));
}

/* ------------------------------------------------------------------ */
/* One isometric plate in the 3D stack                                 */
/* ------------------------------------------------------------------ */
function Plate({ index, progress, isActive }: { index: number; progress: MotionValue<number>; isActive: boolean }) {
  const start = PHASE_START + index * PHASE;
  const z = useTransform(progress, [start, start + 0.1], [index * PLATE_GAP + 150, index * PLATE_GAP]);
  const opacity = useTransform(progress, [start, start + 0.05], [0, 1]);
  const Icon = iconMap[features[index].icon];

  return (
    <motion.div style={{ z, opacity }} className="absolute inset-0">
      <motion.div
        animate={{
          backgroundColor: isActive ? "#dc2626" : "rgba(255,255,255,0.96)",
          borderColor: isActive ? "#ef4444" : "rgba(255,255,255,0.4)",
          boxShadow: isActive ? "0 0 70px 6px rgba(220,38,38,0.45)" : "0 30px 60px -30px rgba(0,0,0,0.6)",
        }}
        transition={{ duration: 0.35 }}
        className="w-full h-full rounded-[28px] border flex items-start justify-between p-6"
      >
        <div>
          <p className={`text-[10px] font-black tracking-[0.3em] transition-colors duration-300 ${isActive ? "text-white/60" : "text-zinc-400"}`}>
            {String(index + 1).padStart(2, "0")}
          </p>
          <p className={`mt-1 font-black uppercase leading-none text-xl transition-colors duration-300 ${isActive ? "text-white" : "text-zinc-900"}`}>
            {features[index].title}
          </p>
        </div>
        <div
          className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors duration-300 ${
            isActive ? "bg-white/15 border-white/30 text-white" : "bg-zinc-50 border-zinc-200 text-red-600"
          }`}
        >
          <Icon size={18} />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* Dark foundation plate sitting under the four disciplines */
function BasePlate() {
  return (
    <div className="absolute inset-0" style={{ transform: `translateZ(-${PLATE_GAP}px)` }}>
      <div className="relative w-full h-full rounded-[28px] border border-red-600/40 bg-zinc-950 overflow-hidden flex items-center justify-center">
        {/* Circuit-ish dot grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "radial-gradient(circle, rgba(220,38,38,0.6) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
        />
        {/* Pulsing core */}
        <motion.div
          animate={{ opacity: [0.25, 0.7, 0.25], scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-40 h-40 rounded-full bg-red-600/30 blur-2xl"
        />
        <div className="relative flex items-center gap-2 text-red-500">
          <Cpu size={16} />
          <span className="text-[10px] font-black tracking-[0.3em] uppercase">{poweredBy.title}</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop: pinned scroll scene                                        */
/* ------------------------------------------------------------------ */
function DesktopFramework() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(activeIndexFor(v)));

  const stackRotateZ = useTransform(scrollYProgress, [0, 1], [-32, -48]);
  const poweredOpacity = useTransform(scrollYProgress, [0.84, 0.94], [0, 1]);
  const poweredY = useTransform(scrollYProgress, [0.84, 0.94], [20, 0]);

  return (
    <div ref={ref} className="hidden lg:block relative h-[420vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center px-12 xl:px-20">
        {/* Ambient glows: full-bleed layer so they hug the real screen edges,
            not the section-bleed content box */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-red-600/10 blur-[120px]" />
          <div className="absolute -bottom-40 -left-24 w-[24rem] h-[24rem] rounded-full bg-red-600/5 blur-[100px]" />
        </div>

        {/* Header: kept above the 3D scene so plates never cover the text */}
        <div className="relative z-10 grid grid-cols-[1.2fr_1fr] gap-16 items-end mb-12">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-6 h-px bg-red-600" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-medium">{eyebrow}</span>
            </div>
            <h2 className="font-black text-white tracking-tight leading-[1.05]" style={{ fontSize: "clamp(2rem, 3.6vw, 3.25rem)" }}>
              <span className="block uppercase">{headline.prefix}</span>
              <span
                className="block text-red-600 font-normal normal-case whitespace-nowrap"
                style={{ fontFamily: "var(--font-holiday), serif", fontSize: "clamp(2.5rem, 4.8vw, 4.25rem)" }}
              >
                {headline.accent}
              </span>
            </h2>
          </div>
          <p className="text-zinc-400 text-sm xl:text-base leading-relaxed pb-1">{intro}</p>
        </div>

        {/* Steps + 3D stack */}
        <div className="grid grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            {features.map((f, i) => {
              const isActive = i === active;
              return (
                <div key={f.title} className={`border-b py-4 transition-colors duration-300 ${isActive ? "border-red-600/40" : "border-white/10"}`}>
                  <div className="flex items-baseline gap-4">
                    <span className={`text-xs font-black tabular-nums transition-colors duration-300 ${isActive ? "text-red-500" : "text-zinc-600"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={`font-black uppercase tracking-tight transition-all duration-300 ${
                        isActive ? "text-white text-2xl xl:text-3xl" : "text-zinc-600 text-xl"
                      }`}
                    >
                      {f.title}
                    </h3>
                  </div>
                  <motion.div
                    initial={false}
                    animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-red-400 text-sm font-semibold mt-2 pl-8">{f.tagline}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed mt-1 pl-8 max-w-md pb-1">{f.description}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Isometric stack: padded down so the raised top plate stays clear of the header */}
          <div className="flex items-center justify-center pt-28 xl:pt-32" style={{ perspective: 1400 }}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: PLATE_SIZE, height: PLATE_SIZE }}
              className="relative"
            >
              <motion.div
                style={{ rotateX: 55, rotateZ: stackRotateZ, transformStyle: "preserve-3d" }}
                className="absolute inset-0"
              >
                <BasePlate />
                {features.map((_, i) => (
                  <Plate key={i} index={i} progress={scrollYProgress} isActive={i === active} />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Powered by Technology: fades in as the stack completes */}
        <motion.div style={{ opacity: poweredOpacity, y: poweredY }} className="mt-12 flex justify-center">
          <div className="flex items-center gap-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-6 py-3 max-w-3xl">
            <span className="flex items-center gap-2 text-red-500 whitespace-nowrap">
              <Cpu size={14} />
              <span className="text-[10px] font-black tracking-[0.25em] uppercase">{poweredBy.title}</span>
            </span>
            <span className="w-px h-4 bg-white/15 flex-shrink-0" />
            <p className="text-zinc-400 text-xs leading-relaxed">{poweredBy.description}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile: stacked cards with scroll-in animation                      */
/* ------------------------------------------------------------------ */
function MobileFramework() {
  return (
    <div className="lg:hidden px-6 py-20">
      <div className="flex items-center gap-2 mb-6">
        <span className="w-6 h-px bg-red-600" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-medium">{eyebrow}</span>
      </div>
      <h2 className="font-black text-white tracking-tight leading-[1.05] text-4xl">
        <span className="block uppercase">{headline.prefix}</span>
        <span className="block text-red-600 font-normal normal-case text-5xl whitespace-nowrap" style={{ fontFamily: "var(--font-holiday), serif" }}>
          {headline.accent}
        </span>
      </h2>
      <p className="text-zinc-400 text-sm leading-relaxed mt-5 mb-10">{intro}</p>

      <div className="flex flex-col gap-4">
        {features.map((f, i) => {
          const Icon = iconMap[f.icon];
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 32, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <span className="absolute -top-3 right-3 font-black text-white/5 text-7xl select-none">{String(i + 1).padStart(2, "0")}</span>
              <div className="relative w-10 h-10 rounded-xl bg-red-600/15 border border-red-600/30 flex items-center justify-center text-red-500 mb-4">
                <Icon size={18} />
              </div>
              <h3 className="relative font-black uppercase text-white text-xl mb-1">{f.title}</h3>
              <p className="relative text-red-400 text-xs font-semibold mb-2">{f.tagline}</p>
              <p className="relative text-zinc-400 text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          );
        })}

        {/* Powered by Technology */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-red-600/30 bg-zinc-950 p-6"
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(circle, rgba(220,38,38,0.6) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
          />
          <div className="relative flex items-center gap-2 text-red-500 mb-2">
            <Cpu size={14} />
            <span className="text-[10px] font-black tracking-[0.25em] uppercase">{poweredBy.title}</span>
          </div>
          <p className="relative text-zinc-400 text-xs leading-relaxed">{poweredBy.description}</p>
        </motion.div>
      </div>
    </div>
  );
}

export function Framework() {
  return (
    <section className="section-bleed bg-zinc-950">
      <DesktopFramework />
      <MobileFramework />
    </section>
  );
}
