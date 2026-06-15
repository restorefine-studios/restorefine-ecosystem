import Image from "next/image";
import { FileText, Printer, Layers, AlignLeft } from "lucide-react";
import { TableOfContents } from "@/blocks/blog/toc";
import { ExpandingCta } from "./expanding-cta";

const services = [
  { label: "Bifold Menu Design", icon: <FileText size={14} /> },
  { label: "Information Architecture", icon: <AlignLeft size={14} /> },
  { label: "Print Design", icon: <Printer size={14} /> },
  { label: "Brand Application", icon: <Layers size={14} /> },
];

const challenges = [
  { title: "An Overwhelming Menu", description: "The existing menu presented too much information without structure — customers felt overwhelmed when trying to make decisions at the counter." },
  { title: "Poor Navigation", description: "Sections were poorly defined and lacked a logical flow, making it difficult for customers to find what they were looking for quickly." },
  { title: "Inconsistent Visual Identity", description: "The menu design did not align with the Gurkha Express brand, missing an opportunity to reinforce the restaurant's identity at every touchpoint." },
  { title: "Impact on Service Speed", description: "Staff spent significant time explaining the menu options, slowing down service during peak hours when speed matters most." },
];

const strategy = [
  {
    title: "Information Architecture",
    items: ["Audited and restructured the full menu into clearly defined sections and categories", "Applied a logical flow that mirrors how customers naturally browse and decide"],
  },
  {
    title: "Bifold Layout Design",
    items: ["Designed a clean bifold format that maximises space without cluttering", "Used strong typographic hierarchy and branded colour accents to guide the eye effortlessly"],
  },
  {
    title: "Print Production",
    items: ["Prepared print-ready bifold files with correct bleed and fold specifications", "Ensured the design would reproduce consistently across print runs"],
  },
];

const execution = [
  "Full menu information audit",
  "Bifold layout design",
  "Section and category structuring",
  "Typographic hierarchy system",
  "Branded colour accent application",
  "Print-ready file preparation",
];

const results = [
  "Customer feedback on the new menu was immediately positive following the relaunch",
  "The owners reported a noticeable increase in add-on orders thanks to better dish visibility",
  "Service speed improved as customers could navigate the menu independently and confidently",
  "Staff no longer needed to spend time explaining menu structure during peak periods",
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
  "/work/ghurkaexpress/gurkhaexpress_bifold_update5-01.webp",
  "/work/ghurkaexpress/gurkhaexpress_bifold_update5-02.webp",
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

export function GurkhaExpressContent() {
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
          RestoRefine partnered with Gurkha Express to redesign their bifold menu — transforming an
          overwhelming, hard-to-navigate document into a clean, well-structured experience that
          makes ordering effortless. We restructured the information architecture from the ground
          up, designed a clear bifold layout with strong typographic hierarchy, and applied branded
          colour accents that guide customers naturally through the menu.
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
          RestoRefine delivered a full bifold menu redesign for Gurkha Express, including:
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
          A look at the finished bifold menu design delivered for Gurkha Express.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative overflow-hidden rounded-2xl bg-zinc-100 shadow-sm" style={{ aspectRatio: "16/9" }}>
            <Image src={designImages[0]} alt="Gurkha Express menu design — 1" fill className="object-cover transition-transform duration-500 hover:scale-[1.02]" loading="lazy" sizes="(max-width: 640px) 100vw, 50vw" />
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-zinc-100 shadow-sm" style={{ aspectRatio: "16/9" }}>
            <Image src={designImages[1]} alt="Gurkha Express menu design — 2" fill className="object-cover transition-transform duration-500 hover:scale-[1.02]" loading="lazy" sizes="(max-width: 640px) 100vw, 50vw" />
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
