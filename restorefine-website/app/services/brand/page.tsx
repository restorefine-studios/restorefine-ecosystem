import type { Metadata } from "next";
import RBrand from "@/blocks/service/rbrand";

export const metadata: Metadata = {
  title: "Brand | RestoRefine",
  description:
    "With RestoRefine Branding, develop a compelling brand that captures attention and builds trust — logo design, brand identity development, and social media graphics.",
  alternates: { canonical: "https://www.restorefine.co.uk/services/brand" },
  openGraph: {
    title: "Brand | RestoRefine",
    description:
      "With RestoRefine Branding, develop a compelling brand that captures attention and builds trust — logo design, brand identity development, and social media graphics.",
    url: "https://www.restorefine.co.uk/services/brand",
  },
};

export default function BrandPage() {
  return <RBrand />;
}
