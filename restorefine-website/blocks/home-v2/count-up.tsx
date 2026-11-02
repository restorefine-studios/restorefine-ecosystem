"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up to `value` every time it scrolls into view. Renders the final value
 * on the server, so the figure is right without JavaScript; reduced motion skips it.
 */
export function CountUp({ value, from = 0, duration = 1400, className = "" }: { value: string; from?: number; duration?: number; className?: string }) {
  const target = Number(value);
  const decimals = value.includes(".") ? value.split(".")[1].length : 0;
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || Number.isNaN(target)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const run = () => {
      cancelAnimationFrame(raf);
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setShown((from + (target - from) * eased).toFixed(decimals));
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) run();
        else {
          // Reset off-screen so the count plays again on the next scroll in
          cancelAnimationFrame(raf);
          setShown(from.toFixed(decimals));
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, from, duration, decimals]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
