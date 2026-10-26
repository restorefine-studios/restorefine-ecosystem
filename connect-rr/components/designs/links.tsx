import { ArrowRight, ChevronRight, Globe, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { business, services } from "@/lib/business";
import { CopyAddressButton } from "@/components/copy-address-button";
import { DraggableMap } from "@/components/draggable-map";
import { StatusPill } from "@/components/status-pill";
import { WhatsAppIcon } from "@/components/social-icons";
import { Logo, externalLink, serviceMeta, socialMeta } from "./shared";

// Business link page in the Maps design language: the map is only a faded cover image, the profile is
// centred, and everything else is a stack of full-width link tiles. Red is kept for Enquire alone.

const actions = [
  { label: "Call", href: business.phoneHref, icon: Phone, iconClass: "", external: false },
  { label: "WhatsApp", href: business.whatsappHref, icon: WhatsAppIcon, iconClass: "text-[#25d366]", external: true },
  { label: "Email", href: `mailto:${business.email}`, icon: Mail, iconClass: "", external: false },
  { label: "Website", href: business.websiteHref, icon: Globe, iconClass: "", external: true },
] as const;

const groupLabel = "px-1 text-[13px] font-semibold text-muted";
const linkTile = "flex min-h-[60px] items-center gap-3 rounded-2xl bg-page py-2.5 pl-2.5 pr-4 transition active:scale-[0.98]";
const badge = "grid size-10 shrink-0 place-items-center rounded-xl bg-surface text-ink";

export function LinksDesign() {
  return (
    <div className="bg-surface">
      {/* First screen: cover, profile, links and Enquire fill the viewport; the footer waits below the fold */}
      <div className="flex min-h-[100dvh] flex-col">
        {/* Cover: a desaturated glimpse of the area, faded into the page so it reads as a header image.
            It absorbs any spare height on tall screens, so the content sits low instead of leaving a gap,
            and can be dragged around before it eases back to the studio. */}
        <div className="relative min-h-[max(140px,22dvh)] flex-1 overflow-hidden" aria-hidden="true">
          <DraggableMap iframeClassName="opacity-70 [filter:saturate(0.45)] dark:opacity-50 dark:[filter:invert(0.92)_hue-rotate(180deg)_saturate(0.5)]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface/0 via-surface/30 to-surface" />
        </div>

        <main className="relative mx-auto -mt-14 flex w-full max-w-[420px] flex-col px-4">
          <header className="flex flex-col items-center text-center">
            <div className="grid size-[88px] place-items-center rounded-full bg-ink shadow-[0_12px_30px_-12px_rgb(0_0_0/0.5)] ring-4 ring-surface">
              <Logo size={38} />
            </div>
            <h1 className="mt-3 text-[24px] font-bold leading-tight tracking-[-0.01em]">{business.name}</h1>
            <p className="mt-1 max-w-[34ch] text-[15px] leading-snug text-muted">{business.tagline}</p>
            <div className="mt-2">
              <StatusPill />
            </div>
          </header>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {actions.map(({ label, href, icon: Icon, iconClass, external }) => (
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

          <section aria-label="What we do" className="mt-7">
            <h2 className={groupLabel}>Services</h2>
            <ul className="mt-2 flex flex-col gap-2">
              {services.map((s) => {
                const { icon: Icon } = serviceMeta[s.name];
                return (
                  <li key={s.name}>
                    <a href={s.href} {...externalLink} className={linkTile}>
                      <span className={badge}>
                        <Icon className="size-[18px]" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[16px] font-semibold">{s.name}</span>
                        <span className="block truncate text-[13px] text-muted">{s.description}</span>
                      </span>
                      <ChevronRight className="size-4 shrink-0 text-muted" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-label="Visit the studio" className="mt-7">
            <h2 className={groupLabel}>Studio</h2>
            <div className="mt-2 flex items-center gap-3 rounded-2xl bg-page py-2.5 pl-2.5 pr-2">
              <span className={badge}>
                <MapPin className="size-[18px]" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] font-semibold">{business.address.line1}</span>
                <span className="block truncate text-[13px] text-muted">{business.address.line2} · by appointment</span>
              </span>
              <CopyAddressButton
                address={business.address.full}
                className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition hover:bg-surface active:scale-90"
              />
              <a
                href={business.address.directionsHref}
                {...externalLink}
                aria-label="Get directions"
                className="grid size-9 shrink-0 place-items-center rounded-full bg-surface text-ink transition active:scale-90"
              >
                <Navigation className="size-4" aria-hidden="true" />
              </a>
            </div>
          </section>

          {/* Socials + Enquire, pushed to the bottom of the first screen; stays in reach if the links run longer */}
          <div className="sticky bottom-0 -mx-4 mt-auto bg-gradient-to-t from-surface from-60% to-transparent px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6">
            <ul aria-label="RestoRefine on social media" className="mb-3 flex justify-center gap-3">
              {business.socials.map((s) => {
                const { icon: Icon } = socialMeta[s.network];
                return (
                  <li key={s.network}>
                    <a
                      href={s.href}
                      {...externalLink}
                      aria-label={`RestoRefine on ${s.label}`}
                      className="grid size-11 place-items-center rounded-full bg-page text-ink transition active:scale-90"
                    >
                      <Icon className="size-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
            <a
              href={business.enquireHref}
              className="group flex h-[52px] items-center justify-center gap-2 rounded-xl bg-brand text-[17px] font-semibold text-white transition active:scale-[0.98] active:opacity-90"
            >
              Enquire now
              <ArrowRight className="size-[18px] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </main>
      </div>

      <footer className="mx-auto max-w-[420px] border-t border-line/15 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 text-center text-[12px] leading-relaxed text-muted">
        <ul className="flex justify-center gap-4">
          {business.legalLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} {...externalLink} className="transition hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-2">
          © {new Date().getFullYear()} {business.legalName}. All rights reserved.
        </p>
        <p>UK registered limited company · Glasgow, Scotland</p>
      </footer>
    </div>
  );
}
