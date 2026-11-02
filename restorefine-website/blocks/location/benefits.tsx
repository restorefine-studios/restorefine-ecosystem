import { EnquireLink } from "@/blocks/home/cta-links";
import { Reveal } from "@/blocks/home/reveal";
import { type } from "@/blocks/home/type-scale";
import type { LocationExtras } from "@/lib/locations/london";

export function Benefits({ benefits }: { benefits: LocationExtras["benefits"] }) {
  return (
    <section className="py-24 lg:py-32">
      <Reveal>
        <h2 className={`max-w-[20ch] ${type.section} font-black uppercase leading-[0.98] tracking-[-0.04em] text-zinc-950`}>{benefits.heading}</h2>
        <p className="mt-7 max-w-[65ch] text-base leading-relaxed text-zinc-600 sm:text-lg">{benefits.body}</p>
      </Reveal>

      <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {benefits.items.map((item, i) => (
          <Reveal as="li" key={item.title} delay={(i % 3) * 0.08} className="flex flex-col rounded-[2rem] bg-[#f2f4f6] p-8 sm:p-9">
            <span aria-hidden="true" className="text-sm font-semibold tabular-nums text-red-600">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-10 text-2xl font-black uppercase leading-[0.98] tracking-[-0.035em] text-zinc-950">{item.title}</h3>
            <p className="mt-4 leading-relaxed text-zinc-600">{item.description}</p>
          </Reveal>
        ))}
      </ul>

      <div className="mt-12">
        <EnquireLink {...benefits.cta} />
      </div>
    </section>
  );
}
