"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, Check } from "lucide-react";
import { OptionCards } from "./option-card";
import { CustomTimeline, DetailsForm, DoneMessage, SERVICE_PHOTOS, TOTAL_STEPS, useEnquiryFlow, useStepFocus } from "../flow";

const ease = [0.16, 1, 0.3, 1] as const;
const headingClass = "font-[family-name:var(--v2-display)] text-[clamp(2.25rem,5vw,4.25rem)] font-medium leading-[1.04] tracking-[-0.035em] text-zinc-950 outline-none [text-wrap:balance]";

/** Setup-assistant style: one centred question at a time, photo cards for the first */
export function CentredUI() {
  const f = useEnquiryFlow();
  const reduce = useReducedMotion();
  const heading = useStepFocus<HTMLHeadingElement>(f.step);
  const progress = Math.min(f.step, TOTAL_STEPS);

  return (
    <section className="v2-wrap pb-32 pt-28 sm:pt-32 lg:pt-36">
      <div className="mx-auto max-w-5xl text-center">
        {/* The page heading: shown as the big heading on the first question, kept for search and screen readers after that */}
        {f.step !== 1 && <h1 className="sr-only">Let&apos;s build something unforgettable.</h1>}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={f.step}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease }}
            className="mt-2"
          >
            {f.question && (
              <>
                {f.step === 1 ? (
                  <>
                    <h1 ref={heading} tabIndex={-1} className={`mx-auto max-w-[18ch] ${headingClass}`}>
                      Let&apos;s build something <span className="v2-script ml-[0.12em] inline-block text-[1.2em] text-red-600">unforgettable.</span>
                    </h1>
                    <p className="v2-lead mt-5 text-zinc-500">
                      {f.question.title} {f.question.hint}
                    </p>
                  </>
                ) : (
                  <>
                    <h2 ref={heading} tabIndex={-1} className={`mx-auto max-w-[18ch] ${headingClass}`}>
                      {f.question.title}
                    </h2>
                    <p className="v2-lead mt-4 text-zinc-500">{f.question.hint}</p>
                  </>
                )}

                {f.step === 1 ? (
                  <div className="mt-10 grid grid-cols-2 gap-2.5 text-left sm:mt-12 sm:gap-3 lg:grid-cols-3">
                    {f.question.options.map((o) => {
                      const on = f.question!.selected === o.id;
                      return (
                        <button
                          key={o.id}
                          type="button"
                          onClick={() => f.select(o.id)}
                          aria-pressed={on}
                          className={`group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[1.25rem] bg-zinc-900 p-4 text-white sm:aspect-[4/3] sm:rounded-[1.5rem] sm:p-6 transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${on ? "ring-4 ring-red-600" : ""}`}
                        >
                          <Image src={SERVICE_PHOTOS[o.id]} alt="" fill sizes="(min-width: 1024px) 30vw, 48vw" className="-z-0 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
                          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/25 to-transparent" />
                          <span className="relative">
                            <span className="block font-[family-name:var(--v2-display)] text-xl font-semibold leading-tight tracking-[-0.02em] sm:text-[clamp(1.875rem,1.6vw+1rem,2.25rem)] sm:leading-[1.05]">{o.title}</span>
                            <span className="mt-1 block text-xs leading-snug text-white/70 sm:text-sm">{o.desc}</span>
                          </span>
                          {on && (
                            <span aria-hidden="true" className="absolute right-3 top-3 flex h-7 w-7 items-center sm:right-4 sm:top-4 sm:h-8 sm:w-8 justify-center rounded-full bg-red-600">
                              <Check className="h-4 w-4" strokeWidth={3} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <OptionCards options={f.question.options} selected={f.question.selected} onSelect={f.select} meter={f.step === 3} />
                )}

                {f.customOpen && (
                  <div className="mx-auto mt-6 max-w-xl">
                    <CustomTimeline onSubmit={f.submitCustomTimeline} />
                  </div>
                )}
              </>
            )}

            {f.step === 5 && (
              <>
                <h2 ref={heading} tabIndex={-1} className={`mx-auto max-w-[18ch] ${headingClass}`}>
                  Where should we reply?
                </h2>
                <p className="v2-lead mt-4 text-zinc-500">Last step. We&apos;ll be in touch within 24 hours.</p>
                <DetailsForm className="mx-auto mt-12 max-w-3xl rounded-[1.5rem] bg-zinc-100 p-6 sm:p-10" />
              </>
            )}

            {f.done && <DoneMessage centred />}

            {f.step > 1 && !f.done && (
              <button type="button" onClick={f.back} className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-950">
                <ArrowLeft className="h-4 w-4" strokeWidth={2} />
                Back
              </button>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Progress and answers so far, below the question */}
        {!f.done && (
          <div className="mx-auto mt-10 max-w-sm">
            <div role="progressbar" aria-label="Enquiry progress" aria-valuemin={1} aria-valuemax={TOTAL_STEPS} aria-valuenow={progress} className="h-1 overflow-hidden rounded-full bg-zinc-200">
              <div className="h-full rounded-full bg-red-600 transition-[width] duration-700 ease-out-expo" style={{ width: `${(progress / TOTAL_STEPS) * 100}%` }} />
            </div>
            <p className="v2-small mt-3 text-zinc-400">
              Step {progress} of {TOTAL_STEPS}
            </p>
          </div>
        )}

        {/* Answers so far, each one a way back to change it */}
        {!f.done && f.answers.some((a) => a.value && a.step < f.step) && (
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {f.answers
              .filter((a) => a.value && a.step < f.step)
              .map((a) => (
                <li key={a.step}>
                  <button
                    type="button"
                    onClick={() => f.goTo(a.step)}
                    aria-label={`Change ${a.label.toLowerCase()}: ${a.value}`}
                    className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-200"
                  >
                    <span className="text-zinc-400">{a.label}</span>
                    <span className="font-medium text-zinc-950">{a.value}</span>
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </section>
  );
}
