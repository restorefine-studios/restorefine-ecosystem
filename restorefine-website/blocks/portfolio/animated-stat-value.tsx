"use client";

import { useEffect, useMemo, useRef } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";

type ParsedValue = {
  number: number;
  decimals: number;
  prefix: string;
  suffix: string;
  hasComma: boolean;
  original: string;
};

function parseStatValue(value: string): ParsedValue | null {
  const original = value.trim();
  const match = original.match(/^([^0-9+-]*)([+-]?[\d,]*\.?\d+)(.*)$/);
  if (!match) return null;

  const [, prefix, rawNumber, suffix] = match;
  const normalized = rawNumber.replace(/,/g, "");
  const number = Number(normalized);
  if (!Number.isFinite(number)) return null;

  return {
    number,
    decimals: rawNumber.includes(".") ? rawNumber.split(".")[1].length : 0,
    prefix,
    suffix,
    hasComma: rawNumber.includes(","),
    original,
  };
}

function formatStatValue(value: number, parsed: ParsedValue) {
  const fixed = value.toFixed(parsed.decimals);
  const [whole, decimal] = fixed.split(".");
  const formattedWhole = parsed.hasComma ? Number(whole).toLocaleString("en-GB") : whole;
  return `${parsed.prefix}${formattedWhole}${decimal ? `.${decimal}` : ""}${parsed.suffix}`;
}

export function AnimatedStatValue({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const parsed = useMemo(() => parseStatValue(value), [value]);
  const motionValue = useMotionValue(0);
  const inView = useInView(ref, { amount: 0.7, once: true });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !parsed) return;

    if (reduce) {
      el.textContent = parsed.original;
      return;
    }

    el.textContent = formatStatValue(0, parsed);
  }, [parsed, reduce]);

  useEffect(() => {
    if (!inView || !parsed || reduce) return undefined;

    const unsubscribe = motionValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = formatStatValue(latest, parsed);
    });

    const controls = animate(motionValue, parsed.number, {
      duration: 2.15,
      ease: [0.12, 0.86, 0.16, 1],
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [inView, motionValue, parsed, reduce]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
