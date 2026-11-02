"use client";

import Image from "next/image";
// import Link from "next/link"; // re-enable with the service page links below
import { useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check } from "lucide-react"; // add ArrowUpRight back with the service page links
import { homeContent, type PageContent } from "@/lib/homepageData";
import { EnquireLink } from "./cta-links";
import { Reveal } from "./reveal";
import { type } from "./type-scale";

const ease = [0.16, 1, 0.3, 1] as const;

type Service = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  items?: string[];
  image: { src: string; alt: string } | null;
  href: string;
};


function ServicePanel({ service }: { service: Service }) {
  return (
    <div className="grid h-full flex-1 gap-8 rounded-[2rem] bg-white p-7 sm:p-10 xl:grid-cols-[1.15fr_1fr] xl:gap-10">
      <div className="flex flex-col">
        <h3 className="text-[clamp(1.9rem,3.2vw,3rem)] font-black uppercase leading-[0.95] tracking-[-0.04em] text-zinc-950">{service.title}</h3>
        <p className="mt-5 text-lg font-bold text-zinc-950">{service.tagline}</p>
        <p className="mt-3 leading-relaxed text-zinc-600">{service.description}</p>

        {service.items && (
          <ul className="mt-7 grid gap-3">
            {service.items.map((item) => (
              <li key={item} className="flex items-center gap-3 font-medium text-zinc-800">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
                  <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* Service page links: re-enable once each service has its own page (set `href` in lib/data.ts).
        <Link
          href={service.href}
          className="group mt-auto inline-flex items-center gap-2 self-start pt-8 text-sm font-semibold text-zinc-950 no-underline transition-colors hover:text-red-600"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-white transition-[transform,background-color] duration-300 group-hover:-translate-y-0.5 group-hover:bg-red-600">
            <ArrowUpRight aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
          </span>
          {service.title}
        </Link>
        */}
      </div>

      {service.image ? (
        <div className="relative min-h-[16rem] overflow-hidden rounded-[1.5rem] bg-zinc-100 xl:min-h-0">
          <Image src={service.image.src} alt={service.image.alt} fill sizes="(min-width: 1280px) 30vw, 100vw" className="object-cover" />
        </div>
      ) : (
        <div aria-hidden="true" className="hidden rounded-[1.5rem] bg-[#f2f4f6] xl:block" />
      )}
    </div>
  );
}

function ServiceTabs({ services }: { services: PageContent["services"] }) {
  // Every service in one menu: the core five (with sub-service lists) then the rest
  const allServices: Service[] = [...services.core, ...services.more];
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  // Arrow keys move between tabs, as expected for a tablist
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    const delta = keys[event.key];
    if (!delta) return;
    event.preventDefault();
    const next = (active + delta + allServices.length) % allServices.length;
    setActive(next);
    document.getElementById(`service-tab-${allServices[next].id}`)?.focus();
  }

  return (
    <div className="mt-14 rounded-[2.5rem] bg-[#f2f4f6] p-3 sm:p-4 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-4">
      <div
        role="tablist"
        aria-label={services.heading}
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-3 [scrollbar-width:none] sm:-mx-4 sm:px-4 lg:col-span-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {allServices.map((service, i) => {
          const isActive = i === active;
          return (
            <button
              key={service.id}
              id={`service-tab-${service.id}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`service-panel-${service.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              className={`group flex shrink-0 items-center justify-between gap-4 whitespace-nowrap rounded-full px-5 py-3 text-left text-sm font-bold transition-colors duration-300 lg:rounded-[1.25rem] lg:px-6 lg:py-4 lg:text-lg ${
                isActive ? "bg-red-600 text-white" : "bg-white text-zinc-700 hover:text-zinc-950"
              }`}
            >
              {service.title}
              <ArrowRight
                aria-hidden="true"
                className={`hidden h-5 w-5 shrink-0 transition-[transform,opacity] duration-300 lg:block ${
                  isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-40"
                }`}
                strokeWidth={2}
              />
            </button>
          );
        })}
      </div>

      {/* All panels stay in the DOM so every service remains crawlable; only the active one shows */}
      <div className="flex flex-col lg:col-span-8">
        {allServices.map((service, i) => (
          // `flex` only on the active panel: a display class would override the hidden attribute
          <div key={service.id} id={`service-panel-${service.id}`} role="tabpanel" aria-labelledby={`service-tab-${service.id}`} hidden={i !== active} className={i === active ? "flex flex-1 flex-col" : undefined}>
            {i === active ? (
              <motion.div className="flex flex-1 flex-col" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}>
                <ServicePanel service={service} />
              </motion.div>
            ) : (
              <ServicePanel service={service} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Services({ services = homeContent.services }: { services?: PageContent["services"] }) {
  return (
    <section id="services" className="py-24 lg:py-32">
      <Reveal>
        <h2 className={`max-w-[18ch] ${type.section} font-black uppercase leading-[0.98] tracking-[-0.04em] text-zinc-950`}>{services.heading}</h2>
        <p className="mt-7 max-w-[65ch] text-base leading-relaxed text-zinc-600 sm:text-lg">{services.body}</p>
      </Reveal>
      <ServiceTabs services={services} />
      <div className="mt-12">
        <EnquireLink {...services.cta} />
      </div>
    </section>
  );
}
