"use client";

import { Check } from "lucide-react";
import { useFormState } from "../contact-form-context";

const STEPS = [
  { step: 1, label: "Service" },
  { step: 2, label: "Type" },
  { step: 3, label: "Budget" },
  { step: 4, label: "Timeline" },
  { step: 5, label: "Details" },
];

export function ProgressIndicator() {
  const { state, dispatch } = useFormState();
  const currentStep = state.currentStep;

  return (
    <div className="flex items-start gap-0 mb-12">
      {STEPS.map((s, index) => {
        const isCompleted = currentStep > s.step;
        const isActive = currentStep === s.step;
        const isClickable = s.step < currentStep;

        return (
          <div key={s.step} className="flex items-start flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => isClickable && dispatch({ type: "SET_STEP", payload: s.step })}
                disabled={!isClickable}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all shrink-0
                  ${isCompleted
                    ? "bg-red-600 text-white cursor-pointer"
                    : isActive
                    ? "bg-zinc-950 text-white ring-2 ring-red-600 ring-offset-2 ring-offset-white"
                    : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                  }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : s.step}
              </button>
              <span
                className={`text-[10px] tracking-widest uppercase font-medium hidden md:block
                  ${isActive ? "text-zinc-900" : isCompleted ? "text-red-600" : "text-zinc-400"}`}
              >
                {s.label}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <div className="flex-1 h-[2px] mt-4 mx-1">
                <div
                  className={`h-full transition-all duration-500 ${
                    currentStep > s.step ? "bg-red-600" : "bg-zinc-200"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
