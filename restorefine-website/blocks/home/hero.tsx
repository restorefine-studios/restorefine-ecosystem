import Link from "next/link";
import { NotchNav } from "@/components/navbar";

export default function Hero() {
  return (
    <div className="relative w-screen ml-[calc(-50vw+50%)]">
      {/* Rounded panel, inset ~20px from the true viewport edges, clipping everything inside it */}
      <div className="relative mx-5 mt-5 mb-5 rounded-[28px] md:rounded-[32px] overflow-hidden min-h-[calc(100vh-2.5rem)] bg-white lg:bg-[#ecebe8]">
        {/* Desktop: full-bleed background video, shielded behind the text column */}
        <video
          className="absolute inset-0 z-0 hidden h-full w-full object-cover lg:block lg:left-[32%] lg:right-0 lg:w-[68%]"
          src="/heroVideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
        />
        {/* Desktop: shield just the text column, leave the rest of the video clear */}
        <div
          className="absolute inset-0 z-0 hidden lg:block pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(236,235,232,1) 0%, rgba(236,235,232,1) 32%, rgba(236,235,232,0) 62%)" }}
        />

        {/* Notch navbar: carved into the hero's silhouette (shared with the standalone header). */}
        <NotchNav />

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

          .rr-line-wrap       { overflow: hidden; padding-bottom: 0.22em; margin-bottom: -0.22em; }
          .rr-line-wrap-large { overflow: hidden; padding-bottom: 0.3em;  margin-bottom: -0.3em;  }

          .rr-l1 { animation: rr-slideUp 1s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
          .rr-l2 { animation: rr-slideUp 1s cubic-bezier(0.16,1,0.3,1) 0.2s  both; }
          .rr-l3 { animation: rr-slideUp 1s cubic-bezier(0.16,1,0.3,1) 0.35s both; }
          .rr-l4 { animation: rr-slideUp 1s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
          .rr-divider { transform-origin: left; animation: rr-drawLine 0.6s cubic-bezier(0.16,1,0.3,1) 0.5s both; }
          .rr-label  { animation: rr-fadeIn  0.8s ease 0.05s both; }
          .rr-bottom { animation: rr-fadeIn  0.9s ease 1s   both; }
        `}</style>

        {/* ── MOBILE ─────────────────────────────────────────────────────── */}
        <div className="relative z-10 lg:hidden flex flex-col pt-28 pb-12 px-6">
          <div className="text-center">
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

          <p className="rr-bottom text-zinc-400 text-[13px] leading-relaxed text-center mt-6">From hospitality and leisure to ambitious businesses across the UK, we bring strategy, brand, marketing, and digital experience together to create connected, sustainable growth.</p>

          {/* Video card: contained, portrait, in normal document flow */}
          <div className="rr-bottom relative w-full aspect-[3/4] rounded-2xl overflow-hidden mt-6">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/heroVideo.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              disablePictureInPicture
              aria-hidden="true"
              tabIndex={-1}
            />
          </div>

          <Link href="/enquire-now" className="rr-bottom inline-flex items-center justify-center gap-4 bg-red-600 hover:bg-red-500 transition-colors rounded-full px-7 py-4 group mt-6 self-center">
            <span className="text-white font-semibold text-xs tracking-[0.2em] uppercase">Enquire Now</span>
            <span className="text-white group-hover:translate-x-1 transition-transform duration-200 ml-4">→</span>
          </Link>
        </div>

        {/* ── DESKTOP ─────────────────────────────────────────────────────── */}
        <div className="relative z-10 hidden lg:flex min-h-[calc(100vh-2.5rem)] pt-32">
          {/* Left: headline + CTA */}
          <div className="flex flex-col flex-1 pl-10 xl:pl-20 pr-10">
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
                <p className="text-zinc-400 text-base leading-relaxed max-w-md">From hospitality and leisure to ambitious businesses across the UK, we bring strategy, brand, marketing, and digital experience together to create connected, sustainable growth.</p>
                <Link href="/enquire-now" className="group inline-flex items-center gap-4 bg-red-600 hover:bg-red-500 transition-all duration-300 rounded-full px-8 py-4 self-start">
                  <span className="text-white font-medium text-sm tracking-[0.22em] uppercase whitespace-nowrap">Enquire Now</span>
                  <span className="text-white group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
