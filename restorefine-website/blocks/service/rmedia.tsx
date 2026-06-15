"use client";
import React from "react";
import Image from "next/image";
import moneyeye from "@/public/rmediahero.svg";
import ctabg from "@/public/rmediactabg.webp";
import { RestoOverview } from "./resto-services/resto-overview";
import bio from "@/public/services/media/restomediabio.webp";
import { RestoExpectation } from "./resto-services/resto-expectation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import { CaseStudiesSection } from "./resto-services/case-studies";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

function RMedia({ data }: { data: any }) {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-white min-h-screen flex flex-col md:flex-row items-start md:items-center justify-between gap-12 px-6 md:px-12 lg:px-24 pt-36 pb-24">
        <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
          <div className="flex flex-col items-start gap-y-6 flex-1">
            <motion.span
              className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              RestoMedia
            </motion.span>
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-zinc-900 leading-[0.9]"
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeUp}
            >
              Shot, Shared,
              <br />
              <span className="text-red-600">&amp; Selling Out</span>
            </motion.h1>
            <motion.p
              className="max-w-sm text-sm text-zinc-500 leading-relaxed"
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeUp}
            >
              From perfectly lit plates to behind-the-scenes reels, we turn your business into the content your audience didn&apos;t know they needed.
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
            <motion.div className="flex items-center gap-3 w-full mt-8" initial="hidden" animate="visible" custom={4} variants={fadeUp}>
              <span className="text-red-600 font-black text-sm">01</span>
              <div className="h-px flex-1 bg-zinc-200" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Overview</span>
            </motion.div>
          </div>

          <motion.div
            className="w-full md:w-[420px] lg:w-[480px] flex-shrink-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={moneyeye || "/placeholder.svg"} alt="Money Eye" width={450} height={450} className="w-full h-auto" />
          </motion.div>
        </div>
      </section>

      {/* What is Resto Media */}
      <section className="bg-zinc-50 px-6 md:px-12 lg:px-24 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <motion.div
            className="relative h-[380px] rounded-2xl overflow-hidden bg-zinc-200"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={bio} alt="resto media bio" fill className="object-cover w-full" />
          </motion.div>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 block">The Service</span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-900 leading-[1]">What Is Resto Media</h2>
            <p className="text-sm text-zinc-500 leading-relaxed">
              RestoMedia manages your social media and content creation, delivering high-quality photography and videography that showcases the best of your business. We handle your social platforms, ensuring engaging content that drives visibility and customer interaction.
            </p>
          </motion.div>
        </div>
      </section>

      <RestoOverview {...data.overview} />

      {/* CTA banner image */}
      <section className="px-6 md:px-12 lg:px-24 py-12">
        <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden">
          <Image src={ctabg} alt="mediactabackground" width={1400} height={600} className="w-full object-cover" />
        </div>
      </section>

      <RestoExpectation
        title={data.expectation.title}
        subtitle={data.expectation.subtitle}
        partnerCard={{
          title: "Showcase your Business",
          gradient: { from: "#FFE0A7", to: "#483920" },
          backgroundColor: "#C9A585",
        }}
        typewriterPhrases={data.expectation.typewriterPhrases}
        buildingCard={data.expectation.buildingCard}
        supportCard={data.expectation.supportCard}
        iterationsCard={data.expectation.iterationsCard}
        services={data.expectation.services}
      />

      <CaseStudiesSection
        sectionNumber="04"
        sectionLabel="Case Studies"
        categories={["Media", "Branding"]}
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

export default RMedia;
