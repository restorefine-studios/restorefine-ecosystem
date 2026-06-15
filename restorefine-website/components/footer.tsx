import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, MapPin, Mail } from "lucide-react";

const services = [
  { name: "Social Media Reels", href: "/services" },
  { name: "Brand Identity & Logo", href: "/services" },
  { name: "Website Design", href: "/services" },
  { name: "Menu & Print Design", href: "/services" },
  { name: "NFC Smart Cards", href: "/services" },
  { name: "Photography & Videography", href: "/services" },
];

const quickLinks = [
  { name: "About Us", href: "/company" },
  { name: "Our Work", href: "/portfolio" },
  { name: "Client Reviews", href: "/#reviews" },
  { name: "Enquire Now", href: "/enquire-now" },
  { name: "Careers", href: "/contact" },
  { name: "Help Center", href: "/contact" },
  { name: "Contact", href: "/contact" },
];

const sectors = ["Restaurant Branding", "Bar & Pub Identity", "Hotel Digital Marketing", "Cafe & Bakery Design", "Food Truck Branding", "Fine Dining Identity", "Fast Casual Design"];

const legal = [
  { name: "Privacy Policy", href: "/legal/privacy" },
  { name: "Terms & Conditions", href: "/legal/terms" },
  { name: "Cookie Policy", href: "/legal/cookies" },
];

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/restorefine/" },
  { name: "LinkedIn", icon: Linkedin, href: "https://uk.linkedin.com/company/restorefine" },
];

const trustBadges = [
  { label: "Google Reviews", sub: "5.0 ★★★★★" },
  { label: "Instagram", sub: "Hospitality Experts" },
  { label: "LinkedIn", sub: "Verified Agency" },
  { label: "Trustpilot", sub: "Excellent" },
  { label: "Glasgow Chamber", sub: "Member" },
  { label: "UK Registered", sub: "Ltd Company" },
];

export function Footer() {
  return (
    <footer
      className="full-bleed mb-4 px-4 rounded-2xl relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 55% 45% at 0% 0%, rgba(100,10,10,0.45) 0%, transparent 65%), #0c0505",
      }}
    >
      {/* ── Main 5-col grid ── */}
      <div className="px-6 md:px-10 lg:px-16 pt-16 pb-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
            <Link href="/">
              <Image src="/restorefine-logowhite.svg" alt="RestoRefine" width={130} height={40} className="h-9 w-auto" />
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-[210px]">The hospitality branding studio built for restaurants, bars, and food concepts.</p>
            <div className="flex flex-col gap-2 text-zinc-500 text-xs">
              <span className="flex items-start gap-2">
                <MapPin size={12} className="mt-0.5 shrink-0 text-red-600" />
                <span>24 Fairley St, Glasgow G51 2SN</span>
              </span>
              <Link href="mailto:hello@restorefine.com" className="flex items-center gap-2 hover:text-zinc-300 transition-colors">
                <Mail size={12} className="text-red-600 shrink-0" />
                hello@restorefine.com
              </Link>
            </div>
          </div>

          {/* Col 2 — Contact */}
          <div>
            <h3 className="text-white text-sm font-black tracking-[0.18em] uppercase mb-5">Contact</h3>
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-zinc-200 text-[13px] font-medium">Glasgow Studio</p>
                <p className="mt-1 text-zinc-500 text-xs leading-relaxed">
                  24 Fairley St
                  <br />
                  Glasgow, G51 2SN
                  <br />
                  United Kingdom
                </p>
                <Link href="/contact" className="inline-block mt-2 text-[11px] text-red-500 hover:text-red-400 transition-colors">
                  Get Directions →
                </Link>
              </div>
              <Link href="mailto:hello@restorefine.com" className="text-zinc-400 hover:text-white text-xs transition-colors">
                hello@restorefine.com
              </Link>
              <Link href="/enquire-now" className="text-zinc-400 hover:text-white text-xs transition-colors">
                Submit an Enquiry →
              </Link>
            </div>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h3 className="text-white text-sm font-black tracking-[0.18em] uppercase mb-5">Services</h3>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.name}>
                  <Link href={s.href} className="text-zinc-400 hover:text-white text-sm transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Quick Links */}
          <div>
            <h3 className="text-white text-sm font-black tracking-[0.18em] uppercase mb-5">Quick Links</h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-zinc-400 hover:text-white text-sm transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5 — Sector Spotlight */}
          <div>
            <h3 className="text-white text-sm font-black tracking-[0.18em] uppercase mb-5">Sector Spotlight</h3>
            <ul className="flex flex-col gap-2.5">
              {sectors.map((s) => (
                <li key={s} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                  <span className="text-zinc-400 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Trust / badge strip ── */}
      <div className="border-t border-white/[0.06] px-6 md:px-10 lg:px-16 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {trustBadges.map((b) => (
            <div key={b.label} className="flex flex-col items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-3.5 gap-1">
              <span className="text-white text-xs font-semibold tracking-wide">{b.label}</span>
              <span className="text-zinc-500 text-[10px] text-center leading-tight">{b.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.06] px-6 md:px-10 lg:px-16 py-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left — copyright */}
          <div className="flex flex-col gap-0.5">
            <p className="text-zinc-500 text-[11px]">RestoRefine Studios is a trading name of RestoRefine Ltd.</p>
            <p className="text-zinc-600 text-[11px]">©2025 RestoRefine Studios. All rights reserved.</p>
          </div>

          {/* Centre — legal */}
          <div className="flex items-center gap-5 flex-wrap">
            {legal.map((l) => (
              <Link key={l.name} href={l.href} className="text-zinc-500 hover:text-zinc-300 text-[11px] transition-colors">
                {l.name}
              </Link>
            ))}
          </div>

          {/* Right — social icons */}
          <div className="flex items-center gap-2.5">
            {socialLinks.map((s) => (
              <Link key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors">
                <s.icon size={14} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
