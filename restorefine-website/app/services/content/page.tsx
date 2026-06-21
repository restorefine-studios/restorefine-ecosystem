import type { Metadata } from "next";
import PillarPage, { type PillarPageData } from "@/blocks/service/pillar-page";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Content | RestoRefine",
  description:
    "Scroll-stopping reels, photography, and campaigns that turn followers into bookings. Every frame shot with intention.",
  alternates: { canonical: "https://www.restorefine.co.uk/services/content" },
  openGraph: {
    title: "Content | RestoRefine",
    description:
      "Scroll-stopping reels, photography, and campaigns that turn followers into bookings. Every frame shot with intention.",
    url: "https://www.restorefine.co.uk/services/content",
  },
};

const data: PillarPageData = {
  id: "02",
  slug: "content",
  title: "Content",
  tagline: "Content for ambitious brands",
  description:
    "Scroll-stopping reels, photography, and campaigns that turn followers into customers. Every frame shot with intention.",
  image: "/content-card-img.png",
  hero: {
    eyebrow: "Resto Content",
    line1: "Content That",
    line2: "Demands Attention.",
    description:
      "Scroll-stopping reels, photography, and campaigns that turn followers into customers. Every frame shot with intention.",
    ctaLabel: "Start Creating",
  },
  overview: {
    headline: "Most restaurants post. The best ones captivate.",
    body: "In a feed full of noise, content is your menu — it's how guests taste your venue before they visit. The difference between a packed house and a slow night is often just a reel.",
    bullets: [
      "Low-quality content signals low-quality food",
      "Inconsistent posting kills algorithm reach",
      "No launch strategy means openings go unnoticed",
      "Bad photography loses bookings to competitors",
    ],
  },
  subServices: [
    {
      number: "01",
      title: "Short-form Content",
      description:
        "Reels, TikToks, and short videos that capture the energy of your venue and keep audiences coming back for more. Shot, edited, and optimised for every platform.",
      image: "/services/media/pexels-cottonbro-3296434.webp",
      includes: ["Instagram Reels", "TikTok Videos", "YouTube Shorts", "Editing & Captions"],
    },
    {
      number: "02",
      title: "Social Media Management",
      description:
        "Scroll-stopping content and strategy built around your venue. We handle creative direction, caption writing, and scheduling — so your feed stays fresh and your following keeps growing.",
      image: "/content-card-img.png",
      href: "/services/content",
      includes: ["Content Calendar", "Caption Writing", "Scheduling", "Community Management"],
    },
    {
      number: "03",
      title: "Launch Campaigns",
      description:
        "Full-scale launch content for new venues, menu drops, and seasonal events. We build the buzz before the doors open and keep the momentum going long after.",
      image: "/services/media/pexels-fauxels-3184431.webp",
      href: "/services/launch-campaigns",
      includes: ["Grand Opening Content", "Menu Drop Campaigns", "Teaser Series", "Countdown Strategy"],
    },
    {
      number: "04",
      title: "Content Strategy",
      description:
        "A clear roadmap for what to post, when, and why. We map your content calendar to your business goals so every piece of content has purpose and drives results.",
      image: "/services/media/pexels-pixabay-262438.webp",
      includes: ["Content Calendar", "Audience Research", "Brand Voice Guide", "Performance Review"],
    },
    {
      number: "05",
      title: "Photography",
      description:
        "Professional food, venue, and lifestyle photography that makes your brand look as good as it tastes. Every shot is styled, lit, and edited to convert browsers into diners.",
      image: "/services/media/restophotography.webp",
      includes: ["Food Photography", "Venue Shoots", "Lifestyle Imagery", "Retouching & Delivery"],
    },
  ],
  relatedBlogSlugs: [
    "how-we-helped-padel-academy-scotland-build-brand-from-scratch",
    "brand-consistency-is-boring-thats-why-it-works",
  ],
  caseStudyCategories: ["Media", "Branding"],
};

export default function ContentPage() {
  return (
    <main>
      <PillarPage data={data} />
      <Footer />
    </main>
  );
}
