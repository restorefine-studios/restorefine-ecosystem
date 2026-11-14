/** Pieces shared by every countdown theme */

export type Parts = { days: number; hours: number; minutes: number; seconds: number };

/**
 * Props every theme receives from <Countdown>.
 * `launched` is true at the real launch and during a local test launch.
 * `burst` goes up by one each time the launch moment plays, so themes can add their own effects.
 */
export type ThemeProps = {
  client: import("@/lib/clients").Client;
  parts: Parts;
  showDays: boolean;
  ready: boolean;
  launched: boolean;
  burst: number;
  launchAt: number;
  /** Colour variant for themes that offer several (see Client.variants) */
  variant?: string;
};

/** Two digits that roll in whenever their value changes */
export function Digits({ value, className, digitClassName }: { value: number; className?: string; digitClassName?: string }) {
  const digits = String(value).padStart(2, "0").split("");
  return (
    <div className={className}>
      {digits.map((ch, i) => (
        <span className={digitClassName} key={i}>
          {/* New key per value remounts the span, which replays the roll animation */}
          <span key={ch}>{ch}</span>
        </span>
      ))}
    </div>
  );
}

// Phosphor "MapPin" (fill)
export function PinIcon() {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true">
      <path
        fill="currentColor"
        d="M128 16a88.1 88.1 0 0 0-88 88c0 75.3 80 132.17 83.41 134.55a8 8 0 0 0 9.18 0C136 236.17 216 179.3 216 104a88.1 88.1 0 0 0-88-88Zm0 56a32 32 0 1 1-32 32 32 32 0 0 1 32-32Z"
      />
    </svg>
  );
}
