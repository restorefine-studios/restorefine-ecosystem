// Case-study strip pulls published CMS projects; ISR keeps the page static.
export const revalidate = 300;

import type { Metadata } from "next";
import RBrand from "@/blocks/service/rbrand";
import { getCmsCaseStudies } from "@/lib/portfolio-cms";

export const metadata: Metadata = {
  title: "Branding Agency Glasgow | Build Your Brand with RestoRefine",
  description:
    "RestoRefine is a Glasgow branding agency helping businesses turn their ideas into distinctive brands that people remember through strategy, identity, & design.",
  alternates: { canonical: "https://www.restorefine.co.uk/services/brand" },
  openGraph: {
    title: "Branding Agency Glasgow | Build Your Brand with RestoRefine",
    description:
      "RestoRefine is a Glasgow branding agency helping businesses turn their ideas into distinctive brands that people remember through strategy, identity, & design.",
    url: "https://www.restorefine.co.uk/services/brand",
  },
};

export default async function BrandPage() {
  const caseStudies = await getCmsCaseStudies();
  return <RBrand caseStudies={caseStudies} />;
}
