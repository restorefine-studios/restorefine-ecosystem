"use client";

import { useEffect, useState } from "react";

const WORDS = [
  "The Growth Partner",
  "The Creative Agency",
  "The Growth Partner",
  "The Hospitality Specialist Consultancy",
  "The Brand Builder",
];

const TYPE_SPEED   = 60;   // ms per character typed
const DELETE_SPEED = 35;   // ms per character deleted
const PAUSE_AFTER  = 2000; // ms to hold the completed word

type Phase = "typing" | "pausing" | "deleting";

export default function TypewriterText() {
  const [wordIndex, setWordIndex]   = useState(0);
  const [displayed, setDisplayed]   = useState("");
  const [phase, setPhase]           = useState<Phase>("typing");

  useEffect(() => {
    const target = WORDS[wordIndex];

    if (phase === "typing") {
      if (displayed.length < target.length) {
        const t = setTimeout(
          () => setDisplayed(target.slice(0, displayed.length + 1)),
          TYPE_SPEED
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("pausing"), PAUSE_AFTER);
        return () => clearTimeout(t);
      }
    }

    if (phase === "pausing") {
      setPhase("deleting");
    }

    if (phase === "deleting") {
      if (displayed.length > 0) {
        const t = setTimeout(
          () => setDisplayed((d) => d.slice(0, -1)),
          DELETE_SPEED
        );
        return () => clearTimeout(t);
      } else {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setPhase("typing");
      }
    }
  }, [phase, displayed, wordIndex]);

  return (
    <>
      <span className="bg-gradient-to-b from-zinc-900 to-zinc-500 bg-clip-text text-transparent">
        {displayed}
      </span>
      {/* blinking cursor — inline-block so it stays vertically centred */}
      <span
        className="ml-0.5 inline-block w-[3px] h-[0.85em] align-middle bg-red-600 rounded-sm"
        style={{ animation: "blink 1s step-start infinite" }}
      />
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </>
  );
}
