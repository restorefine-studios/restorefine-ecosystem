import { Globe, Palette, Share2, Video, Printer } from "lucide-react";
import { PortfolioBrowserPreview } from "./portfolio-browser-preview";
import { TableOfContents } from "@/blocks/blog/toc";
import { ExpandingCta } from "./expanding-cta";

const services = [
  { label: "Branding", icon: <Palette size={14} /> },
  { label: "Web Development", icon: <Globe size={14} /> },
  { label: "Social Media", icon: <Share2 size={14} /> },
  { label: "Graphic Design", icon: <Printer size={14} /> },
  { label: "Video Production", icon: <Video size={14} /> },
];

const challenges = [
  { title: "Lack of a Consistent Brand Identity", description: "The academy did not have a defined visual identity or consistent design elements across platforms." },
  { title: "No Professional Website", description: "There was no dedicated website to showcase the academy, coaching programs, and facilities." },
  { title: "Low Social Media Engagement", description: "Content lacked a clear strategy and consistent branding, resulting in low audience engagement." },
  { title: "Difficulty Attracting New Players Online", description: "Without a strong digital presence or marketing strategy, the academy struggled to generate new player inquiries." },
];

const strategy = [
  {
    title: "Branding",
    items: ["Designed logo and brand guidelines", "Defined colour palette and typography", "Created a consistent brand identity for digital and print materials"],
  },
  {
    title: "Website Development",
    items: ["Designed a responsive and modern website", "Built a user-friendly experience to showcase the academy and programmes"],
  },
  {
    title: "Social Media Marketing",
    items: ["Developed a structured content strategy", "Designed engaging social media posts and reels", "Managed and planned the social media content calendar"],
  },
];

const execution = [
  "Logo and brand identity design",
  "Website design and development",
  "Social media content and graphics",
  "Promotional flyers",
  "Video production including shooting and editing reels",
];

const results = [
  "Increased social media engagement through strategic content and video marketing",
  "Successfully launched a professional website for the academy",
  "Improved online visibility and brand recognition",
  "Increase in academy sign-ups through online inquiries",
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

export function ItsPadelContent() {
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
              RestоRefine partnered with It&apos;s Padel to build a strong and recognisable digital presence.
              Our goal was to establish a compelling brand identity, launch a professional website, and attract
              new players through strategic digital marketing. Along with branding and web development, our team
              also designed promotional graphics and flyers, and handled video production including shooting and
              editing engaging content for social media.
            </p>
          </div>

          {/* Live Website */}
          <div id="live-website">
            <LightHeader num="02" label="Live Website" />
            <PortfolioBrowserPreview
              url="https://www.itspadel.co.uk/"
              domain="itspadel.co.uk"
              label="It's Padel"
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
              Our team produced a wide range of creative assets to strengthen the academy&apos;s digital presence, including:
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
