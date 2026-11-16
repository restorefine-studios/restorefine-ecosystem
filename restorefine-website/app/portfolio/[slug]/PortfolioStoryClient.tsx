"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import type { PortfolioItem } from "@/lib/portfolio";
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
import { CmsPortfolioContent, ServicePills } from "@/blocks/portfolio/cms-content";
import { ParallaxHeroMedia } from "@/blocks/portfolio/case-study-motion";
import { SectionHeading } from "@/blocks/portfolio/case-heading";
import type { PortfolioProject } from "@/lib/portfolio-cms";

function getImageSrc(img: string | StaticImageData): string {
  if (typeof img === "string") return img;
  return img.src;
}

interface PortfolioStoryClientProps {
  project: PortfolioItem;
  prevProject: PortfolioItem | null;
  nextProject: PortfolioItem | null;
  heroBg: string | StaticImageData;
  /** Set when the project comes from the CMS rather than the hardcoded array. */
  cmsProject?: PortfolioProject | null;
}

// Projects with hardcoded content blocks: skip Contentful-fetched description/challenge/outcome
const CUSTOM_CONTENT_IDS = [
  "yewtreeinn", "primewash", "saladclub",
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
  cmsProject = null,
}: PortfolioStoryClientProps) {
  // CMS projects always bring their own content block and use the clean hero
  const hasCustomContent = !!cmsProject || CUSTOM_CONTENT_IDS.includes(project.id);
  const isCleanHero = !!cmsProject || project.id === "za-cleaning" || project.id === "masala-moves-by-luna-shree" || project.id === "day-today-tiktok-marketing-case-study";
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

  const year = project.date ? new Date(project.date).getFullYear() : NaN;
  // Under the title: the case study's headline, or its summary when there is no custom block
  const lead = hasCustomContent ? project.title : project.description;
  // The title shares the content's container, so both start on the same edge
  const frame = cmsProject
    ? "portfolio-content-bleed mx-auto max-w-[104rem] px-6 md:px-12 min-[1201px]:px-0"
    : "mx-auto max-w-7xl px-6 md:px-12";

  const site = cmsProject?.sections.liveWebsite;
  const siteUrl = site?.url.trim();
  const facts: { term: string; value: React.ReactNode }[] = [
    { term: "Client", value: project.clientName },
    { term: "Category", value: project.category },
    ...(!Number.isNaN(year) ? [{ term: "Year", value: String(year) }] : []),
    ...(siteUrl
      ? [{
          term: "Website",
          value: (
            <a href={siteUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-zinc-950 underline decoration-zinc-300 underline-offset-4 hover:decoration-red-600">
              {site!.domain || siteUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ),
        }]
      : []),
  ].filter((f) => f.value);

  return (
    <article>
      {/* ─── HERO: the project image on a rounded card, as on the homepage ─── */}
      <section className="px-2 pt-20 sm:px-3 sm:pt-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`relative w-full overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] ${
            isCleanHero ? "aspect-[32/15] max-h-[1200px] bg-zinc-100" : "aspect-[4/3] max-h-[min(80svh,56rem)] bg-zinc-950 sm:aspect-[16/9]"
          }`}
        >
          <motion.div variants={slowFade} className="absolute inset-0">
            {isCleanHero ? (
              <ParallaxHeroMedia>
                <Image src={getImageSrc(heroBg)} alt={project.clientName} fill priority className="object-cover object-center" sizes="100vw" />
              </ParallaxHeroMedia>
            ) : (
              <Image src={getImageSrc(heroBg)} alt={project.clientName} fill priority className="object-contain object-center" sizes="100vw" />
            )}
          </motion.div>

          <motion.div variants={fadeInUp} className="absolute left-4 top-4 z-10 sm:left-6 sm:top-6">
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 rounded-full bg-white/90 py-2 pl-3 pr-4 text-sm font-medium text-zinc-950 backdrop-blur-sm transition-colors hover:bg-white"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Portfolio
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── TITLE + PROJECT DETAILS ─── */}
      <motion.header
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className={`${frame} grid gap-10 pb-12 pt-10 md:pt-14 lg:grid-cols-12 lg:items-end lg:gap-8`}
      >
        <div className="lg:col-span-7">
          <motion.h1 variants={fadeInUp} className="v2-display text-zinc-950">
            {project.clientName}
          </motion.h1>
          {lead && lead !== project.clientName && (
            <motion.p variants={fadeInUp} className="v2-lead mt-5 max-w-[52ch] text-zinc-600">
              {lead}
            </motion.p>
          )}
          {/* Services sit under the lead, so the facts column stays as tall as the title */}
          {cmsProject && cmsProject.services.length > 0 && (
            <motion.div variants={fadeInUp} className="mt-8">
              <ServicePills services={cmsProject.services} />
            </motion.div>
          )}
        </div>

        {/* Every row comes from the project's data; a row with nothing to show is left out */}
        <motion.dl variants={fadeInUp} className="border-t border-dashed border-zinc-300 lg:col-span-5 lg:col-start-8">
          {facts.map((f) => (
            <div key={f.term} className="grid grid-cols-[7rem_minmax(0,1fr)] items-baseline gap-4 border-b border-dashed border-zinc-300 py-3.5">
              <dt className="v2-small pt-0.5 text-zinc-500">{f.term}</dt>
              <dd className="v2-body text-zinc-950">{f.value}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.header>

      {/* ─── CONTENT: older blocks take the homepage type through v2-reuse ─── */}
      <div className="v2-reuse v2-case">
        {/* ── CMS-authored content ── */}
        {cmsProject && <CmsPortfolioContent project={cmsProject} />}

        {/* ── Custom per-project content ── */}
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

        {/* Challenge + Solution: only for projects without a custom block */}
        {!hasCustomContent && (project.challenge || project.solution) && (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 py-16 md:grid-cols-2 md:gap-24 md:px-12 md:py-24">
            {[
              { num: "01", label: "The Challenge", text: project.challenge },
              { num: "02", label: "The Solution", text: project.solution },
            ]
              .filter((b) => b.text)
              .map((b) => (
                <motion.div key={b.num} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={staggerContainer}>
                  <motion.div variants={fadeInUp}>
                    <SectionHeading num={b.num} label={b.label} />
                  </motion.div>
                  <motion.p variants={fadeInUp} className="v2-body text-zinc-600">
                    {b.text}
                  </motion.p>
                </motion.div>
              ))}
          </div>
        )}

        {/* Image gallery: skipped when there are no assets */}
        {project.images.length > 0 && (
          <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="v2-h2 mb-10 text-zinc-950">
              Project <span className="text-zinc-400">Assets</span>
            </motion.h2>
            <div className="space-y-4">
              {project.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10%" }}
                  variants={fadeInUp}
                  className="relative w-full overflow-hidden rounded-[1.5rem] bg-zinc-100"
                  style={{ aspectRatio: "16/9" }}
                >
                  <Image
                    src={image}
                    alt={`${project.title} ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1400px) 90vw, 1400px"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Outcome: only for projects without a custom block */}
        {!hasCustomContent && project.outcome && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            variants={staggerContainer}
            className="mx-auto max-w-4xl px-6 py-20 md:px-12 md:py-28"
          >
            <motion.div variants={fadeInUp}>
              <SectionHeading num="03" label="The Outcome" />
            </motion.div>
            <motion.p variants={fadeInUp} className="v2-statement text-zinc-950">
              {project.outcome}
            </motion.p>
          </motion.div>
        )}
      </div>

      {/* ─── PREV / NEXT: a grey rounded panel, like the homepage's Businesses section ─── */}
      <nav aria-label="More projects" className="px-2 py-3 sm:px-3">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="rounded-[1.75rem] bg-zinc-100 py-12 sm:rounded-[2rem] lg:py-16"
        >
          <div className="v2-wrap grid items-center gap-8 sm:grid-cols-3">
            {prevProject ? (
              <Link href={`/portfolio/${prevProject.id}`} className="group flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-zinc-950 transition-colors group-hover:bg-zinc-950 group-hover:text-white">
                  <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                </span>
                <span>
                  <span className="v2-small block text-zinc-500">Previous project</span>
                  <span className="v2-h3 block text-zinc-950">{prevProject.clientName}</span>
                </span>
              </Link>
            ) : (
              <span />
            )}

            <Link
              href="/portfolio"
              className="group mx-auto inline-flex items-center gap-2 rounded-full bg-zinc-950 py-3 pl-6 pr-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-red-600"
            >
              All projects
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            {nextProject ? (
              <Link href={`/portfolio/${nextProject.id}`} className="group flex items-center justify-end gap-4 text-right">
                <span>
                  <span className="v2-small block text-zinc-500">Next project</span>
                  <span className="v2-h3 block text-zinc-950">{nextProject.clientName}</span>
                </span>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-zinc-950 transition-colors group-hover:bg-zinc-950 group-hover:text-white">
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </motion.div>
      </nav>
    </article>
  );
}
