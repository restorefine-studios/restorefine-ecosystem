import React from "react";
import Hero from "./hero";
import { Intro } from "./intro";
import { Services } from "./services";
import { Industries } from "./industries";
import { Businesses } from "./businesses";
import { Process } from "./process";
import { WhyChoose } from "./why-choose";
import { Reviews } from "./reviews";
import { ReviewsCta } from "./reviews-cta";
import { Founders } from "./founders";
import { Areas } from "./areas";
import { Resources } from "./resources";
import { FinalCta } from "./final-cta";
import { Faq } from "./faq";
import { getEntry } from "@/lib/contentful";
import { getClientReviews } from "./get-client-reviews";

async function Resto() {
  const companyEntry = await getEntry("2sn0IjTvv7GmiWqgDpyOCm");

  const { reviews, headline: clientReviewsHeadline, subtext: clientReviewsSubtext } = await getClientReviews();

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
      <Intro />
      <Services />
      <Industries />
      <Businesses />
      <Process />
      <WhyChoose />
      <Reviews reviews={reviews} headline={clientReviewsHeadline} subtext={clientReviewsSubtext} />
      <ReviewsCta />
      <Founders headline={founderHeadline} subtext={founderSubtext} founders={founders} />
      <Areas />
      <Resources />
      <Faq />
      <FinalCta />
    </main>
  );
}

export default Resto;
