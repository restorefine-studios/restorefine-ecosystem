import type { Metadata } from "next";
import PillarPage, { type PillarPageData } from "@/blocks/service/pillar-page";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Performance | RestoRefine",
  description:
    "Websites, SEO, and data-driven paid campaigns that put your venue in front of hungry audiences at the exact right moment.",
  alternates: { canonical: "https://www.restorefine.co.uk/services/performance" },
  openGraph: {
    title: "Performance | RestoRefine",
    description:
      "Websites, SEO, and data-driven paid campaigns that put your venue in front of hungry audiences at the exact right moment.",
    url: "https://www.restorefine.co.uk/services/performance",
  },
};

const data: PillarPageData = {
  id: "03",
  slug: "performance",
  title: "Performance",
  tagline: "Growth engine for restaurants",
  description:
    "Websites, SEO, and data-driven paid campaigns that put your venue in front of hungry audiences at the exact right moment.",
  image: "/services-performance.jpg",
  overview: {
    headline: "Being great isn't enough. You need to be found.",
    body: "A beautiful restaurant with no digital presence is invisible. We build the online infrastructure that drives discovery, bookings, and repeat visits — turning your digital footprint into your most powerful front-of-house.",
    bullets: [
      "Restaurants without SEO lose bookings to competitors every day",
      "A slow, outdated website drives guests straight to rivals",
      "Untracked ad spend burns budget with zero ROI",
      "No analytics means no way to improve",
    ],
  },
  subServices: [
    {
      number: "01",
      title: "Websites",
      description:
        "Stunning, high-converting websites built for the hospitality industry. From sleek restaurant showcases to full web apps with bookings, menus, and ordering — we design, build, and deliver.",
      image: "/services/web/pexels-fotios-photos-16129705.webp",
      href: "/services/website",
      includes: ["Custom Web Design", "CMS Integration", "Booking Flow", "Mobile-first Build"],
    },
    {
      number: "02",
      title: "SEO",
      description:
        "Get found by the guests who are already looking for you. We optimise your site so you rank at the top of local search — from Google Business to on-page content.",
      image: "/services/web/pexels-pixabay-270348.webp",
      href: "/services/seo",
      includes: ["Local SEO", "Google Business Profile", "On-page Optimisation", "Link Building"],
    },
    {
      number: "03",
      title: "Paid Ads",
      description:
        "Targeted Meta and Google ad campaigns that drive real covers and real revenue. Every campaign is built around your goals, your audience, and your ROI.",
      image: "/dashbg.webp",
      includes: ["Meta Ads", "Google Ads", "Retargeting", "A/B Testing"],
    },
    {
      number: "04",
      title: "Conversion Optimisation",
      description:
        "Turn website visitors into paying guests. We analyse your site's journey and remove every friction point — from landing page copy to booking flow — so more clicks become customers.",
      image: "/services/web/pexels-picjumbo-com-55570-196644.webp",
      includes: ["Landing Page CRO", "Booking Flow Audit", "CTA Optimisation", "User Journey Mapping"],
    },
    {
      number: "05",
      title: "Analytics",
      description:
        "Clear, actionable reporting that shows exactly what's working. Monthly dashboards covering traffic, bookings, ad spend, and social performance.",
      image: "/services/web/pexels-pixabay-39284.webp",
      includes: ["Monthly Reports", "Traffic Analysis", "Ad Spend ROI", "Social Insights"],
    },
  ],
  relatedBlogSlugs: [
    "10-signs-your-business-needs-a-digital-marketing-company-in-glasgow",
    "how-we-helped-padel-academy-scotland-build-brand-from-scratch",
  ],
  caseStudyCategories: ["Branding", "Menus", "Media"],
};

export default function PerformancePage() {
  return (
    <main>
      <PillarPage data={data} />
      <Footer />
    </main>
  );
}
