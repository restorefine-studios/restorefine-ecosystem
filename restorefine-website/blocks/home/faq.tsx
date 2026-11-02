import { homeContent, type PageContent } from "@/lib/homepageData";
import { FaqAccordion } from "./faq-accordion";
import { type } from "./type-scale";

function buildFaqSchema(faqs: PageContent["faqs"]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.items.map((faq) => {
      const list = ("list" in faq && faq.list ? faq.list : []).map((e) => `${e.label} ${e.text}`);
      return {
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: [...faq.answer, ...list].join(" ") },
      };
    }),
  };
}

export function Faq({ faqs = homeContent.faqs }: { faqs?: PageContent["faqs"] }) {
  const faqSchema = buildFaqSchema(faqs);
  return (
    <section id="faqs" className="grid scroll-mt-28 gap-12 py-24 lg:grid-cols-12 lg:gap-16 lg:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="lg:col-span-4">
        <h2 className={`${type.section} font-black uppercase leading-[0.98] tracking-[-0.04em] text-zinc-950 lg:sticky lg:top-28`}>{faqs.heading}</h2>
      </div>
      <div className="lg:col-span-8">
        <FaqAccordion items={faqs.items} />
      </div>
    </section>
  );
}
