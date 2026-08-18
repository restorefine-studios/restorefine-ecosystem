"use client";

import * as React from "react";
import Link from "next/link";
import {
  Palette, Printer, Package, Layers, Shirt,
  Video, Share2, Rocket, LayoutList, Camera,
  Globe, Search, TrendingUp, Target, BarChart3,
  ArrowUpRight, ArrowRight,
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
      { title: "RestoMedia", href: "/services/restomedia", icon: Camera },
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

const navItemClass =
  "relative bg-transparent px-0 font-semibold text-zinc-950/58 underline-offset-4 transition-colors duration-300 ease-out after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-red-600 after:transition-transform after:duration-300 after:ease-out hover:bg-transparent hover:text-red-600 hover:no-underline hover:after:scale-x-100 data-[state=open]:bg-transparent data-[state=open]:text-red-600 data-[state=open]:after:scale-x-100";

/* ------------------------------------------------------------------ */
/* Mega-menu: left rail of pillars drives the service pane on the right */
/* ------------------------------------------------------------------ */
function ServicesMegaMenu() {
  const [active, setActive] = React.useState(0);
  const pillar = pillars[active];

  return (
    <div className="w-[860px] overflow-hidden rounded-[28px] border border-black/[0.06] bg-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.22)]">
      <div className="grid grid-cols-[290px_1fr]">
        {/* Left rail: the three pillars */}
        <div className="flex flex-col gap-1 border-r border-zinc-100 bg-zinc-50/70 p-4">
          <p className="px-3 pb-2 pt-1 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 no-underline">
            Our Pillars
          </p>
          {pillars.map((p, i) => {
            const isActive = i === active;
            const Icon = p.icon;
            return (
              <Link
                key={p.id}
                href={p.href}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={cn(
                  "group relative flex items-center gap-3 rounded-2xl px-3 py-3.5 no-underline transition-colors duration-200",
                  isActive ? "bg-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)]" : "hover:bg-white/60",
                )}
              >
                <span
                  className={cn(
                    "absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r-full bg-red-600 transition-all duration-200",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                />
                <Icon
                  className={cn("size-[18px] shrink-0 transition-colors duration-200", isActive ? "text-red-600" : "text-zinc-300")}
                  strokeWidth={1.75}
                />
                <span className="flex-1">
                  <span
                    className={cn(
                      "block text-[15px] font-black uppercase leading-none tracking-tight no-underline transition-colors duration-200",
                      isActive ? "text-zinc-950" : "text-zinc-500",
                    )}
                  >
                    {p.title}
                  </span>
                  <span className="mt-1 block text-[11px] font-medium leading-none text-zinc-400 no-underline">
                    {p.description}
                  </span>
                </span>
                <ArrowUpRight
                  className={cn(
                    "size-3.5 shrink-0 text-red-600 transition-opacity duration-200",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                />
              </Link>
            );
          })}
        </div>

        {/* Right pane: services for the hovered pillar */}
        <div className="flex flex-col p-4">
          <p className="px-3 pb-2 pt-1 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 no-underline">
            {pillar.title} Services
          </p>

          <div key={pillar.id} className="grid grid-cols-2 gap-1 mb-6 duration-300 animate-in fade-in slide-in-from-right-2">
            {pillar.services.map((service) => {
              const Icon = service.icon;
              return (
                <NavigationMenuLink asChild key={service.title}>
                  <Link
                    href={service.href}
                    className="group flex items-center gap-3 rounded-2xl px-3 py-3 no-underline transition-colors duration-200 hover:bg-zinc-50"
                  >
                    <Icon
                      className="size-4 shrink-0 text-zinc-300 transition-colors duration-200 group-hover:text-red-600"
                      strokeWidth={1.75}
                    />
                    <span className="flex-1 text-[13px] font-medium leading-tight text-zinc-600 no-underline transition-colors duration-200 group-hover:text-zinc-950">
                      {service.title}
                    </span>
                    <ArrowRight className="size-3.5 shrink-0 -translate-x-1 text-red-600 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </NavigationMenuLink>
              );
            })}
          </div>

          {/* Dark CTA strip, echoes the Framework section */}
          <Link
            href="/enquire-now"
            className="group relative mt-auto flex items-center justify-between overflow-hidden rounded-2xl bg-zinc-950 px-5 py-4 no-underline"
          >
            <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-600/25 blur-[50px]" />
            <span className="relative">
              <span className="block text-[13px] font-black uppercase tracking-tight text-white no-underline">
                Not sure where to start?
              </span>
              <span className="mt-0.5 block text-[11px] font-medium text-zinc-400 no-underline">
                Tell us your goals, we&apos;ll map the route.
              </span>
            </span>
            <span className="relative flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.15em] text-red-500 no-underline">
              Enquire
              <ArrowUpRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared nav content, reused by the standalone header (every page     */
/* except home) and embedded directly in the homepage hero's notch.    */
/* ------------------------------------------------------------------ */
export function NavBarContent({ height = "h-20" }: { height?: string }) {
  return (
    <div className={cn("grid grid-cols-[1fr_auto_1fr] items-center px-4 md:px-5", height)}>
      {/* Brand */}
      <Link href="/" className="flex items-center gap-3 justify-self-start no-underline" aria-label="RestoRefine home">
        <span className="flex h-9 w-9 items-center justify-center">
          <Image src={navlogo || "/placeholder.svg"} alt="" width={24} height={24} />
        </span>
      </Link>

      {/* Nav links — exact centre column */}
      <div className="hidden justify-self-center md:block">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-x-7">

            {/* Services mega-menu */}
            <NavigationMenuItem>
              {/* Trigger opens the panel only, it deliberately does not route
                  anywhere while the Services landing page is being built. */}
              <NavigationMenuTrigger className={navItemClass}>
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ServicesMegaMenu />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navItemClass}>
                <Link href="/portfolio">Portfolio</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navItemClass}>
                <Link href="/resources">Resources</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navItemClass}>
                <Link href="/contact">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right: CTA + mobile trigger */}
      <div className="flex items-center gap-3 justify-self-end">
        <Link
          href="/enquire-now"
          className="group hidden items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(220,38,38,0.18)] transition-transform hover:-translate-y-0.5 hover:bg-red-500 active:translate-y-px md:inline-flex"
        >
          Enquire Now
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <MobileMenu />
      </div>
    </div>
  );
}

export function NotchNav({ shadow = false }: { shadow?: boolean }) {
  return (
    <div className="absolute left-0 right-0 top-0 z-20 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          "mx-auto w-full max-w-[1500px] rounded-[1.75rem] border border-white/45 bg-white/36 text-zinc-950 backdrop-blur-2xl",
          shadow && "shadow-[0_18px_70px_rgba(15,23,42,0.08)]",
        )}
      >
        <NavBarContent height="h-16" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll-aware visibility: the fixed bar slides up out of view while  */
/* scrolling down and slides back in on any upward scroll. On the      */
/* homepage the hero has its own embedded notch nav at the top, so the */
/* fixed bar additionally stays hidden until the hero is scrolled past */
/* (otherwise the two navs would briefly stack on top of each other).  */
/* ------------------------------------------------------------------ */
function useNavVisibility() {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY + 4;
      const goingUp = y < lastY - 4;
      if (y < 80) setVisible(true);
      else if (goingDown) setVisible(false);
      else if (goingUp) setVisible(true);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return visible;
}

/* ------------------------------------------------------------------ */
/* Navbar: fixed header on every page. The header itself has no        */
/* background, so whatever the page looks like shows through around   */
/* the bar; the bar's own white fill plus its shadow (desktop) give it */
/* definition, instead of a full-width strip sitting behind it. On the */
/* homepage it only appears when scrolling back up past the hero       */
/* (whose own notch nav covers the top of the page).                   */
/* ------------------------------------------------------------------ */
export function Navbar() {
  const visible = useNavVisibility();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 text-sm font-medium transition-transform duration-300 ease-out",
        !visible && "-translate-y-full",
      )}
    >
      <div className="relative h-16 md:h-[104px]">
        <NotchNav shadow />
      </div>
    </header>
  );
}
