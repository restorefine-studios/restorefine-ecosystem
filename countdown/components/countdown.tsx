"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Client } from "@/lib/clients";
import type { ThemeProps } from "@/components/parts";
import { SpotlightTheme } from "@/components/themes/spotlight";
import { SpudKingzTheme } from "@/components/themes/spudkingz";

type Confetti = (opts?: import("canvas-confetti").Options) => Promise<null> | null;

const themes: Record<NonNullable<Client["theme"]>, (props: ThemeProps) => React.ReactNode> = {
  spotlight: SpotlightTheme,
  spudkingz: SpudKingzTheme,
};

// Local `pnpm dev` only: production builds drop the test button entirely
const IS_DEV = process.env.NODE_ENV === "development";
const PREVIEW_MS = 7000;
const shooters = new WeakMap<HTMLCanvasElement, Confetti>();

export function Countdown({ client }: { client: Client }) {
  // ?launch=2026-11-14T15:30:00Z overrides the launch time for testing the real hand-over
  const [launchAt, setLaunchAt] = useState(() => new Date(client.launchAt).getTime());
  const [now, setNow] = useState<number | null>(null);
  const [confettiReady, setConfettiReady] = useState(false);
  const [preview, setPreview] = useState(false);
  const [burst, setBurst] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shootRef = useRef<Confetti | null>(null);
  const celebrated = useRef(false);
  const previewTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

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
      const canvas = canvasRef.current;
      if (cancelled || !canvas) return;
      // A canvas can hand itself to the worker only once, and React dev mode mounts effects twice,
      // so reuse the first instance for this canvas instead of creating another (which throws)
      let shoot = shooters.get(canvas);
      if (!shoot) {
        shoot = confetti.create(canvas, { resize: true, useWorker: true }) as Confetti;
        shooters.set(canvas, shoot);
      }
      shootRef.current = shoot;
      setConfettiReady(true);
    });
    return () => {
      cancelled = true;
      shootRef.current = null;
    };
  }, []);

  useEffect(() => () => clearTimeout(previewTimer.current), []);

  const remaining = now === null ? null : Math.max(0, launchAt - now);
  const isLive = remaining === 0;

  const celebrate = useCallback(() => {
    setBurst((b) => b + 1);
    const shoot = shootRef.current;
    if (!shoot) return;
    const colors = client.confetti ?? [client.colors.accent, client.colors.deep, "#fbf7f7", "#ffffff", "#d9d9d9"];

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
  }, [client.colors, client.confetti]);

  // The launch moment: fires when the clock hits zero, and also for anyone who
  // opens the page after launch (waits for the confetti script to finish loading)
  useEffect(() => {
    if (isLive && confettiReady && !celebrated.current) {
      celebrated.current = true;
      clearTimeout(previewTimer.current);
      setPreview(false);
      celebrate();
    }
  }, [isLive, confettiReady, celebrate]);

  // Local test: plays the launch moment, then hands back to the clock, which never stopped
  const testLaunch = () => {
    if (isLive || preview) return;
    setPreview(true);
    celebrate();
    previewTimer.current = setTimeout(() => setPreview(false), PREVIEW_MS);
  };

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
    // Re-applied every tick: Next sets the page's metadata title after hydration
  }, [now, remaining, parts, client.name]);

  const Theme = themes[client.theme ?? "spotlight"];

  return (
    <>
      <Theme
        client={client}
        parts={parts}
        showDays={parts.days > 0}
        ready={now !== null}
        launched={isLive || preview}
        burst={burst}
        launchAt={launchAt}
      />
      <canvas ref={canvasRef} className="confetti" aria-hidden="true" />
      {IS_DEV && !isLive && (
        <button className="dev-launch" type="button" onClick={testLaunch} disabled={preview}>
          Launch now
        </button>
      )}
    </>
  );
}
