"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

/**
 * Question layout shared by every step: heading, optional hint, answers, back link.
 * The heading takes focus when a step opens after an answer, so keyboard and
 * screen reader users land on the new question instead of a removed button.
 */
export function StepShell({ title, hint, onBack, children }: { title: string; hint?: string; onBack?: () => void; children: ReactNode }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const active = document.activeElement;
    // Only move focus when it was lost with the previous step (not on first page load)
    if (active === document.body && document.getElementById("enquiry-card")?.dataset.started === "true") {
      headingRef.current?.focus({ preventScroll: true });
    }
  }, []);

  return (
    <div>
      <h2 ref={headingRef} tabIndex={-1} className={`text-[clamp(1.75rem,3vw,2.75rem)] font-black uppercase leading-[0.98] tracking-[-0.04em] outline-none text-zinc-950`}>
        {title}
      </h2>
      {hint && <p className={`mt-4 max-w-[52ch] text-base leading-relaxed sm:text-lg text-zinc-600`}>{hint}</p>}

      <div className="mt-9">{children}</div>

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className={`mt-9 inline-flex items-center gap-2 text-sm font-semibold transition-colors text-zinc-500 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600`}
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Back
        </button>
      )}
    </div>
  );
}
