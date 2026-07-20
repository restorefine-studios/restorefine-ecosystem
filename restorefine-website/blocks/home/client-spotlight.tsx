"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring, useTransform } from "framer-motion";
import { homeContent } from "@/lib/data";

const clients = homeContent.clientSpotlight;

/* ─── Mobile: swipeable card with prev/next nav buttons ─────────────────── */

function MobileClientSpotlight() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const touchStartX = useRef(0);

  const go = useCallback(
    (next: number) => {
      setDir(next > active ? 1 : -1);
      setActive(next);
    },
    [active],
  );

  const prev = () => go(active === 0 ? clients.length - 1 : active - 1);
  const next = () => go(active === clients.length - 1 ? 0 : active + 1);

  const c = clients[active];

  return (
    <div className="section-bleed lg:hidden bg-zinc-50 pb-14 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col items-center px-5 pt-10 mb-6 text-center">
        <span className="text-red-600 font-black text-lg tracking-widest uppercase">Featured</span>
        <span className="text-sm tracking-[0.3em] uppercase text-zinc-400 font-medium mt-1">Client Spotlights</span>
      </div>

      {/* Big image card, full width, no side padding */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "56vw", minHeight: 220, maxHeight: 340 }}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (dx < -40) next();
          else if (dx > 40) prev();
        }}
      >
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={active}
            custom={dir}
            className="absolute inset-0"
            variants={{
              enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={c.image}
              alt={c.meta.Client}
              fill
              className={c.isSvg ? "object-contain p-12" : "object-cover"}
              style={c.isSvg ? { background: "#0f1a14" } : undefined}
              sizes="100vw"
              priority={active === 0}
            />
            {!c.isSvg && <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />}

            {/* Case badge */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
              <span className="text-[8px] tracking-[0.2em] uppercase text-zinc-700 font-semibold">
                {String(active + 1).padStart(2, "0")} / {String(clients.length).padStart(2, "0")}
              </span>
            </div>

            {/* Client name */}
            {!c.isSvg && (
              <div className="absolute bottom-4 left-5">
                <p className="font-black text-white text-xl uppercase leading-tight drop-shadow">
                  {c.title}{" "}
                  <span className="font-light" style={{ fontFamily: "var(--font-holiday), serif" }}>
                    {c.titleAccent}
                  </span>
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-1.5 px-5 mt-4 mb-5">
        {clients.map((_, i) => (
          <button key={i} onClick={() => go(i)}>
            <motion.div
              animate={{ width: i === active ? 20 : 6, backgroundColor: i === active ? "#dc2626" : "#d4d4d8" }}
              transition={{ duration: 0.3 }}
              className="h-1 rounded-full"
            />
          </button>
        ))}
      </div>

      {/* Text content, animates with card */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={active}
          custom={dir}
          className="px-5 flex flex-col gap-4"
          variants={{
            enter: (d: number) => ({ x: d > 0 ? 30 : -30, opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (d: number) => ({ x: d > 0 ? -30 : 30, opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Title */}
          <div>
            <p className="text-[9px] tracking-[0.35em] uppercase text-red-600 font-semibold mb-2">{c.tag}</p>
            <h3 className="font-black text-zinc-950 text-3xl leading-none tracking-tight">
              <span className="uppercase">{c.title}</span>{" "}
              <span className="font-light text-red-600 normal-case" style={{ fontFamily: "var(--font-holiday), serif" }}>
                {c.titleAccent}
              </span>
            </h3>
          </div>

          <p className="text-zinc-500 text-[13px] leading-relaxed">{c.description}</p>

          <div className="h-px bg-zinc-100" />

          {/* Meta */}
          <div className="flex gap-6">
            {Object.entries(c.meta).map(([k, v]) => (
              <div key={k}>
                <p className="text-[9px] tracking-[0.2em] uppercase text-zinc-400 font-medium mb-1">{k}</p>
                <p className="text-[11px] font-black text-zinc-900">{v}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {c.services.map((s) => (
              <span key={s} className="inline-flex px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-[10px] font-medium text-zinc-600">
                {s}
              </span>
            ))}
          </div>

          {/* CTA */}
          <Link
            href={c.href}
            className="inline-flex items-center justify-center gap-2 w-full rounded-2xl border-2 border-red-600 text-red-600 active:bg-red-50 transition-colors px-5 py-4 text-sm font-bold tracking-wide"
          >
            View Case Study <ArrowUpRight size={15} />
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Big red nav buttons */}
      <div className="flex items-center gap-3 px-5 mt-4">
        <button
          onClick={prev}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-600 active:bg-red-700 transition-colors text-white font-bold text-sm"
        >
          <ChevronLeft size={18} /> Prev
        </button>
        <button
          onClick={next}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-600 active:bg-red-700 transition-colors text-white font-bold text-sm"
        >
          Next <ChevronRight size={18} />
        </button>
      </div>

      <div className="px-5 mt-3">
        <Link href="/portfolio" className="block text-center text-[11px] font-medium text-zinc-400">
          All Projects →
        </Link>
      </div>
    </div>
  );
}

/* ─── Desktop: pinned showcase, scroll advances through the clients ─────── */

function DesktopClientSpotlight() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: pinRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(clients.length - 1, Math.max(0, Math.floor(v * clients.length))));
  });

  /* Continuous cues so the pin never feels like the page has stopped */
  const progressX = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  const hintOpacity = useTransform(scrollYProgress, [0.82, 0.95], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  const c = clients[active];

  return (
    <section className="hidden lg:block bg-white">
      <div ref={pinRef} className="relative h-[320vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center">
          {/* Header */}
          <div className="text-center mb-10 xl:mb-14">
            <h2 className="font-black text-zinc-950 leading-none" style={{ fontSize: "clamp(1.9rem, 3.4vw, 3rem)" }}>
              <span
                className="text-red-600 font-normal normal-case"
                style={{ fontFamily: "var(--font-holiday), serif", fontSize: "clamp(2.4rem, 4.4vw, 3.75rem)" }}
              >
                Proof
              </span>
              , NOT PROMISES.
            </h2>
            <p className="max-w-md mx-auto text-sm text-zinc-500 leading-relaxed mt-4">
              Every business starts in a different place, but sustainable growth follows the same principles. Here&apos;s what that looks like in practice.
            </p>
          </div>

          <div className="grid grid-cols-[2.5rem_1fr_1.25fr] gap-10 xl:gap-16 items-center">
            {/* Progress rail */}
            <div className="flex flex-col gap-5">
              {clients.map((_, i) => {
                const isActive = i === active;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <span className={`text-[11px] font-black tabular-nums transition-colors duration-300 ${isActive ? "text-red-600" : "text-zinc-300"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`h-px bg-red-600 origin-left transition-all duration-500 ease-out ${isActive ? "w-5 opacity-100" : "w-0 opacity-0"}`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Case details */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -28 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-red-600 text-xs font-black uppercase tracking-[0.3em]">{c.tag}</p>
                  <h3 className="font-black text-zinc-950 tracking-tight leading-none mt-3" style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)" }}>
                    <span className="uppercase">{c.title}</span>{" "}
                    <span className="text-red-600 font-normal normal-case" style={{ fontFamily: "var(--font-holiday), serif" }}>
                      {c.titleAccent}
                    </span>
                  </h3>
                  <p className="text-zinc-500 text-sm xl:text-base leading-relaxed mt-6 max-w-md">{c.description}</p>

                  {/* Meta */}
                  <div className="flex gap-10 mt-8 border-t border-zinc-100 pt-6">
                    {Object.entries(c.meta).map(([k, v]) => (
                      <div key={k}>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-medium mb-1">{k}</p>
                        <p className="text-xs font-black text-zinc-900">{v}</p>
                      </div>
                    ))}
                  </div>

                  {/* Services */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {c.services.map((s) => (
                      <span key={s} className="inline-flex px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-[11px] font-medium text-zinc-600">
                        {s}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={c.href}
                    className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-500 transition-colors mt-8 group"
                  >
                    View Case Study
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Image stage: all images stacked, active fades in with a slow zoom.
                The whole stack drifts continuously with scroll (parallax). */}
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-zinc-100">
              <motion.div style={{ y: imageY }} className="absolute inset-0">
                {clients.map((client, i) => (
                  <motion.div
                    key={client.id}
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1.04 : 1.1 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={client.image}
                      alt={`${client.title} ${client.titleAccent}`}
                      fill
                      className={client.isSvg ? "object-contain p-12" : "object-cover"}
                      style={client.isSvg ? { background: "#0f1a14" } : undefined}
                      sizes="55vw"
                    />
                  </motion.div>
                ))}
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Case link */}
              <Link
                href={c.href}
                className="absolute bottom-5 right-5 z-10 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center hover:bg-white/25 transition-colors"
              >
                <ArrowUpRight size={17} className="text-white" />
              </Link>
            </div>
          </div>

          {/* Continuous progress bar + hint: signals there's more to scroll
              through so the pinned section never reads as "the page stopped" */}
          <motion.div style={{ opacity: hintOpacity }} className="flex items-center gap-4 max-w-md mx-auto w-full mt-12 xl:mt-16">
            <div className="relative flex-1 h-px bg-zinc-200 overflow-hidden">
              <motion.div style={{ scaleX: progressX }} className="absolute inset-0 bg-red-600 origin-left" />
            </div>
            <span className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-medium whitespace-nowrap">
              Keep scrolling
              <motion.span animate={{ y: [0, 3, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}>
                <ChevronDown size={12} />
              </motion.span>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function ClientSpotlight() {
  return (
    <>
      <MobileClientSpotlight />
      <DesktopClientSpotlight />
    </>
  );
}
