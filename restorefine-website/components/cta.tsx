import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

function Cta() {
  return (
    <section className="section-bleed py-16 bg-white">
      <Link
        href="/contact"
        className="group relative flex flex-row items-end md:items-center justify-between gap-6 bg-red-600 rounded-[28px] px-8 md:px-14 py-10 md:py-12 overflow-hidden hover:bg-red-700 transition-colors duration-300"
      >
        {/* LEFT: Big Headline */}
        <h2
          className="font-black text-white leading-[1] tracking-tight"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)" }}
        >
          Let&apos;s Discuss<br />
          With Our Team
        </h2>

        {/* MIDDLE: Sub-text */}
        <div className="hidden md:flex flex-col gap-1 max-w-[220px]">
          <p className="font-bold text-white text-sm leading-snug">
            Giving You The Best
          </p>
          <p className="text-white text-sm leading-snug">
            Giving You The Best Price And Coverage For Your Property Needs.
          </p>
        </div>

        {/* RIGHT: Arrow Button */}
        <div className="shrink-0 flex items-center justify-center w-14 h-14 md:w-24 md:h-24 rounded-2xl border-2 border-white transition-colors duration-300">
          <ArrowUpRight
            className="w-7 h-7 md:w-12 md:h-12 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            strokeWidth={1.8}
          />
        </div>
      </Link>
    </section>
  );
}

export default Cta;
