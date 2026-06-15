import Image from "next/image";
import { FileText, Printer, Palette, Wine } from "lucide-react";
import { TableOfContents } from "@/blocks/blog/toc";
import { ExpandingCta } from "./expanding-cta";

const services = [
  { label: "Menu Design", icon: <FileText size={14} /> },
  { label: "Drinks Menu", icon: <Wine size={14} /> },
  { label: "Seasonal Design", icon: <Palette size={14} /> },
  { label: "Print Production", icon: <Printer size={14} /> },
];

const challenges = [
  { title: "Matching the Restaurant's Ambition", description: "Firangi is one of the UK's most talked-about Indian restaurants — their menus needed to be as bold and considered as their food." },
  { title: "Seasonal Refresh Without Losing Consistency", description: "Seasonal menus needed to feel fresh and new each time while still fitting within a coherent visual identity." },
  { title: "Food and Drinks Across One System", description: "Food menus and drinks menus needed to feel unified in design language while serving very different information hierarchies." },
  { title: "Social-Worthy Design", description: "The menus needed to be visually compelling enough to be photographed and shared by diners on social media." },
];

const strategy = [
  {
    title: "Design Language",
    items: ["Developed a suite of bespoke illustration-inspired graphic elements specific to Firangi's brand personality", "Created a flexible layout system adaptable across seasonal variations and menu formats"],
  },
  {
    title: "Menu Architecture",
    items: ["Designed clear information hierarchies for both food and drinks menus", "Balanced visual impact with practical readability for a premium dining environment"],
  },
  {
    title: "Seasonal Execution",
    items: ["Produced seasonal Christmas and drinks menu designs with distinct but cohesive visual identities", "Supplied premium paper stock recommendations to elevate the tactile experience"],
  },
];

const execution = [
  "Seasonal food menu design",
  "Drinks menu design",
  "Bespoke illustration graphics",
  "Layout system development",
  "Print-ready file production",
  "Premium paper stock consultation",
];

const results = [
  "The seasonal menus became a talking point in their own right among Firangi diners",
  "Menus were widely shared on social media by guests who appreciated the design craft",
  "Established a flexible design system that makes future seasonal updates fast and consistent",
  "Strengthened Firangi's reputation as a restaurant that invests in every detail of the guest experience",
];

const tocItems = [
  { id: "overview", label: "Project Overview" },
  { id: "challenges", label: "The Challenges" },
  { id: "strategy", label: "How We Solved It" },
  { id: "execution", label: "Creative Execution" },
  { id: "design-work", label: "Design Work" },
  { id: "results", label: "Results" },
];

const designImages = [
  "/work/firangi/firangi_drinksmenu-01.webp",
  "/work/firangi/firangi_drinksmenu-02.webp",
  "/work/firangi/firangi_xmasmenu-01.webp",
  "/work/firangi/firangi_xmasmenu-02.webp",
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

export function FirangiContent() {
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
          RestoRefine partnered with Firangi to design bold seasonal menus for one of the UK&apos;s most
          talked-about contemporary Indian restaurants. Our goal was to create menus that felt as
          exciting as the food — contemporary, confident, and a cut above typical restaurant print.
          We produced a suite of seasonal food and drinks menus with bespoke illustration-inspired
          graphic elements, a flexible layout system, and premium print production guidance.
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
          RestoRefine delivered a complete seasonal menu suite for Firangi, including:
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
          Seasonal drinks and Christmas menu designs delivered for Firangi.
        </p>
        <div className="relative overflow-hidden rounded-2xl bg-zinc-100 shadow-md mb-4" style={{ aspectRatio: "16/9" }}>
          <Image src={designImages[0]} alt="Firangi drinks menu — 1" fill className="object-cover transition-transform duration-500 hover:scale-[1.02]" loading="lazy" sizes="100vw" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative overflow-hidden rounded-2xl bg-zinc-100 shadow-sm" style={{ aspectRatio: "16/9" }}>
            <Image src={designImages[1]} alt="Firangi drinks menu — 2" fill className="object-cover transition-transform duration-500 hover:scale-[1.02]" loading="lazy" sizes="(max-width: 640px) 100vw, 50vw" />
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-zinc-100 shadow-sm" style={{ aspectRatio: "16/9" }}>
            <Image src={designImages[2]} alt="Firangi Christmas menu — 1" fill className="object-cover transition-transform duration-500 hover:scale-[1.02]" loading="lazy" sizes="(max-width: 640px) 100vw, 50vw" />
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-zinc-100 shadow-sm" style={{ aspectRatio: "16/9" }}>
            <Image src={designImages[3]} alt="Firangi Christmas menu — 2" fill className="object-cover transition-transform duration-500 hover:scale-[1.02]" loading="lazy" sizes="(max-width: 640px) 100vw, 50vw" />
          </div>
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
