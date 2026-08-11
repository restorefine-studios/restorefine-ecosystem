import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PortfolioBrowserPreview } from "./portfolio-browser-preview";
import { ExpandingCta } from "./expanding-cta";
import { ChartTileRender } from "./chart-tile";
import { TableOfContents, type TocItem } from "@/blocks/blog/toc";
import { FaqAccordion } from "@/blocks/blog/faq-accordion";
import { jsonLd } from "@/lib/utils";
import {
  normaliseSectionOrder,
  SECTION_LABELS,
  type ChartTile,
  type PortfolioProject,
  type SectionKey,
} from "@/lib/portfolio-cms";

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
  faq: "faqs",
};

const CHART_GRID_COLS: Record<1 | 2 | 3, string> = {
  1: "",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

/** Whether a charts-section tile has enough content to render. */
function isChartTileVisible(t: ChartTile): boolean {
  return t.kind === "text"
    ? !!t.heading?.trim() || (t.bullets ?? []).some((b) => b.lead.trim() || b.body.trim())
    : (t.categories ?? []).some((c) => c.trim()) &&
      (t.series ?? []).some((sr) => sr.name.trim() || sr.values.some((v) => v.trim()));
}

function LightHeader({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-red-600 font-black text-xs tracking-widest uppercase">{num}</span>
      <div className="h-px flex-1 bg-zinc-100" />
      <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-medium">{label}</span>
    </div>
  );
}

export function CmsPortfolioContent({ project }: { project: PortfolioProject }) {
  const s = project.sections;

  /**
   * A section shows only when it's switched on *and* has something to show.
   * A toggled-on but empty section would otherwise render a bare header.
   */
  const isVisible = (key: SectionKey): boolean => {
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
      case "faq":
        return s.faq.items.some((f) => f.question.trim() && f.answer.trim());
    }
  };

  const order = normaliseSectionOrder(project.section_order);
  const visible = order.filter(isVisible);
  const labelFor = (key: SectionKey) => s[key].label?.trim() || SECTION_LABELS[key];
  const numberFor = (key: SectionKey) => String(visible.indexOf(key) + 1).padStart(2, "0");

  const tocItems: TocItem[] = visible.map((key) => ({
    id: SECTION_IDS[key],
    label: labelFor(key),
  }));

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

  const visibleChartTiles = s.charts.items.filter(isChartTileVisible);

  const sectionBlocks: Record<SectionKey, React.ReactNode> = {
    overview: isVisible("overview") && (
      <div id={SECTION_IDS.overview} key="overview">
        <LightHeader num={numberFor("overview")} label={labelFor("overview")} />
        <p className="text-zinc-600 text-base leading-relaxed max-w-3xl whitespace-pre-line">
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
        <div className="flex items-center gap-3 mb-10">
          <span className="text-red-500 font-black text-xs tracking-widest uppercase">
            {numberFor("challenges")}
          </span>
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-medium">
            {labelFor("challenges")}
          </span>
        </div>
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
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-zinc-100" />
          <span className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 font-medium px-3">
            {labelFor("strategy")}
          </span>
          <div className="h-px flex-1 bg-zinc-100" />
        </div>
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
                  <span className="text-3xl md:text-4xl font-black text-zinc-900 tabular-nums">{item.value}</span>
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
        <div className={`grid grid-cols-1 gap-6 ${CHART_GRID_COLS[s.charts.columns] ?? CHART_GRID_COLS[2]}`}>
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
                {tile.title && <p className="text-sm font-bold text-zinc-900 mb-2">{tile.title}</p>}
                <ChartTileRender tile={tile} />
              </div>
            )
          )}
        </div>
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
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-zinc-100">

        {/* Services */}
        {project.services.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            {project.services.map((service, i) => {
              const Icon = service.icon
                ? (LucideIcons[service.icon as keyof typeof LucideIcons] as LucideIcon | undefined)
                : undefined;
              return (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-700"
                >
                  {Icon && <Icon size={14} />}
                  {service.label}
                </span>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] gap-x-14 xl:gap-x-16">
          <TableOfContents title="Case Study" items={tocItems} />
          <div className="space-y-16">
            {order.map((key) => sectionBlocks[key])}
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
