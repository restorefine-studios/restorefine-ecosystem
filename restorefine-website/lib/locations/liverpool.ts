/**
 * Liverpool location page content (/growth-marketing-agency-liverpool).
 *
 * Same shape as the London and Manchester pages: the homepage content with the
 * copy overridden, plus the location-only extras. Copy is from "Liverpool Content.md".
 */

import { homeContent } from "@/lib/homepageData";
import type { LocationExtras } from "@/lib/locations/london";

const BASE_URL = "https://www.restorefine.co.uk";
const home = homeContent;

/** Keeps a homepage image by service id, so Liverpool only overrides the copy */
const imageFor = (id: string) => [...home.services.core, ...home.services.more].find((s) => s.id === id)?.image ?? null;

export const liverpoolContent = {
  ...home,
  meta: {
    title: "Growth Marketing Agency Liverpool | RestoRefine",
    description: "RestoRefine is a growth marketing agency serving Liverpool businesses with branding, websites, SEO, paid ads, content and CRM, replying within minutes.",
    canonical: `${BASE_URL}/growth-marketing-agency-liverpool`,
  },
  hero: {
    heading: "Growth Marketing Agency Liverpool",
    accent: "Growth",
    body: "RestoRefine is a Glasgow-based growth marketing agency serving Liverpool businesses. We connect strategy, branding, content, website development, SEO, paid advertising, social media, CRM and digital systems around commercial goals.",
    more: "As a marketing agency serving Liverpool, we support businesses with individual services or coordinated marketing activities. Our approach focuses on reaching relevant customers, generating enquiries and improving conversion journeys based on each business's priorities.",
    badges: ["rating", "work", "response"],
  },
  services: {
    heading: "Marketing Services We Provide in Liverpool",
    body: "RestoRefine provides marketing solutions built around your goals, whether you need support with a specific service or a more connected approach across multiple channels. As a marketing agency serving Liverpool businesses, we bring creative, strategic, and technical capabilities together to help you attract customers and build sustainable growth.",
    core: [
      {
        id: "branding",
        title: "Branding",
        tagline: "Turn recognition into customer trust.",
        description: "We build a recognisable brand for your business with clear positioning, compelling messaging, and a consistent visual identity. By shaping your brand's creative direction, we help communicate what makes your business different and create a consistent experience across every customer touchpoint.",
        items: ["Logo Design", "Brand Identity Development", "Brand Strategy"],
        image: imageFor("branding")!,
        href: "/services/brand",
      },
      {
        id: "design",
        title: "Design",
        tagline: "One brand. Every touchpoint.",
        description: "We help create a consistent visual experience for your customers across both physical and digital touchpoints. From marketing materials and social graphics to print, menus, signage, merchandise, and packaging, we design assets that make your business look professional, recognisable, and cohesive.",
        items: ["Menu Design", "Print Design", "Signage Design", "Packaging Design", "Social Media Design", "Merchandise Design"],
        image: imageFor("design")!,
        href: "/services/brand",
      },
      {
        id: "content",
        title: "Content",
        tagline: "Be seen, heard, and remembered.",
        description: "We create purposeful content that attracts attention and brings the right people to your business. From website copy and social media to campaigns, advertising, and launches, we plan and produce content that strengthens visibility, engages audiences, and supports customer acquisition & conversion.",
        items: ["Content Strategy", "Photography", "Videography", "Short-Form Video"],
        image: imageFor("content")!,
        href: "/services/content",
      },
      {
        id: "seo",
        title: "SEO",
        tagline: "Build visibility that brings opportunities.",
        description: "We improve how customers discover your business across search engines and AI platforms. We combine technical SEO, content optimisation, authority building, local search and AI search strategies to strengthen organic visibility, attract relevant visitors and create more opportunities for enquiries and growth.",
        items: ["Local SEO", "AI SEO / AIO", "Generative Engine Optimisation (GEO)"],
        image: imageFor("seo")!,
        href: "/services/performance",
      },
      {
        id: "paid-ads",
        title: "Paid Ads",
        tagline: "Smarter campaigns. Measurable results.",
        description: "We help businesses reach the right audiences and turn advertising spend into measurable results. We plan and manage targeted campaigns across Google and Meta, using audience research, creative testing, retargeting and conversion tracking to improve performance, generate qualified leads and support business growth.",
        items: ["Google Ads", "Meta Ads"],
        image: imageFor("paid-ads")!,
        href: "/services/performance",
      },
    ],
    more: [
      {
        id: "social",
        title: "Social Media Marketing",
        tagline: "Turn social presence into brand growth.",
        description: "We help build an active, recognisable presence across the platforms your audience uses. We plan and publish platform-specific content, manage campaign activity, and encourage meaningful community interaction to strengthen brand awareness, engage potential customers, and keep your business visible.",
        image: imageFor("social"),
        href: "/services/content",
      },
      {
        id: "web",
        title: "Web Development",
        tagline: "Built to engage. Designed to convert.",
        description: "We develop websites that work as a central part of your marketing system, with user-friendly responsive UIs, intuitive booking journeys, flexible CMS platforms, and strong performance, making it easier for visitors to explore your business, take action, and become customers.",
        image: imageFor("web"),
        href: "/services/performance",
      },
      {
        id: "crm",
        title: "CRM",
        tagline: "From first enquiry to long-term loyalty.",
        description: "We help organise customer information, manage leads, segment audiences, and build follow-up & nurturing workflows. By connecting your CRM with other marketing systems, you can improve lead handling, strengthen customer retention, and create a more consistent customer experience.",
        image: imageFor("crm"),
        href: "/services/performance",
      },
      {
        id: "nfc",
        title: "NFC Smart Cards",
        tagline: "One tap. A smarter connection.",
        description: "Give your team a convenient way to make connections, share information, and turn in-person interactions into lasting business opportunities with our NFC Smart Cards. A simple tap lets customers access your digital business card, contact details, website, social profiles, or other key links directly on their smartphones.",
        image: imageFor("nfc"),
        href: "/enquire-now",
      },
    ],
    cta: home.ctas.enquire,
  },
  process: {
    heading: "How Our Marketing Agency Works With Liverpool Businesses",
    lead: "Our approach is as simple as RESTO: a five-step process that takes you from the first conversation through strategy, delivery, and performance tracking, keeping your business goals at the centre of every step.",
    steps: [
      {
        number: "01",
        title: "Reach Out",
        description: "Contact RestoRefine through the enquiry form or WhatsApp to share your current marketing challenges, business goals and the results you want to achieve. We'll discuss your requirements and agree on the next step.",
      },
      {
        number: "02",
        title: "Evaluate",
        description: "We review your brand, website, marketing channels, customer journey and performance tracking to identify areas requiring attention. For Liverpool-focused projects, we also assess relevant competitors and target markets where these affect your commercial goals.",
      },
      {
        number: "03",
        title: "Strategize",
        description: "We develop a plan around measurable goals, target audiences and commercial priorities. We select the relevant services, define each marketing channel's role and determine whether the strategy should focus on Liverpool, wider UK markets or other approved target audiences.",
      },
      {
        number: "04",
        title: "Transform",
        description: "We bring the plan to life, delivering the agreed work, whether branding, websites, content or marketing, with care, creativity and attention to detail.",
      },
      {
        number: "05",
        title: "Optimize",
        description: "We track marketing performance, report on results and test opportunities for improvement. These findings guide adjustments to campaigns, content and other marketing activities based on agreed commercial goals.",
      },
    ],
    cta: home.ctas.enquire,
  },
  reviewsCta: { label: "Chat on WhatsApp", href: home.ctas.whatsapp.href },
  whyChoose: {
    ...home.whyChoose,
    heading: "Why Choose RestoRefine as Your Growth Marketing Agency in Liverpool",
    body: "RestoRefine brings strategy, creative, digital marketing and technology together through our Connected Growth Framework. We connect marketing activity to your business goals through coordinated execution, open communication, and direct strategic involvement, helping Liverpool businesses pursue purposeful, accountable growth.",
    items: [
      {
        id: "roi",
        title: "ROI-Focused Marketing",
        description: "We focus on the outcomes that matter to your business: enquiries, bookings, sales, customer acquisition & revenue. By measuring performance against meaningful business goals, we help you understand what is working and where to invest for stronger returns.",
      },
      {
        id: "connected-growth-systems",
        title: "Connected Growth Systems",
        description: "We align every part of your marketing around shared goals, helping you reduce disconnected activity, create consistent customer experiences, and make every channel work harder towards business growth.",
      },
      {
        id: "founder-led",
        title: "Founder-Led Projects",
        description: "Work directly with the founders, with their strategic input and oversight throughout your project. This keeps decisions close to the people leading the work, ensures clear communication, and gives your business consistent oversight from planning to execution.",
      },
      {
        id: "response",
        title: "Response Within Minutes",
        description: "Get a prompt response when you reach out to RestoRefine. We aim to respond to your business enquiries within minutes, so you can get answers and discuss your next steps without unnecessary delays.",
      },
      {
        id: "rating",
        title: "5-Star Google Rating",
        description: "Our 5-star Google rating reflects the trust and confidence customers place in RestoRefine. We value every client relationship and remain committed to delivering meaningful support, reliable service, and helping businesses move forward.",
      },
      {
        id: "case-studies",
        title: "Real Client Case Studies",
        description: "See how our work translates into measurable business outcomes. We showcase genuine projects, the challenges behind them, and documented results, giving you a clear view of what our approach can achieve.",
      },
      {
        id: "reporting",
        title: "Transparent Reporting",
        description: "Know what we're doing, how your marketing is performing, and what comes next. We provide clear reporting on key activities, results, and priorities so you can see where your investment is going and make informed decisions.",
      },
    ],
    closing: "",
  },
  industries: {
    heading: "Industries We Serve in Liverpool",
    body: "Whether you're an independent venue, professional firm, or leisure operator, every business needs marketing that reflects its audience and commercial goals. RestoRefine connects creative, strategic, and digital capabilities to help businesses across Liverpool strengthen their market presence, attract customers & build sustainable growth.",
    items: [
      {
        title: "Hospitality & Restaurants",
        description: "For Liverpool's restaurants, cafés, bars and hospitality venues, standing out and giving customers a reason to visit go hand in hand. We connect brand identity, menus, signage, photography, websites and local search to showcase each venue, strengthen its visibility across Liverpool and encourage more visits and bookings.",
        image: home.industries.items[0].image,
      },
      {
        title: "Sport & Leisure",
        description: "Liverpool's sport, fitness and leisure businesses need to attract participants and keep them engaged beyond their first visit. We connect brand positioning, engaging content, promotional campaigns and booking journeys to communicate the value of their offerings, attract new customers and encourage repeat participation.",
        image: home.industries.items[1].image,
      },
      {
        title: "Lifestyle Brands",
        description: "For Liverpool's lifestyle and product-led brands, a recognisable identity and consistent digital presence help turn interest into customer relationships. From brand development and content to websites and social media, we create connected marketing experiences that strengthen product appeal, engage audiences and support customer acquisition.",
        image: home.industries.items[2].image,
      },
      {
        title: "Professional Services",
        description: "Liverpool's professional-service firms need to communicate their expertise clearly and build confidence before prospective clients make contact. We connect strategic positioning, credible websites, organic search and informative content to improve online visibility, establish trust and generate valuable enquiries.",
        image: home.industries.items[3].image,
      },
    ],
  },
  businesses: {
    heading: "Businesses We Work With in Liverpool",
    body: "Liverpool businesses need different levels of marketing support depending on where they are in their journey. Whether you're preparing to launch, looking to accelerate growth, or ready to strengthen an established operation, RestoRefine tailors its approach to your priorities and next stage of development.",
    items: [
      {
        title: "New Businesses",
        description: "Starting a business in Liverpool means building recognition and attracting your first customers. We help new businesses establish their brand identity, launch a professional website, create relevant content and put initial marketing activity in place to build visibility and generate early enquiries.",
      },
      {
        title: "Growing Businesses",
        description: "As your Liverpool business grows, maintaining visibility and generating consistent enquiries needs to keep pace. We strengthen your digital presence, improve lead generation, bring greater consistency across channels and develop campaigns that help you reach new audiences and expand into wider markets.",
      },
      {
        title: "Established Businesses",
        description: "Established businesses may need a fresh approach to maintain momentum and pursue new opportunities. Whether you're considering repositioning, website redevelopment, new campaigns or more connected marketing systems, we help refine your strategy and align activity with your next business objectives.",
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
        question: "How Much Does a Marketing Agency in Liverpool Cost?",
        answer: [
          "There is no single fixed price for working with a marketing agency in Liverpool. Costs depend on the scope of work, services required, project complexity, and whether you need a one-off project or ongoing support. A focused SEO campaign, for example, will have different requirements from a complete marketing strategy covering branding, content, paid advertising, and CRM. The right investment depends on your goals, priorities and available budget.",
        ],
      },
      {
        question: "How Is a Growth Marketing Agency Different From a Digital Marketing Agency in Liverpool?",
        answer: [
          "A digital marketing agency typically focuses on online channels such as SEO, paid advertising, social media, and websites. A growth marketing agency takes a broader, commercially focused approach with them, connecting customer acquisition, conversion, retention, and lifetime value. Rather than measuring individual channel performance alone, it considers how the entire customer journey contributes to sustainable business growth.",
        ],
      },
      {
        question: "Can a Marketing Agency Work With an Existing In-House Marketing Team?",
        answer: [
          "Yes. A marketing agency can complement your in-house team by providing additional specialist skills, strategic direction, or delivery capacity. This could include anything from technical SEO and paid advertising campaigns to CRM integration or anything else that seems to be lacking. Working alongside your existing team allows you to fill capability gaps, manage additional projects, and extend your marketing capacity without hiring for every specialist role.",
        ],
      },
      {
        question: "When Should a Liverpool Business Hire a Marketing Agency?",
        answer: [
          "Consider hiring a marketing agency when your business struggles with unclear positioning, inconsistent marketing, limited internal capacity, or difficulty measuring performance. You may also need external support when launching a new service, entering new markets, or improving customer acquisition. The right time is when your marketing needs exceed your available expertise or resources.",
        ],
      },
      {
        question: "What Should a Liverpool Business Look for When Choosing a Marketing Agency?",
        answer: [
          "Look for an agency that understands your business goals and can connect its services to measurable outcomes. Assess its strategic approach, relevant capabilities, genuine case studies, client reviews, reporting methods, and communication standards. It is also worth understanding who will lead your project and how involved senior team members will be throughout delivery.",
        ],
      },
      {
        question: "Can I Hire RestoRefine for Individual Marketing Services?",
        answer: [
          "Yes. You can work with RestoRefine on individual services such as branding, SEO, website development, paid advertising, content, or CRM. If your needs extend across multiple areas, these services can also be coordinated through our Connected Growth Framework, giving your marketing a more consistent direction.",
        ],
      },
      {
        question: "How Do You Measure the Success of a Marketing Campaign?",
        answer: [
          "Success is measured against your business objectives rather than visibility or engagement alone. Depending on the campaign, this may include qualified enquiries, bookings, sales, conversion rates, customer acquisition costs, and revenue. We use performance data to identify what is working, refine activity and guide future marketing priorities.",
        ],
      },
    ],
  },
  finalCta: {
    ...home.finalCta,
    heading: "Start Growing Your Business With RestoRefine",
    accent: "Growing",
    body: "Ready to take your Liverpool business forward? RestoRefine connects strategy, creative, and digital execution to turn marketing into meaningful business progress. Tell us what challenges you're facing and what you want to achieve, and let's build a marketing approach around your next stage of growth.",
    headingAsH2: true,
    ctas: home.ctas,
  },
};

/** Sections that only location pages have */
export const liverpoolExtras: LocationExtras = {
  challenges: {
    heading: "Growth Marketing Challenges Liverpool Businesses Face",
    body: "For businesses competing for attention in Liverpool, unclear brand positioning, disconnected marketing channels, underperforming websites, and inconsistent customer follow-up can make it harder to attract the right audience and convert interest, limiting marketing performance and making growth difficult to sustain.",
    items: [
      {
        title: "Competing for Customer Attention",
        description: "As businesses compete for attention across search engines, social media, and other digital platforms, a simple online presence is no longer enough. Without clear positioning and consistent visibility, your business can struggle to stand out, reach the right audience, and remain memorable when customers are ready to choose.",
      },
      {
        title: "Unclear Brand Positioning",
        description: "When your brand messaging is too broad or tries to communicate too many things at once, customers struggle to understand what makes you different. Without a clear identity, consistent messaging, and a distinct value proposition, it becomes harder to stand out, build trust, and give potential customers a reason to choose your business.",
      },
      {
        title: "Limited In-House Marketing Capacity",
        description: "Managing branding, content, SEO, paid advertising, websites, and customer relationships requires different skills and undivided attention. Many businesses can lack the time, resources, or specialist expertise to manage all these functions internally, making it difficult to maintain consistency, coordinate activity, and keep marketing moving forward.",
      },
      {
        title: "Keeping Marketing Consistent",
        description: "Marketing often loses momentum when daily business demands take priority. Irregular content, inconsistent messaging, delayed campaigns, and neglected channels can weaken brand recognition, making it harder to build lasting audience engagement and leaving potential customers with an inconsistent impression of your business over time.",
      },
      {
        title: "Scaling Beyond Local Markets",
        description: "Expanding beyond your existing market requires more than geographic targeting. Businesses looking to grow across the UK or internationally may struggle to adapt their positioning, reach new audiences, and build visibility in unfamiliar markets. Without a clear acquisition strategy, growth beyond local demand can become difficult to sustain.",
      },
      {
        title: "Pressure on Marketing Budgets",
        description: "When marketing budgets are limited, every investment needs to count. Without clear priorities and reliable performance measurement, businesses risk spending on low-value activities, making it harder to understand returns and justify future investment.",
      },
    ],
  },
  benefits: {
    heading: "Benefits of Growth Marketing for Liverpool Businesses",
    body: "A connected growth marketing approach helps businesses move beyond individual campaigns and disconnected channels. By aligning strategy, creative, digital marketing, and customer systems, Liverpool businesses can attract more relevant audiences, convert interest into enquiries, and build stronger customer relationships.",
    items: [
      {
        title: "Improve Marketing ROI",
        description: "Understand what your marketing is contributing to business growth. By tracking enquiries, bookings, sales, and customer acquisition, businesses can identify which activities deliver value, make better investment decisions, and focus budgets on measurable commercial outcomes.",
      },
      {
        title: "Use Marketing Budgets More Efficiently",
        description: "Make informed decisions about where your marketing budget goes. Through campaign testing, performance analysis, and clear prioritisation, businesses can focus spending on activities showing stronger potential to attract customers and generate returns.",
      },
      {
        title: "Generate Higher-Quality Leads",
        description: "Attract prospects through clearer positioning, targeted campaigns, and stronger search visibility. Reaching audiences with relevant needs and genuine buying intent can help generate more meaningful enquiries and improve the quality of their sales opportunities.",
      },
      {
        title: "Increase Conversion Performance",
        description: "Clear messaging, intuitive customer journeys, effective landing pages, and compelling calls to action help remove friction and make it easier for visitors to take the next step. Ongoing testing helps identify opportunities to improve performance and conversions.",
      },
      {
        title: "Increase Customer Lifetime Value",
        description: "Build stronger customer relationships beyond the first sale. Through consistent communication, CRM-led follow-ups, and retention strategies, businesses can encourage repeat purchases, strengthen loyalty, and create long-term value from existing customers.",
      },
      {
        title: "Reach New Markets",
        description: "Extend your reach beyond Liverpool through targeted search, engaging content, paid campaigns, and a converting website. A connected digital presence helps your business reach new audiences, build recognition in unfamiliar markets, and create opportunities across the UK and beyond.",
      },
    ],
    cta: home.ctas.enquire,
  },
  knowAbout: {
    heading: "Know About Liverpool",
    body: "Liverpool is a diverse business centre with a strong mix of commercial, professional, creative and technology-led activity. Liverpool City Centre serves as the city's commercial hub, while the Baltic Triangle is recognised for its creative and digital industries. The Knowledge Quarter brings together universities and businesses across science, healthcare and technology. RestoRefine serves Liverpool businesses across these markets, connecting branding, website development, content and marketing channels to their customer acquisition goals. The approach depends on whether a business needs to reach customers locally or across wider markets.",
    places: [
      { name: "City Centre", lat: 53.4075, lon: -2.9857, label: "top" },
      { name: "Baltic Triangle", lat: 53.3972, lon: -2.98, label: "left" },
      { name: "Knowledge Quarter", lat: 53.4053, lon: -2.9668, label: "right" },
    ],
    boundary: "Liverpool",
  },
  area: { name: "Liverpool", type: "City" as const },
};
