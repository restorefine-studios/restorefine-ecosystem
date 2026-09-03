"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { Footer } from "@/components/footer";
import { CaseStudiesSection } from "./resto-services/case-studies";
import { ProcessTimeline } from "./process-timeline";
import type { PortfolioItem } from "@/lib/portfolio";
import { contentPillarContent } from "@/lib/pillar-content/content-pillar";

const holiday = { fontFamily: "var(--font-holiday), serif" };

// ─── Hero ───────────────────────────────────────────────────────────────────
// Split hero. Right side is a content-grid mockup built from the site's own
// service imagery, styled like a feed preview rather than a stock photo.

function ContentGrid() {
  const tiles = [
    { image: "/services/media/pexels-cottonbro-3296434.webp", alt: "Short-form content still", play: true },
    { image: "/content-card-img.png", alt: "Social media management" },
    { image: "/services/media/pexels-fauxels-3184431.webp", alt: "Launch campaign content" },
    { image: "/services/media/restophotography.webp", alt: "Brand photography" },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute -right-4 top-6 w-full h-full rounded-3xl bg-zinc-100 border border-zinc-200 rotate-[4deg]" aria-hidden />
      <motion.div
        className="relative rounded-3xl bg-white border border-zinc-200 shadow-2xl shadow-zinc-900/10 p-6 md:p-7"
        initial={{ opacity: 0, y: 24, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: -1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 mb-4">Feed Preview</p>
        <div className="grid grid-cols-2 gap-3">
          {tiles.map((tile) => (
            <div key={tile.image} className="relative aspect-square rounded-xl overflow-hidden bg-zinc-100">
              <Image src={tile.image} alt={tile.alt} fill className="object-cover" sizes="200px" />
              {tile.play && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/20">
                  <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 text-zinc-900 fill-zinc-900 ml-0.5" />
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function ContentHero() {
  const { hero } = contentPillarContent;
  return (
    <section className="bg-white min-h-[100dvh] flex items-center px-6 md:px-12 lg:px-24 pt-24 pb-16">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] items-center gap-16 lg:gap-12">
        <div>
          <motion.span
            className="inline-block text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {hero.eyebrow}
          </motion.span>
          <motion.h1
            className="font-black uppercase tracking-tight text-zinc-900 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <span className="block relative z-0 text-5xl sm:text-6xl lg:text-7xl leading-[0.95] pb-1">{hero.line1}</span>
            <span
              className="block relative z-10 font-light text-red-600 normal-case leading-[1.15]"
              style={{ ...holiday, fontSize: "clamp(2.8rem, 5.5vw, 4.6rem)", marginTop: "0.1rem" }}
            >
              {hero.line2}
            </span>
          </motion.h1>
          <motion.p
            className="max-w-md text-sm text-zinc-500 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
          >
            {hero.subtext}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
          >
            <Link href="/enquire-now" className="inline-flex items-center gap-2 group">
              <span className="text-sm font-black uppercase tracking-[0.15em] bg-zinc-900 text-white px-7 py-3.5 rounded-full group-hover:bg-red-600 transition-colors duration-300">
                {hero.ctaLabel}
              </span>
              <span className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center group-hover:bg-zinc-900 transition-colors duration-300 flex-shrink-0">
                <ArrowRight className="w-5 h-5 text-white" />
              </span>
            </Link>
          </motion.div>
        </div>

        <ContentGrid />
      </div>
    </section>
  );
}

// ─── Overview ───────────────────────────────────────────────────────────────
// Full-width statement with the four pitfalls as a marked list, not checkmarks
// (these are problems to avoid, not deliverables).

function ContentOverview() {
  const { overview } = contentPillarContent;
  return (
    <section className="section-bleed bg-zinc-50 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.p
          className="text-lg md:text-xl text-zinc-600 leading-relaxed mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {overview.intro}
        </motion.p>

        <motion.h2
          className="text-4xl md:text-6xl font-black uppercase tracking-tight text-zinc-900 leading-[1.05] mb-12 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Your business has something worth saying. Your content should say it with{" "}
          <span className="font-light normal-case text-red-600" style={holiday}>
            purpose
          </span>
          .
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <motion.p
            className="text-sm text-zinc-500 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {overview.body}
          </motion.p>

          <div className="space-y-4">
            {overview.problems.map((problem, i) => (
              <motion.div
                key={problem}
                className="flex items-start gap-3 border-l-2 border-red-600 pl-4"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              >
                <p className="text-sm text-zinc-700 leading-relaxed">{problem}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ───────────────────────────────────────────────────────────────

function ServiceTags({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] rounded-full ${
            dark ? "text-white/80 border border-white/20" : "text-zinc-600 border border-zinc-200 bg-white"
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function ServiceCta({ label, href, light = false }: { label: string; href: string; light?: boolean }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 group w-fit">
      <span
        className={`text-xs font-black uppercase tracking-[0.15em] px-5 py-2.5 rounded-full transition-colors duration-300 ${
          light
            ? "bg-white text-zinc-900 group-hover:bg-red-600 group-hover:text-white"
            : "bg-zinc-900 text-white group-hover:bg-red-600"
        }`}
      >
        {label}
      </span>
      <span className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center group-hover:bg-zinc-900 transition-colors duration-300 flex-shrink-0">
        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
      </span>
    </Link>
  );
}

function ContentServices() {
  const [shortForm, socialMedia, ...rest] = contentPillarContent.subServices;

  return (
    <section className="bg-white py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 mb-14 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Services
        </motion.h2>

        {/* Row 1: feature tiles */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          <motion.div
            className="lg:col-span-3 relative rounded-3xl overflow-hidden min-h-[380px]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={shortForm.image}
              alt={shortForm.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/25 to-transparent" />
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-red-400 mb-3">{shortForm.number}</p>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-[0.95] mb-3">
                {shortForm.title}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed mb-5 max-w-md">{shortForm.description}</p>
              <ServiceTags items={shortForm.includes} dark />
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2 rounded-3xl bg-zinc-900 p-8 md:p-10 flex flex-col justify-between min-h-[380px]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-red-400 mb-4">{socialMedia.number}</p>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-[0.95] mb-4">
                {socialMedia.title}
              </h3>
              <p className="text-sm text-white/65 leading-relaxed">{socialMedia.description}</p>
            </div>
            <div className="mt-8 space-y-6">
              <ServiceTags items={socialMedia.includes} dark />
              {socialMedia.ctaHref && socialMedia.ctaLabel && (
                <ServiceCta label={socialMedia.ctaLabel} href={socialMedia.ctaHref} light />
              )}
            </div>
          </motion.div>
        </div>

        {/* Row 2: compact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {rest.map((service, i) => (
            <motion.div
              key={service.number}
              className="flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative rounded-2xl overflow-hidden bg-zinc-100 aspect-[4/3] mb-5">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-red-600 mb-3">{service.number}</p>
              <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 leading-[0.95] mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-5">{service.description}</p>
              <div className="mb-5">
                <ServiceTags items={service.includes} />
              </div>
              {service.ctaHref && service.ctaLabel && (
                <ServiceCta label={service.ctaLabel} href={service.ctaHref} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process ────────────────────────────────────────────────────────────────
// Four connected steps (Strategy, Create, Distribute, Measure & Refine).

function ContentProcess() {
  const { process } = contentPillarContent;
  return (
    <section className="section-bleed py-24 bg-zinc-50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 leading-[1.1] mb-6 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          From Strategy to Content That{" "}
          <span className="font-light normal-case text-red-600" style={holiday}>
            Performs
          </span>
        </motion.h2>

        <motion.p
          className="max-w-2xl text-sm text-zinc-500 leading-relaxed mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {process.intro}
        </motion.p>

        <ProcessTimeline steps={process.steps} />
      </div>
    </section>
  );
}

// ─── Closing CTA ────────────────────────────────────────────────────────────

function ContentClosingCta() {
  return (
    <section className="pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="group relative overflow-hidden rounded-3xl bg-red-600 px-8 py-10 md:px-14 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-zinc-950/25 blur-[70px]" aria-hidden />
          <div className="relative">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white mb-2">
              Not Sure Where to Start?
            </h2>
            <p className="text-sm md:text-base text-white/90">Tell us your goals, we&apos;ll map the route.</p>
          </div>
          <Link href="/enquire-now" className="relative inline-flex items-center gap-3 flex-shrink-0 group/link">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-white underline decoration-2 underline-offset-4">
              Enquire
            </span>
            <span className="w-8 h-8 rounded-lg border-2 border-white flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

function RContent({ caseStudies = [] }: { caseStudies?: PortfolioItem[] }) {
  return (
    <main className="bg-white">
      <ContentHero />
      <ContentOverview />
      <ContentServices />
      <ContentProcess />

      <CaseStudiesSection
        hideEyebrow
        heading={
          <>
            Content That Creates More Than{" "}
            <span className="font-light normal-case text-red-600" style={holiday}>
              Attention
            </span>
            .
          </>
        }
        intro={contentPillarContent.caseStudies.body}
        categories={["Media", "Branding"]}
        extraItems={caseStudies}
      />

      <ContentClosingCta />
      <Footer />
    </main>
  );
}

export default RContent;
