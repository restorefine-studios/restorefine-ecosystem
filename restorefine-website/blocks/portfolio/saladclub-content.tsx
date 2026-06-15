import Image from "next/image";
import { Palette, FileText, Layers } from "lucide-react";
import { TableOfContents } from "@/blocks/blog/toc";
import { ExpandingCta } from "./expanding-cta";

const brandGuidelinePages = Array.from({ length: 14 }, (_, i) =>
  `/clients/salad_club_brand_guidelines/saladclub_brandguidelines_page-${String(i + 1).padStart(4, "0")}.jpg`
);

const services = [
  { label: "Logo Design", icon: <Palette size={14} /> },
  { label: "Brand Identity", icon: <Layers size={14} /> },
  { label: "Brand Guidelines", icon: <FileText size={14} /> },
];

const challenges = [
  { title: "No Existing Brand Identity", description: "The business was starting from scratch and did not have a logo or defined visual branding." },
  { title: "Need for Consistency Across Platforms", description: "Without structured brand guidelines, it would be difficult to maintain a consistent look across menus, packaging, social media, and marketing materials." },
  { title: "Creating a Modern and Fresh Brand Image", description: "The brand needed a visual identity that would communicate freshness, health, and quality while appealing to a modern audience." },
];

const strategy = [
  {
    title: "Brand Discovery",
    items: ["Understood the brand vision, target audience, and positioning", "Identified key attributes such as freshness, health, and simplicity"],
  },
  {
    title: "Logo Design",
    items: ["Designed a clean and modern logo that reflects the brand's concept", "Ensured the logo works across digital and print applications"],
  },
  {
    title: "Brand Guidelines Development",
    items: ["Created a comprehensive brand guideline document", "Defined typography, colour palette, logo usage rules, and design elements", "Provided a full PDF guide to ensure consistency across all future branding materials"],
  },
];

const execution = [
  "Logo design",
  "Colour palette and typography system",
  "Brand guideline PDF",
  "Logo usage rules and variations",
  "Design elements for consistent branding",
];

const results = [
  "The brand identity created a strong foundation for Salad Club's visual presence and future marketing",
  "Developed a distinctive logo that represents the brand's fresh and healthy concept",
  "Delivered a comprehensive brand guideline PDF for consistent branding",
  "Established a professional and recognisable visual identity for the business",
];

const tocItems = [
  { id: "overview", label: "Project Overview" },
  { id: "challenges", label: "The Challenges" },
  { id: "strategy", label: "How We Solved It" },
  { id: "execution", label: "Creative Execution" },
  { id: "guidelines", label: "Brand Guidelines" },
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

export function SaladClubContent() {
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
              RestоRefine partnered with Salad Club to develop a strong and modern brand identity that reflects
              the brand&apos;s focus on fresh, healthy food. Our goal was to create a distinctive logo and a complete
              brand guideline system that would help the business maintain a consistent visual identity across
              digital platforms, menus, packaging, and marketing materials. Our team designed a clean and
              recognisable logo and produced a comprehensive brand guidelines document in PDF format.
            </p>
          </div>

          {/* Challenges — dark feature block */}
          <div id="challenges" className="bg-zinc-950 rounded-3xl px-8 py-12">
            <div className="flex items-center gap-3 mb-10">
              <span className="text-red-500 font-black text-xs tracking-widest uppercase">02</span>
              <div className="h-px flex-1 bg-zinc-800" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-medium">The Challenges</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

          {/* Strategy — directly after challenges */}
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
            <div className="flex flex-wrap gap-3">
              {execution.map((item, i) => (
                <span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 text-xs font-medium text-zinc-700">
                  <span className="w-1 h-1 rounded-full bg-red-600" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Brand Guidelines Gallery */}
          <div id="guidelines">
            <LightHeader num="05" label="Brand Guidelines" />
            <p className="text-zinc-500 text-sm leading-relaxed max-w-2xl mb-8">
              A comprehensive brand guideline document defining typography, colour palette, logo usage, and design elements to ensure consistency across all future branding.
            </p>
            {/* First page — hero full-width */}
            <div className="relative w-full overflow-hidden rounded-2xl bg-zinc-100 shadow-md mb-4" style={{ aspectRatio: "16/9" }}>
              <Image
                src={brandGuidelinePages[0]}
                alt="Salad Club brand guidelines — cover"
                fill
                className="object-cover"
                sizes="100vw"
                loading="lazy"
              />
            </div>
            {/* Remaining pages — 2-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {brandGuidelinePages.slice(1).map((src, i) => (
                <div key={i} className="relative overflow-hidden rounded-2xl bg-zinc-100 shadow-sm" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src={src}
                    alt={`Salad Club brand guidelines — page ${i + 2}`}
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
