import Enquire from "@/blocks/enquire";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enquire Now",
  description:
    "Ready to grow your restaurant brand? Submit an enquiry and the RestoRefine team will get back to you to discuss branding, web design, print, merch, and more.",
  alternates: { canonical: "https://www.restorefine.co.uk/enquire-now" },
  openGraph: {
    title: "Enquire Now | RestoRefine",
    description:
      "Start your restaurant branding project with RestoRefine. Submit an enquiry today.",
    url: "https://www.restorefine.co.uk/enquire-now",
  },
};

export default function EnquireNow() {
  return (
    <main>
      <Enquire />
    </main>
  );
}
