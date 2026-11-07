/**
 * Newcastle location page content (/growth-marketing-agency-newcastle).
 *
 * Same shape as the London and Manchester pages: the homepage content with the
 * copy overridden, plus the location-only extras. Copy is from "Newcastle Content.md".
 */

import { homeContent } from "@/lib/homepageData";
import type { LocationExtras } from "@/lib/locations/london";

const BASE_URL = "https://www.restorefine.co.uk";
const home = homeContent;

/** Keeps a homepage image by service id, so Newcastle only overrides the copy */
const imageFor = (id: string) => [...home.services.core, ...home.services.more].find((s) => s.id === id)?.image ?? null;

export const newcastleContent = {
  ...home,
  meta: {
    title: "Growth Marketing Agency Newcastle | RestoRefine",
    description: "RestoRefine serves Newcastle businesses with connected marketing, branding, websites, SEO, paid ads, content and CRM, aiming to respond within minutes.",
    canonical: `${BASE_URL}/growth-marketing-agency-newcastle`,
  },
  hero: {
    heading: "Growth Marketing Agency Newcastle",
    accent: "Growth",
    body: "RestoRefine is a Glasgow-based growth marketing agency serving businesses in Newcastle. We connect brand strategy, creative content, websites, SEO, paid advertising, social media, CRM and digital systems around commercial goals.",
    more: "Businesses seeking a marketing agency in Newcastle can work with RestoRefine on individual projects or a coordinated marketing plan. We tailor delivery to your audience, growth stage and commercial priorities to support customer acquisition, conversion and retention.",
    badges: ["rating", "work", "response"],
  },
  services: {
    heading: "Marketing Services We Provide in Newcastle",
    body: "As a marketing agency serving Newcastle businesses, RestoRefine provides a connected range of services created to support your growth. Whether you need support with a specific marketing requirement or want to bring multiple disciplines together, we align the right expertise under one strategy to create a more consistent & effective marketing approach.",
    core: [
      {
        id: "branding",
        title: "Branding",
        tagline: "Build a brand around what makes you different.",
        description: "We develop clear brand positioning, compelling messaging and distinctive visual identities that give your business a consistent presence. From creative direction to brand guidelines, we bring every element together to communicate what sets your business apart, strengthen customer recognition, and create a foundation for long-term growth.",
        items: ["Logo Design", "Brand Identity Development", "Brand Strategy"],
        image: imageFor("branding")!,
        href: "/services/brand",
      },
      {
        id: "design",
        title: "Design",
        tagline: "Create experiences that connect with your audience.",
        description: "We design purposeful visual assets that bring your brand to life across physical and digital channels. From menus, print materials, signage and packaging to social media graphics, merchandise and marketing collateral, we ensure every touchpoint works together to create a consistent brand experience and communicate your business effectively.",
        items: ["Menu Design", "Print Design", "Signage Design", "Packaging Design", "Social Media Design", "Merchandise Design"],
        image: imageFor("design")!,
        href: "/services/brand",
      },
      {
        id: "content",
        title: "Content",
        tagline: "Tell your story in ways that move people.",
        description: "We plan and produce content that helps your business attract the right audience, communicate its value, and encourage meaningful action. From website copy and social content to ad creatives, campaigns, and launch materials, we create content tailored to support greater visibility, customer acquisition, and conversion.",
        items: ["Content Strategy", "Photography", "Videography", "Short-Form Video"],
        image: imageFor("content")!,
        href: "/services/content",
      },
      {
        id: "seo",
        title: "SEO",
        tagline: "Stay visible wherever people search for answers.",
        description: "We improve your online visibility through technical SEO, search-focused content, authority building, and local optimisation. By strengthening your digital presence across search engines and AI platforms, we help attract relevant traffic, generate qualified leads, and convert search opportunities into measurable business growth.",
        items: ["Local SEO", "AI SEO / AIO", "Generative Engine Optimisation (GEO)"],
        image: imageFor("seo")!,
        href: "/services/performance",
      },
      {
        id: "paid-ads",
        title: "Paid Ads",
        tagline: "Reach further without losing sight of returns.",
        description: "We create and manage targeted advertising campaigns across Google and social platforms to reach the right audiences and generate conversions. From campaign setup and creative testing to retargeting and conversion tracking, we optimise performance and keep your advertising spend aligned with business goals.",
        items: ["Google Ads", "Meta Ads"],
        image: imageFor("paid-ads")!,
        href: "/services/performance",
      },
    ],
    more: [
      {
        id: "social",
        title: "Social Media Marketing",
        tagline: "Build relationships beyond the scroll.",
        description: "We manage your social presence through platform-specific content, consistent publishing, and purposeful campaigns. From content planning to community interaction and performance reporting, we help your business build meaningful connections, strengthen brand visibility, and turn audience engagement into growth opportunities.",
        image: imageFor("social"),
        href: "/services/content",
      },
      {
        id: "web",
        title: "Web Development",
        tagline: "Make every website visit count.",
        description: "We develop responsive, user-focused websites that make it easier for customers to explore your business and take action. From intuitive user journeys and CMS integration to performance optimisation and smoother enquiry functionality, we build websites that support your wider marketing efforts and drive conversions.",
        image: imageFor("web"),
        href: "/services/performance",
      },
      {
        id: "crm",
        title: "CRM",
        tagline: "Create more value from customer relationships.",
        description: "We help organise your customer data, streamline lead management, and create more effective follow-ups & nurturing workflows. Through channel integrations, customer segmentation, and marketing automation, we help your business convert more opportunities, strengthen customer relationships, and improve retention.",
        image: imageFor("crm"),
        href: "/services/performance",
      },
      {
        id: "nfc",
        title: "NFC Smart Cards",
        tagline: "Simplify how your business connects.",
        description: "Experience a convenient, reusable way to share your details without relying on printed materials. Our NFC Smart Cards let you share contact details, websites, social profiles, and other key information instantly, whether you're networking, interacting with customers, or using them for everyday business.",
        image: imageFor("nfc"),
        href: "/enquire-now",
      },
    ],
    cta: home.ctas.enquire,
  },
  process: {
    heading: "How Our Growth Agency Works With Newcastle Businesses",
    lead: "RestoRefine follows its five-step RESTO process to plan and deliver marketing work for Newcastle businesses. As a marketing agency serving Newcastle, we move from initial business needs through strategy and delivery to performance tracking and ongoing improvements.",
    steps: [
      {
        number: "01",
        title: "Reach Out",
        description: "Contact RestoRefine through our enquiry form or WhatsApp to share your business goals, current marketing challenges and the results you want to achieve. We'll review your needs and agree on the next step.",
      },
      {
        number: "02",
        title: "Evaluate",
        description: "We review your brand, website, marketing channels, customer journey and current performance tracking to identify gaps. For Newcastle-focused projects, we also assess relevant competitors and target geography where these affect your commercial goals.",
      },
      {
        number: "03",
        title: "Strategize",
        description: "We set measurable goals, identify priority audiences and assign clear roles to the selected marketing channels. Depending on your business objectives, the strategy may focus on Newcastle, the wider North East or broader UK markets.",
      },
      {
        number: "04",
        title: "Transform",
        description: "We bring the plan to life, delivering the agreed work, whether branding, websites, content or marketing, with care, creativity and attention to detail.",
      },
      {
        number: "05",
        title: "Optimize",
        description: "We track performance, report on results and test opportunities for improvement. These findings guide changes to campaigns, content and other marketing activities based on agreed commercial goals.",
      },
    ],
    cta: home.ctas.enquire,
  },
  reviewsCta: { label: "Chat on WhatsApp", href: home.ctas.whatsapp.href },
  whyChoose: {
    ...home.whyChoose,
    heading: "Why Choose RestoRefine as Your Growth Marketing Agency in Newcastle",
    body: "Choosing the right marketing agency means finding a partner who understands how your business should grow. RestoRefine serves Newcastle businesses with a connected approach to strategy and execution, combining clear communication with accountable decision-making to keep marketing activity aligned with your priorities.",
    items: [
      {
        id: "roi",
        title: "ROI-Focused Marketing",
        description: "We focus on marketing activity that contributes to meaningful business outcomes, from enquiries and bookings to sales, customer acquisition and revenue. This keeps performance evaluation centred on commercial value rather than vanity metrics alone.",
      },
      {
        id: "connected-growth-systems",
        title: "Connected Growth Systems",
        description: "We bring different disciplines of marketing together under a shared commercial direction. This creates greater consistency across customer touchpoints, reduces disconnected activity, and helps each part of the business contribute to sustainable growth.",
      },
      {
        id: "founder-led",
        title: "Founder-Led Projects",
        description: "Your project benefits from direct founders’ involvement and senior-level input throughout the engagement. This keeps strategic decisions close to execution and provides a clear point of accountability as your marketing priorities evolve.",
      },
      {
        id: "response",
        title: "Response Within Minutes",
        description: "RestoRefine aims to respond to enquiries within minutes, helping Newcastle businesses start conversations without unnecessary delays. We maintain direct communication and provide updates as projects progress.",
      },
      {
        id: "rating",
        title: "5-Star Google Rating",
        description: "Our Google reviews provide independent feedback on the experience of working with RestoRefine. This third-party recognition offers prospective clients added confidence in our service, communication, and delivery.",
      },
      {
        id: "case-studies",
        title: "Real Client Case Studies",
        description: "Explore genuine client projects to understand our approach, the work delivered, and the outcomes achieved where documented. These examples provide practical insight into how we take on business challenges and support growth across different projects.",
      },
      {
        id: "reporting",
        title: "Transparent Reporting",
        description: "We provide clear insight into marketing activity, performance, and progress towards business objectives. This helps you understand what is working, where improvements may be required, and which priorities should guide future decisions.",
      },
    ],
    closing: "",
  },
  industries: {
    heading: "Industries We Serve in Newcastle",
    body: "Different industries face different challenges when attracting customers, communicating value and driving business growth. RestoRefine serves Newcastle businesses with marketing strategies shaped around their audiences, commercial priorities and customer journeys, bringing the right creative and digital activities together to support their goals.",
    items: [
      {
        title: "Hospitality & Restaurants",
        description: "For restaurants, cafés, bars and hospitality venues in Newcastle, the customer experience begins with how people discover and perceive the business. We connect brand identity, menus, signage, photography, local search, websites and social content to showcase the venue, communicate its appeal and encourage customer visits and bookings.",
        image: home.industries.items[0].image,
      },
      {
        title: "Sport & Leisure",
        description: "For businesses serving fitness, recreation and leisure audiences across Newcastle, attracting new participants is only part of the challenge. We connect brand positioning, promotional campaigns, engaging content, and booking journeys to help operators communicate their offerings, generate interest and encourage repeat participation.",
        image: home.industries.items[1].image,
      },
      {
        title: "Lifestyle Brands",
        description: "For Newcastle's product-led businesses and emerging lifestyle brands, building a recognisable identity is essential to competing for customer attention. We combine brand development, creative digital experiences, social media and customer acquisition campaigns to strengthen product appeal, support online sales and build meaningful customer relationships",
        image: home.industries.items[2].image,
      },
      {
        title: "Professional Services",
        description: "Newcastle’s professional-service businesses need to communicate specialist expertise and build confidence before potential clients make contact. We connect brand positioning, website experiences, search visibility and relevant content to make complex services easier to understand, establish credibility and encourage valuable enquiries.",
        image: home.industries.items[3].image,
      },
    ],
  },
  businesses: {
    heading: "Businesses We Work With in Newcastle",
    body: "Businesses need different kinds of marketing support depending on where they are in their growth journey. Whether launching a new venture, building on existing momentum or strengthening an established operation, RestoRefine works with Newcastle businesses to align their marketing with their current priorities and future ambitions.",
    items: [
      {
        title: "New Businesses",
        description: "Starting a business in Newcastle means establishing a clear identity and the foundations for customer acquisition. We bring branding, website development, content and initial marketing activity together so new businesses can introduce themselves consistently, reach their intended audiences and create a strong starting point for growth.",
      },
      {
        title: "Growing Businesses",
        description: "As businesses expand, maintaining visibility and generating consistent enquiries often requires more coordinated marketing. We support growing Newcastle businesses with stronger search presence, customer acquisition campaigns, connected channels and additional specialist capacity to sustain momentum and reach new opportunities.",
      },
      {
        title: "Established Businesses",
        description: "Established businesses may need to adapt their marketing as customer expectations, commercial priorities, and growth ambitions change. Whether considering a brand repositioning, a better website, new campaigns, entry into new markets or more effective marketing systems, we help align activity with their next stage of development.",
      },
    ],
  },
  resources: {
    ...home.resources,
    heading: "Growth And Marketing Resources",
    body: "Review answers to common marketing questions, RestoRefine articles and verified client projects to support your decision when choosing a marketing agency serving Newcastle.",
  },
  faqs: {
    heading: "FAQ",
    items: [
      {
        question: "How Much Does a Marketing Agency in Newcastle Cost?",
        answer: [
          "There is no single fixed cost for hiring a marketing agency in Newcastle. Pricing depends on the services required, project scope, complexity, and whether you need one-off work or ongoing support. Paid advertising budgets are also considered separately where applicable. The best approach is to establish your priorities and agree on a scope that fits your business needs and budget.",
        ],
      },
      {
        question: "How Is a Growth Marketing Agency Different From a Digital Marketing Agency in Newcastle?",
        answer: [
          "Digital marketing agencies generally focus on promoting a business through online channels such as search, social media and paid advertising. Growth marketing agencies take a broader approach to connecting customer acquisition, conversion, retention, and lifetime value through strategy, experimentation, and performance measurement. The distinction is in how marketing activities are aligned with wider business growth objectives.",
        ],
      },
      {
        question: "Can a Marketing Agency Work With an Existing In-House Marketing Team?",
        answer: [
          "Yes. A marketing agency can complement your existing team by providing specialist expertise, additional delivery capacity or support with specific projects. This might include SEO, paid campaigns, content production, website development, or CRM. The arrangement can be tailored to your team's existing skills and workload.",
        ],
      },
      {
        question: "When Should a Newcastle Business Hire a Marketing Agency?",
        answer: [
          "You should consider working with a marketing agency when your business struggles to generate consistent enquiries, marketing activities lack coordination, or performance is difficult to measure. You may also need external support when your website is not converting effectively, internal resources are stretched, or several marketing functions require specialist attention.",
        ],
      },
      {
        question: "What Should a Newcastle Business Look for When Choosing a Marketing Agency?",
        answer: [
          "Look for an agency that understands your commercial objectives and can demonstrate relevant expertise. Review its service capabilities, genuine case studies, client feedback, approach to performance measurement and communication. It is also worth understanding who will oversee your work and how marketing decisions will connect to your business goals.",
        ],
      },
      {
        question: "Does RestoRefine Work With Businesses Outside Glasgow?",
        answer: [
          "Yes. Although RestoRefine is based in Glasgow, we work with businesses in Newcastle and across the wider UK. Our approach combines clear communication, collaborative planning and connected marketing activities without requiring clients to be based near our studio.",
        ],
      },
      {
        question: "How Long Does It Take to See Results From Marketing?",
        answer: [
          "The timeframe depends on your objectives, starting position, chosen channels and level of competition. Paid campaigns may generate early activity, while SEO, brand development and customer retention strategies generally require more sustained effort. We focus on setting realistic priorities, monitoring performance and making informed improvements over time.",
        ],
      },
    ],
  },
  finalCta: {
    ...home.finalCta,
    heading: "Start Growing Your Business With RestoRefine",
    accent: "Growing",
    body: "RestoRefine works with Newcastle businesses to connect marketing strategy with delivery based on their commercial goals. Tell us about your current challenges, business stage and intended outcome so we can discuss the marketing support your business needs. Let's discuss how we can move your business forward.",
    headingAsH2: true,
    ctas: home.ctas,
  },
};

/** Sections that only location pages have */
export const newcastleExtras: LocationExtras = {
  challenges: {
    heading: "Growth Marketing Challenges Newcastle Businesses Face",
    body: "Growing a business in Newcastle takes more than simply being visible online. From struggling to reach the right audience while generating consistent enquiries to managing disconnected marketing activities, many businesses face challenges that limit their growth as well as blind them to opportunities.",
    items: [
      {
        title: "Unclear Marketing Performance",
        description: "Marketing activities can often run without clear KPIs, reliable channel attribution, or proper lead and conversion tracking. This makes it difficult to understand what's working, where enquiries are coming from, and whether marketing budgets are generating meaningful returns.",
      },
      {
        title: "Wasted Marketing Spend",
        description: "Marketing budgets can be spent across paid & organic activities without delivering a clear commercial return. Poor audience targeting, ineffective campaign setup, weak tracking, and misaligned channel priorities can make it difficult to justify marketing costs or understand whether the investment is generating valuable business opportunities.",
      },
      {
        title: "Fragmented Marketing Across Channels",
        description: "SEO, paid advertising, social media, content, branding, and website activity can often be managed without a consistent commercial direction. This can lead to conflicting messages, inconsistent execution, and duplicated effort, making it harder to maintain a coherent brand presence and achieve meaningful results across channels.",
      },
      {
        title: "Competing for Customer Attention",
        description: "Businesses in Newcastle face competition for the attention of audiences who have many similar brands, products, and services to choose from. Without clear positioning, strong visibility, relevant creative, and consistent customer acquisition, it can be difficult to stand out, communicate value, and attract the right customers.",
      },
      {
        title: "Limited In-House Marketing Capacity",
        description: "Managing strategy, creative, search, paid campaigns, websites, content, CRM, and performance measurement requires a broad range of skills and ongoing attention. For businesses with limited internal capacity, keeping all these activities coordinated can stretch existing teams, create gaps in execution, and make marketing harder to sustain.",
      },
      {
        title: "Adapting to AI Search Changes",
        description: "As search evolves beyond traditional search engines to AI-generated recommendations, businesses that rely on outdated search approaches may struggle to maintain visibility across these changing discovery channels, particularly when their content, online authority, and search presence do not clearly communicate their expertise and relevance.",
      },
    ],
  },
  benefits: {
    heading: "Benefits of Growth Marketing for Newcastle Businesses",
    body: "Rather than isolating them, a connected growth marketing approach aligns strategy, creative, and digital channels around clear business objectives. For Newcastle businesses, this means taking a more coordinated approach to attracting potential customers, converting interest into enquiries and building lasting customer relationships.",
    items: [
      {
        title: "Improve Marketing ROI",
        description: "Understanding which activities lead to enquiries, bookings, sales and revenue makes marketing investment more accountable. Clear tracking and channel decisions help businesses assess performance, prioritise budgets and focus on activities with stronger commercial potential.",
      },
      {
        title: "Use Marketing Budgets More Efficiently",
        description: "Testing and measuring marketing activity helps identify which channels and campaigns perform best. This allows businesses to prioritise stronger-performing activities and allocate budgets more effectively instead of treating every channel equally.",
      },
      {
        title: "Generate Higher-Quality Leads",
        description: "Stronger targeting, clear positioning, and relevant content help attract prospects whose needs and intent are better aligned with a business's offerings. This creates more opportunities to engage potential prospects and convert them into paying customers.",
      },
      {
        title: "Increase Customer Retention",
        description: "Consistent communication, timely follow-ups, and relevant content help businesses maintain relationships beyond the initial sale. CRM linked with ongoing engagement makes it easier to understand customers and encourage repeat business with them.",
      },
      {
        title: "Increase Customer Lifetime Value",
        description: "Ongoing engagement and meaningful connections with customers throughout their journey create more opportunities for repeat purchases and continued business. This can encourage loyalty and increase the long-term value of each customer.",
      },
      {
        title: "Reach New Audiences",
        description: "Search, paid media, social campaigns, content and websites can help Newcastle businesses reach customers beyond their existing audience or geographic market. Depending on commercial goals, this may include targeting new customer segments, other areas of the North East or wider UK markets.",
      },
    ],
    cta: home.ctas.enquire,
  },
  knowAbout: {
    heading: "Know About Newcastle",
    body: "Newcastle upon Tyne brings together a diverse business community, from professional services & established organisations in the city centre to hospitality & riverside businesses along the Quayside and independent creative & digital ventures around Ouseburn. With strengths spanning technology, life sciences, corporate services and creative industries, the city offers a varied commercial landscape where businesses need to stand out, reach the right audiences and build lasting customer relationships. RestoRefine serves Newcastle businesses with connected marketing strategies designed around these different commercial needs.",
    places: [
      { name: "City Centre", lat: 54.9738, lon: -1.6131, label: "left" },
      { name: "Quayside", lat: 54.9686, lon: -1.604, label: "bottom" },
      { name: "Ouseburn", lat: 54.9748, lon: -1.593, label: "right" },
    ],
    boundary: "Newcastle",
  },
  area: { name: "Newcastle", type: "City" as const },
};
