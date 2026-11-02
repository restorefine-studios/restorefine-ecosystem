import Hero from "@/blocks/home/hero";
import { Services } from "@/blocks/home/services";
import { Industries } from "@/blocks/home/industries";
import { Businesses } from "@/blocks/home/businesses";
import { Process } from "@/blocks/home/process";
import { WhyChoose } from "@/blocks/home/why-choose";
import { Reviews } from "@/blocks/home/reviews";
import { ReviewsCta } from "@/blocks/home/reviews-cta";
import { Resources } from "@/blocks/home/resources";
import { Faq } from "@/blocks/home/faq";
import { FinalCta } from "@/blocks/home/final-cta";
import { getClientReviews } from "@/blocks/home/get-client-reviews";
import type { londonContent, LocationExtras } from "@/lib/locations/london";
import { Benefits } from "./benefits";
import { KnowAbout } from "./know-about";

type Props = { content: typeof londonContent; extras: LocationExtras };

/** Location landing page: homepage sections with location copy, in the order the SEO brief sets */
export async function LocationPage({ content, extras }: Props) {
  const { reviews, headline, subtext } = await getClientReviews();

  return (
    <>
      <Hero hero={content.hero} ctas={content.ctas} />
      <Services services={content.services} />
      <Benefits benefits={extras.benefits} />
      <Process process={content.process} />
      <Reviews reviews={reviews} headline={headline} subtext={subtext} />
      <ReviewsCta cta={content.reviewsCta} />
      <WhyChoose whyChoose={content.whyChoose} caseStudies={content.clientSpotlight} services={content.services} ctas={content.ctas} />
      <Industries industries={content.industries} />
      <Businesses businesses={content.businesses} />
      <KnowAbout knowAbout={extras.knowAbout} />
      <Resources resources={content.resources} caseStudies={content.clientSpotlight} />
      <Faq faqs={content.faqs} />
      <FinalCta finalCta={content.finalCta} />
    </>
  );
}
