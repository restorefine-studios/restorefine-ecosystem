import { caseStudy } from "@/lib/clients/za-cleaning";
import { PortfolioBrowserPreview } from "./portfolio-browser-preview";
import { TableOfContents } from "@/blocks/blog/toc";
import { AnimatedBuiltNumber } from "./animated-built-number";
import { AnimatedStepsCard } from "./animated-steps-card";
import { ExpandingCta } from "./expanding-cta";

const { client, problem, realisation, strategy, whatWeBuilt, results, cta } = caseStudy;

const tocItems = [
  { id: "live-website", label: "Live Website" },
  { id: "problem", label: "The Problem" },
  { id: "realisation", label: "The Realisation" },
  { id: "strategy", label: "Our Strategy" },
  {
    id: "what-we-built",
    label: "What We Built",
    children: whatWeBuilt.map((item) => ({
      id: `built-${item.id}`,
      label: item.title,
    })),
  },
  { id: "results", label: "Results" },
];

function SectionHeader({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-red-600 font-black text-xs tracking-widest uppercase">{num}</span>
      <div className="h-px flex-1 bg-zinc-100" />
      <span className="text-sm tracking-[0.3em] uppercase text-red-600 font-black">{label}</span>
    </div>
  );
}

export function ZaCleaningContent() {
  return (
    <>

    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-zinc-100">
      {/* Service tag + coverage — full width */}
      <div className="flex flex-wrap gap-2 mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 text-xs font-medium text-red-700">
          {client.service}
        </span>
        {client.coverage.map((city) => (
          <span key={city} className="inline-flex items-center px-4 py-2 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-600">
            {city}
          </span>
        ))}
      </div>

      {/* Two-column: TOC sidebar + content */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[260px_1fr] gap-x-14 xl:gap-x-16">

        {/* TOC */}
        <TableOfContents title="ZA Cleaning Team Case Study" items={tocItems} />

        {/* Main content */}
        <div className="space-y-20">

          {/* 01 — Live Website */}
          <div id="live-website">
            <SectionHeader num="01" label="Live Website" />
            <PortfolioBrowserPreview
              url={client.website}
              domain={client.website.replace("https://", "")}
              label={client.name}
              defaultOpen
            />
          </div>

          {/* 02 — The Problem */}
          <div id="problem">
            <SectionHeader num="02" label="The Problem" />
            <p className="text-zinc-600 text-base leading-relaxed max-w-3xl mb-4">{problem.summary}</p>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-3xl">{problem.context}</p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {problem.issues.map((issue, i) => (
                <div key={i} className="flex items-start gap-3 border border-zinc-200 rounded-xl p-4">
                  <span className="w-5 h-5 rounded-full bg-red-100 border border-red-200 flex items-center justify-center shrink-0 text-[9px] font-black text-red-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-zinc-700 leading-snug">{issue}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 03 — The Realisation */}
          <div id="realisation" className="bg-zinc-950 rounded-3xl px-8 py-12">
            <div className="flex items-center gap-3 mb-10">
              <span className="text-red-500 font-black text-xs tracking-widest uppercase">03</span>
              <div className="h-px flex-1 bg-zinc-800" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-medium">The Realisation</span>
            </div>
            <p className="text-zinc-300 text-base leading-relaxed max-w-2xl mb-8">{realisation.summary}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {realisation.customerQuestions.map((q, i) => (
                <div key={i} className="flex items-start gap-3 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  <p className="text-sm text-zinc-400 leading-relaxed italic">{q}</p>
                </div>
              ))}
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">{realisation.conclusion}</p>
          </div>

          {/* 04 — Strategy */}
          <div id="strategy">
            <SectionHeader num="04" label="Our Strategy" />
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">{strategy.summary}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strategy.pillars.map((pillar, i) => (
                <div key={i} className="border border-zinc-200 rounded-2xl p-8 hover:border-red-200 hover:bg-red-50/30 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-[10px] font-black text-white shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-lg font-black uppercase text-zinc-900">{pillar.name}</p>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-zinc-400 italic">{strategy.note}</p>
          </div>

          {/* 05 — What We Built */}
          <div id="what-we-built">
            <SectionHeader num="05" label="What We Built" />
            <div className="space-y-8">
              {whatWeBuilt.map((item) => (
                <div key={item.id} id={`built-${item.id}`} className="border border-zinc-100 rounded-2xl p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <AnimatedBuiltNumber value={String(item.id).padStart(2, "0")} />
                    <h3 className="text-base font-black uppercase text-zinc-900 leading-snug pt-1">{item.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-4">{item.description}</p>

                  {"services" in item && item.services && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.services.map((s: string) => (
                        <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200 text-xs font-medium text-zinc-600">
                          <span className="w-1 h-1 rounded-full bg-red-600" />
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {"steps" in item && item.steps && (
                    <AnimatedStepsCard steps={item.steps} />
                  )}

                  {"trustSignals" in item && item.trustSignals && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.trustSignals.map((signal: string) => (
                        <span key={signal} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-700">
                          <span className="w-1 h-1 rounded-full bg-red-600 shrink-0" />
                          {signal}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 06 — Results */}
          <div id="results">
            <SectionHeader num="06" label="Results" />
            <p className="text-zinc-500 text-sm mb-6">{results.summary}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {results.outcomes.map((outcome, i) => (
                <div key={i} className="flex items-start gap-3 bg-zinc-50 border border-zinc-100 rounded-2xl p-5">
                  <span className="w-5 h-5 rounded-full bg-red-100 border border-red-200 flex items-center justify-center shrink-0 text-[9px] font-black text-red-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-zinc-700 leading-relaxed">{outcome}</p>
                </div>
              ))}
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-3xl border-l-2 border-red-200 pl-4 italic">{results.closing}</p>
          </div>

        </div>
      </div>

      <ExpandingCta heading={cta.heading} body={cta.body} />

    </div>
    </>
  );
}
