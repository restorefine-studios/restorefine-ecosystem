import type { CSSProperties } from "react";
import Image from "next/image";
import { Digits, PinIcon, type ThemeProps } from "@/components/parts";
import { formatLaunch } from "@/lib/format";

/** Dark stage with a brand-coloured spotlight and huge condensed numerals (Fonology). Styles: app/globals.css */
export function SpotlightTheme({ client, parts, showDays, ready, launched, launchAt }: ThemeProps) {
  const stageVars = {
    "--accent": client.colors.accent,
    "--deep": client.colors.deep,
    "--ink": client.colors.ink,
    ...(client.colors.tagBg && { "--tag-bg": client.colors.tagBg }),
    ...(client.colors.tagText && { "--tag-text": client.colors.tagText }),
    ...(client.logo.displayWidth && { "--logo-w": client.logo.displayWidth }),
  } as CSSProperties;

  return (
    <>
      <main className="stage" style={stageVars} data-launched={launched || undefined}>
        <header className="brand">
          <Image
            src={client.logo.src}
            alt={client.logo.alt}
            width={client.logo.width}
            height={client.logo.height}
            priority
            sizes="(max-width: 640px) 60vw, 360px"
          />
        </header>

        <section className="centre">
          {!launched ? (
            <div className="counting">
              <h1 className="kicker">Opening in</h1>

              <div
                className="clock"
                role="timer"
                aria-label={`Time until ${client.name} opens`}
                data-ready={ready || undefined}
                data-units={showDays ? 4 : 3}
              >
                {showDays && (
                  <>
                    <Unit value={parts.days} label="Days" />
                    <Colon />
                  </>
                )}
                <Unit value={parts.hours} label="Hours" />
                <Colon />
                <Unit value={parts.minutes} label="Minutes" />
                <Colon />
                <Unit value={parts.seconds} label="Seconds" />
              </div>

              <p className="when">{formatLaunch(launchAt, client.timeZone)}</p>
            </div>
          ) : (
            <div className="launched" aria-live="polite">
              <h1 className="open">{client.launched.headline}</h1>
              <p className="open-sub">{client.launched.body}</p>
              <p className="when">{client.launched.tag}</p>
            </div>
          )}

          {client.address && (
            <a className="address" href={client.address.mapsUrl} target="_blank" rel="noopener">
              <PinIcon />
              {client.address.label}
            </a>
          )}
        </section>

        <footer className="foot">
          <a className="credit" href="https://restorefine.co.uk" target="_blank" rel="noopener">
            <Image src="/restorefine-mark.svg" alt="" width={22} height={22} />
            <span>
              Launch by <strong>RestoRefine</strong>
            </span>
          </a>
        </footer>
      </main>

      <div className="grain" aria-hidden="true" />
    </>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="unit">
      <Digits value={value} className="digits" digitClassName="digit" />
      <div className="label">{label}</div>
    </div>
  );
}

function Colon() {
  return (
    <div className="colon" aria-hidden="true">
      :
    </div>
  );
}
