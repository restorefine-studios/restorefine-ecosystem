"use client";

import React from "react";
import restostar from "@/public/restostar.svg";
import Image from "next/image";
import ring from "@/public/merchring.svg";
import tri from "@/public/merchangle.svg";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RestoBenefits from "./resto-services/resto-benefits";
import headlineimg from "@/public/services/merch/pexels-oyindamola-taiwo-346083207-18930893.webp";
import stationery from "@/public/services/merch/restorefine_floatingpens.webp";
import apron from "@/public/services/merch/HOM-000-024-M-Freebie.webp";
import chestshot from "@/public/services/merch/pexels-skgphotography-22617996.webp";
import cards from "@/public/services/merch/restorefine_thankyoucard.webp";
import { RestoExpectation } from "./resto-services/resto-expectation";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";

const star = <Image src={restostar} alt="RestoStar" width={80} height={80} />;
const merchring = <Image src={ring} alt="MerchRing" width={120} height={120} />;
const triangle = <Image src={tri} alt="MerchAngle" width={40} height={40} />;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

function RMerch({ data }: { data: any }) {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-white min-h-screen flex flex-col items-start justify-center px-6 md:px-12 lg:px-24 pt-36 pb-24">
        <div className="max-w-7xl w-full mx-auto">
          <motion.span
            className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 block mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            RestoMerch
          </motion.span>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tight text-zinc-900 leading-[0.9] mb-10"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
          >
            Finally You Can
            <br />
            <span className="text-red-600">Print, Wear</span>
            <br />
            & Impress
          </motion.h1>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <motion.p
              className="max-w-sm text-sm text-zinc-500 leading-relaxed"
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeUp}
            >
              {data.hero.description}
            </motion.p>

            <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}>
              <Link href="/enquire-now" className="inline-flex items-center gap-2 group">
                <span className="text-sm font-black uppercase tracking-[0.15em] bg-zinc-900 text-white px-7 py-3.5 rounded-full group-hover:bg-red-600 transition-colors duration-300">
                  Let&apos;s Craft Something
                </span>
                <span className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center group-hover:bg-zinc-900 transition-colors duration-300">
                  <ArrowRight className="w-5 h-5 text-white" />
                </span>
              </Link>
            </motion.div>

            {/* Decorative ring */}
            <motion.div
              className="relative flex items-center justify-center flex-shrink-0"
              initial={{ opacity: 0, rotate: -20 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {merchring}
              <span className="absolute">{triangle}</span>
            </motion.div>
          </div>

          <motion.div className="flex items-center gap-3 mt-16" initial="hidden" animate="visible" custom={5} variants={fadeUp}>
            <span className="text-red-600 font-black text-sm">01</span>
            <div className="h-px flex-1 bg-zinc-200" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Gallery</span>
          </motion.div>
        </div>
      </section>

      {/* Image gallery */}
      <section className="px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left column */}
          <div className="grid gap-4 mt-12">
            <div className="relative h-[200px] bg-zinc-100 rounded-2xl overflow-hidden group">
              <Image src={stationery} alt="restomerchstationery" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="relative h-[300px] bg-zinc-100 rounded-2xl overflow-hidden group">
              <Image src={apron} alt="restomerchapron" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>

          {/* Center column */}
          <div className="relative">
            <div className="absolute -top-10 z-10 left-1/2 -translate-x-1/2">{star}</div>
            <div className="relative z-0 h-[550px] bg-zinc-100 rounded-2xl overflow-hidden group">
              <Image src={headlineimg} alt="restomerchheroimg" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>

          {/* Right column */}
          <div className="grid gap-4 lg:mt-12">
            <div className="relative h-[300px] bg-zinc-100 rounded-2xl overflow-hidden group">
              <Image src={chestshot} alt="restomerchprint-tshirt" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="relative h-[200px] bg-zinc-100 rounded-2xl overflow-hidden group">
              <Image src={cards} alt="restomerchstationerycards" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="bg-zinc-50 px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center gap-3 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="text-red-600 font-black text-sm">02</span>
            <div className="h-px flex-1 bg-zinc-200" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Services</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.services.features.slice(0, 3).map((item: any, index: number) => (
              <motion.div
                key={index}
                className="flex flex-col md:flex-row items-start md:items-stretch gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index * 0.5}
                variants={fadeUp}
              >
                <div className="flex-1">
                  <h2 className="text-xl font-black uppercase tracking-tight text-zinc-900 mb-2">{item.title}</h2>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                </div>
                {index !== 2 && <div className="hidden md:block w-px bg-zinc-200 self-stretch" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <RestoBenefits
        title={data.benefits.title}
        subtitle={data.benefits.subtitle}
        signature={data.starIcon}
        makeRequest={{
          title: "Make Your Request",
          image: "/services/merch/restomerchreq.svg",
        }}
        receiveRefine={{
          title: "Receive and Refine",
          image: "/services/merch/restomerchmedal.svg",
        }}
      />

      <RestoExpectation
        title={data.expectation.title}
        subtitle={data.expectation.subtitle}
        partnerCard={{
          title: "Your Brand merchandise",
          gradient: { from: "#3FCBFE", to: "#1B496F" },
          backgroundColor: "#99E2FF",
        }}
        typewriterPhrases={data.expectation.typewriterPhrases}
        buildingCard={data.expectation.buildingCard}
        supportCard={data.expectation.supportCard}
        iterationsCard={data.expectation.iterationsCard}
        services={data.expectation.services}
      />

      {/* Signature marquee — commented out
      <div className="border-t border-zinc-200 overflow-hidden">
        <div className="flex w-full overflow-x-hidden">
          <div className="animate-marquee-infinite flex min-w-full shrink-0 items-center">
            <Image src={data.signature} alt="signature" width={500} height={500} className="w-full" />
          </div>
          <div className="animate-marquee-infinite flex min-w-full shrink-0 items-center">
            <Image src={data.signature} alt="signature" width={500} height={500} className="w-full" />
          </div>
        </div>
      </div> */}
      <Footer />
    </main>
  );
}

export default RMerch;
