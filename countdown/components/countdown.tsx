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

export function Countdown({ client }: { client: Client }) {
  // ?launch=2026-11-14T15:30:00Z overrides the launch time for testing the real hand-over
  const [launchAt, setLaunchAt] = useState(() => new Date(client.launchAt).getTime());
  const [now, setNow] = useState<number | null>(null);
  const [confettiReady, setConfettiReady] = useState(false);
  const [preview, setPreview] = useState(false);
  const [burst, setBurst] = useState(0);
  const variants = client.variants?.map((v) => v.name) ?? [];
  const [variant, setVariant] = useState<string | undefined>(variants[0]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shootRef = useRef<Confetti | null>(null);
  const celebrated = useRef(false);
  const previewTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const override = new URLSearchParams(window.location.search).get("launch");
    if (override && !Number.isNaN(Date.parse(override))) setLaunchAt(Date.parse(override));
    // ?in=15 launches 15 seconds after the page opens (handy for watching the last moments)
    const inSecs = Number(new URLSearchParams(window.location.search).get("in"));
    if (inSecs > 0) setLaunchAt(Date.now() + inSecs * 1000);
    // ?variant=green previews another colour variant
    const v = new URLSearchParams(window.location.search).get("variant");
    if (v && client.variants?.some((x) => x.name === v)) setVariant(v);
  }, [client.variants]);

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
      // Drawn on the main thread on purpose: the worker option moves the canvas off-thread, which
      // can only happen once per canvas, so any re-mount (React dev mode, hot reload) left it dead
      shootRef.current = confetti.create(canvas, { resize: true, useWorker: false }) as Confetti;
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
    const colors = client.variants?.find((v) => v.name === variant)?.confetti ??
      client.confetti ?? [client.colors.accent, client.colors.deep, "#fbf7f7", "#ffffff", "#d9d9d9"];

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
  }, [client.colors, client.confetti, client.variants, variant]);

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
        variant={variant}
      />
      <canvas ref={canvasRef} className="confetti" aria-hidden="true" />
      {(variants.length > 1 || IS_DEV) && (
        <Toolbox>
          {variants.length > 1 &&
            variants.map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={v === variant}
                onClick={() => {
                  setVariant(v);
                  const url = new URL(window.location.href);
                  url.searchParams.set("variant", v);
                  window.history.replaceState(null, "", url);
                }}
              >
                {v}
              </button>
            ))}
          {IS_DEV && !isLive && (
            <button className="dev-launch" type="button" onClick={testLaunch} disabled={preview}>
              Launch now
            </button>
          )}
        </Toolbox>
      )}
    </>
  );
}

const TOOLBOX_IDLE_MS = 5000;

/**
 * Design switcher (and, locally, the test launch), tucked behind a faint corner button so visitors
 * don't see it. Tap the button or press V to open; it closes after a few idle seconds or an outside tap.
 */
function Toolbox({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const idle = useRef<ReturnType<typeof setTimeout>>(undefined);

  const poke = useCallback(() => {
    clearTimeout(idle.current);
    idle.current = setTimeout(() => setOpen(false), TOOLBOX_IDLE_MS);
  }, []);

  useEffect(() => {
    if (!open) return;
    poke();
    const outside = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => {
      clearTimeout(idle.current);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open, poke]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "v" || e.key === "V") setOpen((o) => !o);
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div ref={ref} className="toolbox" data-open={open || undefined} onPointerMove={open ? poke : undefined}>
      <button
        type="button"
        className="toolbox-toggle"
        aria-expanded={open}
        aria-label={open ? "Hide design options" : "Show design options"}
        onClick={() => setOpen((o) => !o)}
      >
        <span aria-hidden="true" />
      </button>
      {open && (
        <div className="toolbox-panel" onClick={poke}>
          {children}
        </div>
      )}
    </div>
  );
}
