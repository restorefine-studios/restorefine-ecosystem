"use client";

import React, { useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

const clients = [
  {
    id: "itspadel",
    title: "It's",
    titleRed: "Padel.",
    image: "/clients/itspadel-bg.png",
    isSvg: false,
    meta: { Client: "It's Padel", Industry: "Sports & Recreation", Year: "2024–25" },
    services: ["Branding", "Web Development", "Social Media", "Video Production"],
    description: "Building a digital presence for a fast-growing padel academy — from brand identity to full web build and social content.",
    href: "/portfolio/itspadel",
  },
  {
    id: "saladclub",
    title: "Salad",
    titleRed: "Club.",
    image: "/clients/saladclub-bg.png",
    isSvg: false,
    meta: { Client: "Salad Club", Industry: "Food & Beverage", Year: "2025" },
    services: ["Logo Design", "Brand Identity", "Brand Guidelines"],
    description: "A full brand identity for a health-first salad concept — logo, colour system, and guidelines ready for launch.",
    href: "/portfolio/saladclub",
  },
  {
    id: "yewtreeinn",
    title: "Yew Tree",
    titleRed: "Inn.",
    image: "/clients/yew-tree-inn-logo.svg",
    isSvg: true,
    meta: { Client: "Yew Tree Inn", Industry: "Hospitality", Year: "2025" },
    services: ["Logo Design", "Branding", "Website Development", "Social Media Design"],
    description: "Bringing a classic British country inn into the digital age with a refined brand and a new website.",
    href: "/portfolio/yewtreeinn",
  },
];

function MobileCaseStudy() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const touchStartX = useRef(0);

  const go = useCallback((next: number) => {
    setDir(next > active ? 1 : -1);
    setActive(next);
  }, [active]);

  const prev = () => go(active === 0 ? clients.length - 1 : active - 1);
  const next = () => go(active === clients.length - 1 ? 0 : active + 1);

  const c = clients[active];

  return (
    <div className="section-bleed md:hidden bg-zinc-50 pb-14 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col items-center px-5 pt-10 mb-6 text-center">
        <span className="text-red-600 font-black text-lg tracking-widest uppercase">Featured</span>
        <span className="text-sm tracking-[0.3em] uppercase text-zinc-400 font-medium mt-1">Client Spotlights</span>
      </div>

      {/* Big image card — full width, no side padding */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "56vw", minHeight: 220, maxHeight: 340 }}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
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
                  <span className="font-light" style={{ fontFamily: "var(--font-holiday), serif" }}>{c.titleRed}</span>
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

      {/* Text content — animates with card */}
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
            <p className="text-[9px] tracking-[0.35em] uppercase text-red-600 font-semibold mb-2">
              Client Spotlight
            </p>
            <h3 className="font-black uppercase text-zinc-950 text-3xl leading-none tracking-tight">
              {c.title}{" "}
              <span className="font-light text-red-600" style={{ fontFamily: "var(--font-holiday), serif" }}>
                {c.titleRed}
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
          <Link href={c.href} className="inline-flex items-center justify-center gap-2 w-full rounded-2xl border-2 border-red-600 text-red-600 active:bg-red-50 transition-colors px-5 py-4 text-sm font-bold tracking-wide">
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

export function FeaturedCaseStudy() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: desktopRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(Math.floor(v * clients.length), clients.length - 1);
    setActiveIndex(next);
  });

  const client = clients[activeIndex];
  const nextClient = clients[(activeIndex + 1) % clients.length];

  return (
    <div>
      {/* ── MOBILE — swipeable single card ── */}
      <MobileCaseStudy />

      {/* ── DESKTOP — sticky scroll ── */}
      <div className="section-bleed hidden md:block bg-zinc-50">
        <div ref={desktopRef} style={{ height: "300vh" }}>
          <div className="sticky top-0 h-screen flex overflow-hidden">

            {/* ════════════════════════════════════
                LEFT — stacked image cards, flush left
            ════════════════════════════════════ */}

{/* Card column — landscape rectangle cards */}
            <div className="relative flex-shrink-0" style={{ width: "48vw" }}>

              {/* ── STACK CARD 3 (deepest ghost) — no transform conflict ── */}
              <div
                className="absolute rounded-[1.5rem] bg-zinc-200/60"
                style={{ top: "19vh", bottom: "23vh", left: "24px", right: "16px", zIndex: 1 }}
              />

              {/* ── STACK CARD 2 — next card peeking above ── */}
              <div
                className="absolute rounded-[1.5rem] overflow-hidden"
                style={{ top: "21vh", bottom: "21vh", left: "14px", right: "10px", zIndex: 2 }}
              >
                <Image
                  src={nextClient.image}
                  alt={nextClient.meta.Client}
                  fill
                  className={nextClient.isSvg ? "object-contain p-12" : "object-cover"}
                  sizes="48vw"
                />
                <div className="absolute inset-0 bg-white/70" />
              </div>

              {/* ── MAIN CARD — landscape, x-only animation (no transform conflict) ── */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="absolute rounded-[1.5rem] overflow-hidden"
                  style={{ top: "23vh", bottom: "19vh", left: "4px", right: "4px", zIndex: 3 }}
                  initial={{ x: "-105vw" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-105vw", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  {client.isSvg ? (
                    <div className="absolute inset-0 bg-zinc-100 flex items-center justify-center p-20">
                      <Image src={client.image} alt={client.meta.Client} fill className="object-contain p-20" sizes="52vw" />
                    </div>
                  ) : (
                    <>
                      <Image src={client.image} alt={client.meta.Client} fill className="object-cover" sizes="52vw" priority={activeIndex === 0} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    </>
                  )}

                  {/* Case badge */}
                  <div className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3.5 py-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                    <span className="text-[8px] tracking-[0.25em] uppercase text-zinc-700 font-semibold">
                      Case Study {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Client name bottom-left on photo */}
                  {!client.isSvg && (
                    <div className="absolute bottom-7 left-7 z-10">
                      <p className="font-black text-white text-2xl uppercase leading-tight tracking-tight drop-shadow-md">
                        {client.title}{" "}
                        <span className="font-light" style={{ fontFamily: "var(--font-holiday), serif" }}>
                          {client.titleRed}
                        </span>
                      </p>
                    </div>
                  )}

                  {/* Arrow button bottom-right */}
                  <Link
                    href={client.href}
                    className="absolute bottom-7 right-7 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/40 transition-colors group"
                  >
                    <ArrowUpRight size={16} className="text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Stack dots — bottom, below card */}
              <div className="absolute bottom-6 left-4 z-10 flex items-center gap-2">
                {clients.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      width: i === activeIndex ? 24 : 6,
                      backgroundColor: i === activeIndex ? "#dc2626" : "#d4d4d8",
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-1 rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* ════════════════════════════════════
                RIGHT — text panel
            ════════════════════════════════════ */}
            <div className="flex-1 h-full bg-zinc-50 flex flex-col justify-center pl-12 pr-12 xl:pl-16 xl:pr-16 relative">

              {/* Top meta */}
              <div className="absolute top-10 left-14 xl:left-20 right-12 flex items-center justify-between">
                <span className="text-[8px] tracking-[0.35em] uppercase text-zinc-300 font-medium">
                  Selected Work
                </span>
                <Link
                  href="/portfolio"
                  className="group inline-flex items-center gap-1.5 text-[8px] tracking-[0.25em] uppercase text-zinc-400 hover:text-red-600 transition-colors font-medium"
                >
                  All Projects
                  <ArrowUpRight size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

              {/* Main content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Index */}
                  <p className="text-[9px] tracking-[0.4em] uppercase text-red-600 font-semibold mb-6">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(clients.length).padStart(2, "0")} — Client Spotlight
                  </p>

                  {/* Title */}
                  <div className="mb-5">
                    <h2
                      className="font-black uppercase text-zinc-950 leading-none tracking-tight"
                      style={{ fontSize: "clamp(2rem, 4vw, 3.75rem)", lineHeight: 0.92 }}
                    >
                      {client.title}
                    </h2>
                    <h2
                      className="font-light text-red-600 leading-tight"
                      style={{
                        fontSize: "clamp(2rem, 4vw, 3.75rem)",
                        lineHeight: 1.05,
                        fontFamily: "var(--font-holiday), serif",
                      }}
                    >
                      {client.titleRed}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-[30ch]">
                    {client.description}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-zinc-100 mb-6" />

                  {/* Meta */}
                  <div className="flex gap-8 mb-6">
                    {Object.entries(client.meta).map(([k, v]) => (
                      <div key={k}>
                        <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-400 font-medium mb-1.5">{k}</p>
                        <p className="text-[13px] font-black text-zinc-950">{v}</p>
                      </div>
                    ))}
                  </div>

                  {/* Services */}
                  <div className="flex flex-wrap gap-1.5 mb-10">
                    {client.services.map((s, i) => (
                      <motion.span
                        key={s}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="inline-flex items-center px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-[9px] font-medium text-zinc-600"
                      >
                        {s}
                      </motion.span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={client.href}
                    className="inline-flex items-center gap-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors px-6 py-3 text-[11px] font-medium text-white tracking-wide"
                  >
                    View Case Study <ArrowUpRight size={13} />
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Bottom hint */}
              <div className="absolute bottom-9 left-14 xl:left-20">
                <p className="text-[8px] tracking-[0.3em] uppercase text-zinc-300 font-medium">
                  Scroll to explore
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
