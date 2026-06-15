"use client";

import { useRef, useEffect, useState } from "react";
import { Globe, ExternalLink, Monitor, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const IFRAME_W = 1920;
const IFRAME_H = 1080;

interface PortfolioBrowserPreviewProps {
  url: string;
  domain: string;
  label: string;
  defaultOpen?: boolean;
}

export function PortfolioBrowserPreview({ url, domain, label, defaultOpen = false }: PortfolioBrowserPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(defaultOpen);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    if (!open) return;
    const update = () => {
      if (containerRef.current) {
        setScale(containerRef.current.offsetWidth / IFRAME_W);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [open]);

  const viewportHeight = scale > 0 ? Math.round(IFRAME_H * scale) : 300;

  return (
    <div className="space-y-4">
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-sm font-medium text-white transition-all shadow-sm"
      >
        <Monitor size={15} />
        {open ? "Hide Website Preview" : "Preview Live Website"}
        <motion.span
          animate={{ rotate: open ? 0 : 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex items-center"
        >
          <ChevronUp size={14} className="text-white/70" />
        </motion.span>
      </button>

      {/* Slide-down iframe */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              ref={containerRef}
              className="w-full flex flex-col rounded-[24px] border border-black/8 overflow-hidden"
            >
              {/* Browser chrome */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-100 border-b border-black/8 shrink-0">
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 mx-4 flex items-center gap-2 bg-white rounded-md px-3 py-1 text-zinc-500 text-xs border border-black/8">
                  <Globe size={11} className="shrink-0 text-zinc-400" />
                  <span className="flex-1 truncate text-center">{domain}</span>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md hover:bg-zinc-200 transition-colors text-zinc-400 hover:text-zinc-700 shrink-0"
                  aria-label="Open in new tab"
                >
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* iframe viewport */}
              <div className="relative overflow-hidden bg-white" style={{ height: viewportHeight }}>
                {scale > 0 && (
                  <iframe
                    src={url}
                    title={label}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                    style={{
                      width: IFRAME_W,
                      height: IFRAME_H,
                      border: "none",
                      transformOrigin: "top left",
                      transform: `scale(${scale})`,
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
