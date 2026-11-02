"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { PageContent } from "@/lib/homepageData";

type Faq = PageContent["faqs"]["items"][number] & { list?: { label: string; text: string }[] };

export function FaqAccordion({ items }: { items: PageContent["faqs"]["items"] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="border-t border-zinc-200">
      {(items as Faq[]).map((faq, i) => {
        const isOpen = open === i;
        return (
          <li key={faq.question} className="border-b border-zinc-200">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start gap-5 py-6 text-left"
              >
                <span className="w-6 shrink-0 pt-0.5 text-sm font-semibold tabular-nums text-zinc-400">{i + 1}.</span>{" "}
                <span className={`flex-1 text-lg font-bold leading-snug tracking-[-0.02em] transition-colors sm:text-xl ${isOpen ? "text-zinc-950" : "text-zinc-700 group-hover:text-zinc-950"}`}>
                  {faq.question}
                </span>
                <Plus
                  aria-hidden="true"
                  className={`mt-0.5 h-6 w-6 shrink-0 transition-transform duration-500 ease-out-expo ${isOpen ? "rotate-45 text-red-600" : "text-zinc-400"}`}
                  strokeWidth={1.75}
                />
              </button>
            </h3>
            {/* Answers stay in the DOM when collapsed so they remain crawlable */}
            <div id={`faq-${i}`} className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <div className="max-w-[68ch] space-y-4 pb-7 pl-11 leading-relaxed text-zinc-600">
                  {faq.answer.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {faq.list && (
                    <ul className="list-disc space-y-2 pl-5 marker:text-red-600">
                      {faq.list.map((entry) => (
                        <li key={entry.label}>
                          <strong className="font-semibold text-zinc-900">{entry.label}</strong> {entry.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
