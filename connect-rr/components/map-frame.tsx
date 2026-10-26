import { business } from "@/lib/business";

/** Oversized, non-interactive Google Maps embed; the parent must be `relative overflow-hidden`. */
export function MapFrame({ className = "" }: { className?: string }) {
  return (
    <iframe
      src={business.address.mapEmbedSrc}
      title="RestoRefine studio location"
      loading="lazy"
      tabIndex={-1}
      referrerPolicy="no-referrer-when-downgrade"
      className={`pointer-events-none absolute -left-[260px] -top-[110px] h-[calc(100%+200px)] w-[calc(100%+520px)] border-0 ${className}`}
    />
  );
}
