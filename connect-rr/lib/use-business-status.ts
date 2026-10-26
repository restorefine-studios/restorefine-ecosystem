"use client";

import { useEffect, useState } from "react";
import { openingHours, TIME_ZONE } from "./business";

export type BusinessStatus = {
  isOpen: boolean;
  closedAllDay: boolean;
  todayIndex: number;
  /** e.g. "until 5:30pm" or "opens Monday 9am" */
  detail: string;
  /** Current studio time, 24h, e.g. "20:14" */
  clock: string;
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 || 12;
  return m ? `${hour}:${String(m).padStart(2, "0")}${suffix}` : `${hour}${suffix}`;
}

// Current day/time at the studio, regardless of the visitor's own time zone
function londonNow(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    dayIndex: WEEKDAYS.indexOf(get("weekday")),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
    clock: `${get("hour")}:${get("minute")}`,
  };
}

export function getBusinessStatus(date = new Date()): BusinessStatus {
  const { dayIndex, minutes, clock } = londonNow(date);
  const today = openingHours[dayIndex];

  if (today.open && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { isOpen: true, closedAllDay: false, todayIndex: dayIndex, detail: `until ${formatTime(today.close)}`, clock };
  }

  const closedAllDay = !today.open;
  if (today.open && minutes < toMinutes(today.open)) {
    return { isOpen: false, closedAllDay, todayIndex: dayIndex, detail: `opens today ${formatTime(today.open)}`, clock };
  }

  for (let offset = 1; offset <= 7; offset++) {
    const next = openingHours[(dayIndex + offset) % 7];
    if (next.open) {
      const when = offset === 1 ? "tomorrow" : next.day;
      return { isOpen: false, closedAllDay, todayIndex: dayIndex, detail: `opens ${when} ${formatTime(next.open)}`, clock };
    }
  }

  return { isOpen: false, closedAllDay, todayIndex: dayIndex, detail: "", clock };
}

/** Computed on the client only so the static page never shows a stale server-rendered status. */
export function useBusinessStatus() {
  const [status, setStatus] = useState<BusinessStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getBusinessStatus());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return status;
}
