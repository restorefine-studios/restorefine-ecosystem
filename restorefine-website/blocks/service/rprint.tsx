"use client";

import Image from "next/image";
import RestoServicesHero from "./resto-services/resto-hero";
import { RestoOverview } from "./resto-services/resto-overview";
import RestoBenefits from "./resto-services/resto-benefits";
import { RestoExpectation } from "./resto-services/resto-expectation";
import printsketch from "@/public/printherobg.svg";
import { Footer } from "@/components/footer";
import { CaseStudiesSection } from "./resto-services/case-studies";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  RotateCcw,
  FlipHorizontal,
  Maximize2,
  X,
  FileText,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Panel {
  src: string;
  label: string;
}

interface MenuDesign {
  id: number;
  name: string;
  format: "trifold" | "bifold";
  label: string;
  tagline: string;
  accent: string;
  bgGrad: string;
  tag: string;
  description: string;
  frontPanels: Panel[];
  backPanels: Panel[];
  pdfUrl: string; // Replace with real PDF path when ready
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const menuDesigns: MenuDesign[] = [
  {
    id: 1,
    name: "Himalayan Kitchen",
    format: "trifold",
    label: "6pp Trifold",
    tagline: "3 panels · front & back",
    accent: "#8B4513",
    bgGrad: "from-amber-950 via-amber-900 to-stone-950",
    tag: "Leather Cover",
    description:
      "A premium 6-panel trifold with a leather-effect cover — designed to unfold and reveal starters, mains, and desserts across each panel. Printed on 350gsm silk with matte laminate.",
    frontPanels: [
      { src: "/himalayan-menu.svg", label: "Inside Left" },
      { src: "/himalayan-menu.svg", label: "Inside Centre" },
      { src: "/himalayan-menu.svg", label: "Front Cover" },
    ],
    backPanels: [
      { src: "/himalayan-menu.svg", label: "Back Cover" },
      { src: "/himalayan-menu.svg", label: "Back Centre" },
      { src: "/himalayan-menu.svg", label: "Back Right" },
    ],
    pdfUrl: "/menus/himalayan-kitchen.pdf",
  },
  {
    id: 2,
    name: "Yew Tree Inn",
    format: "bifold",
    label: "8pp Bifold",
    tagline: "4 panels · 2 spreads",
    accent: "#2d5a27",
    bgGrad: "from-green-950 via-emerald-900 to-stone-950",
    tag: "Matte Lam",
    description:
      "A classic 8-page bifold printed on 300gsm silk — opens to reveal a wide double-spread with mains, drinks, and specials. Perfect for a full British pub menu layout.",
    frontPanels: [
      { src: "/services/print/pexels-julieaagaard-2351274.webp", label: "Inside Left" },
      { src: "/services/print/pexels-julieaagaard-2351274.webp", label: "Inside Right" },
    ],
    backPanels: [
      { src: "/services/print/pexels-ron-lach-8425210.webp", label: "Back Cover" },
      { src: "/services/print/pexels-ron-lach-8425210.webp", label: "Front Cover" },
    ],
    pdfUrl: "/menus/yew-tree-inn.pdf",
  },
  {
    id: 3,
    name: "Fresh Vibe",
    format: "trifold",
    label: "6pp Trifold",
    tagline: "3 panels · front & back",
    accent: "#c0392b",
    bgGrad: "from-red-950 via-rose-900 to-zinc-950",
    tag: "Gloss Cover",
    description:
      "A bold gloss-laminated trifold for a modern café brand. Each panel uses high-contrast photography to anchor sections — drinks on the left, brunch in the center, covers on the right.",
    frontPanels: [
      { src: "/services/print/pexels-anastasia-nagibina-1116204043-29996215.webp", label: "Inside Left" },
      { src: "/services/print/pexels-ron-lach-8425210.webp", label: "Inside Centre" },
      { src: "/services/print/pexels-sofia-gurashvili-2116386591-30452609.webp", label: "Front Cover" },
    ],
    backPanels: [
      { src: "/services/print/pexels-sofia-gurashvili-2116386591-30452609.webp", label: "Back Right" },
      { src: "/services/print/pexels-anastasia-nagibina-1116204043-29996215.webp", label: "Back Centre" },
      { src: "/services/print/pexels-ron-lach-8425210.webp", label: "Back Cover" },
    ],
    pdfUrl: "/menus/fresh-vibe.pdf",
  },
  {
    id: 4,
    name: "Favourites Bistro",
    format: "bifold",
    label: "8pp Bifold",
    tagline: "4 panels · 2 spreads",
    accent: "#7C5CBF",
    bgGrad: "from-violet-950 via-purple-900 to-slate-950",
    tag: "Soft Touch",
    description:
      "A refined bistro bifold with soft-touch laminate — the luxurious feel opens to reveal full-bleed food photography across both inner pages.",
    frontPanels: [
      { src: "/services/print/pexels-sofia-gurashvili-2116386591-30452609.webp", label: "Inside Left" },
      { src: "/services/print/pexels-anastasia-nagibina-1116204043-29996215.webp", label: "Inside Right" },
    ],
    backPanels: [
      { src: "/services/print/pexels-anastasia-nagibina-1116204043-29996215.webp", label: "Back Cover" },
      { src: "/services/print/pexels-sofia-gurashvili-2116386591-30452609.webp", label: "Front Cover" },
    ],
    pdfUrl: "/menus/favourites-bistro.pdf",
  },
];

// ─── Fullscreen PDF Modal ─────────────────────────────────────────────────────

function FullscreenModal({
  design,
  onClose,
}: {
  design: MenuDesign;
  onClose: () => void;
}) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col bg-zinc-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: design.accent + "25" }}
          >
            <FileText className="w-4 h-4" style={{ color: design.accent }} />
          </div>
          <div>
            <p className="text-sm font-black text-white">{design.name}</p>
            <p className="text-[10px] font-medium text-zinc-500">{design.label} · {design.tagline}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={design.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors px-3 py-1.5 rounded-full border border-zinc-700 hover:border-zinc-500"
          >
            Open PDF ↗
          </a>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 relative">
        <iframe
          src={design.pdfUrl}
          title={`${design.name} Menu PDF`}
          className="w-full h-full border-0"
        />
        {/* Fallback overlay when PDF isn't available yet */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 pointer-events-none">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: design.accent + "20" }}
          >
            <FileText className="w-10 h-10" style={{ color: design.accent }} />
          </div>
          <div className="text-center">
            <p className="text-lg font-black text-white uppercase">{design.name}</p>
            <p className="text-sm text-zinc-500 mt-1">{design.label} — PDF will appear here once uploaded</p>
          </div>
          <a
            href={design.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-white border border-zinc-700 px-6 py-3 rounded-full hover:border-zinc-500 transition-colors"
            style={{ color: design.accent, borderColor: design.accent + "50" }}
          >
            Open in new tab <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Control buttons bar (shared) ─────────────────────────────────────────────

function MenuControls({
  open,
  flipped,
  onToggleOpen,
  onToggleFlip,
  onFullscreen,
  openLabel,
  closeLabel,
}: {
  open: boolean;
  flipped: boolean;
  onToggleOpen: () => void;
  onToggleFlip: () => void;
  onFullscreen: () => void;
  openLabel: string;
  closeLabel: string;
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      {/* Unfold / Fold */}
      <button
        onClick={onToggleOpen}
        className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-full border border-zinc-200 text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 transition-all"
      >
        <RotateCcw className="w-3 h-3" />
        {open ? closeLabel : openLabel}
      </button>

      {/* Flip to back / front */}
      <button
        onClick={onToggleFlip}
        className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-full border transition-all ${
          flipped
            ? "border-zinc-900 bg-zinc-900 text-white"
            : "border-zinc-200 text-zinc-500 hover:border-zinc-900 hover:text-zinc-900"
        }`}
      >
        <FlipHorizontal className="w-3 h-3" />
        {flipped ? "Front Side" : "Flip to Back"}
      </button>

      {/* View Full Screen */}
      <button
        onClick={onFullscreen}
        className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-full border border-red-200 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
      >
        <Maximize2 className="w-3 h-3" />
        View Full Menu
      </button>
    </div>
  );
}

// ─── Trifold Visual ───────────────────────────────────────────────────────────

function TrifoldVisual({
  design,
  onFullscreen,
}: {
  design: MenuDesign;
  onFullscreen: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const panels = flipped ? design.backPanels : design.frontPanels;

  return (
    <div className="flex flex-col items-center gap-5">
      <MenuControls
        open={open}
        flipped={flipped}
        onToggleOpen={() => setOpen((v) => !v)}
        onToggleFlip={() => setFlipped((v) => !v)}
        onFullscreen={onFullscreen}
        openLabel="Unfold Menu"
        closeLabel="Fold Menu"
      />

      {/* Side indicator */}
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
          Showing:
        </span>
        <motion.span
          key={flipped ? "back" : "front"}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{
            background: design.accent + "20",
            color: design.accent,
          }}
        >
          {flipped ? "Back Side" : "Front Side"}
        </motion.span>
      </div>

      {/* 3-panel trifold */}
      <div
        className="relative flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        {/* LEFT panel */}
        <motion.div
          className="relative w-[120px] h-[240px] md:w-[140px] md:h-[280px] rounded-l-xl overflow-hidden flex-shrink-0 shadow-xl"
          style={{ transformOrigin: "right center", transformStyle: "preserve-3d" }}
          animate={{ rotateY: open ? 0 : 75 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={flipped ? "back-left" : "front-left"}
              className={`absolute inset-0 bg-gradient-to-br ${design.bgGrad}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={flipped ? "back-left-img" : "front-left-img"}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image src={panels[0].src} alt={panels[0].label} fill className="object-cover opacity-50 mix-blend-luminosity" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 flex flex-col justify-end p-3">
            <p className="text-[8px] font-black uppercase tracking-widest text-white/40">{panels[0].label}</p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-black/20" />
        </motion.div>

        {/* CENTER panel */}
        <div className="relative w-[120px] h-[240px] md:w-[140px] md:h-[280px] overflow-hidden z-10 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={flipped ? "back-mid" : "front-mid"}
              className={`absolute inset-0 bg-gradient-to-br ${design.bgGrad}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={flipped ? "back-mid-img" : "front-mid-img"}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image src={panels[1].src} alt={panels[1].label} fill className="object-cover opacity-60 mix-blend-luminosity" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: design.accent }} />
          <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: design.accent }} />
          <div className="absolute inset-0 flex flex-col justify-between p-3">
            <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full self-start" style={{ background: design.accent + "25", color: design.accent }}>
              {design.tag}
            </span>
            <div>
              <p className="text-[8px] font-black uppercase tracking-widest text-white/40 mb-0.5">{panels[1].label}</p>
              <p className="text-xs font-black uppercase text-white leading-tight">{design.name}</p>
            </div>
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-black/20" />
          <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-black/20" />
        </div>

        {/* RIGHT panel */}
        <motion.div
          className="relative w-[120px] h-[240px] md:w-[140px] md:h-[280px] rounded-r-xl overflow-hidden flex-shrink-0 shadow-xl"
          style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
          animate={{ rotateY: open ? 0 : -75 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={flipped ? "back-right" : "front-right"}
              className={`absolute inset-0 bg-gradient-to-br ${design.bgGrad}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={flipped ? "back-right-img" : "front-right-img"}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image src={panels[2].src} alt={panels[2].label} fill className="object-cover opacity-50 mix-blend-luminosity" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 flex flex-col justify-end p-3">
            <p className="text-[8px] font-black uppercase tracking-widest text-white/40">{panels[2].label}</p>
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-black/20" />
        </motion.div>
      </div>

      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
        {design.label} · {design.tagline}
      </p>
    </div>
  );
}

// ─── Bifold Visual ────────────────────────────────────────────────────────────

function BifoldVisual({
  design,
  onFullscreen,
}: {
  design: MenuDesign;
  onFullscreen: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const panels = flipped ? design.backPanels : design.frontPanels;

  return (
    <div className="flex flex-col items-center gap-5">
      <MenuControls
        open={open}
        flipped={flipped}
        onToggleOpen={() => setOpen((v) => !v)}
        onToggleFlip={() => setFlipped((v) => !v)}
        onFullscreen={onFullscreen}
        openLabel="Open Menu"
        closeLabel="Close Menu"
      />

      {/* Side indicator */}
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Showing:</span>
        <motion.span
          key={flipped ? "back" : "front"}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{ background: design.accent + "20", color: design.accent }}
        >
          {flipped ? "Back Side" : "Front Side"}
        </motion.span>
      </div>

      {/* Bifold panels */}
      <div className="relative flex items-center justify-center" style={{ perspective: "1400px" }}>
        {/* LEFT half */}
        <motion.div
          className="relative w-[140px] h-[220px] md:w-[160px] md:h-[260px] rounded-l-2xl overflow-hidden flex-shrink-0 shadow-2xl"
          style={{ transformOrigin: "right center", transformStyle: "preserve-3d" }}
          animate={{ rotateY: open ? 0 : 90 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.div key={flipped ? "b0" : "f0"} className={`absolute inset-0 bg-gradient-to-br ${design.bgGrad}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div key={flipped ? "b0i" : "f0i"} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <Image src={panels[0].src} alt={panels[0].label} fill className="object-cover opacity-55 mix-blend-luminosity" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-4">
            <p className="text-[8px] font-black uppercase tracking-widest text-white/50">{panels[0].label}</p>
          </div>
        </motion.div>

        {/* Spine */}
        <div className="relative z-20 w-3 h-[220px] md:h-[260px] flex-shrink-0 shadow-xl" style={{ background: design.accent }} />

        {/* RIGHT half (cover — static) */}
        <div className="relative w-[140px] h-[220px] md:w-[160px] md:h-[260px] rounded-r-2xl overflow-hidden flex-shrink-0 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={flipped ? "b1" : "f1"} className={`absolute inset-0 bg-gradient-to-bl ${design.bgGrad}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div key={flipped ? "b1i" : "f1i"} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <Image src={panels[1].src} alt={panels[1].label} fill className="object-cover opacity-60 mix-blend-luminosity" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/30 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: design.accent }} />
          <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: design.accent }} />
          <div className="absolute inset-0 flex flex-col justify-between p-4">
            <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full self-start" style={{ background: design.accent + "25", color: design.accent }}>
              {design.tag}
            </span>
            <div>
              <p className="text-[8px] font-black uppercase tracking-widest text-white/40 mb-0.5">{panels[1].label}</p>
              <p className="text-xs font-black uppercase text-white leading-tight">{design.name}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
        {design.label} · {design.tagline}
      </p>
    </div>
  );
}

// ─── Full showcase card ───────────────────────────────────────────────────────

function MenuCard({
  design,
  isActive,
  direction,
  onFullscreen,
}: {
  design: MenuDesign;
  isActive: boolean;
  direction: number;
  onFullscreen: () => void;
}) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      {isActive && (
        <motion.div
          key={design.id}
          custom={direction}
          initial={{ opacity: 0, x: direction * 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -80 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: visual */}
            <div>
              {design.format === "trifold" ? (
                <TrifoldVisual design={design} onFullscreen={onFullscreen} />
              ) : (
                <BifoldVisual design={design} onFullscreen={onFullscreen} />
              )}
            </div>

            {/* Right: info */}
            <div className="flex flex-col gap-5">
              <span
                className="text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full border self-start"
                style={{ borderColor: design.accent + "40", color: design.accent, background: design.accent + "10" }}
              >
                {design.tag}
              </span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 mb-2">{design.label}</p>
                <h3 className="text-3xl md:text-4xl font-black uppercase text-zinc-900 leading-tight">{design.name}</h3>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">{design.description}</p>

              <div className="grid grid-cols-2 gap-3 mt-2">
                {[
                  { label: "Format", value: design.label },
                  { label: "Panels", value: design.tagline },
                  { label: "Finish", value: "Matte / Gloss / Soft-Touch" },
                  { label: "Turnaround", value: "5–10 working days" },
                ].map((spec) => (
                  <div key={spec.label} className="bg-zinc-50 rounded-xl p-3 border border-zinc-100">
                    <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-black">{spec.label}</p>
                    <p className="text-xs font-semibold text-zinc-800 mt-0.5">{spec.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <Link href="/enquire-now" className="inline-flex items-center gap-2 group self-start">
                  <span className="text-sm font-black uppercase tracking-[0.15em] bg-zinc-900 text-white px-6 py-3 rounded-full group-hover:bg-red-600 transition-colors duration-300">
                    Order This Design
                  </span>
                  <span className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center group-hover:bg-zinc-900 transition-colors duration-300">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </span>
                </Link>
                <button
                  onClick={onFullscreen}
                  className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                  Full PDF
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Menu Showcase section ────────────────────────────────────────────────────

function MenuShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [fullscreenDesign, setFullscreenDesign] = useState<MenuDesign | null>(null);

  const navigate = (newIndex: number) => {
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };

  const prev = () => navigate(activeIndex === 0 ? menuDesigns.length - 1 : activeIndex - 1);
  const next = () => navigate(activeIndex === menuDesigns.length - 1 ? 0 : activeIndex + 1);

  return (
    <>
      {/* Fullscreen PDF modal */}
      <AnimatePresence>
        {fullscreenDesign && (
          <FullscreenModal
            design={fullscreenDesign}
            onClose={() => setFullscreenDesign(null)}
          />
        )}
      </AnimatePresence>

      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-red-600 font-black text-sm">02</span>
            <div className="h-px flex-1 bg-zinc-200" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Our Work</span>
          </motion.div>

          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 leading-[0.95] flex-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Menus That
              <br />
              <span className="text-red-600">Make The Meal.</span>
            </motion.h2>
            <motion.div
              className="max-w-xs flex-shrink-0 flex flex-col gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-sm text-zinc-500 leading-relaxed">
                Unfold, flip to the back, or view the full PDF — interact with each menu design just like the real thing.
              </p>
              <div className="flex gap-2 mt-1">
                <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-500">6pp Trifold</span>
                <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-500">8pp Bifold</span>
              </div>
            </motion.div>
          </div>

          {/* Card area */}
          <div className="relative min-h-[520px]">
            {menuDesigns.map((design, i) => (
              <MenuCard
                key={design.id}
                design={design}
                isActive={i === activeIndex}
                direction={direction}
                onFullscreen={() => setFullscreenDesign(design)}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-14">
            <div className="flex items-center gap-3">
              {menuDesigns.map((design, i) => (
                <button key={design.id} onClick={() => navigate(i)} className="flex items-center gap-2 group">
                  <span className={`rounded-full transition-all duration-300 ${i === activeIndex ? "w-6 h-2.5 bg-zinc-900" : "w-2.5 h-2.5 bg-zinc-200 group-hover:bg-zinc-400"}`} />
                  {i === activeIndex && (
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{design.label}</span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={prev} className="w-12 h-12 rounded-full border border-zinc-200 text-zinc-600 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all duration-300 flex items-center justify-center">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={next} className="w-12 h-12 rounded-full bg-red-600 text-white hover:bg-zinc-900 transition-all duration-300 flex items-center justify-center">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

function RPrint({ data }: { data: any }) {
  return (
    <main className="bg-white">
      <RestoServicesHero
        titletop={data.hero.titletop}
        titlebottom={data.hero.titlebottom}
        description={data.hero.description}
      />

      <div className="relative w-full overflow-hidden h-40 -mt-8 mb-0">
        <Image src={printsketch} alt="resto print sketch" fill className="object-contain opacity-10 animate-pulse" />
      </div>

      <MenuShowcase />

      <RestoOverview {...data.overview} />
      <RestoBenefits
        title={data.benefits.title}
        subtitle={data.benefits.subtitle}
        signature={data.starIcon}
        makeRequest={{ title: "Make Your Request", image: "/services/print/restoprintreq.svg" }}
        receiveRefine={{ title: "Receive and Refine", image: "/services/print/restoprintmedal.svg" }}
      />
      <RestoExpectation
        title={data.expectation.title}
        subtitle={data.expectation.subtitle}
        partnerCard={{ title: "Print with Excellence", gradient: { from: "#ff0000", to: "#a90909" }, backgroundColor: "#ae0404" }}
        typewriterPhrases={data.expectation.typewriterPhrases}
        buildingCard={data.expectation.buildingCard}
        supportCard={data.expectation.supportCard}
        iterationsCard={data.expectation.iterationsCard}
        services={data.expectation.services}
      />

      <CaseStudiesSection
        sectionNumber="04"
        sectionLabel="Case Studies"
        categories={["Menus"]}
      />

      {/* Signature marquee — commented out
      <div className="border-t border-zinc-200 overflow-hidden">
        <div className="flex w-full overflow-x-hidden">
          <div className="animate-marquee-infinite flex min-w-full shrink-0 items-center">
            <Image src={data.signature} alt="signature" width={500} height={500} className="w-full" />
          </div>
          <div className="animate-marquee-infinite flex min-w-full shrink-0 items-center">
            <Image src={data.signature} alt="signature" width={500} height={500} className="w-full" />
          </div>
        </div>
      </div> */}
      <Footer />
    </main>
  );
}

export default RPrint;
