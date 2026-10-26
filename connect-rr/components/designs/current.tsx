import Image from "next/image";
import { ArrowRight, Globe, Mail, Navigation, Phone } from "lucide-react";
import { business } from "@/lib/business";
import { ServicesCarousel } from "@/components/services-carousel";
import { StatusPill } from "@/components/status-pill";
import { CopyAddressButton } from "@/components/copy-address-button";
import { FacebookIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from "@/components/social-icons";

const socialIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
} as const;


const roundIcon =
  "grid size-11 place-items-center rounded-full bg-ink [@media(max-height:600px)]:size-10 text-page transition active:scale-90 active:opacity-80";

const quickActions = [
  { label: "WhatsApp", href: business.whatsappHref, icon: WhatsAppIcon, iconClass: "text-[#25d366]", external: true },
  { label: "Call", href: business.phoneHref, icon: Phone, iconClass: "text-ink", external: false },
  { label: "Email", href: `mailto:${business.email}`, icon: Mail, iconClass: "text-ink", external: false },
] as const;

// One evenly spaced group, centred on the screen. On a phone it fills the height, which puts the
// contact actions at the bottom within thumb reach; on short screens the map shrinks first.
// Height breakpoints: under 720px the hero tightens and service visuals hide, under 600px the logo and tagline hide too.
export function CurrentDesign() {
  return (
    <main className="mx-auto flex h-[100dvh] min-h-[520px] w-full max-w-[420px] flex-col justify-center gap-4 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] [@media(max-height:720px)]:gap-3 [@media(max-height:600px)]:gap-2.5">
      {/* Hero */}
      <header className="flex flex-col items-center text-center">
        <div className="grid size-[72px] place-items-center rounded-[20px] bg-ink shadow-[0_8px_24px_-8px_rgb(0_0_0/0.35)] [@media(max-height:720px)]:size-14 [@media(max-height:720px)]:rounded-2xl [@media(max-height:600px)]:hidden">
          {/* White mark on black tile in light mode, black on white in dark mode */}
          <Image src="/restorefine-logowhite.svg" alt="RestoRefine" width={34} height={35} priority className="dark:hidden" />
          <Image src="/restorefine-logoblack.svg" alt="RestoRefine" width={34} height={35} priority className="hidden dark:block" />
        </div>
        <h1 className="mt-3 text-[28px] font-semibold leading-tight tracking-[-0.02em] [@media(max-height:720px)]:mt-2 [@media(max-height:600px)]:mt-0 [@media(max-height:600px)]:text-[25px]">
          {business.name}
          <span className="text-brand">.</span>
        </h1>
        <p className="mt-1 max-w-[34ch] text-[15px] leading-snug text-muted [@media(max-height:600px)]:hidden">{business.tagline}</p>
        <div className="mt-2.5 [@media(max-height:600px)]:mt-1.5">
          <StatusPill />
        </div>
      </header>

      {/* Socials + website */}
      <nav aria-label="RestoRefine online">
        <ul className="flex items-center justify-center gap-3">
          {business.socials.map((s) => {
            const Icon = socialIcons[s.network];
            return (
              <li key={s.network}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`RestoRefine on ${s.label}`} className={roundIcon}>
                  <Icon className="size-5" />
                </a>
              </li>
            );
          })}
          <li>
            <a href={business.websiteHref} target="_blank" rel="noopener noreferrer" aria-label="RestoRefine website" className={roundIcon}>
              <Globe className="size-5" />
            </a>
          </li>
        </ul>
      </nav>

      <ServicesCarousel />

      {/* Map with the address on a frosted bar; on short screens the map gives up height first */}
      <section aria-label="Visit the studio" className="relative min-h-[104px] shrink basis-[150px] overflow-hidden rounded-2xl bg-surface">
        <a
          href={business.address.directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${business.address.full} in Google Maps`}
          className="absolute inset-0"
        >
          {/* Oversized, non-interactive embed: Google's buttons fall outside the crop, the pin sits above the bar */}
          <iframe
            src={business.address.mapEmbedSrc}
            title="RestoRefine studio location"
            loading="lazy"
            tabIndex={-1}
            referrerPolicy="no-referrer-when-downgrade"
            className="pointer-events-none absolute -left-[260px] -top-[110px] h-[calc(100%+200px)] w-[calc(100%+520px)] border-0 dark:opacity-90"
          />
        </a>
        <div className="absolute inset-x-2 bottom-2 flex items-center gap-1 rounded-xl bg-surface/90 py-1.5 pl-3 pr-1.5 shadow-sm backdrop-blur-md">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{business.address.line1}</p>
            <p className="truncate text-xs text-muted">{business.address.line2} · by appointment</p>
          </div>
          <CopyAddressButton
            address={business.address.full}
            className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition hover:bg-page active:scale-90"
          />
          <a
            href={business.address.directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get directions"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-white transition active:scale-90"
          >
            <Navigation className="size-4" aria-hidden="true" />
          </a>
        </div>
      </section>
      {/* Contact actions last, so on a phone they land at the bottom within thumb reach */}
      <section aria-label="Get in touch" className="flex shrink-0 flex-col gap-2.5">
        <div className="grid grid-cols-3 gap-2.5">
          {quickActions.map(({ label, href, icon: Icon, iconClass, external }) => (
            <a
              key={label}
              href={href}
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
              className="flex h-[60px] flex-col items-center justify-center gap-1 rounded-2xl bg-surface text-[13px] font-medium transition active:scale-[0.97] active:opacity-80"
            >
              <Icon className={`size-[22px] ${iconClass}`} aria-hidden="true" />
              {label}
            </a>
          ))}
        </div>
        <a
          href={business.enquireHref}
          className="group flex h-[52px] items-center justify-center gap-2 rounded-2xl bg-brand text-[17px] font-semibold text-white transition active:scale-[0.98] active:opacity-90"
        >
          Enquire now
          <ArrowRight className="size-[18px] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </section>
    </main>
  );
}
