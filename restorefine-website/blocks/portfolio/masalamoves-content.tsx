import Image from "next/image";
import { Palette, Layers, FileText, Music } from "lucide-react";
import { TableOfContents } from "@/blocks/blog/toc";
import { ExpandingCta } from "./expanding-cta";

const brandImages = Array.from({ length: 10 }, (_, i) =>
  `/work/masala/docs/Artboard ${i}@2x-100.webp`
);

const services = [
  { label: "Logo Design", icon: <Palette size={14} /> },
  { label: "Brand Identity", icon: <Layers size={14} /> },
  { label: "Brand Guidelines", icon: <FileText size={14} /> },
  { label: "Digital Assets", icon: <Music size={14} /> },
];

const challenges = [
  { title: "Outgrown Original Identity", description: "The existing brand no longer reflected the energy, growth, and professionalism of the studio — it needed a complete visual refresh." },
  { title: "Honouring Cultural Heritage", description: "Any new identity had to stay true to the richness of South Asian dance traditions without feeling dated or clichéd." },
  { title: "Appealing to a New Generation", description: "Luna needed a brand that would attract younger students discovering Bollywood fitness and contemporary Indian dance." },
  { title: "Versatility Across Platforms", description: "The identity had to work across studio signage, social media, merchandise, and a class booking platform simultaneously." },
];

const strategy = [
  {
    title: "Cultural Immersion",
    items: ["Explored South Asian textile patterns, performance arts, and colour traditions", "Mapped the brand's visual personality to Luna's teaching philosophy and student aspirations"],
  },
  {
    title: "Logo & Type Design",
    items: ["Designed fluid letterforms that echo movement and rhythm", "Created a custom logotype balancing cultural pride with contemporary confidence"],
  },
  {
    title: "Brand Language",
    items: ["Built a supporting graphic system referencing traditional motifs reimagined in a contemporary way", "Defined a warm, expressive colour palette drawn from South Asian performance arts", "Delivered a full brand guideline document for consistent usage"],
  },
];

const execution = [
  "Custom logotype design",
  "Colour palette and typography system",
  "Graphic motif library",
  "Brand guideline PDF",
  "Digital and print asset pack",
  "Social media template suite",
];

const results = [
  "The rebrand helped Masala Moves triple their social media following within months of launch",
  "Luna successfully launched a class booking platform underpinned by the new brand identity",
  "The brand is now used consistently across studio signage, merchandise, and digital campaigns",
  "Attracted a new generation of students while deepening loyalty among the existing community",
];

const tocItems = [
  { id: "overview", label: "Project Overview" },
  { id: "challenges", label: "The Challenges" },
  { id: "strategy", label: "How We Solved It" },
  { id: "execution", label: "Creative Execution" },
  { id: "brand-work", label: "Brand Work" },
  { id: "results", label: "Results" },
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

export function MasalaMovesContent() {
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
          RestoRefine partnered with Luna Shree to rebrand Masala Moves — a celebrated Bollywood dance
          studio that had outgrown its original visual identity. Our goal was to create a brand that
          honours the cultural richness of South Asian dance while feeling modern and magnetic enough
          to attract a new generation of students. We designed a custom logotype, a warm expressive
          colour system, and a comprehensive brand language drawing from traditional motifs
          reimagined for a contemporary audience.
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
          RestoRefine delivered a full brand identity system for Masala Moves, including:
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

      {/* Brand Work */}
      <div id="brand-work">
        <LightHeader num="05" label="Brand Work" />
        <p className="text-zinc-500 text-sm leading-relaxed max-w-2xl mb-8">
          A selection of brand identity work delivered for Masala Moves — logo, colour system, motif library, and digital assets.
        </p>
        <div className="relative w-full overflow-hidden rounded-2xl bg-zinc-100 shadow-md mb-4" style={{ aspectRatio: "16/9" }}>
          <Image
            src={brandImages[0]}
            alt="Masala Moves brand identity"
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {brandImages.slice(1).map((src, i) => (
            <div key={i} className="relative overflow-hidden rounded-2xl bg-zinc-100 shadow-sm" style={{ aspectRatio: "16/9" }}>
              <Image
                src={src}
                alt={`Masala Moves brand work — ${i + 2}`}
                fill
                className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, 50vw"
                loading="lazy"
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
