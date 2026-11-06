/**
 * Manchester location page content (/growth-marketing-agency-manchester).
 *
 * Same shape as the London page: the homepage content with the copy
 * overridden, plus the location-only extras.
 */

import { homeContent } from "@/lib/homepageData";
import type { LocationExtras } from "@/lib/locations/london";

const BASE_URL = "https://www.restorefine.co.uk";
const home = homeContent;

/** Keeps a homepage image by service id, so Manchester only overrides the copy */
const imageFor = (id: string) => [...home.services.core, ...home.services.more].find((s) => s.id === id)?.image ?? null;

export const manchesterContent = {
  ...home,

  meta: {
    title: "Growth Marketing Agency Manchester | RestoRefine",
    description:
      "RestoRefine is a growth marketing agency serving Manchester businesses with branding, websites, SEO, paid ads, content and CRM to support enquiries and sales.",
    canonical: `${BASE_URL}/growth-marketing-agency-manchester`,
  },

  hero: {
    heading: "Growth Marketing Agency Manchester",
    accent: "Growth",
    body: "RestoRefine helps Manchester businesses coordinate their branding, website, content, and marketing to support their growth. From brand development and web design to SEO, paid advertising, and social media, we connect creative and digital services to help you reach the right audiences, aligning our approach with your goals.",
  },

  services: {
    heading: "Growth Marketing Services We Provide in Manchester",
    body: "For businesses in Manchester, RestoRefine offers individual services or a connected mix of creative, marketing and digital solutions to address your needs and support your next steps.",
    core: [
      {
        id: "branding",
        title: "Branding",
        tagline: "Define what sets your brand apart.",
        description:
          "Build a distinctive, recognisable brand that helps your business stand out and earn customer trust. Through creative positioning, consistent messaging and cohesive visual identity, we align how your business presents itself across websites, marketing materials and customer touchpoints.",
        items: ["Logo Design", "Brand Identity Development", "Brand Strategy"],
        image: imageFor("branding")!,
        href: "/services/brand",
      },
      {
        id: "design",
        title: "Design",
        tagline: "Make every brand touchpoint count.",
        description:
          "Whether it’s menus, print materials and signage or packaging, social media graphics and branded merchandise, we create cohesive visual assets that effectively communicate your business value, improve brand recognition and present your products and services clearly across physical and digital channels.",
        items: ["Menu Design", "Print Design", "Signage Design", "Packaging Design", "Social Media Design", "Merchandise Design"],
        image: imageFor("design")!,
        href: "/services/brand",
      },
      {
        id: "content",
        title: "Content",
        tagline: "Reach the right audience.",
        description:
          "From website copy and social media posts to advertising creatives, campaign assets, and short-form formats, we plan and produce content tailored to each platform. Every piece is created to communicate your value, engage the right audience, and encourage the next step.",
        items: ["Content Strategy", "Photography", "Videography", "Short-Form Video"],
        image: imageFor("content")!,
        href: "/services/content",
      },
      {
        id: "seo",
        title: "SEO",
        tagline: "Turn your search visibility into opportunities.",
        description:
          "We combine technical SEO, content optimisation, and AI-driven search strategies to help your business get discovered. From improving website performance and Google Business Profile visibility to building authority and tracking conversions, we help your business reach relevant audiences in Manchester and beyond.",
        items: ["On-Page SEO", "Technical SEO", "Local SEO & GBP Optimisation", "AI Search Optimisation (AEO/GEO)"],
        image: imageFor("seo")!,
        href: "/services/performance",
      },
      {
        id: "paid-ads",
        title: "Paid Ads",
        tagline: "Turn ad clicks into qualified leads.",
        description:
          "We plan and manage Google and Meta ad campaigns around your audience, objectives, and budget. Through targeted ads, retargeting, creative testing, and conversion tracking, we identify what drives enquiries and refine campaigns to make your advertising spend work towards your business goals.",
        items: ["Google Ads", "Meta Ads"],
        image: imageFor("paid-ads")!,
        href: "/services/performance",
      },
    ],
    more: [
      {
        id: "social",
        title: "Social Media Marketing",
        tagline: "Generate engagement that supports business goals.",
        description:
          "We actively plan, schedule, and publish platform-specific content to help your brand reach relevant audiences. From community engagement and campaign management to creative development and performance reporting, we aim to strengthen your brand awareness and build customer relationships.",
        image: imageFor("social"),
        href: "/services/content",
      },
      {
        id: "web",
        title: "Web Development",
        tagline: "Turn your website into a growth channel.",
        description:
          "We design and develop responsive websites that connect your brand, content, and marketing with a clear path to conversion. From intuitive navigation and CMS integration to faster page experiences and streamlined booking journeys, we build websites that help visitors find what they need and take the next step.",
        image: imageFor("web"),
        href: "/services/performance",
      },
      {
        id: "crm",
        title: "CRM",
        tagline: "Turn more enquiries into customers.",
        description:
          "We help organise customer information, manage leads and automate follow-ups through CRM setup and integration. With audience segmentation, lead nurturing and marketing automation, you can respond to enquiries more consistently, keep opportunities moving through your pipeline and strengthen customer retention.",
        image: imageFor("crm"),
        href: "/services/performance",
      },
      {
        id: "nfc",
        title: "NFC Smart Cards",
        tagline: "From a simple tap to your next opportunity.",
        description:
          "Our NFC Smart Cards let customers access your digital business information with a simple tap on a compatible smartphone. You can share contact details, websites, social profiles, or other key links without relying on printed information.",
        image: imageFor("nfc"),
        href: "/enquire-now",
      },
    ],
    cta: home.ctas.enquire,
  },

  process: {
    heading: "How Our Growth Agency Works With Manchester Businesses",
    lead: "Our approach is as simple as RESTO: a five-step process that takes you from the first conversation through strategy, delivery and performance tracking, keeping your business goals at the centre of every step.",
    steps: [
      {
        number: "01",
        title: "Reach Out",
        description:
          "Get in touch to tell us about your business, your goals, and what you need help with. We’ll listen, ask the right questions, and understand what success looks like for you.",
      },
      {
        number: "02",
        title: "Evaluate",
        description:
          "We assess where your brand stands today, how your website and marketing are performing, and where there’s room to grow. For Manchester-focused projects, this can include relevant local search competition, customer demand and the wider market context.",
      },
      {
        number: "03",
        title: "Strategize",
        description:
          "We build a tailored plan around measurable goals, prioritising the right services, business outcomes and customers. For businesses targeting Manchester, we consider relevant audience needs and market conditions to shape priorities and next steps.",
      },
      {
        number: "04",
        title: "Transform",
        description:
          "We bring the plan to life, delivering the agreed work, whether branding, websites, content or marketing, with care, creativity and attention to detail.",
      },
      {
        number: "05",
        title: "Optimize",
        description:
          "We track results and review performance to understand what’s working, identify what can improve, and refine our approach, helping you make more of your marketing investment.",
      },
    ],
    cta: home.ctas.enquire,
  },

  reviewsCta: { label: "Chat on WhatsApp", href: home.ctas.whatsapp.href },

  whyChoose: {
    ...home.whyChoose,
    heading: "Why Choose RestoRefine as Your Growth Marketing Agency in Manchester",
    body: "For Manchester businesses seeking more than isolated marketing services, RestoRefine connects branding, acquisition, and conversion to help convert more prospects into customers and encourage repeat business. From founder-led involvement to transparent reporting, we keep marketing activity aligned with your commercial goals.",
    items: [
      {
        id: "roi",
        title: "ROI-Focused Marketing",
        description:
          "For businesses investing in customer acquisition, marketing needs to contribute to more than clicks and impressions. We align activity with commercial goals such as qualified enquiries, bookings and sales, helping you assess where your marketing investment creates value.",
      },
      {
        id: "full-funnel",
        title: "Full-Funnel Growth Support",
        description:
          "From attracting potential customers to converting enquiries and encouraging repeat business, we support the wider customer journey. This helps your business connect its marketing efforts rather than treating each channel as a separate activity.",
      },
      {
        id: "one-roof",
        title: "All Services Under One Roof",
        description:
          "Easily access branding, content, SEO, paid media, social media, web development and CRM through one growth partner. We help reduce the burden of coordinating multiple suppliers and keep related activities working towards shared business goals.",
      },
      {
        id: "founder-led",
        title: "Founder-Led Projects",
        description:
          "With our founders guiding and managing the projects, you benefit from direct input into planning, key decisions, and project direction. This gives businesses a clearer line of communication between their objectives and the work being delivered.",
      },
      {
        id: "response",
        title: "Response Within Minutes",
        description:
          "We aim to respond to your business enquiries from Manchester within minutes, valuing clear communication and timely support for businesses to clarify their needs, priorities, and next steps.",
      },
      {
        id: "rating",
        title: "5-Star Google Rating",
        description:
          "Our 5-star Google rating offers an independent trust signal for businesses evaluating their marketing agency options. You can use our Google reviews to learn more about other customers’ experiences with RestoRefine.",
      },
      {
        id: "case-studies",
        title: "Real Client Case Studies",
        description:
          "Explore RestoRefine's work for It's Padel, including branding, website development, social media and video production, or Our HQ, covering content strategy, branded social media assets and photography guidelines. These examples help businesses assess whether our experience and approach align with their own goals.",
      },
      {
        id: "reporting",
        title: "Transparent Reporting",
        description:
          "Clear reporting helps you understand what marketing activity has been carried out, how it is performing, and what needs attention next. For businesses investing across multiple channels, this supports more informed decisions about priorities, budgets, and future activity.",
      },
    ],
    closing: "",
  },

  industries: {
    heading: "Industries We Serve in Manchester",
    body: "Different industries face different growth challenges. RestoRefine adapts its branding, digital and marketing services to help Manchester businesses attract the right customers, communicate their value and turn interest into commercial opportunities.",
    items: [
      {
        title: "Hospitality & Restaurants",
        description:
          "We help restaurants, cafés, takeaways and hospitality groups in Manchester with their branding, menu showcases and customer attraction. From venue promotions and social content to local search visibility and booking journeys, we help turn customer interest into visits and enquiries.",
        image: home.industries.items[0].image,
      },
      {
        title: "Sport & Leisure",
        description:
          "For gyms, fitness studios, sports clubs and leisure venues, growth depends on attracting participants and giving them reasons to return. We support launch campaigns, brand development, digital content and booking experiences that help turn local interest into enquiries, repeat participation, and memberships.",
        image: home.industries.items[1].image,
      },
      {
        title: "Lifestyle Brands",
        description:
          "Lifestyle brands need to communicate what makes their products distinctive while giving customers a clear path from discovery to purchase. We connect brand identity, product imagery, storytelling, social content, and website experiences to help businesses build recognition and convert audience interest into sales.",
        image: home.industries.items[2].image,
      },
      {
        title: "Professional Services",
        description:
          "For consultancies and other professional service firms, winning new clients often starts with demonstrating expertise and earning trust before even connecting. We bring responsive websites, search visibility, useful content, and enquiry journeys together so potential clients can understand the value of the service and take the next step.",
        image: home.industries.items[3].image,
      },
    ],
  },

  businesses: {
    heading: "Businesses We Work With in Manchester",
    body: "Whether you're preparing to launch, looking to grow or refining an established operation, RestoRefine adapts its branding, marketing and digital support to your business's current priorities and next stage of growth.",
    items: [
      {
        title: "New Businesses",
        description:
          "Starting a business means bringing your brand, website and launch marketing together from the outset. We help turn your initial plans into a consistent identity and online presence, ready to introduce your business to its target customers in Manchester and beyond.",
      },
      {
        title: "Growing Businesses",
        description:
          "As your business expands, reaching new customers and maintaining consistent marketing can become more demanding. We help strengthen online visibility, coordinate campaigns, and support customer acquisition so your marketing keeps pace with your growth ambitions.",
      },
      {
        title: "Established Businesses",
        description:
          "Established businesses may need to refresh their brand, improve website performance, or explore new ways to attract and retain customers. We help identify opportunities across branding, marketing, and digital systems to support and create a stronger foundation for evolving commercial goals.",
      },
    ],
  },

  resources: {
    ...home.resources,
    heading: "Growth And Marketing Resources",
    body: "Explore our latest insights, portfolios, and perspectives on branding, marketing, and business growth to help you make more informed decisions.",
  },

  faqs: {
    heading: "FAQ",
    items: [
      {
        question: "How Much Does a Growth Marketing Agency in Manchester Cost?",
        answer: [
          "There is no universal price for growth marketing services. Costs depend on the services required, project scope, complexity, and whether you need a one-off project or ongoing support. You can contact RestoRefine to discuss your business goals and receive a tailored quote.",
        ],
      },
      {
        question: "How Is a Growth Marketing Agency Different From a Digital Marketing Agency in Manchester?",
        answer: [
          "Growth marketing connects customer acquisition, conversion, retention, and performance measurement around wider business goals. Digital marketing often focuses on online channels such as SEO, paid advertising and social media, although some agencies also provide broader strategic and growth support.",
        ],
      },
      {
        question: "Can a Growth Marketing Agency Work With an Existing In-House Marketing Team?",
        answer: [
          "Yes. A growth marketing agency can complement your in-house team with specialist expertise or additional execution capacity across SEO, paid campaigns, content, web development and CRM. This can help fill capability gaps while allowing your internal team to retain oversight of its broader marketing priorities.",
        ],
      },
      {
        question: "When Should a Manchester Business Hire a Growth Marketing Agency?",
        answer: [
          "You should consider hiring one when you’re preparing to launch, struggling to generate consistent enquiries, lacking specialist in-house skills, or coordinating multiple suppliers without a unified strategy. It may also be useful when marketing activity needs clearer measurement, stronger coordination or a more effective approach to customer acquisition.",
        ],
      },
      {
        question: "What Should a Manchester Business Look for When Choosing a Growth Marketing Agency?",
        answer: [
          "Look for relevant service capabilities, genuine case studies, client reviews, transparent reporting and clear communication. You should also understand the proposed scope, costs, responsibilities and how success will be measured before committing to an agency.",
        ],
      },
      {
        question: "How Do You Measure the Success of Growth Marketing?",
        answer: [
          "Success is measured against business objectives using metrics such as qualified enquiries, bookings, sales, conversion rates, customer acquisition costs and repeat purchases. The most relevant indicators depend on your business model, target customers and commercial priorities.",
        ],
      },
      {
        question: "How Long Does Growth Marketing Take to Deliver Results?",
        answer: [
          "Timelines vary depending on your starting point, chosen channels, competition and scope of work. Paid campaigns can generate performance data relatively quickly, while SEO and organic visibility generally require sustained effort. Regular measurement helps identify progress and guide adjustments over time.",
        ],
      },
      {
        question: "Does RestoRefine Offer Support to Businesses in Manchester?",
        answer: [
          "Yes. RestoRefine can discuss projects and coordinate marketing work with Manchester businesses without requiring a local office. The services, communication arrangements, and project scope can be agreed during the initial consultation based on your business needs.",
        ],
      },
    ],
  },

  finalCta: {
    ...home.finalCta,
    heading: "Start Growing Your Business With RestoRefine",
    accent: "Growing",
    body: "Ready to turn your growth goals into action? Enquire with RestoRefine today to discuss your project and get started. Tell us what’s holding your business back and what you want to achieve. We’ll discuss your priorities and help identify the right next steps for your business.",
    headingAsH2: true,
    ctas: home.ctas,
  },
};

/** Sections that only location pages have */
export const manchesterExtras: LocationExtras = {
  challenges: {
    heading: "Growth Marketing Challenges Manchester Businesses Face",
    body: "Standing out in a competitive market like Manchester can be challenging for various businesses. On top of that, fragmented branding, SEO, content, and paid campaigns can make it harder to reach the right customers, differentiate from competitors, and generate revenue while keeping marketing budgets accountable.",
    items: [
      {
        title: "Competing for Customer Attention",
        description:
          "For businesses in a competitive market, standing out means giving customers a clear reason to choose them over others. Without distinctive positioning, relevant content, strong search visibility, and a website built to convert, even well-planned marketing can struggle to deliver commercial value.",
      },
      {
        title: "Pressure on Marketing Budgets",
        description:
          "Generating leads and sales on limited budgets can make growth difficult to sustain for businesses in Manchester. When paid campaigns, SEO and other marketing activities deliver uneven results, deciding where to invest becomes a challenge.",
      },
      {
        title: "Limited Specialist Marketing Skills",
        description:
          "Businesses looking for growth can require expertise across SEO, paid media, content, web development, CRM and analytics. Building all these capabilities in-house can be difficult, while coordinating multiple external providers can leave marketing activities and business goals disconnected.",
      },
      {
        title: "Managing Multiple Marketing Channels",
        description:
          "For Manchester businesses targeting customers locally and across the UK, gaps between SEO, paid ads, social media, content, websites and CRM can mean lost enquiries and missed sales opportunities. When channels fail to support the same goals, businesses risk spending on activities that generate attention but fail to deliver revenue.",
      },
      {
        title: "Adapting to Privacy Changes",
        description:
          "Manchester businesses relying on digital marketing may find that privacy restrictions, reduced tracking, and platform changes make it harder to target and measure campaigns accurately. With less reliable performance data, deciding where to focus marketing budgets and how to improve results becomes more challenging.",
      },
    ],
  },

  benefits: {
    heading: "Benefits of Growth Marketing for Manchester Businesses",
    body: "For Manchester businesses looking to grow sustainably, connected growth marketing helps align acquisition, conversion, and retention efforts, helping businesses make clearer investment decisions, strengthen customer relationships, and adapt more quickly as trends change.",
    items: [
      {
        title: "Improve Marketing ROI",
        description:
          "For businesses performing lead generation and paid campaigns, unclear links between marketing spend and actual sales can make budgets difficult to justify. Clear performance tracking helps identify wasted spend, prioritise effective campaigns, and make more informed investment decisions.",
      },
      {
        title: "Use Marketing Budgets More Efficiently",
        description:
          "Businesses balancing customer acquisition costs with growth targets could invest in underperforming campaigns and leave less budget for activities that generate sales. Comparing channel performance against qualified leads and revenue helps businesses decide where to maintain, increase, or reduce investment.",
      },
      {
        title: "Reduce Customer Acquisition Costs",
        description:
          "Spending on ads and marketing channels that bring in clicks but fail to generate qualified leads can drive up the cost of winning new customers. Better audience targeting, campaign testing, and conversion improvements can help reduce wasted spend and make customer acquisition more efficient over time.",
      },
      {
        title: "Increase Customer Retention",
        description:
          "For businesses in Manchester, growth becomes harder to sustain when customers make a one-off purchase but don’t return. Consistent follow-ups, relevant content and well-managed CRM communication help maintain loyalty, encourage repeat purchases and build longer-term customer value.",
      },
      {
        title: "Increase Customer Lifetime Value",
        description:
          "Turning first-time buyers into repeat customers creates more opportunities for businesses to generate revenue from existing leads. Timely follow-ups and personalised offers can bring customers back to book again or purchase additional services, increasing the value of each customer relationship over time.",
      },
      {
        title: "Respond Faster to Market Changes",
        description:
          "When demand shifts, or campaigns underperform, businesses risk losing leads, sales and budgets. By tracking performance, testing new approaches and reallocating spend towards better-performing channels, businesses can protect lead generation, capture emerging opportunities and sustain revenue growth.",
      },
    ],
    cta: home.ctas.enquire,
  },

  knowAbout: {
    heading: "Know About Manchester",
    body: "Manchester’s business landscape spans professional services in Spinningfields, independent creative enterprises around the Northern Quarter, and the mix of hospitality, retail and growing businesses in Ancoats. In a market where standing out and reaching the right customers matters, RestoRefine brings a connected approach to branding, digital visibility and customer acquisition to help businesses turn local awareness into lasting commercial opportunities.",
    places: [
      { name: "Spinningfields", lat: 53.4802, lon: -2.2524, label: "left" },
      { name: "Northern Quarter", lat: 53.4839, lon: -2.2357, label: "top" },
      { name: "Ancoats", lat: 53.4851, lon: -2.2253, label: "right" },
    ],
    boundary: "Manchester",
  },

  area: { name: "Manchester", type: "City" as const },
};
