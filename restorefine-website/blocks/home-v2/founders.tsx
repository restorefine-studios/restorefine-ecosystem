"use client";

import Image from "next/image";
import { useState } from "react";
import { EnquireAction } from "./actions";

export type Founder = { name: string; role: string; about: string[]; image: string };

/* First sentence of the bio becomes the pull quote; the rest reads beneath it */
function splitBio(about: string[]) {
  const [firstPara = "", ...others] = about;
  const match = firstPara.match(/^([^]+?[.!?])\s+([^]*)$/);
  const quote = match ? match[1] : firstPara;
  const rest = [match ? match[2] : "", ...others].filter(Boolean);
  return { quote, rest };
}

/** One founder at a time, as in the reference. Both stay in the DOM so every bio is crawlable. */
export function FounderSpotlight({ founders, cta }: { founders: Founder[]; cta: { label: string; href: string } }) {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-14">
      {founders.length > 1 && (
        <div role="tablist" aria-label="Founders" className="mb-8 inline-flex gap-1 rounded-full bg-zinc-100 p-1">
          {founders.map((f, i) => (
            <button
              key={f.name}
              role="tab"
              id={`founder-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`founder-panel-${i}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  const next = (active + (e.key === "ArrowRight" ? 1 : -1) + founders.length) % founders.length;
                  setActive(next);
                  document.getElementById(`founder-tab-${next}`)?.focus();
                }
              }}
              className={`min-h-11 whitespace-nowrap rounded-full px-5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${
                i === active ? "bg-zinc-950 text-white" : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
      )}

      {founders.map((f, i) => {
        const { quote, rest } = splitBio(f.about);
        return (
          <div
            key={f.name}
            role="tabpanel"
            id={`founder-panel-${i}`}
            aria-labelledby={`founder-tab-${i}`}
            hidden={i !== active}
            className={`${i === active ? "grid" : "hidden"} gap-10 lg:grid-cols-12 lg:items-center lg:gap-16`}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-zinc-100 lg:col-span-5">
              <Image src={f.image} alt={f.name} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-[50%_25%]" />
            </div>

            <div className="lg:col-span-7">
              <span aria-hidden="true" className="block font-[family-name:var(--font-display)] text-[8rem] font-medium leading-[0.6] text-red-600/15">
                &ldquo;
              </span>
              <h3 className="sr-only">{f.name}</h3>
              <blockquote className="v2-statement -mt-6 max-w-[24ch] text-zinc-950">{quote}</blockquote>

              <div className="mt-8 max-w-[60ch] space-y-4">
                {rest.map((p) => (
                  <p key={p} className="v2-body text-zinc-600">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <EnquireAction {...cta} />
                <div>
                  <p className="text-base font-medium text-zinc-950">{f.name}</p>
                  <p className="text-sm text-zinc-500">{f.role}, RestoRefine</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
