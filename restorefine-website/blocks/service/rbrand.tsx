"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { CaseStudiesSection } from "./resto-services/case-studies";
import { brandPillarContent } from "@/lib/pillar-content/brand-pillar";

// ─── Data ───────────────────────────────────────────────────────────────────

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } }) };

// ─── Hero ─────────────────────────────────────────────────────────────────────

function BrandHero() {
  return (
    <section className="bg-white min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-24 pt-20 pb-24 relative overflow-hidden">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-red-50 via-violet-50 to-sky-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="max-w-4xl w-full mx-auto relative flex flex-col items-center">
        <motion.span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-8" initial="hidden" animate="visible" variants={fadeUp}>
          Resto Brand
        </motion.span>
        <motion.h1 className="font-black uppercase tracking-tight text-zinc-900 mb-10" initial="hidden" animate="visible" custom={1} variants={fadeUp}>
          <span className="block relative z-0 text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7rem] leading-[0.9]">First Impressions</span>
          <span className="block relative z-10 font-light text-red-600 normal-case leading-none whitespace-nowrap" style={{ fontFamily: "var(--font-holiday), serif", fontSize: "clamp(3.5rem, 11vw, 8.5rem)", marginTop: "-1.2rem" }}>
            Make It Count.
          </span>
        </motion.h1>
        <motion.p className="max-w-lg text-sm text-zinc-500 leading-relaxed mb-8" initial="hidden" animate="visible" custom={2} variants={fadeUp}>
          {brandPillarContent.hero.description}
        </motion.p>
        <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}>
          <Link href="/enquire-now" className="inline-flex items-center gap-2 group">
            <span className="text-sm font-black uppercase tracking-[0.15em] bg-zinc-900 text-white px-7 py-3.5 rounded-full group-hover:bg-red-600 transition-colors duration-300">Build Your Brand</span>
            <span className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center group-hover:bg-zinc-900 transition-colors duration-300">
              <ArrowRight className="w-5 h-5 text-white" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 01 Overview ────────────────────────────────────────────────────────────

function BrandOverview() {
  return (
    <section className="bg-zinc-50 px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <span className="text-red-600 font-black text-sm">01</span>
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Overview</span>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 block mb-4">The Service</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900 leading-[1] mb-4">{brandPillarContent.overview.heading}</h2>
            <p className="text-sm text-zinc-500 leading-relaxed">{brandPillarContent.overview.body}</p>
          </motion.div>
          <motion.div className="relative h-[400px] rounded-2xl overflow-hidden bg-zinc-200" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
            <Image src="/services/branding/pexels-mikael-blomkvist-6476579.webp" alt="Brand identity design" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tl from-red-900/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">What you get</p>
                <p className="text-sm font-semibold text-zinc-900">A brand system built to be recognised at a glance. 🎨</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── 02 What We Do ──────────────────────────────────────────────────────────

function BrandServices() {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <span className="text-red-600 font-black text-sm">02</span>
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Our Services</span>
        </motion.div>

        <div className="space-y-24">
          {brandPillarContent.subServices.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={service.number}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={`relative rounded-2xl overflow-hidden bg-zinc-200 aspect-[4/3] ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-red-600 mb-3">{service.number}</p>
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900 leading-[0.95] mb-4">{service.title}</h3>
                  <p className="text-zinc-500 leading-relaxed mb-6">{service.description}</p>

                  <div className="mb-7">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-3">What&apos;s Included</p>
                    <div className="flex flex-wrap gap-2">
                      {service.includes.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1.5 text-xs font-black uppercase tracking-[0.1em] text-zinc-600 border border-zinc-200 rounded-full bg-white"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {service.href && (
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-zinc-900 hover:text-red-600 transition-colors duration-200 group"
                    >
                      Learn More
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── 03 How It Works ────────────────────────────────────────────────────────

function BrandProcess() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <span className="text-red-600 font-black text-sm">03</span>
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">How It Works</span>
        </motion.div>

        <motion.h2 className="font-black uppercase tracking-tight text-zinc-900 mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="block relative z-0 text-4xl md:text-5xl leading-[0.95]">A Simple Process That Gets</span>
          <span className="block relative z-10 font-light text-red-600 normal-case leading-none" style={{ fontFamily: "var(--font-holiday), serif", fontSize: "clamp(3rem, 6vw, 4.5rem)", marginTop: "-0.5rem" }}>
            Results.
          </span>
        </motion.h2>

        <motion.p className="max-w-2xl text-sm text-zinc-500 leading-relaxed mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
          {brandPillarContent.process.intro}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {brandPillarContent.process.steps.map((step, i) => (
            <motion.div key={step.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <p className="mb-3 text-4xl font-black text-red-600">{step.number}</p>
              <h3 className="mb-2 text-sm font-black uppercase tracking-wide text-zinc-900">{step.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-500">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

function RBrand() {
  return (
    <main className="bg-white">
      <BrandHero />
      <BrandOverview />
      <BrandServices />
      <BrandProcess />

      <CaseStudiesSection sectionNumber="04" sectionLabel="Case Studies" categories={["Branding", "Menus"]} />

      <Footer />
    </main>
  );
}

export default RBrand;
