import Image from "next/image";
import type { ReactNode } from "react";
import { BriefcaseBusiness, House } from "lucide-react";
import { GoogleG, googleReviewsLinkProps } from "@/components/google-reviews";
import { Footer } from "@/components/footer";
import { V2Shell } from "@/blocks/home-v2";
import { EnquireAction } from "@/blocks/home-v2/actions";
import { DualTone } from "@/blocks/home-v2/dual-tone";
import { PhotoCard, PhotoRail, PhotoRailItem } from "@/blocks/home-v2/photo-card";
import { ServicesShowcase } from "@/blocks/home-v2/services-showcase";
import { portfolioItems, type PortfolioItem } from "@/lib/portfolio";
import type { TikTokVideo } from "@/lib/tiktok-videos";
import { TikTokRail } from "@/blocks/service-v2/tiktok-rail";

/*
 * Service pillar page in the homepage v2 design. Every string comes from the
 * page's own content file (lib/pillar-content) or the old page, unchanged; this
 * only decides layout and type.
 */

export type PillarService = {
  number: string;
  category?: string;
  title: string;
  description: string;
  image: string;
  includes: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

export type PillarPost = { slug: string; title: string; thumbnail: string; date: string };

export type PillarProps = {
  heroImage: string;
  hero: { eyebrow: string; line1: string; line2: string; subtext: string; ctaLabel: string };
  /** The one word of the hero title set in the script */
  heroAccent: string;
  overview: { intro?: string; heading: string; headingTail?: string; body: string[]; problems?: string[]; caption?: { label: string; text: string } };
  servicesHeading: string;
  servicesTail?: string;
  services: PillarService[];
  process: { heading: string; tail?: string; intro: string[]; steps: { number: string; title: string; description: string }[] };
  insights?: { heading: string; tail?: string; body: string; posts: PillarPost[] };
  caseStudies: { heading: string; tail?: string; intro: ReactNode; categories: string[]; extraItems: PortfolioItem[]; /** Client TikToks played in place of the portfolio cards */ videos?: TikTokVideo[] };
};

const thumb = (t: PortfolioItem["thumbnail"]) => (typeof t === "string" ? t : t.src);

/** Where the subject sits in tall photos, so the wide slider frame crops onto it */
const FOCUS: Record<string, string> = {
  "/content-card-img.png": "60% 74%",
};

/**
 * One word of the title in the red script, the rest in the display face, as the
 * homepage hero sets "Growth". A leading accent sits on its own line above; one in
 * the middle or at the end stays inline. The words and their order are unchanged.
 */
export function ScriptTitle({ text, accent }: { text: string; accent: string }) {
  const at = text.indexOf(accent);
  if (at < 0) return <>{text}</>;
  const before = text.slice(0, at).trim();
  const after = text.slice(at + accent.length).trim();
  const script = <span className="v2-script text-[1.25em] text-red-600">{accent}</span>;
  if (!before)
    return (
      <>
        <span className="block pb-2">{script}</span> {after}
      </>
    );
  return (
    <>
      {before} {script} {after}
    </>
  );
}

/* Dark photo card, headline low left, as on the homepage */
export function ServiceHero({
  image,
  title,
  subtext,
  ctaLabel,
  stats,
}: {
  image: string;
  /** Kept in the content files but no longer shown: labels above headlines read as filler */
  eyebrow?: string;
  title: ReactNode;
  subtext: string;
  ctaLabel: string;
  stats?: { value: string; label: string }[];
}) {
  return (
    <section className="sm:px-3 sm:pt-24">
      <div data-nav-dark className="relative isolate flex min-h-[min(100svh,64rem)] flex-col overflow-hidden bg-zinc-950 text-white sm:min-h-[min(calc(100svh-6.75rem),64rem)] sm:rounded-[2rem]">
        <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[70%_center] lg:object-center" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,9,11,0.9)_0%,rgba(9,9,11,0.62)_50%,rgba(9,9,11,0.35)_100%)]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-zinc-950/85 to-transparent" />

        <div className="v2-wrap flex flex-1 flex-col pb-8 pt-28 sm:pt-16 lg:pb-10">
          <h1 className="v2-display mt-auto max-w-[15ch] sm:mt-28">{title}</h1>
          <div className="mt-10 flex flex-col gap-8 sm:mt-auto sm:pt-14 lg:flex-row lg:items-end lg:justify-between">
            <p className="v2-lead max-w-[46ch] text-white/75">{subtext}</p>
            <EnquireAction label={ctaLabel} href="/enquire-now" />
          </div>
          {stats && (
            <dl className="mt-10 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-[family-name:var(--v2-display)] text-[clamp(1.75rem,3.4vw,3rem)] font-medium leading-none tracking-[-0.03em]">{s.value}</dd>
                  <dd className="v2-small mt-2 max-w-[20ch] text-white/60">{s.label}</dd>
                </div>
              ))}
            </dl>
          )}

          <ul className="mt-10 grid grid-cols-3 gap-3 border-t border-white/15 pt-6 text-xs leading-snug text-white/75 sm:gap-4 sm:text-sm" aria-label="Why choose RestoRefine">
            <li className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-center sm:gap-2.5 sm:text-left">
              <a {...googleReviewsLinkProps} className="flex flex-col items-center gap-2 text-center no-underline transition-colors hover:text-white sm:flex-row sm:gap-2.5 sm:text-left">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                  <GoogleG className="h-3.5 w-3.5" />
                </span>
                5 star Google rating
              </a>
            </li>
            <li className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-center sm:gap-2.5 sm:text-left">
              <BriefcaseBusiness aria-hidden="true" className="h-5 w-5 text-white/60" strokeWidth={1.5} />
              Real client work
            </li>
            <li className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-center sm:gap-2.5 sm:text-left">
              <House aria-hidden="true" className="h-5 w-5 text-white/60" strokeWidth={1.5} />
              All services under one roof
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* Intro as a statement, then the heading beside the body, problems as dashed columns */
function Overview({ overview }: { overview: PillarProps["overview"] }) {
  return (
    <section className="v2-wrap py-24 lg:py-32">
      {overview.intro && <p className="max-w-[46ch] font-[family-name:var(--v2-display)] text-[clamp(1.375rem,2.2vw,2rem)] font-medium leading-[1.3] tracking-[-0.02em] text-zinc-950">{overview.intro}</p>}
      <div className={`grid gap-8 lg:grid-cols-12 lg:items-start ${overview.intro ? "mt-20 lg:mt-28" : ""}`}>
        <h2 className="v2-h2 max-w-[18ch] text-zinc-950 lg:col-span-7">
          <DualTone text={overview.heading} tail={overview.headingTail} />
        </h2>
        <div className="space-y-5 lg:col-span-12">
          {overview.body.map((p) => (
            <p key={p.slice(0, 24)} className="v2-body text-zinc-600">
              {p}
            </p>
          ))}
        </div>
      </div>
      {overview.problems && (
        <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {overview.problems.map((p, i) => (
            <li key={p} className="v2-dash pt-6 text-zinc-300">
              <span className="v2-small font-medium text-red-600">{String(i + 1).padStart(2, "0")}</span>
              <p className="v2-body mt-3 text-zinc-800">{p}</p>
            </li>
          ))}
        </ul>
      )}
      {overview.caption && (
        <div className="mt-14 max-w-xl rounded-[1.25rem] bg-zinc-100 p-6 sm:p-8">
          <p className="v2-small font-medium text-zinc-500">{overview.caption.label}</p>
          <p className="v2-h3 mt-2 text-zinc-950">{overview.caption.text}</p>
        </div>
      )}
    </section>
  );
}

/* The homepage's services section: the dark card with the rotating featured showcase */
function Services({ heading, tail, services }: { heading: string; tail?: string; services: PillarService[] }) {
  return (
    <section className="px-2 sm:px-3">
      <div data-nav-dark className="rounded-[1.75rem] bg-zinc-950 py-20 text-white sm:rounded-[2rem] lg:py-28">
        <div className="v2-wrap">
          <h2 className="v2-h2 max-w-[16ch]">
            <DualTone text={heading} tail={tail} dark />
          </h2>
          <div className="mt-16">
            <ServicesShowcase
              items={services.map((s) => ({
                id: s.number,
                title: s.title,
                tagline: s.category,
                description: s.description,
                items: s.includes,
                href: s.ctaHref ?? "/enquire-now",
                ctaLabel: s.ctaLabel ?? "",
                image: { src: s.image, alt: s.title, position: FOCUS[s.image] },
              }))}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Process({ process }: { process: PillarProps["process"] }) {
  const cols = process.steps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <section className="v2-wrap py-24 lg:py-32">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <h2 className="v2-h2 max-w-[16ch] text-zinc-950 lg:col-span-7">
          <DualTone text={process.heading} tail={process.tail} />
        </h2>
        <div className="space-y-4 lg:col-span-12">
          {process.intro.map((p) => (
            <p key={p.slice(0, 24)} className="v2-body text-zinc-600">
              {p}
            </p>
          ))}
        </div>
      </div>
      <ol className={`mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 ${cols}`}>
        {process.steps.map((step) => (
          <li key={step.number} className="v2-dash pt-6 text-zinc-300">
            <span className="block font-[family-name:var(--v2-display)] text-[clamp(3rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.04em] text-red-600">{step.number}</span>
            <h3 className="v2-h3 mt-6 text-zinc-950">{step.title}</h3>
            <p className="v2-small mt-3 text-zinc-600">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Insights({ insights }: { insights: NonNullable<PillarProps["insights"]> }) {
  if (insights.posts.length === 0) return null;
  return (
    <section className="py-24 lg:py-32">
      <div className="v2-wrap grid gap-8 lg:grid-cols-12 lg:items-end">
        <h2 className="v2-h2 text-zinc-950 lg:col-span-7">
          <DualTone text={insights.heading} tail={insights.tail} />
        </h2>
        <p className="v2-body text-zinc-600 lg:col-span-12">{insights.body}</p>
      </div>
      <div className="mt-14">
        <PhotoRail label={insights.heading}>
          {insights.posts.map((p) => (
            <PhotoRailItem key={p.slug}>
              <PhotoCard src={p.thumbnail} alt={p.title} title={p.title} titleAs="h3" description={p.date} href={`/resources/${p.slug}`} />
            </PhotoRailItem>
          ))}
        </PhotoRail>
      </div>
    </section>
  );
}

export function CaseStudies({ caseStudies }: { caseStudies: Omit<PillarProps["caseStudies"], "intro"> & { intro?: ReactNode } }) {
  const items = [...caseStudies.extraItems, ...portfolioItems].filter((p) => caseStudies.categories.includes(p.category) && p.thumbnail);
  const videos = caseStudies.videos ?? [];
  if (items.length === 0 && videos.length === 0) return null;
  return (
    <section className="pb-24 pt-8 lg:pb-32">
      <div className="v2-wrap grid gap-8 lg:grid-cols-12 lg:items-end">
        <h2 className="v2-h2 max-w-[18ch] text-zinc-950 lg:col-span-7">
          <DualTone text={caseStudies.heading} tail={caseStudies.tail} />
        </h2>
        {caseStudies.intro && <p className="v2-body text-zinc-600 lg:col-span-12">{caseStudies.intro}</p>}
      </div>
      <div className="mt-14">
        {videos.length > 0 ? (
          <TikTokRail label={caseStudies.heading} videos={videos} />
        ) : (
        <PhotoRail label={caseStudies.heading}>
          {items.map((item) => {
            const src = thumb(item.thumbnail);
            const logo = src.endsWith(".svg") || item.cardBg || item.cardBgHex;
            return (
              <PhotoRailItem key={item.id}>
                <PhotoCard
                  src={src || "/placeholder.svg"}
                  alt={item.title}
                  title={item.clientName}
                  titleAs="h3"
                  description={item.category}
                  href={`/portfolio/${item.id}`}
                  logoBg={logo ? item.cardBgHex ?? (item.cardBg === "bg-black" ? "#000" : "") : undefined}
                />
              </PhotoRailItem>
            );
          })}
        </PhotoRail>
        )}
      </div>
    </section>
  );
}

/* Closing call to action as a red card */
function Closing() {
  return (
    <section className="px-2 pb-3 sm:px-3">
      <div data-nav-dark className="rounded-[1.75rem] bg-red-600 py-20 text-white sm:rounded-[2rem] lg:py-28">
        <div className="v2-wrap flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="v2-h2 max-w-[14ch]">
              Not Sure Where to <span className="text-white/60">Start?</span>
            </h2>
            <p className="v2-lead mt-6 text-white/85">Tell us your goals, we&apos;ll map the route.</p>
          </div>
          <EnquireAction label="Enquire" href="/enquire-now" tone="white" />
        </div>
      </div>
    </section>
  );
}

export function PillarPageV2(props: PillarProps) {
  return (
    <main>
      <V2Shell>
        <ServiceHero image={props.heroImage} eyebrow={props.hero.eyebrow} title={<ScriptTitle text={`${props.hero.line1} ${props.hero.line2}`} accent={props.heroAccent} />} subtext={props.hero.subtext} ctaLabel={props.hero.ctaLabel} />
        <Overview overview={props.overview} />
        <Services heading={props.servicesHeading} tail={props.servicesTail} services={props.services} />
        <Process process={props.process} />
        {props.insights && <Insights insights={props.insights} />}
        <CaseStudies caseStudies={props.caseStudies} />
        <Closing />
      </V2Shell>
      <Footer />
    </main>
  );
}
