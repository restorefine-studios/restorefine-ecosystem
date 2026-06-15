"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  id: number;
  name: string;
  position: string;
  review: string;
  image: string;
  companyLogo: string;
}

interface ReviewsProps {
  reviews: Review[];
  headline: string;
  subtext: string;
}

function QuoteCarousel({ reviews, headline, className }: { reviews: Review[]; headline: string; className?: string }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const touchStartX = useRef(0);

  const go = (next: number) => {
    setDir(next > active ? 1 : -1);
    setActive(next);
  };

  const prev = () => go(active === 0 ? reviews.length - 1 : active - 1);
  const next = () => go(active === reviews.length - 1 ? 0 : active + 1);

  const r = reviews[active];

  return (
    <section
      className={className}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (dx < -40) next();
        else if (dx > 40) prev();
      }}
    >
      {/* Header */}
      <div className="mb-10 md:mb-14">
        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-zinc-400 font-medium mb-2">Client Stories</p>
        <h2
          className="font-light text-zinc-950"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", lineHeight: 0.95, fontFamily: "var(--font-holiday), serif" }}
        >
          <span className="font-black not-italic" style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>Our</span> <span className="text-red-600">Clients</span><span className="text-red-600">.</span>
        </h2>
      </div>

      {/* Quote area */}
      <div className="relative">
        {/* Giant decorative quote */}
        <span
          className="absolute -top-6 -left-2 md:-top-10 md:-left-4 text-red-600 select-none leading-none font-black opacity-10 pointer-events-none"
          style={{ fontSize: "clamp(8rem, 20vw, 16rem)", fontFamily: "var(--font-holiday), serif" }}
          aria-hidden
        >
          &ldquo;
        </span>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={active}
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8 md:gap-10 pt-8 md:pt-12"
          >
            {/* Quote text */}
            <p
              className="text-zinc-900 leading-snug font-light max-w-3xl"
              style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
            >
              &ldquo;{r.review}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 md:w-14 md:h-14 rounded-full overflow-hidden bg-zinc-200 shrink-0">
                <Image src={r.companyLogo || ""} alt={r.name} fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm md:text-base font-bold text-zinc-900">{r.name}</p>
                <p className="text-xs md:text-sm text-zinc-400 tracking-wide">{r.position}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots + nav */}
      <div className="flex items-center justify-between mt-10 md:mt-14">
        <div className="flex items-center gap-2">
          {reviews.map((_, i) => (
            <button key={i} onClick={() => go(i)}>
              <motion.div
                animate={{ width: i === active ? 20 : 6, backgroundColor: i === active ? "#dc2626" : "#d4d4d8" }}
                transition={{ duration: 0.3 }}
                className="h-1 rounded-full"
              />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={prev} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-red-600 text-red-600 flex items-center justify-center text-lg font-bold hover:bg-red-50 transition-colors">‹</button>
          <button onClick={next} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-600 text-white flex items-center justify-center text-lg font-bold hover:bg-red-700 transition-colors">›</button>
        </div>
      </div>
    </section>
  );
}

export function Reviews({ reviews, headline }: ReviewsProps) {
  return (
    <QuoteCarousel
      reviews={reviews}
      headline={headline}
      className="section-bleed py-16 md:py-32 bg-white overflow-hidden"
    />
  );
}
