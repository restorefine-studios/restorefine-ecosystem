import Link from "next/link";
import { homeContent } from "@/lib/homepageData";
import { GLOBE_AREAS, GLOBE_POINTS, UK_GLOBE } from "@/lib/uk-globe";
import { DualTone } from "./dual-tone";
import { AreaFocusProvider, FocusItem, FocusSvg, GlobeZoom, type GlobePin } from "./globe-zoom";

type Box = { x: number; y: number; w: number; h: number };
type ListGroup = { title?: string; items: { name: string; href?: string | null; hub?: boolean }[] };

/**
 * Globe section: heading and copy cards over the sky, a list of places over the map.
 * Hovering a place zooms the globe in on it. `base` sets a close-up the map zooms to
 * when it scrolls into view; `highlight` picks the UK, or one served area, in red.
 */
export function GlobeSection({
  heading,
  tail,
  cards,
  groups,
  pins,
  base,
  highlight,
  focusZoom,
  label,
}: {
  heading: string;
  tail?: string;
  cards: { title?: string; text: string }[];
  groups: ListGroup[];
  pins: GlobePin[];
  base?: Box;
  highlight: "uk" | string;
  focusZoom?: number;
  label: string;
}) {
  const ukRed = highlight === "uk";

  return (
    <AreaFocusProvider>
      <section className="px-2 py-24 sm:px-3 lg:py-32">
        <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-zinc-100 sm:rounded-[2rem]">
          {/* Globe fills the card behind the content */}
          <div className="absolute inset-0 -z-10 lg:-right-[34%] lg:-top-[42%] lg:-bottom-[2%] lg:left-[14%] lg:[mask-image:linear-gradient(to_right,transparent_0%,black_45%)]">
            <GlobeZoom className="relative h-full w-full">
              <FocusSvg width={UK_GLOBE.width} height={UK_GLOBE.height} pins={pins} base={base} focusZoom={focusZoom} className="absolute inset-0 h-full w-full">
                <title>{label}</title>
                <path d={UK_GLOBE.sphere} className="fill-zinc-200/70" />
                <path d={UK_GLOBE.graticule} fill="none" className="stroke-zinc-300/60" strokeWidth={0.6} vectorEffect="non-scaling-stroke" />
                <path d={UK_GLOBE.land} className="fill-zinc-300 stroke-zinc-100" strokeWidth={0.8} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                <path d={UK_GLOBE.uk} className={ukRed ? "fill-red-600 stroke-white" : "fill-zinc-50 stroke-zinc-300"} strokeWidth={0.8} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                {Object.entries(GLOBE_AREAS).map(([name, d]) =>
                  ukRed ? (
                    <path key={name} d={d} className="fill-red-900/50" />
                  ) : name === highlight ? (
                    <path key={name} d={d} className="fill-red-600/15 stroke-red-600" strokeWidth={2} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                  ) : null,
                )}
              </FocusSvg>
            </GlobeZoom>
          </div>

          <div className="relative flex min-h-[52rem] flex-col p-4 sm:p-6 lg:min-h-[56rem] lg:p-8">
            {/* Heading and copy, over the sky */}
            <div className="px-3 pt-6 sm:px-4 lg:px-6 lg:pt-10">
              <h2 className="v2-h2 max-w-[14ch] text-zinc-950">
                <DualTone text={heading} tail={tail} />
              </h2>
            </div>
            <div className={`mt-8 grid gap-3 lg:max-w-[30rem] lg:grid-cols-1 ${cards.length > 1 ? "md:grid-cols-2" : ""}`}>
              {cards.map((c) => (
                <div key={c.text.slice(0, 24)} className="rounded-[1.25rem] bg-white/80 p-6 backdrop-blur-md sm:p-7">
                  {c.title && <p className="mb-3 text-sm font-medium text-zinc-500">{c.title}</p>}
                  <p className="v2-body max-w-[56ch] text-zinc-700">{c.text}</p>
                </div>
              ))}
            </div>

            {/* Places, over the lower map */}
            <div className="mt-auto pt-[18rem] sm:pt-[22rem] lg:pt-12">
              <div className="rounded-[1.25rem] bg-white/80 p-6 backdrop-blur-md sm:p-8">
                <div className={`grid gap-8 ${groups.length > 1 ? "sm:grid-cols-2" : ""}`}>
                  {groups.map((g, gi) => (
                    <div key={g.title ?? gi}>
                      {g.title && <p className="mb-3 text-sm font-medium text-zinc-500">{g.title}</p>}
                      <ul className="grid grid-cols-2 gap-x-6 gap-y-2 lg:grid-cols-4">
                        {g.items.map((l) => (
                          <FocusItem key={l.name} name={l.name} className="flex cursor-default items-center gap-2 text-base text-zinc-950 transition-colors hover:text-red-600">
                            <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 rounded-full ${l.hub ? "border-2 border-zinc-950 bg-white" : "bg-red-600"}`} />
                            {l.href ? (
                              <Link href={l.href} className="underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-red-600 hover:decoration-red-600">
                                {l.name}
                              </Link>
                            ) : (
                              <span tabIndex={0} className="outline-none focus-visible:underline">
                                {l.name}
                              </span>
                            )}
                          </FocusItem>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs text-zinc-500">Contains OS data © Crown copyright and database right 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AreaFocusProvider>
  );
}

/* Homepage: the UK in red, every served area pinned */
export function AreasV2() {
  const { areas } = homeContent;
  const pins = areas.groups.flatMap((g) => g.locations).flatMap((l) => (GLOBE_POINTS[l.name] ? [{ name: l.name, hub: l.hub, ...GLOBE_POINTS[l.name] }] : []));
  return (
    <GlobeSection
      heading={areas.heading}
      tail="Across the UK"
      cards={[
        { title: areas.groups[0]?.title, text: areas.body[0] },
        { title: areas.groups[1]?.title, text: areas.body.slice(1).join(" ") },
      ].filter((c) => c.text)}
      groups={areas.groups.map((g) => ({ title: g.title, items: g.locations }))}
      pins={pins}
      highlight="uk"
      label="Map of the areas RestoRefine serves across Scotland and the UK"
    />
  );
}
