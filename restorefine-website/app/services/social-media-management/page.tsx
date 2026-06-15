import RSocial from "@/blocks/service/rsocial";
import React from "react";
import type { Metadata } from "next";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Social Media Management for Restaurants | RestoRefine",
  description:
    "Full-service social media management for hospitality brands. Content creation, scheduling, and strategy built around your venue.",
  alternates: {
    canonical:
      "https://www.restorefine.co.uk/services/social-media-management",
  },
  openGraph: {
    title: "Social Media Management for Restaurants | RestoRefine",
    description:
      "Full-service social media management for hospitality brands. Content creation, scheduling, and strategy built around your venue.",
    url: "https://www.restorefine.co.uk/services/social-media-management",
  },
};

export default function SocialMediaManagementPage() {
  return (
    <main>
      <RSocial />
      <Footer />
    </main>
  );
}
