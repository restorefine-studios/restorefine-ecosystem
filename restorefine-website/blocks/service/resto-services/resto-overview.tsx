"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Feature {
  title: string;
  description: string;
  image: string;
}

interface RestoOverviewProps {
  title: string;
  subtitle: string;
  features: Feature[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function RestoOverview({ title, subtitle, features }: RestoOverviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
      setCurrentIndex(0);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextSlide = () => {
    if (isMobile) {
      if (currentIndex < features.length - 1) setCurrentIndex((p) => p + 1);
    } else {
      if (currentIndex + 3 < features.length) setCurrentIndex((p) => p + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex((p) => p - 1);
  };

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
          <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Overview</span>
        </motion.div>

        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 leading-[0.95] flex-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
          >
            {title}
          </motion.h2>
          <motion.p
            className="max-w-xs text-sm text-zinc-500 leading-relaxed flex-shrink-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Feature cards */}
        <div className="w-full relative overflow-hidden mb-8">
          <motion.div
            className="w-full flex gap-5"
            initial={false}
            animate={{
              x: `${-currentIndex * (isMobile ? 100 : 100 / 2.8)}%`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`flex-none ${isMobile ? "w-full" : "w-[calc(33.333%-1.25rem)]"}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative rounded-2xl overflow-hidden h-[350px] group bg-zinc-100">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    fill
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-lg font-black uppercase text-white mb-1 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Navigation */}
        <div
          className={`${features.length <= (isMobile ? 1 : 3) ? "hidden" : "flex"} justify-end gap-3`}
        >
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="w-11 h-11 rounded-full border border-zinc-200 text-zinc-600 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 disabled:opacity-30 transition-all duration-300 flex items-center justify-center"
            aria-label="Previous"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
          <button
            onClick={nextSlide}
            disabled={isMobile ? currentIndex >= features.length - 1 : currentIndex + 3 >= features.length}
            className="w-11 h-11 rounded-full bg-red-600 text-white hover:bg-zinc-900 disabled:opacity-30 transition-all duration-300 flex items-center justify-center"
            aria-label="Next"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
