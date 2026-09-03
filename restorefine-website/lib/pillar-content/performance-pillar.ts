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

export interface PerformancePillarContent {
  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    subtext: string;
    ctaLabel: string;
  };
  overview: {
    heading: string;
    body: string;
    problems: string[];
  };
  subServices: PillarSubService[];
  process: {
    intro: string[];
    steps: PillarProcessStep[];
  };
  insights: {
    body: string;
    blogSlugs: string[];
  };
  caseStudies: {
    heading: string;
    body: string;
  };
}

export const performancePillarContent: PerformancePillarContent = {
  hero: {
    eyebrow: "Resto Performance",
    line1: "Get Found. Get Chosen.",
    line2: "Get Results.",
    subtext:
      "Performance marketing that combines SEO, paid campaigns, conversion-focused websites, and data-led optimisation to turn digital visibility into measurable growth.",
    ctaLabel: "Start Growing",
  },
  overview: {
    heading: "Turn Your Digital Footprint Into a Growth Engine",
    body: "Getting found is one thing. Turning that attention into enquiries, bookings, leads, and revenue is what matters. Every part of your digital presence has a role to play. We connect the channels (SEO, paid media, websites, conversion optimisation, and analytics) that attract the right audience with the experiences that turn attention into action, then use the data to keep improving performance.",
    problems: [
      "Low search visibility means potential customers find your competitors first.",
      "Poor digital experiences drive away interested visitors before they convert.",
      "Unfocused paid campaigns can consume budget without generating meaningful returns.",
      "Limited tracking leaves you guessing what's working, what's not, and where to invest next.",
    ],
  },
  subServices: [
    {
      number: "01",
      title: "Websites",
      description:
        "We create fast, conversion-focused websites built to do more than look good. From booking a table to buying online, our websites make it easier for the right people to discover your business and take the next step.",
      image: "/services/web/pexels-fotios-photos-16129705.webp",
      includes: ["Custom Website Design", "CMS Integration", "Conversion-focused UX", "Mobile-first Development"],
      ctaLabel: "Let's Build Your Website",
      ctaHref: "/enquire-now",
    },
    {
      number: "02",
      title: "SEO",
      description:
        "Search visibility is only valuable when it brings the right people to your business. We combine technical and local SEO, on-page optimisation, and authority building to turn organic visibility into meaningful growth opportunities.",
      image: "/services/web/pexels-pixabay-270348.webp",
      includes: ["Local SEO", "Google Business Profile", "On-page Optimisation", "Link Building"],
      ctaLabel: "Explore SEO Services",
      ctaHref: "/enquire-now",
    },
    {
      number: "03",
      title: "Paid Ads",
      description:
        "Put your business in front of the right audience at the right moment. We build and continuously optimise Google and Meta campaigns around your goals, focusing on meaningful actions, efficient spend, and measurable returns.",
      image: "/dashbg.webp",
      includes: ["Google Ads", "Meta Ads", "Retargeting", "A/B Testing"],
    },
    {
      number: "04",
      title: "Conversion Rate Optimisation",
      description:
        "More traffic means little if visitors don't take action. We identify the friction between interest and conversion, improving your landing pages, calls to action, and customer journey so more clicks become meaningful business opportunities.",
      image: "/services/web/pexels-picjumbo-com-55570-196644.webp",
      includes: ["Landing Page CRO", "Conversion Journey Audit", "CTA Optimisation", "User Journey Mapping"],
    },
    {
      number: "05",
      title: "Analytics",
      description:
        "With clear, actionable analytics, you can see how your marketing is performing across traffic, campaigns, conversions, and revenue. We turn your data into practical insights, helping you understand what's driving results and where to optimise next.",
      image: "/services/web/pexels-pixabay-39284.webp",
      includes: ["Performance Reporting", "Traffic Analysis", "Ad Spend & ROI", "Conversion Insights"],
    },
  ],
  process: {
    intro: [
      "Performance marketing is more than generating clicks or traffic. It's a data-driven approach to digital marketing that connects your marketing activity to measurable business outcomes, from qualified traffic and leads to bookings, sales, and revenue.",
      "At RestoRefine, we turn that principle into a connected process. We identify where opportunities are being lost, build a strategy around your commercial goals, and continuously optimise based on what the data tells us.",
    ],
    steps: [
      {
        number: "01",
        title: "Audit",
        description:
          "Understand what's working, what's not, and where potential customers are being lost across your search, campaigns, website, and conversion journey.",
      },
      {
        number: "02",
        title: "Strategy",
        description:
          "Build the right channel mix around your audience, commercial objectives, and growth opportunities.",
      },
      {
        number: "03",
        title: "Build",
        description:
          "Put the strategy into action across SEO, paid media, websites, and conversion experiences designed to attract, engage, and convert the right audience.",
      },
      {
        number: "04",
        title: "Measure",
        description:
          "Track the metrics that matter across traffic, acquisition, conversions, and revenue, giving you a clear view of what's driving performance.",
      },
      {
        number: "05",
        title: "Optimise",
        description:
          "Use real performance data to test, refine, and improve every part of the customer journey, continuously turning insight into better results.",
      },
    ],
  },
  insights: {
    body: "Explore our latest thinking, strategies, and lessons from working across branding, digital marketing, SEO, and growth.",
    blogSlugs: [
      "10-signs-your-business-needs-a-digital-marketing-company-in-glasgow",
      "how-we-helped-padel-academy-scotland-build-brand-from-scratch",
    ],
  },
  caseStudies: {
    heading: "Performance You Can See",
    body: "Real businesses across Glasgow. Real challenges. Real results. See how we connect strategy, creative, and digital performance to create measurable growth.",
  },
};
