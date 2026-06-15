"use client";

import { ArrowLeft } from "lucide-react";
import { useFormState } from "../../contact-form-context";

const budgetOptions = [
  { id: "£0 - £499", title: "£0 – £499" },
  { id: "£500 - £999", title: "£500 – £999" },
  { id: "£1000 - £2499", title: "£1,000 – £2,499" },
  { id: "£2500 - £4999", title: "£2,500 – £4,999" },
  { id: "£5000+", title: "£5,000+" },
];

export function StepThree() {
  const { state, dispatch } = useFormState();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <p className="text-[10px] tracking-[0.3em] uppercase text-red-600 font-medium mb-3">
        Step 3 of 5
      </p>
      <h2 className="font-black text-zinc-950 text-2xl md:text-3xl tracking-tight mb-2">
        What's your budget range?
      </h2>
      <p className="text-zinc-400 text-sm mb-8">
        Select the range that best fits your project.
      </p>

      <div className="flex flex-wrap gap-3 mb-10">
        {budgetOptions.map((option) => {
          const isSelected = state.budget === option.id;
          return (
            <button
              key={option.id}
              onClick={() => {
                dispatch({ type: "SET_BUDGET", payload: option.id });
                dispatch({ type: "SET_STEP", payload: 4 });
              }}
              className={`px-6 py-3 rounded-full border text-sm font-medium transition-all duration-200
                ${isSelected
                  ? "border-red-600 bg-red-50 text-red-700"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-red-400 hover:bg-red-50 hover:text-zinc-950 shadow-sm"
                }`}
            >
              {option.title}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => dispatch({ type: "SET_STEP", payload: 2 })}
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Go Back
      </button>
    </div>
  );
}
