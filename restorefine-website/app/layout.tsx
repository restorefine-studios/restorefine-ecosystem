import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { AdNoticeModal } from "@/components/ad-notice-modal";
import Image from "next/image";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { CookieConsentProvider } from "@/components/cookie-consent-provider";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { AnalyticsScripts } from "@/components/analytics-scripts";

const inter = Inter({ subsets: ["latin"] });

const holiday = localFont({
  src: [
    {
      path: "../public/fonts/Holiday.otf",
    },
  ],
  variable: "--font-holiday",
});

const BASE_URL = "https://www.restorefine.co.uk";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RestoRefine",
  url: BASE_URL,
  logo: `${BASE_URL}/restorefine-logoblack.svg`,
  email: "hello@restorefine.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "(Unit 54) 24 Fairley Street",
    addressLocality: "Glasgow",
    addressRegion: "Scotland",
    postalCode: "G51 2SN",
    addressCountry: "GB",
  },
  sameAs: [
    "https://www.instagram.com/restorefine/",
    "https://uk.linkedin.com/company/restorefine",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RestoRefine",
  url: BASE_URL,
};

const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SiteNavigationElement",
      name: "Brand",
      url: `${BASE_URL}/services/brand`,
    },
    {
      "@type": "SiteNavigationElement",
      name: "Content",
      url: `${BASE_URL}/services/content`,
    },
    {
      "@type": "SiteNavigationElement",
      name: "Performance",
      url: `${BASE_URL}/services/performance`,
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "RestoRefine | Creative Agency for Growing Ambitious Brands",
    template: "%s | RestoRefine",
  },
  description:
    "RestoRefine helps ambitious UK businesses grow through strategy, branding, marketing, and digital experiences. Trusted across hospitality, leisure, and beyond.",
  keywords: [
    "creative agency UK",
    "branding agency",
    "brand strategy",
    "marketing agency",
    "digital agency",
    "web design agency",
    "RestoRefine",
    "growth agency",
    "crm providers",
    "hospitality partners",
    "launch campaigns",
    "graphics designs",
  ],
  authors: [{ name: "RestoRefine", url: BASE_URL }],
  creator: "RestoRefine",
  publisher: "RestoRefine",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: BASE_URL,
    siteName: "RestoRefine",
    title: "RestoRefine | Creative Growth Agency for Ambitious Brands",
    description:
      "Strategy, branding, marketing, and digital experience—under one roof. See how RestoRefine helps ambitious businesses grow.",
    images: [
      {
        url: "/image-og.png",
        width: 1200,
        height: 630,
        alt: "RestoRefine — Creative Growth Agency for Ambitious Brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RestoRefine | Creative Growth Agency for Ambitious Brands",
    description:
      "Strategy, branding, marketing, and digital experience—under one roof. See how RestoRefine helps ambitious businesses grow.",
    images: ["/image-og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          id="site-navigation-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
        />
      </head>
      <body className={`${inter.className} ${holiday.variable}`}>
        <CookieConsentProvider>
          <Navbar /> {children}
          <AdNoticeModal />
          <a
            href={`https://wa.me/441414835850?text=${encodeURIComponent("Hi RestoRefine Studios, I'd like to find out more about your services.")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with RestoRefine Studios on WhatsApp"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl"
          >
            <Image src="/whatsapp.svg" alt="WhatsApp" width={28} height={28} className="brightness-0 invert" />
          </a>
          <SpeedInsights />
          <Analytics />
          <AnalyticsScripts />
          <CookieConsentBanner />
        </CookieConsentProvider>
      </body>
    </html>
  );
}