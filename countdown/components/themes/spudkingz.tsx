"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import { Barlow_Semi_Condensed } from "next/font/google";
import { Digits, PinIcon, type ThemeProps } from "@/components/parts";
import s from "./spudkingz.module.css";

// Comicy is the brand's headline face (from the Spud Kingz screen takeover files)
const comicy = localFont({ src: "../../app/fonts/Comicy.woff2", variable: "--font-comicy", display: "swap" });
// Free stand-in for Bahnschrift, the brand's small-caps face (a Windows system font that can't be web-embedded)
const barlow = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

const ASSETS = "/clients/spudkingz";

/** Yellow table, green pennant, buttered jacket potato: built from the brand's "£5 Spuds" launch post */
export function SpudKingzTheme({ client, parts, showDays, ready, launched, burst, launchAt }: ThemeProps) {
  const day = new Date(launchAt)
    .toLocaleDateString("en-GB", { weekday: "long", timeZone: client.timeZone })
    .toUpperCase();
  const time = new Date(launchAt)
    .toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: client.timeZone })
    .replace(":00", "")
    .replace(" ", "")
    .toUpperCase();

  return (
    <main className={`${s.stage} ${comicy.variable} ${barlow.variable}`} data-launched={launched || undefined}>
      <Image className={`${s.shaker} ${s.salt}`} src={`${ASSETS}/shaker-salt.webp`} alt="" width={351} height={523} priority />
      <Image className={`${s.shaker} ${s.pepper}`} src={`${ASSETS}/shaker-pepper.webp`} alt="" width={377} height={456} priority />

      <section className={s.pennant}>
        <svg className={s.pennantShape} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {/* Inset by the stroke so the rounded outline lands on the original edges */}
          <path className={s.pennantFill} d="M0 0H100V86L50 100L0 86Z" vectorEffect="non-scaling-stroke" />
          <path className={s.pennantLine} d="M3.5 0V83.6L50 97.2L96.5 83.6V0" vectorEffect="non-scaling-stroke" />
        </svg>

        <div className={s.pennantInner}>
          <Image
            className={s.logo}
            src={client.logo.src}
            alt={client.logo.alt}
            width={client.logo.width}
            height={client.logo.height}
            priority
            sizes="140px"
          />

          {!launched ? (
            <div className={s.counting}>
              <h1 className={s.kicker}>Wishaw, we open in</h1>
              <div
                className={s.clock}
                role="timer"
                aria-label={`Time until ${client.name} opens`}
                data-ready={ready || undefined}
                data-units={showDays ? 4 : 3}
              >
                {showDays && (
                  <>
                    <Unit value={parts.days} label="Days" />
                    <Colon />
                  </>
                )}
                <Unit value={parts.hours} label="Hrs" />
                <Colon />
                <Unit value={parts.minutes} label="Mins" />
                <Colon />
                <Unit value={parts.seconds} label="Secs" />
              </div>
              <p className={s.strip}>£5 spuds all day long</p>
              <p className={s.pill}>
                {day} {time}
              </p>
            </div>
          ) : (
            <div className={s.open} aria-live="polite">
              <h1 className={s.openTitle}>
                <span className={s.price}>£5</span> <span>Spuds</span>
              </h1>
              <p className={s.strip}>All day long</p>
              <p className={s.pill}>{client.launched.headline}</p>
            </div>
          )}
        </div>
      </section>

      <div className={s.table}>
        <Image
          className={s.potato}
          src={`${ASSETS}/potato.webp`}
          alt="A buttered jacket potato with salt and black pepper"
          width={821}
          height={605}
          priority
          sizes="(max-width: 640px) 80vw, 560px"
        />
      </div>

      <Image className={s.mascot} src={`${ASSETS}/mascot.webp`} alt="" width={650} height={900} />

      <footer className={s.foot}>
        {client.address && (
          <a className={s.address} href={client.address.mapsUrl} target="_blank" rel="noopener">
            <PinIcon />
            {client.address.label}
          </a>
        )}
        <a className={s.credit} href="https://restorefine.co.uk" target="_blank" rel="noopener">
          <Image src="/restorefine-mark-dark.svg" alt="" width={20} height={20} />
          <span>
            Launch by <strong>RestoRefine</strong>
          </span>
        </a>
      </footer>

      <FlyingSpuds burst={burst} />
    </main>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className={s.unit}>
      <Digits value={value} className={s.digits} digitClassName={s.digit} />
      <span className={s.label}>{label}</span>
    </div>
  );
}

function Colon() {
  return (
    <span className={s.colon} aria-hidden="true">
      :
    </span>
  );
}

/**
 * Jacket potatoes thrown up from both bottom corners alongside the confetti.
 * Plain DOM images on the Web Animations API, so they stay crisp at any size.
 */
function FlyingSpuds({ burst }: { burst: number }) {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = layer.current;
    if (!burst || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const count = w < 640 ? 12 : 20;

    for (let i = 0; i < count; i++) {
      timers.push(
        setTimeout(() => {
          const fromLeft = i % 2 === 0;
          const size = (w < 640 ? 44 : 64) + Math.random() * (w < 640 ? 30 : 56);
          const img = document.createElement("img");
          img.src = `${ASSETS}/potato-small.webp`;
          img.alt = "";
          img.className = s.spud;
          img.style.width = `${size}px`;
          el.appendChild(img);

          // A thrown arc: up and across, then down past the bottom edge
          const x0 = fromLeft ? -size : w;
          const y0 = h * (0.75 + Math.random() * 0.2);
          const dx = (fromLeft ? 1 : -1) * w * (0.35 + Math.random() * 0.45);
          const rise = h * (0.55 + Math.random() * 0.4);
          const spin = (fromLeft ? 1 : -1) * (360 + Math.random() * 540);
          const steps = 12;
          const frames: Keyframe[] = [];
          for (let k = 0; k <= steps; k++) {
            const t = k / steps;
            const x = x0 + dx * t;
            const y = y0 - rise * (4 * t * (1 - t)) + (t > 0.5 ? (t - 0.5) * h * 0.9 : 0);
            frames.push({ transform: `translate(${x}px, ${y}px) rotate(${spin * t}deg)` });
          }
          const anim = img.animate(frames, {
            duration: 2200 + Math.random() * 1200,
            easing: "linear",
            fill: "forwards",
          });
          anim.onfinish = () => img.remove();
        }, i * 140 + Math.random() * 120),
      );
    }

    return () => {
      timers.forEach(clearTimeout);
      el.replaceChildren();
    };
  }, [burst]);

  return <div ref={layer} className={s.spuds} aria-hidden="true" />;
}
