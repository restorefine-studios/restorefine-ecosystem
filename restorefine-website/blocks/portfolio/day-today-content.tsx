import { caseStudy } from "@/lib/clients/day-today";
import { TableOfContents } from "@/blocks/blog/toc";
import { AnimatedBuiltNumber } from "./animated-built-number";
import { ExpandingCta } from "./expanding-cta";

const { client, problem, strategy, whatWeBuilt, results, whyItWorked, conclusion, cta } = caseStudy;

const tocItems = [
  { id: "about", label: "About the Client" },
  { id: "challenge", label: "The Challenge" },
  { id: "strategy", label: "The Strategy" },
  { id: "execution", label: "Execution" },
  { id: "results", label: "The Results" },
  { id: "client-reaction", label: "Client Reaction" },
  { id: "why-it-worked", label: "Why the Campaign Worked" },
  { id: "conclusion", label: "Conclusion" },
];

function LightHeader({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-red-600 font-black text-xs tracking-widest uppercase">{num}</span>
      <div className="h-px flex-1 bg-zinc-100" />
      <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-medium">{label}</span>
    </div>
  );
}

export function DayTodayContent() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-zinc-100">

        {/* Services + focus tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {client.services.map((s) => (
            <span key={s} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-700">
              {s}
            </span>
          ))}
          {client.focus.map((f) => (
            <span key={f} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 text-xs font-medium text-red-700">
              {f}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[260px_1fr] gap-x-14 xl:gap-x-16">
          <TableOfContents title="Day Today Case Study" items={tocItems} />

          <div className="space-y-16">

            {/* 01 — About */}
            <div id="about">
              <LightHeader num="01" label="About the Client" />
              <p className="text-zinc-600 text-base leading-relaxed max-w-3xl">{client.about}</p>
            </div>

            {/* 02 — The Challenge */}
            <div id="challenge">
              <LightHeader num="02" label="The Challenge" />
              <p className="text-zinc-600 text-base leading-relaxed max-w-2xl mb-4">{problem.summary}</p>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-2xl mb-8">{problem.context}</p>
              <p className="text-zinc-400 text-xs font-medium uppercase tracking-widest mb-4">Key Objectives</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {problem.issues.map((issue, i) => (
                  <div key={i} className="flex items-start gap-3 border border-zinc-200 rounded-xl p-4 hover:border-red-200 hover:bg-red-50/20 transition-colors">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                    <p className="text-sm text-zinc-700 leading-relaxed">{issue}</p>
                  </div>
                ))}
              </div>
              <p className="text-zinc-400 text-xs italic border-l-2 border-red-200 pl-4">{problem.note}</p>
            </div>

            {/* 03 — Strategy */}
            <div id="strategy">
              <LightHeader num="03" label="The Strategy" />
              <p className="text-zinc-500 text-sm leading-relaxed mb-8 max-w-3xl">{strategy.summary}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {strategy.pillars.map((pillar, i) => (
                  <div key={i} className="border border-zinc-200 rounded-2xl p-6 hover:border-red-200 hover:bg-red-50/30 transition-colors">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-[9px] font-black text-white shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm font-black uppercase text-zinc-900">{pillar.name}</p>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed">{pillar.description}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-zinc-400 italic border-l-2 border-red-200 pl-4">{strategy.note}</p>
            </div>

            {/* 04 — Execution */}
            <div id="execution">
              <LightHeader num="04" label="Execution" />
              <div className="space-y-6">
                {whatWeBuilt.map((item) => (
                  <div key={item.id} className="border border-zinc-100 rounded-2xl p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <AnimatedBuiltNumber value={String(item.id).padStart(2, "0")} />
                      <h3 className="text-base font-black uppercase text-zinc-900 leading-snug pt-1">{item.title}</h3>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-4">{item.description}</p>
                    {item.services && (
                      <div className="flex flex-wrap gap-2">
                        {item.services.map((s: string) => (
                          <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200 text-xs font-medium text-zinc-600">
                            <span className="w-1 h-1 rounded-full bg-red-600 shrink-0" />
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 05 — Results */}
            <div id="results">
              <LightHeader num="05" label="The Results" />
              <p className="text-zinc-500 text-sm mb-8">{results.summary}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {results.outcomes.map((outcome, i) => (
                  <div key={i} className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 flex flex-col gap-3 hover:border-red-200 hover:bg-red-50/20 transition-colors">
                    <span className="text-4xl font-black text-zinc-900 leading-none">{outcome.stat}</span>
                    <span className="text-xs font-black uppercase tracking-widest text-red-600">{outcome.label}</span>
                    <p className="text-xs text-zinc-500 leading-relaxed">{outcome.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 06 — Client Reaction */}
            <div id="client-reaction" className="bg-red-600 rounded-3xl px-8 py-12">
              <div className="flex items-center gap-3 mb-10">
                <span className="text-white font-black text-xs tracking-widest uppercase">06</span>
                <div className="h-px flex-1 bg-red-500" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-red-200 font-medium">Client Reaction</span>
              </div>
              <p className="text-red-100 text-sm leading-relaxed mb-8">{results.clientReaction.intro}</p>
              <div className="flex mb-8">
                <div className="w-1 bg-red-700 rounded-full shrink-0" />
                <div className="bg-white ml-0 px-5 py-3 flex-1">
                  <p className="text-zinc-900 text-base font-light italic leading-relaxed">&ldquo;{results.clientReaction.quote}&rdquo;</p>
                </div>
              </div>
              <p className="text-red-100 text-sm leading-relaxed">{results.clientReaction.context}</p>
            </div>

            {/* 07 — Why It Worked */}
            <div id="why-it-worked">
              <LightHeader num="07" label="Why the Campaign Worked" />
              <p className="text-zinc-600 text-base leading-relaxed max-w-3xl mb-4">{whyItWorked.summary}</p>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-3xl border-l-2 border-red-200 pl-4 italic">{whyItWorked.closing}</p>
            </div>

            {/* 08 — Conclusion */}
            <div id="conclusion" className="pb-40">
              <LightHeader num="08" label="Conclusion" />
              <p className="text-zinc-600 text-base leading-relaxed max-w-3xl mb-4">{conclusion.summary}</p>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-3xl mb-4">{conclusion.body}</p>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-3xl border-l-2 border-red-200 pl-4 italic">{conclusion.closing}</p>
            </div>

          </div>
        </div>

        <ExpandingCta heading={cta.heading} body={cta.body} />

      </div>
    </>
  );
}
