"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Globe, Printer, Shirt, CreditCard, FileText, ChevronDown, ExternalLink, ArrowRight, Palette, Share2, RotateCcw, FlipHorizontal, Heart, MessageCircle, Send, Play } from "lucide-react";
import ThreeDCardDemo from "@/components/3d-card-demo";
import Link from "next/link";
import Image from "next/image";

const IFRAME_W = 1920;
const IFRAME_H = 1080;

interface PortfolioSite {
  label: string;
  domain: string;
  url: string;
  tag: string;
}

const portfolioSites: PortfolioSite[] = [
  { label: "Yew Tree Inn", domain: "yewtreeinn.com", url: "https://yewtreeinn.com", tag: "Restaurant" },
  { label: "Prime Wash", domain: "prime-wash.co.uk", url: "https://prime-wash.co.uk", tag: "Car Wash" },
  { label: "It's Padel", domain: "itspadel.co.uk", url: "https://www.itspadel.co.uk/", tag: "Racket Sport" },
];

export function BrowserPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSite, setActiveSite] = useState<PortfolioSite>(portfolioSites[0]);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setScale(containerRef.current.offsetWidth / IFRAME_W);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const viewportHeight = scale > 0 ? Math.round(IFRAME_H * scale) : 300;

  return (
    <div ref={containerRef} className="w-full flex flex-col rounded-[24px] border border-black/8 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-100 border-b border-black/8 shrink-0">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 mx-4 relative" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen((o) => !o)} className="w-full flex items-center justify-between gap-2 bg-white hover:bg-red-50 transition-colors rounded-md px-3 py-1 text-zinc-500 text-xs border border-black/8">
            <Globe size={11} className="shrink-0 text-zinc-400" />
            <span className="flex-1 truncate text-center">{activeSite.domain}</span>
            <ChevronDown size={11} className={`shrink-0 text-zinc-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>
          {dropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-white border border-black/10 rounded-xl shadow-xl overflow-hidden">
              {portfolioSites.map((site) => (
                <button
                  key={site.url}
                  onClick={() => {
                    setActiveSite(site);
                    setDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-zinc-50 transition-colors ${activeSite.url === site.url ? "bg-zinc-50" : ""}`}
                >
                  <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <Globe size={10} className="text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-zinc-800 text-xs font-medium truncate">{site.label}</p>
                    <p className="text-zinc-400 text-[10px] truncate">{site.domain}</p>
                  </div>
                  <span className="shrink-0 text-[9px] px-1.5 py-0.5 rounded-full bg-zinc-100 text-zinc-500">{site.tag}</span>
                  {activeSite.url === site.url && <div className="w-1.5 h-1.5 rounded-full bg-[#28c840] shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>
        <a href={activeSite.url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md hover:bg-zinc-200 transition-colors text-zinc-400 hover:text-zinc-700 shrink-0" aria-label="Open in new tab">
          <ExternalLink size={14} />
        </a>
      </div>
      <div className="relative overflow-hidden bg-white" style={{ height: viewportHeight }}>
        {scale > 0 && (
          <iframe
            key={activeSite.url}
            src={activeSite.url}
            title={activeSite.label}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups"
            style={{
              width: IFRAME_W,
              height: IFRAME_H,
              border: "none",
              transformOrigin: "top left",
              transform: `scale(${scale})`,
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        )}
      </div>
    </div>
  );
}

export function IconVisual({ icon, bg }: { icon: React.ReactNode; bg: string }) {
  return (
    <div className={`w-full min-h-[360px] rounded-[24px] ${bg} border border-black/8 flex items-center justify-center relative overflow-hidden`}>
      <div className="text-zinc-300 relative z-10">{icon}</div>
      <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-red-100/30 blur-3xl pointer-events-none" />
      <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-zinc-200/40 blur-3xl pointer-events-none" />
    </div>
  );
}

// ─── Interactive Trifold preview for BentoGrid ─────────────────────────────

const TRIFOLD_FRONT = [
  { src: "/himalayan-menu.svg", label: "Inside Left" },
  { src: "/himalayan-menu.svg", label: "Inside Centre" },
  { src: "/himalayan-menu.svg", label: "Front Cover" },
];
const TRIFOLD_BACK = [
  { src: "/services/print/pexels-anastasia-nagibina-1116204043-29996215.webp", label: "Back Right" },
  { src: "/services/print/pexels-ron-lach-8425210.webp", label: "Back Centre" },
  { src: "/services/print/pexels-julieaagaard-2351274.webp", label: "Back Cover" },
];

export function MenuTrifoldBento() {
  const [open, setOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const panels = flipped ? TRIFOLD_BACK : TRIFOLD_FRONT;
  const accent = "#c0392b";

  return (
    <div className="w-full min-h-[360px] flex flex-col items-center justify-center gap-5 relative px-4 py-6">

      {/* Controls */}
      <div className="relative z-10 flex items-center gap-2 flex-wrap justify-center">
        <button
          onClick={() => setOpen(v => !v)}
          className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-zinc-200 bg-white text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 transition-all shadow-sm"
        >
          <RotateCcw className="w-3 h-3" />
          {open ? "Fold" : "Unfold"}
        </button>
        <button
          onClick={() => setFlipped(v => !v)}
          className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all shadow-sm ${
            flipped ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-900 hover:text-zinc-900"
          }`}
        >
          <FlipHorizontal className="w-3 h-3" />
          {flipped ? "Front" : "Flip"}
        </button>
      </div>

      {/* Side badge */}
      <AnimatePresence mode="wait">
        <motion.span
          key={flipped ? "back" : "front"}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="relative z-10 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{ background: accent + "18", color: accent }}
        >
          {flipped ? "Back Side" : "Front Side"}
        </motion.span>
      </AnimatePresence>

      {/* 3-panel trifold */}
      <div className="relative z-10 flex items-center justify-center" style={{ perspective: "900px" }}>
        {/* LEFT */}
        <motion.div
          className="relative w-[120px] h-[210px] rounded-l-lg overflow-hidden flex-shrink-0 shadow-lg"
          style={{ transformOrigin: "right center", transformStyle: "preserve-3d" }}
          animate={{ rotateY: open ? 0 : 72 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-950 via-amber-900 to-stone-950" />
          <AnimatePresence mode="wait">
            <motion.div key={flipped ? "bl" : "fl"} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <Image src={panels[0].src} alt={panels[0].label} fill className="object-cover opacity-50 mix-blend-luminosity" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 flex flex-col justify-end p-2">
            <p className="text-[7px] font-black uppercase tracking-widest text-white/40">{panels[0].label}</p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-black/20" />
        </motion.div>

        {/* CENTER */}
        <div className="relative w-[120px] h-[210px] overflow-hidden z-10 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-950 via-amber-900 to-stone-950" />
          <AnimatePresence mode="wait">
            <motion.div key={flipped ? "bm" : "fm"} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <Image src={panels[1].src} alt={panels[1].label} fill className="object-cover opacity-60 mix-blend-luminosity" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: accent }} />
          <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: accent }} />
          <div className="absolute inset-0 flex flex-col justify-between p-2">
            <span className="text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full self-start" style={{ background: accent + "25", color: accent }}>Menu</span>
            <div>
              <p className="text-[7px] font-black uppercase tracking-widest text-white/40">{panels[1].label}</p>
              <p className="text-[9px] font-black uppercase text-white leading-tight">Himalayan</p>
            </div>
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-black/20" />
          <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-black/20" />
        </div>

        {/* RIGHT */}
        <motion.div
          className="relative w-[120px] h-[210px] rounded-r-lg overflow-hidden flex-shrink-0 shadow-lg"
          style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
          animate={{ rotateY: open ? 0 : -72 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-950 via-amber-900 to-stone-950" />
          <AnimatePresence mode="wait">
            <motion.div key={flipped ? "br" : "fr"} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <Image src={panels[2].src} alt={panels[2].label} fill className="object-cover opacity-50 mix-blend-luminosity" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 flex flex-col justify-end p-2">
            <p className="text-[7px] font-black uppercase tracking-widest text-white/40">{panels[2].label}</p>
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-black/20" />
        </motion.div>
      </div>

      {/* Label */}
      <p className="relative z-10 text-[9px] font-black uppercase tracking-[0.25em] text-zinc-400">6pp Trifold · click to interact</p>
    </div>
  );
}

// ─── Interactive Social Feed preview for BentoGrid ────────────────────────────

const BENTO_IG = [
  { handle: "@yewtreeinn", image: "/services/print/pexels-julieaagaard-2351274.webp", caption: "Sunday roasts done right. 🍖", likes: "1.4K", comments: "87", accent: "#e63946" },
  { handle: "@itspadel", image: "/services/print/pexels-anastasia-nagibina-1116204043-29996215.webp", caption: "Your vibe, your brand. 🎾", likes: "2.1K", comments: "134", accent: "#3a86ff" },
  { handle: "@primewash", image: "/services/media/pexels-cottonbro-3296434.webp", caption: "Making every moment scroll-worthy. 🎬", likes: "4.2K", comments: "317", accent: "#06d6a0" },
];
const BENTO_TT = [
  { handle: "@yewtreeinn", image: "/services/print/pexels-julieaagaard-2351274.webp", caption: "POV: Sunday roast just landed 👀🍖 #FoodTok", views: "84.2K", likes: "6.1K", accent: "#e63946" },
  { handle: "@itspadel", image: "/services/print/pexels-ron-lach-8425210.webp", caption: "3× engagement growth 👇 #MarketingTok", views: "121K", likes: "9.8K", accent: "#3a86ff" },
  { handle: "@primewash", image: "/services/media/pexels-cottonbro-3296434.webp", caption: "Behind the lens ✨ #ContentCreator", views: "58.7K", likes: "4.3K", accent: "#06d6a0" },
];

export function SocialFeedBento() {
  const [platform, setPlatform] = useState<"ig" | "tt">("ig");
  const [postIdx, setPostIdx] = useState(0);
  const [liked, setLiked] = useState(false);

  const igPost = BENTO_IG[postIdx % BENTO_IG.length];
  const ttPost = BENTO_TT[postIdx % BENTO_TT.length];

  const cyclePost = () => {
    setPostIdx(i => (i + 1) % 3);
    setLiked(false);
  };

  return (
    <div className="w-full min-h-[360px] flex flex-col items-center justify-center gap-4 px-4 py-6">
      {/* Platform tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => { setPlatform("ig"); setLiked(false); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border ${
            platform === "ig"
              ? "bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white border-transparent shadow-sm"
              : "border-zinc-200 text-zinc-400 hover:border-zinc-400 hover:text-zinc-600 bg-white"
          }`}
        >
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.001" strokeWidth={4} /></svg>
          Instagram
        </button>
        <button
          onClick={() => { setPlatform("tt"); setLiked(false); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border ${
            platform === "tt"
              ? "bg-zinc-900 text-white border-zinc-900 shadow-sm"
              : "border-zinc-200 text-zinc-400 hover:border-zinc-400 hover:text-zinc-600 bg-white"
          }`}
        >
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.2 8.2 0 0 0 4.8 1.54V6.84a4.85 4.85 0 0 1-1.04-.15z" /></svg>
          TikTok
        </button>
      </div>

      {/* Mini post card */}
      <AnimatePresence mode="wait">
        {platform === "ig" ? (
          <motion.div
            key={`ig-${postIdx}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-[200px] rounded-2xl overflow-hidden bg-white border border-zinc-100 shadow-md"
          >
            <div className="flex items-center gap-1.5 px-2.5 py-2">
              <div className="w-5 h-5 rounded-full overflow-hidden bg-zinc-100 ring-1 ring-red-100">
                <Image src="/services/branding/pexels-duygugungor-19949505.webp" alt={igPost.handle} width={20} height={20} className="object-cover" />
              </div>
              <p className="text-[9px] font-black text-zinc-800">{igPost.handle}</p>
            </div>
            <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
              <Image src={igPost.image} alt={igPost.caption} fill className="object-cover" />
            </div>
            <div className="px-2.5 pt-2 pb-1 flex items-center gap-2">
              <button onClick={() => setLiked(v => !v)}>
                <Heart className={`w-3.5 h-3.5 transition-all ${liked ? "fill-red-500 text-red-500 scale-125" : "text-zinc-400"}`} />
              </button>
              <MessageCircle className="w-3.5 h-3.5 text-zinc-300" />
              <Send className="w-3.5 h-3.5 text-zinc-300" />
              <span className="text-[8px] text-zinc-400 ml-auto">{liked ? "❤️ liked" : igPost.likes}</span>
            </div>
            <p className="px-2.5 pb-2.5 text-[8px] text-zinc-400 leading-relaxed line-clamp-1">{igPost.caption}</p>
          </motion.div>
        ) : (
          <motion.div
            key={`tt-${postIdx}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative w-[120px] rounded-2xl overflow-hidden bg-zinc-900 shadow-xl"
            style={{ aspectRatio: "9 / 16", maxHeight: 210 }}
          >
            <Image src={ttPost.image} alt={ttPost.caption} fill className="object-cover opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
            <div className="absolute top-2 left-2">
              <span className="text-[7px] font-black text-white/80">{ttPost.handle}</span>
            </div>
            {/* Sidebar */}
            <div className="absolute right-2 bottom-14 flex flex-col items-center gap-3">
              <button onClick={() => setLiked(v => !v)} className="flex flex-col items-center gap-0.5">
                <Heart className={`w-4 h-4 transition-all ${liked ? "fill-red-500 text-red-500 scale-125" : "text-white"}`} />
                <span className="text-[7px] font-semibold text-white/70">{liked ? "🔥" : ttPost.likes}</span>
              </button>
              <MessageCircle className="w-4 h-4 text-white/70" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-2 pb-2">
              <div className="flex items-center gap-1 mb-0.5">
                <Play className="w-2.5 h-2.5 text-white/60 fill-white/60" />
                <span className="text-[7px] text-white/60">{ttPost.views}</span>
              </div>
              <p className="text-[7px] text-white/80 leading-snug line-clamp-2">{ttPost.caption}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next post button + dots */}
      <div className="flex items-center gap-3">
        {[0, 1, 2].map(i => (
          <button key={i} onClick={() => { setPostIdx(i); setLiked(false); }} className={`rounded-full transition-all ${i === postIdx % 3 ? "w-4 h-2 bg-zinc-700" : "w-2 h-2 bg-zinc-200 hover:bg-zinc-400"}`} />
        ))}
      </div>
      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-400">IG & TikTok · click to switch</p>
    </div>
  );
}

// Animated row — tracks scroll, left element slides from left, right from right
function SectionRow({ isEven, isLast, visualBlock, textBlock }: { isEven: boolean; isLast: boolean; visualBlock: React.ReactNode; textBlock: React.ReactNode }) {
  const rowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "center center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  const opacity = useTransform(smoothProgress, [0, 0.45], [0, 1]);
  const xLeft = useTransform(smoothProgress, [0, 1], [-90, 0]);
  const xRight = useTransform(smoothProgress, [0, 1], [90, 0]);

  return (
    <div ref={rowRef} className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 py-14 md:py-20 items-center ${!isLast ? "border-b border-zinc-100" : ""}`}>
      {isEven ? (
        <>
          <motion.div style={{ x: xLeft, opacity }}>{visualBlock}</motion.div>
          <motion.div style={{ x: xRight, opacity }}>{textBlock}</motion.div>
        </>
      ) : (
        <>
          <motion.div className="md:order-2" style={{ x: xRight, opacity }}>
            {visualBlock}
          </motion.div>
          <motion.div className="md:order-1" style={{ x: xLeft, opacity }}>
            {textBlock}
          </motion.div>
        </>
      )}
    </div>
  );
}

interface BentoGridProps {
  headline: string;
  subtext: string;
}

const sections = [
  {
    label: "Websites & Web Apps",
    description: "Stunning, high-converting websites built for the hospitality industry. From sleek restaurant showcases to full web apps with bookings, menus, and ordering — we design, build, and deliver.",
    icon: <Globe size={20} />,
    visual: "browser" as const,
  },
  {
    label: "NFC Smart Cards",
    description: "Tap-to-connect digital business cards that leave a lasting impression. Share your menu, social profiles, and booking links with a single tap — no app needed.",
    icon: <CreditCard size={20} />,
    visual: "nfc" as const,
  },
  {
    label: "Menu & Print Design",
    description: "Premium menus and branded print materials designed to impress every guest. From table cards to full leather-bound booklets — everything on-brand and on-point.",
    icon: <Printer size={20} />,
    visual: "menu" as const,
  },
  // {
  //   label: "Custom Apparel",
  //   description: "High-quality embroidered and printed uniforms your team will love wearing. Staff that look the part become walking brand ambassadors for your venue.",
  //   icon: <Shirt size={20} />,
  //   visual: "apparel" as const,
  // },
  // {
  //   label: "Branded Stationery",
  //   description: "Cohesive stationery suites that reinforce your identity at every touchpoint. Notebooks, letterheads, envelopes — all unified under your brand.",
  //   icon: <FileText size={20} />,
  //   visual: "stationery" as const,
  // },
  {
    label: "Branding",
    description: "A bold, cohesive identity that tells your story at a glance. From logo and colour palette to brand guidelines and asset kits — we craft brands that guests recognise, remember, and return to.",
    icon: <Palette size={20} />,
    visual: "branding" as const,
  },
  {
    label: "Social Media",
    description: "Scroll-stopping content and strategy built around your venue. We handle creative direction, caption writing, and scheduling — so your feed stays fresh and your following keeps growing.",
    icon: <Share2 size={20} />,
    visual: "social" as const,
  },
];

const visualBg: Record<string, string> = {
  menu: "bg-gradient-to-br from-red-50 to-white",
  apparel: "bg-gradient-to-br from-zinc-100 to-white",
  stationery: "bg-gradient-to-br from-red-50 to-white",
  branding: "bg-gradient-to-br from-rose-50 via-orange-50 to-white",
  social: "bg-gradient-to-br from-sky-50 via-violet-50 to-white",
};

const visualIcon: Record<string, React.ReactNode> = {
  menu: <Printer size={80} />,
  apparel: <Shirt size={80} />,
  stationery: <FileText size={80} />,
  branding: <Palette size={80} />,
  social: <Share2 size={80} />,
};

export function BentoGrid({ headline, subtext }: BentoGridProps) {
  return (
    <section className="py-8 md:py-16 overflow-x-clip">
      <div className="flex flex-col items-center text-center mb-12 md:mb-20 gap-y-3">
        <h2 className="max-w-full md:max-w-[50%] text-2xl sm:text-3xl font-black text-zinc-900 md:text-5xl">{headline}</h2>
        <p className="max-w-[80%] md:max-w-[50%] text-sm md:text-base text-zinc-500">{subtext}</p>
      </div>

      <div className="flex flex-col">
        {sections.map((section, index) => {
          const isEven = index % 2 === 0;

          const learnMoreHref =
            section.visual === "browser" ? "/services/website" :
            section.visual === "nfc" ? "/services" :
            section.visual === "menu" ? "/services/menu-print" :
            section.visual === "branding" ? "/services/branding" :
            section.visual === "social" ? "/services/social-media-management" :
            "/services";

          const textBlock = (
            <div className="flex flex-col justify-center gap-5">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600">{section.icon}</div>
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 font-medium mb-2">Service {String(index + 1).padStart(2, "0")}</p>
                <h3 className="text-2xl md:text-3xl font-semibold text-zinc-900 leading-tight">{section.label}</h3>
              </div>
              <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-md">{section.description}</p>
              <Link href={learnMoreHref} className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-500 transition-colors w-fit">
                Learn More <ArrowRight size={14} />
              </Link>
            </div>
          );

          const visualBlock = (
            <div className="w-full">
              {section.visual === "browser" && <BrowserPreview />}
              {section.visual === "nfc" && (
                <div className="flex items-center justify-center min-h-[360px]">
                  <ThreeDCardDemo />
                </div>
              )}
              {section.visual === "menu" && <MenuTrifoldBento />}
              {section.visual === "branding" && <IconVisual icon={visualIcon[section.visual]} bg={visualBg[section.visual]} />}
              {section.visual === "social" && <SocialFeedBento />}
            </div>
          );

          return <SectionRow key={section.label} isEven={isEven} isLast={index === sections.length - 1} visualBlock={visualBlock} textBlock={textBlock} />;
        })}
      </div>
    </section>
  );
}
