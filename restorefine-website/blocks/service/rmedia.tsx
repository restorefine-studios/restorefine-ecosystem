import Image from "next/image";
import ctabg from "@/public/rmediactabg.webp";
import bio from "@/public/services/media/restomediabio.webp";
import { Footer } from "@/components/footer";
import { V2Shell } from "@/blocks/home-v2";
import { CaseStudies, ScriptTitle, ServiceHero } from "@/blocks/service-v2/pillar";
import { Expectation, FeatureRail, FeatureSplit } from "@/blocks/service-v2/sections";
import type { PortfolioItem } from "@/lib/portfolio";

/** /services/restomedia in the v2 design; copy and Contentful content unchanged */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RMedia({ data, caseStudies = [] }: { data: any; caseStudies?: PortfolioItem[] }) {
  return (
    <main>
      <V2Shell>
        <ServiceHero
          image="/restomedia-photography.webp"
          title={<ScriptTitle text="Shot, Shared, & Selling Out" accent="Shot," />}
          subtext="From perfectly lit plates to behind-the-scenes reels, we turn your business into the content your audience didn't know they needed."
          ctaLabel="Let's Craft Something"
        />
        <FeatureSplit
          image={bio}
          alt="resto media bio"
          heading="What Is Resto Media"
          paragraphs={[
            "RestoMedia manages your social media and content creation, delivering high-quality photography and videography that showcases the best of your business. We handle your social platforms, ensuring engaging content that drives visibility and customer interaction.",
          ]}
        />
        {data?.overview && <FeatureRail heading={data.overview.title} subtitle={data.overview.subtitle} features={data.overview.features} />}

        <section className="px-2 sm:px-3">
          <div className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]">
            <Image src={ctabg} alt="mediactabackground" sizes="100vw" className="h-auto w-full object-cover" />
          </div>
        </section>

        {data?.expectation && <Expectation partnerTitle="Showcase your Business" {...data.expectation} />}
        <CaseStudies caseStudies={{ heading: "Our Work", categories: ["Media", "Branding"], extraItems: caseStudies }} />
      </V2Shell>
      <Footer />
    </main>
  );
}

export default RMedia;
