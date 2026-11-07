import { getClientReviews } from "@/blocks/home/get-client-reviews";
import { Businesses, Enquiry, FaqV2, Hero, Industries, Logos, Process, Resources, Reviews, Services, V2Shell, WhyChoose } from "@/blocks/home-v2";
import { EnquireAction } from "@/blocks/home-v2/actions";
import { DualTone } from "@/blocks/home-v2/dual-tone";
import { GlobeSection } from "@/blocks/home-v2/areas";
import { projectToGlobe } from "@/lib/globe-projection";
import { GLOBE_AREAS, UK_GLOBE } from "@/lib/uk-globe";
import { LOCATION_AREAS } from "@/lib/location-areas";
import type { PageContent } from "@/lib/homepageData";
import type { londonContent, LocationExtras } from "@/lib/locations/london";

type Props = { content: typeof londonContent; extras: LocationExtras };

/* Location-only section: the benefits, in the same dashed-column style as the reasons to choose us */
function Benefits({ benefits }: { benefits: LocationExtras["benefits"] }) {
  return (
    <section className="v2-wrap py-24 lg:py-32">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <h2 className="v2-h2 max-w-[18ch] text-zinc-950 lg:col-span-7">
          <DualTone text={benefits.heading} />
        </h2>
        <p className="v2-body text-zinc-600 lg:col-span-12">{benefits.body}</p>
      </div>
      <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.items.map((item) => (
          <li key={item.title} className="v2-dash pt-6 text-zinc-300">
            <h3 className="v2-h3 text-zinc-950">{item.title}</h3>
            <p className="v2-small mt-3 text-zinc-600">{item.description}</p>
          </li>
        ))}
      </ul>
      <div className="mt-14">
        <EnquireAction {...benefits.cta} />
      </div>
    </section>
  );
}

/* Location-only section: the challenges, as numbered dashed rows */
function Challenges({ challenges }: { challenges: NonNullable<LocationExtras["challenges"]> }) {
  return (
    <section className="v2-wrap py-24 lg:py-32">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <h2 className="v2-h2 max-w-[18ch] text-zinc-950 lg:col-span-7">
          <DualTone text={challenges.heading} />
        </h2>
        <p className="v2-body text-zinc-600 lg:col-span-12">{challenges.body}</p>
      </div>
      <ol className="mt-14">
        {challenges.items.map((item, i) => (
          <li key={item.title} className="v2-dash grid gap-3 py-8 text-zinc-300 lg:grid-cols-12 lg:gap-8">
            <span className="v2-small font-medium text-red-600 lg:col-span-1">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="v2-h3 text-zinc-950 lg:col-span-4">{item.title}</h3>
            <p className="v2-small max-w-[60ch] text-zinc-600 lg:col-span-6 lg:col-start-7">{item.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* The page's own area on the same globe as the homepage, zoomed to its boundary */
function KnowAboutGlobe({ knowAbout }: { knowAbout: LocationExtras["knowAbout"] }) {
  const d = GLOBE_AREAS[knowAbout.boundary] ?? LOCATION_AREAS[knowAbout.boundary] ?? "";
  const nums = d.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let i = 0; i < nums.length - 1; i += 2) {
    minX = Math.min(minX, nums[i]);
    maxX = Math.max(maxX, nums[i]);
    minY = Math.min(minY, nums[i + 1]);
    maxY = Math.max(maxY, nums[i + 1]);
  }
  // Frame the boundary at about the size the UK sits on the homepage, in the same spot.
  // Small boundaries (Manchester's city council area) get a minimum frame so they don't fill the card.
  const MIN_FRAME_W = 28;
  const w = Math.max((maxX - minX) * 3, MIN_FRAME_W);
  const h = (w * UK_GLOBE.height) / UK_GLOBE.width;
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const base = d ? { x: cx - w * 0.44, y: cy - h * 0.6, w, h } : undefined;

  return (
    <GlobeSection
      heading={knowAbout.heading}
      cards={[{ text: knowAbout.body }]}
      groups={[{ items: knowAbout.places.map((p) => ({ name: p.name })) }]}
      pins={knowAbout.places.map((p) => ({ name: p.name, ...projectToGlobe(p.lat, p.lon) }))}
      base={base}
      highlight={knowAbout.boundary}
      highlightPath={GLOBE_AREAS[knowAbout.boundary] ? undefined : d}
      focusZoom={2.2}
      label={`Map of ${knowAbout.boundary} showing ${knowAbout.places.map((p) => p.name).join(", ")}`}
    />
  );
}

/** Location landing page in the homepage v2 design, in the order the SEO brief sets */
export async function LocationPageV2({ content, extras }: Props) {
  const { reviews } = await getClientReviews();
  const c: PageContent = content;

  return (
    <V2Shell>
      <Hero c={c} place={extras.area.name} />
      <Logos />
      <Services c={c} showcase />
      {extras.challenges && <Challenges challenges={extras.challenges} />}
      <Benefits benefits={extras.benefits} />
      <Process c={c} />
      <Reviews reviews={reviews} c={c} />
      <WhyChoose c={c} />
      <Industries c={c} />
      <Businesses c={c} />
      <KnowAboutGlobe knowAbout={extras.knowAbout} />
      <Resources c={c} />
      <FaqV2 c={c} />
      <Enquiry c={c} />
    </V2Shell>
  );
}
