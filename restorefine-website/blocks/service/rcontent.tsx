import { PillarPageV2 } from "@/blocks/service-v2/pillar";
import type { PortfolioItem } from "@/lib/portfolio";
import { contentPillarContent as c } from "@/lib/pillar-content/content-pillar";
import { tiktokVideos } from "@/lib/tiktok-videos";

/** /services/content: the content pillar content on the v2 pillar layout */
function RContent({ caseStudies = [] }: { caseStudies?: PortfolioItem[] }) {
  return (
    <PillarPageV2
      heroImage="/services/content.webp"
      hero={c.hero}
      heroAccent="Content"
      overview={{ intro: c.overview.intro, heading: c.overview.heading, headingTail: "Your content should say it with purpose.", body: [c.overview.body], problems: c.overview.problems }}
      servicesHeading="Our Services"
      servicesTail="Services"
      services={c.subServices}
      process={{ heading: "From Strategy to Content That Performs", tail: "Content That Performs", intro: [c.process.intro], steps: c.process.steps }}
      caseStudies={{ heading: "Content That Creates More Than Attention.", tail: "More Than Attention.", intro: c.caseStudies.body, categories: ["Media", "Branding"], extraItems: caseStudies, videos: tiktokVideos }}
    />
  );
}

export default RContent;
