export interface PillarServicePoint {
  title: string;
  description: string;
}

export interface PillarSubService {
  number: string;
  category: string;
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

export interface BrandPillarContent {
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
    body: string[];
    caption: {
      label: string;
      text: string;
    };
  };
  subServices: PillarSubService[];
  process: {
    heading1: string;
    heading2: string;
    intro: string;
    steps: PillarProcessStep[];
  };
  caseStudies: {
    heading: string;
    body: string;
    emphasis: string;
  };
}

export const brandPillarContent: BrandPillarContent = {
  hero: {
    eyebrow: "Resto Brand",
    line1: "First Impressions",
    line2: "Make Them Count.",
    subtext: "Your business has grown. Your brand should grow with it.",
    ctaLabel: "Let's Build Your Brand",
  },
  overview: {
    intro:
      "Whether your brand feels outdated or simply no longer reflects the business you've built, Restorefine helps you bring it back into focus. We combine brand strategy, positioning, and identity to create brands that look distinctive, communicate clearly, and give the right people a reason to choose you.",
    heading: "Build a Brand That Means Something",
    body: [
      "Your brand should do more than look good. It should make your business recognizable, communicate what you stand for, and give the right people a reason to choose you.",
      "From our base in Glasgow, Restorefine brings strategy, identity, and design together to create a brand that feels unmistakably yours and works consistently across every customer touchpoint.",
    ],
    caption: {
      label: "What you get",
      text: "A brand system built to look consistent, feel distinctive, and stay memorable.",
    },
  },
  subServices: [
    {
      number: "01",
      category: "Brand Strategy",
      title: "Know What Your Brand Stands For.",
      description:
        "Before you decide how your brand should represent the business, you need clarity on what it should say and who it needs to reach. We define your positioning, voice, and messaging so your brand has a clear direction, while every touchpoint communicates it consistently.",
      image: "/services/media/pexels-pixabay-262438.webp",
      includes: ["Brand Positioning", "Brand Voice & Messaging", "Competitor Analysis", "Brand Strategy Deck"],
    },
    {
      number: "02",
      category: "Brand Identity Development",
      title: "Turn Your Business Into a Brand People Recognise.",
      description:
        "A strong brand is more than a logo. From colour and typography to digital platforms and brand communications, we develop cohesive visual identity systems that give your business a distinctive look and make it instantly recognisable across every touchpoint.",
      image: "/services/branding/pexels-duygugungor-19949505.webp",
      includes: ["Colour Palette", "Typography System", "Brand Guidelines", "Stationery Design"],
      ctaLabel: "Let's Talk Branding",
      ctaHref: "/enquire-now",
    },
    {
      number: "03",
      category: "Logo Design",
      title: "Make Your First Mark a Memorable One.",
      description:
        "A logo should be recognisable, versatile, and unmistakably yours. We design distinctive, versatile marks that give your brand a recognisable starting point and work wherever your business shows up, from websites and social profiles to business cards, packaging, and shopfronts.",
      image: "/services/branding/pexels-ron-lach-9617889.webp",
      includes: [
        "Logo Concepts",
        "Primary & Responsive Logo Files",
        "Vector & Digital Files",
        "Favicon & App Icon",
        "Logo Usage Guidelines",
      ],
    },
    {
      number: "04",
      category: "Social Media Design",
      title: "Make Your Brand Recognisable in Every Scroll.",
      description:
        "Your social channels are often where people encounter your brand most frequently. We create branded templates and graphics tailored to your platforms, giving your content a consistent visual identity that builds recognition and keeps your brand unmistakably yours.",
      image: "/services/branding/pexels-beyzaa-yurtkuran-279977530-17789088.webp",
      includes: ["Post Templates", "Story Templates", "Highlight Covers", "Profile Branding"],
    },
    {
      number: "05",
      category: "Signage & Packaging Design",
      title: "Take Your Brand Beyond the Screen.",
      description:
        "Your brand should feel just as distinctive in the physical world as it does online. We design signage, packaging, and environmental graphics that bring your identity to life, helping to bring a consistent experience from the shopfront to the shelf and every touchpoint in between.",
      image: "/services/print/pexels-sofia-gurashvili-2116386591-30452609.webp",
      includes: ["Storefront Signage", "Window Graphics", "Packaging Design", "Environmental Branding"],
      ctaLabel: "Discuss Your Brand",
      ctaHref: "/enquire-now",
    },
  ],
  process: {
    heading1: "A Simple Process,",
    heading2: "Built Around You.",
    intro:
      "Great branding doesn't need to feel complicated. We keep the process clear and collaborative, taking you from the initial idea to a finished brand with the strategy, creative thinking, and guidance you need along the way.",
    steps: [
      {
        number: "01",
        title: "Make Your Request",
        description:
          "Tell us about your business, where you want to go, and what your brand needs. Whether you're starting from scratch, refreshing an existing identity, or looking for a specific asset, we'll understand the brief and recommend the right approach.",
      },
      {
        number: "02",
        title: "Strategy, Design & Development",
        description:
          "Once we're aligned on the direction, we bring the ideas to life. We develop concepts, refine the creative direction, and build your brand across the assets and touchpoints you need.",
      },
      {
        number: "03",
        title: "Receive & Refine",
        description:
          "Your brand isn't finished until you're confident in it. We present the work, gather your feedback, and refine the final direction before delivering your completed brand assets, ready to use.",
      },
    ],
  },
  caseStudies: {
    heading: "Branding for Businesses in Glasgow & Beyond",
    body: "From growing local businesses in Scotland to ambitious brands in the UK looking further afield, we help businesses in hospitality, sports, leisure, and more build identities that are clear, distinctive, and made to last.",
    emphasis: "Explore some of the brands we've helped shape.",
  },
};
