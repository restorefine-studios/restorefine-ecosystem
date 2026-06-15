"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface RestoServicesHeroProps {
  titletop: string;
  titlebottom: string;
  description: string;
  heroClass?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

function RestoServicesHero({
  titletop,
  titlebottom,
  description,
  heroClass = "",
}: RestoServicesHeroProps) {
  return (
    <section
      className={`${heroClass} bg-white min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-24 pt-20 pb-24 relative overflow-hidden`}
    >
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-red-50 via-violet-50 to-sky-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="max-w-4xl w-full mx-auto relative flex flex-col items-center">
        <motion.span
          className="inline-block text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          RestoRefine Services
        </motion.span>

        <motion.h1
          className="font-black uppercase tracking-tight text-zinc-900 mb-10"
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
        >
          <span className="block relative z-0 text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7rem] leading-[0.9]">{titletop}</span>
          <span
            className="block relative z-10 font-light text-red-600 normal-case leading-none whitespace-nowrap"
            style={{ fontFamily: "var(--font-holiday), serif", fontSize: "clamp(3.5rem, 11vw, 8.5rem)", marginTop: "-1.2rem" }}
          >
            {titlebottom}
          </span>
        </motion.h1>

        <motion.p
          className="max-w-lg text-sm text-zinc-500 leading-relaxed mb-8"
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
        >
          {description}
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={3}
          variants={fadeUp}
        >
          <Link
            href="/enquire-now"
            className="inline-flex items-center gap-2 group"
          >
            <span className="text-sm font-black uppercase tracking-[0.15em] bg-zinc-900 text-white px-7 py-3.5 rounded-full group-hover:bg-red-600 transition-colors duration-300">
              Let&apos;s Craft Something
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

export default RestoServicesHero;
