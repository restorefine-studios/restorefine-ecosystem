/**
 * Homepage content. Sections are added incrementally, eventually all
 * homepage copy will live here and be fetched by the corresponding block.
 */

export const homeContent = {
  growthProblem: {
    eyebrow: "The Disconnected Growth Problem",
    fragments: ["Brand", "Marketing", "Website"],
    headline: {
      lead: ["Most businesses don't have a branding problem.", "Or a marketing problem. Or a website problem."],
      emphasisPrefix: "They have a problem of",
      emphasisBlack: "Disconnected",
      emphasis: "Growth",
    },
    body: [
      "Your business doesn't quite feel like \"you\" anymore. Brand goes one way. Marketing runs another. The website sits somewhere in between, built for launch day and never touched since. Individually, each piece may look fine. Together, they create friction instead of momentum.",
      "Growth doesn't stall because one part is broken. It stalls because strategy, branding, marketing, and digital experience evolve separately instead of moving towards the same goal.",
    ],
    unifiedTag: "Brand · Marketing · Website · Strategy",
    closing: "That's why we don't treat them as separate services. We connect every discipline into one growth system, assisting ambitious businesses in building momentum, creating better customer experiences, and growing with confidence.",
    cta: {
      label: "Enquire Now",
      href: "/enquire-now",
    },
  },

  whyWorkWithUs: {
    eyebrow: "Why Work With Us",
    headline: {
      prefix: "A Better Way to Grow With",
      brand: "RestoRefine",
    },
    intro: "Growth doesn't come from doing more. It comes from doing the right things, in the right order, with every part of the business moving in the same direction.",
    features: [
      {
        title: "Strategy Before Execution",
        description: "We don't jump straight into design, marketing, or development. Every project starts with understanding your business, your market, and where you want to go. Better strategy leads to better decisions.",
        icon: "compass",
      },
      {
        title: "Connected, Not Fragmented",
        description: "Your brand, marketing, and digital experience shouldn't work in isolation. We bring every discipline together under one strategy to create a consistent customer journey and stronger business outcomes.",
        icon: "link",
      },
      {
        title: "Built for What's Next",
        description: "Businesses evolve, and so should the brands and digital experiences behind them. Everything we create is designed to adapt, scale, and support your next stage of growth.",
        icon: "rocket",
      },
      {
        title: "Creative That Performs",
        description: "Great creative should do more than look good. From conversion-focused websites to analytics, automation, and measurable marketing, every decision is made with performance in mind.",
        icon: "chart",
      },
    ],
    closing: "Because sustainable growth isn't built through disconnected services. It's built through connected thinking.",
  },

  finalCta: {
    headline: {
      prefix: "Ready to Build What's",
      accent: "Next?",
    },
    body: "Whether you're launching something new, repositioning an established brand, or preparing for your next stage of growth, we'd love to hear what you're building.",
    cta: {
      label: "Start the Conversation Now",
      href: "/enquire-now",
    },
  },

  framework: {
    eyebrow: "The Framework",
    headline: {
      prefix: "Four Disciplines.",
      accent: "One System.",
    },
    intro: "Growth doesn't happen because one thing gets better. It happens when strategy, brand, marketing, and digital experience work together to create lasting momentum.",
    features: [
      {
        title: "Strategy",
        tagline: "Find direction before making decisions.",
        description: "Every successful business starts with direction. We define your positioning, clarify your goals, and create the roadmap that guides every decision after.",
        icon: "compass",
      },
      {
        title: "Brand",
        tagline: "Build recognition people remember.",
        description: "Your brand should do more than look good. We create identities, messaging, and creative systems that build recognition, trust, and long-term value.",
        icon: "palette",
      },
      {
        title: "Marketing",
        tagline: "Turn visibility into demand.",
        description: "Marketing works best when it's driven by strategy. From SEO and content to campaigns and local visibility, we create demand that compounds over time.",
        icon: "trending",
      },
      {
        title: "Digital Experience",
        tagline: "Turn every interaction into momentum.",
        description: "Your website should be more than a destination. We design digital experiences that convert visitors, support your customers, and evolve as your business grows.",
        icon: "monitor",
      },
    ],
    poweredBy: {
      title: "Powered by Technology",
      description: "CRM, automation, analytics, and connected systems quietly support every stage of the framework, making growth measurable, repeatable, and ready to scale.",
    },
  },

  industries: {
    eyebrow: "Industries / Specialisms",
    headline: {
      prefix: "Businesses We Help",
      accent: "Grow.",
    },
    intro: "No two businesses are the same, but sustainable growth follows the same principles. Our Connected Growth Framework adapts to your goals, your market, and your customers, while bringing strategy, brand, marketing, and digital experience together around one clear direction.",
    items: [
      {
        title: "Hospitality",
        description: "From independent restaurants to multi-site hospitality groups, we help brands attract more guests, strengthen market position, and create memorable customer experiences.",
        icon: "utensils",
      },
      {
        title: "Sport & Leisure",
        description: "Whether launching a new venue or growing an established destination, we build brands and digital experiences that create momentum beyond opening day.",
        icon: "trophy",
      },
      {
        title: "Lifestyle Brands",
        description: "For founder-led and identity-driven businesses, we align the brand and the founder's vision with strategy and customer experience to support long-term growth.",
        icon: "sparkles",
      },
      {
        title: "Professional Services",
        description: "Trust is earned long before the first conversation. We help professional businesses build credible brands and digital experiences that inspire confidence from the very first interaction.",
        icon: "briefcase",
      },
    ],
  },

  clientSpotlight: [
    {
      id: "itspadel",
      tag: "Launch",
      title: "It's",
      titleAccent: "Padel.",
      image: "/clients/itspadel-bg.png",
      isSvg: false,
      meta: { Client: "It's Padel", Industry: "Sports & Recreation", Year: "2024-25" },
      services: ["Branding", "Web Development", "Social Media", "Video Production"],
      description: "A brand built from the ground up. From strategy and identity to website and digital experience, we created everything needed to launch with confidence from day one.",
      href: "/portfolio/itspadel",
    },
    {
      id: "day-today",
      tag: "Grow",
      title: "Day-to",
      titleAccent: "Day.",
      image: "/portfolio-client-thumbnail/day-today.png",
      isSvg: false,
      meta: { Client: "Day-to-Day", Industry: "Retail", Year: "2026" },
      services: ["TikTok Marketing", "Content Strategy", "Video Production", "Local SEO"],
      description: "We transformed content from a publishing routine into a strategic marketing engine: building visibility, engagement, and long-term demand.",
      href: "/portfolio/day-today-tiktok-marketing-case-study",
    },
    {
      id: "masalamoves",
      tag: "Reposition",
      title: "Masala",
      titleAccent: "Moves.",
      image: "/clients/masalamoves-bg.png",
      isSvg: false,
      meta: { Client: "Masala Moves", Industry: "Dance & Performance", Year: "2024" },
      services: ["Brand Identity", "Logo Design", "Social Media", "Merchandise"],
      description: "Realigned the brand to reflect how the business had evolved, creating a stronger identity for its next stage of growth.",
      href: "/portfolio/masala-moves-by-luna-shree",
    },
    {
      id: "zacleaning",
      tag: "Modernize",
      title: "Za",
      titleAccent: "Cleaning.",
      image: "/portfolio-client-thumbnail/za-cleaning.png",
      isSvg: false,
      meta: { Client: "Za Cleaning", Industry: "Cleaning Services", Year: "2026" },
      services: ["Web Design", "Conversion Optimisation", "Mobile-First Design"],
      description: "Refreshed a dated brand and digital presence to reflect the business better today and support future growth.",
      href: "/portfolio/za-cleaning",
    },
  ],
};
