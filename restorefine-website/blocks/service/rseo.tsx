"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import Cta from "@/components/cta";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const serviceCards = [
  {
    title: "Local SEO",
    description:
      "Optimise for 'near me' searches and dominate your local area on Google Maps and organic results.",
  },
  {
    title: "Google Business Profile",
    description:
      "A fully optimised, actively managed GBP that drives calls, directions, and reservations.",
  },
  {
    title: "On-page SEO",
    description:
      "Page structure, metadata, content, and schema markup that tells search engines exactly what you offer.",
  },
  {
    title: "Link Building",
    description:
      "Building authority through quality backlinks from food guides, local directories, and press coverage.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "SEO Audit",
    description:
      "We analyse your current ranking, site health, and competitor landscape.",
  },
  {
    number: "02",
    title: "Strategy & Setup",
    description: "Keyword targeting, GBP optimisation, and technical fixes.",
  },
  {
    number: "03",
    title: "On-going Optimisation",
    description:
      "Monthly content, link outreach, and performance tuning.",
  },
  {
    number: "04",
    title: "Reporting",
    description: "Monthly ranking reports and traffic analysis.",
  },
];

const deliverables = [
  "SEO Audit",
  "Keyword Research",
  "GBP Management",
  "On-page Optimisation",
  "Schema Markup",
  "Monthly Blog Posts",
  "Link Building",
  "Monthly Reports",
];

function RSeo() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center bg-zinc-950 px-6 py-24 text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400"
        >
          Performance Pillar — 02
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="mb-6 font-black uppercase leading-none tracking-tight text-white"
          style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)" }}
        >
          SEARCH ENGINE
          <br />
          <span>OPTIMISATION</span>
          <span className="text-red-600">.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-zinc-400"
        >
          Get found by the guests who are already looking for you — right when
          they&apos;re ready to book.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/contact"
            className="rounded-none bg-red-600 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-red-700"
          >
            Get an SEO Audit
          </Link>
          <Link
            href="/portfolio"
            className="rounded-none border border-zinc-600 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-colors hover:border-white"
          >
            See Our Work
          </Link>
        </motion.div>
      </section>

      {/* ── What We Do ── */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400"
          >
            01 ── What We Do
          </motion.p>

          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2
                className="mb-6 font-black uppercase leading-tight text-zinc-900"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
              >
                Be the first thing hungry guests see.
              </h2>
              <p className="leading-relaxed text-zinc-600">
                When someone searches &quot;best restaurant near me&quot; or
                &quot;pizza delivery Glasgow&quot;, your venue should be at the
                top. We build and manage your local SEO presence across your
                website, Google Business Profile, and beyond — so you capture
                those high-intent searches before competitors do.
              </p>
            </motion.div>

            {/* Right: 2×2 service cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              {serviceCards.map((card) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  className="border border-zinc-200 p-6"
                >
                  <h3 className="mb-2 text-sm font-black uppercase tracking-wide text-zinc-900">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-500">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="bg-zinc-50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400"
          >
            02 ── How It Works
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 font-black uppercase leading-tight text-zinc-900"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            From invisible to unmissable.
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {processSteps.map((step) => (
              <motion.div key={step.number} variants={fadeUp}>
                <p className="mb-3 text-4xl font-black text-red-600">
                  {step.number}
                </p>
                <h3 className="mb-2 text-sm font-black uppercase tracking-wide text-zinc-900">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400"
          >
            03 ── Deliverables
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 font-black uppercase leading-tight text-zinc-900"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            A complete local SEO service.
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {deliverables.map((item) => (
              <motion.div
                key={item}
                variants={fadeUp}
                className="flex items-start gap-3 border border-zinc-100 bg-zinc-50 p-5"
              >
                <svg
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-bold uppercase tracking-wide text-zinc-800">
                  {item}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <Cta />

      {/* ── Footer ── */}
      <Footer />
    </>
  );
}

export default RSeo;
