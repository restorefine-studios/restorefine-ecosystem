"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useFormState } from "../../contact-form-context";
import { timelineOptions } from "../../service-options";
import { OptionGrid, OptionTile } from "../option-tile";
import { StepShell } from "../step-shell";
import { inputClass } from "./step-five";

export function StepFour() {
  const { state, dispatch, trackStepComplete } = useFormState();
  const [showCustomInput, setShowCustomInput] = useState(state.timeline === "other");
  const [customTimeline, setCustomTimeline] = useState(state.customTimeline ?? "");

  const next = () => {
    trackStepComplete({ step: 4 });
    dispatch({ type: "SET_STEP", payload: 5 });
  };

  const handleSelect = (value: string) => {
    dispatch({ type: "SET_TIMELINE", payload: value });
    if (value === "other") {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      next();
    }
  };

  return (
    <StepShell title="What's your ideal timeline?" hint="When are you looking to get started?" onBack={() => dispatch({ type: "SET_STEP", payload: 3 })}>
      <OptionGrid>
        {timelineOptions.map((option) => (
          <OptionTile key={option.id} title={option.title} selected={state.timeline === option.id} onSelect={() => handleSelect(option.id)} />
        ))}
      </OptionGrid>

      {showCustomInput && (
        <form
          className="mt-5 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            if (!customTimeline.trim()) return;
            dispatch({ type: "SET_CUSTOM_TIMELINE", payload: customTimeline.trim() });
            next();
          }}
        >
          <label htmlFor="custom-timeline" className="sr-only">
            Describe your timeline
          </label>
          <input
            id="custom-timeline"
            autoFocus
            value={customTimeline}
            onChange={(e) => setCustomTimeline(e.target.value)}
            placeholder="e.g. Before our opening in March"
            className={inputClass}
          />
          <button
            type="submit"
            disabled={!customTimeline.trim()}
            className={`group inline-flex shrink-0 items-center justify-center gap-3 rounded-full px-6 py-4 text-sm font-semibold transition-[transform,background-color] duration-300 hover:-translate-y-0.5 bg-red-600 text-white hover:bg-red-500 disabled:pointer-events-none disabled:opacity-50`}
          >
            Next
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
          </button>
        </form>
      )}
    </StepShell>
  );
}
