"use client";

const tools = [
  { name: "Figma",        slug: "figma",                  cardBg: "#1A1523", iconColor: "A259FF" },
  { name: "Photoshop",    slug: "adobephotoshop",          cardBg: "#001E36", iconColor: "31A8FF" },
  { name: "Illustrator",  slug: "adobeillustrator",        cardBg: "#310000", iconColor: "FF9A00" },
  { name: "InDesign",     slug: "adobeindesign",           cardBg: "#49021F", iconColor: "FF3366" },
  { name: "Lightroom",    slug: "adobelightroomclassic",   cardBg: "#001022", iconColor: "31A8FF" },
  { name: "React",        slug: "react",                   cardBg: "#20232A", iconColor: "61DAFB" },
  { name: "Next.js",      slug: "nextdotjs",               cardBg: "#111111", iconColor: "FFFFFF" },
  { name: "JavaScript",   slug: "javascript",              cardBg: "#323330", iconColor: "F7DF1E" },
  { name: "Supabase",     slug: "supabase",                cardBg: "#1C1C1C", iconColor: "3ECF8E" },
  { name: "Excel",        slug: "microsoftexcel",          cardBg: "#0E3B1E", iconColor: "33C44F" },
];

const doubled = [...tools, ...tools];

export default function ThreeDMarqueeDemo() {
  return (
    <div className="my-10 overflow-hidden">
      <div className="flex w-max gap-4 animate-scroll">
        {doubled.map((tool, i) => (
          <div
            key={i}
            className="shrink-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/8 px-8 py-6 w-36 h-36"
            style={{ background: tool.cardBg }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://cdn.simpleicons.org/${tool.slug}/${tool.iconColor}`}
              alt={tool.name}
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
            <span className="text-[11px] font-medium text-white/70 text-center leading-tight">{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
