import { Globe, Palette, Share2, Layers } from "lucide-react";
import { PortfolioBrowserPreview } from "./portfolio-browser-preview";
import { TableOfContents } from "@/blocks/blog/toc";
import { ExpandingCta } from "./expanding-cta";

const services = [
  { label: "Website Development", icon: <Globe size={14} /> },
  { label: "Logo Design", icon: <Palette size={14} /> },
  { label: "Branding", icon: <Layers size={14} /> },
  { label: "Social Media Design", icon: <Share2 size={14} /> },
];

const challenges = [
  { title: "No Strong Brand Identity", description: "The business lacked a distinctive logo and consistent visual identity to represent the brand professionally." },
  { title: "Need for a Professional Website", description: "There was no modern website available for customers to explore the brand, its services, or important information." },
  { title: "Lack of Consistent Social Media Design", description: "The brand required creative social media graphics that align with its branding and create a consistent visual presence online." },
  { title: "Building a Professional Online Presence", description: "The business needed a complete digital setup to improve credibility and visibility in the market." },
];

const strategy = [
  {
    title: "Branding & Logo Design",
    items: ["Created a modern and recognisable logo reflecting the business professionally", "Developed a consistent brand identity for digital and print platforms"],
  },
  {
    title: "Website Development",
    items: ["Designed and developed a responsive website", "Provided a user-friendly experience that effectively showcases the brand online"],
  },
  {
    title: "Social Media Creative Design",
    items: ["Developed visually engaging social media creative designs", "Ensured alignment with brand identity for consistency across digital marketing channels"],
  },
];

const execution = [
  "Custom logo design",
  "Complete brand identity elements",
  "Responsive website design and development",
  "Social media creative graphics",
  "Visual assets aligned with brand guidelines",
];

const results = [
  "Developed a distinctive logo and brand identity for the business",
  "Successfully launched a responsive and modern website",
  "Created consistent social media creative designs aligned with the brand",
  "Improved the brand's professional appearance and digital visibility",
];

const tocItems = [
  { id: "overview", label: "Project Overview" },
  { id: "live-website", label: "Live Website" },
  { id: "challenges", label: "The Challenges" },
  { id: "strategy", label: "How We Solved It" },
  { id: "execution", label: "Creative Execution" },
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

export function YewTreeInnContent() {
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
              RestоRefine partnered with Yew Tree to establish a professional digital presence and a strong brand
              identity. The goal of the project was to design a modern logo, develop a consistent brand identity,
              and build a responsive website that represents the business online. In addition to branding and
              website development, our team created engaging social media creative designs to help the brand
              maintain a consistent visual presence across digital platforms.
            </p>
          </div>

          {/* Live Website */}
          <div id="live-website">
            <LightHeader num="02" label="Live Website" />
            <PortfolioBrowserPreview
              url="https://yewtreeinn.com"
              domain="yewtreeinn.com"
              label="Yew Tree Inn"
            />
          </div>

          {/* Challenges — dark feature block */}
          <div id="challenges" className="bg-zinc-950 rounded-3xl px-8 py-12">
            <div className="flex items-center gap-3 mb-10">
              <span className="text-red-500 font-black text-xs tracking-widest uppercase">03</span>
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
            <LightHeader num="05" label="Creative Execution" />
            <p className="text-zinc-500 text-sm leading-relaxed max-w-2xl mb-6">
              RestоRefine delivered a full branding and digital presence package for Yew Tree, including:
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
