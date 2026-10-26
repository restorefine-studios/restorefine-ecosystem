"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Palette, X } from "lucide-react";

export type Design = { id: string; label: string; node: ReactNode };

const STORAGE_KEY = "connect-design";

/**
 * Preview tool for comparing page designs. The choice is kept in localStorage and mirrored to
 * `?design=` so a specific design can be shared as a link.
 */
export function DesignSwitcher({ designs }: { designs: Design[] }) {
  const [active, setActive] = useState(designs[0].id);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      // Storage can be blocked (private mode); fall back to the default design
    }
    const fromUrl = new URLSearchParams(window.location.search).get("design");
    const initial = [fromUrl, saved].find((id) => designs.some((d) => d.id === id));
    if (initial) setActive(initial);
    // Only on mount: the designs list is static
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function select(id: string) {
    setActive(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {}
    const url = new URL(window.location.href);
    url.searchParams.set("design", id);
    window.history.replaceState(null, "", url);
    window.scrollTo({ top: 0 });
  }

  return (
    <>
      {designs.find((d) => d.id === active)?.node}

      <div className="pointer-events-none fixed inset-x-0 top-[max(0.75rem,env(safe-area-inset-top))] z-50 flex justify-end px-3">
        <div
          role="toolbar"
          aria-label="Design preview"
          className="pointer-events-auto flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full bg-neutral-900/80 p-1 text-white shadow-lg ring-1 ring-white/10 backdrop-blur-xl [scrollbar-width:none]"
        >
          {open &&
            designs.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => select(d.id)}
                aria-pressed={d.id === active}
                className={`h-8 shrink-0 rounded-full px-2.5 text-[12px] font-medium transition active:scale-95 ${
                  d.id === active ? "bg-white text-black" : "text-white/75 hover:text-white"
                }`}
              >
                {d.label}
              </button>
            ))}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Hide design switcher" : "Switch design"}
            className="grid size-8 shrink-0 place-items-center rounded-full transition active:scale-90"
          >
            {open ? <X className="size-4" /> : <Palette className="size-4" />}
          </button>
        </div>
      </div>
    </>
  );
}
