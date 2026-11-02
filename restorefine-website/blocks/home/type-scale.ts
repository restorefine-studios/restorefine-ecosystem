/**
 * Homepage type scale. Change a size here and every section that uses it follows.
 * (Tailwind scans this file, so the arbitrary values below are generated.)
 */
export const type = {
  /** Hero H1 */
  display: "text-[clamp(2.5rem,6.6vw,6.25rem)]",
  /** Lead statement (the #1 agency intro) */
  statement: "text-[clamp(2.1rem,4.4vw,4.25rem)]",
  /** Standard section H2 */
  section: "text-[clamp(1.9rem,3.6vw,3.4rem)]",
  /** Closing CTA H2 */
  cta: "text-[clamp(2.1rem,4vw,3.75rem)]",
  /** Large closing lines inside sections */
  closing: "text-[clamp(1.75rem,3.4vw,3.1rem)]",
} as const;
