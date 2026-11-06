import { PillarPageV2 } from "@/blocks/service-v2/pillar";
import type { PortfolioItem } from "@/lib/portfolio";
import { blogPosts } from "@/lib/blogContent";
import { performancePillarContent as c } from "@/lib/pillar-content/performance-pillar";

/** /services/performance: the performance pillar content on the v2 pillar layout */
function RPerformance({ caseStudies = [] }: { caseStudies?: PortfolioItem[] }) {
  const posts = blogPosts.filter((p) => c.insights.blogSlugs.includes(p.slug)).slice(0, 3);
  return (
    <PillarPageV2
      heroImage="/services/paid-ads-growth.webp"
      hero={c.hero}
      heroAccent="Results."
      overview={{ heading: c.overview.heading, headingTail: "Growth Engine", body: [c.overview.body], problems: c.overview.problems }}
      servicesHeading="Our Services"
      servicesTail="Services"
      services={c.subServices}
      process={{ heading: "From Strategy to Measurable Growth", tail: "Measurable Growth", intro: c.process.intro, steps: c.process.steps }}
      insights={{ heading: "Ideas That Move Your Marketing Forward", tail: "Forward", body: c.insights.body, posts }}
      caseStudies={{ heading: c.caseStudies.heading, intro: c.caseStudies.body, categories: ["Branding", "Menus", "Media"], extraItems: caseStudies }}
    />
  );
}

export default RPerformance;
