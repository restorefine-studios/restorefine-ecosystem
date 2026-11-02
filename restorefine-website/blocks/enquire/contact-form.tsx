"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { GoogleG, GoogleStars, googleReviewsLinkProps } from "@/components/google-reviews";
import { WhatsAppLink } from "@/blocks/home/cta-links";
import { WHATSAPP_HREF } from "@/lib/homepageData";
import { useFormState } from "./contact-form-context";
import { BriefSummary } from "./form/brief-summary";
import { ProgressIndicator } from "./form/progress-indicator";
import { StepOne } from "./form/steps/step-one";
import { StepTwo } from "./form/steps/step-two";
import { StepThree } from "./form/steps/step-three";
import { StepFour } from "./form/steps/step-four";
import { StepFive } from "./form/steps/step-five";
import { StepSix } from "./form/steps/step-six";

const ease = [0.16, 1, 0.3, 1] as const;
const STEPS = [StepOne, StepTwo, StepThree, StepFour, StepFive, StepSix];
const holiday = { fontFamily: "var(--font-holiday), serif" };

/** Rating and WhatsApp alternative, for people who'd rather talk than fill in a form */
function Reassurance({ tone }: { tone: "dark" | "light" }) {
  const onColour = tone === "dark";
  return (
    <div className="flex flex-wrap items-center justify-between gap-5">
      <a {...googleReviewsLinkProps} aria-label="Rated 5.0 on Google. Read our reviews" className="flex items-center gap-3 no-underline transition-transform duration-300 hover:-translate-y-0.5">
        <span className={`text-3xl font-black leading-none tracking-[-0.04em] ${onColour ? "text-white" : "text-zinc-950"}`}>5.0</span>
        <GoogleG className="h-5 w-5" />
        <GoogleStars className="h-4 w-4" />
      </a>
      <WhatsAppLink label="Chat on WhatsApp" href={WHATSAPP_HREF} tone={onColour ? "light" : "dark"} />
    </div>
  );
}

const INTRO = "Five quick questions about your project. It takes about a minute, and our team replies within 24 hours.";

function Heading({ className, accentClass }: { className: string; accentClass: string }) {
  return (
    <h1 className={`font-black uppercase leading-[0.95] tracking-[-0.045em] ${className}`}>
      Let&apos;s Build Something{" "}
      <span
        className={`block pt-3 text-[1.12em] font-normal normal-case leading-[0.9] tracking-normal ${accentClass}`}
        style={holiday}
      >
        Unforgettable.
      </span>
    </h1>
  );
}

/** The current step, cross-fading between questions */
function CurrentStep() {
  const { state } = useFormState();
  const reduce = useReducedMotion();
  const Step = STEPS[state.currentStep - 1] ?? StepOne;
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={state.currentStep}
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, y: -12 }}
        transition={{ duration: 0.4, ease }}
      >
        <Step />
      </motion.div>
    </AnimatePresence>
  );
}

/** Marks the card once the visitor has answered, so later steps can take focus */
function useStarted() {
  const { state } = useFormState();
  return String(state.currentStep !== 1 || state.mainService !== null);
}

/** Dark intro panel with the live brief, question on a light card */
export function ContactForm() {
  const { state } = useFormState();
  const started = useStarted();
  const done = state.currentStep === 6;

  return (
    <section className="grid gap-3 pb-16 pt-28 lg:grid-cols-12 lg:pt-32">
      <aside className="flex min-w-0 flex-col rounded-[2.5rem] bg-zinc-950 p-8 text-white sm:p-10 lg:col-span-5 lg:min-h-[calc(100dvh-10rem)] lg:p-12">
        <Heading className="text-[clamp(2rem,3.4vw,3.4rem)]" accentClass="text-red-600" />
        <p className="mt-6 max-w-[42ch] leading-relaxed text-zinc-400">{INTRO}</p>
        <div className="mt-10 hidden lg:block">
          <BriefSummary />
        </div>
        <div className="mt-auto hidden pt-10 lg:block">
          <Reassurance tone="dark" />
        </div>
      </aside>

      <div id="enquiry-card" data-started={started} className="flex min-w-0 flex-col rounded-[2.5rem] bg-[#f2f4f6] p-6 sm:p-10 lg:col-span-7 lg:p-14">
        {!done && <ProgressIndicator />}
        <div className={done ? "" : "mt-12 lg:mt-16"}>
          <CurrentStep />
        </div>
      </div>

      <div className="rounded-[2rem] bg-[#f2f4f6] p-6 sm:p-8 lg:hidden">
        <Reassurance tone="light" />
      </div>
    </section>
  );
}
