"use client";

import { Check } from "lucide-react";
import { EnquireLink, WhatsAppLink } from "@/blocks/home/cta-links";
import { WHATSAPP_HREF } from "@/lib/homepageData";
import { useFormState } from "../../contact-form-context";

const NEXT_STEPS = [
  { title: "We review your brief", text: "Our team reads your answers and looks at your business." },
  { title: "We get in touch", text: "Expect a reply within 24 hours to arrange a conversation." },
  { title: "We plan the work", text: "Together we agree the scope, priorities and next steps." },
];

export function StepSix() {
  const { state } = useFormState();
  const { submissionData } = state;
  if (!submissionData) return null;

  const firstName = submissionData.name.trim().split(" ")[0];

  return (
    <div className="py-2">
      <span className={`flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white`}>
        <Check aria-hidden="true" className="h-7 w-7" strokeWidth={2.5} />
      </span>
      <h2 className={`mt-8 text-[clamp(1.9rem,3.4vw,3rem)] font-black uppercase leading-[0.98] tracking-[-0.04em] text-zinc-950`}>
        We&apos;ll be in touch soon,{" "}
        <span className={`font-normal normal-case tracking-normal text-red-600`} style={{ fontFamily: "var(--font-holiday), serif", fontSize: "1.25em" }}>
          {firstName}.
        </span>
      </h2>
      <p className={`mt-5 max-w-[52ch] leading-relaxed text-zinc-600`}>
        Your enquiry is with our team. We&apos;ll reply to <span className={`font-semibold text-zinc-950`}>{submissionData.email}</span> within 24 hours.
      </p>

      <ol className="mt-10 grid gap-3 sm:grid-cols-3">
        {NEXT_STEPS.map((item) => (
          <li key={item.title} className={`rounded-[1.5rem] p-6 bg-white`}>
            <p className="font-black uppercase leading-tight tracking-[-0.02em] text-zinc-950">{item.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap gap-3">
        <EnquireLink label="See our work" href="/portfolio" tone="red" />
        <WhatsAppLink label="Chat on WhatsApp" href={WHATSAPP_HREF} tone="dark" />
      </div>
    </div>
  );
}
