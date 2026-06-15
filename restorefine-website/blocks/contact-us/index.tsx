"use client";

import { useState } from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      state: formData.get("state"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success === true) {
        setFormStatus({ type: "success", message: "Message sent! We'll be in touch shortly." });
        form.reset();
      }
    } catch (error) {
      setFormStatus({ type: "error", message: "Failed to send. Please try again." });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormStatus({ type: null, message: "" }), 5000);
    }
  }

  return (
    <section className="min-h-screen bg-white flex items-center px-6 md:px-12 lg:px-24 py-28 lg:py-20">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 lg:items-stretch">

        {/* ── LEFT: headline + info ── */}
        <div>
          <p className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 font-medium mb-6">
            Get In Touch
          </p>
          <h1
            className="font-black text-zinc-950 tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            <span className="block relative z-0 leading-none">
              Let&apos;s Build Something
            </span>
            <span
              className="block relative z-10 font-light normal-case leading-none text-red-600"
              style={{ fontFamily: "var(--font-holiday), serif", fontSize: "clamp(3.5rem, 8vw, 6.5rem)", marginTop: "-1rem" }}
            >
              Great
            </span>
          </h1>
          <p className="mt-6 text-zinc-500 text-sm leading-relaxed max-w-sm">
            Whether you need a brand, a menu, a website, or all three — we&apos;d love to hear about your project.
          </p>

          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 max-w-md">
            <div>
              <h3 className="font-black uppercase tracking-tight text-zinc-900 mb-1.5">Chat to us</h3>
              <p className="text-xs text-zinc-400 mb-2 leading-relaxed">Our team is here to help</p>
              <a href="mailto:hello@restorefine.com" className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 hover:text-red-600 transition-colors">
                <Mail className="w-3.5 h-3.5 text-zinc-400 group-hover:text-red-600 transition-colors" />
                hello@restorefine.com
              </a>
            </div>
            <div>
              <h3 className="font-black uppercase tracking-tight text-zinc-900 mb-1.5">Careers</h3>
              <p className="text-xs text-zinc-400 mb-2 leading-relaxed">Come work with us</p>
              <a href="mailto:hello@restorefine.com" className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 hover:text-red-600 transition-colors">
                <Mail className="w-3.5 h-3.5 text-zinc-400 group-hover:text-red-600 transition-colors" />
                hello@restorefine.com
              </a>
            </div>
            <div>
              <h3 className="font-black uppercase tracking-tight text-zinc-900 mb-1.5">Visit us</h3>
              <p className="text-xs text-zinc-400 mb-2 leading-relaxed">Come say hello at our office</p>
              <p className="inline-flex items-start gap-2 text-sm font-semibold text-zinc-700">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 mt-0.5 flex-shrink-0" />
                272 Bath Street, Glasgow, G2 4JR, United Kingdom
              </p>
            </div>
            <div>
              <h3 className="font-black uppercase tracking-tight text-zinc-900 mb-1.5">Response Time</h3>
              <p className="text-xs text-zinc-400 mb-2 leading-relaxed">We aim to reply within</p>
              <p className="text-sm font-semibold text-zinc-700">24 hours, Monday–Friday</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: form card ── */}
        <div className="bg-zinc-100 rounded-3xl p-6 md:p-10 flex flex-col h-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="name" name="name" type="text" required
                placeholder="Name*"
                aria-label="Name"
                className="h-12 rounded-xl bg-white border-0 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-red-300 shadow-none text-sm px-4"
              />
              <Input
                id="phone" name="phone" type="tel"
                placeholder="Phone"
                aria-label="Phone"
                className="h-12 rounded-xl bg-white border-0 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-red-300 shadow-none text-sm px-4"
              />
            </div>

            <Input
              id="email" name="email" type="email" required
              placeholder="Email*"
              aria-label="Email"
              className="h-12 rounded-xl bg-white border-0 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-red-300 shadow-none text-sm px-4"
            />

            <Input
              id="state" name="state" type="text"
              placeholder="Industry (e.g. Restaurant, Hotel…)"
              aria-label="Industry"
              className="h-12 rounded-xl bg-white border-0 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-red-300 shadow-none text-sm px-4"
            />

            <Textarea
              id="message" name="message" required
              placeholder="Your message*"
              aria-label="Message"
              className="flex-1 rounded-xl bg-white border-0 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-red-300 shadow-none min-h-[160px] resize-none text-sm px-4 py-3"
            />

            {formStatus.message && (
              <p className={`text-xs font-medium ${formStatus.type === "success" ? "text-green-600" : "text-red-600"}`}>
                {formStatus.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 h-13 py-3.5 rounded-full bg-red-600 hover:bg-zinc-950 text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Sending…" : "Send Message"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
