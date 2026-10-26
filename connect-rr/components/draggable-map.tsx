"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { business } from "@/lib/business";

// The embed is rendered 400px wider on each side and 300px taller top and bottom than its frame, and
// dragging slides it within that margin. Limits stop short of Google's "View larger map" card (top
// left, ~110px tall) and its bottom controls (~110px), so they never come into view.
const RANGE_X = 380;
const RANGE_DOWN = 180; // dragging down reveals the top edge
const RANGE_UP = 190; // dragging up reveals the bottom edge
const RESET_AFTER_MS = 2000;

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/**
 * Pannable, non-interactive map preview. The page handles the drag itself (the cross-origin embed
 * can't report activity), and eases back to the studio pin after a few seconds left alone.
 * The parent must be `relative overflow-hidden`.
 */
export function DraggableMap({ iframeClassName = "" }: { iframeClassName?: string }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ px: number; py: number; x: number; y: number } | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    clearTimeout(resetTimer.current);
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStart.current = { px: e.clientX, py: e.clientY, ...offset };
    setDragging(true);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const start = dragStart.current;
    if (!start) return;
    setOffset({
      x: clamp(start.x + e.clientX - start.px, -RANGE_X, RANGE_X),
      y: clamp(start.y + e.clientY - start.py, -RANGE_UP, RANGE_DOWN),
    });
  }

  function onPointerUp() {
    dragStart.current = null;
    setDragging(false);
    resetTimer.current = setTimeout(() => setOffset({ x: 0, y: 0 }), RESET_AFTER_MS);
  }

  return (
    // touch-none so a drag on the map pans it instead of scrolling the page
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className={`absolute inset-0 touch-none select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
    >
      <iframe
        src={business.address.mapEmbedSrc}
        title="RestoRefine studio location"
        loading="lazy"
        tabIndex={-1}
        referrerPolicy="no-referrer-when-downgrade"
        style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
        className={`pointer-events-none absolute -left-[400px] -top-[300px] h-[calc(100%+600px)] w-[calc(100%+800px)] border-0 ${
          dragging ? "" : "transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        } ${iframeClassName}`}
      />
    </div>
  );
}
