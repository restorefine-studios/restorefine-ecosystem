"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

interface Founder {
  name: string;
  role: string;
  about: string;
  image: string;
}

interface FoundersProps {
  headline: string;
  subtext: string;
  founders: Founder[];
}

/* Split the CMS "about" HTML into clean text paragraphs */
function toParagraphs(about: string): string[] {
  return about
    .split(/<br\s*\/?\s*><br\s*\/?\s*>/g)
    .map((p) => p.replace(/<[^>]+>/g, "").trim())
    .filter(Boolean);
}

export function Founders({ headline, subtext, founders }: FoundersProps) {
  const [active, setActive] = useState(0);

  if (founders.length === 0) return null;
  const f = founders[active];
  const paragraphs = toParagraphs(f.about);
  const firstName = f.name.split(" ")[0];

  /* Style the CMS headline: last word gets the holiday accent */
  const headlineWords = headline.trim().split(" ");
  const headlineAccent = headlineWords.pop() ?? "";
  const headlinePrefix = headlineWords.join(" ");

  return (
    <section className="py-20 md:py-32 bg-white overflow-x-clip">
      <div className="w-full">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-8 md:mb-10">
          <span className="w-6 h-px bg-red-600" />
          <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-zinc-400 font-medium">The People Behind It</span>
        </div>

        {/* Headline + subtext */}
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 md:gap-16 mb-14 md:mb-20 items-end">
          <h2 className="font-black text-zinc-950 tracking-tight leading-[1.05]" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
            <span className="uppercase">{headlinePrefix}</span>{" "}
            <span
              className="text-red-600 font-normal normal-case"
              style={{ fontFamily: "var(--font-holiday), serif", fontSize: "clamp(2.75rem, 6vw, 4.75rem)" }}
            >
              {headlineAccent}
            </span>
          </h2>
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed">{subtext}</p>
        </div>

        {/* Duo spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Giant ghost first name behind the layout */}
          <div className="hidden lg:block absolute -top-14 right-0 pointer-events-none select-none" aria-hidden>
            <AnimatePresence mode="wait">
              <motion.span
                key={active}
                initial={{ opacity: 0, x: 48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -48 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="block font-black uppercase leading-none"
                style={{ fontSize: "clamp(6rem, 13vw, 12rem)", WebkitTextStroke: "1.5px #e4e4e7", color: "transparent" }}
              >
                {firstName}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="relative grid lg:grid-cols-[minmax(320px,420px)_1fr] gap-10 lg:gap-16 xl:gap-24 items-center">
            {/* Portrait with tilted red backing card */}
            <div className="relative max-w-[420px] w-full mx-auto lg:mx-0">
              <div className="absolute -inset-2 rotate-3 rounded-[32px] bg-red-600/10" />
              <div className="absolute -inset-2 -rotate-2 rounded-[32px] border border-red-600/20" />
              <div className="relative rounded-[32px] overflow-hidden bg-zinc-100" style={{ aspectRatio: "3 / 4" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    animate={{ clipPath: "inset(0% 0 0 0)" }}
                    exit={{ clipPath: "inset(0 0 100% 0)" }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={f.image || "/placeholder.svg"}
                      alt={f.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 90vw, 420px"
                    />
                  </motion.div>
                </AnimatePresence>
                {/* Index badge */}
                <span className="absolute bottom-5 left-5 z-10 text-[10px] font-black tracking-[0.35em] uppercase text-white/70 drop-shadow">
                  {String(active + 1).padStart(2, "0")} / {String(founders.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Bio */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="inline-flex items-center text-[10px] font-black tracking-[0.3em] uppercase text-red-600 bg-red-50 border border-red-100 px-3 py-1.5 rounded-full">
                    {f.role}
                  </span>
                  <p
                    className="text-red-600 mt-9 md:mt-12"
                    style={{ fontFamily: "var(--font-holiday), serif", fontSize: "clamp(2.75rem, 5vw, 4.25rem)", lineHeight: 1.1 }}
                  >
                    {f.name}
                  </p>
                  <Quote size={18} className="text-red-600 rotate-180 mt-6" fill="currentColor" strokeWidth={0} />
                  <div className="mt-4 flex flex-col gap-4 max-w-xl">
                    {paragraphs.map((p, i) => (
                      <p key={i} className="text-zinc-600 text-sm md:text-base leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Switcher */}
              <div className="flex gap-10 border-t border-zinc-200 pt-6 mt-10">
                {founders.map((founder, i) => {
                  const isActive = i === active;
                  return (
                    <button key={i} onClick={() => setActive(i)} className="text-left group">
                      <span className={`block text-[10px] font-black tabular-nums transition-colors duration-300 ${isActive ? "text-red-600" : "text-zinc-300 group-hover:text-zinc-400"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`block font-black uppercase tracking-tight text-lg md:text-xl mt-1 transition-colors duration-300 ${
                          isActive ? "text-zinc-950" : "text-zinc-400 group-hover:text-zinc-600"
                        }`}
                      >
                        {founder.name}
                      </span>
                      <span
                        className={`block h-0.5 mt-2 origin-left transition-transform duration-500 ease-out bg-red-600 ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
