import Resto from "@/blocks/home-v2";
import { Footer } from "@/components/footer";
import { homeContent } from "@/lib/homepageData";
import type { Metadata } from "next";

const { meta } = homeContent;

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

export default function Home() {
  return (
    <main>
      <Resto />
      <Footer />
    </main>
  );
}
