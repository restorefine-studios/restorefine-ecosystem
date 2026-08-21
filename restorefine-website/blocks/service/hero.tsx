"use client";

import { motion } from "framer-motion";

interface ServicesHeroProps {
  headline: string;
  subtext: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ServicesHero({ headline, subtext }: ServicesHeroProps) {
  const words = headline.trim().split(" ");
  const line1 = words.slice(0, -1).join(" ") || words[0];
  const line2 = words.length > 1 ? words[words.length - 1] : "";

  return (
    <section className="bg-white flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-24 pt-24 pb-24 relative overflow-hidden">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-red-50 via-violet-50 to-sky-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="max-w-4xl w-full mx-auto relative flex flex-col items-center">
        <motion.span
          className="inline-block text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Our Services
        </motion.span>

        <motion.h1
          className="font-black uppercase tracking-tight text-zinc-900 mb-10"
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
        >
          <span className="block relative z-0 text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7rem] leading-[0.9]">
            {line1}
          </span>
          {line2 && (
            <span
              className="block relative z-10 font-light text-red-600 normal-case leading-[1.15] whitespace-nowrap pb-2"
              style={{ fontFamily: "var(--font-holiday), serif", fontSize: "clamp(3.5rem, 11vw, 8.5rem)", marginTop: "-1rem" }}
            >
              {line2}
            </span>
          )}
        </motion.h1>

        <motion.p
          className="max-w-lg text-sm text-zinc-500 leading-relaxed"
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
        >
          {subtext}
        </motion.p>
      </div>
    </section>
  );
}

export default ServicesHero;
