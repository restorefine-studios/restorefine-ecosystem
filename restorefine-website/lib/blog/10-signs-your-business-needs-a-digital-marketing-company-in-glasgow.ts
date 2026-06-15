export interface BlogSection {
  heading: string;
  content: string;
  link?: {
    label: string;
    href: string;
  };
}

export interface BlogBenefit {
  title: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  titleHighlight?: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string[];
  publishedAt: string;
  updatedAt: string;
  author: string;
  category: string;
  tags: string[];
  excerpt: string;
  coverImage: string;
  intro: string;
  faqs?: { question: string; answer: string }[];
  sectionLabel?: string;
  sections: BlogSection[];
  benefitsLabel?: string;
  benefits?: BlogBenefit[];
  conclusion: string;
  cta: {
    text: string;
    label: string;
    href: string;
  };
}

export const blogPost: BlogPost = {
  slug: "10-signs-your-business-needs-a-digital-marketing-company-in-glasgow",
  title: "10 Signs Your Business Needs a Digital Marketing Company in Glasgow",
  metaTitle: "10 Signs Your Business Needs a Digital Marketing Company in Glasgow | Restorefine",
  metaDescription: "Struggling to generate leads online? Discover 10 clear signs your business needs a digital marketing company in Glasgow — and how Restorefine can help you grow.",
  publishedAt: "2025-05-22",
  updatedAt: "2025-05-22",
  author: "Restorefine Team",
  category: "Digital Marketing",
  tags: [
    "digital marketing company Glasgow",
    "digital marketing agency Glasgow",
    "SEO agency Glasgow",
    "social media marketing Glasgow",
    "paid advertising Glasgow",
    "Google Ads Glasgow",
    "lead generation Glasgow",
    "website design Glasgow",
    "content marketing Glasgow",
    "online marketing Scotland",
    "marketing agency Glasgow",
    "digital marketing services UK",
    "grow business online Glasgow",
    "social media management Glasgow",
    "web design agency Glasgow",
    "digital marketing",
    "Glasgow",
    "SEO",
    "social media marketing",
    "paid advertising",
    "lead generation",
    "web design",
    "content marketing",
    "online marketing",
    "marketing agency",
    "digital marketing services",
    "grow business online",
    "social media management",
    "web design agency",
    "digital marketing company",
  ],
  excerpt: "Many businesses post on social media, run ads, or build websites yet still struggle to generate leads. Here are 10 signs it's time to partner with a digital marketing company in Glasgow.",
  coverImage: "/blog-thumbnail/10-signs-your-business-needs-a-digital-marketing-company-in-glasgow.png",
  intro:
    "Are you searching for a trusted digital marketing company in Glasgow to help your business grow online? Many businesses post on social media, run ads, or build websites yet still struggle to generate leads. Simply having an online presence is not enough. Without the right strategy, businesses face low visibility, poor engagement, inconsistent marketing, and wasted advertising budgets. Partnering with the right digital marketing company in Glasgow can make a huge difference — from SEO and social media marketing to paid advertising and content creation.",
  sections: [
    {
      heading: "Your Website Gets Traffic but No Leads",
      content:
        "If your website is getting visitors but no enquiries or sales, something is wrong. Low conversion rates, weak landing pages, unclear CTAs, and poor user experience often stop people from taking action. A digital marketing company in Glasgow improves your website strategy, optimises pages, and turns traffic into real leads.",
      link: {
        label: "Learn more about our web design solutions",
        href: "https://restorefine.com/services/restoweb",
      },
    },
    {
      heading: "You're Not Consistent With Marketing",
      content: "Posting randomly or stopping marketing altogether can seriously hurt your brand. Without a proper plan, you lose audience attention and trust. A professional digital marketing company creates a consistent strategy with regular posts, campaigns, and branding across all platforms.",
    },
    {
      heading: "Your Competitors Are Growing Faster Online",
      content: "If competitors are ranking higher, running better ads, and getting more attention online, you are already behind. A digital marketing company in Glasgow helps you compete with stronger SEO, paid ad strategies, and content plans so you don't lose customers to rivals.",
    },
    {
      heading: "You Don't Have Time to Manage Marketing",
      content: "Marketing takes daily effort — content creation, SEO, ads, and analytics. Most business owners simply don't have time for this. A digital marketing company handles everything so you can focus on running your business.",
      link: {
        label: "See how we take the pressure off with social media management",
        href: "https://restorefine.com/services/restosocial",
      },
    },
    {
      heading: "Your Paid Ads Are Wasting Money",
      content: "If you're spending on ads but not getting results, the problem is usually poor targeting or weak strategy. A digital marketing company in Glasgow optimises your ads, improves creatives, and helps you achieve a better return on investment.",
    },
    {
      heading: "Your Social Media Isn't Generating Results",
      content: "Low engagement and no conversions mean your social media strategy isn't working. A digital marketing company builds a content strategy, creates engaging posts and reels, and turns followers into paying customers.",
      link: {
        label: "Learn more about our social media marketing services",
        href: "https://restorefine.com/services/restosocial",
      },
    },
    {
      heading: "Your Website Looks Outdated or Slow",
      content: "An outdated or slow website makes customers lose trust instantly. Poor mobile experience also reduces sales. A digital marketing company in Glasgow improves your site's design, speed, and user experience to increase conversions and keep visitors engaged.",
    },
    {
      heading: "You Don't Track Marketing Performance",
      content: "If you're not monitoring analytics or measuring ROI, you don't know what's working. A digital marketing company uses data, tracking tools, and monthly reports to continuously improve your marketing performance and results.",
    },
    {
      heading: "You Want to Scale Your Business Faster",
      content: "If your goal is faster growth, more leads, and stronger branding, digital marketing is essential. A digital marketing company in Glasgow helps you scale through SEO, paid advertising, and strategic campaigns tailored to your business goals.",
    },
  ],
  sectionLabel: "10 Signs",
  benefitsLabel: "What You Get With a Digital Marketing Company in Glasgow",
  benefits: [
    {
      title: "SEO Expertise",
      description: "Rank higher on Google through keyword research, content optimisation, and technical SEO improvements that bring long-term organic traffic.",
    },
    {
      title: "Social Media Management",
      description: "Engaging posts, reels, and campaigns that grow your followers, increase engagement, and build brand awareness across platforms.",
    },
    {
      title: "Paid Advertising",
      description: "Targeted Google Ads, Facebook, and Instagram campaigns that reach the right audience and maximise your ad budget.",
    },
    {
      title: "Branding and Content Creation",
      description: "Professional graphics, videos, and content that make your business look credible and attractive to customers.",
    },
    {
      title: "Better ROI",
      description: "Expert strategies and performance tracking ensure your marketing budget delivers better returns and more conversions.",
    },
    {
      title: "Access to Tools and Experts",
      description: "Advanced tools for SEO, analytics, competitor research, and ad optimisation, backed by experienced digital marketing professionals.",
    },
    {
      title: "Time-Saving and Scalable Growth",
      description: "Focus on running your business while your digital marketing company builds a strategy that supports long-term, scalable growth.",
    },
  ],
  conclusion:
    "If your business is facing low visibility, poor leads, weak social media performance, or wasted ad spend, these are clear signs that you need a digital marketing company in Glasgow. Ignoring these problems will slow down your growth and allow competitors to move ahead. Digital marketing is no longer optional — it is essential for building brand awareness, attracting customers, and increasing sales in today's online world. The sooner you act, the faster you grow.",
  cta: {
    text: "Ready to grow your business online? Work with a trusted growth marketing company in Glasgow to improve your visibility, generate quality leads, and increase sales.",
    label: "Contact Restorefine Today",
    href: "https://restorefine.com/contact",
  },
};

export const blogPosts: BlogPost[] = [blogPost];
