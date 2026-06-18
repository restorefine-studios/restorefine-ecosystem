import type { Metadata } from "next";
import RSeo from "@/blocks/service/rseo";

export const metadata: Metadata = {
  title: "SEO for Restaurants & Hospitality | RestoRefine",
  description:
    "Get found by guests already searching for you. Local SEO, Google Business Profile management, on-page optimisation, and link building built for restaurants and hospitality venues.",
  keywords: [
    "restaurant SEO UK",
    "local SEO for restaurants",
    "Google Business Profile management",
    "restaurant search engine optimisation",
    "hospitality SEO agency",
  ],
  alternates: { canonical: "https://www.restorefine.co.uk/services/seo" },
  openGraph: {
    title: "SEO for Restaurants & Hospitality | RestoRefine",
    description:
      "Get found by guests already searching for you. Local SEO, Google Business Profile management, on-page optimisation, and link building built for restaurants and hospitality venues.",
    url: "https://www.restorefine.co.uk/services/seo",
  },
};

export default function SeoPage() {
  return <RSeo />;
}
