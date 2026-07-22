"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type ConsentValue = "accepted" | "rejected" | null;

type CookieConsentContextValue = {
  consent: ConsentValue;
  bannerOpen: boolean;
  accept: () => void;
  reject: () => void;
  openSettings: () => void;
};

const STORAGE_KEY = "rcn-cookie-consent";

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentValue>(null);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }

    if (stored === "accepted" || stored === "rejected") {
      setConsent(stored);
    } else {
      setBannerOpen(true);
    }
  }, []);

  const persist = (value: "accepted" | "rejected") => {
    setConsent(value);
    setBannerOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // localStorage unavailable (e.g. private browsing) — choice still
      // applies for this session, banner will just reappear next visit.
    }
  };

  const value: CookieConsentContextValue = {
    consent,
    bannerOpen,
    accept: () => persist("accepted"),
    reject: () => persist("rejected"),
    openSettings: () => setBannerOpen(true),
  };

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  return ctx;
}
