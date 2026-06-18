import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { AdNoticeModal } from "@/components/ad-notice-modal";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from "next/script";

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

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "RestoRefine | Restaurant Branding & Web Design Agency UK",
    template: "%s | RestoRefine",
  },
  description:
    "RestoRefine is the UK's specialist branding and web design agency for restaurants, cafés, and hospitality businesses. We craft logos, websites, print, merch, and social media that make your brand unforgettable.",
  keywords: [
    "restaurant branding UK",
    "restaurant web design UK",
    "hospitality branding agency",
    "restaurant logo design",
    "restaurant brand identity",
    "restaurant marketing agency UK",
    "restaurant social media management",
    "restaurant print design",
    "restaurant merchandise",
    "food brand design",
    "café branding",
    "restaurant website design",
    "UK restaurant agency",
    "RestoRefine",
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
    title: "RestoRefine | Restaurant Branding & Web Design Agency UK",
    description:
      "The UK's specialist branding and web design agency for restaurants, cafés, and hospitality businesses. Logos, websites, print, merch, and social media.",
    images: [
      {
        url: "/image-og.png",
        width: 1200,
        height: 630,
        alt: "RestoRefine — Restaurant Branding & Web Design Agency UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RestoRefine | Restaurant Branding & Web Design Agency UK",
    description:
      "The UK's specialist branding and web design agency for restaurants, cafés, and hospitality businesses.",
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
        <Script id="clarity-script" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "x8w68zirez");`}
        </Script>
      </head>
      <body className={`${inter.className} ${holiday.variable}`}>
        <Navbar /> {children}
        <AdNoticeModal />
        <SpeedInsights />
        <Analytics />
      </body>
    <GoogleAnalytics gaId="G-87QRBLHJXR" />
    </html>
  );
}


{/* <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-87QRBLHJXR"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-87QRBLHJXR');
</script> */}