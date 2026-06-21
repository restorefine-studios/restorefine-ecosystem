"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Globe, Printer, Palette, Share2, ChevronDown, Package, Video, Rocket, LayoutList, Camera, Search, TrendingUp, Target, BarChart3, Shirt, Layers } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-cards";
import ThreeDCardDemo from "@/components/3d-card-demo";
import { BrowserPreview, MenuTrifoldBento, SocialFeedBento, IconVisual } from "./properties";

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

interface BentoService {
  label: string;
  description: string;
  icon: React.ReactNode;
  visual: "browser" | "nfc" | "menu" | "branding" | "social" | "icon" | "reel";
  iconBg?: string;
  iconAccent?: string;
  tags?: string[];
  href: string;
}

const pillars = [
  {
    id: 0,
    title: "Brand",
    description: "We craft identities that speak before you say a word — logos, colour systems, typography, and brand guidelines built to own your niche.",
    image: "/services-brand.jpg",
    href: "/services",
    bentoServices: [
      {
        label: "Branding",
        description: "A bold, cohesive identity that tells your story at a glance. From logo and colour palette to brand guidelines and asset kits — we craft brands that guests recognise, remember, and return to.",
        icon: <Palette size={20} />,
        visual: "branding" as const,
        href: "/services/brand",
      },
      {
        label: "Menu Design & Print",
        description: "Premium menus and branded print materials designed to impress every guest. From table cards to full leather-bound booklets — everything on-brand and on-point.",
        icon: <Printer size={20} />,
        visual: "menu" as const,
        href: "/services/brand",
      },
      {
        label: "Packaging",
        description: "Branded packaging that turns every takeaway into a marketing moment. Custom boxes, bags, and wrapping that carry your identity far beyond the four walls of your venue.",
        icon: <Package size={20} />,
        visual: "icon" as const,
        iconBg: "bg-orange-50",
        iconAccent: "bg-orange-100 border border-orange-200 text-orange-600",
        tags: ["Custom Boxes", "Branded Bags", "Takeaway Wrapping", "Eco Packaging"],
        href: "/services/brand",
      },
      {
        label: "Social Branding",
        description: "A consistent, polished presence across every platform. Profile imagery, highlight covers, story templates, and feed grids that make your brand unmistakable on social.",
        icon: <Layers size={20} />,
        visual: "social" as const,
        href: "/services/brand",
      },
      {
        label: "Merchandise",
        description: "On-brand merchandise your team is proud to wear and your guests want to take home. From staff uniforms to retail pieces — everything designed to reinforce your brand.",
        icon: <Shirt size={20} />,
        visual: "icon" as const,
        iconBg: "bg-zinc-100",
        iconAccent: "bg-zinc-200 border border-zinc-300 text-zinc-700",
        tags: ["Staff Uniforms", "Branded Apparel", "Retail Pieces", "Tote Bags"],
        href: "/services/brand",
      },
    ] as BentoService[],
  },
  {
    id: 1,
    title: "Content",
    description: "Scroll-stopping reels, photography, and campaigns that turn followers into bookings. Every frame shot with intention.",
    image: "/content-card-img.png",
    href: "/services",
    bentoServices: [
      {
        label: "Short-form Content",
        description: "Reels, TikToks, and short videos that capture the energy of your venue and keep audiences coming back for more. Shot, edited, and optimised for every platform.",
        icon: <Video size={20} />,
        visual: "reel" as const,
        href: "/services/content",
      },
      {
        label: "Social Media Management",
        description: "Scroll-stopping content and strategy built around your venue. We handle creative direction, caption writing, and scheduling — so your feed stays fresh and your following keeps growing.",
        icon: <Share2 size={20} />,
        visual: "social" as const,
        href: "/services/content",
      },
      {
        label: "Launch Campaigns",
        description: "Full-scale launch content for new venues, menu drops, and seasonal events. We build the buzz before the doors open and keep the momentum going long after.",
        icon: <Rocket size={20} />,
        visual: "icon" as const,
        iconBg: "bg-indigo-50",
        iconAccent: "bg-indigo-100 border border-indigo-200 text-indigo-600",
        tags: ["Grand Openings", "Menu Drops", "Seasonal Events", "Teaser Campaigns"],
        href: "/services/launch-campaigns",
      },
      {
        label: "Content Strategy",
        description: "A clear roadmap for what to post, when, and why. We map your content calendar to your business goals so every piece of content has purpose and drives results.",
        icon: <LayoutList size={20} />,
        visual: "icon" as const,
        iconBg: "bg-zinc-100",
        iconAccent: "bg-zinc-200 border border-zinc-300 text-zinc-700",
        tags: ["Content Calendar", "Audience Research", "Brand Voice", "Post Scheduling"],
        href: "/services/content",
      },
      {
        label: "Photography",
        description: "Professional food, venue, and lifestyle photography that makes your brand look as good as it tastes. Every shot is styled, lit, and edited to convert browsers into diners.",
        icon: <Camera size={20} />,
        visual: "icon" as const,
        iconBg: "bg-amber-50",
        iconAccent: "bg-amber-100 border border-amber-200 text-amber-600",
        tags: ["Food Photography", "Venue Shoots", "Lifestyle", "Retouching"],
        href: "/services/content",
      },
    ] as BentoService[],
  },
  {
    id: 2,
    title: "Performance",
    description: "Websites, SEO, and data-driven paid campaigns that put your venue in front of hungry audiences at the exact right moment.",
    image: "/services-performance.jpg",
    href: "/services",
    bentoServices: [
      {
        label: "Websites",
        description: "Stunning, high-converting websites built for the hospitality industry. From sleek restaurant showcases to full web apps with bookings, menus, and ordering — we design, build, and deliver.",
        icon: <Globe size={20} />,
        visual: "browser" as const,
        href: "/services/performance",
      },
      {
        label: "SEO",
        description: "Get found by the guests who are already looking for you. We optimise your site so you rank at the top of local search — from Google Business to on-page content.",
        icon: <Search size={20} />,
        visual: "icon" as const,
        iconBg: "bg-emerald-50",
        iconAccent: "bg-emerald-100 border border-emerald-200 text-emerald-600",
        tags: ["Local SEO", "Google Business", "On-page SEO", "Link Building"],
        href: "/services/performance",
      },
      {
        label: "Paid Ads",
        description: "Targeted Meta and Google ad campaigns that drive real covers and real revenue. Every campaign is built around your goals, your audience, and your ROI.",
        icon: <TrendingUp size={20} />,
        visual: "icon" as const,
        iconBg: "bg-blue-50",
        iconAccent: "bg-blue-100 border border-blue-200 text-blue-600",
        tags: ["Meta Ads", "Google Ads", "Retargeting", "A/B Testing"],
        href: "/services/performance",
      },
      {
        label: "Conversion Optimisation",
        description: "Turn website visitors into paying guests. We analyse your site's journey and remove every friction point — from landing page copy to booking flow — so more clicks become customers.",
        icon: <Target size={20} />,
        visual: "icon" as const,
        iconBg: "bg-red-50",
        iconAccent: "bg-red-100 border border-red-200 text-red-600",
        tags: ["Landing Pages", "Booking Flow", "CTA Design", "User Journey"],
        href: "/services/performance",
      },
      {
        label: "Analytics",
        description: "Clear, actionable reporting that shows exactly what's working. Monthly dashboards covering traffic, bookings, ad spend, and social performance — so decisions are driven by data, not guesswork.",
        icon: <BarChart3 size={20} />,
        visual: "icon" as const,
        iconBg: "bg-zinc-100",
        iconAccent: "bg-zinc-200 border border-zinc-300 text-zinc-700",
        tags: ["Monthly Reports", "Traffic Analysis", "Ad Spend ROI", "Social Insights"],
        href: "/services/performance",
      },
    ] as BentoService[],
  },
];

/* ------------------------------------------------------------------ */
/* Short-form reel visual — animated black "video" box                 */
/* ------------------------------------------------------------------ */
const REEL_SUBTITLES = [
  ["Your", "food.", "Our", "lens."],
  ["Built", "for", "the", "scroll."],
  ["Reels", "that", "fill", "seats."],
  ["Content", "that", "converts."],
];

type Floater = { id: number; emoji: string; xOff: number };

function ShortFormReelVisual() {
  const [phase, setPhase] = useState(0);
  const [wordIdx, setWordIdx] = useState(-1);
  const [likes, setLikes] = useState(24312);
  const [floaters, setFloaters] = useState<Floater[]>([]);
  const floaterIdRef = useRef(0);

  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % 4), 3800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setWordIdx(-1);
    const words = REEL_SUBTITLES[phase % REEL_SUBTITLES.length];
    let i = 0;
    const t = setInterval(() => {
      setWordIdx(i);
      i++;
      if (i >= words.length) clearInterval(t);
    }, 380);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    const t = setInterval(() => setLikes((l) => l + Math.floor(Math.random() * 5 + 1)), 900);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const EMOJIS = ["❤️", "🔥", "😍", "👏", "✨", "🍽️"];
    const t = setInterval(() => {
      const id = floaterIdRef.current++;
      const xOff = (id % 3) * 8 - 8;
      setFloaters((f) => [...f.slice(-5), { id, emoji: EMOJIS[id % EMOJIS.length], xOff }]);
    }, 1400);
    return () => clearInterval(t);
  }, []);

  const subtitle = REEL_SUBTITLES[phase % REEL_SUBTITLES.length];

  return (
    <div className="w-full min-h-[360px] rounded-[24px] bg-black overflow-hidden relative flex flex-col select-none">
      {/* Progress bar */}
      <motion.div
        key={phase}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 3.8, ease: "linear" }}
        style={{ originX: 0 }}
        className="absolute top-0 left-0 right-0 h-[3px] bg-red-500 z-20"
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none z-10" />

      {/* Profile row */}
      <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white text-[9px] font-bold">RR</div>
        <span className="text-white text-xs font-semibold drop-shadow">@yourrestaurant</span>
        <span className="text-[9px] text-white/50 border border-white/20 rounded-full px-2 py-0.5">Follow</span>
      </div>

      {/* Engagement sidebar */}
      <div className="absolute right-4 bottom-20 z-20 flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-1">
          <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-base">❤️</div>
          <span className="text-white text-[10px] font-semibold tabular-nums">{(likes / 1000).toFixed(1)}K</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-base">💬</div>
          <span className="text-white text-[10px] font-semibold">483</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-sm font-bold text-white/70">↗</div>
          <span className="text-white text-[10px] font-semibold">Share</span>
        </div>
      </div>

      {/* Floating emoji reactions */}
      <AnimatePresence>
        {floaters.map((f) => (
          <motion.span
            key={f.id}
            initial={{ opacity: 1, y: 0, x: 0 }}
            animate={{ opacity: 0, y: -110, x: f.xOff }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute text-lg z-30 pointer-events-none"
            style={{ right: "1.3rem", bottom: "8.5rem" }}
          >
            {f.emoji}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Centre: phase cycling content */}
      <div className="flex-1 flex items-center justify-center relative z-20 pt-10">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.div
              key="drop"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35 }}
              className="text-center px-10"
            >
              <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-2">New Drop</p>
              <p className="text-white font-black leading-none" style={{ fontSize: "clamp(2rem, 5vw, 2.75rem)" }}>
                SUMMER<br />MENU 🔥
              </p>
            </motion.div>
          )}
          {phase === 1 && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-6 px-8"
            >
              <div className="text-center">
                <p className="text-red-400 font-black text-3xl leading-none">2.4M</p>
                <p className="text-white/40 text-[9px] uppercase tracking-widest mt-1">Views</p>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div className="text-center">
                <p className="text-red-400 font-black text-3xl leading-none">↑847%</p>
                <p className="text-white/40 text-[9px] uppercase tracking-widest mt-1">Reach</p>
              </div>
            </motion.div>
          )}
          {phase === 2 && (
            <motion.div
              key="location"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.35 }}
              className="px-8 w-full max-w-xs"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3">
                <p className="text-white font-semibold text-sm">📍 London, UK</p>
                <p className="text-white/50 text-[11px] mt-0.5">Shot & edited by RestoRefine</p>
              </div>
            </motion.div>
          )}
          {phase === 3 && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="text-center px-8"
            >
              <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-2">Ready to go viral?</p>
              <p className="text-white font-black text-2xl leading-snug">
                Book a<br />Content Day →
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Karaoke subtitle */}
      <div className="absolute bottom-5 left-5 right-16 z-20">
        <div className="flex flex-wrap gap-x-1 gap-y-0.5">
          {subtitle.map((word, i) => (
            <motion.span
              key={`${phase}-${i}`}
              animate={{
                color: i <= wordIdx ? "#ffffff" : "rgba(255,255,255,0.2)",
                backgroundColor: i <= wordIdx ? "rgba(220,38,38,0.75)" : "rgba(0,0,0,0)",
              }}
              transition={{ duration: 0.15 }}
              className="text-sm font-bold px-1 py-0.5 rounded"
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Rich icon visual — large icon + background pattern + keyword chips  */
/* ------------------------------------------------------------------ */
function RichIconVisual({ icon, bg, accent, tags }: { icon: React.ReactNode; bg: string; accent: string; tags?: string[] }) {
  return (
    <div className={`w-full min-h-[360px] rounded-[24px] ${bg} border border-black/8 flex items-center justify-center relative overflow-hidden`}>
      {/* Soft glow blobs */}
      <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-white/30 blur-3xl pointer-events-none" />
      <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-white/30 blur-3xl pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "22px 22px" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center">
        <div className={`w-20 h-20 rounded-2xl ${accent} flex items-center justify-center shadow-sm`}>
          <span className="[&>svg]:w-8 [&>svg]:h-8">{icon}</span>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-sm text-[11px] font-medium text-zinc-600 border border-white shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Bento row — same visual style as properties.tsx                     */
/* ------------------------------------------------------------------ */
function BentoServiceRow({ service, index, isLast }: { service: BentoService; index: number; isLast: boolean }) {
  const isEven = index % 2 === 0;

  const visualBlock = (
    <div className="w-full">
      {service.visual === "browser" && <BrowserPreview />}
      {service.visual === "nfc" && (
        <div className="flex items-center justify-center min-h-[360px]">
          <ThreeDCardDemo />
        </div>
      )}
      {service.visual === "menu" && <MenuTrifoldBento />}
      {service.visual === "branding" && (
        <div className="w-full min-h-[360px] rounded-[24px] overflow-hidden relative border border-black/8 bg-zinc-50">
          <Image
            src="/Essential-Stationery-Mockup.webp"
            alt="Branding stationery mockup"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
      )}
      {service.visual === "reel" && <ShortFormReelVisual />}
      {service.visual === "social" && <SocialFeedBento />}
      {service.visual === "icon" && (
        <RichIconVisual
          icon={service.icon}
          bg={service.iconBg || "bg-zinc-50"}
          accent={service.iconAccent || "bg-white border border-zinc-200 text-red-600"}
          tags={service.tags}
        />
      )}
    </div>
  );

  const textBlock = (
    <div className="flex flex-col justify-center gap-5">
      <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600">{service.icon}</div>
      <div>
        <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 font-medium mb-2">Service {String(index + 1).padStart(2, "0")}</p>
        <h3 className="text-2xl md:text-3xl font-semibold text-zinc-900 leading-tight">{service.label}</h3>
      </div>
      <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-md">{service.description}</p>
      <Link href={service.href} className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-500 transition-colors w-fit">
        Learn More <ArrowRight size={14} />
      </Link>
    </div>
  );

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 py-14 md:py-20 items-center ${!isLast ? "border-b border-zinc-100" : ""}`}>
      {isEven ? (
        <>
          <div>{visualBlock}</div>
          <div>{textBlock}</div>
        </>
      ) : (
        <>
          <div className="md:order-2">{visualBlock}</div>
          <div className="md:order-1">{textBlock}</div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop card — expands on hover, shows bento panel below            */
/* ------------------------------------------------------------------ */
function DesktopCard({ pillar, isActive, onMouseEnter }: { pillar: (typeof pillars)[0]; isActive: boolean; onMouseEnter: () => void }) {
  return (
    <motion.div onMouseEnter={onMouseEnter} animate={{ flex: isActive ? 2.8 : 1 }} transition={{ type: "spring", stiffness: 140, damping: 22 }} className="relative overflow-hidden rounded-3xl cursor-pointer min-h-[580px] flex flex-col justify-end">
      {/* Background image */}
      <Image src={pillar.image} alt={pillar.title} fill className="object-cover transition-transform duration-700 ease-out" style={{ transform: isActive ? "scale(1.04)" : "scale(1)" }} sizes="(max-width:1280px) 50vw, 33vw" />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.1) 80%)",
          opacity: isActive ? 1 : 0.85,
        }}
      />

      {/* Giant index watermark */}
      <span className="absolute top-5 left-6 font-black text-white/10 select-none transition-all duration-500" style={{ fontSize: isActive ? "8rem" : "5rem", lineHeight: 1 }}>
        {String(pillar.id + 1).padStart(2, "0")}
      </span>

      {/* Red accent line */}
      <motion.div animate={{ scaleX: isActive ? 1 : 0 }} initial={{ scaleX: 0 }} transition={{ duration: 0.35, ease: "easeOut" }} style={{ originX: 0 }} className="absolute top-0 left-0 right-0 h-[3px] bg-red-600" />

      {/* Content */}
      <div className="relative z-10 p-8">
        <h3 className="font-black uppercase text-white leading-none transition-all duration-300" style={{ fontSize: isActive ? "3rem" : "2rem" }}>
          {pillar.title}
        </h3>

        <motion.div animate={{ opacity: isActive ? 1 : 0, height: isActive ? "auto" : 0 }} transition={{ duration: 0.35, ease: "easeOut" }} className="overflow-hidden">
          <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-sm">{pillar.description}</p>
          <Link href={pillar.href} className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-5 py-2 text-xs font-medium text-white hover:bg-white/20 transition-colors">
            Explore <ArrowUpRight size={13} />
          </Link>
        </motion.div>

        {/* "hover to expand" hint */}
        <motion.div animate={{ opacity: isActive ? 0 : 1 }} transition={{ duration: 0.2 }} className="mt-2 flex items-center gap-1">
          <ChevronDown size={12} className="text-slate-400" />
          <p className="text-[10px] tracking-widest uppercase text-white/60 select-none">hover to expand</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile card                                                          */
/* ------------------------------------------------------------------ */
function MobileCard({ pillar, isActive, onClick }: { pillar: (typeof pillars)[0]; isActive: boolean; onClick: () => void }) {
  return (
    <div className="relative min-h-[520px] rounded-2xl overflow-hidden" onClick={onClick}>
      <Image src={pillar.image} alt={pillar.title} fill className="object-cover" sizes="380px" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
      <span className="absolute top-5 left-5 font-black text-white/20 text-5xl leading-none select-none">{String(pillar.id + 1).padStart(2, "0")}</span>
      <div className="absolute bottom-0 left-0 right-0 p-7">
        <p className="text-[10px] tracking-[0.3em] uppercase text-red-400 font-medium mb-2">Service {String(pillar.id + 1).padStart(2, "0")}</p>
        <h3 className="text-3xl font-black uppercase text-white leading-none mb-3">{pillar.title}</h3>
        <p className="text-sm text-white/70 leading-relaxed mb-5">{pillar.description}</p>
        <div className="flex items-center justify-between">
          <Link href={pillar.href} onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-5 py-2 text-xs font-medium text-white hover:bg-white/20 transition-colors">
            Learn More <ArrowUpRight size={13} />
          </Link>
          <span className="flex items-center gap-1 text-[10px] tracking-widest uppercase text-white/40 select-none">
            <ChevronDown size={11} className={`transition-transform duration-300 ${isActive ? "rotate-180" : ""}`} />
            {isActive ? "collapse" : "click to expand"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                              */
/* ------------------------------------------------------------------ */
export default function ServicePillars() {
  const [activePillar, setActivePillar] = useState<number | null>(null);
  const activeData = activePillar !== null ? pillars.find((p) => p.id === activePillar) : null;

  return (
    <section className="section-bleed py-16 md:py-24 overflow-x-clip bg-zinc-50">
      {/* Section header */}
      <div className="flex flex-col items-center text-center mb-10 md:mb-14 gap-y-3 px-6">
        <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-medium">What We Do</p>
        <h2 className="font-black uppercase text-zinc-950 leading-none relative z-0" style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}>
          Three Pillars.
        </h2>
        <div
          className="relative z-10 font-light text-red-600 normal-case leading-none"
          style={{ fontFamily: "var(--font-holiday), serif", fontSize: "clamp(2.5rem, 7vw, 4.5rem)", marginTop: "-0.9rem" }}
        >
          One Vision
          <span className="text-red-600">.</span>
        </div>
        <p className="max-w-md text-sm text-zinc-500">Everything your hospitality brand needs to stand out, show up, and scale — under one roof.</p>
      </div>

      {/* ——— MOBILE: Swiper (click-based) ——— */}
      <div className="md:hidden px-4">
        <Swiper effect="cards" grabCursor modules={[EffectCards]} className="w-[340px] mx-auto" initialSlide={1}>
          {pillars.map((pillar) => (
            <SwiperSlide key={pillar.id} className="shadow-2xl rounded-2xl">
              <MobileCard pillar={pillar} isActive={activePillar === pillar.id} onClick={() => setActivePillar((prev) => (prev === pillar.id ? null : pillar.id))} />
            </SwiperSlide>
          ))}
        </Swiper>
        <p className="text-center text-[10px] tracking-widest uppercase text-zinc-400 mt-6">Swipe to explore</p>

        {/* Mobile: expanded bento rows */}
        <AnimatePresence>
          {activeData && (
            <motion.div key={activeData.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.45, ease: "easeOut" }} className="overflow-hidden mt-8 border-t border-zinc-100">
              {activeData.bentoServices.map((service, idx) => (
                <BentoServiceRow key={service.label} service={service} index={idx} isLast={idx === activeData.bentoServices.length - 1} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ——— DESKTOP: Hover-based cards + panel ——— */}
      <div className="hidden md:block" onMouseLeave={() => setActivePillar(null)}>
        <div className="flex gap-4 px-8 lg:px-16">
          {pillars.map((pillar) => (
            <DesktopCard key={pillar.id} pillar={pillar} isActive={activePillar === pillar.id} onMouseEnter={() => setActivePillar(pillar.id)} />
          ))}
        </div>

        {/* Expanded bento rows below the cards */}
        <AnimatePresence>
          {activeData && (
            <motion.div key={activeData.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="overflow-hidden px-8 lg:px-16 mt-2">
              <div className="border-t border-zinc-100">
                {activeData.bentoServices.map((service, idx) => (
                  <BentoServiceRow key={service.label} service={service} index={idx} isLast={idx === activeData.bentoServices.length - 1} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
