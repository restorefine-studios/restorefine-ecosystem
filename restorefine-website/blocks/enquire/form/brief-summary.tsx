"use client";

import { Check } from "lucide-react";
import { useFormState } from "../contact-form-context";
import { getBudgetLabel, getMainServiceLabel, getServiceTypeLabel, getTimelineLabel } from "../service-options";
import { STEP_LABELS } from "./progress-indicator";

/** Live summary of the answers so far. Answered rows jump back to that step to change it. */
export function BriefSummary() {
  const { state, dispatch } = useFormState();
  const done = state.currentStep === 6;

  const values = [
    getMainServiceLabel(state.mainService),
    getServiceTypeLabel(state.mainService, state.serviceType),
    getBudgetLabel(state.budget),
    getTimelineLabel(state.timeline, state.customTimeline),
    state.submissionData?.company ?? "",
  ];

  return (
    <ol aria-label="Your answers" className="divide-y divide-zinc-800 border-y border-zinc-800">
      {STEP_LABELS.map((label, i) => {
        const step = i + 1;
        const value = values[i];
        const isCurrent = state.currentStep === step;
        const canEdit = !done && step < state.currentStep;
        const row = (
          <>
            <span className={`shrink-0 ${isCurrent ? "font-semibold text-white" : "text-zinc-500"}`}>{label}</span>
            <span className="min-w-0 flex-1 truncate text-right font-semibold text-white">{value}</span>
            {value && step < state.currentStep && <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-red-500" strokeWidth={2.5} />}
          </>
        );
        return (
          <li key={label}>
            {canEdit ? (
              <button
                type="button"
                onClick={() => dispatch({ type: "SET_STEP", payload: step })}
                aria-label={`Change ${label.toLowerCase()}: ${value}`}
                className="flex w-full items-center gap-4 py-4 text-left transition-colors hover:bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600"
              >
                {row}
              </button>
            ) : (
              <div aria-current={isCurrent ? "step" : undefined} className="flex items-center gap-4 py-4">
                {row}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
