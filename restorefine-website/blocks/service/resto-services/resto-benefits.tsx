"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface BenefitStep {
  title: string;
  image: string;
}

interface RestoBenefitsProps {
  title: string;
  subtitle: string;
  signature: string;
  makeRequest: BenefitStep;
  receiveRefine: BenefitStep;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function RestoBenefits({
  title,
  subtitle,
  signature,
  makeRequest,
  receiveRefine,
}: RestoBenefitsProps) {
  return (
    <section className="bg-white px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="text-red-600 font-black text-sm">02</span>
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">How It Works</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left: text + signature */}
          <motion.div
            className="flex flex-col gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900 leading-[1] mb-4">
                {title.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index !== title.split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed">{subtitle}</p>
            </div>

            <Image
              src={signature || "/placeholder.svg"}
              alt="signature"
              width={200}
              height={200}
              className="object-contain opacity-80"
            />
          </motion.div>

          {/* Right: two process cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Make a Request */}
            <motion.div
              className="flex flex-col gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fadeUp}
            >
              <div className="flex items-center gap-3">
                <span className="border border-zinc-200 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-black uppercase tracking-[0.1em] text-zinc-400">01</span>
                </span>
                <span className="bg-zinc-900 text-white text-xs font-black uppercase tracking-[0.15em] rounded-xl flex-1 h-14 flex items-center justify-center">
                  {makeRequest.title}
                </span>
              </div>
              <div className="rounded-2xl bg-zinc-50 border border-zinc-100 h-[320px] flex items-center justify-center overflow-hidden p-6 group">
                <Image
                  src={makeRequest.image || "/placeholder.svg"}
                  alt="make a request"
                  width={200}
                  height={200}
                  className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Receive & Refine */}
            <motion.div
              className="flex flex-col gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
              variants={fadeUp}
            >
              <div className="rounded-2xl bg-zinc-50 border border-zinc-100 h-[320px] flex items-center justify-center overflow-hidden p-6 group">
                <Image
                  src={receiveRefine.image || "/placeholder.svg"}
                  alt="receive and refine"
                  width={200}
                  height={200}
                  className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="bg-red-600 text-white text-xs font-black uppercase tracking-[0.15em] rounded-xl w-full h-14 flex items-center justify-center">
                {receiveRefine.title}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RestoBenefits;
