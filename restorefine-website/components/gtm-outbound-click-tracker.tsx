"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { pushGTMEvent } from "@/lib/gtm";

const INTERNAL_HOSTS = new Set(["restorefine.co.uk", "www.restorefine.co.uk"]);
const SPECIAL_OUTBOUND_HOSTS = new Set([
  "wa.me",
  "www.instagram.com",
  "instagram.com",
  "uk.linkedin.com",
]);

function isRestorefineHost(hostname: string) {
  return INTERNAL_HOSTS.has(hostname) || hostname.endsWith(".restorefine.co.uk");
}

function isExcludedSpecialLink(url: URL) {
  if (SPECIAL_OUTBOUND_HOSTS.has(url.hostname)) return true;
  if (url.hostname.includes("google.") && url.pathname.includes("/maps")) return true;
  return false;
}

export function GTMOutboundClickTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (!["http:", "https:"].includes(url.protocol)) return;
      if (isRestorefineHost(url.hostname) || isExcludedSpecialLink(url)) return;

      pushGTMEvent("outbound_click", {
        url: url.href,
        location: pathname,
      });
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [pathname]);

  return null;
}
