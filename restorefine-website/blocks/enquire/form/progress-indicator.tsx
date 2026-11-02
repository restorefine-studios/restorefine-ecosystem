"use client";

import { useFormState } from "../contact-form-context";

export const STEP_LABELS = ["Service", "Type", "Budget", "Timeline", "Details"];

/** Segmented bar: one segment per step, filled red once reached */
export function ProgressIndicator() {
  const { state } = useFormState();
  const current = Math.min(state.currentStep, STEP_LABELS.length);

  return (
    <div>
      <p className={`text-base font-semibold text-zinc-950`}>
        Step {current} of {STEP_LABELS.length}
      </p>
      <div
        role="progressbar"
        aria-label="Enquiry progress"
        aria-valuemin={1}
        aria-valuemax={STEP_LABELS.length}
        aria-valuenow={current}
        aria-valuetext={`Step ${current} of ${STEP_LABELS.length}: ${STEP_LABELS[current - 1]}`}
        className="mt-4 grid grid-cols-5 gap-1.5"
      >
        {STEP_LABELS.map((label, i) => (
          <span key={label} className={`h-1.5 overflow-hidden rounded-full bg-zinc-300/60`}>
            <span className={`block h-full origin-left rounded-full bg-red-600 transition-transform duration-500 ease-out-expo ${i < current ? "scale-x-100" : "scale-x-0"}`} />
          </span>
        ))}
      </div>
    </div>
  );
}
