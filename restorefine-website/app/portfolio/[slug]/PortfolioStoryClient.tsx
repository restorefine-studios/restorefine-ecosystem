"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { StaticImageData } from "next/image";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import type { PortfolioItem } from "@/lib/portfolio";
import { ItsPadelContent } from "@/blocks/portfolio/itspadel-content";
import { SaladClubContent } from "@/blocks/portfolio/saladclub-content";
import { YewTreeInnContent } from "@/blocks/portfolio/yewtreeinn-content";
import { QuiknestContent } from "@/blocks/portfolio/quiknest-content";
import { MasalaMovesContent } from "@/blocks/portfolio/masalamoves-content";
import { BigBitesContent } from "@/blocks/portfolio/bigbites-content";
import { EverestInnContent } from "@/blocks/portfolio/everestinn-content";
import { FirangiContent } from "@/blocks/portfolio/firangi-content";
import { GurkhaExpressContent } from "@/blocks/portfolio/gurkhaexpress-content";
import { HimalayanDineInnContent } from "@/blocks/portfolio/himalayandineinn-content";
import { IndianByNatureContent } from "@/blocks/portfolio/indianbynature-content";
import { MannisContent } from "@/blocks/portfolio/mannis-content";
import { MomoHubContent } from "@/blocks/portfolio/momohub-content";
import { OurHQContent } from "@/blocks/portfolio/ourhq-content";
import { PulpContent } from "@/blocks/portfolio/pulp-content";
import { SpudKingzContent } from "@/blocks/portfolio/spudkingz-content";
import { ZaCleaningContent } from "@/blocks/portfolio/za-cleaning-content";
import { DayTodayContent } from "@/blocks/portfolio/day-today-content";

function getImageSrc(img: string | StaticImageData): string {
  if (typeof img === "string") return img;
  return img.src;
}

interface PortfolioStoryClientProps {
  project: PortfolioItem;
  prevProject: PortfolioItem | null;
  nextProject: PortfolioItem | null;
  heroBg: string | StaticImageData;
}

// Projects with hardcoded content blocks — skip Contentful-fetched description/challenge/outcome
const CUSTOM_CONTENT_IDS = [
  "itspadel", "yewtreeinn", "primewash", "saladclub",
  "quiknest", "masala-moves-by-luna-shree", "big-bites", "everest-inn",
  "firangi", "gurhkaexpress", "himalayandineinn", "indianbynature",
  "mannis", "momohub", "ourhq", "pulp", "spudkingz", "za-cleaning",
  "day-today-tiktok-marketing-case-study",
];

export function PortfolioStoryClient({
  project,
  prevProject,
  nextProject,
  heroBg,
}: PortfolioStoryClientProps) {
  const hasCustomContent = CUSTOM_CONTENT_IDS.includes(project.id);
  const isCleanHero = project.id === "za-cleaning" || project.id === "itspadel" || project.id === "masala-moves-by-luna-shree" || project.id === "day-today-tiktok-marketing-case-study";
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const slowFade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2, ease: "easeOut" } },
  };

  return (
    <article className="min-h-screen bg-white">
      {/* ─── HERO ─── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`relative mt-16 w-full overflow-hidden hero-full-bleed ${
          isCleanHero
            ? "aspect-[32/15] xl:aspect-auto xl:min-h-[900px] xl:max-h-[1100px]"
            : "min-h-[55vh] md:min-h-[900px] md:max-h-[1100px]"
        }`}
      >
        {/* Background image */}
        <motion.div variants={slowFade} className="absolute inset-0 z-0">
          <Image
            src={getImageSrc(heroBg)}
            alt={project.clientName}
            fill
            priority
            className="object-contain object-center"
            sizes="100vw"
          />
        </motion.div>

        {/* Dark gradient overlay */}
        {!isCleanHero && <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />}

        {/* Back button */}
        <motion.div variants={fadeInUp} className="absolute top-8 left-8 z-20">
          <Link
            href="/portfolio"
            className={`inline-flex items-center gap-2 transition-colors duration-300 group ${isCleanHero ? "text-zinc-700 hover:text-zinc-900" : "text-white/70 hover:text-white"}`}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm tracking-wide">Back</span>
          </Link>
        </motion.div>

        {/* Hero bottom bar */}
        {!isCleanHero && (
          <div className="absolute bottom-0 left-0 right-0 z-20 px-8 pb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
            <motion.h1
              variants={fadeInUp}
              className="font-black uppercase text-white leading-none tracking-tight"
              style={{ fontSize: "clamp(1.8rem, 5vw, 6rem)" }}
            >
              {project.clientName}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-white/80 text-sm max-w-sm text-right leading-snug shrink-0"
            >
              {project.title}
            </motion.p>
          </div>
        )}

        {/* Category pill */}
        {!isCleanHero && (
          <motion.div variants={fadeInUp} className="absolute top-8 right-8 z-20">
            <span className="text-[10px] tracking-[0.25em] uppercase text-white/60 font-medium border border-white/20 rounded-full px-3 py-1">
              {project.category}
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* ─── CONTENT ─── */}
      <div className="bg-white">
        {/* ── Project intro strip ── */}
        {!isCleanHero && <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={staggerContainer}
          className="border-b border-zinc-100"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div>
              <motion.p variants={fadeInUp} className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-medium mb-3">
                {project.category}
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-black uppercase text-zinc-950 leading-none tracking-tight"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                {project.clientName}
              </motion.h2>
              {/* Contentful-fetched description — hidden when hardcoded content block exists */}
              {!hasCustomContent && (
                <motion.p variants={fadeInUp} className="mt-4 text-zinc-500 text-sm md:text-base leading-relaxed max-w-xl">
                  {project.description}
                </motion.p>
              )}
            </div>
            <motion.div variants={fadeInUp} className="shrink-0 text-right">
              <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 font-medium mb-1">Year</p>
              <p className="text-2xl font-black text-red-600">
                {new Date(project.date).getFullYear()}
              </p>
            </motion.div>
          </div>
        </motion.div>}

        {/* ── Custom per-project content ── */}
        {project.id === "itspadel" && <ItsPadelContent />}
        {project.id === "saladclub" && <SaladClubContent />}
        {project.id === "yewtreeinn" && <YewTreeInnContent />}
        {project.id === "quiknest" && <QuiknestContent />}
        {project.id === "masala-moves-by-luna-shree" && <MasalaMovesContent />}
        {project.id === "big-bites" && <BigBitesContent />}
        {project.id === "everest-inn" && <EverestInnContent />}
        {project.id === "firangi" && <FirangiContent />}
        {project.id === "gurhkaexpress" && <GurkhaExpressContent />}
        {project.id === "himalayandineinn" && <HimalayanDineInnContent />}
        {project.id === "indianbynature" && <IndianByNatureContent />}
        {project.id === "mannis" && <MannisContent />}
        {project.id === "momohub" && <MomoHubContent />}
        {project.id === "ourhq" && <OurHQContent />}
        {project.id === "pulp" && <PulpContent />}
        {project.id === "spudkingz" && <SpudKingzContent />}
        {project.id === "day-today-tiktok-marketing-case-study" && <DayTodayContent />}
        {project.id === "za-cleaning" && <ZaCleaningContent />}

        {/* ── Challenge + Solution — hidden when hardcoded content block exists ── */}
        {!hasCustomContent && (project.challenge || project.solution) && (
          <div className="border-b border-zinc-100">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24">
              {project.challenge && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10%" }}
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
                    <span className="text-red-600 font-black text-xs tracking-widest uppercase">01</span>
                    <div className="h-px flex-1 bg-zinc-100" />
                  </motion.div>
                  <motion.p variants={fadeInUp} className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-medium mb-4">
                    The Challenge
                  </motion.p>
                  <motion.p variants={fadeInUp} className="text-zinc-600 text-sm md:text-base leading-relaxed">
                    {project.challenge}
                  </motion.p>
                </motion.div>
              )}
              {project.solution && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10%" }}
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
                    <span className="text-red-600 font-black text-xs tracking-widest uppercase">02</span>
                    <div className="h-px flex-1 bg-zinc-100" />
                  </motion.div>
                  <motion.p variants={fadeInUp} className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-medium mb-4">
                    The Solution
                  </motion.p>
                  <motion.p variants={fadeInUp} className="text-zinc-600 text-sm md:text-base leading-relaxed">
                    {project.solution}
                  </motion.p>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* ── Image gallery ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-medium mb-10"
          >
            Project Assets
          </motion.p>
          <div className="space-y-5">
            {project.images.map((image, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={fadeInUp}
                className="relative w-full overflow-hidden rounded-2xl bg-zinc-100 shadow-sm"
                style={{ aspectRatio: "16/9" }}
              >
                <Image
                  src={image}
                  alt={`${project.title} — ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1400px) 90vw, 1400px"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Outcome block — hidden when hardcoded content block exists ── */}
        {!hasCustomContent && project.outcome && (
          <div className="border-t border-zinc-100">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-15%" }}
              variants={staggerContainer}
              className="max-w-4xl mx-auto px-6 md:px-12 py-20 md:py-28 text-center"
            >
              <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-16 bg-zinc-200" />
                <span className="text-red-600 font-black text-xs tracking-widest uppercase">03</span>
                <div className="h-px w-16 bg-zinc-200" />
              </motion.div>
              <motion.p variants={fadeInUp} className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-medium mb-6">
                The Outcome
              </motion.p>
              <motion.p variants={fadeInUp} className="text-zinc-700 text-base md:text-xl leading-relaxed font-light">
                {project.outcome}
              </motion.p>
            </motion.div>
          </div>
        )}

        {/* ── Prev / Next navigation ── */}
        <div className="border-t-2 border-red-900">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-7xl mx-auto px-6 md:px-12 py-14 flex flex-col sm:flex-row justify-between items-center gap-10"
          >
            {/* Prev */}
            {prevProject ? (
              <Link href={`/portfolio/${prevProject.id}`} className="group flex items-center gap-4 text-left">
                <div className="w-9 h-9 rounded-full border border-zinc-200 group-hover:border-red-500 flex items-center justify-center transition-colors shrink-0">
                  <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:text-red-600 transition-all group-hover:-translate-x-0.5" />
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-zinc-400 mb-0.5">Previous Project</p>
                  <p className="text-sm font-black uppercase text-zinc-900 group-hover:text-red-600 transition-colors leading-none">
                    {prevProject.clientName}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {/* Centre CTA */}
            <Link href="/portfolio" className="group flex flex-col items-center gap-1 text-center shrink-0">
              <span className="text-[9px] tracking-[0.35em] uppercase text-zinc-400 font-medium">Browse</span>
              <span
                className="flex items-center gap-2 font-black uppercase text-zinc-950 group-hover:text-red-600 transition-colors"
                style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
              >
                Our Portfolio
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </span>
              <div className="h-0.5 w-0 bg-red-600 group-hover:w-full transition-all duration-300 rounded-full" />
            </Link>

            {/* Next */}
            {nextProject ? (
              <Link href={`/portfolio/${nextProject.id}`} className="group flex items-center gap-4 text-right">
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-zinc-400 mb-0.5">Next Project</p>
                  <p className="text-sm font-black uppercase text-zinc-900 group-hover:text-red-600 transition-colors leading-none">
                    {nextProject.clientName}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full border border-zinc-200 group-hover:border-red-500 flex items-center justify-center transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-red-600 transition-all group-hover:translate-x-0.5" />
                </div>
              </Link>
            ) : (
              <div />
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </article>
  );
}
