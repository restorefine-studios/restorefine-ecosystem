import type { Metadata } from "next";
import { LocationPageV2 as LocationPage } from "@/blocks/location-v2";
import { Footer } from "@/components/footer";
import { edinburghContent, edinburghExtras } from "@/lib/locations/edinburgh";

const { meta } = edinburghContent;
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
      name: edinburghContent.hero.heading,
      serviceType: "Growth marketing",
      description: meta.description,
      url: meta.canonical,
      provider: { "@type": "Organization", name: "RestoRefine", url: BASE_URL },
      areaServed: { "@type": edinburghExtras.area.type, name: edinburghExtras.area.name },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: edinburghContent.services.heading,
        itemListElement: [...edinburghContent.services.core, ...edinburghContent.services.more].map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.description },
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: edinburghContent.hero.heading, item: meta.canonical },
      ],
    },
  ],
};

export default function GrowthMarketingAgencyEdinburgh() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LocationPage content={edinburghContent} extras={edinburghExtras} />
      <Footer />
    </main>
  );
}
