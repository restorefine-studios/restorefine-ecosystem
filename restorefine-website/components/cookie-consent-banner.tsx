"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCookieConsent } from "./cookie-consent-provider";

export function CookieConsentBanner() {
  const { bannerOpen, accept, reject } = useCookieConsent();

  return (
    <AnimatePresence>
      {bannerOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/10 bg-zinc-900 px-6 py-5 md:px-10"
        >
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm leading-relaxed text-zinc-300">
              We use cookies to understand site traffic and improve your experience. Read our{" "}
              <Link href="/legal/cookies" className="text-red-500 underline hover:text-red-400">
                Cookie Policy
              </Link>{" "}
              to learn more.
            </p>
            <div className="flex w-full flex-shrink-0 gap-3 md:w-auto">
              <button
                onClick={reject}
                className="flex-1 rounded-full border border-white/20 px-6 py-3 text-xs font-black uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-white/10 md:flex-none"
              >
                Reject All
              </button>
              <button
                onClick={accept}
                className="flex-1 rounded-full bg-red-600 px-6 py-3 text-xs font-black uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-red-500 md:flex-none"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
