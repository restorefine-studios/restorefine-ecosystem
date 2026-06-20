"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { blogPosts } from "@/lib/blogContent";
import { CaseStudiesSection } from "@/blocks/service/resto-services/case-studies";
import Cta from "@/components/cta";

/* ─── Types ─────────────────────────────────────────────────────── */

interface SubService {
  number: string;
  title: string;
  description: string;
  image: string;
  href?: string;
  includes: string[];
}

export interface PillarPageData {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    description: string;
    ctaLabel: string;
  };
  overview: {
    headline: string;
    body: string;
    bullets: string[];
  };
  subServices: SubService[];
  relatedBlogSlugs: string[];
  caseStudyCategories: string[];
}

/* ─── Animation variants ─────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── Section label ──────────────────────────────────────────────── */

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <motion.div
      className="flex items-center gap-3 mb-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
    >
      <span className="text-red-600 font-black text-sm">{index}</span>
      <div className="h-px flex-1 bg-zinc-200" />
      <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">{label}</span>
    </motion.div>
  );
}

/* ─── 1. HERO ────────────────────────────────────────────────────── */

function Hero({ data }: { data: PillarPageData }) {
  return (
    <section className="bg-white min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-24 pt-20 pb-24 relative overflow-hidden">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-red-50 via-violet-50 to-sky-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="max-w-4xl w-full mx-auto relative flex flex-col items-center">
        <motion.span
          className="inline-block text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {data.hero.eyebrow}
        </motion.span>
        <motion.h1
          className="font-black uppercase tracking-tight text-zinc-900 mb-10"
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
        >
          <span className="block relative z-0 text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7rem] leading-[0.9]">
            {data.hero.line1}
          </span>
          <span
            className="block relative z-10 font-light text-red-600 normal-case leading-none whitespace-nowrap"
            style={{ fontFamily: "var(--font-holiday), serif", fontSize: "clamp(3.5rem, 11vw, 8.5rem)", marginTop: "-1.2rem" }}
          >
            {data.hero.line2}
          </span>
        </motion.h1>
        <motion.p
          className="max-w-lg text-sm text-zinc-500 leading-relaxed mb-8"
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
        >
          {data.hero.description}
        </motion.p>
        <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}>
          <Link href="/enquire-now" className="inline-flex items-center gap-2 group">
            <span className="text-sm font-black uppercase tracking-[0.15em] bg-zinc-900 text-white px-7 py-3.5 rounded-full group-hover:bg-red-600 transition-colors duration-300">
              {data.hero.ctaLabel}
            </span>
            <span className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center group-hover:bg-zinc-900 transition-colors duration-300">
              <ArrowRight className="w-5 h-5 text-white" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 2. OVERVIEW ────────────────────────────────────────────────── */

function Overview({ data }: { data: PillarPageData }) {
  return (
    <section className="bg-white py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <SectionLabel index="01" label="What We Solve" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left col */}
          <div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-zinc-900 leading-[0.95] mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
            >
              {data.overview.headline}
            </motion.h2>
            <motion.p
              className="text-zinc-500 leading-relaxed text-base"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fadeUp}
            >
              {data.overview.body}
            </motion.p>
          </div>

          {/* Right col: bullets */}
          <div className="space-y-5">
            {data.overview.bullets.map((bullet, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.5}
                variants={fadeUp}
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center mt-0.5">
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                </span>
                <p className="text-zinc-700 leading-relaxed">{bullet}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 3. SUBSERVICES ─────────────────────────────────────────────── */

function SubServices({ data }: { data: PillarPageData }) {
  return (
    <section className="bg-zinc-50 py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <SectionLabel index="02" label="Our Services" />

        <div className="space-y-24">
          {data.subServices.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={service.number}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
                variants={fadeUp}
              >
                {/* Image */}
                <div
                  className={`relative rounded-2xl overflow-hidden bg-zinc-200 aspect-[4/3] ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Text */}
                <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-red-600 mb-3">
                    {service.number}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900 leading-[0.95] mb-4">
                    {service.title}
                  </h3>
                  <p className="text-zinc-500 leading-relaxed mb-6">{service.description}</p>

                  {/* Includes pills */}
                  <div className="mb-7">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-3">
                      What&apos;s Included
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.includes.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1.5 text-xs font-black uppercase tracking-[0.1em] text-zinc-600 border border-zinc-200 rounded-full bg-white"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Optional CTA */}
                  {service.href && (
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-zinc-900 hover:text-red-600 transition-colors duration-200 group"
                    >
                      Learn More
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── 4. RELATED ARTICLES ────────────────────────────────────────── */

function RelatedArticles({ slugs }: { slugs: string[] }) {
  const posts = blogPosts.filter((p) => slugs.includes(p.slug)).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="bg-white py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <SectionLabel index="03" label="Insights" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.5}
              variants={fadeUp}
            >
              <Link href={`/resources/${post.slug}`} className="group block">
                {/* Image */}
                <div className="relative rounded-2xl overflow-hidden bg-zinc-100 aspect-[16/9] mb-4">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Meta */}
                <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">
                  {post.date}
                </p>
                <h3 className="text-base font-black uppercase tracking-tight text-zinc-900 leading-tight mb-2 group-hover:text-red-600 transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Main export ────────────────────────────────────────────────── */

export default function PillarPage({ data }: { data: PillarPageData }) {
  return (
    <>
      <Hero data={data} />
      <Overview data={data} />
      <SubServices data={data} />
      <RelatedArticles slugs={data.relatedBlogSlugs} />
      <CaseStudiesSection
        sectionNumber="04"
        sectionLabel="Case Studies"
        categories={data.caseStudyCategories}
      />
      <div className="px-6 md:px-12 lg:px-24">
        <Cta />
      </div>
    </>
  );
}
