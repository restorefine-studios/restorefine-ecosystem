import { BriefcaseBusiness, House } from "lucide-react";
import { GoogleG, GoogleStars, googleReviewsLinkProps } from "@/components/google-reviews";

/** Shared proof points for the public marketing pages. */
export function TrustStrip({ inHero = false }: { inHero?: boolean }) {
  return (
    <aside aria-label="Why choose RestoRefine" className={`relative left-1/2 w-screen shrink-0 -translate-x-1/2 self-start border-y border-zinc-300/30 bg-[#f2f4f6]/40 text-zinc-600 backdrop-blur-sm ${inHero ? "mt-14 sm:mt-16" : "my-0"}`}>
      <ul className="mx-auto grid max-w-5xl grid-cols-3 items-start divide-x divide-zinc-300/30 px-4 py-3 sm:px-8 sm:py-4">
        <li className="flex min-w-0 justify-center px-2 sm:px-6">
          <a
            {...googleReviewsLinkProps}
            aria-label="5 star Google rating, read our Google reviews"
            className="group flex flex-col items-center gap-1.5 text-center no-underline"
          >
            <span aria-hidden="true" className="flex h-6 items-center gap-1.5">
              <GoogleG className="h-4 w-4 sm:h-5 sm:w-5" />
              <GoogleStars className="h-3 w-3 sm:h-4 sm:w-4" />
            </span>
            <span className="max-w-[8rem] text-[10px] font-medium uppercase leading-relaxed tracking-[0.09em] text-zinc-600 transition-colors group-hover:text-zinc-950 sm:text-[11px]">5 star Google<br />rating</span>
          </a>
        </li>
        <li className="flex min-w-0 flex-col items-center gap-1.5 px-2 text-center sm:px-6">
          <BriefcaseBusiness aria-hidden="true" className="h-6 w-6 shrink-0 text-zinc-400" strokeWidth={1.25} />
          <span className="max-w-[8rem] text-[10px] font-medium uppercase leading-relaxed tracking-[0.09em] sm:text-[11px]">Real Client<br />work</span>
        </li>
        <li className="flex min-w-0 flex-col items-center gap-1.5 px-2 text-center sm:px-6">
          <House aria-hidden="true" className="h-6 w-6 shrink-0 text-zinc-400" strokeWidth={1.25} />
          <span className="max-w-[8rem] text-[10px] font-medium uppercase leading-relaxed tracking-[0.09em] sm:text-[11px]">All services<br />under one roof</span>
        </li>
      </ul>
    </aside>
  );
}
