export interface PillarSubService {
  number: string;
  title: string;
  description: string;
  image: string;
  includes: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

export interface PillarProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ContentPillarContent {
  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    subtext: string;
    ctaLabel: string;
  };
  overview: {
    intro: string;
    heading: string;
    body: string;
    problems: string[];
  };
  subServices: PillarSubService[];
  process: {
    intro: string;
    steps: PillarProcessStep[];
  };
  caseStudies: {
    body: string;
  };
}

export const contentPillarContent: ContentPillarContent = {
  hero: {
    eyebrow: "Resto Content",
    line1: "Content That",
    line2: "Moves Brand Forward.",
    subtext: "Turn your brand into content people discover, remember, trust, and act on.",
    ctaLabel: "Start a Conversation",
  },
  overview: {
    intro:
      "From social content to short-form video, campaigns, and more, we create with purpose and measure what matters.",
    heading: "Your business has something worth saying. Your content should say it with purpose.",
    body: "Too many brands treat content as something to publish rather than something to achieve. They post when they have time, chase trends without a clear strategy, and end up with a feed that looks busy but says very little.",
    problems: [
      "Content without strategy creates noise, not demand.",
      "Inconsistent messaging makes strong brands forgettable.",
      "Posting without a clear purpose makes performance difficult to measure.",
      "Great ideas get lost when content, brand, and marketing work separately.",
    ],
  },
  subServices: [
    {
      number: "01",
      title: "Short-form Content",
      description:
        "Reels, TikToks, and short videos that capture the energy of your venue. Built to capture attention, communicate your brand, and keep your audience watching. Shot, edited, and optimized for every platform.",
      image: "/services/media/pexels-cottonbro-3296434.webp",
      includes: ["Instagram Reels", "TikTok Videos", "YouTube Shorts", "Editing & Captions"],
    },
    {
      number: "02",
      title: "Social Media Management",
      description:
        "Scroll-stopping, purposeful social content that keeps your brand visible and your audience engaged. From planning and caption writing to publishing and community management, we keep your social presence active, so your feed stays fresh, and your following keeps growing.",
      image: "/content-card-img.png",
      includes: ["Content Calendar", "Caption Writing", "Scheduling & Publishing", "Community Management"],
      ctaLabel: "Let's Talk Content",
      ctaHref: "/enquire-now",
    },
    {
      number: "03",
      title: "Launch Campaigns",
      description:
        "Build buzz and anticipation before the doors open and keep your momentum going after it. We create coordinated, full-scale content campaigns that give new venues, menu drops, seasonal events, and brand moments the attention they deserve.",
      image: "/services/media/pexels-fauxels-3184431.webp",
      includes: ["Launch Content", "Teaser Campaigns", "Countdown Strategy", "Campaign Creative"],
      ctaLabel: "Learn More",
      ctaHref: "/services/launch-campaigns",
    },
    {
      number: "04",
      title: "Content Strategy",
      description:
        "A strategic roadmap for what your brand should say, who it needs to reach, and why it matters. We turn your business goals, audience insights, and brand positioning into a content strategy that gives every piece of content a clear purpose.",
      image: "/services/media/pexels-pixabay-262438.webp",
      includes: ["Audience Research", "Content Calendar & Planning", "Brand Voice Guide", "Performance Review"],
    },
    {
      number: "05",
      title: "Photography",
      description:
        "Professional photography that gives your brand a distinctive visual presence across your website, social channels, campaigns, and marketing. From products and people to spaces and experiences, we create imagery designed to make your brand worth looking at.",
      image: "/services/media/restophotography.webp",
      includes: ["Brand Photography", "Product Photography", "Lifestyle & Venue Shoots", "Retouching & Delivery"],
    },
  ],
  process: {
    intro:
      "Great content starts long before the first post, shoot, or campaign. We connect strategy, creativity, distribution, and performance to build content that has a clear drive and purpose.",
    steps: [
      {
        number: "01",
        title: "Strategy",
        description:
          "We start with your brand, audience, objectives, and opportunities. From content pillars and messaging to channel planning, we create a clear direction for what your content needs to achieve.",
      },
      {
        number: "02",
        title: "Create",
        description:
          "Strategy transforms into something people can see, read, and engage with. We produce platform-ready content across social, short-form video, photography, campaigns, and other relevant formats.",
      },
      {
        number: "03",
        title: "Distribute",
        description:
          "Great content only works when it reaches the right people. We adapt and distribute content across search, social, campaigns, websites, and the channels that matter most to your audience.",
      },
      {
        number: "04",
        title: "Measure & Refine",
        description:
          "We look beyond likes and views. We assess reach, engagement, visibility, traffic, enquiries, and other meaningful signals to understand what is working, using those insights to improve what comes next.",
      },
    ],
  },
  caseStudies: {
    body: "Strategy is only valuable when it translates into work that performs. Explore how we've used content, creative, and campaigns to help brands in Glasgow build visibility, engagement, and momentum.",
  },
};
