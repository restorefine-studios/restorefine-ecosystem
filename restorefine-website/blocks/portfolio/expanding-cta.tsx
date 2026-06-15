"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface Props {
  heading: string;
  body: string;
}

export function ExpandingCta({ heading, body }: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Amount of scroll needed to go from nothing to full screen
    const SCROLL_RANGE = window.innerHeight * 0.6;

    const onScroll = () => {
      const el = sentinelRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Starts the moment the sentinel hits the bottom of the viewport
      const scrolledPast = window.innerHeight - rect.top;
      const p = Math.max(0, Math.min(1, scrolledPast / SCROLL_RANGE));
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Red rises from the bottom — topInset goes 100→0 as you scroll
  const topInset = lerp(100, 0, progress);
  const clipPath = `inset(${topInset}% 0% 0% 0%)`;
  const contentOpacity = Math.max(0, Math.min(1, (progress - 0.55) / 0.45));

  return (
    <>
      {/* Zero-height sentinel — sits right after the last section */}
      <div ref={sentinelRef} />

      {/* Spacer gives the page enough scroll height for the animation to trigger */}
      <div style={{ height: "70vh" }} aria-hidden="true" />

      {/* Full-screen fixed overlay — only rendered when active */}
      {progress > 0 && (
        <Link
          href="/contact"
          className="fixed inset-0 z-[9999] bg-red-600 flex flex-col items-center justify-center"
          style={{ clipPath }}
        >
          <div
            className="flex flex-col items-center gap-6 text-center px-8"
            style={{ opacity: contentOpacity }}
          >
            <h3
              className="font-black text-white uppercase tracking-tight leading-[0.95] max-w-3xl"
              style={{ fontSize: "clamp(2.8rem, 4.2vw, 4.6rem)" }}
            >
              {heading}
            </h3>
            <p className="text-white/75 text-base md:text-lg max-w-xl leading-relaxed">
              {body}
            </p>
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl border-2 border-white flex items-center justify-center transition-colors duration-300 hover:bg-white group/btn">
              <ArrowUpRight className="w-10 h-10 md:w-14 md:h-14 text-white group-hover/btn:text-red-600 transition-colors duration-300" strokeWidth={1.8} />
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
