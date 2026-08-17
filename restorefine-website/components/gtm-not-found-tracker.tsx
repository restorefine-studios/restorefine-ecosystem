"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { pushGTMEvent } from "@/lib/gtm";

export function GTMNotFoundTracker() {
  const pathname = usePathname();
  const firedPath = useRef<string | null>(null);

  useEffect(() => {
    if (firedPath.current === pathname) return;
    firedPath.current = pathname;

    pushGTMEvent("page_not_found", {
      attempted_path: pathname,
    });
  }, [pathname]);

  return null;
}
