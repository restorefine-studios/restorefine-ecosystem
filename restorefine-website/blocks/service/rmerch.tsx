import headlineimg from "@/public/services/merch/pexels-oyindamola-taiwo-346083207-18930893.webp";
import stationery from "@/public/services/merch/restorefine_floatingpens.webp";
import apron from "@/public/services/merch/HOM-000-024-M-Freebie.webp";
import chestshot from "@/public/services/merch/pexels-skgphotography-22617996.webp";
import cards from "@/public/services/merch/restorefine_thankyoucard.webp";
import { Footer } from "@/components/footer";
import { V2Shell } from "@/blocks/home-v2";
import { ScriptTitle, ServiceHero } from "@/blocks/service-v2/pillar";
import { Expectation, FeatureColumns, Gallery, StepPair } from "@/blocks/service-v2/sections";

/** /services/restomerch in the v2 design; copy and Contentful content unchanged */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RMerch({ data }: { data: any }) {
  return (
    <main>
      <V2Shell>
        <ServiceHero
          image="/services/merch/pexels-oyindamola-taiwo-346083207-18930893.webp"
          title={<ScriptTitle text="Finally You Can Print, Wear & Impress" accent="Finally" />}
          subtext={data?.hero?.description ?? ""}
          ctaLabel="Let's Craft Something"
        />
        <Gallery
          images={[
            { src: stationery, alt: "restomerchstationery" },
            { src: apron, alt: "restomerchapron" },
            { src: headlineimg, alt: "restomerchheroimg" },
            { src: chestshot, alt: "restomerchprint-tshirt" },
            { src: cards, alt: "restomerchstationerycards" },
          ]}
        />
        {data?.services?.features && <FeatureColumns features={data.services.features.slice(0, 3)} />}
        {data?.benefits && (
          <StepPair
            heading={data.benefits.title}
            subtitle={data.benefits.subtitle}
            steps={[
              { title: "Make Your Request", image: "/services/merch/restomerchreq.svg" },
              { title: "Receive and Refine", image: "/services/merch/restomerchmedal.svg" },
            ]}
          />
        )}
        {data?.expectation && <Expectation partnerTitle="Your Brand merchandise" {...data.expectation} />}
      </V2Shell>
      <Footer />
    </main>
  );
}

export default RMerch;
