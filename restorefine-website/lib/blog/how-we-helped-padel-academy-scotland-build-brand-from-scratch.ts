export interface CaseStudyResult {
  metric: string;
}

export interface CaseStudyChallenge {
  heading: string;
  description: string;
}

export interface CaseStudyService {
  heading: string;
  content: string;
  bulletPoints?: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  category: string;
  tags: string[];
  excerpt: string;
  coverImage: string;
  client: {
    name: string;
    industry: string;
    location: string;
    website?: string;
  };
  intro: string;
  context: string;
  challenges: CaseStudyChallenge[];
  approach: {
    intro: string;
    services: CaseStudyService[];
  };
  results: CaseStudyResult[];
  testimonial: {
    quote: string;
    author: string;
  };
  closing: string;
  cta: {
    text: string;
    label: string;
    href: string;
  };
  faqs: FAQ[];
}

export const caseStudy: CaseStudy = {
  slug: "how-we-helped-padel-academy-scotland-build-brand-from-scratch",
  title: "How We Helped a Padel Academy in Scotland Build Its Brand from Scratch",
  metaTitle: "How We Helped a Padel Academy in Scotland Build Its Brand from Scratch | Restorefine",
  metaDescription: "We helped It's Padel, a padel academy in Scotland build a complete brand identity, professional website, and social media strategy from scratch. See the results.",
  publishedAt: "2025-05-22",
  updatedAt: "2025-05-22",
  author: "Restorefine Team",
  category: "Case Study",
  tags: [
    "padel academy Scotland",
    "padel club branding Scotland",
    "sports branding Glasgow",
    "digital marketing for sports clubs Scotland",
    "padel club website design",
    "sports academy social media marketing",
    "padel marketing Scotland",
    "branding for sports clubs Scotland",
    "sports club digital marketing Glasgow",
    "padel academy website Scotland",
    "brand identity design Glasgow",
    "social media for sports clubs UK",
    "digital marketing agency Glasgow",
    "sports club logo design Scotland",
    "video production for sports clubs Glasgow",
    "case study",
    "padel",
    "Scotland",
    "branding",
    "web design",
    "social media marketing",
    "sports marketing",
    "Glasgow",
    "its padel uk",
    "sports academy Scotland",
    "sports club Scotland",
    "sports marketing Scotland",
    "digital marketing for sports clubs UK",
    "sports club branding UK",
    "sports club website design UK",
    "brand identity design for sports clubs UK",
    "social media for sports clubs Scotland",
    "digital marketing agency for sports clubs UK",
    "sports club logo design UK",
    "video production for sports clubs UK",
  ],
  excerpt: "When It's Padel came to us, they had courts, coaches, and passion, but no logo, no website, and no digital strategy. Here's how RestorRefine changed that.",
  coverImage: "/blog-thumbnail/how-we-helped-padel-academy-scotland-build-brand-from-scratch.png",
  client: {
    name: "It's Padel",
    industry: "Sports Academy",
    location: "Scotland",
    website: "https://itspadel.co.uk",
  },
  intro: "When It's Padel Team came to us, they had courts, coaches, and passion but no logo, no website, and no digital strategy. Here's how RestorRefine changed that.",
  context:
    "Padel is one of the fastest-growing racket sports in the world, and Scotland is no exception. New courts are opening, communities are forming, and interest is surging. But in a sport where the digital discovery journey often starts with a Google search or an Instagram reel, having a strong online presence isn't optional, it's the deciding factor between a full court and an empty one. When It's Padel, a padel academy based in Scotland, approached RestorRefine, a digital marketing agency in Glasgow, they had everything it takes to build a great padel community. What they lacked was the digital infrastructure to let people find them, trust them, and sign up.",
  challenges: [
    {
      heading: "No consistent brand identity",
      description: "There was no logo, no defined colour palette, and no visual language that tied the academy's communications together across any platform.",
    },
    {
      heading: "No professional website",
      description: "Without a dedicated website, potential players had nowhere to learn about coaching programmes, facilities, or how to get started.",
    },
    {
      heading: "Low social media engagement",
      description: "Posts lacked strategic intent and consistent branding, leading to low reach and little audience interaction.",
    },
    {
      heading: "Difficulty attracting players online",
      description: "Without a discoverable digital presence, new player inquiries from online channels were almost non-existent.",
    },
  ],
  approach: {
    intro:
      "There's no shortcut to a strong brand. It requires clarity, consistency, and execution across every touchpoint — from the logo on a flyer to the thumbnail on a social media reel. For It's Padel, we needed to build everything from scratch, and we needed each element to work cohesively as a system.",
    services: [
      {
        heading: "Branding & Brand Identity Design",
        content:
          "We started where every project should start: the brand. We designed a distinctive logo that reflects the energy and precision of padel — something that works across digital screens, print materials, and court signage alike. From there, we defined a primary colour palette and typographic system that gives It's Padel a recognisable visual voice — one that feels modern, sporty, and credible. Every element was documented in a brand guidelines deck so the academy can maintain visual consistency across all future materials, whether produced by us or in-house.",
      },
      {
        heading: "Website Design & Development",
        content:
          "A padel academy's website needs to do three things well: tell the story of the academy, showcase the coaching programmes and facilities, and make it effortless for someone to get in touch or sign up. We designed and built a responsive, mobile-first website for It's Padel that achieves all three. The site was built with user experience at the centre — clean navigation, fast loading times, and clear calls to action. We also ensured the site was structured with on-page SEO best practices including proper heading hierarchy, descriptive meta tags, and optimised page copy.",
      },
      {
        heading: "Social Media Marketing",
        content:
          "Social media for sports businesses isn't just about posting regularly — it's about posting with purpose. We developed a structured content strategy for It's Padel that defined the type of content to post, the frequency, the tone, and the visual style, all tied back to the new brand identity.",
        bulletPoints: [
          "Designing on-brand graphics and post templates",
          "Creating and editing short-form video reels for Instagram and Facebook",
          "Managing and planning a monthly content calendar",
          "Developing content pillars aligned with audience interests — skill tips, academy highlights, player stories, and promotional content",
        ],
      },
      {
        heading: "Graphic Design & Video Production",
        content:
          "Beyond the core digital channels, we handled a full suite of creative production for It's Padel. Our team designed promotional flyers for print and digital distribution, and handled end-to-end video production including on-site shooting and professional post-production editing of reels for social media.",
      },
    ],
  },
  results: [
    { metric: "Increased social media engagement through strategic content and video marketing" },
    { metric: "A professional website successfully launched, giving the academy a credible and discoverable home online" },
    { metric: "Improved brand recognition across digital and print touchpoints" },
    { metric: "An increase in academy sign-ups through online inquiries" },
  ],
  testimonial: {
    quote: "RestoreFine helped us transform our brand and online presence. From website development to marketing, their team delivered excellent results. We finally have a digital presence that reflects the quality of what we offer on court.",
    author: "It's Padel, Scotland",
  },
  closing:
    "The padel market in Scotland is growing rapidly, but so is the competition. New academies and clubs are opening, and the ones that invest early in their digital presence will be the ones that capture the audience. The key lesson from the It's Padel project is that digital marketing for sports clubs isn't a luxury — it's infrastructure. Just as you wouldn't open an academy without courts and coaching staff, you shouldn't open one without a brand, a website, and a social media strategy in place.",
  cta: {
    text: "Ready to build your brand from scratch? Whether you're launching a padel club, a sports academy, or any other business in Scotland, RestoreFine can build the digital presence you need to grow.",
    label: "Get in Touch with RestoRefine",
    href: "https://restorefine.com/contact",
  },
  faqs: [
    {
      question: "How can a digital marketing agency help a sports academy in Scotland grow online?",
      answer:
        "A digital marketing agency like RestoreFine helps sports academies in Scotland build a consistent brand identity, launch a professional website, and develop an audience through targeted social media marketing and content strategy. For It's Padel, this led to stronger brand recognition, higher social engagement, and an increase in player inquiries from online channels.",
    },
    {
      question: "What does branding for a padel club actually include?",
      answer:
        "Branding for a padel club includes logo design, a defined colour palette and typography system, brand guidelines for digital and print use, social media templates, and promotional materials such as flyers and reels. The goal is to ensure that every piece of communication — online and offline — looks and feels consistent and professional.",
    },
    {
      question: "Does a padel academy in Scotland need its own website?",
      answer:
        "Yes. A dedicated website gives your padel academy a professional home online where potential players can find information about your coaching programmes, facilities, and how to get started. It also plays a critical role in local SEO — helping your club appear in Google searches when people look for padel clubs near them in Scotland.",
    },
    {
      question: "Can social media marketing help a padel club attract new players in Scotland?",
      answer:
        "Absolutely. A structured content strategy including consistent, on-brand posts, short-form video reels, and a planned content calendar significantly increases your visibility on platforms like Instagram and Facebook. This is exactly what RestoreFine delivered for It's Padel, resulting in stronger engagement and more player sign-ups through online inquiry.",
    },
    {
      question: "Is RestoreFine based in Glasgow and do you work with businesses across Scotland?",
      answer: "Yes — RestoreFine is a digital marketing agency based in Glasgow. We work with businesses across Glasgow, Scotland, and the wider UK, offering branding, website development, social media marketing, graphic design, and video production.",
    },
  ],
};

export const caseStudies: CaseStudy[] = [caseStudy];
