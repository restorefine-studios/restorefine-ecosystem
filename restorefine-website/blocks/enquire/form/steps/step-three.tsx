"use client";

import { useFormState } from "../../contact-form-context";
import { budgetOptions } from "../../service-options";
import { OptionGrid, OptionTile } from "../option-tile";
import { StepShell } from "../step-shell";

export function StepThree() {
  const { state, dispatch, trackStepComplete } = useFormState();

  return (
    <StepShell title="What's your budget range?" hint="A rough range is fine. It helps us suggest the right scope." onBack={() => dispatch({ type: "SET_STEP", payload: 2 })}>
      <OptionGrid>
        {budgetOptions.map((option) => (
          <OptionTile
            key={option.id}
            title={option.title}
            selected={state.budget === option.id}
            onSelect={() => {
              dispatch({ type: "SET_BUDGET", payload: option.id });
              trackStepComplete({ step: 3 });
              dispatch({ type: "SET_STEP", payload: 4 });
            }}
          />
        ))}
      </OptionGrid>
    </StepShell>
  );
}
