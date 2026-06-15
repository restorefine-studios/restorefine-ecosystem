import React from "react";
import Hero from "./hero";
import { FeaturedCaseStudy } from "./featured-case-study";
import { Process } from "./process";
import { Reviews } from "./reviews";
import Cta from "@/components/cta";
import { getEntry } from "@/lib/contentful";
import ServicePillars from "./service-pillars";
import { Founders } from "./founders";

async function Resto() {
  const entry = await getEntry("4vS3xsxhN1eATw3l21K6ek");
  const companyEntry = await getEntry("2sn0IjTvv7GmiWqgDpyOCm");

  const clientReviewsHeadline = entry?.fields?.clientReviewsHeadline || "Our Clients";
  const clientReviewsSubtext = entry?.fields?.clientReviewsSubtext || "Hear firsthand how our solutions have boosted online success for users like you.";

  // Fetch review entries
  const reviewIds = ["XfhCriML9piZujRwHtunQ", "6Zu9M9XpPT6BLYCX49Xex5"];
  const reviewEntries = await Promise.all(reviewIds.map((id) => getEntry(id)));
  const reviews = reviewEntries.map((revEntry, index) => {
    const content = revEntry?.fields?.clientReviewContent;
    let clientName = "Client";
    let clientReview = "Great service!";
    let restaurantName = "Restaurant";
    if (content) {
      let parsed;
      if (typeof content === "string") {
        try {
          parsed = JSON.parse(content);
        } catch (e) {
          console.error("Error parsing clientReviewContent", e);
        }
      } else if (typeof content === "object") {
        parsed = content;
      }
      if (parsed) {
        clientName = parsed.clientName || clientName;
        clientReview = parsed.clientReview || clientReview;
        restaurantName = parsed.restaurantName || restaurantName;
      }
    }
    return {
      id: index + 1,
      name: clientName,
      position: restaurantName,
      review: clientReview,
      image: "/reviewuser.svg",
      companyLogo: revEntry?.fields?.clientLogo ? "https:" + revEntry.fields.clientLogo.fields.file.url : "/reviewuser.svg",
    };
  });

  // Founder data from company entry
  const resolveText = (field: any, fallback: string): string => {
    if (!field) return fallback;
    if (typeof field === "string") return field;
    if (field.nodeType === "document") return field.content?.[0]?.content?.[0]?.value || fallback;
    if (field.nodeType === "paragraph") return field.content?.[0]?.value || fallback;
    return fallback;
  };

  const founderHeadline = resolveText(companyEntry?.fields?.founderHeadline, "The Founders");
  const founderSubtext = resolveText(companyEntry?.fields?.founderSubtext, "The team behind RestoRefine.");

  const founders = [];
  for (let i = 1; i <= 2; i++) {
    const img = companyEntry?.fields?.[`founder${i}Image`];
    const json = companyEntry?.fields?.[`founder${i}`];
    let name = `Founder ${i}`, role = "Co-Founder", about = "";
    if (json) {
      const parsed = typeof json === "string" ? JSON.parse(json) : json;
      if (parsed) {
        name = parsed.name || name;
        role = parsed.role || role;
        about = resolveText(parsed.about, "");
      }
    }
    founders.push({
      name,
      role,
      about: about.replace(/\n\n/g, "<br><br>"),
      image: img ? "https:" + (img as any).fields.file.url : "/placeholder.svg",
    });
  }

  return (
    <main className="">
      <Hero />
      <FeaturedCaseStudy />
      <Process />
      <ServicePillars />
      <Reviews reviews={reviews} headline={clientReviewsHeadline} subtext={clientReviewsSubtext} />
      <Founders headline={founderHeadline} subtext={founderSubtext} founders={founders} />
      <Cta />
    </main>
  );
}

export default Resto;
