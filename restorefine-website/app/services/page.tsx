import RestoServices from "@/blocks/service";
import { Footer } from "@/components/footer";
import React from "react";
import { getEntry } from "@/lib/contentful";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore RestoRefine's full suite of services for restaurants and hospitality brands: branding, web design, print, merchandise, social media, and photography.",
  alternates: { canonical: "https://www.restorefine.co.uk/services" },
  openGraph: {
    title: "Our Services | RestoRefine",
    description:
      "Branding, web design, print, merchandise, social media, and photography, built exclusively for the hospitality industry.",
    url: "https://www.restorefine.co.uk/services",
  },
};

async function Services() {
  const entry = await getEntry('ZKnGlZmCtrKEuXLgGnbgu');

  // Parse subServices
  const subServices = [];
  for (let i = 1; i <= 5; i++) {
    const imgField = `subService${i}Image`;
    const jsonField = `subService${i}`;
    const img = entry?.fields?.[imgField];
    const json = entry?.fields?.[jsonField];
    let title = `SubService ${i}`;
    let content = 'Description';
    if (json) {
      if (typeof json === 'string') {
        try {
          const parsed = JSON.parse(json);
          title = parsed.title || title;
          content = parsed.content || content;
        } catch (e) {}
      } else if (typeof json === 'object') {
        title = json.title || title;
        content = json.content || content;
      }
    }
    subServices.push({
      title,
      description: content,
      image: img ? 'https:' + img.fields.file.url : '/placeholder.svg',
      href: `/services/${title.toLowerCase().replace('resto', '')}`,
    });
  }

  // Parse altServices for serviceDetails
  const serviceDetails = [];
  for (let i = 1; i <= 4; i++) {
    const jsonField = `altService${i}`;
    const json = entry?.fields?.[jsonField];
    let tags = [];
    let title = `Service ${i}`;
    let number = `${i}`;
    let description = 'Description';
    if (json) {
      if (typeof json === 'string') {
        try {
          const parsed = JSON.parse(json);
          tags = parsed.tags || [];
          title = parsed.title || title;
          number = parsed.number || number;
          description = parsed.description || description;
        } catch (e) {}
      } else if (typeof json === 'object') {
        tags = json.tags || [];
        title = json.title || title;
        number = json.number || number;
        description = json.description || description;
      }
    }
    serviceDetails.push({
      number,
      title,
      description,
      services: tags,
    });
  }

  const heroHeadline = 'Where Identity Becomes Impact';
  const heroSubtext = 'Brand, content, and performance, engineered as one system, not three separate services.';

  const serviceHeadline = 'Three Disciplines, One Team';
  const serviceSubtext = 'No handoffs between disconnected teams. Brand, content, and performance move together, from day one.';

  return (
    <main>
      <RestoServices
        heroHeadline={heroHeadline}
        heroSubtext={heroSubtext}
        serviceHeadline={serviceHeadline}
        serviceSubtext={serviceSubtext}
        subServices={subServices}
        serviceDetails={serviceDetails}
      />
      <Footer />
    </main>
  );
}

export default Services;
