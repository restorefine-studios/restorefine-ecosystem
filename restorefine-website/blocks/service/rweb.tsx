"use client";

import React from "react";
import RestoServicesHero from "./resto-services/resto-hero";
import mesh from "@/public/restowebheromesh.svg";
import Image from "next/image";
import { RestoOverview } from "./resto-services/resto-overview";
import RestoBenefits from "./resto-services/resto-benefits";
import { RestoExpectation } from "./resto-services/resto-expectation";
import { Footer } from "@/components/footer";
import { CaseStudiesSection } from "./resto-services/case-studies";

function RWeb({ data }: { data: any }) {
  return (
    <main className="bg-white">
      <RestoServicesHero
        titletop={data.hero.titletop}
        titlebottom={data.hero.titlebottom}
        description={data.hero.description}
      />

      {/* Mesh decoration */}
      <div className="relative w-full overflow-hidden h-48 -mt-8 mb-0 flex items-center justify-center">
        <Image src={mesh} alt="mesh" width={600} height={200} className="w-full opacity-10 object-contain" />
      </div>

      <RestoOverview {...data.overview} />
      <RestoBenefits
        title={data.benefits.title}
        subtitle={data.benefits.subtitle}
        signature={data.starIcon}
        makeRequest={{
          title: "Make Your Request",
          image: "/services/web/restowebreq.svg",
        }}
        receiveRefine={{
          title: "Receive and Refine",
          image: "/services/web/restowebmedal.svg",
        }}
      />
      <RestoExpectation
        title={data.expectation.title}
        subtitle={data.expectation.subtitle}
        partnerCard={{
          title: "Surf the New way",
          gradient: { from: "#ff0000", to: "#a90909" },
          backgroundColor: "#ae0404",
        }}
        typewriterPhrases={data.expectation.typewriterPhrases}
        buildingCard={data.expectation.buildingCard}
        supportCard={data.expectation.supportCard}
        iterationsCard={data.expectation.iterationsCard}
        services={data.expectation.services}
      />

      <CaseStudiesSection
        sectionNumber="04"
        sectionLabel="Case Studies"
        categories={["Branding", "Menus", "Media"]}
      />

      {/* Signature marquee — commented out
      <div className="border-t border-zinc-200 overflow-hidden">
        <div className="flex w-full overflow-x-hidden">
          <div className="animate-marquee-infinite flex min-w-full shrink-0 items-center">
            <Image src={data.signature} alt="signature" width={500} height={500} className="w-full" />
          </div>
          <div className="animate-marquee-infinite flex min-w-full shrink-0 items-center">
            <Image src={data.signature} alt="signature" width={500} height={500} className="w-full" />
          </div>
        </div>
      </div> */}
      <Footer />
    </main>
  );
}

export default RWeb;
