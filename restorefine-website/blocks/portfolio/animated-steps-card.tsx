"use client";

import { useRef, useState, useEffect } from "react";

interface Step {
  step: number;
  title: string;
  detail: string;
}

// px of scroll past the trigger point needed to reveal each step
const PX_PER_STEP = 150;

export function AnimatedStepsCard({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.75;
      // How many px the element has scrolled past the trigger point
      const scrolledPast = triggerPoint - rect.top;

      if (scrolledPast < 0) {
        setActiveCount(0);
        return;
      }

      // Each PX_PER_STEP of scroll reveals one more step
      const count = Math.min(steps.length, Math.floor(scrolledPast / PX_PER_STEP) + 1);
      setActiveCount(count);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [steps.length]);

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      {steps.map((step, i) => (
        <div key={step.step} className="bg-zinc-50 border border-zinc-100 rounded-xl p-4">
          <span
            className={`text-3xl font-black leading-none block mb-2 transition-colors duration-300 ${
              activeCount > i ? "text-red-600" : "text-zinc-200"
            }`}
          >
            {String(step.step).padStart(2, "0")}
          </span>
          <p className="text-xs font-black uppercase text-zinc-900 mb-1">{step.title}</p>
          <p className="text-xs text-zinc-500 leading-relaxed">{step.detail}</p>
        </div>
      ))}
    </div>
  );
}
