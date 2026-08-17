"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, ChevronDown, ArrowUpRight, ArrowRight } from "lucide-react";
import { pillars } from "./navbar";
import Image from "next/image";
import navlogo from "@/public/restorefine-logoblack.svg";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { pushGTMEvent } from "@/lib/gtm";

const WHATSAPP_HREF = `https://wa.me/441414835850?text=${encodeURIComponent("Hi RestoRefine Studios, I'd like to find out more about your services.")}`;

export function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);

  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <button className="p-2 text-zinc-900" aria-label="Toggle menu">
          <Menu className="w-7 h-7" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="top"
        className="left-3 right-3 top-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-[420px] max-h-[85vh] overflow-y-auto rounded-b-[28px] border-0 bg-white text-zinc-900 flex flex-col p-0 shadow-2xl"
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>

        {/* Header: logo top-left, built-in close (X) sits top-right */}
        <div className="flex items-center px-6 pt-6 pb-2">
          <Link href="/" onClick={close}>
            <Image src={navlogo} alt="RestoRefine" width={28} height={28} />
          </Link>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto px-6 mt-4 flex flex-col">
          {/* Services accordion */}
          <div className="border-b border-zinc-100">
            <button
              onClick={() => setServicesOpen((v) => !v)}
              className="w-full flex items-center justify-between py-5 text-lg text-zinc-900"
            >
              <Link
                href="/services"
                className="flex-grow text-left"
                onClick={(e) => { e.stopPropagation(); close(); }}
              >
                Services
              </Link>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {servicesOpen && (
              <div className="pb-5 flex flex-col gap-5">
                {pillars.map((pillar) => (
                  <div key={pillar.id}>
                    {/* Pillar header */}
                    <Link
                      href={pillar.href}
                      onClick={close}
                      className="flex items-center justify-between mb-2 px-1"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-red-600">{pillar.id}</span>
                        <span className="text-xs font-black uppercase tracking-[0.15em] text-zinc-900">
                          {pillar.title}
                        </span>
                      </div>
                      <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                    </Link>

                    {/* Sub-services */}
                    <div className="flex flex-col gap-1 pl-5">
                      {pillar.services.map((service) => {
                        const Icon = service.icon;
                        return (
                          <Link
                            key={service.title}
                            href={service.href}
                            onClick={close}
                            className="flex items-center gap-2 py-1.5 text-zinc-500 hover:text-zinc-900 transition-colors"
                          >
                            <Icon className="h-3.5 w-3.5 text-red-600 flex-shrink-0" />
                            <span className="text-sm">{service.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Other links */}
          {[
            { label: "Portfolio", href: "/portfolio" },
            { label: "Resources", href: "/resources" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="py-5 border-b border-zinc-100 text-lg text-zinc-900"
            >
              {item.label}
            </Link>
          ))}

          <Link href="/contact" onClick={close} className="py-5 text-lg text-zinc-900">
            Contact
          </Link>
        </div>

        {/* Footer: secondary WhatsApp link + primary CTA, side by side */}
        <div className="flex items-center justify-between gap-3 px-6 py-6 border-t border-zinc-100">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => pushGTMEvent("whatsapp_click", { location: "header" })}
            className="flex items-center gap-2 text-zinc-600"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#25D366]">
              <Image src="/whatsapp.svg" alt="" width={16} height={16} className="brightness-0 invert" />
            </span>
            WhatsApp
          </a>
          <Link
            href="/enquire-now"
            onClick={close}
            className="inline-flex items-center gap-2 rounded-full bg-red-600 hover:bg-red-500 transition-colors text-white text-sm font-semibold px-5 py-3"
          >
            Enquire Now
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
