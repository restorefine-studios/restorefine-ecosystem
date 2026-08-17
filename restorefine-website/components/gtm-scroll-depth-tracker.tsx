"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { pushGTMEvent } from "@/lib/gtm";

const TRACKED_PATHS = new Set(["/", "/company", "/services", "/portfolio"]);
const THRESHOLDS = [25, 50, 75, 90] as const;

export function GTMScrollDepthTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!TRACKED_PATHS.has(pathname)) return;

    const fired = new Set<number>();
    let ticking = false;

    const checkScrollDepth = () => {
      ticking = false;

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const percent = Math.min(100, Math.round((window.scrollY / scrollableHeight) * 100));

      THRESHOLDS.forEach((threshold) => {
        if (percent >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          pushGTMEvent("scroll_depth", {
            percent: threshold,
            page: pathname,
          });
        }
      });
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(checkScrollDepth);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    checkScrollDepth();

    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}
