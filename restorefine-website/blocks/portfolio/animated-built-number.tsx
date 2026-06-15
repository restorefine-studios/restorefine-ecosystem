"use client";

import { useRef, useState, useEffect } from "react";

export function AnimatedBuiltNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
      setActive(inView);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <span
      ref={ref}
      className={`text-4xl font-black leading-none tabular-nums shrink-0 transition-colors duration-700 ${
        active ? "text-red-600" : "text-zinc-200"
      }`}
    >
      {value}
    </span>
  );
}
