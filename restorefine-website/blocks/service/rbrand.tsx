"use client";

import { TrustStrip } from "@/components/trust-strip";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { CaseStudiesSection } from "./resto-services/case-studies";
import { ProcessTimeline } from "./process-timeline";
import type { PortfolioItem } from "@/lib/portfolio";
import { brandPillarContent } from "@/lib/pillar-content/brand-pillar";

// ─── Motion ─────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const holiday = { fontFamily: "var(--font-holiday), serif" };

// ─── Hero ───────────────────────────────────────────────────────────────────
// Split hero. Right side is a self-contained "brand board" mockup built from
// the site's own tokens (no stock photo needed for a page about identity work).

function BrandBoard() {
  const swatches = [
    { className: "bg-red-600" },
    { className: "bg-zinc-900" },
    { className: "bg-stone-300" },
    { className: "bg-zinc-100 border border-zinc-300" },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute -right-4 top-6 w-full h-full rounded-3xl bg-zinc-100 border border-zinc-200 rotate-[4deg]" aria-hidden />
      <motion.div
        className="relative rounded-3xl bg-white border border-zinc-200 shadow-2xl shadow-zinc-900/10 p-8 md:p-10"
        initial={{ opacity: 0, y: 24, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: -1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 mb-4">Colour Palette</p>
        <div className="flex gap-3 mb-10">
          {swatches.map((s, i) => (
            <span key={i} className={`w-9 h-9 rounded-full ${s.className}`} />
          ))}
        </div>

        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 mb-4">Typography</p>
        <div className="flex items-baseline gap-5 mb-10">
          <span className="text-6xl font-black text-zinc-900 leading-none">Aa</span>
          <span className="text-5xl font-light text-red-600 normal-case leading-none" style={holiday}>Aa</span>
        </div>

        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 mb-4">Mark</p>
        <div className="w-14 h-14 rounded-full border-[3px] border-zinc-900 flex items-center justify-center">
          <span className="w-3 h-3 rounded-full bg-red-600" />
        </div>
      </motion.div>
    </div>
  );
}

function BrandHero() {
  const { hero } = brandPillarContent;
  return (
    <section className="bg-white min-h-[100dvh] flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 pt-24 pb-7">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] items-center gap-16 lg:gap-12">
        <div>
          <motion.span
            className="inline-block text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            {hero.eyebrow}
          </motion.span>
          <motion.h1
            className="font-black uppercase tracking-tight text-zinc-900 mb-8"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
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
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
          >
            {hero.subtext}
          </motion.p>
          <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}>
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

        <BrandBoard />
      </div>
      <TrustStrip inHero />
    </section>
  );
}

// ─── Overview ───────────────────────────────────────────────────────────────
// Full-width statement, no side image (the hero already carries the visual).

function BrandOverview() {
  const { overview } = brandPillarContent;
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
          className="text-4xl md:text-6xl font-black uppercase tracking-tight text-zinc-900 leading-[0.95] mb-12 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Build a Brand That{" "}
          <span className="font-light normal-case text-red-600" style={holiday}>
            Means
          </span>{" "}
          Something
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-12">
          {overview.body.map((paragraph, i) => (
            <motion.p
              key={i}
              className="text-sm text-zinc-500 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <motion.div
          className="inline-flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white px-6 py-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">{overview.caption.label}</p>
            <p className="text-sm font-semibold text-zinc-900 max-w-sm">{overview.caption.text}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Services ───────────────────────────────────────────────────────────────
// Bento grid: two feature tiles (one dark/typographic, one photo) up top,
// three compact cards below. No repeated zigzag rows.

function ServiceTags({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] rounded-full ${
            dark
              ? "text-white/80 border border-white/20"
              : "text-zinc-600 border border-zinc-200 bg-white"
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

function BrandServices() {
  const [strategy, identity, ...rest] = brandPillarContent.subServices;

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
          Our{" "}
          <span className="font-light normal-case text-red-600" style={holiday}>
            Branding
          </span>{" "}
          Services
        </motion.h2>

        {/* Row 1: feature tiles */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          <motion.div
            className="lg:col-span-2 rounded-3xl bg-zinc-900 p-8 md:p-10 flex flex-col justify-between min-h-[380px]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-red-400 mb-4">
                {strategy.number} - {strategy.category}
              </p>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-[0.95] mb-4">
                {strategy.title}
              </h3>
              <p className="text-sm text-white/65 leading-relaxed">{strategy.description}</p>
            </div>
            <div className="mt-8">
              <ServiceTags items={strategy.includes} dark />
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-3 relative rounded-3xl overflow-hidden min-h-[380px]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={identity.image}
              alt={identity.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/25 to-transparent" />
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-red-400 mb-3">
                {identity.number} - {identity.category}
              </p>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-[0.95] mb-3">
                {identity.title}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed mb-5 max-w-md">{identity.description}</p>
              <div className="mb-6">
                <ServiceTags items={identity.includes} dark />
              </div>
              {identity.ctaHref && identity.ctaLabel && (
                <ServiceCta label={identity.ctaLabel} href={identity.ctaHref} light />
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
              <p className="text-xs font-black uppercase tracking-[0.25em] text-red-600 mb-3">
                {service.number} - {service.category}
              </p>
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
// Connected steps: a line ties the three numbered nodes together.

function BrandProcess() {
  const { process } = brandPillarContent;
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
          A{" "}
          <span className="font-light normal-case text-red-600" style={holiday}>
            Simple
          </span>{" "}
          Process, Built Around You.
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
// Compact bar, echoes the navbar's "Not sure where to start?" strip in red.

function BrandClosingCta() {
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

function RBrand({ caseStudies = [] }: { caseStudies?: PortfolioItem[] }) {
  return (
    <main className="bg-white">
      <BrandHero />
      <BrandOverview />
      <BrandServices />
      <BrandProcess />

      <CaseStudiesSection
        hideEyebrow
        heading={
          <>
            <span className="font-light normal-case text-red-600" style={holiday}>
              Branding
            </span>{" "}
            for Businesses in Glasgow & Beyond
          </>
        }
        intro={
          <>
            {brandPillarContent.caseStudies.body}{" "}
            <span className="font-semibold text-zinc-900">{brandPillarContent.caseStudies.emphasis}</span>
          </>
        }
        categories={["Branding", "Menus"]}
        extraItems={caseStudies}
      />

      <BrandClosingCta />
      <Footer />
    </main>
  );
}

export default RBrand;
