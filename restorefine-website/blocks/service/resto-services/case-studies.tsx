"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { portfolioItems, type PortfolioItem } from "@/lib/portfolio";

interface CaseStudiesSectionProps {
  /** Section number label, e.g. "03" */
  sectionNumber?: string;
  /** Section label text, e.g. "Case Studies" */
  sectionLabel?: string;
  /** Filter by one or more portfolio categories */
  categories: string[];
  /** Limit how many items to show (default: all matching) */
  limit?: number;
}

function CaseStudyCard({ item, index }: { item: PortfolioItem; index: number }) {
  const thumbnail =
    typeof item.thumbnail === "string" ? item.thumbnail : (item.thumbnail as any).src;
  const isSvg = typeof thumbnail === "string" && thumbnail.endsWith(".svg");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex-none w-[300px] md:w-[360px]"
    >
      <Link href={`/portfolio/${item.id}`} className="group block">
        {/* Image */}
        <div className={`relative rounded-2xl overflow-hidden ${item.cardBg ?? "bg-zinc-100"} ${isSvg ? "p-8" : ""}`} style={{ aspectRatio: "4/3" }}>
          <Image
            src={thumbnail || "/placeholder.svg"}
            alt={item.title}
            fill
            className={`${isSvg ? "object-contain" : "object-cover"} transition-transform duration-700 group-hover:scale-105`}
            sizes="360px"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/50 transition-colors duration-400" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="flex items-center gap-2 bg-white text-zinc-900 text-xs font-black uppercase tracking-[0.15em] px-5 py-2.5 rounded-full">
              View Case Study <ArrowUpRight size={13} />
            </span>
          </div>
          {/* Category badge */}
          <span className="absolute top-4 left-4 text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-white/90 text-zinc-700 backdrop-blur-sm">
            {item.category}
          </span>
        </div>

        {/* Text */}
        <div className="mt-4 px-1">
          <h3 className="text-base font-black uppercase tracking-tight text-zinc-900 leading-tight group-hover:text-red-600 transition-colors duration-200">
            {item.clientName}
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed mt-1 line-clamp-2">{item.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export function CaseStudiesSection({
  sectionNumber = "03",
  sectionLabel = "Case Studies",
  categories,
  limit,
}: CaseStudiesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const items = portfolioItems
    .filter((p) => categories.includes(p.category) && p.thumbnail)
    .slice(0, limit);

  if (items.length === 0) return null;

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 380 : -380, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <motion.div
          className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-red-600 font-black text-sm">{sectionNumber}</span>
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">{sectionLabel}</span>
        </motion.div>

        <div className="flex items-end justify-between mb-10 gap-6">
          <motion.h2
            className="text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 leading-[0.95]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Work
          </motion.h2>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-zinc-200 text-zinc-600 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all duration-300 flex items-center justify-center"
              aria-label="Previous"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full bg-red-600 text-white hover:bg-zinc-900 transition-all duration-300 flex items-center justify-center"
              aria-label="Next"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/portfolio"
              className="hidden md:inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-zinc-500 hover:text-red-600 transition-colors duration-200"
            >
              All Work <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

      </div>

      {/* Scrollable strip — breaks out of max-width, first card aligns with header */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-4 mt-10 pl-6 md:pl-12 lg:pl-24"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, i) => (
          <CaseStudyCard key={item.id} item={item} index={i} />
        ))}
        {/* Right padding spacer */}
        <div className="flex-none w-6 md:w-12 lg:w-24" />
      </div>

      {/* Mobile "All Work" link */}
      <div className="flex justify-center mt-8 md:hidden px-6">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-zinc-500 hover:text-red-600 transition-colors">
          See All Work <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
}
