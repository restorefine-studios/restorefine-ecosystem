"use client";

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

/** Wraps a step's answers in a two-column grid */
export function OptionGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

/**
 * One answer in a step. Picking it moves the enquiry forward, so it reads as a
 * button with a forward arrow.
 */
export function OptionTile({ title, description, selected, onSelect }: { title: string; description?: string; selected: boolean; onSelect: () => void }) {
  // Tiles with a description stack from sm up so the description gets the full width
  const stacked = Boolean(description);

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group flex w-full items-center justify-between gap-4 rounded-[1.5rem] p-5 text-left transition-[transform,background-color,color,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:p-6 ${
        selected ? "bg-zinc-950 text-white" : "bg-white text-zinc-950 shadow-[0_1px_0_rgba(24,24,27,0.04)] hover:shadow-[0_20px_40px_-28px_rgba(24,24,27,0.45)]"
      } ${stacked ? "sm:min-h-[9rem] sm:flex-col-reverse sm:items-stretch sm:justify-end" : "min-h-[5.5rem]"}`}
    >
      <span className={`min-w-0 ${stacked ? "sm:mt-auto" : ""}`}>
        <span className={`block font-black uppercase leading-tight tracking-[-0.03em] transition-colors ${description ? "text-lg sm:text-2xl" : "text-lg sm:text-xl"}`}>{title}</span>
        {description && <span className={`mt-1 block text-sm transition-colors sm:mt-1.5 ${selected ? "text-zinc-400" : "text-zinc-500"}`}>{description}</span>}
      </span>
      <span className={stacked ? "sm:self-end" : ""}>
        <span
          aria-hidden="true"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-[transform,background-color,color] duration-300 ease-out-expo group-hover:translate-x-0.5 ${
            selected ? "bg-red-600 text-white" : "bg-[#f2f4f6] text-zinc-400 group-hover:bg-red-600 group-hover:text-white"
          }`}
        >
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </span>
      </span>
    </button>
  );
}
