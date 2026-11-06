"use client";

import { useEffect, useState } from "react";

/** Types each phrase, holds, deletes, moves on (the "What to expect" card) */
export function Typewriter({ phrases }: { phrases: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!phrases.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(phrases[0]);
      return;
    }
    const full = phrases[i % phrases.length];
    const done = !deleting && text === full;
    const empty = deleting && text === "";
    const t = setTimeout(
      () => {
        if (done) setDeleting(true);
        else if (empty) {
          setDeleting(false);
          setI((n) => n + 1);
        } else setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
      },
      done ? 1600 : empty ? 300 : deleting ? 28 : 55,
    );
    return () => clearTimeout(t);
  }, [text, deleting, i, phrases]);

  return (
    <p className="text-center font-[family-name:var(--v2-display)] text-[clamp(1.75rem,3.2vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em] text-zinc-950">
      <span className="sr-only">{phrases.join(". ")}</span>
      <span aria-hidden="true">
        {text}
        <span className="ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] animate-pulse bg-red-600" />
      </span>
    </p>
  );
}
