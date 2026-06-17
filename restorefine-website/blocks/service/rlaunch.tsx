"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Megaphone, Camera, Soup, TrendingUp, CheckCircle } from "lucide-react";
import { Footer } from "@/components/footer";
import { CaseStudiesSection } from "./resto-services/case-studies";

// ─── Data ───────────────────────────────────────────────────────────────────

const PILLARS = [
  { icon: <Megaphone className="w-5 h-5" />, title: "Pre-launch Buzz", desc: "Teaser content, countdowns, and behind-the-scenes that build anticipation before you open." },
  { icon: <Camera className="w-5 h-5" />, title: "Opening Day Coverage", desc: "Real-time content capture on your launch day — photos, reels, and stories that document the moment." },
  { icon: <Soup className="w-5 h-5" />, title: "Menu Drop Campaigns", desc: "Seasonal menu reveals and new dish spotlights that generate excitement and drive covers." },
  { icon: <TrendingUp className="w-5 h-5" />, title: "Post-launch Momentum", desc: "Follow-up content strategy that sustains the hype and converts first-time visitors into regulars." },
];

const PROCESS_STEPS = [
  { number: "01", title: "Brief & Discovery", description: "We learn your venue, your audience, and your goals." },
  { number: "02", title: "Campaign Strategy", description: "A content plan mapped to your launch timeline." },
  { number: "03", title: "Create & Deploy", description: "We produce and publish everything — you focus on your guests." },
  { number: "04", title: "Track & Report", description: "Real-time performance tracking with a post-launch review." },
];

const DELIVERABLES = ["Launch Strategy", "Teaser Content", "Reels & TikToks", "Photography", "Caption Writing", "Story Sequences", "Post-launch Review", "Performance Report"];

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } }) };

// ─── What Is Launch Campaigns ─────────────────────────────────────────────────

function LaunchOverview() {
  return (
    <section className="bg-zinc-50 px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-16">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 block mb-4">The Service</span>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900 leading-[1] mb-4">From Teaser To Sold-out Launch</h2>
          <p className="text-sm text-zinc-500 leading-relaxed mb-4">
            Whether you&apos;re opening a new venue, dropping a new menu, or running a seasonal event — a great launch campaign turns anticipation into action. We plan, create, and deploy content that fills your opening night and keeps guests talking for weeks.
          </p>
          <p className="text-sm text-zinc-500 leading-relaxed">From the first teaser to the post-launch wrap-up, every phase is mapped, produced, and published — so you can focus on running the room.</p>
        </motion.div>
        <motion.div className="relative h-[400px] rounded-2xl overflow-hidden bg-zinc-200" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
          <Image src="/services/media/pexels-fauxels-3184431.webp" alt="Launch campaign content creation" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tl from-red-900/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
              <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">What you get</p>
              <p className="text-sm font-semibold text-zinc-900">A full launch team — strategy, content, and coverage. 🚀</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── What We Do (pillars) ───────────────────────────────────────────────────────

function LaunchPillars() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <span className="text-red-600 font-black text-sm">02</span>
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">What We Do</span>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className="rounded-2xl border border-zinc-100 p-7 bg-white hover:border-red-100 hover:shadow-lg transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">{pillar.icon}</div>
              <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900 mb-2">{pillar.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works (process) ─────────────────────────────────────────────────────

function LaunchProcess() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <span className="text-red-600 font-black text-sm">03</span>
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">How It Works</span>
        </motion.div>

        <motion.h2 className="font-black uppercase tracking-tight text-zinc-900 mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="block relative z-0 text-4xl md:text-5xl leading-[0.95]">Your Launch,</span>
          <span className="block relative z-10 font-light text-red-600 normal-case leading-none" style={{ fontFamily: "var(--font-holiday), serif", fontSize: "clamp(3rem, 6vw, 4.5rem)", marginTop: "-0.5rem" }}>
            Our Blueprint.
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step, i) => (
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

// ─── Deliverables ─────────────────────────────────────────────────────────────

function LaunchDeliverables() {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto rounded-3xl bg-black px-6 md:px-12 lg:px-16 py-16 md:py-20">
        <motion.div className="flex items-center gap-3 mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <span className="text-red-500 font-black text-sm">04</span>
          <div className="h-px flex-1 bg-zinc-700" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">Deliverables</span>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white leading-[0.95] relative z-0">Everything</h2>
            <div className="relative z-10  text-red-600 normal-case leading-none mb-5" style={{ fontFamily: "var(--font-holiday), serif", fontSize: "clamp(3rem, 6vw, 4.5rem)", marginTop: "-0.5rem" }}>
              Included.
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">No add-ons, no hidden extras. Every launch package covers the full campaign lifecycle — from first teaser to post-launch review.</p>
            <div className="mt-8">
              <Link href="/enquire-now" className="inline-flex items-center gap-2 group">
                <span className="text-sm font-black uppercase tracking-[0.15em] border border-white/20 text-white px-7 py-3.5 rounded-full group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">Get a Quote</span>
                <span className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center group-hover:bg-white group-hover:text-red-600 transition-colors duration-300">
                  <ArrowRight className="w-5 h-5 text-white group-hover:text-red-600 transition-colors duration-300" />
                </span>
              </Link>
            </div>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
            {DELIVERABLES.map((item, i) => (
              <motion.div key={item} className="flex items-center gap-3 rounded-xl bg-zinc-800/60 border border-zinc-700/50 px-4 py-3" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-xs font-medium text-zinc-300">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function LaunchHero() {
  return (
    <section className="bg-white min-h-screen flex flex-col items-start justify-center px-6 md:px-12 lg:px-24 pt-36 pb-24 relative overflow-hidden">
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-red-50 via-violet-50 to-sky-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="max-w-7xl w-full mx-auto relative">
        <motion.span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-8" initial="hidden" animate="visible" variants={fadeUp}>
          Resto Launch
        </motion.span>
        <motion.h1 className="font-black uppercase tracking-tight text-zinc-900 mb-10" initial="hidden" animate="visible" custom={1} variants={fadeUp}>
          <span className="block relative z-0 text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7rem] leading-[0.9]">Open With</span>
          <span className="block relative z-10 font-light text-red-600 normal-case leading-none" style={{ fontFamily: "var(--font-holiday), serif", fontSize: "clamp(3.5rem, 11vw, 8.5rem)", marginTop: "-1.2rem" }}>
            Impact.
          </span>
        </motion.h1>
        <div className="flex flex-col md:flex-row items-start md:items-end gap-8">
          <motion.p className="max-w-sm text-sm text-zinc-500 leading-relaxed" initial="hidden" animate="visible" custom={2} variants={fadeUp}>
            We build the buzz before you open the doors — and keep the momentum going long after. Teaser content, opening day coverage, and a post-launch strategy that turns first-timers into regulars.
          </motion.p>
          <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}>
            <Link href="/enquire-now" className="inline-flex items-center gap-2 group">
              <span className="text-sm font-black uppercase tracking-[0.15em] bg-zinc-900 text-white px-7 py-3.5 rounded-full group-hover:bg-red-600 transition-colors duration-300">Start Your Campaign</span>
              <span className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center group-hover:bg-zinc-900 transition-colors duration-300">
                <ArrowRight className="w-5 h-5 text-white" />
              </span>
            </Link>
          </motion.div>
        </div>
        {/* Stats */}
        <motion.div className="grid grid-cols-3 gap-6 mt-20 pt-12 border-t border-zinc-100" initial="hidden" animate="visible" custom={4} variants={fadeUp}>
          {[
            { value: "4", label: "Campaign phases — teaser to wrap-up" },
            { value: "100%", label: "Opening day covered" },
            { value: "Ongoing", label: "Post-launch momentum" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-black text-zinc-900">{stat.value}</p>
              <p className="text-xs text-zinc-400 mt-1 leading-tight">{stat.label}</p>
            </div>
          ))}
        </motion.div>
        {/* Divider */}
        <motion.div className="flex items-center gap-4 mt-10" initial="hidden" animate="visible" custom={5} variants={fadeUp}>
          <span className="text-red-600 font-black text-sm">01</span>
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Overview</span>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

function RLaunch() {
  return (
    <main className="bg-white">
      <LaunchHero />
      <LaunchOverview />
      <LaunchPillars />
      <LaunchProcess />
      <LaunchDeliverables />

      <CaseStudiesSection sectionNumber="05" sectionLabel="Case Studies" categories={["Media"]} />

      <Footer />
    </main>
  );
}

export default RLaunch;
