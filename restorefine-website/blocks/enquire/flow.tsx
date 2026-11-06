"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { pushGTMEvent } from "@/lib/gtm";
import { useFormState } from "./contact-form-context";
import {
  budgetOptions,
  getBudgetLabel,
  getMainServiceLabel,
  getServiceTypeLabel,
  getTimelineLabel,
  mainServiceOptions,
  serviceTypeOptions,
  timelineOptions,
} from "./service-options";

/*
 * The enquiry engine: the questions, what picking an answer does, the details
 * form submission and the GTM events. The layout lives in ./ui/centred.
 */

export const STEP_LABELS = ["Service", "Type", "Budget", "Timeline", "Details"] as const;
export const TOTAL_STEPS = STEP_LABELS.length;

export type Option = { id: string; title: string; desc?: string };
export type Question = { step: number; title: string; hint: string; options: Option[]; selected: string | null };

/** Studio photos for the first question's cards, keyed by main service id */
export const SERVICE_PHOTOS: Record<string, string> = {
  branding: "/services/branding.webp",
  web: "/services/seo.webp",
  media: "/services/content.webp",
  print: "/services/design.webp",
  merch: "/industries/lifestyle.webp",
  tools: "/services/paid-ads-growth.webp",
};

export function useEnquiryFlow() {
  const { state, dispatch, trackStepComplete } = useFormState();
  const step = state.currentStep;
  const [customOpen, setCustomOpen] = useState(state.timeline === "other");

  const goTo = (n: number) => dispatch({ type: "SET_STEP", payload: n });

  const questions: Question[] = [
    {
      step: 1,
      title: "What are you looking for?",
      hint: "Pick the area that fits best.",
      options: mainServiceOptions.map((o) => ({ id: o.id, title: o.title, desc: o.desc })),
      selected: state.mainService,
    },
    {
      step: 2,
      title: `What type of ${getMainServiceLabel(state.mainService).toLowerCase() || "service"}?`,
      hint: "Narrow it down.",
      options: state.mainService ? serviceTypeOptions[state.mainService] ?? [] : [],
      selected: state.serviceType,
    },
    { step: 3, title: "What's your budget?", hint: "A rough range is fine.", options: budgetOptions, selected: state.budget },
    { step: 4, title: "When do you want to start?", hint: "Your ideal timeline.", options: timelineOptions, selected: state.timeline },
  ];

  const question = questions[step - 1] ?? null;

  const select = (id: string) => {
    if (step === 1) {
      dispatch({ type: "SET_MAIN_SERVICE", payload: id });
      trackStepComplete({ step: 1, category: id });
      goTo(2);
    } else if (step === 2) {
      dispatch({ type: "SET_SERVICE_TYPE", payload: id });
      trackStepComplete({ step: 2 });
      goTo(3);
    } else if (step === 3) {
      dispatch({ type: "SET_BUDGET", payload: id });
      trackStepComplete({ step: 3 });
      goTo(4);
    } else if (step === 4) {
      dispatch({ type: "SET_TIMELINE", payload: id });
      if (id === "other") {
        setCustomOpen(true);
      } else {
        setCustomOpen(false);
        trackStepComplete({ step: 4 });
        goTo(5);
      }
    }
  };

  const submitCustomTimeline = (text: string) => {
    if (!text.trim()) return;
    dispatch({ type: "SET_CUSTOM_TIMELINE", payload: text.trim() });
    trackStepComplete({ step: 4 });
    goTo(5);
  };

  /** Each question with the answer given, for summaries, chips and chat history */
  const answers = [
    getMainServiceLabel(state.mainService),
    getServiceTypeLabel(state.mainService, state.serviceType),
    getBudgetLabel(state.budget),
    getTimelineLabel(state.timeline, state.customTimeline),
  ].map((value, i) => ({ step: i + 1, label: STEP_LABELS[i], question: questions[i].title, value }));

  return {
    state,
    step,
    question,
    select,
    back: () => goTo(Math.max(1, step - 1)),
    goTo,
    answers,
    customOpen: step === 4 && customOpen,
    submitCustomTimeline,
    done: step === 6,
  };
}

/** Moves focus to a step's heading when it changes after the first answer, for keyboard and screen reader users */
export function useStepFocus<T extends HTMLElement>(step: number) {
  const ref = useRef<T>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    ref.current?.focus({ preventScroll: true });
  }, [step]);
  return ref;
}

/* text-base keeps inputs at 16px so iOS Safari does not zoom on focus */
export const inputClass =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-3.5 text-base text-zinc-950 placeholder:text-zinc-400 transition-colors hover:border-zinc-400 focus:border-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600/40 aria-[invalid=true]:border-red-500";

/** "Other" timeline: free text, then on to details */
export function CustomTimeline({ onSubmit }: { onSubmit: (text: string) => void }) {
  const { state } = useFormState();
  const [text, setText] = useState(state.customTimeline ?? "");
  return (
    <form
      className="flex w-full flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(text);
      }}
    >
      <label htmlFor="custom-timeline" className="sr-only">
        Describe your timeline
      </label>
      <input id="custom-timeline" autoFocus value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g. Before our opening in March" className={inputClass} />
      <button
        type="submit"
        disabled={!text.trim()}
        className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-red-600 px-6 text-[0.9375rem] font-medium text-white transition-colors hover:bg-red-500 disabled:pointer-events-none disabled:opacity-50"
      >
        Next
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
      </button>
    </form>
  );
}

const FIELDS = [
  { name: "name", label: "Name", type: "text", placeholder: "Your full name", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", placeholder: "you@business.co.uk", autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", placeholder: "+44 7700 000000", autoComplete: "tel" },
  { name: "company", label: "Business name", type: "text", placeholder: "Your business", autoComplete: "organization" },
] as const;

/** The contact details step: same fields, validation, endpoint and events as before */
export function DetailsForm({ className = "" }: { className?: string }) {
  const { state, dispatch, trackStepComplete } = useFormState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const labelClass = "text-sm font-medium text-zinc-800";
  const errorClass = "text-sm font-medium text-red-700";

  const validate = (fd: FormData) => {
    const next: Record<string, string> = {};
    ["name", "email", "phone", "company", "message"].forEach((f) => {
      if (!fd.get(f)) next[f] = "This field is required";
    });
    const email = fd.get("email") as string;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email address";
    const message = fd.get("message") as string;
    if (message && message.length < 6) next.message = "Message must be at least 6 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const fd = new FormData(e.currentTarget);
    if (!validate(fd)) {
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mainService: state.mainService,
          serviceType: state.serviceType,
          budget: state.budget,
          timeline: state.timeline === "other" ? state.customTimeline : state.timeline,
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          company: fd.get("company"),
          message: fd.get("message"),
        }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || `Request failed (${response.status})`);
      }
      dispatch({ type: "SET_SUBMITTED", payload: true });
      dispatch({
        type: "SET_SUBMISSION_DATA",
        payload: {
          name: fd.get("name") as string,
          email: fd.get("email") as string,
          phone: fd.get("phone") as string,
          company: fd.get("company") as string,
          message: fd.get("message") as string,
        },
      });
      dispatch({ type: "SET_STEP", payload: 6 });
      trackStepComplete({ step: 5 });
      pushGTMEvent("enquiry_submitted", { category: state.mainService });
      toast({ title: "Success", description: "Your enquiry has been sent!" });
    } catch (err) {
      setErrors((prev) => ({ ...prev, submit: err instanceof Error ? err.message : "Something went wrong. Please try again." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={`grid gap-5 text-left sm:grid-cols-2 ${className}`}>
      {FIELDS.map((f) => (
        <div key={f.name} className="flex flex-col gap-2">
          <label htmlFor={`enquiry-${f.name}`} className={labelClass}>
            {f.label}
            <span className="text-red-500"> *</span>
          </label>
          <input
            id={`enquiry-${f.name}`}
            name={f.name}
            type={f.type}
            placeholder={f.placeholder}
            autoComplete={f.autoComplete}
            aria-invalid={Boolean(errors[f.name])}
            aria-describedby={errors[f.name] ? `enquiry-${f.name}-error` : undefined}
            className={inputClass}
          />
          {errors[f.name] && (
            <p id={`enquiry-${f.name}-error`} className={errorClass}>
              {errors[f.name]}
            </p>
          )}
        </div>
      ))}
      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor="enquiry-message" className={labelClass}>
          Tell us about your project
          <span className="text-red-500"> *</span>
        </label>
        <textarea
          id="enquiry-message"
          name="message"
          rows={4}
          placeholder="What are you looking to achieve?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "enquiry-message-error" : undefined}
          className={`${inputClass} resize-none`}
        />
        {errors.message && (
          <p id="enquiry-message-error" className={errorClass}>
            {errors.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-red-600 px-7 text-[0.9375rem] font-medium text-white transition-colors hover:bg-red-500 active:translate-y-px disabled:cursor-wait disabled:opacity-70"
        >
          {isSubmitting ? "Sending…" : "Send enquiry"}
          {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={2} /> : <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />}
        </button>
        <p role="status" aria-live="polite" className={errorClass}>
          {errors.submit}
        </p>
      </div>
    </form>
  );
}

/** After sending: the thank-you */
export function DoneMessage({ centred = false }: { centred?: boolean }) {
  const { state } = useFormState();
  const data = state.submissionData;
  if (!data) return null;
  const firstName = data.name.trim().split(" ")[0];
  return (
    <div className={centred ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <h2 className={`font-[family-name:var(--v2-display)] text-[clamp(2.25rem,4.5vw,4rem)] font-medium leading-[1.04] tracking-[-0.03em] text-zinc-950`}>
        We&apos;ll be in touch soon, <span className="v2-script text-[1.25em] text-red-600">{firstName}.</span>
      </h2>
      <p className="v2-lead mt-6 text-zinc-600">
        Your enquiry is with our team. We&apos;ll reply to <span className="font-medium text-zinc-950">{data.email}</span> within 24 hours.
      </p>
    </div>
  );
}
