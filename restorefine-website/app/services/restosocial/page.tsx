import RSocial from "@/blocks/service/rsocial";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RestoSocial — Social Media Management for Restaurants",
  description:
    "Scroll-stopping content, strategy, and community management built for your venue. RestoRefine's RestoSocial service keeps your restaurant's feed fresh and your following growing.",
  keywords: [
    "restaurant social media management UK",
    "hospitality social media agency",
    "restaurant Instagram management",
    "café social media marketing",
    "restaurant content strategy UK",
    "food brand social media",
    "restaurant community management",
    "RestoSocial",
    "restaurant social media growth UK",
  ],
  alternates: { canonical: "https://www.restorefine.co.uk/services/restosocial" },
  openGraph: {
    title: "RestoSocial | RestoRefine",
    description:
      "Social media management for restaurants — content creation, strategy, and community management that drives real results.",
    url: "https://www.restorefine.co.uk/services/restosocial",
  },
};

export default function RestoSocialPage() {
  return (
    <main>
      <RSocial />
    </main>
  );
}
