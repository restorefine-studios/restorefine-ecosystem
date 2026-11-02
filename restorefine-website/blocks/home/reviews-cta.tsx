import { homeContent, type PageContent } from "@/lib/homepageData";
import { WhatsAppLink } from "./cta-links";

export function ReviewsCta({ cta = homeContent.reviewsCta }: { cta?: PageContent["reviewsCta"] }) {
  return (
    <div className="section-bleed flex justify-center bg-zinc-50 pb-20 pt-4">
      <WhatsAppLink {...cta} tone="dark" />
    </div>
  );
}
