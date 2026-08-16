"use client";

import { useEffect, useState } from "react";
import styles from "./IntroLoader.module.css";

const TOTAL_HOLD = 2400;
const LIFT_DURATION = 900;

const R_PATH =
  "M189.35,304.41c12.32-2.99,24.96-7.11,37.9-12.43,12.73-4.65,26-13.8,39.75-27.39,16.85-17.83,28.66-37.34,35.44-58.57,6.39-21.88,9.56-40.77,9.56-56.67-.42-28.04-6.16-51.81-17.25-71.33-11.3-19.54-23.82-34.73-37.57-45.54C232.71,10.81,194.79,0,143.4,0H0V482.39H86.56v-184.7h1.23l123.79,184.7h104.92l-127.14-177.98Zm-47.23-73.53h-55.56V83.39h55.56c16.85,0,30.95,2.34,42.27,7.01,10.49,4.88,18.94,11.25,25.3,19.1,6.39,7.22,10.6,14.98,12.66,23.27,2.06,8.29,3.08,16.14,3.08,23.57,.44,14.03-4.4,29.42-14.49,46.19-5.56,7.87-13.8,14.45-24.7,19.75-11.3,5.74-26.02,8.61-44.13,8.61Z";

export function IntroLoader() {
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const liftTimer = window.setTimeout(() => setLeaving(true), TOTAL_HOLD);
    const doneTimer = window.setTimeout(
      () => setDone(true),
      TOTAL_HOLD + LIFT_DURATION
    );

    return () => {
      window.clearTimeout(liftTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  if (done) {
    return null;
  }

  return (
    <div
      className={`${styles.loader} ${leaving ? styles.leaving : ""}`}
      aria-live="polite"
      aria-label="Loading RestoRefine"
    >
      <div className={styles.markWrap}>
        <svg
          className={styles.mark}
          viewBox="0 0 463.35 482.39"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path className={styles.rStroke} pathLength={1} d={R_PATH} />
          <path className={styles.rFill} d={R_PATH} />
          <circle className={styles.dot} cx="412.76" cy="431.8" r="50.6" />
        </svg>
        <span className={styles.screenReaderText}>Loading RestoRefine</span>
      </div>
    </div>
  );
}
