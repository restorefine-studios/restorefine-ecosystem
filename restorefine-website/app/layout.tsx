import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { AdNoticeModal } from "@/components/ad-notice-modal";
import Image from "next/image";
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