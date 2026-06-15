import Image from "next/image";
import { Palette, Layers, FileText, Star } from "lucide-react";
import { TableOfContents } from "@/blocks/blog/toc";
import { ExpandingCta } from "./expanding-cta";

const services = [
  { label: "Logo Design", icon: <Palette size={14} /> },
  { label: "Brand Identity", icon: <Layers size={14} /> },
  { label: "Brand Guidelines", icon: <FileText size={14} /> },
  { label: "Visual Identity System", icon: <Star size={14} /> },
];

const challenges = [
  { title: "Building from Scratch", description: "Mannis was launching a new premium hospitality concept with no existing brand — every element of the identity needed to be built from the ground up." },
  { title: "Scaling Across Multiple Verticals", description: "The brand identity needed to work seamlessly across restaurant, events, and retail — three very different environments requiring a flexible visual system." },
  { title: "Commanding Premium Positioning", description: "In a crowded hospitality market, the identity had to immediately signal premium quality and distinguish Mannis from generic competitors." },
  { title: "Longevity Over Trend", description: "The client needed a brand built to last — something that would remain relevant and refined for years without looking dated." },
];

const strategy = [
  {
    title: "Brand Strategy",
    items: ["Defined the brand's core positioning, personality, and values", "Researched the premium hospitality landscape to identify differentiation opportunities"],
  },
  {
    title: "Visual Identity",
    items: ["Developed a refined logomark anchored in a sophisticated neutral-toned colour palette", "Selected bespoke typeface pairings that communicate both elegance and authority"],
  },
  {
    title: "Brand Guidelines",
    items: ["Produced a comprehensive brand guideline document covering every usage scenario", "Defined logo applications, colour rules, typography hierarchy, and do/don't examples", "Delivered a full digital and print asset pack for immediate use"],
  },
];

const execution = [
  "Logomark design",
  "Colour palette and typography system",
  "Brand guideline PDF",
  "Logo usage rules and variations",
  "Digital asset pack",
  "Print collateral templates",
];

const results = [
  "Mannis launched with a brand that immediately commanded attention in the premium hospitality sector",
  "Cited by industry press as one of the most refined new restaurant identities of the year",
  "The brand system scaled successfully across restaurant, events, and retail verticals",
  "The visual identity gave the team the confidence and tools to maintain consistency independently",
];

const tocItems = [
  { id: "overview", label: "Project Overview" },
  { id: "challenges", label: "The Challenges" },
  { id: "strategy", label: "How We Solved It" },
  { id: "execution", label: "Creative Execution" },
  { id: "design-work", label: "Design Work" },
  { id: "results", label: "Results" },
];

const designImages = Array.from({ length: 8 }, (_, i) =>
  `/work/mannis/mannis_visualidentity-${String(i + 1).padStart(2, "0")}.webp`
);

function LightHeader({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-red-600 font-black text-xs tracking-widest uppercase">{num}</span>
      <div className="h-px flex-1 bg-zinc-100" />
      <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-medium">{label}</span>
    </div>
  );
}

export function MannisContent() {
  return (
    <>
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-zinc-100">

      {/* Services */}
      <div className="flex flex-wrap gap-2 mb-12">
        {services.map((s) => (
          <span key={s.label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-700">
            {s.icon}{s.label}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[260px_1fr] gap-x-14 xl:gap-x-16">
        <TableOfContents title="Case Study" items={tocItems} />
        <div className="space-y-16">

      {/* Overview */}
      <div id="overview">
        <LightHeader num="01" label="Project Overview" />
        <p className="text-zinc-600 text-base leading-relaxed max-w-3xl">
          RestoRefine partnered with Mannis to build a complete visual identity system for a premium
          hospitality brand launching from scratch. Our goal was to create a brand that could scale
          across restaurant, events, and retail — one that would command attention in a competitive
          market and give the business the visual authority to launch with confidence. We developed
          a refined logomark, a sophisticated colour palette, bespoke typeface pairings, and a
          comprehensive brand guideline document covering every usage scenario.
        </p>
      </div>

      {/* Challenges — dark feature block */}
      <div id="challenges" className="bg-zinc-950 rounded-3xl px-8 py-12">
        <div className="flex items-center gap-3 mb-10">
          <span className="text-red-500 font-black text-xs tracking-widest uppercase">02</span>
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-medium">The Challenges</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {challenges.map((c, i) => (
            <div key={i} className="flex flex-col gap-4 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors">
              <span className="text-5xl font-black text-zinc-800 leading-none tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm font-bold text-white leading-snug">{c.title}</p>
              <p className="text-xs text-zinc-400 leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Strategy */}
      <div id="strategy">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-zinc-100" />
          <span className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 font-medium px-3">How We Solved It</span>
          <div className="h-px flex-1 bg-zinc-100" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {strategy.map((s, i) => (
            <div key={i} className="border border-zinc-200 rounded-2xl p-6 hover:border-red-200 hover:bg-red-50/30 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-[9px] font-black text-white shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-black uppercase text-zinc-900">{s.title}</p>
              </div>
              <ul className="space-y-2">
                {s.items.map((item, j) => (
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

      {/* Creative Execution */}
      <div id="execution">
        <LightHeader num="04" label="Creative Execution" />
        <p className="text-zinc-500 text-sm leading-relaxed max-w-2xl mb-6">
          RestoRefine delivered a complete visual identity system for Mannis, including:
        </p>
        <div className="flex flex-wrap gap-3">
          {execution.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 text-xs font-medium text-zinc-700">
              <span className="w-1 h-1 rounded-full bg-red-600" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Design Work */}
      <div id="design-work">
        <LightHeader num="05" label="Design Work" />
        <p className="text-zinc-500 text-sm leading-relaxed max-w-2xl mb-8">
          A selection of visual identity work delivered for Mannis.
        </p>
        {/* Hero image */}
        <div className="relative overflow-hidden rounded-2xl bg-zinc-100 shadow-md mb-4" style={{ aspectRatio: "16/9" }}>
          <Image
            src={designImages[0]}
            alt="Mannis visual identity — 1"
            fill
            className="object-cover transition-transform duration-500 hover:scale-[1.02]"
            loading="lazy"
            sizes="100vw"
          />
        </div>
        {/* Remaining 7 images in 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {designImages.slice(1).map((src, i) => (
            <div key={i} className="relative overflow-hidden rounded-2xl bg-zinc-100 shadow-sm" style={{ aspectRatio: "16/9" }}>
              <Image
                src={src}
                alt={`Mannis visual identity — ${i + 2}`}
                fill
                className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                loading="lazy"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div id="results">
        <LightHeader num="06" label="Results" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {results.map((r, i) => (
            <div key={i} className="flex items-start gap-3 bg-zinc-50 border border-zinc-100 rounded-2xl p-5">
              <span className="mt-1 w-5 h-5 rounded-full bg-red-100 border border-red-200 flex items-center justify-center shrink-0 text-[9px] font-black text-red-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm text-zinc-700 leading-relaxed">{r}</p>
            </div>
          ))}
        </div>
      </div>

        </div>
      </div>

    </div>
    <ExpandingCta heading="Ready to Elevate Your Brand?" body="Get in touch and let's build something exceptional together." />
    </>
  );
}
