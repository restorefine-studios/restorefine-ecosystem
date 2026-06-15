"use client";

import { ArrowLeft } from "lucide-react";
import { useFormState } from "../../contact-form-context";

const serviceTypeOptions: Record<string, { id: string; title: string }[]> = {
  branding: [
    { id: "logo-design", title: "Logo Design" },
    { id: "brand-identity", title: "Brand Identity" },
    { id: "brand-strategy", title: "Brand Strategy" },
    { id: "rebranding", title: "Rebranding" },
  ],
  web: [
    { id: "web-design", title: "Web Design" },
    { id: "website-development", title: "Website Development" },
    { id: "ecommerce", title: "Ecommerce" },
    { id: "seo", title: "SEO" },
    { id: "website-redesign", title: "Website Redesign" },
  ],
  media: [
    { id: "photography", title: "Photography" },
    { id: "videography", title: "Videography" },
    { id: "social-media", title: "Social Media Management" },
    { id: "content-creation", title: "Content Creation" },
    { id: "launch-campaigns", title: "Launch Campaigns" },
  ],
  print: [
    { id: "menus", title: "Menus" },
    { id: "flyers", title: "Flyers" },
    { id: "posters", title: "Posters" },
    { id: "packaging", title: "Packaging" },
    { id: "business-cards", title: "Business Cards" },
  ],
  merch: [
    { id: "custom-apparel", title: "Custom Apparel" },
    { id: "branding-merch", title: "Branding Merch" },
    { id: "promotional", title: "Promotional" },
  ],
  pos: [
    { id: "software", title: "Software" },
    { id: "setup", title: "Setup" },
  ],
};

export function StepTwo() {
  const { state, dispatch } = useFormState();
  const options = state.mainService
    ? serviceTypeOptions[state.mainService] ?? []
    : [];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <p className="text-[10px] tracking-[0.3em] uppercase text-red-600 font-medium mb-3">
        Step 2 of 5
      </p>
      <h2 className="font-black text-zinc-950 text-2xl md:text-3xl tracking-tight mb-2">
        What type of service do you need?
      </h2>
      <p className="text-zinc-400 text-sm mb-8 capitalize">
        Selected: <span className="text-zinc-600 font-medium">{state.mainService}</span>
      </p>

      <div className="flex flex-wrap gap-3 mb-10">
        {options.map((option) => {
          const isSelected = state.serviceType === option.id;
          return (
            <button
              key={option.id}
              onClick={() => {
                dispatch({ type: "SET_SERVICE_TYPE", payload: option.id });
                dispatch({ type: "SET_STEP", payload: 3 });
              }}
              className={`px-5 py-3 rounded-full border text-sm font-medium transition-all duration-200
                ${isSelected
                  ? "border-red-600 bg-red-50 text-red-700"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-red-400 hover:bg-red-50 hover:text-zinc-950 shadow-sm"
                }`}
            >
              {option.title}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => dispatch({ type: "SET_STEP", payload: 1 })}
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Go Back
      </button>
    </div>
  );
}
