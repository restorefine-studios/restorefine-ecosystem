"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import { Barlow_Semi_Condensed } from "next/font/google";
import { Digits, PinIcon, type ThemeProps } from "@/components/parts";
import s from "./spudkingz.module.css";
import k from "./spudkingz-king.module.css";
import b from "./spudkingz-bowls.module.css";

/** CSS module classes the shared clock + footer need from each design */
type Styles = Record<string, string>;

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

type DesignProps = ThemeProps & { day: string; time: string; fonts: string };

/**
 * Spud Kingz offers three separate creatives (Client.variants), picked with ?variant=:
 * "pennant" (default), "king" and "bowls".
 */
export function SpudKingzTheme(props: ThemeProps) {
  const { client, launchAt, variant } = props;
  const day = new Date(launchAt)
    .toLocaleDateString("en-GB", { weekday: "long", timeZone: client.timeZone })
    .toUpperCase();
  const time = new Date(launchAt)
    .toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: client.timeZone })
    .replace(":00", "")
    .replace(" ", "")
    .toUpperCase();
  const design = { ...props, day, time, fonts: `${comicy.variable} ${barlow.variable}` };

  if (variant === "king") return <KingDesign {...design} />;
  if (variant === "bowls") return <BowlsDesign {...design} />;
  return <PennantDesign {...design} />;
}

/** Yellow table, green pennant, buttered jacket potato: built from the brand's "£5 Spuds" launch post */
function PennantDesign({ client, parts, showDays, ready, launched, burst, day, time, fonts }: DesignProps) {
  return (
    <main className={`${s.stage} ${fonts}`} data-launched={launched || undefined}>
      <Image className={`${s.shaker} ${s.salt}`} src={`${ASSETS}/shaker-salt.webp`} alt="" width={351} height={523} priority />
      <Image className={`${s.shaker} ${s.pepper}`} src={`${ASSETS}/shaker-pepper.webp`} alt="" width={377} height={456} priority />

      <section className={s.pennant}>
        <PennantShape />

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
              <Clock st={s} parts={parts} showDays={showDays} ready={ready} name={client.name} />
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

      <Footer st={s} client={client} />

      <FlyingSpuds burst={burst} />
    </main>
  );
}

/** Hours : minutes : seconds (days too when far out), styled by each design's module */
function Clock({ st, parts, showDays, ready, name }: { st: Styles; parts: ThemeProps["parts"]; showDays: boolean; ready: boolean; name: string }) {
  return (
    <div
      className={st.clock}
      role="timer"
      aria-label={`Time until ${name} opens`}
      data-ready={ready || undefined}
      data-units={showDays ? 4 : 3}
    >
      {showDays && (
        <>
          <Unit st={st} value={parts.days} label="Days" />
          <Colon st={st} />
        </>
      )}
      <Unit st={st} value={parts.hours} label="Hrs" />
      <Colon st={st} />
      <Unit st={st} value={parts.minutes} label="Mins" />
      <Colon st={st} />
      <Unit st={st} value={parts.seconds} label="Secs" />
    </div>
  );
}

function Unit({ st, value, label }: { st: Styles; value: number; label: string }) {
  return (
    <div className={st.unit}>
      <Digits value={value} className={st.digits} digitClassName={st.digit} />
      <span className={st.label}>{label}</span>
    </div>
  );
}

function Footer({ st, client, light }: { st: Styles; client: ThemeProps["client"]; light?: boolean }) {
  return (
    <footer className={st.foot}>
      {client.address && (
        <a className={st.address} href={client.address.mapsUrl} target="_blank" rel="noopener">
          <PinIcon />
          {client.address.label}
        </a>
      )}
      <a className={st.credit} href="https://restorefine.co.uk" target="_blank" rel="noopener">
        <Image src={light ? "/restorefine-mark.svg" : "/restorefine-mark-dark.svg"} alt="" width={20} height={20} />
        <span>
          Launch by <strong>RestoRefine</strong>
        </span>
      </a>
    </footer>
  );
}

/** The crowned foil spud on green, with turning sun rays: "The King is coming" */
function KingDesign({ client, parts, showDays, ready, launched, burst, day, time, fonts }: DesignProps) {
  return (
    <main className={`${k.stage} ${fonts}`} data-launched={launched || undefined}>
      <div className={k.hero}>
        <div className={k.rays} aria-hidden="true" />
        <Image
          className={k.spud}
          src={`${ASSETS}/crown-spud.webp`}
          alt="A cheesy jacket potato wearing a tin-foil crown"
          width={777}
          height={1000}
          priority
          sizes="(max-width: 800px) 60vw, 520px"
        />
      </div>

      <section className={k.copy}>
        <Image
          className={k.logo}
          src={client.logo.src}
          alt={client.logo.alt}
          width={client.logo.width}
          height={client.logo.height}
          priority
          sizes="120px"
        />
        {!launched ? (
          <>
            {/* Fixed lines so "to" never strands on its own; {" "} keeps the words apart for search engines */}
            <h1 className={k.title}>
              <span className={k.line}>
                The <span className={k.hl}>King</span>
              </span>{" "}
              <span className={k.line}>is coming</span>{" "}
              <span className={k.line}>to Wishaw</span>
            </h1>
            <Clock st={k} parts={parts} showDays={showDays} ready={ready} name={client.name} />
            <p className={k.when}>
              {day} {time} <span className={k.dot} aria-hidden="true" /> £5 spuds all day
            </p>
          </>
        ) : (
          <div className={k.open} aria-live="polite">
            <h1 className={k.title}>
              <span className={k.line}>
                The <span className={k.hl}>King</span>
              </span>{" "}
              <span className={k.line}>has arrived</span>
            </h1>
            <p className={k.when}>{client.launched.headline}. £5 spuds all day</p>
          </div>
        )}
      </section>

      <Image className={k.mascot} src={`${ASSETS}/mascot.webp`} alt="" width={650} height={900} />
      <Footer st={k} client={client} light />
      <FlyingSpuds burst={burst} />
    </main>
  );
}

/** Four loaded bowls at the corners of a dark table, toppings drifting: "Pull up, Wishaw" */
function BowlsDesign({ client, parts, showDays, ready, launched, burst, day, time, fonts }: DesignProps) {
  return (
    <main className={`${b.stage} ${fonts}`} data-launched={launched || undefined}>
      <Image className={`${b.bowl} ${b.tl}`} src={`${ASSETS}/bowl-chilli.webp`} alt="" width={640} height={536} priority />
      <Image className={`${b.bowl} ${b.tr}`} src={`${ASSETS}/bowl-pulled.webp`} alt="" width={640} height={512} priority />
      <Image className={`${b.bowl} ${b.bl}`} src={`${ASSETS}/bowl-mushroom.webp`} alt="" width={640} height={494} />
      <Image className={`${b.bowl} ${b.br}`} src={`${ASSETS}/bowl-tuna.webp`} alt="" width={640} height={493} />
      <Image className={`${b.topping} ${b.t1}`} src={`${ASSETS}/top-beans.webp`} alt="" width={360} height={137} />
      <Image className={`${b.topping} ${b.t2}`} src={`${ASSETS}/top-cheese.webp`} alt="" width={360} height={129} />
      <Image className={`${b.topping} ${b.t3}`} src={`${ASSETS}/top-slaw.webp`} alt="" width={360} height={152} />

      <section className={b.centre}>
        <Image
          className={b.logo}
          src={client.logo.src}
          alt={client.logo.alt}
          width={client.logo.width}
          height={client.logo.height}
          priority
          sizes="160px"
        />
        {!launched ? (
          <>
            <h1 className={b.title}>Pull up, Wishaw</h1>
            <p className={b.sub}>Doors open in</p>
            <Clock st={b} parts={parts} showDays={showDays} ready={ready} name={client.name} />
            <p className={b.ticket}>
              <span>{day} {time}</span>
              <span className={b.ticketPrice}>£5 spuds all day</span>
            </p>
          </>
        ) : (
          <div className={b.open} aria-live="polite">
            <h1 className={b.title}>We&apos;re open, Wishaw</h1>
            <p className={b.ticket}>
              <span>Come hungry</span>
              <span className={b.ticketPrice}>£5 spuds all day</span>
            </p>
          </div>
        )}
      </section>

      <Image className={b.mascot} src={`${ASSETS}/mascot.webp`} alt="" width={650} height={900} />
      <Footer st={b} client={client} light />
      <FlyingSpuds burst={burst} />
    </main>
  );
}

/**
 * The pennant drawn at its real pixel size (re-measured on resize), so the pointed bottom keeps a
 * fixed height instead of stretching up into the content on tall screens. Keep POINT in step with
 * --point in the CSS, which pads the content clear of it.
 */
function PennantShape() {
  const ref = useRef<SVGSVGElement>(null);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setBox({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  let fill = "";
  let line = "";
  if (box) {
    const { w, h } = box;
    const point = Math.min(60, Math.max(34, window.innerWidth * 0.09));
    const r = 10; // half the rounding stroke: inset so the rounded outline lands on the box edge
    const inset = 12; // gap between the outer edge and the inner line
    const yb = h - r - point; // where the sides meet the slant
    const yp = h - r; // tip of the point
    const k = point / (w / 2 - r); // slant gradient
    const off = inset * Math.sqrt(1 + k * k); // vertical shift for a parallel line `inset` px inside
    const xl = r + inset;
    const xr = w - r - inset;
    fill = `M${r} -40H${w - r}V${yb}L${w / 2} ${yp}L${r} ${yb}Z`;
    line = `M${xl} -40V${yb + k * inset - off}L${w / 2} ${yp - off}L${xr} ${yb + k * inset - off}V-40`;
  }

  return (
    <svg
      ref={ref}
      className={s.pennantShape}
      viewBox={box ? `0 0 ${box.w} ${box.h}` : undefined}
      aria-hidden="true"
    >
      {box && (
        <>
          <path className={s.pennantFill} d={fill} />
          <path className={s.pennantLine} d={line} />
        </>
      )}
    </svg>
  );
}

function Colon({ st }: { st: Styles }) {
  return (
    <span className={st.colon} aria-hidden="true">
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
