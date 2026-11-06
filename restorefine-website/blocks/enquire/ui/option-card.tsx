"use client";

import type { CSSProperties, PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { Check } from "lucide-react";
import type { Option } from "../flow";
import { KineticFace } from "./kinetic";

const ease = [0.16, 1, 0.3, 1] as const;

function Card({ option, index, count, selected, onSelect, budget }: { option: Option; index: number; count: number; selected: boolean; onSelect: () => void; budget: number }) {
  const reduce = useReducedMotion();
  // Tilt toward the pointer, sprung so it settles softly
  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const tilt = (e: PointerEvent<HTMLButtonElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    rx.set(((e.clientY - r.top) / r.height - 0.5) * -12);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };
  // An odd last card fills the row on the two-column phone grid
  const lastOdd = index === count - 1 && count % 2 === 1;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      onPointerMove={tilt}
      onPointerLeave={reset}
      aria-pressed={selected}
      initial={reduce ? false : { opacity: 0, y: 24, rotateX: -35 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.7, delay: reduce ? 0 : 0.1 + index * 0.06, ease }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 800, "--card-bg": selected ? "#09090b" : "#ffffff" } as unknown as CSSProperties}
      className={`group relative overflow-hidden rounded-[1.25rem] text-left min-h-[9.5rem] sm:min-h-[10.5rem] transition-[background-color,box-shadow] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${
        lastOdd ? "col-span-2 sm:col-span-1" : ""
      } ${selected ? `bg-zinc-950 text-white shadow-[0_24px_50px_-20px_rgba(9,9,11,0.6)]` : "bg-white text-zinc-950 shadow-[0_1px_0_rgba(24,24,27,0.04)] ring-1 ring-zinc-200 hover:shadow-[0_24px_50px_-28px_rgba(24,24,27,0.5)] hover:ring-zinc-300"}`}
    >
      <span className="sr-only">{option.title}</span>
      <KineticFace id={option.id} title={option.title} on={selected} budget={budget} />
      {selected && (
        <motion.span
          aria-hidden="true"
          initial={reduce ? false : { scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
          className="absolute right-3 top-3 z-30 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white"
        >
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </motion.span>
      )}
    </motion.button>
  );
}

/**
 * The answers for the later questions as kinetic 3D cards: each answer's name acts
 * itself out (see ./kinetic). Two columns on phones, three from sm up.
 */
export function OptionCards({ options, selected, onSelect, meter = false }: { options: Option[]; selected: string | null; onSelect: (id: string) => void; meter?: boolean }) {
  return (
    <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-2.5 sm:mt-12 sm:grid-cols-3 sm:gap-3" style={{ perspective: 1200 }}>
      {options.map((o, i) => (
        <Card key={o.id} option={o} index={i} count={options.length} selected={selected === o.id} onSelect={() => onSelect(o.id)} budget={meter ? i + 1 : 0} />
      ))}
    </div>
  );
}
