// Case-study strip pulls published CMS projects; ISR keeps the page static.
export const revalidate = 300;

import RLaunch from "@/blocks/service/rlaunch";
import { getCmsCaseStudies } from "@/lib/portfolio-cms";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Launch Campaigns for Restaurants & Hospitality | RestoRefine",
  description:
    "We build the buzz before you open the doors and keep the momentum going long after. Pre-launch teasers, opening day coverage, and post-launch content strategy.",
  alternates: {
    canonical: "https://www.restorefine.co.uk/services/launch-campaigns",
  },
  openGraph: {
    title: "Launch Campaigns for Restaurants & Hospitality | RestoRefine",
    description:
      "We build the buzz before you open the doors and keep the momentum going long after. Pre-launch teasers, opening day coverage, and post-launch content strategy.",
    url: "https://www.restorefine.co.uk/services/launch-campaigns",
  },
};

export default async function LaunchCampaignsPage() {
  const caseStudies = await getCmsCaseStudies();
  return <RLaunch caseStudies={caseStudies} />;
}
