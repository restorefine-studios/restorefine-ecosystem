"use client";

import { useRef } from "react";
import { ChevronRight, X } from "lucide-react";
import { openingHours } from "@/lib/business";
import { formatTime, useBusinessStatus } from "@/lib/use-business-status";

/** Studio clock and open/closed line; tapping it opens the full week's hours. */
export function StatusPill() {
  const status = useBusinessStatus();
  const dialogRef = useRef<HTMLDialogElement>(null);

  if (!status) {
    // Reserve the space so nothing jumps once the status loads
    return <div className="h-7 w-56" aria-hidden="true" />;
  }

  return (
    <>
      {/* Studio clock + plain-text status; no tinted capsule */}
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`${status.isOpen ? "Open" : "Closed"}, ${status.detail}. See opening hours`}
        className="group inline-flex h-7 items-center gap-2 text-[13px] transition active:opacity-60"
      >
        <span
          title="Time in Glasgow"
          className="rounded-md border border-line/25 px-1.5 py-px font-medium tabular-nums tracking-tight text-ink"
        >
          {status.clock}
        </span>
        <span className="text-muted">
          <span className={`font-semibold ${status.isOpen ? "text-emerald-600 dark:text-emerald-400" : "text-brand"}`}>
            {status.isOpen ? "Open" : "Closed"}
          </span>
          {status.detail && <> · {status.detail}</>}
        </span>
        <ChevronRight className="size-3.5 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
        className="m-auto w-[min(22rem,calc(100vw-2.5rem))] rounded-3xl bg-surface p-0 text-ink shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      >
        <div className="p-5">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Studio hours</p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
              className="grid size-8 place-items-center rounded-full bg-page"
            >
              <X className="size-4" />
            </button>
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            {openingHours.map((d, i) => {
              const isToday = status.todayIndex === i;
              return (
                <div key={d.day} className={`flex justify-between ${isToday ? "font-semibold text-ink" : "text-muted"}`}>
                  <dt>
                    {d.day}
                    {isToday && <span className="ml-1.5 text-brand">· Today</span>}
                  </dt>
                  <dd>{d.open ? `${formatTime(d.open)} – ${formatTime(d.close)}` : "Closed"}</dd>
                </div>
              );
            })}
          </dl>
          <p className="mt-4 text-sm text-muted">
            Visits by appointment. Out of hours? Leave a WhatsApp or enquiry and we&apos;ll reply next working day.
          </p>
        </div>
      </dialog>
    </>
  );
}
