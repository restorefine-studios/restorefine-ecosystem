/**
 * One entry per client launch. Each entry gets its own page at
 * countdown.restorefine.co.uk/c/<slug>.
 * To add a client: drop their logo + icon in public/clients/<slug>/ and add an entry here.
 */
export type Client = {
  slug: string;
  name: string;
  /** White (or light) logo, shown on the dark stage */
  logo: { src: string; alt: string; width: number; height: number };
  icon: string;
  /** ISO date with offset, e.g. "2026-11-15T12:00:00Z" (UK is UTC in winter, +01:00 in summer) */
  launchAt: string;
  timeZone: string;
  address?: { label: string; mapsUrl: string };
  /** Shown in place of the clock once the launch time passes */
  launched: { headline: string; body: string; tag: string };
  /** Stage colours: accent = brand colour, deep = spotlight mid-tone, ink = darkest background */
  colors: { accent: string; deep: string; ink: string };
};

export const clients: Client[] = [
  {
    slug: "fonology",
    name: "Fonology",
    logo: {
      src: "/clients/fonology/logo.png",
      alt: "Fonology. Making impossible, possible.",
      width: 1600,
      height: 263,
    },
    icon: "/clients/fonology/icon.png",
    launchAt: "2026-11-14T12:00:00Z",
    timeZone: "Europe/London",
    address: {
      label: "Unit 2, Bargarran Shopping Centre, PA8 6BS",
      mapsUrl: "https://maps.google.com/?q=Unit+2+Bargarran+Shopping+Centre+Erskine+PA8+6BS",
    },
    launched: {
      headline: "We're open",
      body: "Phones, repairs and accessories. Come and see us in Erskine today.",
      tag: "Doors open now",
    },
    colors: { accent: "#e30613", deep: "#8a000b", ink: "#3d0005" },
  },
];

export function getClient(slug: string) {
  return clients.find((c) => c.slug === slug);
}
