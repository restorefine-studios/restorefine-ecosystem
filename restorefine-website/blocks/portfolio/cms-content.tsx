import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PortfolioBrowserPreview } from "./portfolio-browser-preview";
import { ExpandingCta } from "./expanding-cta";
import { ChartTileRender } from "./chart-tile";
import { RevealBlock } from "./case-study-motion";
import { AnimatedStatValue } from "./animated-stat-value";
import { TableOfContents, type TocItem } from "@/blocks/blog/toc";
import { FaqAccordion } from "@/blocks/blog/faq-accordion";
import { jsonLd } from "@/lib/utils";
import { LightHeader, SectionHeading } from "./case-heading";
import {
  normaliseSectionOrder,
  SECTION_LABELS,
  imageKey,
  isImageKey,
  parseTikTokUrl,
  type ChartTile,
  type ImageBlock,
  type OrderKey,
  type PortfolioProject,
  type SectionKey,
} from "@/lib/portfolio-cms";
import { ArrowUpRight } from "lucide-react";
import { TikTokCard } from "@/blocks/service-v2/tiktok-card";

const BASE = "https://www.restorefine.co.uk";

/** Anchor ids, kept stable so a section keeps its link when others are toggled off. */
const SECTION_IDS: Record<SectionKey, string> = {
  overview: "overview",
  liveWebsite: "live-website",
  challenges: "challenges",
  strategy: "strategy",
  execution: "execution",
  results: "results",
  stats: "stats",
  charts: "charts",
  tiktok: "tiktok",
  faq: "faqs",
};

const IMAGE_GRID: Record<ImageBlock["layout"], string> = {
  full: "grid-cols-1",
  two: "grid-cols-1 sm:grid-cols-2",
  three: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

/** Whether a charts-section tile has enough content to render. */
function isChartTileVisible(t: ChartTile): boolean {
  return t.kind === "text"
    ? !!t.heading?.trim() || (t.bullets ?? []).some((b) => b.lead.trim() || b.body.trim())
    : (t.categories ?? []).some((c) => c.trim()) &&
      (t.series ?? []).some((sr) => sr.name.trim() || sr.values.some((v) => v.trim()));
}


export function CmsPortfolioContent({
  project,
  tiktokViews = {},
}: {
  project: PortfolioProject;
  /** View counts by TikTok video id, read on the server. Missing ids show no count. */
  tiktokViews?: Record<string, number | null>;
}) {
  const s = project.sections;

  // TikToks with a usable link, most-viewed first; a video without a count goes last
  const tiktoks = s.tiktok.videos
    .map((v) => {
      const parsed = parseTikTokUrl(v.url);
      return parsed ? { video: { ...parsed, client: v.client.trim() || `@${parsed.handle}` }, views: tiktokViews[parsed.id] ?? null } : null;
    })
    .filter((v): v is NonNullable<typeof v> => v !== null)
    .sort((a, b) => (b.views ?? -1) - (a.views ?? -1));

  const imageBlocks = new Map(
    s.imageBlocks
      .map((b) => ({ ...b, items: b.items.filter((i) => i.src.trim()) }))
      .filter((b) => b.items.length > 0)
      .map((b) => [imageKey(b.id), b] as const)
  );

  /**
   * A section shows only when it's switched on *and* has something to show.
   * A toggled-on but empty section would otherwise render a bare header.
   */
  const isVisible = (key: OrderKey): boolean => {
    if (isImageKey(key)) return imageBlocks.has(key);
    if (!s[key].enabled) return false;
    switch (key) {
      case "overview":
        return !!s.overview.body.trim();
      case "liveWebsite":
        return !!s.liveWebsite.url.trim();
      case "challenges":
        return s.challenges.items.some((c) => c.title.trim() || c.description.trim());
      case "strategy":
        return s.strategy.groups.some((g) => g.title.trim() || g.items.some((i) => i.trim()));
      case "execution":
        return !!s.execution.intro.trim() || s.execution.items.some((i) => i.trim());
      case "results":
        return s.results.items.some((r) => r.trim());
      case "stats":
        return s.stats.items.some((i) => i.value.trim() || i.label.trim());
      case "charts":
        return s.charts.items.some(isChartTileVisible);
      case "tiktok":
        return tiktoks.length > 0;
      case "faq":
        return s.faq.items.some((f) => f.question.trim() && f.answer.trim());
    }
  };

  const order = normaliseSectionOrder(project.section_order, s.imageBlocks);
  const visible = order.filter(isVisible);
  const labelFor = (key: SectionKey) => s[key].label?.trim() || SECTION_LABELS[key];
  const numberFor = (key: SectionKey) => String(visible.indexOf(key) + 1).padStart(2, "0");

  // Image blocks only join the contents list when they carry a heading
  const tocItems: TocItem[] = visible.flatMap((key) => {
    if (!isImageKey(key)) return [{ id: SECTION_IDS[key], label: labelFor(key) }];
    const heading = imageBlocks.get(key)?.heading?.trim();
    return heading ? [{ id: `images-${key.slice(6)}`, label: heading }] : [];
  });

  const faqs = s.faq.items.filter((f) => f.question.trim() && f.answer.trim());

  const faqSchema = isVisible("faq")
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  const image = project.hero_image || project.card_logo;
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title || project.client_name,
    headline: project.title || project.client_name,
    about: project.client_name,
    author: {
      "@type": "Organization",
      name: "RestoRefine",
      url: BASE,
    },
    publisher: {
      "@type": "Organization",
      name: "RestoRefine",
      url: BASE,
      logo: `${BASE}/restorefine-logoblack.svg`,
    },
    ...(project.project_date ? { datePublished: project.project_date } : {}),
    ...(project.updated_at || project.project_date
      ? { dateModified: project.updated_at || project.project_date }
      : {}),
    ...(image ? { image } : {}),
  };

  const visibleChartTiles = s.charts.items.filter(isChartTileVisible);

  const sectionBlocks: Record<SectionKey, React.ReactNode> = {
    overview: isVisible("overview") && (
      <div id={SECTION_IDS.overview} key="overview">
        <LightHeader num={numberFor("overview")} label={labelFor("overview")} />
        <p className="max-w-[68rem] whitespace-pre-line text-base leading-relaxed text-zinc-600">
          {s.overview.body}
        </p>
      </div>
    ),

    liveWebsite: isVisible("liveWebsite") && (
      <div id={SECTION_IDS.liveWebsite} key="liveWebsite">
        <LightHeader num={numberFor("liveWebsite")} label={labelFor("liveWebsite")} />
        <PortfolioBrowserPreview
          url={s.liveWebsite.url}
          domain={s.liveWebsite.domain || s.liveWebsite.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
          label={s.liveWebsite.linkLabel || project.client_name}
        />
      </div>
    ),

    challenges: isVisible("challenges") && (
      <div id={SECTION_IDS.challenges} key="challenges" className="bg-zinc-950 rounded-3xl px-8 py-12">
        <SectionHeading num={numberFor("challenges")} label={labelFor("challenges")} dark className="mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {s.challenges.items
            .filter((c) => c.title.trim() || c.description.trim())
            .map((c, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors"
              >
                <span className="text-5xl font-black text-zinc-800 leading-none tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-bold text-white leading-snug">{c.title}</p>
                <p className="text-xs text-zinc-400 leading-relaxed">{c.description}</p>
              </div>
            ))}
        </div>
      </div>
    ),

    strategy: isVisible("strategy") && (
      <div id={SECTION_IDS.strategy} key="strategy">
        <SectionHeading num={numberFor("strategy")} label={labelFor("strategy")} className="mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {s.strategy.groups
            .filter((g) => g.title.trim() || g.items.some((i) => i.trim()))
            .map((group, i) => (
              <div
                key={i}
                className="border border-zinc-200 rounded-2xl p-6 hover:border-red-200 hover:bg-red-50/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-[9px] font-black text-white shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm font-black uppercase text-zinc-900">{group.title}</p>
                </div>
                <ul className="space-y-2">
                  {group.items
                    .filter((item) => item.trim())
                    .map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-zinc-500 leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-600 shrink-0" />
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    ),

    execution: isVisible("execution") && (
      <div id={SECTION_IDS.execution} key="execution">
        <LightHeader num={numberFor("execution")} label={labelFor("execution")} />
        {s.execution.intro.trim() && (
          <p className="text-zinc-500 text-sm leading-relaxed max-w-2xl mb-6">{s.execution.intro}</p>
        )}
        <div className="flex flex-wrap gap-3">
          {s.execution.items
            .filter((item) => item.trim())
            .map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 text-xs font-medium text-zinc-700"
              >
                <span className="w-1 h-1 rounded-full bg-red-600" />
                {item}
              </span>
            ))}
        </div>
      </div>
    ),

    results: isVisible("results") && (
      <div id={SECTION_IDS.results} key="results">
        <LightHeader num={numberFor("results")} label={labelFor("results")} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {s.results.items
            .filter((r) => r.trim())
            .map((r, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-zinc-50 border border-zinc-100 rounded-2xl p-5"
              >
                <span className="mt-1 w-5 h-5 rounded-full bg-red-100 border border-red-200 flex items-center justify-center shrink-0 text-[9px] font-black text-red-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-zinc-700 leading-relaxed">{r}</p>
              </div>
            ))}
        </div>
      </div>
    ),

    stats: isVisible("stats") && (
      <div id={SECTION_IDS.stats} key="stats">
        <LightHeader num={numberFor("stats")} label={labelFor("stats")} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {s.stats.items
            .filter((i) => i.value.trim() || i.label.trim())
            .map((item, i) => {
              const growth = (item.growth ?? "").trim();
              const isNegative = growth.startsWith("-");
              return (
                <div
                  key={i}
                  className="flex flex-col items-center text-center gap-2 bg-zinc-50 border border-zinc-100 rounded-2xl p-6"
                >
                  <AnimatedStatValue
                    value={item.value}
                    className="text-3xl md:text-4xl font-black text-zinc-900 tabular-nums"
                  />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">{item.label}</span>
                  {growth && (
                    <span className={`text-xs font-semibold ${isNegative ? "text-red-500" : "text-emerald-600"}`}>
                      {growth}
                    </span>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    ),

    charts: isVisible("charts") && (
      <div id={SECTION_IDS.charts} key="charts">
        <LightHeader num={numberFor("charts")} label={labelFor("charts")} />
        <div className="flex flex-col gap-6">
          {visibleChartTiles.map((tile, i) =>
            tile.kind === "text" ? (
              <div key={i} className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6">
                {tile.heading && (
                  <p className="text-sm font-black uppercase text-zinc-900 mb-4">{tile.heading}</p>
                )}
                <ul className="space-y-3">
                  {(tile.bullets ?? [])
                    .filter((b) => b.lead.trim() || b.body.trim())
                    .map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-zinc-600 leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-600 shrink-0" />
                        <span>
                          {b.lead.trim() && <span className="font-bold text-zinc-900">{b.lead}: </span>}{b.body}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            ) : (
              <div key={i} className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6">
                {tile.title && (
                  <p className="text-sm font-bold text-zinc-900 mb-2">
                    {tile.title}
                    {tile.year && <span className="text-zinc-400 font-normal"> — {tile.year}</span>}
                  </p>
                )}
                <ChartTileRender tile={tile} />
              </div>
            )
          )}
        </div>
      </div>
    ),

    tiktok: isVisible("tiktok") && (
      <div id={SECTION_IDS.tiktok} key="tiktok">
        <LightHeader num={numberFor("tiktok")} label={labelFor("tiktok")} />
        {s.tiktok.intro.trim() && (
          <p className="mb-8 max-w-[68rem] whitespace-pre-line text-base leading-relaxed text-zinc-600">{s.tiktok.intro}</p>
        )}
        {/* The same cards as the Content page's rail, scrolling sideways inside the column */}
        <ul tabIndex={0} aria-label={labelFor("tiktok")} className="v2-rail v2-rail--bar flex gap-3 overflow-x-auto">
          {tiktoks.map(({ video, views }) => (
            <li key={video.id} className="w-[72vw] shrink-0 sm:w-[38vw] lg:w-[19rem]">
              <TikTokCard video={video} views={views} />
            </li>
          ))}
        </ul>
        {s.tiktok.ctaLabel.trim() && s.tiktok.ctaHref.trim() && (
          <a
            href={s.tiktok.ctaHref.trim()}
            {...(/^https?:\/\//i.test(s.tiktok.ctaHref.trim()) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-zinc-950 py-3 pl-6 pr-5 text-[0.9375rem] font-medium text-white no-underline transition-colors hover:bg-red-600"
          >
            {s.tiktok.ctaLabel.trim()}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        )}
      </div>
    ),

    faq: isVisible("faq") && (
      <div id={SECTION_IDS.faq} key="faq">
        <LightHeader num={numberFor("faq")} label={labelFor("faq")} />
        <FaqAccordion faqs={faqs} />
      </div>
    ),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(caseStudySchema) }} />

      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
      )}

      <div className="portfolio-content-bleed max-w-[104rem] mx-auto px-6 md:px-12 min-[1201px]:px-0 pb-16">

        <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[270px_minmax(0,1fr)] gap-x-8 xl:gap-x-12">
          <TableOfContents title="Case Study" items={tocItems} />
          <div className="space-y-16">
            {visible.map((key, i) => (
              <RevealBlock key={key} delay={Math.min(i, 5) * 0.04}>
                {isImageKey(key) ? <ImageBlockView block={imageBlocks.get(key)!} /> : sectionBlocks[key]}
              </RevealBlock>
            ))}
          </div>
        </div>
      </div>

      <ExpandingCta
        heading={project.cta_heading || "Ready to Elevate Your Brand?"}
        body={project.cta_body || "Get in touch and let's build something exceptional together."}
      />
    </>
  );
}

/**
 * A CMS image block. Images keep their own proportions (nothing is cropped), so
 * they are plain img tags: the CMS doesn't store sizes for next/image to use.
 */
function ImageBlockView({ block }: { block: ImageBlock }) {
  const heading = block.heading?.trim();
  return (
    <div id={`images-${block.id}`}>
      {heading && <SectionHeading label={heading} />}
      <div className={`grid items-start gap-4 ${IMAGE_GRID[block.layout] ?? IMAGE_GRID.full}`}>
        {block.items.map((item, i) => (
          <figure key={item.src + i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.alt || `${heading || "Project image"} ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="h-auto w-full rounded-[1.5rem] bg-zinc-100"
            />
            {item.caption?.trim() && <figcaption className="v2-small mt-3 px-1 text-zinc-500">{item.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  );
}

/** The CMS service pills, shown in the case study's project-details panel */
export function ServicePills({ services }: { services: PortfolioProject["services"] }) {
  return (
    <span className="flex flex-wrap gap-2">
      {services.map((service, i) => {
        const Icon = service.icon
          ? (LucideIcons[service.icon as keyof typeof LucideIcons] as LucideIcon | undefined)
          : undefined;
        return (
          <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-700">
            {Icon && <Icon size={14} aria-hidden="true" />}
            {service.label}
          </span>
        );
      })}
    </span>
  );
}
