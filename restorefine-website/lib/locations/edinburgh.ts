/**
 * Edinburgh location page content (/growth-marketing-agency-edinburgh).
 *
 * Same shape as the London and Manchester pages: the homepage content with the
 * copy overridden, plus the location-only extras. Copy is from "Edinburgh Content.md".
 */

import { homeContent } from "@/lib/homepageData";
import type { LocationExtras } from "@/lib/locations/london";

const BASE_URL = "https://www.restorefine.co.uk";
const home = homeContent;

/** Keeps a homepage image by service id, so Edinburgh only overrides the copy */
const imageFor = (id: string) => [...home.services.core, ...home.services.more].find((s) => s.id === id)?.image ?? null;

export const edinburghContent = {
  ...home,
  meta: {
    title: "Growth Marketing Agency Edinburgh | RestoRefine",
    description: "RestoRefine is a growth marketing agency serving Edinburgh businesses with branding, websites, SEO, paid ads, content and CRM, replying within minutes.",
    canonical: `${BASE_URL}/growth-marketing-agency-edinburgh`,
  },
  hero: {
    heading: "Growth Marketing Agency Edinburgh",
    accent: "Growth",
    body: "RestoRefine is a Glasgow-based growth marketing agency serving businesses in Edinburgh. We connect strategy, branding, content, website development, SEO, paid advertising, social media and CRM around customer acquisition and commercial goals.",
    more: "Our work brings these activities into one plan based on each business's audience, priorities and current needs. Edinburgh businesses can use individual services or a connected approach to reach potential customers, improve conversion journeys and measure marketing performance.",
    badges: ["rating", "work", "roof"],
  },
  services: {
    heading: "Growth Marketing Services We Provide in Edinburgh",
    body: "Edinburgh businesses need different combinations of growth marketing services depending on their goals, current gaps and stage of development. RestoRefine connects creative strategy, digital marketing, websites and CRM to help businesses reach relevant audiences, manage leads and measure commercial results.",
    core: [
      {
        id: "branding",
        title: "Branding",
        tagline: "Make your difference recognisable.",
        description: "We shape your positioning, messaging, visual identity and creative direction to communicate what makes your business distinctive. By keeping your brand consistent across physical and digital touchpoints, we help create a clearer customer experience and a stronger foundation for growth.",
        items: ["Logo Design", "Brand Identity Development", "Brand Strategy"],
        image: imageFor("branding")!,
        href: "/services/brand",
      },
      {
        id: "design",
        title: "Design",
        tagline: "One brand, recognised everywhere.",
        description: "Consistent design helps customers recognise your business and experience a consistent brand presentation. Whether it’s menus, packaging and signage, or social media assets, print and merchandise, we create visuals that bring your brand to life across physical and digital touchpoints.",
        items: ["Menu Design", "Print Design", "Signage Design", "Packaging Design", "Social Media Design", "Merchandise Design"],
        image: imageFor("design")!,
        href: "/services/brand",
      },
      {
        id: "content",
        title: "Content",
        tagline: "Give your audience a reason to pay attention.",
        description: "From website copy and social storytelling to advertising campaigns and launch assets, we develop creative content around your audience and business goals. Every piece is designed to move beyond visibility, giving people a reason to engage, trust your business, and take the next step.",
        items: ["Content Strategy", "Photography", "Videography", "Short-Form Video"],
        image: imageFor("content")!,
        href: "/services/content",
      },
      {
        id: "seo",
        title: "SEO",
        tagline: "Reach customers searching for your services.",
        description: "We connect technical SEO, content, local search, Google Business Profile optimisation, and authority building to improve how your business appears across traditional search engines and AI-driven search experiences. By aligning visibility with tracking and conversion opportunities, we help turn relevant searches into meaningful business enquiries.",
        items: ["Local SEO", "AI SEO / AIO", "Generative Engine Optimisation (GEO)"],
        image: imageFor("seo")!,
        href: "/services/performance",
      },
      {
        id: "paid-ads",
        title: "Paid Ads",
        tagline: "Turn your budget into business growth.",
        description: "We plan, target and test paid campaigns across relevant platforms, using audience insights, creative and retargeting to reach potential customers. By connecting ads with landing pages, conversion tracking, and CRM, where required, we help businesses identify what drives sales and where to invest to grow revenue more efficiently.",
        items: ["Google Ads", "Meta Ads"],
        image: imageFor("paid-ads")!,
        href: "/services/performance",
      },
    ],
    more: [
      {
        id: "social",
        title: "Social Media Marketing",
        tagline: "From scrolling to choosing you.",
        description: "We plan and manage platform-specific content, publishing, campaigns, reporting, and community activity to keep your brand relevant and give audiences reasons to engage. By connecting social media with your wider marketing strategy, we build brand awareness, reach potential customers, and guide them towards enquiries and bookings.",
        image: imageFor("social"),
        href: "/services/content",
      },
      {
        id: "web",
        title: "Web Development",
        tagline: "Make your website work harder.",
        description: "We build responsive, UI/UX-friendly websites that guide visitors from their first website visit to an enquiry or booking. By aligning user journeys, site performance, CMS functionality, and conversion points, we help turn website visits into enquiries, bookings, and sales while supporting your wider marketing efforts.",
        image: imageFor("web"),
        href: "/services/performance",
      },
      {
        id: "crm",
        title: "CRM",
        tagline: "Turn customer data into stronger relationships.",
        description: "We help organise customer information, streamline lead handling, and build follow-up workflows that keep opportunities moving. By connecting CRM with marketing channels, segmentation and automation, we help businesses respond to leads more consistently, nurture prospects and strengthen customer retention.",
        image: imageFor("crm"),
        href: "/services/performance",
      },
      {
        id: "nfc",
        title: "NFC Smart Cards",
        tagline: "Connect in person. Continue digitally.",
        description: "RestoRefine’s NFC Smart Cards let people share key business details and digital profiles with a simple tap. Whether used for networking, sharing contact information, or directing customers to relevant online pages, our NFC smart cards make it easier to shift from an in-person interaction to a meaningful next step.",
        image: imageFor("nfc"),
        href: "/enquire-now",
      },
    ],
    cta: home.ctas.enquire,
  },
  process: {
    heading: "How Our Growth Agency Works With Edinburgh Businesses",
    lead: "Our approach is as simple as RESTO: a five-step process that takes you from the first conversation through strategy, delivery and performance tracking, keeping your business goals at the centre of every step.",
    steps: [
      {
        number: "01",
        title: "Reach Out",
        description: "Contact RestoRefine through the enquiry form or WhatsApp to share your business goals, current marketing challenges and the results you want to achieve. We'll review your needs and agree on the next step.",
      },
      {
        number: "02",
        title: "Evaluate",
        description: "We assess where your brand stands today, how your website and marketing are performing, and where there’s room to grow. For Edinburgh-focused projects, this can include relevant local search competition, customer demand and the wider market context.",
      },
      {
        number: "03",
        title: "Strategize",
        description: "We build a tailored plan around measurable goals, prioritising the right services, business outcomes and customers. For businesses targeting Edinburgh, we consider relevant audience needs and market conditions to shape priorities and next steps.",
      },
      {
        number: "04",
        title: "Transform",
        description: "We bring the plan to life, delivering the agreed work, whether branding, websites, content or marketing, with care, creativity and attention to detail.",
      },
      {
        number: "05",
        title: "Optimize",
        description: "We track agreed performance measures, report on results and identify where adjustments are needed. These findings guide changes to campaigns, content and other marketing activities as the project progresses.",
      },
    ],
    cta: home.ctas.enquire,
  },
  reviewsCta: { label: "Chat on WhatsApp", href: home.ctas.whatsapp.href },
  whyChoose: {
    ...home.whyChoose,
    heading: "Why Choose RestoRefine as Your Growth Marketing Agency in Edinburgh",
    body: "Based in Glasgow and serving Edinburgh businesses, RestoRefine combines founder-led project involvement, connected marketing delivery and performance reporting. Our approach gives businesses direct communication, coordinated execution and clearer visibility into how marketing activity contributes to commercial goals.",
    items: [
      {
        id: "roi",
        title: "ROI-Focused Marketing",
        description: "Our marketing activity is planned around agreed business outcomes, from qualified enquiries and bookings to customer acquisition. This keeps attention on the commercial execution of your marketing, not just surface metrics such as clicks or impressions.",
      },
      {
        id: "connected-growth-systems",
        title: "Connected Growth Systems",
        description: "Our connected approach to growth helps reduce gaps between marketing activity and customer experience. We create a clearer path from first interaction to conversion and repeat business, while aligning each part of the customer journey.",
      },
      {
        id: "founder-led",
        title: "Founder-Led Projects",
        description: "With founder involvement throughout client projects, we bring senior input to strategic decisions and key execution stages. This direct involvement keeps work aligned with business priorities and ensures decisions are made with the wider growth objectives.",
      },
      {
        id: "response",
        title: "Response Within Minutes",
        description: "RestoRefine aims to respond to enquiries within minutes, helping businesses get conversations started without unnecessary delays. From the first point of contact, we prioritise clear, direct communication and a straightforward next step.",
      },
      {
        id: "rating",
        title: "5-Star Google Rating",
        description: "Our 5.0-star Google rating reflects positive client feedback on our creative work, communication and service. This provides an additional layer of trust and confidence for Edinburgh businesses considering working with us.",
      },
      {
        id: "case-studies",
        title: "Real Client Case Studies",
        description: "Review RestoRefine’s client case studies to see examples of delivered work, the challenges addressed, and the outcomes achieved where documented for a clearer picture of how our approach translates into practical work for real businesses.",
      },
      {
        id: "reporting",
        title: "Transparent Reporting",
        description: "We provide clear updates on marketing activity, performance against agreed goals, and the reasoning behind recommended next steps. You can see what has been done, what the results indicate, and where we recommend focusing attention next.",
      },
    ],
    closing: "",
  },
  industries: {
    heading: "Industries We Serve in Edinburgh",
    body: "Growth looks different for every business. RestoRefine adapts its approach to the way customers become aware of, evaluate and choose businesses across Edinburgh, connecting marketing activity to the decisions that drive visits, bookings, purchases, and enquiries.",
    items: [
      {
        title: "Hospitality & Restaurants",
        description: "From menus and signage to food photography, local search and content, every touchpoint shapes how diners perceive your venue before they arrive. We help Edinburgh restaurants, cafés, pubs and hospitality venues communicate their atmosphere, showcase their offering and give potential customers a reason to book a table.",
        image: home.industries.items[0].image,
      },
      {
        title: "Sport & Leisure",
        description: "Growth for gyms, fitness studios, sports clubs and leisure venues in Edinburgh depends on attracting new participants and encouraging existing customers to return. We connect launch campaigns, membership & booking journeys, and ongoing content to help turn interest into sign-ups and encourage continued participation.",
        image: home.industries.items[1].image,
      },
      {
        title: "Lifestyle Brands",
        description: "For founder-led lifestyle brands in Edinburgh, the challenge is to make products distinctive in a crowded market and carry that identity through to purchase. We align brand identity, product storytelling, website experience, and campaigns to show customers what makes the brand distinctive and guide them towards a purchase.",
        image: home.industries.items[2].image,
      },
      {
        title: "Professional Services",
        description: "Consultancies and professional-service firms need to communicate their capabilities clearly before prospective clients make contact. We connect clear messaging, credible websites, search visibility and relevant content to help Edinburgh services reach prospective clients and generate qualified enquiries",
        image: home.industries.items[3].image,
      },
    ],
  },
  businesses: {
    heading: "Businesses We Work With in Edinburgh",
    body: "A business preparing to launch needs a different approach from one building momentum or refining an established operation. RestoRefine adapts its growth framework to your business’ current stage, priorities and next growth objective.",
    items: [
      {
        title: "New Businesses",
        description: "A new business needs more than a logo and a website; it needs a clear reason for customers to pay attention. From initial positioning to launch, we help new Edinburgh businesses coordinate branding, website development, content and marketing activity so they can introduce their offer clearly and build early visibility with the right audience.",
      },
      {
        title: "Growing Businesses",
        description: "As demand grows, businesses in Edinburgh may need stronger visibility, more consistent customer acquisition, or specialist support beyond their in-house capacity. We help identify gaps in your marketing, strengthen customer acquisition, and connect channels so more of your activity contributes to commercial growth.",
      },
      {
        title: "Established Businesses",
        description: "When commercial priorities change, an established brand, website, or marketing system may no longer serve its needs. We help Edinburgh businesses reassess their positioning, modernise key digital touchpoints, and uncover opportunities to improve acquisition, conversion, and customer retention, while keeping marketing efforts aligned.",
      },
    ],
  },
  resources: {
    ...home.resources,
    heading: "Growth And Marketing Resources",
    body: "Review common questions about growth marketing in Edinburgh, relevant RestoRefine articles and verified client work to support your agency selection.",
  },
  faqs: {
    heading: "FAQ",
    items: [
      {
        question: "How Much Does a Growth Marketing Agency in Edinburgh Cost?",
        answer: [
          "There is no single fixed price for a growth marketing agency in Edinburgh. Costs depend on your business goals, required services, project complexity, and whether you need a one-off project or ongoing support. We advise requesting a proposal outlining deliverables, fees, and any additional costs so you can assess the investment against your priorities.",
        ],
      },
      {
        question: "How Is a Growth Marketing Agency Different From a Digital Marketing Agency in Edinburgh?",
        answer: [
          "A growth marketing agency typically looks across the customer journey, connecting acquisition with website conversion, retention, and performance measurement to identify opportunities across the business. A digital marketing agency may focus more narrowly on executing digital channels, covering activities such as SEO, paid advertising, and content. However, the distinction depends on each agency's services and working approach, so compare actual capabilities rather than relying on the label alone.",
        ],
      },
      {
        question: "Can a Growth Marketing Agency Work With an Existing In-House Marketing Team?",
        answer: [
          "Yes. An Edinburgh business with an in-house marketing team can work with an agency to fill specialist skills gaps, increase delivery capacity or support projects that require additional expertise. For example, your team might manage day-to-day marketing while an external agency supports paid campaigns, website development or CRM implementation. The arrangement can be tailored to your team's existing responsibilities, with clear ownership, shared priorities and agreed ways of measuring progress.",
        ],
      },
      {
        question: "When Should an Edinburgh Business Hire a Growth Marketing Agency?",
        answer: [
          "An Edinburgh business may benefit from external support when marketing channels operate separately, lead generation has stalled, or the team struggles to balance marketing with day-to-day operations. It can also be considered when a business wants to expand its customer base, launch a new service, or improve the return from existing marketing spend.",
        ],
      },
      {
        question: "Can a Growth Marketing Agency Help My Edinburgh Business Reach Customers Across the UK?",
        answer: [
          "A growth marketing agency can help Edinburgh businesses reach customers beyond the local market through search strategy, targeted advertising, content and website optimisation. The right approach depends on your audience, industry and expansion goals, whether you're targeting customers elsewhere in Scotland, across the UK or internationally.",
        ],
      },
      {
        question: "How Long Does It Take to See Results From Growth Marketing?",
        answer: [
          "The time taken to see results depends on your objectives, chosen channels, competition and starting point. Paid campaigns may generate initial traffic or enquiries relatively quickly, while SEO, content development and brand-building typically require sustained effort. An agency should establish realistic expectations, agree on meaningful performance indicators and review progress over time rather than promise a fixed timeframe.",
        ],
      },
      {
        question: "What Should an Edinburgh Business Look for When Choosing a Growth Marketing Agency?",
        answer: [
          "Look for an agency whose services and approach connect marketing activity to required business outcomes. Review relevant case studies, check independent reviews, and ask how performance will be measured and reported. Before committing, clarify the services included, which deliverables are included, how communication will operate, and whether fees cover a fixed project or ongoing support. Choose based on fit, transparency and the value of the proposed work, rather than location or price alone.",
        ],
      },
    ],
  },
  finalCta: {
    ...home.finalCta,
    heading: "Start Growing Your Business With RestoRefine",
    accent: "Growing",
    body: "Whether you're looking to attract more customers, improve conversions, or bring disconnected marketing efforts together, RestoRefine helps Edinburgh businesses turn growth challenges into actionable priorities. Based in Glasgow and serving businesses across Scotland, contact us to discuss your goals and the marketing support your business needs.",
    headingAsH2: true,
    ctas: home.ctas,
  },
};

/** Sections that only location pages have */
export const edinburghExtras: LocationExtras = {
  challenges: {
    heading: "Growth Marketing Challenges Edinburgh Businesses Face",
    body: "Edinburgh businesses can struggle to turn marketing activity into consistent commercial growth when their branding lacks clarity, channels work in isolation, or website visitors fail to convert. Without reliable tracking and connected follow-up systems, it can also be difficult to identify which efforts generate enquiries, bookings and sales.",
    items: [
      {
        title: "Pressure on Marketing Budgets",
        description: "Rising operating costs can leave Edinburgh businesses with less room for marketing experimentation. Unclear advertising returns, inconsistent performance, and difficulty attributing sales to specific activities can make marketing investment harder to evaluate.",
      },
      {
        title: "Fragmented Marketing Efforts",
        description: "When businesses assign agencies, tactics, and freelancers without a shared direction, they often end up with inconsistent messaging, duplicated effort, and disconnected campaigns. With responsibilities spread across different channels, it can also become harder to see how individual activities contribute to overall business goals.",
      },
      {
        title: "Limited In-House Marketing Capacity",
        description: "Some Edinburgh businesses lack the internal capacity to manage strategy, creative work, search, paid media, websites and performance measurement. When responsibilities exceed available staff time, campaigns and customer follow-ups may become inconsistent.",
      },
      {
        title: "Difficulty Proving Marketing ROI",
        description: "When marketing activity is not clearly linked to enquiries, bookings, sales, or other business outcomes, businesses could struggle to judge its commercial value. Incomplete tracking or inconsistent reporting can make it difficult to measure performance and prioritise where future investment should go.",
      },
      {
        title: "Reaching Customers Beyond Edinburgh",
        description: "For Edinburgh businesses looking to grow beyond their existing local audience, reaching customers across Scotland, the wider UK or new markets can present a challenge. Expanding reach to different audiences while maintaining local relevance can make growth more complex.",
      },
      {
        title: "Keeping Marketing Consistent",
        description: "For founders and small teams in Edinburgh, keeping marketing consistent alongside day-to-day operations can be difficult. Content, campaigns and customer follow-ups may become irregular as other business priorities take over, disrupting momentum across channels.",
      },
    ],
  },
  benefits: {
    heading: "Benefits of Growth Marketing for Edinburgh Businesses",
    body: "A connected growth marketing approach can help Edinburgh businesses align customer acquisition, conversion and retention around shared commercial goals. By bringing marketing activity, customer data and performance measurement together, businesses can make clearer decisions, identify opportunities and build more consistent paths to growth.",
    items: [
      {
        title: "Improve Marketing ROI",
        description: "Linking marketing activity to enquiries, bookings, sales and customer acquisition gives businesses a clearer view of their commercial contribution. This can also help identify which activities justify further investment and which may need to be reconsidered.",
      },
      {
        title: "Use Marketing Budgets More Efficiently",
        description: "When marketing budgets are limited, performance data and testing can help businesses identify which activities deserve greater investment. This makes it easier to prioritise stronger opportunities rather than spreading resources evenly across every channel.",
      },
      {
        title: "Generate Higher-Quality Leads",
        description: "When targeting, positioning, messaging, and campaigns work together, businesses can attract prospects whose needs better match their offer. This can lead to more relevant enquiries and a stronger fit between potential customers and the business.",
      },
      {
        title: "Increase Customer Retention",
        description: "Growth marketing extends beyond winning new customers. For businesses, consistent follow-ups, relevant content, timely communication, and CRM-led engagement can help maintain customer relationships and encourage repeat purchases, bookings, or referrals.",
      },
      {
        title: "Increase Customer Lifetime Value",
        description: "By nurturing customer relationships beyond the first purchase, businesses can create more opportunities for repeat business and referrals. Consistent engagement and relevant follow-ups can increase the value generated from existing customers over time.",
      },
      {
        title: "Reach New Markets",
        description: "For Edinburgh businesses looking to expand beyond their current market, clear positioning with search, website, paid campaigns, and content can help communicate the business's value to newer customers across Scotland, the wider UK, or internationally.",
      },
    ],
    cta: home.ctas.enquire,
  },
  knowAbout: {
    heading: "Know About Edinburgh",
    body: "Edinburgh's city centre includes professional services and visitor-facing businesses, while companies across the city also serve customers throughout Scotland and the wider UK. These businesses may need different marketing approaches depending on whether their goal is local bookings, qualified enquiries or wider sales. RestoRefine supports Edinburgh businesses with connected branding, content, websites and marketing channels aligned with their audiences and commercial goals.",
    places: [
      { name: "City Centre", lat: 55.9533, lon: -3.1883, label: "top" },
    ],
    boundary: "Edinburgh",
  },
  area: { name: "Edinburgh", type: "City" as const },
};
