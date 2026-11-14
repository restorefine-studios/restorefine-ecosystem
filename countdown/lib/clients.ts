/**
 * One entry per client launch. Each entry gets its own page at
 * countdown.restorefine.co.uk/c/<slug>.
 * To add a client: drop their logo + icon in public/clients/<slug>/ and add an entry here.
 */
export type Client = {
  slug: string;
  /** Page design (components/themes). Defaults to "spotlight". */
  theme?: "spotlight" | "spudkingz";
  name: string;
  /**
   * Logo shown on the dark stage. `displayWidth` is a CSS width for tall/badge logos
   * (wide wordmarks can leave it out and use the default).
   */
  logo: { src: string; alt: string; width: number; height: number; displayWidth?: string };
  icon: string;
  /** ISO date with offset, e.g. "2026-11-15T12:00:00Z" (UK is UTC in winter, +01:00 in summer) */
  launchAt: string;
  timeZone: string;
  address?: { label: string; mapsUrl: string };
  /** Shown in place of the clock once the launch time passes */
  launched: { headline: string; body: string; tag: string };
  /**
   * Stage colours: accent = brand colour (spotlight), deep = spotlight mid-tone, ink = darkest background.
   * tagBg / tagText colour the date pill (default: off-white pill with accent text).
   */
  colors: { accent: string; deep: string; ink: string; tagBg?: string; tagText?: string };
  /** Confetti colours (default: accent, deep and whites) */
  confetti?: string[];
  /**
   * Colour variants the theme offers. The first is the default; preview others with ?variant=<name>.
   * `confetti` per variant overrides the client-wide colours.
   */
  variants?: { name: string; confetti?: string[] }[];
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
  {
    slug: "spudkingz",
    theme: "spudkingz",
    name: "Spud Kingz",
    logo: {
      src: "/clients/spudkingz/logo.png",
      alt: "Spud Kingz. Crowned in flavour, rooted in community.",
      width: 900,
      height: 694,
    },
    icon: "/clients/spudkingz/icon.png",
    launchAt: "2026-11-14T12:00:00Z",
    timeZone: "Europe/London",
    address: {
      label: "300 Caledonian Rd, Wishaw ML2 0HY",
      mapsUrl: "https://maps.google.com/?q=300+Caledonian+Rd+Wishaw+ML2+0HY",
    },
    launched: {
      headline: "We're open",
      body: "Same royal flavour, brand new kingdom. Now serving in Wishaw.",
      tag: "Doors open now",
    },
    colors: { accent: "#fdbf14", deep: "#124a2a", ink: "#124a2a" },
    // Yellow would vanish on the yellow table, so the confetti is greens, whites and crust brown
    confetti: ["#124a2a", "#1e7a46", "#2fa043", "#ffffff", "#fff6df", "#b8742a"],
    // Three separate creatives (components/themes/spudkingz.tsx); preview with ?variant=king etc.
    variants: [
      { name: "pennant" },
      { name: "king", confetti: ["#fdbf14", "#ffcb2e", "#fff6df", "#ffffff", "#e6ae5b"] },
      { name: "bowls", confetti: ["#fdbf14", "#ffcb2e", "#1e7a46", "#2fa043", "#fff6df"] },
    ],
  },
];

export function getClient(slug: string) {
  return clients.find((c) => c.slug === slug);
}
