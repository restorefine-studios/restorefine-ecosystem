// Case-study strip pulls published CMS projects; ISR keeps the page static.
export const revalidate = 300;

import type { Metadata } from "next";
import RBrand from "@/blocks/service/rbrand";
import { getCmsCaseStudies } from "@/lib/portfolio-cms";

export const metadata: Metadata = {
  title: "Brand | RestoRefine",
  description:
    "With RestoRefine Branding, develop a compelling brand that captures attention and builds trust — logo design, brand identity development, and social media graphics.",
  alternates: { canonical: "https://www.restorefine.co.uk/services/brand" },
  openGraph: {
    title: "Brand | RestoRefine",
    description:
      "With RestoRefine Branding, develop a compelling brand that captures attention and builds trust — logo design, brand identity development, and social media graphics.",
    url: "https://www.restorefine.co.uk/services/brand",
  },
};

export default async function BrandPage() {
  const caseStudies = await getCmsCaseStudies();
  return <RBrand caseStudies={caseStudies} />;
}
