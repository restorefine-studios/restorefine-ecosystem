"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, ChevronDown, ArrowUpRight } from "lucide-react";
import { pillars } from "./navbar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const WHATSAPP_HREF = `https://wa.me/441414835850?text=${encodeURIComponent("Hi RestoRefine Studios, I'd like to find out more about your services.")}`;

export function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);

  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="default" className="px-3 text-zinc-900 bg-transparent hover:bg-zinc-100">
          <Menu className="w-12 h-12" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[80%] bg-white border border-black/10 text-zinc-900 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-zinc-900">
            <Link href="/" onClick={close}>Go Home</Link>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col gap-0">

          {/* Services accordion */}
          <div className="border-b border-zinc-100">
            <button
              onClick={() => setServicesOpen((v) => !v)}
              className="w-full flex items-center justify-between py-4 text-sm font-medium text-zinc-900"
            >
              <Link
                href="/services"
                className="flex-grow text-left"
                onClick={(e) => { e.stopPropagation(); close(); }}
              >
                Services
              </Link>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {servicesOpen && (
              <div className="pb-4 flex flex-col gap-5">
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
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="py-4 border-b border-zinc-100 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Button asChild className="w-full rounded-lg bg-zinc-900 text-white hover:bg-zinc-700">
            <Link href="/enquire-now" onClick={close}>Enquire Now</Link>
          </Button>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <Image src="/whatsapp.svg" alt="" width={18} height={18} className="brightness-0 invert" />
            WhatsApp Us
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
