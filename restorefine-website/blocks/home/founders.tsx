"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

interface Founder {
  name: string;
  role: string;
  about: string;
  image: string;
}

interface FoundersProps {
  headline: string;
  subtext: string;
  founders: Founder[];
}

function FounderCard({ founder, index }: { founder: Founder; index: number }) {
  const [hovered, setHovered] = useState(false);

  const bio = founder.about
    .replace(/<br><br>/g, " ")
    .replace(/<[^>]+>/g, "");

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: index * 0.18 }}
      // Second card offset down on desktop for the stagger effect
      className={`flex flex-col gap-5 ${index === 1 ? "md:mt-16" : ""}`}
    >
      {/* Photo container */}
      <div
        className="relative overflow-hidden rounded-[28px]"
        style={{ aspectRatio: "3 / 5" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setHovered((h) => !h)}
      >
        {/* Photo */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={founder.image || "/placeholder.svg"}
            alt={founder.name}
            fill
            className="object-cover object-top"
          />
        </motion.div>

        {/* Permanent soft bottom gradient so name is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Index badge — top left */}
        <div className="absolute top-5 left-5 z-10">
          <span className="text-[9px] font-black tracking-[0.35em] uppercase text-white/50">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Role pill — top right */}
        <div className="absolute top-5 right-5 z-10">
          <span className="text-[9px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full bg-white/15 text-white backdrop-blur-sm border border-white/20">
            {founder.role}
          </span>
        </div>

        {/* --- Hover bio overlay --- */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="bio-overlay"
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-20 rounded-[28px] overflow-hidden flex flex-col justify-end"
            >
              {/* Frosted glass panel */}
              <div className="bg-white/80 backdrop-blur-md border-t border-white/60 px-6 py-5 flex flex-col gap-3 max-h-full overflow-y-auto">
                <Quote size={14} className="text-red-500 shrink-0" />
                <p className="text-zinc-800 text-sm leading-relaxed">
                  {bio}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Name + role below the photo */}
      <div className="px-1 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-black text-zinc-900 leading-tight">
            {founder.name}
          </h3>
          <p className="text-zinc-400 text-sm mt-0.5">{founder.role}</p>
        </div>
      </div>
    </motion.article>
  );
}

export function Founders({ headline, subtext, founders }: FoundersProps) {
  return (
    <section className="section-bleed bg-zinc-50 py-20 md:py-28 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-20"
        >
          {/* Eyebrow row */}
          <div className="flex items-center gap-4 mb-6">
            <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.3em] uppercase text-red-600 bg-red-50 border border-red-100 px-3 py-1.5 rounded-full">
              The People Behind It
            </span>
            <div className="h-px flex-1 bg-zinc-100" />
          </div>

          {/* Headline + subtext split */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 leading-tight max-w-lg">
              {headline}
            </h2>
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-sm md:text-right">
              {subtext}
            </p>
          </div>
        </motion.div>

        {/* Staggered founder cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 md:items-start">
          {founders.map((founder, i) => (
            <FounderCard key={i} founder={founder} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
