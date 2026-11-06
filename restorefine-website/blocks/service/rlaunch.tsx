import { Camera, Megaphone, Soup, TrendingUp } from "lucide-react";
import { Footer } from "@/components/footer";
import { V2Shell } from "@/blocks/home-v2";
import { EnquireAction } from "@/blocks/home-v2/actions";
import { CaseStudies, Process, ScriptTitle, ServiceHero } from "@/blocks/service-v2/pillar";
import { CardGrid, FeatureSplit, IncludedCard } from "@/blocks/service-v2/sections";
import type { PortfolioItem } from "@/lib/portfolio";

// ─── Data (unchanged) ─────────────────────────────────────────────────────────

const PILLARS = [
  { icon: <Megaphone className="h-5 w-5" />, title: "Pre-launch Buzz", desc: "Teaser content, countdowns, and behind-the-scenes that build anticipation before you open." },
  { icon: <Camera className="h-5 w-5" />, title: "Opening Day Coverage", desc: "Real-time content capture on your launch day — photos, reels, and stories that document the moment." },
  { icon: <Soup className="h-5 w-5" />, title: "Menu Drop Campaigns", desc: "Seasonal menu reveals and new dish spotlights that generate excitement and drive covers." },
  { icon: <TrendingUp className="h-5 w-5" />, title: "Post-launch Momentum", desc: "Follow-up content strategy that sustains the hype and converts first-time visitors into regulars." },
];

const PROCESS_STEPS = [
  { number: "01", title: "Brief & Discovery", description: "We learn your venue, your audience, and your goals." },
  { number: "02", title: "Campaign Strategy", description: "A content plan mapped to your launch timeline." },
  { number: "03", title: "Create & Deploy", description: "We produce and publish everything — you focus on your guests." },
  { number: "04", title: "Track & Report", description: "Real-time performance tracking with a post-launch review." },
];

const DELIVERABLES = ["Launch Strategy", "Teaser Content", "Reels & TikToks", "Photography", "Caption Writing", "Story Sequences", "Post-launch Review", "Performance Report"];

/** /services/launch-campaigns in the v2 design; copy unchanged */
function RLaunch({ caseStudies = [] }: { caseStudies?: PortfolioItem[] }) {
  return (
    <main>
      <V2Shell>
        <ServiceHero
          image="/services/paid-ads-growth.webp"
          title={<ScriptTitle text="Open With Impact." accent="Impact." />}
          subtext="We build the buzz before you open the doors — and keep the momentum going long after. Teaser content, opening day coverage, and a post-launch strategy that turns first-timers into regulars."
          ctaLabel="Start Your Campaign"
          stats={[
            { value: "4", label: "Campaign phases — teaser to wrap-up" },
            { value: "100%", label: "Opening day covered" },
            { value: "Ongoing", label: "Post-launch momentum" },
          ]}
        />
        <FeatureSplit
          image="/services/media/pexels-fauxels-3184431.webp"
          alt="Launch campaign content creation"
          heading="From Teaser To Sold-out Launch"
          paragraphs={[
            "Whether you're opening a new venue, dropping a new menu, or running a seasonal event — a great launch campaign turns anticipation into action. We plan, create, and deploy content that fills your opening night and keeps guests talking for weeks.",
            "From the first teaser to the post-launch wrap-up, every phase is mapped, produced, and published — so you can focus on running the room.",
          ]}
          caption={{ label: "What you get", text: "A full launch team — strategy, content, and coverage. 🚀" }}
        />
        <CardGrid heading="What We Do" items={PILLARS} />
        <Process process={{ heading: "Your Launch, Our Blueprint.", tail: "Our Blueprint.", intro: [], steps: PROCESS_STEPS }} />
        <IncludedCard
          heading="Everything Included."
          body="No add-ons, no hidden extras. Every launch package covers the full campaign lifecycle — from first teaser to post-launch review."
          items={DELIVERABLES}
          cta={<EnquireAction label="Get a Quote" href="/enquire-now" tone="white" />}
        />
        <div className="pt-24 lg:pt-32">
          <CaseStudies caseStudies={{ heading: "Our Work", categories: ["Media"], extraItems: caseStudies }} />
        </div>
      </V2Shell>
      <Footer />
    </main>
  );
}

export default RLaunch;
