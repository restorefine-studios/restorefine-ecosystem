"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useFormState } from "../../contact-form-context";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function StepFive() {
  const { state, dispatch } = useFormState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
    ["name", "email", "phone", "company", "message"].forEach((field) => {
      if (!formData.get(field)) newErrors[field] = "This field is required";
    });
    const email = formData.get("email") as string;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Please enter a valid email address";
    const message = formData.get("message") as string;
    if (message && message.length < 6)
      newErrors.message = "Message must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    if (!validateForm(formData)) { setIsSubmitting(false); return; }
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
      if (!response.ok) { const err = await response.json(); throw new Error(err.error || `Request failed (${response.status})`); }
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
      toast({ title: "Success", description: "Your enquiry has been sent!" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrors((prev) => ({ ...prev, submit: msg }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-red-500 rounded-xl h-11 text-sm shadow-sm transition-colors";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <p className="text-[10px] tracking-[0.3em] uppercase text-red-600 font-medium mb-3">
        Step 5 of 5
      </p>
      <h2 className="font-black text-zinc-950 text-2xl md:text-3xl tracking-tight mb-2">
        Your contact details
      </h2>
      <p className="text-zinc-400 text-sm mb-8">We'll reach out within 24 hours.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <Input name="name" placeholder="Your full name" className={inputClass} />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <Input name="email" type="email" placeholder="your@email.com" className={inputClass} />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-medium">
              Phone <span className="text-red-500">*</span>
            </label>
            <Input name="phone" type="tel" placeholder="+44 7700 000000" className={inputClass} />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-medium">
              Company <span className="text-red-500">*</span>
            </label>
            <Input name="company" placeholder="Your restaurant / business" className={inputClass} />
            {errors.company && <p className="text-xs text-red-500">{errors.company}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-medium">
            Tell us more <span className="text-red-500">*</span>
          </label>
          <Textarea
            name="message"
            placeholder="Describe your project in a few sentences…"
            className="bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-red-500 rounded-xl min-h-[110px] resize-none text-sm shadow-sm transition-colors"
          />
          {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
        </div>

        {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Sending…" : "Send Enquiry"}
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: "SET_STEP", payload: 4 })}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
}
