"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Faq = { question: string; answer: string };

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-0 divide-y divide-zinc-100">
      {faqs.map((faq, i) => (
        <div key={i} className="py-4" onMouseEnter={() => setOpen(i)} onMouseLeave={() => setOpen(null)}>
          <div className="w-full flex items-center justify-between gap-4 text-left">
            <p className="text-[14px] font-black text-zinc-900 uppercase tracking-wide">{faq.question}</p>
            <ChevronDown className={`shrink-0 w-4 h-4 text-zinc-400 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} />
          </div>
          <div className={`grid transition-all duration-300 ease-in-out ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
            <div className="overflow-hidden">
              <p className="text-[14px] text-zinc-500 leading-relaxed mt-3">{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
