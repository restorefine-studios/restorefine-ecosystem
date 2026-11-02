import Image from "next/image";
import { homeContent } from "@/lib/homepageData";
import { Reveal } from "./reveal";
import { type } from "./type-scale";

const { intro } = homeContent;

export function Intro() {
  const [lead, ...rest] = intro.body;

  return (
    <section className="py-24 lg:py-36">
      <Reveal>
        <h2 className={`max-w-[16ch] ${type.statement} font-black uppercase leading-[0.95] tracking-[-0.04em] text-zinc-950`}>
          {intro.heading.startsWith(intro.highlight) ? (
            <>
              <span className="text-red-600">{intro.highlight}</span>
              {intro.heading.slice(intro.highlight.length)}
            </>
          ) : (
            intro.heading
          )}
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-10 md:grid-cols-12 lg:mt-20 lg:gap-16">
        <Reveal className="md:col-span-5 lg:col-span-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-zinc-100">
            <Image src={intro.image.src} alt={intro.image.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
        <div className="flex flex-col justify-end gap-8 md:col-span-7 lg:col-span-7 lg:col-start-6">
          <Reveal delay={0.08}>
            <p className="text-xl font-medium leading-snug tracking-[-0.02em] text-zinc-900 sm:text-2xl lg:text-[1.75rem] lg:leading-[1.35]">{lead}</p>
          </Reveal>
          {rest.map((paragraph) => (
            <Reveal key={paragraph} delay={0.16}>
              <p className="max-w-[60ch] text-base leading-relaxed text-zinc-500 sm:text-lg">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
