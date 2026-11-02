"use client";

import { useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { useFormState } from "../../contact-form-context";
import { useToast } from "@/hooks/use-toast";
import { pushGTMEvent } from "@/lib/gtm";
import { StepShell } from "../step-shell";

export const inputClass =
  "w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3.5 text-zinc-950 placeholder:text-zinc-400 transition-colors focus:border-zinc-950 focus:outline-none focus:ring-2 focus:ring-red-600/30 aria-[invalid=true]:border-red-600";

const FIELDS = [
  { name: "name", label: "Name", type: "text", placeholder: "Your full name", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", placeholder: "you@business.co.uk", autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", placeholder: "+44 7700 000000", autoComplete: "tel" },
  { name: "company", label: "Business name", type: "text", placeholder: "Your business", autoComplete: "organization" },
] as const;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm font-medium text-red-700">
      {message}
    </p>
  );
}

export function StepFive() {
  const { state, dispatch, trackStepComplete } = useFormState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
    ["name", "email", "phone", "company", "message"].forEach((field) => {
      if (!formData.get(field)) newErrors[field] = "This field is required";
    });
    const email = formData.get("email") as string;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Please enter a valid email address";
    const message = formData.get("message") as string;
    if (message && message.length < 6) newErrors.message = "Message must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    if (!validateForm(formData)) {
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
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          company: formData.get("company"),
          message: formData.get("message"),
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
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          phone: formData.get("phone") as string,
          company: formData.get("company") as string,
          message: formData.get("message") as string,
        },
      });
      dispatch({ type: "SET_STEP", payload: 6 });
      trackStepComplete({ step: 5 });
      pushGTMEvent("enquiry_submitted", { category: state.mainService });
      toast({ title: "Success", description: "Your enquiry has been sent!" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrors((prev) => ({ ...prev, submit: msg }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StepShell title="Your contact details" hint="Last step. We'll reach out within 24 hours." onBack={() => dispatch({ type: "SET_STEP", payload: 4 })}>
      <form onSubmit={handleSubmit} noValidate className={`grid gap-5 rounded-[2rem] p-6 sm:grid-cols-2 sm:p-8 bg-white`}>
        {FIELDS.map((field) => (
          <div key={field.name} className="flex flex-col gap-2">
            <label htmlFor={`enquiry-${field.name}`} className="text-sm font-semibold text-zinc-800">
              {field.label}
              <span className="text-red-600"> *</span>
            </label>
            <input
              id={`enquiry-${field.name}`}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              aria-invalid={Boolean(errors[field.name])}
              aria-describedby={errors[field.name] ? `enquiry-${field.name}-error` : undefined}
              className={inputClass}
            />
            <FieldError id={`enquiry-${field.name}-error`} message={errors[field.name]} />
          </div>
        ))}

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="enquiry-message" className="text-sm font-semibold text-zinc-800">
            Tell us about your project
            <span className="text-red-600"> *</span>
          </label>
          <textarea
            id="enquiry-message"
            name="message"
            rows={5}
            placeholder="What are you looking to achieve?"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "enquiry-message-error" : undefined}
            className={`${inputClass} resize-none`}
          />
          <FieldError id="enquiry-message-error" message={errors.message} />
        </div>

        <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full bg-red-600 px-7 py-4 text-sm font-semibold text-white transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-red-500 active:translate-y-px disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? "Sending…" : "Send Enquiry"}
            {isSubmitting ? (
              <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={2} />
            ) : (
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
            )}
          </button>
          <p role="status" aria-live="polite" className="text-sm font-medium text-red-700">
            {errors.submit}
          </p>
        </div>
      </form>
    </StepShell>
  );
}
