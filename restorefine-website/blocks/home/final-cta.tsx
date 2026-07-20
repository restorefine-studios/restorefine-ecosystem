import { ExpandingCta } from "@/blocks/portfolio/expanding-cta";
import { homeContent } from "@/lib/data";

const { headline, body, cta } = homeContent.finalCta;

export function FinalCta() {
  return (
    <ExpandingCta
      heading={
        <>
          {headline.prefix}{" "}
          <span
            className="text-zinc-950 font-normal normal-case"
            style={{ fontFamily: "var(--font-holiday), serif" }}
          >
            {headline.accent}
          </span>
        </>
      }
      body={body}
      ctaLabel={cta.label}
      ctaHref={cta.href}
    />
  );
}
