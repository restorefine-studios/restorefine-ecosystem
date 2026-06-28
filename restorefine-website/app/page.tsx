import Resto from "@/blocks/home";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RestoRefine | Creative Agency for Growing Ambitious Brands",
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
  alternates: { canonical: "https://www.restorefine.co.uk" },
  openGraph: {
    title: "RestoRefine | Creative Growth Agency for Ambitious Brands",
    description:
      "Strategy, branding, marketing, and digital experience—under one roof. See how RestoRefine helps ambitious businesses grow.",
    url: "https://www.restorefine.co.uk",
  },
};
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import navlogo from "@/public/restorefine-logowhite.svg";

export default function Home() {
  // const [isLoading, setIsLoading] = useState(true); // 👈 Set true initially

  // useEffect(() => {
  //   const images = Array.from(document.images);
  //   const allImagesLoaded = images.map((img) => {
  //     if (img.complete) return Promise.resolve();
  //     return new Promise((resolve) => {
  //       img.onload = img.onerror = () => resolve(undefined);
  //     });
  //   });

  //   Promise.all(allImagesLoaded).then(() => {
  //     setTimeout(() => {
  //       setIsLoading(false); 
  //     },4000)
     
  //   });
  // }, []);

  return (
    <main>
     
         {/* <section className="bg-black h-screen w-full grid place-items-center items-center">
           <Image
            src={navlogo}
            alt="Resto Refine Secondary Logo"
            className="animate-pulse flex items-center justify-center"
            width={75}
            height={75}
          />
        </section> */}
     
          <Resto />
          <Footer />
     
    </main>
  );
}
