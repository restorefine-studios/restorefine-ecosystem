import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { interTight } from "@/lib/fonts";
import { BriefcaseBusiness, House, Layers, MapPin, Store, UserRound } from "lucide-react";
import { GoogleG, GoogleStars, googleReviewsLinkProps } from "@/components/google-reviews";
import { getEntry } from "@/lib/contentful";
import { homeContent, type PageContent } from "@/lib/homepageData";
import { blogPosts } from "@/lib/blogContent";
import { getSupaPosts } from "@/lib/supabase";
import { getClientReviews } from "@/blocks/home/get-client-reviews";
import { FaqAccordion } from "@/blocks/home/faq-accordion";
import { ResourcesTabs, type PostSummary } from "@/blocks/home/resources-tabs";
import { GOOGLE_REVIEWS, FEATURED_REVIEW_ID, type Review } from "./google-reviews";
import { EnquireAction, WhatsAppAction } from "./actions";
import { EnquiryForm } from "./enquiry-form";
import { AreasV2 } from "./areas";
import { FounderSpotlight, type Founder } from "./founders";
import { CountUp } from "./count-up";
import { DualTone } from "./dual-tone";
import { PhotoCard, PhotoRail, PhotoRailItem } from "./photo-card";
import { ServicesShowcase } from "./services-showcase";
import { ProcessSteps } from "./process-steps";
import "./v2.css";

/* Inter's display cut: the same skeleton as the site's Inter body, drawn for large sizes */

/** Generated with Higgsfield (nano_banana_pro), 1920x1080 */
const HERO_IMAGE = "/restorefine-hero.webp";

const c = homeContent;

/* All shown as equal square tiles. `tile`: the file has no background of its own, so it
 * sits on a white tile with padding. Our HQ uses a copy cropped to the wordmark. */
const LOGOS = [
  { src: "/clients/itspadel-logo.svg", alt: "It's Padel" },
  { src: "/clients/masala-moves-logo.svg", alt: "Masala Moves" },
  { src: "/clients/spud-kingz-logo.svg", alt: "Spud Kingz" },
  { src: "/clients/day-today.svg", alt: "Day-to-Day", tile: true },
  { src: "/clients/our-hq-logo-cropped.svg", alt: "Our HQ", tile: true },
  { src: "/clients/quiknest-logo.svg", alt: "Quiknest" },
  { src: "/clients/salad-club-logo.svg", alt: "Salad Club" },
  { src: "/za-cleaning.svg", alt: "Za Cleaning", tile: true },
] as { src: string; alt: string; tile?: boolean }[];

/* Generated with Higgsfield in the hero's dark studio style, keyed by service id */
const SERVICE_IMAGES: Record<string, { src: string; alt: string }> = {
  branding: { src: "/services/branding.webp", alt: "Black brand stationery with a red swatch on a dark studio desk" },
  design: { src: "/services/design.webp", alt: "A designer arranging black and red printed pieces on a dark studio table" },
  content: { src: "/services/content.webp", alt: "A camera and phone gimbal filming a plated dish under a red studio light" },
  seo: { src: "/services/seo.webp", alt: "A laptop glowing with a search interface in a dark studio" },
  "paid-ads": { src: "/services/paid-ads-growth.webp", alt: "A monitor and phone showing a rising green performance chart in a dark studio" },
};

/* Generated with Higgsfield, in the order of homeContent.industries.items */
const INDUSTRY_IMAGES = [
  { src: "/industries/hospitality.webp", alt: "A chef finishing plated dishes on the pass of a busy Glasgow restaurant" },
  { src: "/industries/sport-leisure.webp", alt: "Padel rackets and balls on a blue indoor court during play" },
  { src: "/industries/lifestyle.webp", alt: "Lifestyle brand packaging, a tote bag and coffee on a table by a Glasgow window" },
  { src: "/industries/professional-services.webp", alt: "A professional services meeting in an office overlooking Glasgow sandstone buildings" },
];

const WORK = [
  { src: "/clients/itspadel-bg.png", name: "It's Padel", href: "/portfolio/itspadel" },
  { src: "/clients/masalamoves-bg.png", name: "Masala Moves", href: "/portfolio/masala-moves-by-luna-shree" },
  { src: "/clients/spudkingz-bg.png", name: "Spud Kingz", href: "/portfolio" },
  { src: "/portfolio-client-thumbnail/day-today.png", name: "Day-to-Day", href: "/portfolio/day-today-tiktok-marketing-case-study" },
  { src: "/clients/ourhq-bg.png", name: "Our HQ", href: "/portfolio" },
  { src: "/clients/saladclub-bg.png", name: "Salad Club", href: "/portfolio" },
];


async function getFounders(): Promise<{ headline: string; subtext: string; founders: Founder[] }> {
  const companyEntry = await getEntry("2sn0IjTvv7GmiWqgDpyOCm");
  const resolveText = (field: any, fallback: string): string => {
    if (!field) return fallback;
    if (typeof field === "string") return field;
    if (field.nodeType === "document") return field.content?.[0]?.content?.[0]?.value || fallback;
    if (field.nodeType === "paragraph") return field.content?.[0]?.value || fallback;
    return fallback;
  };
  const founders: Founder[] = [];
  for (let i = 1; i <= 2; i++) {
    const img = companyEntry?.fields?.[`founder${i}Image`];
    const json = companyEntry?.fields?.[`founder${i}`];
    let name = `Founder ${i}`,
      role = "Co-Founder",
      about = "";
    if (json) {
      const parsed = typeof json === "string" ? JSON.parse(json) : json;
      if (parsed) {
        name = parsed.name || name;
        role = parsed.role || role;
        about = resolveText(parsed.about, "");
      }
    }
    founders.push({
      name,
      role,
      // CMS bios use em and en dashes; read them as commas
      about: about
        .split(/\n\n/)
        .map((p) => p.replace(/\s*[\u2013\u2014]\s*/g, ", ").trim())
        .filter(Boolean),
      image: img ? "https:" + (img as any).fields.file.url : "/placeholder.svg",
    });
  }
  return {
    headline: resolveText(companyEntry?.fields?.founderHeadline, "The Founders"),
    subtext: resolveText(companyEntry?.fields?.founderSubtext, "The team behind RestoRefine."),
    founders,
  };
}

async function getLatestPosts(limit: number): Promise<PostSummary[]> {
  let supa: PostSummary[] = [];
  try {
    supa = (await getSupaPosts()).map((p) => ({ slug: p.slug, title: p.title, thumbnail: p.thumbnail, thumbnailAlt: p.thumbnail_alt, date: p.date }));
  } catch {
    // Fall back to the bundled posts if Supabase is unreachable
  }
  const seen = new Set(supa.map((p) => p.slug));
  const local = blogPosts.filter((p) => !seen.has(p.slug));
  return [...supa, ...local].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}

/* Dark photo card under the navbar, headline low left, offer low right */
/** `place` (a location page's area name) is set in grey when the heading ends with it */
export function Hero({ c = homeContent, place }: { c?: PageContent; place?: string } = {}) {
  const { hero, ctas } = c;
  const rest = hero.heading.replace(hero.accent, "").trim();
  const offer = c.services.core.map((s) => s.title);
  return (
    <section className="sm:px-3 sm:pt-24">
      <div data-nav-dark className="relative isolate flex min-h-svh flex-col overflow-hidden sm:min-h-[calc(100svh-6.75rem)] bg-zinc-950 text-white sm:rounded-[2rem]">
        {/* Phones: the photo fills the first screen, cropped onto the person (the left half is near black), fading into the card */}
        <div className="absolute inset-x-0 top-0 -z-20 h-svh sm:inset-0 sm:h-auto">
          <Image src={HERO_IMAGE} alt="" fill priority sizes="100vw" className="object-cover object-[70%_center] lg:object-center" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/30 to-zinc-950 sm:hidden" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 hidden bg-zinc-950/55 sm:block lg:hidden" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 hidden lg:block bg-[linear-gradient(90deg,rgba(9,9,11,0.88)_0%,rgba(9,9,11,0.6)_45%,rgba(9,9,11,0.35)_100%)]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 hidden h-1/2 bg-gradient-to-t lg:block from-zinc-950/80 to-transparent" />

        <div className="v2-wrap flex flex-1 flex-col pb-8 pt-24 sm:pt-16 lg:pb-10">

          <h1 className="v2-display mt-[38svh] max-w-[11ch] sm:mt-28">
            <span className="v2-script block pb-2 text-[1.25em] text-red-600">{hero.accent}</span>{" "}
            {place && rest.endsWith(` ${place}`) ? (
              <>
                {rest.slice(0, -place.length - 1)}{" "}
                <span className="text-white/45">{place}</span>
              </>
            ) : (
              rest
            )}
          </h1>

          <div className="mt-auto grid gap-10 pt-5 sm:pt-14 lg:grid-cols-12 lg:items-end lg:gap-8">
            <p className="v2-lead max-w-[46ch] text-white/75 lg:col-span-6">{hero.body}</p>
            <div className="lg:col-span-5 lg:col-start-8 lg:-mr-4 lg:w-fit lg:max-w-[34rem] lg:justify-self-end 2xl:-mr-10">
              <p className="v2-h3 text-white/90">
                {offer.slice(0, -1).join(", ")}
                <br />
                and {offer[offer.length - 1]}.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <EnquireAction {...ctas.enquire} />
                <WhatsAppAction {...ctas.whatsapp} />
              </div>
            </div>
          </div>

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

/* Client logos, the brands behind the work further down */
export function Logos() {
  return (
    <section aria-label="Clients" className="border-b border-zinc-200">
      <div className="v2-wrap flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:gap-12">
        <p className="v2-small shrink-0 font-medium text-zinc-950 lg:max-w-[14rem]">Brands we have built and grown</p>
        <ul className="grid flex-1 grid-cols-4 place-items-center gap-x-6 gap-y-6 sm:grid-cols-8">
          {LOGOS.map((l) => (
            <li key={l.src} className={`relative h-14 w-14 overflow-hidden rounded-xl ${l.tile ? "bg-white ring-1 ring-inset ring-zinc-200" : ""}`}>
              <span className={`absolute ${l.tile ? "inset-1.5" : "inset-0"}`}>
                <Image src={l.src} alt={l.alt} fill sizes="56px" className="object-contain" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Who we are: the claim as a statement, the second half greyed as in the reference */
function Intro() {
  const { intro } = c;
  const [lead, ...rest] = intro.body;
  const split = intro.heading.indexOf(" in the UK");
  return (
    <section className="v2-wrap pb-16 pt-24 lg:pb-20 lg:pt-32">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <h2 className="v2-statement v2-title-phone max-w-[18ch] text-zinc-950 lg:col-span-8">
          {split > 0 ? (
            <>
              {intro.heading.slice(0, split)} <span className="text-zinc-400">{intro.heading.slice(split + 1)}</span>
            </>
          ) : (
            intro.heading
          )}
        </h2>
      </div>
      <div className="mt-12 grid gap-8 lg:grid-cols-12">
        <p className="v2-lead max-w-[58ch] text-zinc-800 lg:col-span-6">{lead}</p>
        {rest.map((p) => (
          <p key={p} className="v2-body max-w-[58ch] text-zinc-600 lg:col-span-5 lg:col-start-8">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}

/* Real client work as a row of tall frames running off the edge */
function WorkRow() {
  return (
    <section aria-label="Client work">
      <PhotoRail label="Client work">
        {WORK.map((w) => (
          <PhotoRailItem key={w.src}>
            <PhotoCard src={w.src} alt={`${w.name}, RestoRefine client work`} title={w.name} href={w.href} />
          </PhotoRailItem>
        ))}
      </PhotoRail>
    </section>
  );
}

/* Figures the site already states, nothing invented */
function Numbers() {
  const { whyChoose, services, industries } = c;
  const first = (s: string) => s.split(/(?<=\.)\s/)[0];
  const rating = whyChoose.items.find((i) => i.id === "rating")!;
  const roof = whyChoose.items.find((i) => i.id === "one-roof")!;
  const stats = [
    { figure: "5.0", label: "Google rating", text: first(rating.description), icon: <GoogleG className="h-5 w-5" /> },
    { figure: String(services.core.length + services.more.length), label: "Services under one roof", text: first(roof.description), icon: <Layers aria-hidden="true" className="h-5 w-5 text-red-600" strokeWidth={1.75} /> },
    { figure: String(industries.items.length), label: "Industries we serve", text: industries.items.map((i) => i.title).join(", ") + ".", icon: <Store aria-hidden="true" className="h-5 w-5 text-red-600" strokeWidth={1.75} /> },
    { figure: "2024", label: "Founded in Glasgow", text: "Our Glasgow-based studio opened in June 2024 and works with businesses across Scotland and the UK.", icon: <MapPin aria-hidden="true" className="h-5 w-5 text-red-600" strokeWidth={1.75} /> },
  ];
  return (
    <section className="v2-wrap py-24 lg:py-32">
      <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <li key={s.label} className="text-center">
            <p className="v2-stat text-zinc-950">
              <CountUp value={s.figure} from={s.figure.length === 4 ? 2000 : 0} />
            </p>
            <div className="v2-dash mt-5 pt-4 text-zinc-300">
              <p className="flex items-center justify-center gap-2.5 text-base font-medium text-zinc-950">
                {s.icon}
                {s.label}
              </p>
              <p className="v2-small mx-auto mt-2 max-w-[34ch] text-zinc-500">{s.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* Dark card: the services as numbered rows with dashed red rules */
/** `showcase`: the core services as the rotating featured layout instead of numbered rows */
export function Services({ c = homeContent, showcase = false }: { c?: PageContent; showcase?: boolean } = {}) {
  const { services, ctas } = c;
  return (
    <section className="mt-3 px-2 sm:px-3">
      <div data-nav-dark className="rounded-[1.75rem] bg-zinc-950 py-20 text-white sm:rounded-[2rem] lg:py-28">
        <div className="v2-wrap">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <h2 className="v2-h2 max-w-[16ch] lg:col-span-7">
              <DualTone text={services.heading} tail="We Provide" dark />
            </h2>
            <p className="v2-body max-w-[52ch] text-zinc-400 lg:col-span-4 lg:col-start-9">{services.body}</p>
          </div>

          {showcase ? (
            <div className="mb-12 mt-16">
              <ServicesShowcase
                items={services.core.map((s) => ({
                  id: s.id,
                  title: s.title,
                  tagline: s.tagline,
                  description: s.description,
                  items: s.items,
                  href: s.href,
                  image: SERVICE_IMAGES[s.id] ?? s.image,
                }))}
              />
            </div>
          ) : (
          <ol className="mt-16">
            {services.core.map((s) => (
              <li key={s.id} className="grid gap-6 border-t border-dashed border-red-600/60 py-10 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-5">
                  <h3 className="v2-title-xl">
                    <Link href={s.href} className="no-underline transition-colors hover:text-red-500">
                      {s.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-base font-medium text-white/85">{s.tagline}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <li key={item} className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-zinc-300">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="v2-body max-w-[54ch] text-zinc-400 lg:col-span-4">{s.description}</p>
                <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-900 lg:col-span-3 lg:block">
                  <Image src={SERVICE_IMAGES[s.id]?.src ?? s.image.src} alt={SERVICE_IMAGES[s.id]?.alt ?? s.image.alt} fill sizes="22vw" className="object-cover" />
                </div>
              </li>
            ))}
          </ol>
          )}

          <ul className="grid gap-x-8 gap-y-10 border-t border-dashed border-red-600/60 pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {services.more.map((s) => (
              <li key={s.id}>
                <h3 className="v2-h3">
                  <Link href={s.href} className="no-underline transition-colors hover:text-red-500">
                    {s.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm font-medium text-white/85">{s.tagline}</p>
                <p className="v2-small mt-3 text-zinc-400">{s.description}</p>
              </li>
            ))}
          </ul>

          <div className="mt-14">
            <EnquireAction {...ctas.enquire} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Industries({ c = homeContent }: { c?: PageContent } = {}) {
  const { industries } = c;
  return (
    <section className="py-24 lg:py-32">
      <div className="v2-wrap grid gap-8 lg:grid-cols-12 lg:items-end">
        <h2 className="v2-h2 text-zinc-950 lg:col-span-7">
          <DualTone text={industries.heading} tail="We Serve" />
        </h2>
        <p className="v2-body max-w-[52ch] text-zinc-600 lg:col-span-4 lg:col-start-9">{industries.body}</p>
      </div>
      <div className="mt-14">
        <PhotoRail label={industries.heading}>
          {industries.items.map((item, i) => (
            <PhotoRailItem key={item.title}>
              <PhotoCard src={INDUSTRY_IMAGES[i]?.src ?? item.image.src} alt={INDUSTRY_IMAGES[i]?.alt ?? item.image.alt} title={item.title} titleAs="h3" description={item.description} />
            </PhotoRailItem>
          ))}
        </PhotoRail>
      </div>
    </section>
  );
}

export function Businesses({ c = homeContent }: { c?: PageContent } = {}) {
  const { businesses } = c;
  return (
    <section className="px-2 sm:px-3">
      <div className="rounded-[1.75rem] bg-zinc-100 py-20 sm:rounded-[2rem] lg:py-24">
        <div className="v2-wrap">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <h2 className="v2-h2 text-zinc-950 lg:col-span-7">
              <DualTone text={businesses.heading} tail="We Work With" />
            </h2>
            <p className="v2-body max-w-[52ch] text-zinc-600 lg:col-span-4 lg:col-start-9">{businesses.body}</p>
          </div>
          <ul className="mt-14 grid gap-x-8 gap-y-10 lg:grid-cols-3">
            {businesses.items.map((item) => (
              <li key={item.title} className="v2-dash pt-6 text-zinc-400">
                <p className="v2-title-xl text-zinc-950">{item.title}</p>
                <p className="v2-body mt-4 max-w-[46ch] text-zinc-600">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* RESTO: each step's initial fills red as the steps scroll past */
export function Process({ c = homeContent }: { c?: PageContent } = {}) {
  const { process } = c;
  const leadParts = process.lead.split("RESTO");
  return (
    <section className="v2-wrap pb-12 pt-24 lg:pb-16 lg:pt-32">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <h2 className="v2-h2 text-zinc-950 lg:col-span-7">
          <DualTone text={process.heading} tail="Agency Works" />
        </h2>
        <p className={`${process.lead.length > 80 ? "v2-body" : "v2-h3"} text-zinc-600 lg:col-span-4 lg:col-start-9`}>
          {leadParts.length === 2 ? (
            <>
              {leadParts[0]}
              <span className="font-semibold tracking-[0.02em] text-red-600">RESTO</span>
              {leadParts[1]}
            </>
          ) : (
            process.lead
          )}
        </p>
      </div>
      <ProcessSteps steps={process.steps} />
      <div className="mt-14 flex justify-center sm:block">
        <EnquireAction {...process.cta} />
      </div>
    </section>
  );
}

export function WhyChoose({ c = homeContent }: { c?: PageContent } = {}) {
  const { whyChoose } = c;
  const [s1, ...s2] = whyChoose.closing.split(/(?<=\.)\s/);
  return (
    <section className="v2-wrap py-24 lg:py-32">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <h2 className="v2-h2 max-w-[18ch] text-zinc-950 lg:col-span-7">
          <DualTone text={whyChoose.heading} tail="as your UK Growth Agency?" />
        </h2>
        <p className="v2-body max-w-[52ch] text-zinc-600 lg:col-span-4 lg:col-start-9">{whyChoose.body}</p>
      </div>
      <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {whyChoose.items.map((item) => (
          <li key={item.id} className="v2-dash pt-6 text-zinc-300">
            <h3 className="v2-h3 text-zinc-950">{item.title}</h3>
            <p className="v2-small mt-3 text-zinc-600">{item.description}</p>
          </li>
        ))}
      </ul>
      {s1 && (
        <p className="v2-statement mt-20 max-w-[26ch] text-zinc-950 lg:mt-28">
          {s1} {s2.length > 0 && <span className="text-zinc-400">{s2.join(" ")}</span>}
        </p>
      )}
    </section>
  );
}

export function Reviews({ reviews, c = homeContent }: { reviews: Review[]; c?: PageContent }) {
  const all = [...reviews, ...GOOGLE_REVIEWS];
  const featured = all.find((r) => r.id === FEATURED_REVIEW_ID) ?? all[0];
  const ordered = featured ? [featured, ...all.filter((r) => r !== featured)] : all;
  return (
    <section className="px-2 sm:px-3">
      <div data-nav-dark className="overflow-hidden rounded-[1.75rem] bg-zinc-950 py-20 text-white sm:rounded-[2rem] lg:py-28">
        <div className="v2-wrap">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="v2-h2 max-w-[14ch]">
              <DualTone text="What Our Clients Are Saying." tail="Are Saying." dark />
            </h2>
            <a {...googleReviewsLinkProps} className="group flex items-center gap-4 no-underline" aria-label="Rated 5.0 on Google, read our reviews">
              <span className="v2-stat">5.0</span>
              <span className="flex flex-col gap-1.5">
                <span className="flex items-center gap-2">
                  <GoogleG className="h-4 w-4" />
                  <GoogleStars className="h-4 w-4" />
                </span>
                <span className="text-sm text-zinc-400 transition-colors group-hover:text-white">Rated 5.0 by our clients</span>
              </span>
            </a>
          </div>
        </div>
        <ul tabIndex={0} aria-label="Client reviews" className="v2-rail v2-rail--inset v2-rail--bar-dark mt-14 flex gap-3 overflow-x-auto">
          {ordered.map((r) => (
            <li key={r.id} className="w-[82vw] shrink-0 sm:w-[24rem]">
              <figure className="flex h-full flex-col rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-7">
                <GoogleStars className="h-4 w-4" />
                <blockquote className="v2-body mt-5 text-zinc-200">{r.review}</blockquote>
                <figcaption className="mt-auto flex items-center gap-3 pt-8 text-sm">
                  <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-zinc-300">
                    <UserRound className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium text-white">{r.name}</span>
                    <span className="text-zinc-400">
                      {r.position}
                      {r.when ? `, ${r.when}` : ""}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <div className="v2-wrap mt-12">
          <WhatsAppAction {...c.reviewsCta} />
        </div>
      </div>
    </section>
  );
}

function Founders({ headline, subtext, founders }: { headline: string; subtext: string; founders: Founder[] }) {
  if (founders.length === 0) return null;
  return (
    <section className="v2-wrap py-24 lg:py-32">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <h2 className="v2-h2 text-zinc-950 lg:col-span-7">
          <DualTone text={headline} />
        </h2>
        <p className="v2-body max-w-[52ch] text-zinc-600 lg:col-span-4 lg:col-start-9">{subtext}</p>
      </div>
      <FounderSpotlight founders={founders} cta={c.ctas.enquire} />
    </section>
  );
}

export async function Resources({ c = homeContent }: { c?: PageContent } = {}) {
  const { resources } = c;
  const posts = await getLatestPosts(4);
  return (
    <section className="v2-wrap v2-reuse py-24 lg:py-32">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <h2 className="v2-h2 text-zinc-950 lg:col-span-7">
          <DualTone text={resources.heading} tail="Resources" />
        </h2>
        <p className="v2-body max-w-[52ch] text-zinc-600 lg:col-span-4 lg:col-start-9">{resources.body}</p>
      </div>
      <ResourcesTabs posts={posts} resources={resources} caseStudies={c.clientSpotlight} />
    </section>
  );
}

/* Same accordion and FAQPage schema as the shared FAQ block, with this page's heading */
export function FaqV2({ c = homeContent }: { c?: PageContent } = {}) {
  const { faqs } = c;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.items.map((faq) => {
      const list = ("list" in faq && faq.list ? faq.list : []).map((e) => `${e.label} ${e.text}`);
      return { "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: [...faq.answer, ...list].join(" ") } };
    }),
  };
  return (
    <section id="faqs" className="v2-wrap v2-reuse grid scroll-mt-28 gap-12 py-24 lg:grid-cols-12 lg:gap-16 lg:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="lg:col-span-4">
        <h2 className="v2-h2 text-zinc-950 lg:sticky lg:top-28">
          <DualTone text={faqs.heading} tail="Questions" />
        </h2>
      </div>
      <div className="lg:col-span-8">
        <FaqAccordion items={faqs.items} />
      </div>
    </section>
  );
}

/* Closing card in brand red, the form beside it */
export function Enquiry({ c = homeContent }: { c?: PageContent } = {}) {
  /* Location pages render the heading as an H2 and add the two actions under the copy */
  const finalCta = c.finalCta as PageContent["finalCta"] & { headingAsH2?: boolean; ctas?: PageContent["ctas"] };
  const Heading = finalCta.headingAsH2 ? "h2" : "p";
  const at = finalCta.accent ? finalCta.heading.indexOf(finalCta.accent) : -1;
  return (
    <section id="enquire" className="px-2 pb-3 sm:px-3">
      <div className="rounded-[1.75rem] bg-red-600 py-20 text-white sm:rounded-[2rem] lg:py-24">
        <div className="v2-wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Heading className="v2-h2 max-w-[14ch]">
              {at >= 0 ? (
                <>
                  {finalCta.heading.slice(0, at)}
                  <span className="v2-script text-[1.3em] text-zinc-950">{finalCta.accent}</span>
                  {finalCta.heading.slice(at + finalCta.accent.length)}
                </>
              ) : (
                finalCta.heading
              )}
            </Heading>
            <p className="v2-lead mt-7 max-w-[44ch] text-red-50">{finalCta.body}</p>
            {finalCta.ctas && (
              <div className="mt-9 flex flex-wrap gap-3">
                <EnquireAction {...finalCta.ctas.enquire} tone="white" />
                <WhatsAppAction {...finalCta.ctas.whatsapp} tone="outlineLight" />
              </div>
            )}
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm finalCta={finalCta} />
          </div>
        </div>
      </div>
    </section>
  );
}

/** The page wrapper: breaks out of the site padding and loads the display face */
export function V2Shell({ children }: { children: React.ReactNode }) {
  return <div className={`v2 ${interTight.variable}`}>{children}</div>;
}

export default async function HomeV2() {
  const [{ reviews }, founders] = await Promise.all([getClientReviews(), getFounders()]);
  return (
    <V2Shell>
      <Hero />
      <Logos />
      <Intro />
      <WorkRow />
      <Numbers />
      <Services showcase />
      <Industries />
      <Businesses />
      <Process />
      <WhyChoose />
      <Reviews reviews={reviews} />
      <Founders {...founders} />
      <AreasV2 />
      <Resources />
      <FaqV2 />
      <Enquiry />
    </V2Shell>
  );
}
