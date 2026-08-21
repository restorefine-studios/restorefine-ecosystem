"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { useEffect, useMemo, useState, type CSSProperties } from "react";

type ServiceId = "brand" | "content" | "performance";

type HeroService = {
  id: ServiceId;
  label: string;
  displayTitle: string;
  headline: string;
  headlineLines: string[];
  subcopy: string;
  href: string;
};

const services: HeroService[] = [
  {
    id: "brand",
    label: "Brand",
    displayTitle: "Brand",
    headline: "We don’t follow trends, we build",
    headlineLines: ["We don’t follow", "trends, we build"],
    subcopy: "Identity systems, menus, packaging, print, and digital foundations made for hospitality.",
    href: "/services/brand",
  },
  {
    id: "content",
    label: "Content",
    displayTitle: "Content",
    headline: "We don’t chase attention, we create",
    headlineLines: ["We don’t chase", "attention, we create"],
    subcopy: "Reels, campaigns, photography, and launch assets that make the brand feel alive.",
    href: "/services/content",
  },
  {
    id: "performance",
    label: "Performance",
    displayTitle: "Performance",
    headline: "We don’t guess growth, we drive",
    headlineLines: ["We don’t guess", "growth, we drive"],
    subcopy: "Websites, SEO, paid ads, analytics, and conversion paths built around enquiries.",
    href: "/services/performance",
  },
];

function CharacterText({
  text,
  reduceMotion,
  className = "",
  style,
  delayBase = 0,
}: {
  text: string;
  reduceMotion: boolean;
  className?: string;
  style?: CSSProperties;
  delayBase?: number;
}) {
  const characters = Array.from(text);

  return (
    <span className={className} style={style} aria-label={text}>
      {characters.map((character, index) => (
        <motion.span
          key={`${text}-${character}-${index}`}
          aria-hidden="true"
          className="inline-block"
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: "0.42em",
                  rotateX: -62,
                  filter: "blur(10px)",
                }
          }
          animate={{
            opacity: 1,
            y: "0em",
            rotateX: 0,
            filter: "blur(0px)",
          }}
          exit={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: "-0.32em",
                  rotateX: 54,
                  filter: "blur(10px)",
                }
          }
          transition={{
            duration: 0.52,
            delay: delayBase + index * 0.018,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {character === " " ? "\u00A0" : character}
        </motion.span>
      ))}
    </span>
  );
}

function HeroHeadline({
  active,
  heroWord,
  reduceMotion,
}: {
  active: HeroService;
  heroWord: string;
  reduceMotion: boolean;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.h1
        key={active.id}
        className="text-[clamp(2.3rem,9vw,7.9rem)] font-black leading-[0.98] tracking-[-0.03em] text-zinc-950 sm:leading-[0.92] sm:tracking-[-0.055em]"
        initial={false}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
      >
        <span className="mx-auto block">
          {active.headlineLines.map((line, index) => (
            <CharacterText
              key={`${active.id}-${line}`}
              text={line}
              reduceMotion={reduceMotion}
              className="block whitespace-normal sm:whitespace-nowrap"
              delayBase={index * 0.08}
            />
          ))}
        </span>
        <CharacterText
          text={heroWord}
          reduceMotion={reduceMotion}
          className="mt-1 block pb-8 font-normal leading-[0.78] tracking-normal text-red-600 sm:pb-10"
          style={{ fontFamily: "var(--font-holiday), serif" }}
          delayBase={0.16}
        />
      </motion.h1>
    </AnimatePresence>
  );
}

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const reduce = Boolean(reduceMotion);
  const active = useMemo(() => services[activeIndex] ?? services[0], [activeIndex]);
  const heroWord = active.id === "brand" ? "Brands" : active.displayTitle;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % services.length);
    }, 4400);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative w-screen ml-[calc(-50vw+50%)]">
      <div className="relative min-h-[100dvh] overflow-hidden bg-[#f2f4f6] px-[clamp(1rem,2.5vw,3.5rem)] pb-7 pt-32 lg:pt-40">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.11]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(9,9,11,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(9,9,11,0.18) 1px, transparent 1px)",
            backgroundSize: "74px 74px",
          }}
        />
        <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-8rem)] w-full max-w-[1800px] flex-col justify-center pt-3">
          <div className="mx-auto max-w-[1180px] text-center">
            <div className="relative mx-auto flex min-h-[clamp(20rem,31vw,33rem)] items-center justify-center">
              <HeroHeadline active={active} heroWord={heroWord} reduceMotion={reduce} />
            </div>
            <div className="mx-auto mt-5 flex min-h-[4.5rem] max-w-[43rem] items-start justify-center sm:min-h-[3.75rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active.id}
                  className="text-base font-medium leading-relaxed text-zinc-500 sm:text-lg"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  {active.subcopy}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/enquire-now"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-red-600 px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-red-500 active:translate-y-px"
              >
                Enquire Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={active.href}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-zinc-950/12 bg-white/58 px-5 py-4 text-sm font-semibold text-zinc-950 transition-colors hover:bg-white"
              >
                Explore {active.label}
                <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
