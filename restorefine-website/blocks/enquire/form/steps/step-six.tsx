"use client";

import { CheckCircle, ArrowRight } from "lucide-react";
import { useFormState } from "../../contact-form-context";
import Link from "next/link";

export function StepSix() {
  const { state } = useFormState();
  const { submissionData } = state;

  if (!submissionData) return null;

  const summaryItems = [
    { label: "Service", value: state.mainService },
    { label: "Type", value: state.serviceType },
    { label: "Budget", value: state.budget },
    {
      label: "Timeline",
      value: state.timeline === "other" ? state.customTimeline : state.timeline,
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 py-8">
      {/* Success icon */}
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50 border border-red-200 mb-6">
        <CheckCircle className="w-8 h-8 text-red-600" strokeWidth={1.5} />
      </div>

      <p className="text-[10px] tracking-[0.3em] uppercase text-red-600 font-medium mb-3">
        Enquiry Sent
      </p>
      <h2 className="font-black text-zinc-950 text-2xl md:text-3xl tracking-tight mb-3">
        We'll be in touch soon,{" "}
        <span
          style={{
            fontFamily: "var(--font-holiday), serif",
            fontWeight: 300,
          }}
        >
          {submissionData.name.split(" ")[0]}.
        </span>
      </h2>
      <p className="text-zinc-400 text-sm mb-10">
        Your enquiry has been received. Our team will review it and get back to you within 24 hours.
      </p>

      {/* Summary pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {summaryItems.map((item) =>
          item.value ? (
            <span
              key={item.label}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-zinc-200 bg-zinc-50 text-xs text-zinc-600 shadow-sm"
            >
              <span className="text-zinc-400 uppercase tracking-widest text-[9px]">{item.label}:</span>
              <span className="text-zinc-900 font-medium capitalize">{item.value}</span>
            </span>
          ) : null
        )}
      </div>

      {/* Contact detail summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 p-5 rounded-2xl border border-zinc-200 bg-zinc-50">
        {[
          { label: "Name", value: submissionData.name },
          { label: "Email", value: submissionData.email },
          { label: "Phone", value: submissionData.phone },
          { label: "Company", value: submissionData.company },
        ].map((item) => (
          <div key={item.label}>
            <p className="text-[9px] tracking-widest uppercase text-zinc-400 mb-0.5">{item.label}</p>
            <p className="text-sm text-zinc-900 font-medium truncate">{item.value}</p>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-sm transition-colors"
      >
        Back to Home
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
