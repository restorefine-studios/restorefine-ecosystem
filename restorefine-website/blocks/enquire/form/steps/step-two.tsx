"use client";

import { useFormState } from "../../contact-form-context";
import { getMainServiceLabel, serviceTypeOptions } from "../../service-options";
import { OptionGrid, OptionTile } from "../option-tile";
import { StepShell } from "../step-shell";

export function StepTwo() {
  const { state, dispatch, trackStepComplete } = useFormState();
  const options = state.mainService ? serviceTypeOptions[state.mainService] ?? [] : [];

  return (
    <StepShell
      title="What type of service do you need?"
      hint={`Narrow down your ${getMainServiceLabel(state.mainService).toLowerCase()} project.`}
      onBack={() => dispatch({ type: "SET_STEP", payload: 1 })}
    >
      <OptionGrid>
        {options.map((option) => (
          <OptionTile
            key={option.id}
            title={option.title}
            selected={state.serviceType === option.id}
            onSelect={() => {
              dispatch({ type: "SET_SERVICE_TYPE", payload: option.id });
              trackStepComplete({ step: 2 });
              dispatch({ type: "SET_STEP", payload: 3 });
            }}
          />
        ))}
      </OptionGrid>
    </StepShell>
  );
}
