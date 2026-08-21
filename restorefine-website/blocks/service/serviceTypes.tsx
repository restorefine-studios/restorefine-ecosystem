"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceTypesProps {
  headline: string;
  subtext: string;
  subServices: any[];
  serviceDetails: any[];
}

const pillars = [
  {
    id: "01",
    slug: "brand",
    title: "Brand",
    description:
      "Logos, colour systems, typography, and brand guidelines built to make a business instantly recognisable.",
    tags: ["Branding", "Menu Design & Print", "Packaging", "Social Branding", "Merchandise"],
    image: "/services-brand.jpg",
  },
  {
    id: "02",
    slug: "content",
    title: "Content",
    description:
      "Reels, photography, and campaigns crafted to turn scrollers into customers, one frame at a time.",
    tags: ["Short-form Content", "Social Media Management", "Launch Campaigns", "Content Strategy", "Photography"],
    image: "/content-card-img.png",
  },
  {
    id: "03",
    slug: "performance",
    title: "Performance",
    description:
      "Websites, SEO, and paid campaigns built to convert visibility into revenue, backed by data at every step.",
    tags: ["Websites", "SEO", "Paid Ads", "Conversion Optimisation", "Analytics"],
    image: "/services-performance.jpg",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function FeaturedPillarCard({ pillar, index }: { pillar: (typeof pillars)[number]; index: number }) {
  return (
    <motion.div
      className="group grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-0 rounded-2xl border border-zinc-200 bg-white overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.5}
      variants={fadeUp}
    >
      <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
        <div className="flex items-baseline gap-5 mb-5">
          <span className="text-6xl md:text-7xl font-black text-red-600 leading-none tabular-nums">
            {pillar.id}
          </span>
          <h3
            className="font-black uppercase tracking-tight text-zinc-900 leading-[0.9]"
            style={{ fontSize: "clamp(2.25rem, 4vw, 3.5rem)" }}
          >
            {pillar.title}
          </h3>
        </div>

        <p className="text-zinc-500 text-base leading-relaxed mb-7 max-w-md">{pillar.description}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {pillar.tags.map((tag) => (
            <span
              key={tag}
              className="px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.1em] text-zinc-600 border border-zinc-200 rounded-full group-hover:border-red-600/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/services/${pillar.slug}`}
          className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-zinc-900 hover:text-red-600 transition-colors duration-200 group/link w-fit"
        >
          Explore {pillar.title}
          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>
      </div>

      <div className="relative aspect-[4/3] lg:aspect-auto bg-zinc-100">
        <Image
          src={pillar.image}
          alt={pillar.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 420px"
        />
      </div>
    </motion.div>
  );
}

function PillarCard({ pillar, index }: { pillar: (typeof pillars)[number]; index: number }) {
  return (
    <motion.div
      className="group rounded-2xl border border-zinc-200 bg-white overflow-hidden flex flex-col"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.5}
      variants={fadeUp}
    >
      <div className="relative aspect-[16/10] bg-zinc-100">
        <Image
          src={pillar.image}
          alt={pillar.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-3xl font-black text-red-600 leading-none tabular-nums">{pillar.id}</span>
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-zinc-900 leading-[0.9]">
            {pillar.title}
          </h3>
        </div>

        <p className="text-zinc-500 text-sm leading-relaxed mb-5">{pillar.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {pillar.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-xs font-black uppercase tracking-[0.1em] text-zinc-600 border border-zinc-200 rounded-full group-hover:border-red-600/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/services/${pillar.slug}`}
          className="mt-auto inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-zinc-900 hover:text-red-600 transition-colors duration-200 group/link w-fit"
        >
          Explore {pillar.title}
          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ServiceTypes({
  headline,
  subtext,
}: ServiceTypesProps) {
  return (
    <section className="bg-white px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
            What We Do
          </span>
          <div className="h-px flex-1 bg-zinc-200" />
        </motion.div>

        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-zinc-900 leading-[0.95] mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          variants={fadeUp}
        >
          {headline}
        </motion.h2>
        <motion.p
          className="max-w-xl text-zinc-500 leading-relaxed mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          variants={fadeUp}
        >
          {subtext}
        </motion.p>

        {/* Pillar bento */}
        <div className="grid grid-cols-1 gap-6">
          <FeaturedPillarCard pillar={pillars[0]} index={0} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PillarCard pillar={pillars[1]} index={1} />
            <PillarCard pillar={pillars[2]} index={2} />
          </div>
        </div>
      </div>
    </section>
  );
}
