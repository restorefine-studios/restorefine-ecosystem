"use client";

import { useCallback, useEffect, useRef } from "react";

/*
 * Client half of the enquiry spam guard (server half: lib/spam-check.ts).
 * Every form posting to /api/send-email renders `guardFields` inside the form
 * and spreads `await guardPayload(formData)` into its request body.
 *
 *  - honeypot: a hidden "website" input people never see but bots fill in
 *  - time trap: how long the form was on screen before it was sent
 *  - Cloudflare Turnstile: only when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set
 */

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let scriptPromise: Promise<Turnstile> | null = null;

function loadTurnstile(): Promise<Turnstile> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile failed to load")));
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error("Turnstile failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

export function useSpamGuard() {
  const startedAt = useRef<number | null>(null);
  const widgetEl = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const token = useRef<string | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    if (!SITE_KEY || !widgetEl.current) return;

    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !widgetEl.current) return;
        widgetId.current = turnstile.render(widgetEl.current, {
          sitekey: SITE_KEY,
          appearance: "interaction-only",
          "response-field": false,
          callback: (t: string) => (token.current = t),
          "expired-callback": () => (token.current = null),
          "error-callback": () => (token.current = null),
        });
      })
      .catch(() => {
        /* the server rejects the send and the form shows its error state */
      });

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, []);

  /** Fields to spread into the request body; waits briefly for a Turnstile token */
  const guardPayload = useCallback(async (fd: FormData) => {
    if (SITE_KEY) {
      for (let waited = 0; !token.current && waited < 8000; waited += 250) {
        await new Promise((r) => setTimeout(r, 250));
      }
    }
    return {
      website: (fd.get("website") as string | null) ?? "",
      elapsedMs: startedAt.current ? Date.now() - startedAt.current : 0,
      turnstileToken: token.current ?? "",
    };
  }, []);

  /** Turnstile tokens are single use, so get a fresh one after every send */
  const resetGuard = useCallback(() => {
    token.current = null;
    if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
  }, []);

  const guardFields = (
    <>
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      {SITE_KEY && <div ref={widgetEl} className="col-span-full empty:hidden" />}
    </>
  );

  return { guardFields, guardPayload, resetGuard };
}
