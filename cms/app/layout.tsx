import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import localFont from "next/font/local";
import QueryProvider from "@/components/QueryProvider";
import "./globals.css";

// The same faces as the RestoRefine website: Inter for text, Inter Tight for headings
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const interTight = Inter_Tight({ variable: "--font-display-face", subsets: ["latin"], display: "swap" });
// The brand's script, used for one accent word on the sign-in and home screens
const holiday = localFont({ src: "./fonts/Holiday.otf", variable: "--font-holiday", display: "swap" });

export const metadata: Metadata = {
  title: "RestoRefine CMS",
  description: "Content management for RestoRefine",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${holiday.variable} h-full antialiased`}>
      <body className="cms min-h-full flex flex-col">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
