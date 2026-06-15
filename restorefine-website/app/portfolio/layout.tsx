import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Our Work",
  description:
    "Browse RestoRefine's portfolio of restaurant branding and web design projects. See how we've helped hospitality brands across the UK build powerful identities and digital experiences.",
  alternates: { canonical: "https://www.restorefine.co.uk/portfolio" },
  openGraph: {
    title: "Portfolio | RestoRefine",
    description:
      "Real results for real restaurants. Explore the RestoRefine portfolio of branding and web design projects.",
    url: "https://www.restorefine.co.uk/portfolio",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
