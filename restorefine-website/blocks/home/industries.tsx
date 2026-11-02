"use client";

import Image from "next/image";
import { useState } from "react";
import { homeContent, type PageContent } from "@/lib/homepageData";
import { Reveal } from "./reveal";
import { type } from "./type-scale";

/* One set of markup for every breakpoint, so each industry H3 appears once:
 * stacked cards on small screens, expanding image panels from lg up. */
export function Industries({ industries = homeContent.industries }: { industries?: PageContent["industries"] }) {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 lg:py-32">
      <Reveal>
        <h2 className={`${type.section} font-black uppercase leading-[0.98] tracking-[-0.04em] text-zinc-950`}>{industries.heading}</h2>
        <p className="mt-7 max-w-[65ch] text-base leading-relaxed text-zinc-600 sm:text-lg">{industries.body}</p>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:flex lg:h-[36rem] lg:gap-3">
        {industries.items.map((item, i) => {
          const open = i === active;
          return (
            <article
              key={item.title}
              tabIndex={0}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={`group relative overflow-hidden rounded-[2rem] bg-[#f2f4f6] outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 lg:bg-zinc-900 lg:transition-[flex-grow] lg:duration-700 lg:ease-out-expo ${
                open ? "lg:flex-[3.4]" : "lg:flex-1"
              }`}
            >
              <div className="relative aspect-[16/10] bg-zinc-200 lg:absolute lg:inset-0 lg:aspect-auto">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, (min-width: 768px) 50vw, 100vw"
                  className={`object-cover lg:transition-transform lg:duration-700 ${open ? "lg:scale-100" : "lg:scale-110"}`}
                />
              </div>
              <div
                aria-hidden="true"
                className={`absolute inset-0 hidden bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-zinc-950/10 transition-opacity duration-500 lg:block ${open ? "opacity-100" : "opacity-80"}`}
              />

              <div className={`p-7 lg:absolute lg:inset-x-0 lg:bottom-0 lg:transition-[padding] lg:duration-500 ${open ? "lg:p-8" : "lg:p-5"}`}>
                <h3
                  className={`text-2xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-zinc-950 lg:text-white lg:transition-all lg:duration-500 ${
                    open ? "lg:text-4xl" : "lg:break-words lg:text-sm"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-3 leading-relaxed text-zinc-600 lg:mt-4 lg:max-w-[52ch] lg:text-zinc-200 lg:transition-[opacity,transform] lg:duration-500 ${
                    open ? "lg:translate-y-0 lg:opacity-100 lg:delay-200" : "lg:pointer-events-none lg:absolute lg:translate-y-4 lg:opacity-0"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
