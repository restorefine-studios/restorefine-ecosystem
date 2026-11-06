import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { DualTone } from "@/blocks/home-v2/dual-tone";
import { PhotoCard, PhotoRail, PhotoRailItem } from "@/blocks/home-v2/photo-card";
import { Typewriter } from "./typewriter";

/*
 * v2 versions of the older service-page sections (RestoMedia, RestoMerch, Launch).
 * Same props and copy as the sections they replace; only layout and type change.
 */

type Img = string | StaticImageData;

/** Heading on the left, supporting line on the right, as across the homepage */
export function SectionHead({ heading, tail, body, dark = false }: { heading: string; tail?: string; body?: ReactNode; dark?: boolean }) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
      <h2 className={`v2-h2 max-w-[18ch] lg:col-span-7 ${dark ? "text-white" : "text-zinc-950"}`}>
        <DualTone text={heading.replace(/\n/g, " ")} tail={tail} dark={dark} />
      </h2>
      {body && <div className={`v2-body max-w-[52ch] lg:col-span-4 lg:col-start-9 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{body}</div>}
    </div>
  );
}

/** Photo beside a heading and copy, with an optional caption card over the photo */
export function FeatureSplit({ image, alt, heading, paragraphs, caption, reverse = false }: { image: Img; alt: string; eyebrow?: string; heading: string; paragraphs: string[]; caption?: { label: string; text: string }; reverse?: boolean }) {
  return (
    <section className="v2-wrap py-24 lg:py-32">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className={`relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-zinc-100 lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}>
          <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          {caption && (
            <div className="absolute inset-x-4 bottom-4 rounded-[1.25rem] bg-white/90 p-5 backdrop-blur-md sm:inset-x-6 sm:bottom-6">
              <p className="v2-small font-medium text-zinc-500">{caption.label}</p>
              <p className="mt-1 font-medium text-zinc-950">{caption.text}</p>
            </div>
          )}
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <h2 className="v2-h2 max-w-[16ch] text-zinc-950">
            <DualTone text={heading} />
          </h2>
          <div className="mt-8 space-y-4">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="v2-body text-zinc-600">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** A heading over a snapping row of photo cards, each with its title and description */
export function FeatureRail({ heading, subtitle, features }: { heading: string; subtitle?: string; features: { title: string; description: string; image: string }[] }) {
  if (!features?.length) return null;
  return (
    <section className="py-24 lg:py-32">
      <div className="v2-wrap">
        <SectionHead heading={heading} body={subtitle} />
      </div>
      <div className="mt-14">
        <PhotoRail label={heading}>
          {features.map((f) => (
            <PhotoRailItem key={f.title}>
              <PhotoCard src={f.image || "/placeholder.svg"} alt={f.title} title={f.title} titleAs="h3" description={f.description} />
            </PhotoRailItem>
          ))}
        </PhotoRail>
      </div>
    </section>
  );
}

/** Numbered cards with an icon, title and line each (Launch's four phases) */
export function CardGrid({ heading, items }: { heading: string; items: { icon: ReactNode; title: string; desc: string }[] }) {
  return (
    <section className="v2-wrap py-24 lg:py-32">
      <SectionHead heading={heading} />
      <ul className="mt-14 grid gap-3 sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={item.title} className="group flex flex-col rounded-[1.5rem] bg-zinc-100 p-7 transition-colors duration-300 hover:bg-zinc-950 hover:text-white sm:p-9">
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">{item.icon}</span>
              <span className="v2-small font-medium text-zinc-400">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="v2-title-xl mt-12">{item.title}</h3>
            <p className="v2-body mt-3 max-w-[44ch] text-zinc-600 transition-colors group-hover:text-zinc-400">{item.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Dark card: what's included as a checklist, with a call to action */
export function IncludedCard({ heading, body, items, cta }: { heading: string; body: string; items: string[]; cta: ReactNode }) {
  return (
    <section className="px-2 sm:px-3">
      <div data-nav-dark className="rounded-[1.75rem] bg-zinc-950 py-20 text-white sm:rounded-[2rem] lg:py-28">
        <div className="v2-wrap grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <h2 className="v2-h2">{heading}</h2>
            <p className="v2-body mt-6 max-w-[40ch] text-zinc-400">{body}</p>
            <div className="mt-10">{cta}</div>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {items.map((item) => (
              <li key={item} className="flex items-center gap-3 border-t border-dashed border-red-600/60 py-4 text-zinc-200">
                <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** "How it works": the two steps as large image cards */
export function StepPair({ heading, subtitle, steps }: { heading: string; subtitle?: string; steps: { title: string; image: string }[] }) {
  return (
    <section className="v2-wrap py-24 lg:py-32">
      <SectionHead heading={heading} body={subtitle} />
      <ol className="mt-14 grid gap-3 sm:grid-cols-2">
        {steps.map((step, i) => (
          <li key={step.title} className="flex flex-col rounded-[1.75rem] bg-zinc-100 p-7 sm:p-10">
            <span className="font-[family-name:var(--v2-display)] text-[clamp(3rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.04em] text-red-600">{String(i + 1).padStart(2, "0")}</span>
            <div className="relative my-10 h-40 sm:h-52">
              <Image src={step.image} alt="" fill sizes="(min-width: 640px) 40vw, 90vw" className="object-contain" />
            </div>
            <h3 className="v2-title-xl">{step.title}</h3>
          </li>
        ))}
      </ol>
    </section>
  );
}

type ExpectationProps = {
  title: string;
  subtitle: string;
  partnerTitle: string;
  typewriterPhrases: string[];
  buildingCard: { image: string; title: string; subtitle: string };
  supportCard: { avatar: string; textImage: string; title: string; subtitle: string };
  iterationsCard: { image: string; title: string; subtitle: string };
  services: string[];
};

/** "What to expect" as a bento in the v2 style: same cards and copy as before */
export function Expectation(p: ExpectationProps) {
  const [first, ...rest] = p.partnerTitle.split(" ");
  return (
    <section className="v2-wrap py-24 lg:py-32">
      <SectionHead heading={p.title} body={p.subtitle} />
      <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <div data-nav-dark className="flex min-h-[18rem] items-center justify-center rounded-[1.75rem] bg-zinc-950 p-8 text-center text-white">
          <h3 className="v2-script text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1]">
            {first} <span className="text-red-600">{rest.join(" ")}</span>
          </h3>
        </div>
        <div className="flex min-h-[18rem] items-center justify-center rounded-[1.75rem] bg-zinc-100 p-8 lg:col-span-2">
          {p.typewriterPhrases?.length ? <Typewriter phrases={p.typewriterPhrases} /> : null}
        </div>
        {p.buildingCard.image && (
          <div data-nav-dark className="flex items-center gap-5 rounded-[1.75rem] bg-zinc-950 p-7 text-white">
            <Image src={p.buildingCard.image} alt="" width={80} height={80} className="h-16 w-16 rounded-full object-cover" />
            <div>
              <h3 className="v2-h3 capitalize">{p.buildingCard.title}</h3>
              <p className="v2-h3 capitalize">
                <span className="text-white/45">For </span>
                {p.buildingCard.subtitle}
              </p>
            </div>
          </div>
        )}
        {p.supportCard.avatar && (
          <div className="flex flex-col justify-between gap-8 rounded-[1.75rem] bg-zinc-100 p-7">
            <div className="flex items-center gap-3">
              <Image src={p.supportCard.avatar} alt="" width={60} height={60} className="h-12 w-auto object-contain" />
              {p.iterationsCard.image && <Image src={p.iterationsCard.image} alt="" width={140} height={60} className="h-10 w-auto object-contain" />}
            </div>
            <div>
              <h3 className="v2-h3 text-zinc-950">{p.supportCard.title}</h3>
              <p className="v2-small mt-1 text-zinc-500">{p.supportCard.subtitle}</p>
            </div>
          </div>
        )}
        {p.iterationsCard.image && (
          <div className="flex flex-col justify-between gap-8 rounded-[1.75rem] bg-zinc-100 p-7">
            {p.supportCard.textImage && <Image src={p.supportCard.textImage} alt="" width={240} height={60} className="h-12 w-auto object-contain" />}
            <div>
              <h3 className="v2-h3 text-zinc-950">{p.iterationsCard.title}</h3>
              <p className="v2-small mt-1 text-zinc-500">{p.iterationsCard.subtitle}</p>
            </div>
          </div>
        )}
      </div>
      {p.services?.length > 0 && (
        <ul className="mt-10 flex flex-wrap gap-2 border-t border-zinc-200 pt-8">
          {p.services.map((s) => (
            <li key={s} className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700">
              {s}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/** A staggered photo gallery (RestoMerch) */
export function Gallery({ images }: { images: { src: Img; alt: string }[] }) {
  const [a, b, hero, c, d] = images;
  const tile = (img: { src: Img; alt: string }, h: string) => (
    <div className={`group relative overflow-hidden rounded-[1.5rem] bg-zinc-100 ${h}`}>
      <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 32vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
    </div>
  );
  return (
    <section className="v2-wrap py-16 lg:py-24">
      <div className="grid gap-3 lg:grid-cols-3">
        <div className="grid gap-3 lg:mt-16">
          {tile(a, "h-[220px]")}
          {tile(b, "h-[320px]")}
        </div>
        {tile(hero, "h-[420px] lg:h-[560px]")}
        <div className="grid gap-3 lg:mt-16">
          {tile(c, "h-[320px]")}
          {tile(d, "h-[220px]")}
        </div>
      </div>
    </section>
  );
}

/** Three short service lines in dashed columns */
export function FeatureColumns({ features }: { features: { title: string; description: string }[] }) {
  return (
    <section className="v2-wrap pb-24 lg:pb-32">
      <ul className="grid gap-x-8 gap-y-10 md:grid-cols-3">
        {features.map((f) => (
          <li key={f.title} className="v2-dash pt-6 text-zinc-300">
            <h2 className="v2-title-xl text-zinc-950">{f.title}</h2>
            <p className="v2-body mt-3 text-zinc-600">{f.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
