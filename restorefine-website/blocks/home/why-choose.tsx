"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { GoogleG, GoogleStars, googleReviewsLinkProps } from "@/components/google-reviews";
import { homeContent, type PageContent } from "@/lib/homepageData";
import { WhatsAppLink } from "./cta-links";
import { Reveal } from "./reveal";
import { type } from "./type-scale";

type Item = PageContent["whyChoose"]["items"][number] & { tagline?: string };
type Proof = PageContent["whyChoose"]["proof"];
const ease = [0.16, 1, 0.3, 1] as const;

function Title({ children, light = false, size = "base" }: { children: string; light?: boolean; size?: "base" | "lg" }) {
  return (
    <h3 className={`font-black uppercase leading-[0.98] tracking-[-0.035em] ${size === "lg" ? "text-3xl sm:text-4xl" : "text-2xl"} ${light ? "text-white" : "text-zinc-950"}`}>
      {children}
    </h3>
  );
}

function Body({ children, tone = "zinc" }: { children: string; tone?: "zinc" | "light" | "red" }) {
  const color = tone === "light" ? "text-zinc-300" : tone === "red" ? "text-red-50" : "text-zinc-600";
  return <p className={`mt-3 max-w-[52ch] text-sm leading-relaxed sm:text-[15px] ${color}`}>{children}</p>;
}

/* Rotates real Google review excerpts; holds on the first under reduced motion */
function ReviewTicker({ reviews }: { reviews: Proof["reviews"] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % reviews.length), 5200);
    return () => window.clearInterval(id);
  }, [reduce, reviews.length]);

  const review = reviews[index];
  return (
    <div className="relative min-h-[9.5rem]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.figure
          key={review.name}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease }}
        >
          <blockquote className="text-xl font-bold leading-snug tracking-[-0.02em] text-zinc-950 sm:text-2xl">&ldquo;{review.quote}&rdquo;</blockquote>
          <figcaption className="mt-4 text-sm text-zinc-500">
            <span className="font-semibold text-zinc-800">{review.name}</span>, {review.business}
          </figcaption>
        </motion.figure>
      </AnimatePresence>
    </div>
  );
}

export function WhyChoose({
  whyChoose = homeContent.whyChoose,
  caseStudies = homeContent.clientSpotlight,
  services = homeContent.services,
  ctas = homeContent.ctas,
}: {
  whyChoose?: PageContent["whyChoose"];
  caseStudies?: PageContent["clientSpotlight"];
  services?: PageContent["services"];
  ctas?: PageContent["ctas"];
}) {
  const { proof } = whyChoose;
  const byId = Object.fromEntries(whyChoose.items.map((i) => [i.id, i])) as Record<string, Item>;
  const serviceNames = [...services.core.map((s) => s.title), ...services.more.map((s) => s.title)];
  const rating = byId["rating"];
  const founder = byId["founder-led"];
  const roi = byId["roi"];
  const response = byId["response"];
  const reporting = byId["reporting"];
  const strategy = byId["strategy"];
  const cases = byId["case-studies"];
  const oneRoof = byId["one-roof"];

  return (
    <section className="py-24 lg:py-32">
      <Reveal>
        <h2 className={`max-w-[20ch] ${type.section} font-black uppercase leading-[0.98] tracking-[-0.04em] text-zinc-950`}>{whyChoose.heading}</h2>
        <p className="mt-7 max-w-[65ch] text-base leading-relaxed text-zinc-600 sm:text-lg">{whyChoose.body}</p>
      </Reveal>

      <div className="mt-14 grid gap-3 md:grid-cols-6 lg:grid-cols-12">
        {/* 5-star rating with live review excerpts */}
        <Reveal className="flex flex-col justify-between rounded-[2rem] border border-zinc-200 bg-white p-8 md:col-span-6 lg:col-span-5">
          <a {...googleReviewsLinkProps} aria-label="Read our Google reviews" className="inline-flex items-center gap-3 self-start no-underline transition-transform duration-300 hover:-translate-y-0.5">
            <GoogleG className="h-7 w-7" />
            <GoogleStars className="h-6 w-6" />
          </a>
          <div className="mt-8">
            <ReviewTicker reviews={proof.reviews} />
          </div>
          <div className="mt-8 border-t border-zinc-100 pt-6">
            <Title>{rating.title}</Title>
            <Body>{rating.description}</Body>
          </div>
        </Reveal>

        {/* Founders */}
        <Reveal delay={0.05} className="relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-zinc-900 p-8 md:col-span-3 lg:col-span-3 lg:row-span-2">
          <div className="absolute inset-0 grid grid-rows-2">
            {proof.founders.map((f) => (
              <div key={f.src} className="relative">
                <Image src={f.src} alt={f.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover object-[50%_25%]" />
              </div>
            ))}
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
          <div className="relative">
            <Title light>{founder.title}</Title>
            <Body tone="light">{founder.description}</Body>
          </div>
        </Reveal>

        {/* ROI */}
        <Reveal delay={0.1} className="relative flex min-h-[18rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-zinc-950 p-8 md:col-span-3 lg:col-span-4">
          <Image src={proof.roiImage.src} alt={proof.roiImage.alt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover opacity-70" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
          <div className="relative">
            <Title light>{roi.title}</Title>
            <Body tone="light">{roi.description}</Body>
          </div>
        </Reveal>

        {/* Response, with the real way to test it */}
        <Reveal className="flex flex-col justify-between gap-8 rounded-[2rem] bg-red-600 p-8 md:col-span-3 lg:col-span-5">
          <div>
            <Title light>{response.title}</Title>
            <Body tone="red">{response.description}</Body>
          </div>
          <div>
            <WhatsAppLink {...ctas.whatsapp} />
          </div>
        </Reveal>

        {/* Reporting */}
        <Reveal delay={0.05} className="flex flex-col overflow-hidden rounded-[2rem] bg-zinc-950 md:col-span-3 lg:col-span-4">
          <div className="p-8 pb-4">
            <Title light>{reporting.title}</Title>
            <Body tone="light">{[reporting.description, whyChoose.closing].filter(Boolean).join(" ")}</Body>
          </div>
          <div className="relative mt-auto aspect-[16/7]">
            <Image src={proof.reportingImage.src} alt={proof.reportingImage.alt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover object-bottom" />
          </div>
        </Reveal>

        {/* Strategy */}
        <Reveal className="flex flex-col justify-between rounded-[2rem] bg-[#f2f4f6] p-8 md:col-span-6 lg:col-span-4">
          {strategy.tagline && (
            <p className="text-[clamp(1.6rem,2.4vw,2.25rem)] font-black leading-[1.05] tracking-[-0.035em] text-red-600">{strategy.tagline}</p>
          )}
          <div className="mt-12">
            <Title>{strategy.title}</Title>
            <Body>{strategy.description}</Body>
          </div>
        </Reveal>

        {/* Case studies */}
        <Reveal delay={0.05} className="flex flex-col gap-6 rounded-[2rem] border border-zinc-200 bg-white p-4 md:col-span-6 lg:col-span-8">
          <div className="grid grid-cols-3 gap-3">
            {caseStudies.slice(0, 3).map((c) => (
              <Link key={c.id} href={c.href} aria-label={c.meta.Client} className="group relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-zinc-100 no-underline">
                <Image
                  src={c.image}
                  alt={c.meta.Client}
                  fill
                  sizes="(min-width: 1024px) 20vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
                />
              </Link>
            ))}
          </div>
          <div className="flex items-end justify-between gap-6 px-4 pb-4">
            <div>
              <Title>{cases.title}</Title>
              <Body>{cases.description}</Body>
            </div>
            <Link
              href="/portfolio"
              aria-label={cases.title}
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white no-underline transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-red-600"
            >
              <ArrowUpRight className="h-5 w-5" strokeWidth={1.75} />
            </Link>
          </div>
        </Reveal>

        {/* One roof: every service, in one strip */}
        <Reveal className="overflow-hidden rounded-[2rem] bg-zinc-950 py-10 md:col-span-6 lg:col-span-12">
          <div className="px-8 sm:px-10">
            <Title light size="lg">{oneRoof.title}</Title>
            <Body tone="light">{oneRoof.description}</Body>
          </div>
          <div className="relative mt-10 flex overflow-hidden" aria-hidden="true">
            <div className="flex shrink-0 animate-scroll gap-3 pr-3 motion-reduce:animate-none">
              {[...serviceNames, ...serviceNames].map((name, i) => (
                <span key={`${name}-${i}`} className="whitespace-nowrap rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-200">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

    </section>
  );
}
