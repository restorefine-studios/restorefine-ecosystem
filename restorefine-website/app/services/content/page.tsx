// Case-study strip pulls published CMS projects; ISR keeps the page static.
export const revalidate = 300;

import type { Metadata } from "next";
import RContent from "@/blocks/service/rcontent";
import { getCmsCaseStudies } from "@/lib/portfolio-cms";

export const metadata: Metadata = {
  title: "Content Marketing Agency Glasgow | Reels, TikToks & More",
  description:
    "Restorefine is a Glasgow content marketing agency helping businesses create entertaining content that builds visibility, engages audiences, and drives growth.",
  alternates: { canonical: "https://www.restorefine.co.uk/services/content" },
  openGraph: {
    title: "Content Marketing Agency Glasgow | Reels, TikToks & More",
    description:
      "Restorefine is a Glasgow content marketing agency helping businesses create entertaining content that builds visibility, engages audiences, and drives growth.",
    url: "https://www.restorefine.co.uk/services/content",
  },
};

export default async function ContentPage() {
  const caseStudies = await getCmsCaseStudies();
  return <RContent caseStudies={caseStudies} />;
}
