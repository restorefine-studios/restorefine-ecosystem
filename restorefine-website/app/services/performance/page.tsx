// Case-study strip pulls published CMS projects; ISR keeps the page static.
export const revalidate = 300;

import type { Metadata } from "next";
import RPerformance from "@/blocks/service/rperformance";
import { getCmsCaseStudies } from "@/lib/portfolio-cms";

export const metadata: Metadata = {
  title: "Performance Marketing Agency Glasgow | SEO, CRO, PPC & More",
  description:
    "Turn your digital visibility into measurable growth with RestoRefine. Connect SEO, paid media, websites, CRO, and analytics to drive meaningful results.",
  alternates: { canonical: "https://www.restorefine.co.uk/services/performance" },
  openGraph: {
    title: "Performance Marketing Agency Glasgow | SEO, CRO, PPC & More",
    description:
      "Turn your digital visibility into measurable growth with RestoRefine. Connect SEO, paid media, websites, CRO, and analytics to drive meaningful results.",
    url: "https://www.restorefine.co.uk/services/performance",
  },
};

export default async function PerformancePage() {
  const caseStudies = await getCmsCaseStudies();
  return <RPerformance caseStudies={caseStudies} />;
}
