/**
 * Scotland location page content (/growth-marketing-agency-scotland).
 *
 * Same shape as the London and Manchester pages: the homepage content with the
 * copy overridden, plus the location-only extras. Copy is from "Scotland Content.md".
 */

import { homeContent } from "@/lib/homepageData";
import type { LocationExtras } from "@/lib/locations/london";

const BASE_URL = "https://www.restorefine.co.uk";
const home = homeContent;

/** Keeps a homepage image by service id, so Scotland only overrides the copy */
const imageFor = (id: string) => [...home.services.core, ...home.services.more].find((s) => s.id === id)?.image ?? null;

export const scotlandContent = {
  ...home,
  meta: {
    title: "Growth Marketing Agency Scotland | RestoRefine",
    description: "RestoRefine is a growth marketing agency serving businesses across Scotland with branding, web, SEO, paid ads, content and CRM, replying within minutes.",
    canonical: `${BASE_URL}/growth-marketing-agency-scotland`,
  },
  hero: {
    heading: "Growth Marketing Agency Scotland",
    accent: "Growth",
    body: "RestoRefine is a Glasgow-based growth marketing agency working with businesses across Scotland. We connect branding, design, content, SEO, paid media, social media, website development and CRM around each business's commercial priorities.",
    more: "Whether a business needs one service or several connected activities, our work focuses on reaching relevant audiences, generating enquiries and creating a more consistent customer journey. The approach depends on the business's goals and existing marketing.",
    badges: ["rating", "work", "roof"],
  },
  services: {
    heading: "Growth Marketing Services We Provide Across Scotland",
    body: "Every business has different growth priorities, from reaching new customers to generating more qualified enquiries. RestoRefine brings together a mix of creative, marketing and digital solutions to help you make more of your marketing investment and achieve measurable business growth.",
    core: [
      {
        id: "branding",
        title: "Branding",
        tagline: "Build a brand customers recognise and trust.",
        description: "We help businesses define what sets them apart through clear positioning, consistent messaging, and a distinctive visual identity. From websites and social media to print materials and customer touchpoints, our creative direction helps build recognition, strengthens trust, and gives customers a consistent experience of your brand.",
        items: ["Logo Design", "Brand Identity Development", "Brand Strategy"],
        image: imageFor("branding")!,
        href: "/services/brand",
      },
      {
        id: "design",
        title: "Design",
        tagline: "Consistency across every customer touchpoint.",
        description: "From menus, print materials and signage to packaging, social media assets and branded merchandise, we create designs that keep your brand consistent across customer touchpoints, so you can present a professional image, create recognition, and deliver a cohesive experience to your customers.",
        items: ["Menu Design", "Print Design", "Signage Design", "Packaging Design", "Social Media Design", "Merchandise Design"],
        image: imageFor("design")!,
        href: "/services/brand",
      },
      {
        id: "content",
        title: "Content",
        tagline: "Turn audience interest into enquiries.",
        description: "We plan and create content for websites, campaigns, advertising, social media and product launches, tailored to each platform and audience, so your business can share the right message in the right format to attract attention, inform potential customers and turn interest into enquiries and sales.",
        items: ["Content Strategy", "Photography", "Videography", "Short-Form Video"],
        image: imageFor("content")!,
        href: "/services/content",
      },
      {
        id: "seo",
        title: "SEO",
        tagline: "Let those who are searching find you.",
        description: "We combine technical SEO, relevant content and authority work to improve visibility across traditional search and AI-driven search experiences. From Google Business Profile optimisation to tracking organic conversions, we connect search efforts to the wider goal of attracting relevant visitors and turning them into customers.",
        items: ["Local SEO", "AI SEO / AIO", "Generative Engine Optimisation (GEO)"],
        image: imageFor("seo")!,
        href: "/services/performance",
      },
      {
        id: "paid-ads",
        title: "Paid Ads",
        tagline: "Turn ads into measurable customer acquisition.",
        description: "We manage Meta and Google Ads campaigns for businesses, combining targeted advertising, retargeting and ongoing testing to reach the right audiences. By tracking conversions and connecting campaigns with relevant systems, we help turn ad clicks into enquiries and sales while making better use of your budget.",
        items: ["Google Ads", "Meta Ads"],
        image: imageFor("paid-ads")!,
        href: "/services/performance",
      },
    ],
    more: [
      {
        id: "social",
        title: "Social Media Marketing",
        tagline: "Grow your business with engagement.",
        description: "We help plan and manage social media for businesses. From content scheduling and platform-specific creative to campaigns, community engagement and performance reporting, we help build brand awareness, connect with potential customers and turn social interactions into meaningful opportunities as part of your wider growth strategy.",
        image: imageFor("social"),
        href: "/services/content",
      },
      {
        id: "web",
        title: "Web Development",
        tagline: "Build your website as a tool for conversions.",
        description: "We build responsive, user-friendly websites for businesses, with thoughtful planning, intuitive navigation, reliable CMS functionality and performance optimisation. From clear enquiry forms to seamless booking journeys, we create websites that attract visitors, improve customer experience and turn more traffic into enquiries & sales.",
        image: imageFor("web"),
        href: "/services/performance",
      },
      {
        id: "crm",
        title: "CRM",
        tagline: "Automate customer data and opportunities.",
        description: "We assist Scottish businesses in organising customer data, managing leads and automating follow-ups through connected CRM systems. From lead segmentation and nurturing to marketing integrations and retention workflows, we help you stay on top of opportunities, build stronger customer relationships and reduce missed enquiries.",
        image: imageFor("crm"),
        href: "/services/performance",
      },
      {
        id: "nfc",
        title: "NFC Smart Cards",
        tagline: "Make it easier to connect with your business.",
        description: "Our NFC Smart Cards let you share your business details and digital profile with a simple tap on a compatible smartphone. Experience a convenient way to exchange contact information, direct customers to your website or social profiles, and make networking easier without relying on paper business cards.",
        image: imageFor("nfc"),
        href: "/enquire-now",
      },
    ],
    cta: home.ctas.enquire,
  },
  process: {
    heading: "How Our Growth Agency Works With Scottish Businesses",
    lead: "Our approach is as simple as RESTO: a five-step process that takes you from the first conversation through strategy, delivery and performance tracking, keeping your business goals at the centre of every step.",
    steps: [
      {
        number: "01",
        title: "Reach Out",
        description: "Contact RestoRefine through the enquiry form or WhatsApp to share your business goals, current challenges and the outcome you want. We’ll review your needs and agree on the next step.",
      },
      {
        number: "02",
        title: "Evaluate",
        description: "We assess where your brand stands today, how your website and marketing are performing, and where there’s room to grow. For Scotland-focused projects, this can include relevant local search competition, customer demand and the wider market context.",
      },
      {
        number: "03",
        title: "Strategize",
        description: "We build a tailored plan around measurable goals, prioritising the right services, business outcomes and customers. For businesses targeting Scotland, we consider relevant audience needs and market conditions to shape priorities and next steps.",
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
    heading: "Why Choose RestoRefine as Your Growth Marketing Agency in Scotland",
    body: "Based in Glasgow and working with businesses across Scotland, RestoRefine combines commercially focused marketing, connected execution and direct communication to help businesses turn marketing investment into measurable progress. From founder-led projects to transparent reporting, here’s what sets us apart as a growth marketing partner.",
    items: [
      {
        id: "roi",
        title: "ROI-Focused Marketing",
        description: "Your marketing should do more than generate clicks and impressions. We focus on outcomes such as qualified enquiries, bookings and sales, helping businesses judge marketing activity by its contribution to commercial goals.",
      },
      {
        id: "connected-growth-systems",
        title: "Connected Growth Systems",
        description: "Marketing works best when each activity supports the next. RestoRefine connects strategy, creative, digital channels, and customer follow-up to help businesses deliver a more consistent customer journey and make their marketing efforts work together.",
      },
      {
        id: "founder-led",
        title: "Founder-Led Projects",
        description: "Work with the people guiding your project, rather than relying on layers of account management. With founder-led involvement, you have direct access to decision-making and a clearer line of communication throughout your project.",
      },
      {
        id: "response",
        title: "Response Within Minutes",
        description: "Whether you have a question or want to share some feedback, a quick response helps keep projects moving. RestoRefine aims to respond to enquiries within minutes, giving businesses a more direct way to start the conversation.",
      },
      {
        id: "rating",
        title: "5-Star Google Rating",
        description: "Choosing a marketing partner means trusting them with your budget and business goals. RestoRefine’s Google reviews offer prospective clients feedback from previous customers to help you assess whether we are the right fit for your business.",
      },
      {
        id: "case-studies",
        title: "Real Client Case Studies",
        description: "Look beyond promises and see examples of work RestoRefine has delivered. Our case studies help prospective clients assess our approach, the services involved, and documented results where available, without relying on generic claims.",
      },
      {
        id: "reporting",
        title: "Transparent Reporting",
        description: "Clear reporting should show what marketing work was delivered, how it performed and what needs attention next. RestoRefine provides clear visibility into work completed, performance, and future priorities, helping you make informed decisions about your marketing.",
      },
    ],
    closing: "",
  },
  industries: {
    heading: "Industries We Serve Across Scotland",
    body: "Different industries face different challenges when attracting customers, building trust, and converting interest into revenue. RestoRefine adapts its creative and growth marketing services to Scottish businesses’ audience, customer journeys, and commercial priorities.",
    items: [
      {
        title: "Hospitality & Restaurants",
        description: "For restaurants, cafés, pubs and hospitality venues in Scotland, attracting diners means standing out locally and giving people a reason to visit. We connect brand presentation, menus, signage, photography, local search and social content to help showcase the experience and encourage bookings and visits.",
        image: home.industries.items[0].image,
      },
      {
        title: "Sport & Leisure",
        description: "Gyms, fitness studios, sports clubs and leisure venues need to attract new participants while giving existing members reasons to return. We support their growth through consistent branding, membership and booking journeys, event promotions and targeted campaigns that turn interest into sign-ups and repeat participation.",
        image: home.industries.items[1].image,
      },
      {
        title: "Lifestyle Brands",
        description: "Lifestyle brands need a recognisable identity and a consistent story across every customer touchpoint. RestoRefine brings together brand design, product-focused content, social campaigns and website experiences to help Scottish brands communicate what makes their products distinctive and move customers from discovery to purchase.",
        image: home.industries.items[2].image,
      },
      {
        title: "Professional Services",
        description: "For Scottish consultancies and professional firms, potential clients often assess credibility before making contact. We connect clear service messaging, professional websites, search visibility and relevant content to help businesses demonstrate their expertise, reach prospective clients and generate qualified enquiries.",
        image: home.industries.items[3].image,
      },
    ],
  },
  businesses: {
    heading: "Businesses We Work With Across Scotland",
    body: "A business preparing to enter the market has different needs from one trying to increase sales or modernise an established operation. RestoRefine adapts its branding, marketing and digital support to where your business stands today and what it needs to achieve next.",
    items: [
      {
        title: "New Businesses",
        description: "Launching a business involves more than choosing a name and getting a website online. We help Scottish startups bring branding, website development, content and launch marketing together, creating a consistent foundation to introduce their business to the right audience.",
      },
      {
        title: "Growing Businesses",
        description: "As a business gains traction, maintaining visibility and attracting newer customers can require more than traditional marketing. We strengthen search visibility, coordinate targeted campaigns, and support ongoing customer acquisition, helping your marketing reach the right people as the business expands.",
      },
      {
        title: "Established Businesses",
        description: "Established businesses in Scotland may have outgrown their original branding, website, or marketing approach as their commercial priorities change. We help identify opportunities to refresh their brand, explore new customer acquisition channels, and build more connected marketing systems to support their next stage.",
      },
    ],
  },
  resources: {
    ...home.resources,
    heading: "Growth And Marketing Resources",
    body: "Access RestoRefine's guidance, client projects and answers to common questions about choosing growth marketing services in Scotland.",
  },
  faqs: {
    heading: "FAQ",
    items: [
      {
        question: "How Much Does a Growth Marketing Agency in Scotland Cost?",
        answer: [
          "There is no universal price for growth marketing services in Scotland. Costs depend on the services you need, the scope and complexity of the work, and whether you require a one-off project or ongoing support. You should request a tailored quote based on your goals, priorities, and budget.",
        ],
      },
      {
        question: "How Is a Growth Marketing Agency Different From a Digital Marketing Agency in Scotland?",
        answer: [
          "Digital marketing agencies typically focus on channels such as SEO, paid advertising, and social media, while growth marketing agencies connect these activities across the wider customer journey. They consider how to attract customers, convert interest into sales, retain existing customers, and measure what contributes to business growth.",
        ],
      },
      {
        question: "Can a Growth Marketing Agency Work With an Existing In-House Marketing Team?",
        answer: [
          "Yes. A growth marketing agency can complement your in-house team with specialist expertise or additional delivery capacity. This may include support with SEO, website development, creative, paid campaigns, or CRM, while your internal team retains ownership of its wider marketing strategy.",
        ],
      },
      {
        question: "When Should a Scottish Business Hire a Growth Marketing Agency?",
        answer: [
          "Consider bringing in an agency when marketing results are inconsistent, customer acquisition has stalled, or your team lacks the specialist capacity to execute its plans. External support can also help when multiple suppliers need coordination, or your business is preparing to enter new markets.",
        ],
      },
      {
        question: "What Should a Scottish Business Look for When Choosing a Growth Marketing Agency?",
        answer: [
          "We advise looking for services that match your goals, relevant case studies, credible client reviews, and reporting tied to commercial outcomes. Before committing, clarify the scope of work, pricing structure, communication arrangements, and how success will be measured. If you plan to reach customers beyond Scotland, check that the agency can support those target markets too.",
        ],
      },
      {
        question: "Can I Hire a Growth Marketing Agency for a One-Off Project?",
        answer: [
          "Yes. Depending on your needs, you may be able to commission a defined project, such as a website redesign, brand refresh, or campaign launch, rather than ongoing marketing support. For continuing growth, ongoing support can help coordinate activities, monitor performance, and refine your approach over time. Confirm the available engagement options and terms with your chosen agency.",
        ],
      },
      {
        question: "How Long Does It Take to See Results From Growth Marketing?",
        answer: [
          "Timelines depend on your goals, starting position, and chosen channels. Paid campaigns may generate initial enquiries relatively quickly, while SEO, brand building, and customer retention initiatives typically require sustained effort. Agree on realistic milestones and performance measures with your agency rather than relying on fixed promises about results.",
        ],
      },
    ],
  },
  finalCta: {
    ...home.finalCta,
    heading: "Start Growing Your Business With RestoRefine",
    accent: "Growing",
    body: "Based in Glasgow and serving businesses across Scotland, we connect the right creative, digital, and marketing support to your commercial priorities. Tell us where your business is today, what’s holding back its growth, and what you want to achieve. Let’s discuss the next steps.",
    headingAsH2: true,
    ctas: home.ctas,
  },
};

/** Sections that only location pages have */
export const scotlandExtras: LocationExtras = {
  challenges: {
    heading: "Growth Marketing Challenges Scottish Businesses Face",
    body: "Businesses in Scotland can struggle to reach customers beyond their local area, stand out against established competitors, and turn their website & social traffic into enquiries. Seasonal demand, fragmented marketing activity, and limited budgets can make it harder to maintain visibility and measure what is driving sales on top of that.",
    items: [
      {
        title: "Pressure on Marketing Budgets",
        description: "For Scottish businesses with tighter budgets, spending across too many channels can leave campaigns underfunded and results difficult to measure. Without clear priorities, it becomes harder to identify which marketing activities are attracting customers and generating enquiries.",
      },
      {
        title: "Difficulty Generating Revenue",
        description: "Strong online visibility for your business does not always translate into enough enquiries, bookings, or sales to sustain growth. Unclear messaging, underperforming websites, poorly targeted campaigns, or inconsistent lead follow-ups can create gaps between attracting potential customers and converting their interest into business.",
      },
      {
        title: "Scaling Beyond Initial Growth",
        description: "For businesses that have built an initial customer base, growing beyond familiar markets and reaching newer ones can become increasingly difficult. When marketing channels operate in isolation or when customer acquisition lacks a consistent approach, generating demand and sustaining growth becomes harder as the business expands.",
      },
      {
        title: "Reaching Customers Beyond Local Markets",
        description: "Reaching customers across Scotland, the wider UK or international markets can require more than relying on local reputation and word of mouth. Without clear positioning and a coordinated approach to SEO, paid advertising, content and website messaging, connecting with audiences in newer markets can be challenging.",
      },
      {
        title: "Limited Digital Marketing Skills",
        description: "Some Scottish businesses may have strong teams but could lack in-house expertise across every area of digital marketing, from SEO and paid advertising to web development and everything in between. Coordinating these specialist activities can be challenging when skills or execution capacity are spread across various roles or providers.",
      },
      {
        title: "Unclear Marketing Priorities",
        description: "Businesses can lose time and budget by spreading marketing efforts across multiple channels without a clear link to their commercial goals. Without defined priorities and reliable tracking, it becomes harder to judge which activities deserve more investment and which need to change.",
      },
    ],
  },
  benefits: {
    heading: "Benefits of Growth Marketing for Scottish Businesses",
    body: "For Scottish businesses looking to win new customers or generate more consistent enquiries, growth marketing connects strategy, creative and digital channels around commercial goals. This helps businesses reach relevant audiences, follow up leads consistently, and identify which marketing activities contribute to sales.",
    items: [
      {
        title: "Improve Marketing ROI",
        description: "Businesses can better assess marketing value when campaigns are measured against outcomes such as qualified enquiries, bookings, and sales, instead of just clicks or impressions. Clear tracking helps show which activities contribute to commercial goals and where effort may need to shift.",
      },
      {
        title: "Reduce Customer Acquisition Costs",
        description: "By refining audience targeting, testing campaigns, and improving conversion journeys, businesses can reduce spend on channels that deliver few meaningful results. Over time, these adjustments may help lower the cost of acquiring customers without compromising lead quality.",
      },
      {
        title: "Increase Customer Retention",
        description: "Consistent communication, relevant content, and timely follow-ups help businesses stay connected with customers beyond the initial sale. Connected CRM and marketing workflows can support repeat purchases, strengthen customer relationships, and encourage long-term growth.",
      },
      {
        title: "Increase Customer Lifetime Value",
        description: "Nurturing customer relationships through relevant communication and continued engagement can encourage repeat purchases and longer-term loyalty for businesses. Generating more value from existing customers can also provide support and proof for newer customer acquisition.",
      },
      {
        title: "Reach New Markets",
        description: "For Scottish businesses ready to expand beyond their current customer base, search visibility, targeted campaigns, relevant content and a strong website can help them reach audiences across Scotland, the wider UK or international markets. The right channel mix depends on the business’s goals, audience and capacity to serve new customers.",
      },
      {
        title: "Respond Faster to Market Changes",
        description: "When customer behaviour or campaign performance shifts, businesses can need timely insights to adjust their marketing priorities. Tracking results and testing different messages, audiences and channels helps identify what is working and where changes may be needed.",
      },
    ],
    cta: home.ctas.enquire,
  },
  knowAbout: {
    heading: "Know about Scotland",
    body: "Scottish businesses may target customers within one local area, across Scotland or throughout the UK. Each target market can require different priorities for local search, audience targeting, brand presentation and customer acquisition. Based in Glasgow and serving businesses across Scotland, RestoRefine connects branding, content, websites and marketing channels with the markets each business wants to reach.",
    places: [
      { name: "Glasgow", lat: 55.8642, lon: -4.2518, label: "left" },
    ],
    boundary: "Scotland",
  },
  area: { name: "Scotland", type: "Country" as const },
};
