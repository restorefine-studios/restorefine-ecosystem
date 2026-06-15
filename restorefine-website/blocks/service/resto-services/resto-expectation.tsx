"use client";

import React from "react";
import { TypewriterText } from "@/components/typewriterText";
import Image from "next/image";
import { motion } from "framer-motion";

interface PartnerCard {
  title: string;
  gradient: {
    from: string;
    to: string;
  };
  backgroundColor: string;
}

interface BuildingCard {
  image: string;
  title: string;
  subtitle: string;
}

interface SupportCard {
  avatar: string;
  textImage: string;
  title: string;
  subtitle: string;
}

interface IterationsCard {
  image: string;
  title: string;
  subtitle: string;
}

interface RestoExpectationProps {
  title: string;
  subtitle: string;
  partnerCard: PartnerCard;
  typewriterPhrases: string[];
  buildingCard: BuildingCard;
  supportCard: SupportCard;
  iterationsCard: IterationsCard;
  services: string[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function RestoExpectation({
  title,
  subtitle,
  partnerCard,
  typewriterPhrases,
  buildingCard,
  supportCard,
  iterationsCard,
  services,
}: RestoExpectationProps) {
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
          <span className="text-red-600 font-black text-sm">03</span>
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">What To Expect</span>
        </motion.div>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 leading-[0.95] max-w-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
          >
            {title.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index !== title.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </motion.h2>
          <motion.p
            className="max-w-xs text-sm text-zinc-500 leading-relaxed"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end mb-8">
          {/* Partner card */}
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            variants={fadeUp}
          >
            <div
              className="absolute -top-4 left-5 w-[88%] h-[280px] sm:h-[320px] rounded-2xl"
              style={{ backgroundColor: partnerCard.backgroundColor, opacity: 0.3 }}
            />
            <div
              className="relative w-full h-[280px] sm:h-[320px] rounded-2xl overflow-hidden flex items-center justify-center"
              style={{
                background: `linear-gradient(to bottom right, ${partnerCard.gradient.from}, ${partnerCard.gradient.to})`,
              }}
            >
              <style jsx global>{`
                @import url("https://fonts.googleapis.com/css2?family=Homemade+Apple&display=swap");
              `}</style>
              <h3
                className="text-center"
                style={{
                  fontFamily: "'Homemade Apple', cursive",
                  transform: "rotate(-10deg)",
                  maxWidth: "80%",
                  lineHeight: 1.4,
                }}
              >
                <span className="text-white text-4xl">
                  {partnerCard.title.split(" ").map((word, index, array) => (
                    <React.Fragment key={index}>
                      {index === 1 ? (
                        <span className="text-black">{word}</span>
                      ) : (
                        word
                      )}
                      {index !== array.length - 1 && " "}
                      {index === 1 && <br />}
                    </React.Fragment>
                  ))}
                </span>
              </h3>
            </div>
          </motion.div>

          {/* Typewriter card */}
          <motion.div
            className="h-[280px] sm:h-[320px] md:h-[340px] bg-zinc-50 border border-zinc-100 rounded-2xl lg:col-span-2 p-6 sm:p-8 flex justify-center items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            variants={fadeUp}
          >
            <TypewriterText phrases={typewriterPhrases} />
          </motion.div>

          {/* Building card */}
          <motion.section
            className={`${buildingCard.image === "" ? "hidden" : "flex"} h-[180px] sm:h-[200px] rounded-2xl p-4 sm:p-6 items-center justify-center overflow-hidden relative bg-zinc-900`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={5}
            variants={fadeUp}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-2xl" />
            <div className="flex items-center gap-4 relative z-10">
              <Image
                src={buildingCard.image || "/placeholder.svg?height=80&width=80"}
                alt="Globe"
                width={80}
                height={80}
                className="rounded-full w-16 h-16 sm:w-20 sm:h-20"
              />
              <div className="text-white capitalize">
                <h3 className="text-xl sm:text-2xl font-black uppercase leading-tight">
                  {buildingCard.title}
                </h3>
                <span className="flex items-center gap-x-1">
                  <span className="text-base font-black uppercase text-white/50">For</span>
                  <span className="text-xl sm:text-2xl font-black uppercase">{buildingCard.subtitle}</span>
                </span>
              </div>
            </div>
          </motion.section>

          {/* Support card */}
          <motion.section
            className={`${supportCard.avatar === "" ? "hidden" : "relative"} h-[180px] sm:h-[200px] bg-zinc-50 border border-zinc-100 rounded-2xl overflow-hidden`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={6}
            variants={fadeUp}
          >
            <div className="absolute top-5 left-5 flex flex-row items-center gap-3">
              <Image
                src={supportCard.avatar || "/placeholder.svg?height=80&width=80"}
                alt="Communications Support Avatar"
                width={80}
                height={80}
                className="object-contain w-[60px]"
              />
              <Image
                src={iterationsCard.image || "/placeholder.svg?height=80&width=80"}
                alt="Communications Support Text"
                width={80}
                height={80}
                className="object-contain w-[140px]"
              />
            </div>
            <div className="absolute bottom-5 left-5">
              <h3 className="text-xl font-black uppercase text-zinc-900">{supportCard.title}</h3>
              <p className="text-xs text-zinc-400">{supportCard.subtitle}</p>
            </div>
          </motion.section>

          {/* Iterations card */}
          <motion.section
            className={`${iterationsCard.image === "" ? "hidden" : "relative"} h-[180px] sm:h-[200px] bg-zinc-50 border border-zinc-100 rounded-2xl overflow-hidden`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={7}
            variants={fadeUp}
          >
            <div className="flex items-center justify-center p-0">
              <Image
                src={supportCard.textImage || "/placeholder.svg?height=80&width=80"}
                alt="Resto Iterations Pulse"
                width={80}
                height={80}
                className="absolute bottom-6 object-contain w-[80%]"
              />
            </div>
            <div className="absolute bottom-5 left-5">
              <h3 className="text-xl font-black uppercase text-zinc-900">{iterationsCard.title}</h3>
              <p className="text-xs text-zinc-400">{iterationsCard.subtitle}</p>
            </div>
          </motion.section>
        </div>

        {/* Service tags */}
        <motion.div
          className="flex flex-wrap gap-2 pt-6 border-t border-zinc-200"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          {services.map((service) => (
            <span
              key={service}
              className="px-5 py-2.5 text-xs font-black uppercase tracking-[0.1em] text-zinc-600 border border-zinc-200 rounded-full hover:border-red-600 hover:text-red-600 transition-colors cursor-default"
            >
              {service}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
