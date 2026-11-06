import { PillarPageV2 } from "@/blocks/service-v2/pillar";
import type { PortfolioItem } from "@/lib/portfolio";
import { brandPillarContent as c } from "@/lib/pillar-content/brand-pillar";

/** /services/brand: the brand pillar content on the v2 pillar layout */
function RBrand({ caseStudies = [] }: { caseStudies?: PortfolioItem[] }) {
  return (
    <PillarPageV2
      heroImage="/services/branding.webp"
      hero={c.hero}
      heroAccent="Impressions"
      overview={{ intro: c.overview.intro, heading: c.overview.heading, headingTail: "Means Something", body: c.overview.body, caption: c.overview.caption }}
      servicesHeading="Our Branding Services"
      servicesTail="Services"
      services={c.subServices}
      process={{ heading: "A Simple Process, Built Around You.", tail: "Built Around You.", intro: [c.process.intro], steps: c.process.steps }}
      caseStudies={{
        heading: c.caseStudies.heading,
        tail: "Glasgow & Beyond",
        intro: (
          <>
            {c.caseStudies.body} <span className="font-medium text-zinc-950">{c.caseStudies.emphasis}</span>
          </>
        ),
        categories: ["Branding", "Menus"],
        extraItems: caseStudies,
      }}
    />
  );
}

export default RBrand;
