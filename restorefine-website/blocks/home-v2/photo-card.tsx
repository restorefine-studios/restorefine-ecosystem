import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const SIZES = "(min-width: 1024px) 24vw, (min-width: 640px) 40vw, 78vw";

/**
 * Tall photo card with its title over a dark fade at the bottom. With `href` it
 * links and shows a round arrow button; `children` render under the card.
 */
export function PhotoCard({
  src,
  alt,
  title,
  description,
  href,
  titleAs: Title = "span",
  children,
  logoBg,
}: {
  src: string;
  alt: string;
  title: string;
  /** Shown under the title, inside the card */
  description?: string;
  href?: string;
  titleAs?: "span" | "h3";
  children?: React.ReactNode;
  /** Logo thumbnails: shown whole on this background instead of cropped to fill */
  logoBg?: string;
}) {
  const frame = (
    <>
      {logoBg !== undefined && <span aria-hidden="true" className="absolute inset-0" style={{ background: logoBg || "#f4f4f5" }} />}
      <Image src={src} alt={alt} fill sizes={SIZES} className={`transition-transform duration-700 ease-out group-hover:scale-[1.04] ${logoBg !== undefined ? "object-contain p-[18%] pb-[38%]" : "object-cover"}`} />
      <span aria-hidden="true" className={`absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent ${description ? "h-3/4 from-zinc-950/90 via-zinc-950/60" : "h-1/2 from-zinc-950/80 via-zinc-950/30"}`} />
      {href && (
        <span aria-hidden="true" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-zinc-950 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.35)] transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white">
          <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
        </span>
      )}
      <span className="relative block p-5 sm:p-6">
        <Title className="v2-card-title block text-white">{title}</Title>
        {description && <span className="v2-small mt-3 block text-white/80">{description}</span>}
      </span>
    </>
  );
  // 3:4 at minimum; grows if the text needs more room
  const frameClass = "group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[2rem] bg-zinc-100";

  return (
    <>
      {href ? (
        <Link href={href} className={`${frameClass} no-underline`}>
          {frame}
        </Link>
      ) : (
        <div className={frameClass}>{frame}</div>
      )}
      {children}
    </>
  );
}

/** Horizontal, snapping row of PhotoCards that runs off the page edge, aligned to the page gutter */
export function PhotoRail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <ul tabIndex={0} aria-label={label} className="v2-rail v2-rail--bar v2-rail--inset flex gap-3 overflow-x-auto">
      {children}
    </ul>
  );
}

export function PhotoRailItem({ children }: { children: React.ReactNode }) {
  return <li className="w-[78vw] shrink-0 sm:w-[40vw] lg:w-[24vw]">{children}</li>;
}
