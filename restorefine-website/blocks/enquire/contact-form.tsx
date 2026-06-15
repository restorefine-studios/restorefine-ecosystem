"use client";

import { useFormState } from "./contact-form-context";
import { ProgressIndicator } from "./form/progress-indicator";
import { StepOne } from "./form/steps/step-one";
import { StepTwo } from "./form/steps/step-two";
import { StepThree } from "./form/steps/step-three";
import { StepFour } from "./form/steps/step-four";
import { StepFive } from "./form/steps/step-five";
import { StepSix } from "./form/steps/step-six";

export function ContactForm() {
  const { state } = useFormState();

  return (
    <div className="section-bleed min-h-screen bg-red-600 flex items-center justify-center px-4 md:px-8 pt-28 pb-10 md:pt-32 md:pb-16">
      <div className="w-full max-w-[90rem] bg-white rounded-3xl shadow-2xl px-6 md:px-16 lg:px-24 py-12 md:py-16">
        {state.currentStep < 6 && (
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.3em] uppercase text-red-600 font-medium mb-3">
              Enquire Now
            </p>
            <h1
              className="font-black text-zinc-950 tracking-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              <span className="block relative z-0 leading-none">
                Let&apos;s Build Something
              </span>
              <span
                className="block relative z-10 font-light normal-case leading-none text-red-600"
                style={{ fontFamily: "var(--font-holiday), serif", fontSize: "clamp(2.8rem, 6vw, 5rem)", marginTop: "-0.6rem" }}
              >
                Unforgettable.
              </span>
            </h1>
          </div>
        )}

        {state.currentStep < 6 && <ProgressIndicator />}

        <div className="max-w-5xl">
          {state.currentStep === 1 && <StepOne />}
          {state.currentStep === 2 && <StepTwo />}
          {state.currentStep === 3 && <StepThree />}
          {state.currentStep === 4 && <StepFour />}
          {state.currentStep === 5 && <StepFive />}
          {state.currentStep === 6 && <StepSix />}
        </div>
      </div>
    </div>
  );
}
