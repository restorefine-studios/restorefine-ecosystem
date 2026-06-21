"use client";

import * as React from "react";
import Link from "next/link";
import {
  Palette, Printer, Package, Layers, Shirt,
  Video, Share2, Rocket, LayoutList, Camera,
  Globe, Search, TrendingUp, Target, BarChart3,
  ArrowUpRight,
} from "lucide-react";
import { MobileMenu } from "./mobile-menu";
import navlogo from "@/public/restorefine-logoblack.svg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

export interface NavService {
  title: string;
  href: string;
  icon: React.ElementType;
}

export interface NavPillar {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  services: NavService[];
}

export const pillars: NavPillar[] = [
  {
    id: "01",
    title: "Brand",
    description: "Identity & print",
    href: "/services/brand",
    icon: Palette,
    services: [
      { title: "Branding", href: "/services/brand", icon: Palette },
      { title: "Menu Design & Print", href: "/services/brand", icon: Printer },
      { title: "Packaging", href: "/services/brand", icon: Package },
      { title: "Social Branding", href: "/services/brand", icon: Layers },
      { title: "Merchandise", href: "/services/brand", icon: Shirt },
    ],
  },
  {
    id: "02",
    title: "Content",
    description: "Reels & campaigns",
    href: "/services/content",
    icon: Video,
    services: [
      { title: "Short-form Content", href: "/services/content", icon: Video },
      { title: "Social Media Management", href: "/services/content", icon: Share2 },
      { title: "Launch Campaigns", href: "/services/launch-campaigns", icon: Rocket },
      { title: "Content Strategy", href: "/services/content", icon: LayoutList },
      { title: "Photography", href: "/services/content", icon: Camera },
    ],
  },
  {
    id: "03",
    title: "Performance",
    description: "Websites & growth",
    href: "/services/performance",
    icon: Globe,
    services: [
      { title: "Websites", href: "/services/performance", icon: Globe },
      { title: "SEO", href: "/services/performance", icon: Search },
      { title: "Paid Ads", href: "/services/performance", icon: TrendingUp },
      { title: "Conversion Optimisation", href: "/services/performance", icon: Target },
      { title: "Analytics", href: "/services/performance", icon: BarChart3 },
    ],
  },
];

/* keep old export so mobile-menu doesn't break during transition */
export const services = pillars.flatMap((p) => p.services);

/* ------------------------------------------------------------------ */
/* Mega-menu pillar column                                              */
/* ------------------------------------------------------------------ */
function PillarColumn({ pillar }: { pillar: NavPillar }) {
  return (
    <div className="flex flex-col gap-1">
      {/* Pillar header */}
      <Link
        href={pillar.href}
        className="group flex items-center justify-between mb-2 px-2 py-1.5 rounded-lg hover:bg-zinc-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-red-600 tabular-nums">{pillar.id}</span>
          <span className="text-xs font-black uppercase tracking-[0.15em] text-zinc-900">{pillar.title}</span>
        </div>
        <ArrowUpRight className="w-3 h-3 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      {/* Divider */}
      <div className="h-px bg-zinc-100 mb-2" />

      {/* Sub-services */}
      {pillar.services.map((service) => (
        <ServiceItem key={service.title} service={service} />
      ))}
    </div>
  );
}

function ServiceItem({ service }: { service: NavService }) {
  const Icon = service.icon;
  return (
    <NavigationMenuLink asChild>
      <Link
        href={service.href}
        className={cn(
          "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors",
          "hover:bg-zinc-50 group"
        )}
      >
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-black/8 bg-red-50">
          <Icon className="size-3 text-red-600" />
        </div>
        <span className="text-[13px] text-zinc-600 group-hover:text-zinc-900 font-medium leading-none">
          {service.title}
        </span>
      </Link>
    </NavigationMenuLink>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                               */
/* ------------------------------------------------------------------ */
export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-b-black/10 text-sm font-medium">
      <div className="flex h-20 px-4 md:px-8 items-center justify-between">
        {/* Logo */}
        <Link href="/" passHref>
          <Image src={navlogo || "/placeholder.svg"} alt="RestoRefine" width={25} height={25} />
        </Link>

        {/* Nav links */}
        <div className="ml-20 hidden md:block">
          <div className="rounded-full border border-black/10 px-10 py-1">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-x-8">

                {/* Services mega-menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent font-medium text-zinc-500 hover:bg-transparent hover:text-zinc-900 data-[state=open]:bg-transparent">
                    <Link href="/services">Services</Link>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[680px] p-5 rounded-[24px] border border-black/10 bg-white shadow-xl">
                      {/* 3-column pillar grid */}
                      <div className="grid grid-cols-3 gap-5">
                        {pillars.map((pillar) => (
                          <PillarColumn key={pillar.id} pillar={pillar} />
                        ))}
                      </div>

                      {/* Bottom bar */}
                      <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between">
                        <p className="text-[11px] text-zinc-400 font-medium">
                          Everything your hospitality brand needs — under one roof.
                        </p>
                        <Link
                          href="/services"
                          className="flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.15em] text-red-600 hover:text-red-500 transition-colors"
                        >
                          All Services <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/portfolio" legacyBehavior passHref>
                    <NavigationMenuLink className="bg-transparent text-zinc-500 hover:bg-transparent hover:text-zinc-900">
                      Portfolio
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/resources" legacyBehavior passHref>
                    <NavigationMenuLink className="bg-transparent text-zinc-500 hover:bg-transparent hover:text-zinc-900">
                      Resources
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink className="bg-transparent text-zinc-500 hover:bg-transparent hover:text-zinc-900">
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* CTA + mobile trigger */}
        <div className="bg-transparent border border-black/10 p-1 rounded-xl flex items-center space-x-0 md:space-x-2">
          <Button asChild className="hidden md:inline-flex relative rounded-lg border border-black/10 bg-zinc-900 text-white hover:bg-zinc-700">
            <Link href="/enquire-now">Enquire Now</Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
