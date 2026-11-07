"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { pushGTMEvent } from "@/lib/gtm";
import { useSpamGuard } from "@/lib/spam-guard";
import { homeContent, type PageContent } from "@/lib/homepageData";
import { AccentText } from "./accent-text";
import { EnquireLink, WhatsAppLink } from "./cta-links";
import { type } from "./type-scale";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3.5 text-zinc-950 placeholder:text-zinc-500 transition-colors focus:border-zinc-950 focus:outline-none focus:ring-2 focus:ring-red-600/30";

function Field({ name, label, type = "text", required = false, autoComplete }: { name: string; label: string; type?: string; required?: boolean; autoComplete?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`cta-${name}`} className="text-sm font-semibold text-zinc-800">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <input id={`cta-${name}`} name={name} type={type} required={required} autoComplete={autoComplete} className={inputClass} />
    </div>
  );
}

type FinalCtaContent = PageContent["finalCta"] & {
  /** Render the heading as an H2 (location pages); the homepage keeps a paragraph */
  headingAsH2?: boolean;
  /** Enquire / WhatsApp buttons shown under the intro copy */
  ctas?: PageContent["ctas"];
};

export function FinalCta({ finalCta = homeContent.finalCta }: { finalCta?: FinalCtaContent }) {
  const { form } = finalCta;
  const Heading = finalCta.headingAsH2 ? "h2" : "p";
  const [status, setStatus] = useState<Status>("idle");
  const { guardFields, guardPayload, resetGuard } = useSpamGuard();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const fd = new FormData(formEl);
    setStatus("sending");
    const data = { ...Object.fromEntries(fd.entries()), ...(await guardPayload(fd)) };
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
    } finally {
      resetGuard();
    }
  }

  return (
    <section id="enquire" className="full-bleed my-8 overflow-hidden rounded-[2.5rem] bg-[#f2f4f6] px-[calc(1.5rem-4px)] py-20 md:px-[calc(3.25rem-4px)] lg:py-28 min-[1201px]:px-[calc(13rem-18px)]">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Heading className={`${type.cta} font-black uppercase leading-[0.95] tracking-[-0.04em] text-zinc-950`}>
            <AccentText text={finalCta.heading} accent={finalCta.accent} className="text-[1.25em] text-red-600" />
          </Heading>
          <p className="mt-7 max-w-[48ch] text-base leading-relaxed text-zinc-600 sm:text-lg">{finalCta.body}</p>
          {finalCta.ctas && (
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <EnquireLink {...finalCta.ctas.enquire} />
              <WhatsAppLink {...finalCta.ctas.whatsapp} />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5 rounded-[2rem] bg-white p-6 shadow-[0_30px_60px_-40px_rgba(63,63,70,0.4)] sm:grid-cols-2 sm:p-10 lg:col-span-7">
          {guardFields}
          <Field name="name" label={form.name} required autoComplete="name" />
          <Field name="email" label={form.email} type="email" required autoComplete="email" />
          <Field name="phone" label={form.phone} type="tel" autoComplete="tel" />
          <Field name="company" label={form.company} autoComplete="organization" />
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label htmlFor="cta-message" className="text-sm font-semibold text-zinc-800">
              {form.message}
              <span className="text-red-600"> *</span>
            </label>
            <textarea id="cta-message" name="message" rows={5} required className={`${inputClass} resize-none`} />
          </div>

          <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full bg-red-600 px-7 py-4 text-sm font-semibold text-white transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-red-500 active:translate-y-px disabled:cursor-wait disabled:opacity-70"
            >
              {finalCta.submitLabel}
              {status === "sending" ? (
                <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={2} />
              ) : (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
              )}
            </button>
            <p role="status" aria-live="polite" className={`text-sm font-medium ${status === "error" ? "text-red-700" : "text-zinc-700"}`}>
              {status === "success" && form.success}
              {status === "error" && form.error}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
