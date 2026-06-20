export interface PillarServicePoint {
  title: string;
  description: string;
}

export interface PillarSubService {
  number: string;
  title: string;
  description: string;
  image: string;
  href?: string;
  includes: string[];
}

export interface PillarProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface BrandPillarContent {
  hero: {
    title: string;
    description: string;
  };
  overview: {
    heading: string;
    body: string;
  };
  services: PillarServicePoint[];
  subServices: PillarSubService[];
  process: {
    heading: string;
    intro: string;
    steps: PillarProcessStep[];
  };
}

export const brandPillarContent: BrandPillarContent = {
  hero: {
    title: "Your Brand Is the First Thing People Judge. Make It Count.",
    description:
      "With RestoRefine Branding, develop a compelling brand that captures attention and builds trust. From logo design to complete brand identity development, including social media graphics and brand strategy, we ensure your brand communicates clearly, consistently, and powerfully across every channel and every audience.",
  },
  overview: {
    heading: "Build a Brand That Means Something",
    body: "In a crowded market, a weak brand is invisible. At Restorefine, we create identity systems that communicate who you are, what you stand for, and why customers should choose you across every touchpoint, every time.",
  },
  services: [
    {
      title: "Logo Design",
      description:
        "Your logo is the foundation of everything. We design marks that are distinctive, versatile, and built to work at any scale from a business card to a billboard, a favicon to a storefront sign.",
    },
    {
      title: "Brand Identity Development",
      description:
        "A logo is just the beginning. We develop complete visual identity systems colour palettes, typography, graphic language, and brand guidelines, so your business looks and feels consistent everywhere it shows up.",
    },
    {
      title: "Social Media Design",
      description:
        "Your social presence is your most visible brand channel. We design scroll stopping templates and graphics tailored to your platforms, so your feed builds recognition, credibility, and engagement.",
    },
  ],
  subServices: [
    {
      number: "01",
      title: "Logo Design",
      description:
        "Your logo is the foundation of everything. We design marks that are distinctive, versatile, and built to work at any scale — from a business card to a billboard, a favicon to a storefront sign.",
      image: "/services/branding/pexels-ron-lach-9617889.webp",
      includes: ["Logo Concepts", "Vector Files", "Favicon & App Icon", "Usage Guidelines"],
    },
    {
      number: "02",
      title: "Brand Identity Development",
      description:
        "A logo is just the beginning. We develop complete visual identity systems — colour palettes, typography, graphic language, and brand guidelines — so your business looks and feels consistent everywhere it shows up.",
      image: "/services/branding/pexels-duygugungor-19949505.webp",
      href: "/services/branding",
      includes: ["Colour Palette", "Typography System", "Brand Guidelines", "Stationery Design"],
    },
    {
      number: "03",
      title: "Brand Strategy",
      description:
        "Great branding starts with clarity. We define your positioning, voice, and messaging so every design decision points in the same direction — and every touchpoint says the same thing about who you are.",
      image: "/services/media/pexels-pixabay-262438.webp",
      includes: ["Positioning", "Brand Voice & Messaging", "Competitor Analysis", "Brand Strategy Deck"],
    },
    {
      number: "04",
      title: "Signage & Packaging Design",
      description:
        "Your brand doesn't stop at the screen. We design storefront signage, window graphics, and packaging that carry your identity into the physical world — consistent from the door to the till.",
      image: "/services/print/pexels-sofia-gurashvili-2116386591-30452609.webp",
      includes: ["Storefront Signage", "Window Graphics", "Packaging Design", "Environmental Branding"],
    },
    {
      number: "05",
      title: "Social Media Design",
      description:
        "Your social presence is your most visible brand channel. We design scroll-stopping templates and graphics tailored to your platforms, so your feed builds recognition, credibility, and engagement.",
      image: "/services/branding/pexels-beyzaa-yurtkuran-279977530-17789088.webp",
      href: "/services/social-media-management",
      includes: ["Post Templates", "Story Templates", "Highlight Covers", "Profile Branding"],
    },
  ],
  process: {
    heading: "A Simple Process That Gets Results",
    intro:
      "We've built our process around one goal, making great branding straightforward, so you can focus on running your business while we handle the creative.",
    steps: [
      {
        number: "01",
        title: "Make Your Request",
        description:
          "Tell us about your business, your goals, and what you need. Whether it's a full brand build or a specific asset, we'll scope it out and get started.",
      },
      {
        number: "02",
        title: "Design & Development",
        description:
          "Our creative team gets to work; developing concepts, refining directions, and building your identity across every channel and format.",
      },
      {
        number: "03",
        title: "Receive & Refine",
        description:
          "You receive your brand assets with full revision rounds included. We refine until you're completely confident in what you've got.",
      },
    ],
  },
};
