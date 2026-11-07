import type { Metadata } from "next";
import { LocationPageV2 as LocationPage } from "@/blocks/location-v2";
import { Footer } from "@/components/footer";
import { glasgowContent, glasgowExtras } from "@/lib/locations/glasgow";

const { meta } = glasgowContent;
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
      name: glasgowContent.hero.heading,
      serviceType: "Growth marketing",
      description: meta.description,
      url: meta.canonical,
      provider: { "@type": "Organization", name: "RestoRefine", url: BASE_URL },
      areaServed: { "@type": glasgowExtras.area.type, name: glasgowExtras.area.name },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: glasgowContent.services.heading,
        itemListElement: [...glasgowContent.services.core, ...glasgowContent.services.more].map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.description },
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: glasgowContent.hero.heading, item: meta.canonical },
      ],
    },
  ],
};

export default function GrowthMarketingAgencyGlasgow() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LocationPage content={glasgowContent} extras={glasgowExtras} />
      <Footer />
    </main>
  );
}
