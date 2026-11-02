"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { pushGTMEvent } from "@/lib/gtm";
import type { PageContent } from "@/lib/homepageData";

type Status = "idle" | "sending" | "success" | "error";

/* text-base keeps inputs at 16px so iOS Safari does not zoom on focus */
const inputClass =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-3.5 text-base text-zinc-950 placeholder:text-zinc-500 transition-colors hover:border-zinc-400 focus:border-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600/40";

function Field({ name, label, type = "text", required = false, autoComplete }: { name: string; label: string; type?: string; required?: boolean; autoComplete?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`cta-${name}`} className="text-sm font-medium text-zinc-800">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <input id={`cta-${name}`} name={name} type={type} required={required} autoComplete={autoComplete} className={inputClass} />
    </div>
  );
}

/** Same fields, ids, endpoint and GTM event as the site's existing closing form */
export function EnquiryForm({ finalCta }: { finalCta: PageContent["finalCta"] }) {
  const { form } = finalCta;
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const data = Object.fromEntries(new FormData(formEl).entries());
    setStatus("sending");
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success === true) {
        setStatus("success");
        formEl.reset();
        pushGTMEvent("contact_form_submitted");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-[1.75rem] bg-white p-6 text-zinc-950 sm:grid-cols-2 sm:p-9">
      <Field name="name" label={form.name} required autoComplete="name" />
      <Field name="email" label={form.email} type="email" required autoComplete="email" />
      <Field name="phone" label={form.phone} type="tel" autoComplete="tel" />
      <Field name="company" label={form.company} autoComplete="organization" />
      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor="cta-message" className="text-sm font-medium text-zinc-800">
          {form.message}
          <span className="text-red-600"> *</span>
        </label>
        <textarea id="cta-message" name="message" rows={5} required className={`${inputClass} resize-none`} />
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={sending}
          aria-busy={sending}
          className="group inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-red-600 px-7 text-[0.9375rem] font-medium text-white transition-colors hover:bg-red-500 active:translate-y-px disabled:cursor-wait disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          {finalCta.submitLabel}
          {sending ? <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" strokeWidth={2} /> : <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />}
        </button>
        <p role="status" aria-live="polite" className={`text-sm font-medium ${status === "error" ? "text-red-700" : "text-zinc-700"}`}>
          {status === "success" && form.success}
          {status === "error" && form.error}
        </p>
      </div>
    </form>
  );
}
