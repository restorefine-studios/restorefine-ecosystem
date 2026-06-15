"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useFormState } from "../../contact-form-context";
import { Input } from "@/components/ui/input";

const timelineOptions = [
  { id: "asap", title: "ASAP" },
  { id: "1-2-weeks", title: "1–2 Weeks" },
  { id: "1-month", title: "1 Month" },
  { id: "1-3-months", title: "1–3 Months" },
  { id: "flexible", title: "Flexible" },
  { id: "other", title: "Other" },
];

export function StepFour() {
  const { state, dispatch } = useFormState();
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customTimeline, setCustomTimeline] = useState("");

  const handleSelect = (value: string) => {
    if (value === "other") {
      setShowCustomInput(true);
      dispatch({ type: "SET_TIMELINE", payload: value });
    } else {
      setShowCustomInput(false);
      dispatch({ type: "SET_TIMELINE", payload: value });
      dispatch({ type: "SET_STEP", payload: 5 });
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <p className="text-[10px] tracking-[0.3em] uppercase text-red-600 font-medium mb-3">
        Step 4 of 5
      </p>
      <h2 className="font-black text-zinc-950 text-2xl md:text-3xl tracking-tight mb-2">
        What's your ideal timeline?
      </h2>
      <p className="text-zinc-400 text-sm mb-8">
        When are you looking to get started?
      </p>

      <div className="flex flex-wrap gap-3 mb-6">
        {timelineOptions.map((option) => {
          const isSelected = state.timeline === option.id;
          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`px-5 py-3 rounded-full border text-sm font-medium transition-all duration-200
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

      {showCustomInput && (
        <div className="flex gap-3 mb-6">
          <Input
            value={customTimeline}
            onChange={(e) => setCustomTimeline(e.target.value)}
            placeholder="Describe your timeline…"
            className="bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-red-500 rounded-xl"
          />
          <button
            onClick={() => {
              if (customTimeline.trim()) {
                dispatch({ type: "SET_CUSTOM_TIMELINE", payload: customTimeline });
                dispatch({ type: "SET_STEP", payload: 5 });
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors shrink-0"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      <button
        onClick={() => dispatch({ type: "SET_STEP", payload: 3 })}
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Go Back
      </button>
    </div>
  );
}
