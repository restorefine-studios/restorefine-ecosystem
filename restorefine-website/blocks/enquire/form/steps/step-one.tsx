"use client";

import { useFormState } from "../../contact-form-context";

const serviceOptions = [
  { id: "branding", title: "Branding", desc: "Logos, identity & strategy" },
  { id: "web", title: "Web", desc: "Design, development & SEO" },
  { id: "media", title: "Media", desc: "Photo, video & social" },
  { id: "print", title: "Print", desc: "Menus, flyers & packaging" },
  { id: "merch", title: "Merch", desc: "Apparel & promotional" },
  { id: "pos", title: "POS", desc: "Software & setup" },
];

export function StepOne() {
  const { state, dispatch } = useFormState();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <p className="text-[10px] tracking-[0.3em] uppercase text-red-600 font-medium mb-3">
        Step 1 of 5
      </p>
      <h2 className="font-black text-zinc-950 text-2xl md:text-3xl tracking-tight mb-8">
        What are you looking for?
      </h2>

      <div className="flex flex-wrap gap-3">
        {serviceOptions.map((option) => {
          const isSelected = state.mainService === option.id;
          return (
            <button
              key={option.id}
              onClick={() => {
                dispatch({ type: "SET_MAIN_SERVICE", payload: option.id });
                dispatch({ type: "SET_STEP", payload: 2 });
              }}
              className={`flex flex-col items-start px-6 py-4 rounded-2xl border transition-all duration-200 text-left min-w-[140px]
                ${isSelected
                  ? "border-red-600 bg-red-50 text-zinc-950"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-red-400 hover:bg-red-50 hover:text-zinc-950 shadow-sm"
                }`}
            >
              <span className="font-bold text-base">{option.title}</span>
              <span className={`text-xs mt-0.5 ${isSelected ? "text-red-500" : "text-zinc-400"}`}>
                {option.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
