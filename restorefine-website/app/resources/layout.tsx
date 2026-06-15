import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources — Restaurant Branding & Marketing Insights",
  description:
    "Expert articles, guides, and insights on restaurant branding, marketing, web design, and hospitality business growth — from the RestoRefine team.",
  alternates: { canonical: "https://www.restorefine.co.uk/resources" },
  openGraph: {
    title: "Resources | RestoRefine",
    description:
      "Expert insights on restaurant branding, marketing, and web design from the RestoRefine team.",
    url: "https://www.restorefine.co.uk/resources",
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
