"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import type { Client } from "@/lib/clients";
import { formatLaunch } from "@/lib/format";

type Confetti = (opts?: import("canvas-confetti").Options) => Promise<null> | null;

export function Countdown({ client }: { client: Client }) {
  // ?launch=2026-11-14T15:30:00Z overrides the launch time for testing the real hand-over
  const [launchAt, setLaunchAt] = useState(() => new Date(client.launchAt).getTime());
  const [now, setNow] = useState<number | null>(null);
  const [confettiReady, setConfettiReady] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shootRef = useRef<Confetti | null>(null);
  const celebrated = useRef(false);

  useEffect(() => {
    const override = new URLSearchParams(window.location.search).get("launch");
    if (override && !Number.isNaN(Date.parse(override))) setLaunchAt(Date.parse(override));
  }, []);

  // Tick on the second boundary so every digit changes together
  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    const tick = () => {
      setNow(Date.now());
      id = setTimeout(tick, 1000 - (Date.now() % 1000) + 5);
    };
    tick();
    return () => clearTimeout(id);
  }, []);

  // Confetti runs on its own canvas, loaded only in the browser
  useEffect(() => {
    let cancelled = false;
    import("canvas-confetti").then(({ default: confetti }) => {
      if (cancelled || !canvasRef.current) return;
      shootRef.current = confetti.create(canvasRef.current, { resize: true, useWorker: true });
      setConfettiReady(true);
    });
    return () => {
      cancelled = true;
      shootRef.current = null;
    };
  }, []);

  const remaining = now === null ? null : Math.max(0, launchAt - now);
  const isLive = remaining === 0;

  const celebrate = useCallback(
    () => {
      const shoot = shootRef.current;
      if (!shoot) return;
      const colors = [client.colors.accent, client.colors.deep, "#fbf7f7", "#ffffff", "#d9d9d9"];

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        shoot({ particleCount: 80, spread: 90, origin: { y: 0.6 }, colors });
        return;
      }
      // Big centre burst
      shoot({ particleCount: 160, spread: 100, startVelocity: 55, origin: { x: 0.5, y: 0.55 }, colors, scalar: 1.1 });
      // Side cannons for a few seconds
      const end = Date.now() + 6000;
      const frame = () => {
        shoot({ particleCount: 4, angle: 60, spread: 55, startVelocity: 70, origin: { x: 0, y: 0.9 }, colors });
        shoot({ particleCount: 4, angle: 120, spread: 55, startVelocity: 70, origin: { x: 1, y: 0.9 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
      // Ribbon-cut shower from the top
      setTimeout(() => {
        shoot({
          particleCount: 120,
          spread: 160,
          startVelocity: 25,
          gravity: 0.8,
          ticks: 300,
          origin: { x: 0.5, y: -0.1 },
          colors,
          shapes: ["square"],
          scalar: 1.2,
        });
      }, 700);
    },
    [client.colors],
  );

  // The launch moment: fires when the clock hits zero, and also for anyone who
  // opens the page after launch (waits for the confetti script to finish loading)
  useEffect(() => {
    if (isLive && confettiReady && !celebrated.current) {
      celebrated.current = true;
      celebrate();
    }
  }, [isLive, confettiReady, celebrate]);

  const parts = useMemo(() => {
    const s = Math.floor((remaining ?? 0) / 1000);
    return {
      days: Math.floor(s / 86400),
      hours: Math.floor((s % 86400) / 3600),
      minutes: Math.floor((s % 3600) / 60),
      seconds: s % 60,
    };
  }, [remaining]);

  useEffect(() => {
    if (remaining === null) return;
    const pad = (n: number) => String(n).padStart(2, "0");
    document.title =
      remaining > 0
        ? `${pad(parts.hours + parts.days * 24)}:${pad(parts.minutes)}:${pad(parts.seconds)} until ${client.name} opens`
        : `${client.name} is open`;
  }, [remaining, parts, client.name]);

  const when = formatLaunch(launchAt, client.timeZone);
  const showDays = parts.days > 0;

  const stageVars = {
    "--accent": client.colors.accent,
    "--deep": client.colors.deep,
    "--ink": client.colors.ink,
  } as CSSProperties;

  return (
    <>
      <main className="stage" style={stageVars} data-launched={isLive || undefined}>
        <header className="brand">
          <Image
            src={client.logo.src}
            alt={client.logo.alt}
            width={client.logo.width}
            height={client.logo.height}
            priority
            sizes="(max-width: 640px) 60vw, 360px"
          />
        </header>

        <section className="centre">
          {!isLive ? (
            <div className="counting">
              <h1 className="kicker">Opening in</h1>

              <div
                className="clock"
                role="timer"
                aria-label={`Time until ${client.name} opens`}
                data-ready={now !== null || undefined}
                data-units={showDays ? 4 : 3}
              >
                {showDays && (
                  <>
                    <Unit value={parts.days} label="Days" />
                    <Colon />
                  </>
                )}
                <Unit value={parts.hours} label="Hours" />
                <Colon />
                <Unit value={parts.minutes} label="Minutes" />
                <Colon />
                <Unit value={parts.seconds} label="Seconds" />
              </div>

              <p className="when">{when}</p>
            </div>
          ) : (
            <div className="launched" aria-live="polite">
              <h1 className="open">{client.launched.headline}</h1>
              <p className="open-sub">{client.launched.body}</p>
              <p className="when">{client.launched.tag}</p>
            </div>
          )}

          {client.address && (
            <a className="address" href={client.address.mapsUrl} target="_blank" rel="noopener">
              <PinIcon />
              {client.address.label}
            </a>
          )}
        </section>

        <footer className="foot">
          <a className="credit" href="https://restorefine.co.uk" target="_blank" rel="noopener">
            <Image src="/restorefine-mark.svg" alt="" width={22} height={22} />
            <span>
              Launch by <strong>RestoRefine</strong>
            </span>
          </a>
        </footer>
      </main>

      <div className="grain" aria-hidden="true" />
      <canvas ref={canvasRef} className="confetti" aria-hidden="true" />
    </>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  const digits = String(value).padStart(2, "0").split("");
  return (
    <div className="unit">
      <div className="digits">
        {digits.map((ch, i) => (
          <span className="digit" key={i}>
            {/* New key per value remounts the span, which replays the roll animation */}
            <span key={ch}>{ch}</span>
          </span>
        ))}
      </div>
      <div className="label">{label}</div>
    </div>
  );
}

function Colon() {
  return (
    <div className="colon" aria-hidden="true">
      :
    </div>
  );
}

// Phosphor "MapPin" (fill)
function PinIcon() {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true">
      <path
        fill="currentColor"
        d="M128 16a88.1 88.1 0 0 0-88 88c0 75.3 80 132.17 83.41 134.55a8 8 0 0 0 9.18 0C136 236.17 216 179.3 216 104a88.1 88.1 0 0 0-88-88Zm0 56a32 32 0 1 1-32 32 32 32 0 0 1 32-32Z"
      />
    </svg>
  );
}
