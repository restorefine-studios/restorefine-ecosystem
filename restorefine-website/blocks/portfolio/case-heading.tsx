/**
 * A case-study section title in the homepage type, as a real h2 over a dashed rule.
 * `num` is accepted so existing markup keeps compiling, but isn't shown.
 * `dark` is for sections on a black card.
 */
export function SectionHeading({ label, dark = false, className = "mb-8" }: { num?: string; label: string; dark?: boolean; className?: string }) {
  return (
    <div className={`border-t border-dashed pt-6 ${dark ? "border-white/20" : "border-zinc-300"} ${className}`}>
      <h2 className={`v2-title-xl ${dark ? "text-white" : "text-zinc-950"}`}>{label}</h2>
    </div>
  );
}

/** Kept under its old name so each case study's markup reads the same */
export const LightHeader = SectionHeading;
