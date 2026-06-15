import Image from "next/image";
import { Printer, CreditCard, Layers, Briefcase } from "lucide-react";
import { TableOfContents } from "@/blocks/blog/toc";
import { ExpandingCta } from "./expanding-cta";

const services = [
  { label: "Business Card Design", icon: <CreditCard size={14} /> },
  { label: "Stationery Design", icon: <Printer size={14} /> },
  { label: "Brand Application", icon: <Layers size={14} /> },
  { label: "Print Production", icon: <Briefcase size={14} /> },
];

const challenges = [
  { title: "Establishing Professional Credibility", description: "Momo Hub needed stationery that would give them instant credibility when approaching new venues and wholesale partners." },
  { title: "Matching Their Food Quality", description: "The stationery had to reflect the same care and quality that goes into their food — generic, off-the-shelf designs simply wouldn't do." },
  { title: "Standing Out in B2B Settings", description: "In wholesale and venue meetings, the business card needed to leave a strong impression against more established competitors." },
  { title: "Brand Consistency", description: "The stationery suite had to feel coherent with the Momo Hub brand identity across every piece." },
];

const strategy = [
  {
    title: "Premium Design Approach",
    items: ["Applied a minimal, confident aesthetic that lets the brand's quality speak", "Focused on clean layout and considered white space to signal premium positioning"],
  },
  {
    title: "Finish & Production",
    items: ["Specified spot UV finishes to add a tactile premium quality to the business cards", "Recommended premium card stocks that match the brand's positioning"],
  },
  {
    title: "Brand Application",
    items: ["Ensured all stationery elements aligned with the Momo Hub brand identity", "Delivered print-ready files optimised for high-quality reproduction"],
  },
];

const execution = [
  "Business card design",
  "Stationery suite design",
  "Spot UV finish specification",
  "Premium stock consultation",
  "Print-ready file preparation",
  "Brand application guidelines",
];

const results = [
  "Momo Hub secured several new wholesale partnerships within weeks of receiving their new stationery",
  "The premium business cards made a strong impression in B2B meetings and venue pitches",
  "The stationery elevated the brand's perceived quality in line with their food offering",
  "The consistent stationery suite gave Momo Hub a professional presence at every touchpoint",
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
  "/work/momohub/momohub_businesscard_u3-01.jpg",
  "/work/momohub/momohub_businesscard_u3-02.jpg",
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

export function MomoHubContent() {
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
          RestoRefine partnered with Momo Hub to design a sleek, premium business card and stationery
          suite for a modern Nepalese street food brand. The goal was to create print collateral that
          matched the quality and confidence of their food — giving the team the credibility and
          impression they needed when approaching new venues and wholesale partners. We applied a
          minimal aesthetic with spot UV finishes and premium stock recommendations.
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
          RestoRefine delivered a complete stationery package for Momo Hub, including:
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
          A look at the finished business card design delivered for Momo Hub.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {designImages.map((src, i) => (
            <div key={i} className="relative overflow-hidden rounded-2xl bg-zinc-100 shadow-sm" style={{ aspectRatio: "16/9" }}>
              <Image
                src={src}
                alt={`Momo Hub business card — ${i + 1}`}
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
