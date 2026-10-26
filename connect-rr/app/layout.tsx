import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const description =
  "Social media, content and growth marketing for businesses across Scotland. Enquire, WhatsApp, call or visit RestoRefine in Glasgow.";

export const metadata: Metadata = {
  // Absolute base for the og:image URL that app/opengraph-image.tsx generates
  metadataBase: new URL("https://connect.restorefine.co.uk"),
  title: "RestoRefine | Connect",
  description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "RestoRefine",
    title: "RestoRefine | Connect",
    description,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title: "RestoRefine | Connect", description },
  // Private card landing page: keep it out of search results
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f2f7" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
