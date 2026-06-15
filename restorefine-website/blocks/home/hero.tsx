"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { VolumeX, Volume2 } from "lucide-react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted((m) => !m);
  };

  return (
    <main className="relative bg-white min-h-screen overflow-hidden">
      <style>{`
        @keyframes rr-slideUp {
          from { transform: translateY(110%); }
          to   { transform: translateY(0); }
        }
        @keyframes rr-fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rr-drawLine {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes rr-panelIn {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .rr-line-wrap       { overflow: hidden; padding-bottom: 0.22em; margin-bottom: -0.22em; }
        .rr-line-wrap-large { overflow: hidden; padding-bottom: 0.3em;  margin-bottom: -0.3em;  }

        .rr-l1 { animation: rr-slideUp 1s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .rr-l2 { animation: rr-slideUp 1s cubic-bezier(0.16,1,0.3,1) 0.2s  both; }
        .rr-l3 { animation: rr-slideUp 1s cubic-bezier(0.16,1,0.3,1) 0.35s both; }
        .rr-l4 { animation: rr-slideUp 1s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
        .rr-divider { transform-origin: left; animation: rr-drawLine 0.6s cubic-bezier(0.16,1,0.3,1) 0.5s both; }
        .rr-panel  { animation: rr-panelIn 1.2s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .rr-label  { animation: rr-fadeIn  0.8s ease 0.05s both; }
        .rr-bottom { animation: rr-fadeIn  0.9s ease 1s   both; }
      `}</style>

      {/* ── MOBILE ─────────────────────────────────────────────────────── */}
      <div className="lg:hidden flex flex-col min-h-screen bg-white pt-24 pb-12 px-6">
        <div className="mb-8 text-center">
          <h1 className="leading-none">
            <div className="rr-line-wrap overflow-visible mb-2">
              <div className="rr-l1 text-zinc-950 whitespace-nowrap" style={{ fontSize: "clamp(0.85rem, 4vw, 1.5rem)", lineHeight: 1, letterSpacing: "0.02em", fontFamily: "inherit", fontWeight: 500 }}>
                WE DON&apos;T FOLLOW TRENDS
              </div>
            </div>
            <div className="rr-line-wrap-large overflow-visible">
              <div className="rr-l3 mt-2 text-zinc-950 whitespace-nowrap" style={{ fontSize: "clamp(2.2rem, 13vw, 4.2rem)", lineHeight: 0.95, letterSpacing: "-0.02em", fontFamily: "inherit", fontWeight: 900 }}>
                WE BUILD
              </div>
            </div>
            <div className="rr-line-wrap-large" style={{ marginTop: "-0.6rem", overflow: "visible" }}>
              <div className="rr-l4 text-red-600 whitespace-nowrap" style={{ fontSize: "clamp(2.8rem, 16vw, 5rem)", lineHeight: 0.85, fontFamily: "var(--font-holiday), serif", fontWeight: 400 }}>
                Brands
              </div>
            </div>
          </h1>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-xl mb-8" style={{ aspectRatio: "9/16" }}>
          <video className="w-full h-full object-cover" src="/reels/damasqino.mp4" autoPlay muted loop playsInline />
        </div>

        <div className="rr-bottom flex flex-col gap-4">
          <p className="text-zinc-400 text-[13px] leading-relaxed">Creative-led growth for premium hospitality and leisure brands.</p>
          <Link href="/enquire-now" className="inline-flex items-center justify-center gap-4 bg-red-600 hover:bg-red-500 transition-colors rounded-full px-7 py-4 group">
            <span className="text-white font-semibold text-xs tracking-[0.2em] uppercase">Enquire Now</span>
            <span className="text-white group-hover:translate-x-1 transition-transform duration-200 ml-4">→</span>
          </Link>
        </div>
      </div>

      {/* ── DESKTOP ─────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex min-h-screen pt-20">
        {/* Left: headline + CTA */}
        <div className="flex flex-col flex-1 pl-14 xl:pl-20 pr-10">
          {/* All content vertically centered */}
          <div className="flex flex-col justify-center flex-1 gap-5">
            <h1 className="leading-none">
              <div className="rr-line-wrap">
                <div className="rr-l1 text-zinc-950" style={{ fontSize: "clamp(1.1rem, 2vw, 2rem)", lineHeight: 1, letterSpacing: "0.04em", fontFamily: "inherit", fontWeight: 500 }}>
                  WE DON&apos;T FOLLOW TRENDS
                </div>
              </div>
              <div className="rr-line-wrap-large mt-3">
                <div className="rr-l3 text-zinc-950" style={{ fontSize: "clamp(3.5rem, 6.5vw, 7.5rem)", lineHeight: 0.9, letterSpacing: "-0.03em", fontFamily: "inherit", fontWeight: 900 }}>
                  WE BUILD
                </div>
              </div>
              <div className="rr-line-wrap-large" style={{ marginTop: "-1.2rem", overflow: "visible" }}>
                <div className="rr-l4 text-red-600" style={{ fontSize: "clamp(4rem, 8vw, 8.8rem)", lineHeight: 0.85, fontFamily: "var(--font-holiday), serif", fontWeight: 400 }}>
                  Brands
                </div>
              </div>
            </h1>

            <div className="rr-bottom flex flex-col gap-3">
              <p className="text-zinc-400 text-base leading-relaxed">Creative-led growth for premium hospitality and leisure brands.</p>
              <Link href="/enquire-now" className="group inline-flex items-center gap-4 bg-red-600 hover:bg-red-500 transition-all duration-300 rounded-full px-8 py-4 self-start">
                <span className="text-white font-medium text-sm tracking-[0.22em] uppercase whitespace-nowrap">Enquire Now</span>
                <span className="text-white group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right: tall vertical video, flush right edge */}
        <div className="rr-panel relative w-[45%] xl:w-[42%] shrink-0 py-5 pr-5">
          <div className="relative h-full rounded-3xl overflow-hidden bg-zinc-100">
            <div className="absolute top-5 left-5 z-10 pointer-events-none">
              <span className="text-[10px] text-white/40 tracking-widest" style={{ fontFamily: "'Courier New', monospace" }}>
                01
              </span>
            </div>

            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" src="/reels/damasqino.mp4" muted={isMuted} loop playsInline autoPlay />

            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15 pointer-events-none" />

            <button onClick={toggleMute} className="absolute top-5 right-5 z-10 bg-black/20 backdrop-blur-md text-white rounded-full p-2.5 hover:bg-black/50 transition-colors border border-white/15" aria-label={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
            </button>

            <div className="absolute bottom-0 inset-x-0 px-6 py-6 z-10 pointer-events-none">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <p className="text-white/45 text-[7px] tracking-[0.45em] uppercase" style={{ fontFamily: "'Courier New', monospace" }}>
                  Featured Client
                </p>
              </div>
              <p className="text-white text-sm font-semibold">Damasqino</p>
              <p className="text-white/50 text-[11px] mt-0.5">UK&apos;s Best Lebanese Restaurant</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
