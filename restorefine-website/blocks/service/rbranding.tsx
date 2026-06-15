"use client";

import React from "react";
import ball from "@/public/rbrandingheroball.svg";
import baloon from "@/public/rbrandingherobaloon.svg";
import Image from "next/image";
import RestoServicesHero from "./resto-services/resto-hero";
import { RestoOverview } from "./resto-services/resto-overview";
import RestoBenefits from "./resto-services/resto-benefits";
import { RestoExpectation } from "./resto-services/resto-expectation";
import artefacts from "@/public/services/branding/rbrandinghomemobile.svg";
import { CaseStudiesSection } from "./resto-services/case-studies";
import { Footer } from "@/components/footer";

function RBranding({ data }: { data: any }) {
  return (
    <main className="bg-white">
      <RestoServicesHero
        titletop={data.hero.titletop}
        titlebottom={data.hero.titlebottom}
        description={data.hero.description}
      />

      {/* Floating decorative elements — desktop only */}
      <div className="hidden lg:block absolute top-0 left-0 right-0 pointer-events-none overflow-hidden h-screen z-0">
        <div className="absolute bottom-16 left-6 opacity-60">
          <Image src={baloon} alt="baloon" width={140} height={140} />
        </div>
        <div className="absolute bottom-16 right-6 opacity-60">
          <Image src={ball} alt="ball" width={110} height={110} />
        </div>
      </div>

      {/* Mobile artefacts */}
      <div className="flex justify-center py-8 lg:hidden px-6">
        <Image src={artefacts} alt="artefacts" width={240} height={240} />
      </div>

      <RestoOverview {...data.overview} />
      <RestoBenefits
        title={data.benefits.title}
        subtitle={data.benefits.subtitle}
        signature={data.starIcon}
        makeRequest={{
          title: "Make Your Request",
          image: "/services/branding/makereqsgraphic.svg",
        }}
        receiveRefine={{
          title: "Receive and Refine",
          image: "/services/branding/restomedal.svg",
        }}
      />
      <RestoExpectation
        title={data.expectation.title}
        subtitle={data.expectation.subtitle}
        partnerCard={{
          title: "Partner with Creativity",
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
        categories={["Branding"]}
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

export default RBranding;
