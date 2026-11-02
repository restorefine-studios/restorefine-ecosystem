"use client";

import { useFormState } from "../../contact-form-context";
import { mainServiceOptions } from "../../service-options";
import { OptionGrid, OptionTile } from "../option-tile";
import { StepShell } from "../step-shell";

export function StepOne() {
  const { state, dispatch, trackStepComplete } = useFormState();

  return (
    <StepShell title="What are you looking for?" hint="Pick the area that fits best. You can tell us about anything else at the end.">
      <OptionGrid>
        {mainServiceOptions.map((option) => (
          <OptionTile
            key={option.id}
            title={option.title}
            description={option.desc}
            selected={state.mainService === option.id}
            onSelect={() => {
              dispatch({ type: "SET_MAIN_SERVICE", payload: option.id });
              trackStepComplete({ step: 1, category: option.id });
              dispatch({ type: "SET_STEP", payload: 2 });
            }}
          />
        ))}
      </OptionGrid>
    </StepShell>
  );
}
