"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyAddressButton({ address, className }: { address: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (e.g. insecure context); fail silently
    }
  }

  const Icon = copied ? Check : Copy;
  return (
    <button type="button" onClick={copy} className={className}>
      <Icon className="size-4" aria-hidden="true" />
      <span className="sr-only" aria-live="polite">{copied ? "Address copied" : "Copy address"}</span>
    </button>
  );
}
