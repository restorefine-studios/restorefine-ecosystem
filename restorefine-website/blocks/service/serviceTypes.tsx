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
      "We craft identities that speak before you say a word — logos, colour systems, typography, and brand guidelines built to own your niche.",
    tags: ["Branding", "Menu Design & Print", "Packaging", "Social Branding", "Merchandise"],
    image: "/services-brand.jpg",
  },
  {
    id: "02",
    slug: "content",
    title: "Content",
    description:
      "Scroll-stopping reels, photography, and campaigns that turn followers into bookings. Every frame shot with intention.",
    tags: ["Short-form Content", "Social Media Management", "Launch Campaigns", "Content Strategy", "Photography"],
    image: "/content-card-img.png",
  },
  {
    id: "03",
    slug: "performance",
    title: "Performance",
    description:
      "Websites, SEO, and data-driven paid campaigns that put your venue in front of hungry audiences at the exact right moment.",
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

export default function ServiceTypes({
  headline,
  subtext,
}: ServiceTypesProps) {
  return (
    <section className="bg-white px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="flex items-center gap-3 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="text-red-600 font-black text-sm">01</span>
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
            What We Do
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-20">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-zinc-900 leading-[0.95] flex-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
          >
            {headline}
          </motion.h2>
          <motion.p
            className="max-w-xs text-sm text-zinc-500 leading-relaxed flex-shrink-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
          >
            {subtext}
          </motion.p>
        </div>

        {/* Pillar rows */}
        <div className="divide-y divide-zinc-200 border-t border-zinc-200">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              className="py-14 md:py-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index * 0.5}
              variants={fadeUp}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-16 items-center">
                {/* Left: text content */}
                <div>
                  {/* Number + title row */}
                  <div className="flex items-baseline gap-6 mb-5">
                    <span className="text-6xl md:text-7xl lg:text-8xl font-black text-red-600 leading-none tabular-nums">
                      {pillar.id}
                    </span>
                    <h3
                      className="font-black uppercase tracking-tight text-zinc-900 leading-[0.9]"
                      style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
                    >
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-500 text-base leading-relaxed mb-7 max-w-xl">
                    {pillar.description}
                  </p>

                  {/* Service tag pills */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 text-xs font-black uppercase tracking-[0.1em] text-zinc-600 border border-zinc-200 rounded-full hover:border-red-600 hover:text-red-600 transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA link */}
                  <Link
                    href={`/services/${pillar.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-zinc-900 hover:text-red-600 transition-colors duration-200 group"
                  >
                    Explore {pillar.title}
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>

                {/* Right: image thumbnail */}
                <div className="relative rounded-2xl overflow-hidden bg-zinc-100 aspect-[4/3] lg:aspect-square w-full">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 320px"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
