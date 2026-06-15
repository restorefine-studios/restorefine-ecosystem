import { ContactSection } from "@/blocks/contact-us";
import { Footer } from "@/components/footer";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with RestoRefine. We'd love to hear about your restaurant, café, or hospitality brand project. Let's build something great together.",
  keywords: [
    "contact RestoRefine",
    "restaurant branding agency contact",
    "hire restaurant branding agency UK",
    "restaurant web design enquiry",
    "hospitality agency UK contact",
    "get in touch RestoRefine",
    "restaurant brand project UK",
  ],
  alternates: { canonical: "https://www.restorefine.co.uk/contact" },
  openGraph: {
    title: "Contact Us | RestoRefine",
    description:
      "Reach out to RestoRefine to discuss your restaurant branding or web design project.",
    url: "https://www.restorefine.co.uk/contact",
  },
};

function Contact() {
  return (
    <main>
      <ContactSection />
      <Footer />
    </main>
  );
}

export default Contact;
