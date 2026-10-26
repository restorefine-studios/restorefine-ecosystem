import { ArrowRight, ChevronRight, Globe, Mail, Navigation, Phone } from "lucide-react";
import { business, services } from "@/lib/business";
import { CopyAddressButton } from "@/components/copy-address-button";
import { MapFrame } from "@/components/map-frame";
import { StatusPill } from "@/components/status-pill";
import { WhatsAppIcon } from "@/components/social-icons";
import { Logo, externalLink, serviceMeta, socialMeta } from "./shared";

// Apple Maps place card: the map fills the top, the place sheet scrolls up over it

const secondaryActions = [
  { label: "Call", href: business.phoneHref, icon: Phone, iconClass: "", external: false },
  { label: "Message", href: business.whatsappHref, icon: WhatsAppIcon, iconClass: "text-[#25d366]", external: true },
  { label: "Website", href: business.websiteHref, icon: Globe, iconClass: "", external: true },
] as const;

const card = "overflow-hidden rounded-xl bg-page";
const rowClass = "flex items-center gap-3 px-4 py-3 transition active:bg-line/10 border-t border-line/15";

export function MapsDesign() {
  return (
    <div className="relative min-h-[100dvh]">
      {/* Map stays put behind the sheet; the pin sits in the visible strip above it */}
      <a
        href={business.address.directionsHref}
        {...externalLink}
        aria-label={`Open ${business.address.full} in Google Maps`}
        className="fixed inset-x-0 top-0 block h-[36dvh] overflow-hidden"
      >
        <MapFrame className="dark:opacity-90" />
      </a>

      <main className="relative mx-auto mt-[28dvh] min-h-[72dvh] w-full max-w-[420px] rounded-t-[14px] bg-surface px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_-12px_rgb(0_0_0/0.35)]">
        <div className="flex justify-center pb-2 pt-1.5" aria-hidden="true">
          <span className="h-[5px] w-9 rounded-full bg-line/30" />
        </div>

        <header className="flex items-center gap-3">
          <div className="grid size-12 shrink-0 place-items-center rounded-full bg-ink">
            <Logo size={22} />
          </div>
          <div className="min-w-0">
            <h1 className="text-[24px] font-bold leading-tight tracking-[-0.01em]">{business.name}</h1>
            <p className="truncate text-[15px] text-muted">Marketing studio · {business.address.line2}</p>
          </div>
        </header>

        <div className="mt-4 grid grid-cols-4 gap-2">
          <a
            href={business.address.directionsHref}
            {...externalLink}
            className="flex h-[56px] flex-col items-center justify-center gap-0.5 rounded-xl bg-brand text-[13px] font-semibold text-white transition active:scale-95"
          >
            <Navigation className="size-5" aria-hidden="true" />
            Directions
          </a>
          {secondaryActions.map(({ label, href, icon: Icon, iconClass, external }) => (
            <a
              key={label}
              href={href}
              {...(external && externalLink)}
              className="flex h-[56px] flex-col items-center justify-center gap-0.5 rounded-xl bg-page text-[13px] font-semibold text-ink transition active:scale-95"
            >
              <Icon className={`size-5 ${iconClass}`} aria-hidden="true" />
              {label}
            </a>
          ))}
        </div>

        <h2 className="mt-5 text-[20px] font-bold tracking-[-0.01em]">Services</h2>
        {/* Swipeable row of service cards, bleeding to the sheet edges like Maps guides */}
        <ul className="-mx-4 mt-2 flex snap-x snap-mandatory gap-2.5 overflow-x-auto scroll-px-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {services.map((s) => {
            const { icon: Icon } = serviceMeta[s.name];
            return (
              <li key={s.name} className="w-[44%] shrink-0 snap-start">
                <a
                  href={s.href}
                  {...externalLink}
                  className="flex h-full flex-col rounded-xl bg-page p-3.5 transition active:scale-[0.97]"
                >
                  <span className="grid size-9 place-items-center rounded-full bg-surface text-ink">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="mt-3 flex items-center gap-0.5 text-[16px] font-semibold">
                    {s.name}
                    <ChevronRight className="size-4 text-muted" aria-hidden="true" />
                  </span>
                  <span className="mt-0.5 line-clamp-3 text-[13px] leading-snug text-muted">{s.description}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <h2 className="mt-5 text-[20px] font-bold tracking-[-0.01em]">Details</h2>
        <div className={`mt-2 ${card}`}>
          <div className="px-4 py-3">
            <p className="text-[13px] text-muted">Hours</p>
            <div className="-ml-0.5">
              <StatusPill />
            </div>
          </div>
          <a href={business.phoneHref} className={rowClass}>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] text-muted">Phone</span>
              <span className="block text-[16px]">{business.phoneDisplay}</span>
            </span>
            <Phone className="size-5 text-muted" aria-hidden="true" />
          </a>
          <a href={`mailto:${business.email}`} className={rowClass}>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] text-muted">Email</span>
              <span className="block truncate text-[16px]">{business.email}</span>
            </span>
            <Mail className="size-5 text-muted" aria-hidden="true" />
          </a>
          <div className={`${rowClass} pr-2`}>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] text-muted">Address</span>
              <span className="block text-[16px] leading-snug">{business.address.line1}</span>
              <span className="block text-[16px] leading-snug">{business.address.line2}</span>
            </span>
            <CopyAddressButton
              address={business.address.full}
              className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition hover:bg-surface active:scale-90"
            />
          </div>
        </div>

        {/* Enquire takes the remaining width; socials sit to its right at the same height */}
        <div className="mt-5 flex items-center gap-2">
          <a
            href={business.enquireHref}
            className="group flex h-[52px] min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-brand text-[17px] font-semibold text-white transition active:scale-[0.98] active:opacity-90"
          >
            Enquire now
            <ArrowRight className="size-[18px] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <ul className="flex shrink-0 gap-2">
            {business.socials.map((s) => {
              const { icon: Icon } = socialMeta[s.network];
              return (
                <li key={s.network}>
                  <a
                    href={s.href}
                    {...externalLink}
                    aria-label={`RestoRefine on ${s.label}`}
                    className="grid size-[52px] place-items-center rounded-full bg-page text-ink transition active:scale-90"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
}
