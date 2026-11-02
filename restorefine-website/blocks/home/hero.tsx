import { TrustStrip } from "@/components/trust-strip";
import { homeContent, type PageContent } from "@/lib/homepageData";
import { AccentText } from "./accent-text";
import { EnquireLink, WhatsAppLink } from "./cta-links";
import { type } from "./type-scale";

/* Server-rendered and visible from the first paint: the hero text is the LCP
 * element, so it must not wait for JavaScript to fade in. */
export default function Hero({ hero = homeContent.hero, ctas = homeContent.ctas }: { hero?: PageContent["hero"]; ctas?: PageContent["ctas"] }) {
  return (
    <section className="relative ml-[calc(-50vw+50%)] w-screen">
      <div className="relative overflow-hidden bg-[#f2f4f6] px-4 pb-8 pt-28 sm:px-8 lg:pt-32">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center text-center lg:min-h-[calc(100dvh-18rem)]">
          <h1 className={`${type.display} font-black uppercase leading-[0.95] tracking-[-0.045em] text-zinc-950`}>
            <AccentText text={hero.heading} accent={hero.accent} className="block pb-2 text-[1.2em] leading-[0.85] text-red-600" />
          </h1>
          <p className="mt-8 max-w-[60ch] text-base leading-relaxed text-zinc-600 sm:text-lg">{hero.body}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <EnquireLink {...ctas.enquire} />
            <WhatsAppLink {...ctas.whatsapp} />
          </div>
        </div>
        <TrustStrip inHero />
      </div>
    </section>
  );
}
