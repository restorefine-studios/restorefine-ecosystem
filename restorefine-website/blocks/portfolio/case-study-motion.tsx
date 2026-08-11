"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

export function ParallaxHeroMedia({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.08]);
  const y = useSpring(rawY, { stiffness: 52, damping: 28, mass: 0.7 });
  const scale = useSpring(rawScale, { stiffness: 52, damping: 28, mass: 0.7 });

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-[-5%] will-change-transform"
        style={reduce ? undefined : { y, scale }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function ParallaxHeroCopy({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -22]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.82], [1, 0.82]);
  const y = useSpring(rawY, { stiffness: 58, damping: 30, mass: 0.7 });
  const opacity = useSpring(rawOpacity, { stiffness: 58, damping: 30, mass: 0.7 });

  return (
    <motion.div ref={ref} style={reduce ? undefined : { y, opacity }}>
      {children}
    </motion.div>
  );
}

export function RevealBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 34 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.18 }}
      transition={{
        duration: 1.05,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
