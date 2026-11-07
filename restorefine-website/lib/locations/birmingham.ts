/**
 * Birmingham location page content (/growth-marketing-agency-birmingham).
 *
 * Same shape as the London and Manchester pages: the homepage content with the
 * copy overridden, plus the location-only extras. Copy is from "Birmingham Content.md".
 */

import { homeContent } from "@/lib/homepageData";
import type { LocationExtras } from "@/lib/locations/london";

const BASE_URL = "https://www.restorefine.co.uk";
const home = homeContent;

/** Keeps a homepage image by service id, so Birmingham only overrides the copy */
const imageFor = (id: string) => [...home.services.core, ...home.services.more].find((s) => s.id === id)?.image ?? null;

export const birminghamContent = {
  ...home,
  meta: {
    title: "Growth Marketing Agency Birmingham | RestoRefine",
    description: "RestoRefine is a growth marketing agency serving Birmingham businesses with branding, websites, SEO, paid ads, content and CRM, replying within minutes.",
    canonical: `${BASE_URL}/growth-marketing-agency-birmingham`,
  },
  hero: {
    heading: "Growth Marketing Agency Birmingham",
    accent: "Growth",
    body: "RestoRefine is a Glasgow-based growth marketing agency serving businesses in Birmingham and the West Midlands. We connect strategy, branding, content, website development, SEO, paid advertising, CRM and performance measurement around commercial goals.",
    more: "Our approach brings these activities together to help businesses reach relevant audiences, generate enquiries and improve customer acquisition. We support individual marketing requirements or coordinated delivery across several channels.",
    badges: ["rating", "work", "response"],
  },
  services: {
    heading: "Marketing Services We Provide in Birmingham",
    body: "RestoRefine provides a connected range of branding, marketing & digital services to address your needs, with each activity aligned to your wider business objectives. Whether you need support with a specific requirement or a coordinated approach across multiple channels, we bring together the right expertise to make your marketing work harder.",
    core: [
      {
        id: "branding",
        title: "Branding",
        tagline: "Define Your Brand's Market Position.",
        description: "We develop brand positioning, messaging, and visual identities that help businesses establish a distinctive market presence. From creative direction to consistency across digital and physical touchpoints, we bring every element together to communicate your value clearly, strengthen recognition, and differentiate your business from competitors.",
        items: ["Logo Design", "Brand Identity Development", "Brand Strategy"],
        image: imageFor("branding")!,
        href: "/services/brand",
      },
      {
        id: "design",
        title: "Design",
        tagline: "Create your branding experience.",
        description: "We create customer-facing designs that bring your brand to life across digital and physical touchpoints. From social media graphics and marketing materials to menus, packaging, signage, and promotional assets, every design maintains visual consistency, communicates clearly, and presents your business professionally.",
        items: ["Menu Design", "Print Design", "Signage Design", "Packaging Design", "Social Media Design", "Merchandise Design"],
        image: imageFor("design")!,
        href: "/services/brand",
      },
      {
        id: "content",
        title: "Content",
        tagline: "Grow your audience strategically.",
        description: "We plan and create content for websites, campaigns, advertising, social media, and product or service launches. Each piece is shaped around your target audience and business objectives, helping communicate your value, address customer needs, build trust, and turn attention into meaningful enquiries.",
        items: ["Content Strategy", "Photography", "Videography", "Short-Form Video"],
        image: imageFor("content")!,
        href: "/services/content",
      },
      {
        id: "seo",
        title: "SEO",
        tagline: "Reach customers through organic search.",
        description: "We improve your search visibility through technical SEO, relevant content, Google Business Profile, AI search visibility, and authority building. From local search optimisation to performance measurement, we help potential customers find your business, understand your services, and convert their interest into enquiries.",
        items: ["Local SEO", "AI SEO / AIO", "Generative Engine Optimisation (GEO)"],
        image: imageFor("seo")!,
        href: "/services/performance",
      },
      {
        id: "paid-ads",
        title: "Paid Ads",
        tagline: "Measure how you acquire your customers.",
        description: "We plan and manage paid campaigns across Google and social platforms to reach relevant audiences and capture customer demand. We combine audience targeting, retargeting, creative testing, landing-page optimisation and conversion tracking to assess campaign performance. These findings guide budget decisions and adjustments aimed at generating qualified enquiries and sales.",
        items: ["Google Ads", "Meta Ads"],
        image: imageFor("paid-ads")!,
        href: "/services/performance",
      },
    ],
    more: [
      {
        id: "social",
        title: "Social Media Marketing",
        tagline: "Be present socially and consistently.",
        description: "We manage social media activity through planned content, consistent publishing, platform-specific creative, and audience engagement. From ongoing communication to targeted campaigns, we help businesses strengthen brand recognition, build relationships with potential customers, and generate enquiries through social channels.",
        image: imageFor("social"),
        href: "/services/content",
      },
      {
        id: "web",
        title: "Web Development",
        tagline: "Convert your website experience.",
        description: "We develop responsive websites with clear messaging, intuitive layouts, CMS functionality and fast-loading pages. We plan enquiry forms, booking journeys and conversion tracking around customer needs, connecting the website with relevant marketing campaigns to support lead generation and customer acquisition.",
        image: imageFor("web"),
        href: "/services/performance",
      },
      {
        id: "crm",
        title: "CRM",
        tagline: "Automate how you retain your customers.",
        description: "We help businesses organise customer information, manage incoming leads, and build consistent follow-up processes through CRM systems and marketing automation. From lead segmentation and automated nurturing to customer retention workflows, we help reduce missed opportunities, improve conversion rates, and encourage repeat business.",
        image: imageFor("crm"),
        href: "/services/performance",
      },
      {
        id: "nfc",
        title: "NFC Smart Cards",
        tagline: "Business cards that connect digitally.",
        description: "Our NFC Smart Cards let customers and staff share business details with a simple tap on a compatible smartphone. You can link directly to contact information, websites, social profiles, booking pages, or other key business destinations, and easily exchange details, build connections, and encourage follow-up.",
        image: imageFor("nfc"),
        href: "/enquire-now",
      },
    ],
    cta: home.ctas.enquire,
  },
  process: {
    heading: "How Our Marketing Agency Works With Birmingham Businesses",
    lead: "Our approach is as simple as RESTO: a five-step process that takes you from the first conversation through strategy, delivery, and performance tracking, keeping your business goals at the centre of every step.",
    steps: [
      {
        number: "01",
        title: "Reach Out",
        description: "Contact RestoRefine through our enquiry form or WhatsApp to share your business goals, current marketing challenges and the outcomes you want to achieve. We'll discuss your requirements and agree on the next step.",
      },
      {
        number: "02",
        title: "Evaluate",
        description: "We assess your brand, website, marketing channels, customer journey and performance tracking to identify gaps. Where relevant, we also review competitors and customer demand across Birmingham or the West Midlands to establish priorities for the work.",
      },
      {
        number: "03",
        title: "Strategize",
        description: "We develop a plan around measurable business goals, target customers and commercial priorities. We select the relevant services, define each marketing channel's role and organise the order of work. Geographic targeting depends on whether the business wants to reach customers in Birmingham, the West Midlands or wider markets.",
      },
      {
        number: "04",
        title: "Transform",
        description: "We deliver the agreed branding, website, content, campaign or marketing system work according to the project plan. Where relevant, we test functionality, tracking and customer journeys before launch or handover.",
      },
      {
        number: "05",
        title: "Optimize",
        description: "We track performance, report on results and test opportunities for improvement. These findings help prioritise campaigns, content and other marketing activities that contribute more effectively to agreed commercial goals.",
      },
    ],
    cta: home.ctas.enquire,
  },
  reviewsCta: { label: "Chat on WhatsApp", href: home.ctas.whatsapp.href },
  whyChoose: {
    ...home.whyChoose,
    heading: "Why Choose RestoRefine as Your Growth Marketing Agency in Birmingham",
    body: "RestoRefine gives Birmingham businesses a structured approach to marketing, from understanding their commercial goals to delivering and refining the right activities. We assess your target markets before developing a strategy, coordinating execution, and measuring performance with direct senior involvement to improve results over time.",
    items: [
      {
        id: "roi",
        title: "ROI-Focused Marketing",
        description: "We focus on marketing activities that contribute to measurable business outcomes, from qualified enquiries and bookings to sales and customer acquisition. Performance tracking helps identify what is working and where investment can deliver better commercial value.",
      },
      {
        id: "connected-growth-systems",
        title: "Connected Growth Systems",
        description: "We connect every part of your marketing so each activity supports a shared business goal. This creates consistent customer experiences, reduces disconnected efforts, and helps turn brand awareness into enquiries, sales, and lasting customer relationships.",
      },
      {
        id: "founder-led",
        title: "Founder-Led Projects",
        description: "Every project benefits from direct involvement of our founders, providing clear strategic direction, senior oversight, and accountability throughout delivery. This keeps decisions focused, communication direct, and execution aligned with your business goals.",
      },
      {
        id: "response",
        title: "Response Within Minutes",
        description: "We prioritise prompt communication, aiming to respond to enquiries within minutes so you can discuss your requirements, get answers, and move projects forward without unnecessary delays.",
      },
      {
        id: "rating",
        title: "5-Star Google Rating",
        description: "Our 5-star Google rating reflects the positive experiences clients have shared about our work, communication, and service. We value every client relationship and remain committed to helping businesses move forward.",
      },
      {
        id: "case-studies",
        title: "Real Client Case Studies",
        description: "Check out our real client projects to see how we approach challenges, deliver marketing work, and support business goals. Each case study highlights the project scope, strategy, and documented outcomes, giving you a clearer picture of our work and its impact.",
      },
      {
        id: "reporting",
        title: "Transparent Reporting",
        description: "We provide clear reporting on marketing activity, campaign performance, and progress towards agreed goals. This helps you understand where results are coming from, what needs improvement, and which actions should take priority next.",
      },
    ],
    closing: "",
  },
  industries: {
    heading: "Industries We Serve in Birmingham",
    body: "Different industries require different approaches to reach customers, build trust, and generate business. Whether it’s the hospitality, leisure, or professional industries, RestoRefine connects branding, creative and digital marketing to address the customer journey and commercial priorities of businesses across Birmingham.",
    items: [
      {
        title: "Hospitality & Restaurants",
        description: "For Birmingham's restaurants, cafés, bars and hospitality venues, strong presentation and local visibility help turn customer interest into visits and bookings. We connect brand identity, menus, signage, photography, websites and local search to showcase each venue, attract diners and encourage bookings and repeat visits.",
        image: home.industries.items[0].image,
      },
      {
        title: "Sport & Leisure",
        description: "Birmingham's sport, fitness and leisure businesses need to attract new participants and encourage ongoing engagement. We connect brand positioning, promotional content, campaigns and booking journeys to showcase their offerings, generate memberships and bookings, and encourage repeat participation.",
        image: home.industries.items[1].image,
      },
      {
        title: "Lifestyle Brands",
        description: "For lifestyle and product-led brands in Birmingham, a distinctive identity and consistent customer experience can help turn product interest into purchases. We connect brand development, visual content, websites and campaigns to communicate product value, engage target audiences and support sales and acquisition.",
        image: home.industries.items[2].image,
      },
      {
        title: "Professional Services",
        description: "For Birmingham's professional service firms, communicating expertise and building trust are essential to winning new clients. We connect strategic positioning, credible websites, search visibility and informative content to demonstrate value, attract qualified prospects and generate valuable enquiries.",
        image: home.industries.items[3].image,
      },
    ],
  },
  businesses: {
    heading: "Businesses We Work With in Birmingham",
    body: "Businesses need different levels of marketing support depending on their stage of development, existing capabilities, and commercial priorities. Whether you're preparing to enter the market, looking to strengthen customer acquisition or refine an established operation, RestoRefine aligns its approach with what your business needs to achieve next.",
    items: [
      {
        title: "New Businesses",
        description: "Entering the Birmingham market requires a clear position, recognisable identity and a credible way to reach potential customers. We help new businesses establish their brand, develop a professional website, create content and coordinate launch marketing around a shared commercial direction to build awareness and generate early enquiries.",
      },
      {
        title: "Growing Businesses",
        description: "Businesses with an existing customer base often need stronger acquisition channels and greater marketing capacity to sustain growth. We improve visibility, strengthen lead generation, coordinate activity across channels and optimise conversion journeys, while providing the specialist support needed to expand marketing execution.",
      },
      {
        title: "Established Businesses",
        description: "Established companies in Birmingham may need to refine their positioning, reach new audiences or improve how their marketing operation works. We support repositioning, website improvements, new campaigns and stronger marketing systems, coordinating with existing internal teams to align activity with wider business objectives.",
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
        question: "How Much Does a Marketing Agency in Birmingham Cost?",
        answer: [
          "The cost depends on the services required, project complexity, and level of ongoing support. A one-off branding or website project is priced differently from ongoing marketing across SEO, paid advertising, content, and CRM. Advertising media spend may also be separate from agency management fees. The best way to establish a budget is to define your priorities, deliverables and expected level of support.",
        ],
      },
      {
        question: "How Is a Growth Marketing Agency Different From a Digital Marketing Agency in Birmingham?",
        answer: [
          "A digital marketing agency typically focuses on activities across online channels, such as SEO, paid advertising, social media, and web development. A growth marketing agency takes a broader view, connecting these activities with conversion, customer retention, customer value, and performance measurement. The distinction is in how marketing is planned and evaluated: growth marketing considers the wider customer journey and commercial outcomes, not just individual channel performance.",
        ],
      },
      {
        question: "Can a Marketing Agency Work With an Existing In-House Marketing Team?",
        answer: [
          "Yes. An agency can supplement an internal team by providing specialist expertise, additional delivery capacity, or support for specific projects. This can include strategy, creative, SEO, paid media, website development, CRM, or campaign execution, while your internal team retains ownership of its existing responsibilities.",
        ],
      },
      {
        question: "When Should a Birmingham Business Hire a Marketing Agency?",
        answer: [
          "Consider external support when your team lacks the capacity or specialist skills to meet marketing goals, your channels are not working together, or you cannot clearly measure what is generating enquiries and sales. An agency can also help when visibility is weak, website conversions are low, or your business needs a coordinated strategy to reach new customers.",
        ],
      },
      {
        question: "What Should a Birmingham Business Look for When Choosing a Marketing Agency?",
        answer: [
          "Look for an agency that understands your commercial objectives and can demonstrate relevant capabilities and experience. Review its case studies, client feedback, measurement approach, communication, and level of senior involvement. Make sure its services match your requirements, and clarify who will deliver the work and how progress will be reported.",
        ],
      },
      {
        question: "Does a Birmingham Marketing Agency Need to Be Based in Birmingham?",
        answer: [
          "No. A local office is not essential if an agency can understand your market, communicate effectively, and deliver the required services remotely. However, clarify its working arrangements, availability for in-person meetings if needed, and experience serving businesses in your target market.",
        ],
      },
      {
        question: "How Do You Measure Whether a Marketing Agency Is Delivering Results?",
        answer: [
          "Agree on measurable objectives before work begins. Depending on your business, useful measures may include qualified enquiries, booked appointments, sales, customer acquisition cost, conversion rates and customer retention. Regular reporting should connect marketing activity and spending to these outcomes rather than focusing only on impressions, clicks or engagement.",
        ],
      },
    ],
  },
  finalCta: {
    ...home.finalCta,
    heading: "Start Growing Your Business With RestoRefine",
    accent: "Growing",
    body: "Let's identify the right next steps for your growth. Whether you're launching, expanding, or refining your business, RestoRefine helps Birmingham businesses bring strategy and marketing execution together around clear commercial goals. Get in touch to discuss your business stage, current marketing challenges, and growth objectives.",
    headingAsH2: true,
    ctas: home.ctas,
  },
};

/** Sections that only location pages have */
export const birminghamExtras: LocationExtras = {
  challenges: {
    heading: "Growth Marketing Challenges Birmingham Businesses Face",
    body: "Birmingham businesses compete for attention across both crowded local markets and digital customer journeys. Without clear positioning, consistent visibility and coordinated marketing, it can be difficult to attract the right customers, convert interest into enquiries and understand which activities drive results.",
    items: [
      {
        title: "Competing for Local Visibility",
        description: "When multiple businesses compete for the same local searches and customer groups across Birmingham, standing out and getting discovered can be difficult. A weak digital presence, limited search visibility, or unclear market positioning can cause potential customers to choose the competitors instead.",
      },
      {
        title: "Lack of Clear Marketing Strategy",
        description: "Without a clear marketing strategy, businesses can spend on channels that attract the wrong audience, run campaigns that generate little sales interest, and miss opportunities to convert potential customers. When goals and performance measures are disconnected, it also becomes harder to identify what drives enquiries and where to invest next.",
      },
      {
        title: "Pressure on Marketing Budgets",
        description: "When marketing budgets are stretched across too many channels, businesses risk paying for clicks, impressions, and engagement that generate few enquiries or sales. Without clear performance tracking, it becomes difficult to identify which campaigns deserve more investment and which are draining the budget.",
      },
      {
        title: "Difficulty Proving Marketing ROI",
        description: "High website traffic, social engagement, and ad clicks don't necessarily mean growth. Without clear tracking, businesses may keep funding campaigns that generate clicks but few customers while overlooking channels that drive sales. This wastes marketing spend, raises customer acquisition costs, and misses revenue opportunities.",
      },
      {
        title: "Limited In-House Marketing Capacity",
        description: "Managing strategy, content, design, SEO, paid campaigns, websites, and CRM requires different skills and consistent attention. When these responsibilities fall to a small internal team, campaigns can become inconsistent, follow-ups may be delayed, and important optimisation work gets overlooked.",
      },
      {
        title: "Scaling Beyond Existing Customers",
        description: "Businesses that rely mainly on referrals, repeat customers or existing relationships may struggle to attract new customers consistently. Reaching new audiences requires clearer positioning, targeted campaigns and suitable acquisition channels across Birmingham, the West Midlands or wider UK markets.",
      },
    ],
  },
  benefits: {
    heading: "Benefits of Growth Marketing for Birmingham Businesses",
    body: "A connected growth marketing approach helps Birmingham businesses align branding, digital channels, and customer engagement around clear commercial goals. By linking acquisition, conversion, retention, and measurement, businesses can make better marketing decisions, attract relevant prospects, and create more growth opportunities.",
    items: [
      {
        title: "Improve Marketing ROI",
        description: "Tracking bookings and sales against marketing spend helps businesses identify which channels bring in paying customers and justify their acquisition costs. This makes it easier to prioritise effective campaigns, reduce unproductive spending, and allocate budgets towards stronger commercial activities.",
      },
      {
        title: "Use Marketing Budgets More Efficiently",
        description: "Comparing campaigns by qualified leads and completed sales helps businesses identify which channels attract customers most effectively, allowing them to cut low-value spending and direct budget towards campaigns that generate genuine sales opportunities.",
      },
      {
        title: "Generate Higher-Quality Leads",
        description: "Targeted campaigns and clear messaging help businesses reach prospects who are more likely to need their offerings. Better-matched leads can improve sales, increase conversion opportunities, and reduce time spent chasing unsuitable prospects.",
      },
      {
        title: "Increase Conversion Performance",
        description: "Clear messaging, focused landing pages, and intuitive bookings help turn more website visitors into potential customers. By testing customer journeys and key conversion points, businesses can reduce drop-offs and generate more enquiries & sales opportunities.",
      },
      {
        title: "Increase Customer Retention",
        description: "CRM systems, automated follow-ups, & relevant communication keep customers engaged after purchase. Consistent post-sale engagement encourages repeat orders, increases renewal opportunities, and helps turn one-time buyers into returning customers.",
      },
      {
        title: "Strengthen Local Visibility",
        description: "Relevant local content, accurate business information, Google Business Profile optimisation and genuine customer reviews can improve a business's local search presence. These activities help Birmingham businesses reach nearby customers searching for their services and create more opportunities for calls, website visits and enquiries.",
      },
    ],
    cta: home.ctas.enquire,
  },
  knowAbout: {
    heading: "Know About Birmingham",
    body: "Birmingham has a diverse business economy spanning professional services, retail, life sciences, and creative industries. Its commercial character varies across areas such as the City Centre and Colmore Business District, a major hub for professional services; the Jewellery Quarter, with its distinctive business and heritage identity; and Digbeth, a recognised centre for creative and digital activity. This range of industries and commercial districts creates different challenges for businesses seeking to build visibility, reach customers and compete across Birmingham and the wider West Midlands.",
    places: [
      { name: "Colmore Business District", lat: 52.483, lon: -1.8985, label: "top" },
      { name: "Jewellery Quarter", lat: 52.489, lon: -1.911, label: "left" },
      { name: "Digbeth", lat: 52.4755, lon: -1.883, label: "right" },
    ],
    boundary: "Birmingham",
  },
  area: { name: "Birmingham", type: "City" as const },
};
