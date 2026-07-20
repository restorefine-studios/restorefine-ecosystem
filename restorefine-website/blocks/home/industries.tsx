"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, Trophy, Sparkles, Briefcase, ChevronDown, type LucideIcon } from "lucide-react";
import { homeContent } from "@/lib/data";

const { eyebrow, headline, intro, items } = homeContent.industries;

const iconMap: Record<string, LucideIcon> = {
  utensils: UtensilsCrossed,
  trophy: Trophy,
  sparkles: Sparkles,
  briefcase: Briefcase,
};

/* ------------------------------------------------------------------ */
/* Desktop: horizontal expanding panels, hovered card grows and turns  */
/* red while the others collapse to vertical titles                    */
/* ------------------------------------------------------------------ */
function DesktopIndustries() {
  const [active, setActive] = useState(0);

  return (
    <div className="hidden lg:flex gap-4 h-[420px]" onMouseLeave={() => setActive(0)}>
      {items.map((item, i) => {
        const isActive = i === active;
        const Icon = iconMap[item.icon];
        return (
          <motion.div
            key={item.title}
            onMouseEnter={() => setActive(i)}
            animate={{ flex: isActive ? 3 : 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 24 }}
            className={`relative overflow-hidden rounded-3xl border cursor-pointer transition-colors duration-300 ${
              isActive ? "bg-red-600 border-red-500" : "bg-zinc-50 border-zinc-100 hover:border-zinc-200"
            }`}
          >
            {/* Giant ghost icon watermark, bare glyph, no chip */}
            <Icon
              size={112}
              strokeWidth={1.5}
              className={`absolute -bottom-4 right-4 pointer-events-none transition-colors duration-300 ${
                isActive ? "text-white/10" : "text-zinc-100"
              }`}
            />

            {/* Collapsed state: vertical title along the panel */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-between py-8 transition-opacity duration-300 ${
                isActive ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-red-600">
                <Icon size={20} />
              </div>
              <p
                className="font-black uppercase text-zinc-400 tracking-tight whitespace-nowrap text-xl"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {item.title}
              </p>
            </div>

            {/* Expanded state */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.12 }}
                  className="absolute inset-0 flex flex-col justify-between p-8"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center text-white">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-black uppercase text-white text-3xl xl:text-4xl leading-none mb-4 whitespace-nowrap">{item.title}</h3>
                    <p className="text-white/85 text-sm xl:text-base leading-relaxed max-w-md">{item.description}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile: tap-to-expand vertical accordion                            */
/* ------------------------------------------------------------------ */
function MobileIndustries() {
  const [open, setOpen] = useState(0);

  return (
    <div className="lg:hidden flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = i === open;
        const Icon = iconMap[item.icon];
        return (
          <div
            key={item.title}
            onClick={() => setOpen(i)}
            className={`rounded-2xl border overflow-hidden transition-colors duration-300 ${
              isOpen ? "bg-red-600 border-red-500" : "bg-zinc-50 border-zinc-100"
            }`}
          >
            <div className="flex items-center gap-4 p-5">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                  isOpen ? "bg-white/15 border border-white/25 text-white" : "bg-white border border-zinc-200 text-red-600"
                }`}
              >
                <Icon size={18} />
              </div>
              <h3 className={`flex-1 font-black uppercase text-lg leading-tight transition-colors duration-300 ${isOpen ? "text-white" : "text-zinc-900"}`}>
                {item.title}
              </h3>
              <ChevronDown
                size={18}
                className={`flex-shrink-0 transition-all duration-300 ${isOpen ? "text-white rotate-180" : "text-zinc-400"}`}
              />
            </div>
            <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0 }} transition={{ duration: 0.35, ease: "easeOut" }} className="overflow-hidden">
              <p className="text-white/85 text-sm leading-relaxed px-5 pb-5">{item.description}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

export function Industries() {
  return (
    <section className="py-20 md:py-32 bg-white">
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
              {headline.accent}
            </span>
          </h2>
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed">{intro}</p>
        </div>

        <DesktopIndustries />
        <MobileIndustries />
      </div>
    </section>
  );
}
