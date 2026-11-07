import type { Metadata } from "next";
import { LocationPageV2 as LocationPage } from "@/blocks/location-v2";
import { Footer } from "@/components/footer";
import { liverpoolContent, liverpoolExtras } from "@/lib/locations/liverpool";

const { meta } = liverpoolContent;
const BASE_URL = "https://www.restorefine.co.uk";

export const metadata: Metadata = {
  title: { absolute: meta.title },
  description: meta.description,
  alternates: { canonical: meta.canonical },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.canonical,
  },
  twitter: {
    title: meta.title,
    description: meta.description,
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: liverpoolContent.hero.heading,
      serviceType: "Growth marketing",
      description: meta.description,
      url: meta.canonical,
      provider: { "@type": "Organization", name: "RestoRefine", url: BASE_URL },
      areaServed: { "@type": liverpoolExtras.area.type, name: liverpoolExtras.area.name },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: liverpoolContent.services.heading,
        itemListElement: [...liverpoolContent.services.core, ...liverpoolContent.services.more].map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.description },
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: liverpoolContent.hero.heading, item: meta.canonical },
      ],
    },
  ],
};

export default function GrowthMarketingAgencyLiverpool() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LocationPage content={liverpoolContent} extras={liverpoolExtras} />
      <Footer />
    </main>
  );
}
