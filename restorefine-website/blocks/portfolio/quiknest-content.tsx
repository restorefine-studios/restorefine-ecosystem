import Image from "next/image";
import { Palette, Layers, FileText, Smartphone } from "lucide-react";
import { TableOfContents } from "@/blocks/blog/toc";
import { ExpandingCta } from "./expanding-cta";

const services = [
  { label: "Logo Design", icon: <Palette size={14} /> },
  { label: "Brand Identity", icon: <Layers size={14} /> },
  { label: "Brand Guidelines", icon: <FileText size={14} /> },
  { label: "Digital Assets", icon: <Smartphone size={14} /> },
];

const challenges = [
  { title: "Standing Out in a Crowded Market", description: "The delivery space is saturated with generic, forgettable brands — Quiknest needed a visual identity that commanded attention immediately." },
  { title: "Communicating Speed & Trust", description: "The brand had to balance two things simultaneously: the urgency of fast delivery and the reliability required to earn customer confidence." },
  { title: "Scalability Across Touchpoints", description: "The identity needed to work flawlessly across app icons, packaging, vehicle livery, and digital marketing — all from day one." },
  { title: "Investor-Ready Presentation", description: "Quiknest was preparing to pitch investors and needed a brand that projected professionalism and ambition at a glance." },
];

const strategy = [
  {
    title: "Brand Discovery",
    items: ["Defined core brand attributes: speed, trust, and digital-first thinking", "Mapped out all touchpoints from app icon to print collateral", "Developed a positioning strategy to differentiate from competitors"],
  },
  {
    title: "Logo & Visual System",
    items: ["Designed a confident wordmark paired with a dynamic logomark", "Selected a deep navy and electric accent palette to signal trust and energy", "Crafted a type system optimised for digital legibility at all sizes"],
  },
  {
    title: "Brand Guidelines",
    items: ["Produced a comprehensive brand guideline document", "Defined logo usage rules, clear space, and incorrect usage examples", "Delivered a full digital asset pack covering all required formats"],
  },
];

const execution = [
  "Logomark and wordmark design",
  "Colour palette and typography system",
  "App icon and favicon assets",
  "Brand guideline PDF",
  "Digital asset pack",
  "Print-ready files",
];

const results = [
  "Launched with a brand identity that gave Quiknest the visual authority to pitch investors with confidence",
  "The brand system scaled seamlessly across their app, website, and marketing campaigns",
  "Received strong industry recognition as a well-crafted new brand in the delivery space",
  "Created a flexible design system that the internal team can grow without external dependency",
];

const tocItems = [
  { id: "overview", label: "Project Overview" },
  { id: "challenges", label: "The Challenges" },
  { id: "strategy", label: "How We Solved It" },
  { id: "execution", label: "Creative Execution" },
  { id: "design-work", label: "Design Work" },
  { id: "results", label: "Results" },
];

const designImages = Array.from({ length: 10 }, (_, i) =>
  `/work/quiknest/docs/Artboard ${i + 1}@2x-100.webp`
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

export function QuiknestContent() {
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
          RestoRefine partnered with Quiknest to build a bold, modern brand identity for a fast-growing
          delivery platform. Our goal was to craft a visual system that communicates speed, trust, and
          digital-first thinking — one that would hold up across every touchpoint from app icons to
          packaging, and give the team the tools to pitch investors and launch publicly with confidence.
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
          RestoRefine delivered a complete brand identity system for Quiknest, including:
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
          A selection of brand and design work delivered for Quiknest.
        </p>
        {/* Hero image */}
        <div className="relative overflow-hidden rounded-2xl bg-zinc-100 shadow-md mb-4" style={{ aspectRatio: "16/9" }}>
          <Image
            src={designImages[0]}
            alt="Quiknest brand work — 1"
            fill
            className="object-cover transition-transform duration-500 hover:scale-[1.02]"
            loading="lazy"
            sizes="100vw"
          />
        </div>
        {/* Remaining 9 images in 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {designImages.slice(1).map((src, i) => (
            <div key={i} className="relative overflow-hidden rounded-2xl bg-zinc-100 shadow-sm" style={{ aspectRatio: "16/9" }}>
              <Image
                src={src}
                alt={`Quiknest brand work — ${i + 2}`}
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
