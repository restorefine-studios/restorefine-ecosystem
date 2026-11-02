import { Building2, Sprout, TrendingUp } from "lucide-react";
import { homeContent, type PageContent } from "@/lib/homepageData";
import { Reveal } from "./reveal";
import { type } from "./type-scale";

// Each stage sits higher than the last, so the row reads as a climb
const stages = [
  { icon: Sprout, offset: "md:mt-40", tone: "bg-[#f2f4f6] text-zinc-950", body: "text-zinc-600", iconTone: "text-red-600" },
  { icon: TrendingUp, offset: "md:mt-20", tone: "bg-zinc-200/70 text-zinc-950", body: "text-zinc-600", iconTone: "text-red-600" },
  { icon: Building2, offset: "md:mt-0", tone: "bg-zinc-900 text-white", body: "text-zinc-400", iconTone: "text-red-500" },
];

export function Businesses({ businesses = homeContent.businesses }: { businesses?: PageContent["businesses"] }) {
  return (
    <section className="py-24 lg:py-32">
      <Reveal>
        <h2 className={`${type.section} font-black uppercase leading-[0.98] tracking-[-0.04em] text-zinc-950`}>{businesses.heading}</h2>
        <p className="mt-7 max-w-[65ch] text-base leading-relaxed text-zinc-600 sm:text-lg">{businesses.body}</p>
      </Reveal>

      <ol className="mt-14 grid gap-4 md:grid-cols-3 md:items-start lg:mt-6">
        {businesses.items.map((item, i) => {
          const stage = stages[i % stages.length];
          const Icon = stage.icon;
          return (
            <Reveal as="li" key={item.title} delay={i * 0.1} className={stage.offset}>
              <div className={`flex min-h-[22rem] flex-col rounded-[2rem] p-8 sm:p-10 ${stage.tone}`}>
                <Icon aria-hidden="true" className={`h-9 w-9 ${stage.iconTone}`} strokeWidth={1.5} />
                <p className="mt-auto pt-16 text-3xl font-black uppercase leading-[0.95] tracking-[-0.03em]">{item.title}</p>
                <p className={`mt-4 leading-relaxed ${stage.body}`}>{item.description}</p>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
