"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ServicesHeroProps {
  headline: string;
  subtext: string;
  image: string;
  marquee: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ServicesHero({ headline, subtext, image, marquee }: ServicesHeroProps) {
  return (
    <section className="bg-white pt-36 pb-0 overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* Eyebrow */}
        <motion.span
          className="inline-block text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Our Services
        </motion.span>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 pb-16 border-b border-zinc-200">
          <div className="flex-1">
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-zinc-900 leading-[0.9] max-w-2xl"
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeUp}
            >
              {headline.split(" ").map((word, i) => (
                <span key={i} className={i === 0 ? "text-red-600" : ""}>
                  {word}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.p
              className="mt-8 max-w-sm text-sm text-zinc-500 leading-relaxed"
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeUp}
            >
              {subtext}
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fadeUp}
            >
              <Link href="/enquire-now" className="inline-flex items-center gap-2 mt-8 group">
                <span className="text-sm font-black uppercase tracking-[0.15em] bg-zinc-900 text-white px-7 py-3.5 rounded-full group-hover:bg-red-600 transition-colors duration-300">
                  Let&apos;s Craft Something
                </span>
                <span className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center group-hover:bg-zinc-900 transition-colors duration-300">
                  <ArrowRight className="w-5 h-5 text-white" />
                </span>
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="w-full lg:w-[45%] xl:w-[40%]"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt="Services Hero Graphic"
              width={750}
              height={750}
              className="w-full h-auto"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="bg-zinc-900 py-5 mt-0 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="text-2xl md:text-3xl font-black uppercase tracking-[0.2em] text-white/20 mx-8 flex-shrink-0"
            >
              {marquee}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesHero;
