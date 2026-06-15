"use client";

import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ClientCard {
  id: string;
  name: string;
  category: string;
  logo: string;
  logoType: "svg" | "png" | "webp";
  /** Tailwind gradient classes e.g. "from-emerald-900 to-teal-800" */
  cardColor?: string;
  /** Portfolio slug — if set the card becomes a link */
  portfolioId?: string;
  /** Use light overlay + dark text (for white/light-bg cards) */
  lightCard?: boolean;
}

const clients: ClientCard[] = [
  { id: "day-today", name: "Day-Today", category: "Media", logo: "/clients/day-today.svg", logoType: "svg", cardColor: "bg-[#000000]", portfolioId: "day-today-tiktok-marketing-case-study" },
  { id: "za-cleaning", name: "Za Cleaning", category: "Branding", logo: "/za-cleaning.svg", logoType: "svg", cardColor: "bg-white", portfolioId: "za-cleaning", lightCard: true },
  { id: "itspadel", name: "It's Padel", category: "Web & Mobile", logo: "/clients/itspadel-logo.svg", logoType: "svg", cardColor: "bg-[#000000]", portfolioId: "itspadel" },
  { id: "yewtreeinn", name: "Yew Tree Inn", category: "Menus", logo: "/clients/yew-tree-inn-logo.svg", logoType: "svg", cardColor: "bg-[#001d1d]", portfolioId: "yewtreeinn" },
  { id: "saladclub", name: "Salad Club", category: "Branding", logo: "/clients/salad-club-logo.svg", logoType: "svg", cardColor: "bg-[#002d2e]", portfolioId: "saladclub" },
  { id: "masala", name: "Masala Moves", category: "Branding", logo: "/clients/masala-moves-logo.svg", logoType: "svg", cardColor: "bg-[#001D1D]", portfolioId: "masala-moves-by-luna-shree" },
  { id: "quiknest", name: "Quiknest", category: "Branding", logo: "/clients/quiknest-logo.svg", logoType: "svg", cardColor: "bg-[#00315E]", portfolioId: "quiknest" },
  { id: "bigbites", name: "Big Bites", category: "Menus", logo: "/clients/big-bites-logo.webp", logoType: "webp", cardColor: "bg-[#f4592b]", portfolioId: "big-bites" },
  { id: "everestinn", name: "Everest Inn", category: "Menus", logo: "/clients/everest-inn-logo.svg", logoType: "svg", cardColor: "bg-[#594a42]", portfolioId: "everest-inn" },
  { id: "firangi", name: "Firangi", category: "Menus", logo: "/clients/firangi-logo.svg", logoType: "svg", cardColor: "bg-[#001d1b]", portfolioId: "firangi" },
  { id: "gurhkaexpress", name: "Gurhka Express", category: "Menus", logo: "/clients/gurhka-express-logo.png", logoType: "png", cardColor: "from-[#1a0505] to-[#3d0f0f]", portfolioId: "gurhkaexpress" },
  { id: "himalayandineinn", name: "Himalayan Dine Inn", category: "Menus", logo: "/clients/himalayan-dine-in-logo-1.png", logoType: "png", cardColor: "bg-[#265ba8]", portfolioId: "himalayandineinn" },
  { id: "indianbynature", name: "Indian By Nature", category: "Menus", logo: "/clients/indian-by-nature-logo.svg", logoType: "svg", cardColor: "bg-[#ffeecb]", portfolioId: "indianbynature" },
  { id: "mannis", name: "Mannis", category: "Branding", logo: "/clients/mannis-logo-white.svg", logoType: "svg", cardColor: "from-neutral-900 to-stone-800", portfolioId: "mannis" },
  { id: "momohub", name: "Momo Hub", category: "Media", logo: "/clients/momo-hub-logo.svg", logoType: "svg", cardColor: "bg-[#000000]", portfolioId: "momohub" },
  { id: "ourhq", name: "Our HQ", category: "Media", logo: "/clients/our-hq-logo.svg", logoType: "svg", cardColor: "bg-[#ffffff]", portfolioId: "ourhq" },
  { id: "pulp", name: "Pulp", category: "Menus", logo: "/clients/pulp-logo.svg", logoType: "svg", cardColor: "bg-[#f6edff]", portfolioId: "pulp" },
  { id: "spudkingz", name: "Spud Kingz", category: "Menus", logo: "/clients/spud-kingz-logo.svg", logoType: "svg", cardColor: "bg-[#fff0d6]", portfolioId: "spudkingz" },
];

const categoryColors: Record<string, string> = {
  Branding: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  Menus: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Media: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  "Web & Mobile": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

const defaultGradient = "from-zinc-900 to-zinc-800";

function ClientCardInner({ client, gradient, colorClass, lightCard }: { client: ClientCard; gradient: string; colorClass: string; lightCard?: boolean }) {
  return (
    <>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="relative w-80 h-80 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
          <Image src={client.logo} alt={client.name} fill className="object-contain group-hover:transition-all duration-500" />
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 px-4 py-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300 ${lightCard ? "bg-gradient-to-t from-white/90 via-white/60 to-transparent" : "bg-gradient-to-t from-black/80 via-black/40 to-transparent"}`}>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${colorClass} mb-2`}>{client.category}</span>
        <h3 className={`text-sm font-semibold leading-tight ${lightCard ? "text-zinc-900" : "text-white"}`}>{client.name}</h3>
      </div>
    </>
  );
}

function ClientCard({ client }: { client: ClientCard }) {
  const gradient = client.cardColor ?? defaultGradient;
  const colorClass = categoryColors[client.category] ?? "bg-white/10 text-white/70 border-white/20";
  const baseClass = `group relative rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} border border-white/5`;

  if (client.portfolioId) {
    return (
      <Link href={`/portfolio/${client.portfolioId}`} className={`${baseClass} cursor-pointer block`} style={{ aspectRatio: "3/4" }}>
        <ClientCardInner client={client} gradient={gradient} colorClass={colorClass} lightCard={client.lightCard} />
      </Link>
    );
  }

  return (
    <div className={`${baseClass} cursor-default`} style={{ aspectRatio: "3/4" }}>
      <ClientCardInner client={client} gradient={gradient} colorClass={colorClass} lightCard={client.lightCard} />
    </div>
  );
}

function splitIntoColumns(items: ClientCard[], numCols: number): ClientCard[][] {
  const cols: ClientCard[][] = Array.from({ length: numCols }, () => []);
  items.forEach((item, i) => cols[i % numCols].push(item));
  return cols;
}

const serviceTypes = ["All", "Branding", "Menus", "Media", "Web & Mobile"];
const industries = ["All Industries", "Restaurant", "Cafe & Bar", "Fast Food", "Fitness & Sport"];
const columnDirections = ["down", "up", "down"] as const;

function FilterDropdown({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ left: 0, bottom: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleOpen = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPos({
        left: rect.left + rect.width / 2,
        bottom: window.innerHeight - rect.top + 10,
      });
    }
    setOpen((o) => !o);
  };

  const isActive = value !== options[0];
  const displayValue = isActive ? value : label;

  const dropdown =
    open && typeof document !== "undefined"
      ? createPortal(
          <div
            style={{
              position: "fixed",
              bottom: pos.bottom,
              left: pos.left,
              transform: "translateX(-50%)",
              zIndex: 9999,
            }}
            className="bg-zinc-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 py-1.5 min-w-[170px]"
          >
            {options.map((opt) => (
              <button
                key={opt}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${value === opt ? "text-white font-semibold bg-white/10" : "text-white/55 hover:text-white hover:bg-white/5"}`}
              >
                {opt}
              </button>
            ))}
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="relative">
      <button ref={buttonRef} onClick={handleOpen} className={`relative flex items-center gap-1 text-sm font-medium transition-colors whitespace-nowrap mix-blend-difference ${isActive ? "text-white font-semibold" : "text-white/70 hover:text-white"}`}>
        {displayValue}
        <ChevronDown size={13} className={`transition-transform duration-200 mt-px ${open ? "rotate-180" : ""}`} />
      </button>
      {dropdown}
    </div>
  );
}

export default function WorkGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndustry, setActiveIndustry] = useState("All Industries");

  const filteredClients = activeCategory === "All" ? clients : clients.filter((c) => c.category === activeCategory);
  const columns2 = splitIntoColumns(filteredClients, 2);
  const columns3 = splitIntoColumns(filteredClients, 3);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  const opacity = useTransform(smoothProgress, [0, 0.4], [0, 1]);
  const yDown = useTransform(smoothProgress, [0, 1], [160, 0]);
  const yUp = useTransform(smoothProgress, [0, 1], [-160, 0]);

  return (
    <section ref={sectionRef} className="relative w-full text-white py-20 pb-32 px-4 md:px-8 lg:px-16">
      {/* Mobile: 2-column grid */}
      <div className="grid grid-cols-2 gap-4 items-start md:hidden mb-12">
        <div className="col-span-2 mb-6">
          <h1
            className="font-black uppercase text-zinc-950 relative z-0"
            style={{ fontSize: "clamp(1.75rem, 7vw, 2.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            What could your brand become with the
          </h1>
          <div
            className="relative z-10 font-light text-red-600 normal-case leading-none mb-3"
            style={{ fontFamily: "var(--font-holiday), serif", fontSize: "clamp(2.5rem, 9vw, 3.5rem)", marginTop: "-0.6rem" }}
          >
            Right Team?
          </div>
          <p className="text-sm text-zinc-500 font-medium">See how we help hospitality brands launch, grow and stand out.</p>
        </div>
        {columns2.map((col, colIndex) => {
          const y = colIndex === 1 ? yUp : yDown;
          return (
            <motion.div key={colIndex} className={`flex flex-col gap-4 ${colIndex === 1 ? "pt-14" : ""}`} style={{ y, opacity }}>
              {col.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </motion.div>
          );
        })}
      </div>

      {/* Desktop: sticky left heading + scrollable right grid */}
      <div className="hidden md:flex gap-12 items-start mt-12">
        {/* Left: sticky heading */}
        <div className="sticky top-0 h-screen flex flex-col justify-center w-[38%] shrink-0">
          <h1
            className="font-black uppercase text-zinc-950 relative z-0"
            style={{ fontSize: "clamp(1.75rem, 3vw, 3rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            What could your brand become with the
          </h1>
          <div
            className="relative z-10 font-light text-red-600 normal-case leading-none mb-4"
            style={{ fontFamily: "var(--font-holiday), serif", fontSize: "clamp(2.5rem, 4.5vw, 4rem)", marginTop: "-0.7rem" }}
          >
            Right Team?
          </div>
          <p className="text-sm md:text-base text-zinc-500 font-medium">
            See how we help hospitality brands launch, grow and stand out.
          </p>
        </div>

        {/* Right: full 3-column scrollable grid */}
        <div className="flex-1 grid grid-cols-3 gap-5 items-start">
          {columns3.map((col, colIndex) => {
            const dir = columnDirections[colIndex % columnDirections.length];
            const y = dir === "up" ? yUp : yDown;
            return (
              <motion.div key={colIndex} className={`flex flex-col gap-5 ${colIndex === 1 ? "pt-14" : ""}`} style={{ y, opacity }}>
                {col.map((client) => (
                  <ClientCard key={client.id} client={client} />
                ))}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating sticky filter bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] px-4 w-full max-w-xl">
        <div
          className="relative  flex items-center gap-4 rounded-full px-5 py-3.5"
          style={{
            background: "linear-gradient(135deg, rgba(220,38,38,0.14) 0%, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.04) 60%, rgba(220,38,38,0.10) 100%)",
            backdropFilter: "blur(48px) saturate(180%)",
            WebkitBackdropFilter: "blur(48px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.22)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.12), 0 0 24px rgba(220,38,38,0.12)",
          }}
        >
          {/* Specular top highlight */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />
          {/* Bottom shadow line */}
          <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent pointer-events-none" />

          <button
            onClick={() => {
              setActiveCategory("All");
              setActiveIndustry("All Industries");
            }}
            className="relative flex items-center gap-2 text-sm font-medium text-white mix-blend-difference transition-colors shrink-0"
          >
            <SlidersHorizontal size={14} strokeWidth={2} />
            Filters
          </button>

          <div className="relative w-px h-4 bg-white/15 shrink-0" />
          <div className="flex-1 " />

          <FilterDropdown label="Project Type" options={serviceTypes} value={activeCategory} onChange={setActiveCategory} />

          <div className="relative w-px h-4   bg-white/15 shrink-0" />

          <FilterDropdown label="Industry" options={industries} value={activeIndustry} onChange={setActiveIndustry} />
        </div>
      </div>
    </section>
  );
}
