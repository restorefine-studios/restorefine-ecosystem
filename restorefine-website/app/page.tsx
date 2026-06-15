import Resto from "@/blocks/home";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RestoRefine | Hospitality Growth Agency UK",
  description:
    "RestoRefine helps UK restaurants, cafés, and hospitality businesses build powerful brands. Expert branding, web design, print, merch, social media, and photography — all under one roof.",
  keywords: [
    "restaurant branding agency UK",
    "hospitality branding agency",
    "restaurant web design UK",
    "restaurant logo design UK",
    "café branding agency",
    "food brand design UK",
    "restaurant marketing agency",
    "hospitality design agency UK",
    "RestoRefine",
  ],
  alternates: { canonical: "https://www.restorefine.co.uk" },
  openGraph: {
    title: "RestoRefine | Hospitality Growth Agency UK",
    description:
      "Expert branding, web design, print, merch, and social media for UK restaurants and hospitality businesses.",
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
