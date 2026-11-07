/**
 * Glasgow location page content (/growth-marketing-agency-glasgow).
 *
 * Same shape as the London and Manchester pages: the homepage content with the
 * copy overridden, plus the location-only extras. Copy is from "Glasgow Content.md".
 */

import { homeContent } from "@/lib/homepageData";
import type { LocationExtras } from "@/lib/locations/london";

const BASE_URL = "https://www.restorefine.co.uk";
const home = homeContent;

/** Keeps a homepage image by service id, so Glasgow only overrides the copy */
const imageFor = (id: string) => [...home.services.core, ...home.services.more].find((s) => s.id === id)?.image ?? null;

export const glasgowContent = {
  ...home,
  meta: {
    title: "Growth Marketing Agency Glasgow | RestoRefine",
    description: "RestoRefine is a Glasgow growth marketing agency helping local businesses with branding, websites, SEO, paid ads, content and CRM, replying within minutes.",
    canonical: `${BASE_URL}/growth-marketing-agency-glasgow`,
  },
  hero: {
    heading: "Growth Marketing Agency Glasgow",
    accent: "Growth",
    body: "RestoRefine is a Glasgow-based growth marketing agency connecting brand strategy, content, website development, SEO, paid media, social media and CRM around business growth goals. From our Glasgow studio, we work with local businesses to reach relevant audiences, generate enquiries and improve customer acquisition.",
    more: "Whether your business needs one service or several connected activities, we develop an approach based on your commercial priorities, current marketing performance and customer journey.",
    badges: ["studio", "rating", "work"],
  },
  services: {
    heading: "Growth Marketing Services We Provide in Glasgow",
    body: "From brand positioning and content creation to SEO, paid campaigns, website optimisation and CRM automation, we help Glasgow businesses attract, convert and retain customers. Whether you need one service or a connected mix of disciplines, we tailor the approach to your business goals, customer journey and growth opportunities.",
    core: [
      {
        id: "branding",
        title: "Branding",
        tagline: "Turn what sets you apart into your identity.",
        description: "We shape your positioning, messaging, visual identity, and creative direction to give your business a clear, consistent presence across customer touchpoints, helping you communicate your value, stand apart from competitors, and build stronger connections with the customers you want to reach.",
        items: ["Logo Design", "Brand Identity Development", "Brand Strategy"],
        image: imageFor("branding")!,
        href: "/services/brand",
      },
      {
        id: "design",
        title: "Design",
        tagline: "Keep your brand consistent across customer touchpoints.",
        description: "We design menus, brochures, flyers, signage, packaging, social media graphics, and branded merchandise that bring your identity into everyday customer interactions. Each asset balances brand consistency with its purpose, helping your business communicate clearly and create a recognisable experience across physical and digital spaces.",
        items: ["Menu Design", "Print Design", "Signage Design", "Packaging Design", "Social Media Design", "Merchandise Design"],
        image: imageFor("design")!,
        href: "/services/brand",
      },
      {
        id: "content",
        title: "Content",
        tagline: "Content that supports enquiries and sales.",
        description: "We plan and create website copy, campaign messaging, social media content and launch materials that speak to your audience and support your business goals. From building brand awareness to answering customer questions and driving enquiries, every piece has a clear role in moving customers closer to action.",
        items: ["Content Strategy", "Photography", "Videography", "Short-Form Video"],
        image: imageFor("content")!,
        href: "/services/content",
      },
      {
        id: "seo",
        title: "SEO",
        tagline: "Stay discoverable as search evolves.",
        description: "We improve your visibility across traditional search engines, local results, and AI-driven search through technical SEO, content optimisation, authority building, and Google Business Profile management. By connecting search performance with tracking and conversion insights, we help turn relevant traffic into enquiries and customers.",
        items: ["Local SEO", "AI SEO / AIO", "Generative Engine Optimisation (GEO)"],
        image: imageFor("seo")!,
        href: "/services/performance",
      },
      {
        id: "paid-ads",
        title: "Paid Ads",
        tagline: "Put precision behind your promotion.",
        description: "We plan and manage Google & Meta ad campaigns, from audience targeting and ad creative to retargeting, A/B testing, and conversion tracking. By aligning campaigns with relevant landing pages and your CRM, we help you measure lead quality, assess acquisition costs, and make informed decisions about your spend.",
        items: ["Google Ads", "Meta Ads"],
        image: imageFor("paid-ads")!,
        href: "/services/performance",
      },
    ],
    more: [
      {
        id: "social",
        title: "Social Media Marketing",
        tagline: "Give every platform a clear purpose.",
        description: "We plan content calendars, create platform-specific posts, schedule publishing, manage community interactions, and run social campaigns across relevant channels. Through performance tracking, we identify what resonates with your audience and refine your social activity to support brand awareness, website traffic, and customer acquisition.",
        image: imageFor("social"),
        href: "/services/content",
      },
      {
        id: "web",
        title: "Web Development",
        tagline: "Build the bridge between discovery and conversion.",
        description: "We develop responsive, CMS-driven websites that bring your brand, content and customer journey together. From optimised page layout and mobile performance to intuitive navigation and booking flows, we design each element to help visitors find relevant information, assess your services and make an enquiry.",
        image: imageFor("web"),
        href: "/services/performance",
      },
      {
        id: "crm",
        title: "CRM",
        tagline: "Move every lead towards the next step.",
        description: "We organise customer records, segment contacts, track enquiries, and automate follow-up emails, lead nurturing, and retention campaigns. By linking CRM data with your website and marketing channels, we help your team respond faster, identify promising leads, reduce missed follow-ups, and encourage repeat purchases.",
        image: imageFor("crm"),
        href: "/services/performance",
      },
      {
        id: "nfc",
        title: "NFC Smart Cards",
        tagline: "Turn a simple tap into a new connection.",
        description: "Share your contact details, business profile, and relevant links with a tap. RestoRefine’s NFC smart cards offer a reusable alternative to paper business cards, giving prospects and networking contacts an easy way to save your information, explore your services, and get in touch later.",
        image: imageFor("nfc"),
        href: "/enquire-now",
      },
    ],
    cta: home.ctas.enquire,
  },
  process: {
    heading: "How Our Growth Agency Works With Glasgow Businesses",
    lead: "Our approach is as simple as RESTO: a five-step process that takes you from the first conversation through strategy, delivery and performance tracking, keeping your business goals at the centre of every step.",
    steps: [
      {
        number: "01",
        title: "Reach Out",
        description: "Contact RestoRefine through our enquiry form or WhatsApp to share your business goals, current marketing challenges and the results you want to achieve. We'll discuss your priorities and agree on the next step.",
      },
      {
        number: "02",
        title: "Evaluate",
        description: "We assess where your brand stands today, how your website and marketing are performing, and where there’s room to grow. For Glasgow-focused projects, this can include relevant local search competition, customer demand and the wider market context.",
      },
      {
        number: "03",
        title: "Strategize",
        description: "We build a tailored plan around measurable goals, prioritising the right services, business outcomes and customers. For businesses targeting Glasgow, we consider relevant audience needs and market conditions to shape priorities and next steps.",
      },
      {
        number: "04",
        title: "Transform",
        description: "We bring the plan to life, delivering the agreed work, whether branding, websites, content or marketing, with care, creativity and attention to detail.",
      },
      {
        number: "05",
        title: "Optimize",
        description: "We track results and review performance to understand what’s working, identify what can improve, and refine our approach, helping you make more of your marketing investment.",
      },
    ],
    cta: home.ctas.enquire,
  },
  reviewsCta: { label: "Chat on WhatsApp", href: home.ctas.whatsapp.href },
  whyChoose: {
    ...home.whyChoose,
    heading: "Why Choose RestoRefine as Your Growth Marketing Agency in Glasgow",
    body: "Your choice of growth marketing agency can shape how effectively your business attracts customers and grows. Based in Glasgow, RestoRefine combines local insight with a collaborative approach and direct access to the people managing your marketing, with a focus on clear priorities, measurable outcomes, and your business goals.",
    items: [
      {
        id: "glasgow-based-studio",
        title: "Glasgow-Based Studio",
        description: "With our studio based in Glasgow, we're part of the local business community, not an agency operating at a distance. You can connect directly with our team, discuss your goals, and build a working relationship close to home.",
      },
      {
        id: "roi",
        title: "ROI-Focused Marketing",
        description: "We align marketing activity with the business outcomes that matter to you, from qualified enquiries and bookings to sales and customer acquisition. Rather than focusing on traffic or engagement alone, we measure progress against meaningful commercial goals.",
      },
      {
        id: "connected-growth-systems",
        title: "Connected Growth Systems",
        description: "RestoRefine connects branding, marketing channels, websites and CRM to create a consistent customer journey. This coordinated approach helps businesses reduce gaps between attracting potential customers, handling enquiries and encouraging repeat business.",
      },
      {
        id: "founder-led",
        title: "Founder-Led Projects",
        description: "Your projects benefit from direct involvement from our founders, bringing senior-level input to strategic decisions and key stages of delivery. This keeps priorities clear, communication direct, and decisions closely aligned with your business goals.",
      },
      {
        id: "response",
        title: "Response Within Minutes",
        description: "RestoRefine aims to respond to enquiries within minutes, helping Glasgow businesses start conversations without unnecessary delays. We maintain direct communication and provide clear updates as projects progress.",
      },
      {
        id: "rating",
        title: "5-Star Google Rating",
        description: "Our 5-star Google rating reflects the positive experiences shared by the clients we have worked with and offers independent reassurance about the quality of our work and the relationships we build",
      },
      {
        id: "case-studies",
        title: "Real Client Case Studies",
        description: "Explore our client case studies to see how we've approached real business challenges, delivered marketing projects, and supported growth. Where available, we also share verified results to give you a clearer picture of our work and its impact.",
      },
      {
        id: "reporting",
        title: "Transparent Reporting",
        description: "Get clear updates on work delivered, marketing performance and priorities for improvement. Our reporting shows how activities contribute to agreed business goals and where future attention is needed.",
      },
    ],
    closing: "",
  },
  industries: {
    heading: "Industries We Serve in Glasgow",
    body: "Glasgow businesses serve customers with different needs, expectations, and reasons to buy. RestoRefine connects the right marketing activities to each industry's customer journey, helping businesses build recognition, attract relevant audiences and turn interest into commercial opportunities.",
    items: [
      {
        title: "Hospitality & Restaurants",
        description: "For Glasgow restaurants, cafés, bars and hospitality venues, attracting customers starts long before they walk through the door. We bring together visual identity, menus, signage, food photography, local search, websites and social content to showcase the experience, communicate what makes each venue appealing and encourage more visits and bookings.",
        image: home.industries.items[0].image,
      },
      {
        title: "Sport & Leisure",
        description: "Gyms, fitness studios, sports clubs and leisure venues need to turn local interest into memberships, bookings and regular participation. We connect brand positioning, promotional campaigns, launch content and booking experiences to help businesses attract new customers, fill sessions and maintain engagement beyond the initial sign-up.",
        image: home.industries.items[1].image,
      },
      {
        title: "Lifestyle Brands",
        description: "Glasgow's independent and founder-led lifestyle brands need a recognisable identity and a clear reason for customers to choose their products. We connect brand development, product content, digital experiences and targeted campaigns to strengthen product appeal, support online purchases and build a returning customer base.",
        image: home.industries.items[2].image,
      },
      {
        title: "Professional Services",
        description: "For Glasgow consultancies and professional-service firms, winning new business often depends on demonstrating expertise and establishing trust before the first conversation. We combine brand positioning, website content, search visibility and lead generation to communicate specialist value, reach relevant prospects and generate qualified leads.",
        image: home.industries.items[3].image,
      },
    ],
  },
  businesses: {
    heading: "Businesses We Work With in Glasgow",
    body: "Every business reaches a point where its marketing needs something different. RestoRefine works with Glasgow businesses at different stages, adapting its approach to the challenges of launching, scaling and strengthening their market position.",
    items: [
      {
        title: "New Businesses",
        description: "Starting a business in Glasgow means getting the foundations right before taking your offer to market. We bring branding, website development, content and launch marketing together to help you establish a clear identity, reach your first customers and communicate what you offer.",
      },
      {
        title: "Growing Businesses",
        description: "For businesses already operating in Glasgow, the next challenge is often reaching more customers while keeping marketing consistent. We help strengthen search visibility, improve customer acquisition and campaign consistency while providing additional specialist support as your business expands.",
      },
      {
        title: "Established Businesses",
        description: "Established businesses often need to evolve beyond the marketing that got them where they are today. Whether repositioning the brand, improving an existing website, exploring new campaigns or strengthening marketing systems, we help create room for the next phase of commercial growth.",
      },
    ],
  },
  resources: {
    ...home.resources,
    heading: "Growth And Marketing Resources",
    body: "Review RestoRefine's articles, answers to common growth marketing questions and verified client work to support your decision when choosing a Glasgow growth marketing agency.",
  },
  faqs: {
    heading: "FAQ",
    items: [
      {
        question: "How Much Does a Growth Marketing Agency in Glasgow Cost?",
        answer: [
          "There is no single fixed price, as costs depend on the services required, project scope, and complexity. One-off projects such as branding or website development differ from ongoing support covering SEO, paid campaigns, content and CRM. Your budget will depend on the level of involvement and the outcomes you're working towards.",
        ],
      },
      {
        question: "How Is a Growth Marketing Agency Different From a Digital Marketing Agency in Glasgow?",
        answer: [
          "A digital marketing agency typically focuses on executing certain marketing activities across online channels, while growth marketing considers the wider customer journey. This includes attracting customers, improving conversions, encouraging repeat business, and measuring how each activity contributes to commercial growth. The two approaches can overlap, depending on how an agency structures its work.",
        ],
      },
      {
        question: "Can a Growth Marketing Agency Work With an Existing In-House Marketing Team?",
        answer: [
          "Yes. A growth marketing agency can complement your internal team by providing additional specialist expertise and execution capacity. This might include support with SEO, creative production, paid campaigns, website improvements, or CRM, allowing your team to focus on wider marketing priorities.",
        ],
      },
      {
        question: "When Should a Glasgow Business Hire a Growth Marketing Agency?",
        answer: [
          "You should consider working with one when your marketing channels feel disconnected, customer acquisition becomes difficult to scale, or you cannot clearly identify which activities generate enquiries and sales. It can also help when your internal team lacks the capacity, coordination, or the specialist skills to manage multiple growth priorities.",
        ],
      },
      {
        question: "What Should a Glasgow Business Look for When Choosing a Growth Marketing Agency?",
        answer: [
          "Look for an agency with relevant market knowledge, suitable service capabilities, and genuine case studies that demonstrate its work. Check client reviews, how it measures commercial performance, who manages delivery, how communication works, and whether its pricing structure fits your requirements. Agree on responsibilities and reporting expectations before work begins.",
        ],
      },
      {
        question: "Does My Business Need Every Growth Marketing Service?",
        answer: [
          "No. The right combination depends on your business stage, existing marketing activity, and commercial priorities. Some businesses may need stronger branding or a better website, while others may benefit more from SEO, paid campaigns, content, or CRM improvements.",
        ],
      },
    ],
  },
  finalCta: {
    ...home.finalCta,
    heading: "Start Growing Your Business With RestoRefine",
    accent: "Growing",
    body: "Ready to take your Glasgow business further? From our Glasgow studio, we bring the right parts of your marketing together around your business goals. Tell us where your business is today, what challenges you're facing, and what you want to achieve. Let's discuss how we can help you move forward.",
    headingAsH2: true,
    ctas: home.ctas,
  },
};

/** Sections that only location pages have */
export const glasgowExtras: LocationExtras = {
  challenges: {
    heading: "Growth Marketing Challenges Glasgow Businesses Face",
    body: "Glasgow businesses may compete for attention across search results, social media and paid advertising, but visibility alone does not guarantee enquiries or sales. Weak local search presence, inconsistent brand messaging, underperforming landing pages and disconnected lead follow-ups can also leave marketing opportunities untapped.",
    items: [
      {
        title: "Pressure on Marketing Budgets",
        description: "Increasing operating costs can leave Glasgow businesses with less room to invest in customer acquisition, brand development and campaign testing. When returns are difficult to trace, money spent on ads, content or promotions may fail to generate enough qualified enquiries and sales to justify the expense.",
      },
      {
        title: "Outdated or Low-Converting Websites",
        description: "An outdated website can undermine trust when its design, messaging, or content no longer reflects the business. Slow pages, confusing navigation, and difficult enquiry journeys can cause potential customers to leave without taking action, wasting traffic generated through search, social media, and paid campaigns.",
      },
      {
        title: "Unclear Marketing Performance",
        description: "Without knowing which campaigns generate paying customers, businesses may continue focusing on ads that produce clicks but few qualified enquiries while cutting channels that deliver stronger sales. This can inflate customer acquisition costs, leave sales targets unmet, and make monthly revenue harder to forecast.",
      },
      {
        title: "Fragmented Marketing Across Channels",
        description: "When SEO, paid ads, social media, branding, and website content operate independently, businesses risk duplicating campaigns, sending inconsistent messages, and losing potential customers between touchpoints. This disconnect can weaken brand recognition, create gaps in the customer journey, and reduce the return on marketing investment.",
      },
      {
        title: "Limited In-House Marketing Capacity",
        description: "For businesses with small marketing teams, managing multiple channels and tracking their performance can pull time away from daily operations. This can leave campaigns inconsistent, website improvements delayed, and leads without timely follow-up, costing the business potential sales and growth opportunities.",
      },
      {
        title: "Adapting to AI Search Changes",
        description: "As search evolves, Glasgow businesses need to remain visible across traditional search results and AI-assisted discovery. Keeping up with these changes can be challenging, particularly when businesses need to maintain established SEO performance while adapting their content and website to new search behaviours.",
      },
    ],
  },
  benefits: {
    heading: "Benefits of Growth Marketing for Glasgow Businesses",
    body: "A connected growth strategy helps Glasgow businesses attract attention, convert interest and build customer relationships. Rather than treating each channel in isolation, growth marketing combines the right activities to support efficient acquisition, stronger customer value and newer opportunities.",
    items: [
      {
        title: "Improve Marketing ROI",
        description: "Tracking enquiries, bookings, sales, and customer acquisition costs shows which marketing channels contribute to business goals. This helps businesses assess performance, prioritise investment and make informed decisions about future spend.",
      },
      {
        title: "Use Marketing Budgets More Efficiently",
        description: "Measuring channel performance and testing different campaigns helps businesses identify where their budget generates the strongest response. This helps them prioritise effective activity and reduce spend on underperforming channels.",
      },
      {
        title: "Generate Higher-Quality Leads",
        description: "Clear positioning, targeted campaigns, relevant content, and stronger search visibility help businesses reach leads who align with their products or services, allowing businesses more opportunities to convert genuine prospects into paying customers.",
      },
      {
        title: "Reach New Audiences",
        description: "Connecting search, paid media, social, and website activity helps Glasgow businesses reach customers beyond their existing audience, creating opportunities to attract new customer segments, enter different markets, and generate demand.",
      },
      {
        title: "Increase Customer Retention",
        description: "CRM systems, timely follow-ups, relevant content, and ongoing customer communication help businesses stay connected with customers after the first purchase. Consistent engagement can also encourage repeat purchases and strengthen customer relationships.",
      },
      {
        title: "Increase Customer Lifetime Value",
        description: "Repeat purchases and long-term customer relationships allow businesses to generate more revenue from each customer over time. Consistent engagement and relevant offers can encourage customers to return, which reduces reliance on acquiring new customers.",
      },
    ],
    cta: home.ctas.enquire,
  },
  knowAbout: {
    heading: "Know About Glasgow",
    body: "Glasgow's business landscape brings together a busy city-centre commercial district, independent businesses and creative communities. From the retail and professional activity around the City Centre and Merchant City to the hospitality and entertainment scene in Finnieston, businesses compete across different audiences and customer experiences. With our studio based in Glasgow, RestoRefine is directly connected to this local environment and helps businesses strengthen their presence, reach customers, and compete in their markets.",
    places: [
      { name: "City Centre", lat: 55.8611, lon: -4.2526, label: "top" },
      { name: "Merchant City", lat: 55.8588, lon: -4.2443, label: "right" },
      { name: "Finnieston", lat: 55.8655, lon: -4.2869, label: "left" },
    ],
    boundary: "Glasgow",
  },
  area: { name: "Glasgow", type: "City" as const },
};
