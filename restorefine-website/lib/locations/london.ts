/**
 * London location page content (/growth-marketing-agency-london).
 *
 * Follows the homepage content shape so the same section components render
 * it. Anything not overridden here (images, case studies, review proof)
 * comes from the homepage content.
 *
 * Heading levels: hero H1, each section heading H2, each service / process
 * step / benefit / industry / FAQ question H3.
 */

import { homeContent } from "@/lib/homepageData";

const BASE_URL = "https://www.restorefine.co.uk";
const home = homeContent;

/** Keeps a homepage image by service id, so London only overrides the copy */
const imageFor = (id: string) => [...home.services.core, ...home.services.more].find((s) => s.id === id)?.image ?? null;

export const londonContent = {
  ...home,

  meta: {
    title: "Growth Marketing Agency London | RestoRefine",
    description:
      "RestoRefine is a growth marketing agency serving London businesses with branding, websites, SEO, paid ads, content and CRM to support enquiries and sales.",
    canonical: `${BASE_URL}/growth-marketing-agency-london`,
  },

  hero: {
    heading: "Growth Marketing Agency London",
    accent: "Growth",
    body: "RestoRefine is a growth marketing agency serving London businesses through connected branding, website development, content, SEO, paid advertising, social media and CRM. We align these services with commercial goals, from attracting relevant prospects to improving enquiries, bookings and sales.",
  },

  services: {
    heading: "Growth Marketing Services We Provide in London",
    body: "Whether you need to strengthen one part of your marketing or bring several areas together, RestoRefine helps London businesses choose the services that fit their goals and connect them into a more cohesive form of growth.",
    core: [
      {
        id: "branding",
        title: "Branding",
        tagline: "Give your brand a reason to be remembered.",
        description:
          "We bring positioning, messaging, and visual identity together to shape how people recognise and understand your business. From the way you communicate your value to the creative direction behind your brand, we make sure every element works towards helping you build recognition and stand out to the people you want to reach.",
        items: ["Logo Design", "Brand Strategy Development", "Brand Strategy"],
        image: imageFor("branding")!,
        href: "/services/brand",
      },
      {
        id: "design",
        title: "Design",
        tagline: "Bring your business to life in every detail.",
        description:
          "From menus and packaging to signage, print materials, social media assets, and merchandise, we create designs that carry your brand consistently across physical and digital spaces. By combining visual identity with practical purpose, each piece helps your business present itself with clarity and leave a stronger customer impression.",
        items: ["Menu Design", "Print Design", "Signage Design", "Packaging Design", "Social Media Design", "Merchandise Design"],
        image: imageFor("design")!,
        href: "/services/brand",
      },
      {
        id: "content",
        title: "Content",
        tagline: "Create content that earns attention.",
        description:
          "We start with strategies that help businesses communicate their purpose across websites, social media, advertising, and campaigns. From photography and videography to platform-ready formats, like short-form video, we shape content around your goals and give people more reasons to engage with your brand.",
        items: ["Content Strategy", "Photography", "Videography", "Short-Form Video"],
        image: imageFor("content")!,
        href: "/services/content",
      },
      {
        id: "seo",
        title: "SEO",
        tagline: "Help the right customers find you.",
        description:
          "We bring technical SEO, helpful content, and authority-building together to strengthen your visibility across search engines, local results, and AI-driven discovery. We focus on making your business easier to find and choose by reaching customers searching for services across London and turning website visits into enquiries.",
        items: ["On-Page SEO", "Technical SEO", "Local SEO & GBP Optimisation", "AI Search Optimisation (AEO/GEO)"],
        image: imageFor("seo")!,
        href: "/services/performance",
      },
      {
        id: "paid-ads",
        title: "Paid Ads",
        tagline: "Put your budget where it matters.",
        description:
          "We plan and manage targeted advertising campaigns that connect your business with the right customers across London. Through testing, retargeting, and conversion tracking across Google Ads and Meta Ads, we measure what’s working, identify improvements, and keep your campaigns aligned with your business growth goals.",
        items: ["Google Ads", "Meta Ads"],
        image: imageFor("paid-ads")!,
        href: "/services/performance",
      },
    ],
    more: [
      {
        id: "social",
        title: "Social Media Marketing",
        tagline: "Build an engaging social presence.",
        description:
          "We combine content planning and platform-specific creative with consistent publishing to help your business stay relevant and connected with its audience. From scheduling posts and managing community interactions to executing campaigns and tracking performance, we turn social media activity into meaningful engagement and growth opportunities.",
        image: imageFor("social"),
        href: "/services/content",
      },
      {
        id: "web",
        title: "Web Development",
        tagline: "Turn your website into a better customer experience.",
        description:
          "We create responsive, user-focused websites that make it easier for customers to take the next step. From intuitive UX and CMS development to better site performance and clear enquiry/booking journeys, we connect your website with your wider marketing efforts to turn customer interest into meaningful action.",
        image: imageFor("web"),
        href: "/services/performance",
      },
      {
        id: "crm",
        title: "CRM",
        tagline: "Make every customer interaction count.",
        description:
          "We help you bring customer information, lead management, and follow-ups into a more organised system. Whether it’s segmentation, retention workflows, integrations, or marketing automation, we make it easier to manage opportunities, improve customer acquisition, and build stronger relationships that encourage repeat business.",
        image: imageFor("crm"),
        href: "/services/performance",
      },
      {
        id: "nfc",
        title: "NFC Smart Cards",
        tagline: "Share your details with a simple tap.",
        description:
          "Our NFC Smart Cards let you share your contact details by tapping the card against a compatible smartphone. Whether you're networking, meeting prospective clients, or making business introductions, you can share your business details conveniently and make it easier for people to connect with you.",
        image: imageFor("nfc"),
        href: "/enquire-now",
      },
    ],
    cta: home.ctas.enquire,
  },

  process: {
    heading: "How Our Growth Agency Works",
    lead: "Our approach is as simple as RESTO: a five-step process that takes you from the first conversation through strategy, delivery and performance tracking, keeping your business goals at the centre of every step.",
    steps: [
      {
        number: "01",
        title: "Reach Out",
        description:
          "Get in touch to tell us about your business, your goals, and what you need help with. We’ll listen, ask the right questions and understand what success looks like for you.",
      },
      {
        number: "02",
        title: "Evaluate",
        description:
          "We assess where your brand stands today, how your website and marketing are performing, and where there’s room to grow. For London-focused projects, this includes relevant local search competition and customer demand.",
      },
      {
        number: "03",
        title: "Strategize",
        description:
          "We build a tailored plan around measurable goals, prioritising the right services, business outcomes and customers. For businesses in London, this includes researching the market conditions to shape the priorities and next steps.",
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
    heading: "Why Choose RestoRefine as Your Growth Marketing Agency in London",
    body: "Choosing the right growth marketing agency means finding a team that understands your goals and connects creative thinking with commercial strategy. RestoRefine brings branding, design, and other marketing initiatives together to help London businesses pursue growth with a clear direction and measurable outcomes.",
    items: [
      {
        id: "roi",
        title: "ROI-Focused Marketing",
        description:
          "We focus on the outcomes that matter to your business, from enquiries and bookings to sales. By tracking what drives results, we help you invest smarter, attract more customers, and build sustainable growth.",
      },
      {
        id: "response",
        title: "Quick and Clear Responses",
        description:
          "We value clear communication and timely support, responding to enquiries within an acceptable timeframe to help you get answers, discuss your goals, and keep projects moving forward.",
      },
      {
        id: "rating",
        title: "5-Star Google Rating",
        description:
          "See what our clients say about working with RestoRefine, from their experience with our team to how we communicate and manage projects and bring their ideas to life.",
      },
      {
        id: "one-roof",
        title: "All Services Under One Roof",
        description:
          "We manage branding, web development, content, and marketing through one team, reducing the time spent coordinating suppliers and helping your business move forward with fewer handovers in the busy London market.",
      },
      {
        id: "founder-led",
        title: "Founder-Led Projects",
        description:
          "Our founders stay involved in the planning, reviewing deliverables, and guiding the project decisions, so you get direct access to the people shaping your strategy and delivering the work.",
      },
      {
        id: "strategy",
        title: "Strategy-led Creative Work",
        description:
          "Every design, website, and campaign starts with your business goals at the core to ensure the creative decisions communicate your value, reach the right customers, and drive growth.",
      },
      {
        id: "case-studies",
        title: "Real Client Case Studies",
        description:
          "Explore RestoRefine's work for It's Padel, covering brand identity, website development, social media and video production, or Our HQ, covering content strategy, branded social media assets and photography guidelines. Each project shows the work delivered for a specific business requirement.",
      },
      {
        id: "reporting",
        title: "Transparent Reporting",
        description:
          "We let you know what work has been completed and how your marketing is performing, with clear reporting that helps you understand results and identify what to improve next.",
      },
    ],
    closing: "",
  },

  industries: {
    heading: "Industries We Serve in London",
    body: "We work with businesses across London’s hospitality, sport and leisure, lifestyle, and professional services sectors, tailoring our mix of branding, web development, content and marketing to each business’s goals, audience and customer journey.",
    items: [
      {
        title: "Hospitality & Restaurants",
        description:
          "For restaurants, cafés, takeaways and hospitality groups in London, we help strengthen their brand, showcase their menus and create a consistent customer experience. From venue launches and event promotions to local search visibility and social content, our work helps businesses attract nearby customers and turn interest into bookings and visits.",
        image: home.industries.items[0].image,
      },
      {
        title: "Sports & Leisure",
        description:
          "RestoRefine helps gyms, sports clubs, fitness studios and leisure venues promote launches, attract new members and drive bookings. From distinctive branding with engaging content to streamlined booking journeys, we help turn interest into visits, memberships and repeat participation.",
        image: home.industries.items[1].image,
      },
      {
        title: "Lifestyle Brands",
        description:
          "We support founder-led lifestyle brands in fashion, wellness and consumer products that turn their vision into a recognisable identity. From product photography and brand storytelling to e-commerce websites and targeted campaigns, we help them reach the right buyers, build demand and convert interest into sales.",
        image: home.industries.items[2].image,
      },
      {
        title: "Professional Services",
        description:
          "We assist consultancies, legal firms and professional service providers in building their credibility and presenting their expertise. Through polished websites, expert-led content, stronger SEO visibility and clear enquiry journeys, we help turn potential clients into qualified leads and paying customers.",
        image: home.industries.items[3].image,
      },
    ],
  },

  businesses: {
    heading: "Businesses We Work With in London",
    body: "Whether you're launching a new business, building momentum or refining an established operation, we tailor our approach to your stage of growth, helping you address current challenges and make the most of your next opportunity.",
    items: [
      {
        title: "New Businesses",
        description:
          "Get your business ready to launch with a clear brand identity, a professional website and focused marketing that helps you stand out in London's competitive market and reach your first customers.",
      },
      {
        title: "Emerging Businesses",
        description:
          "Capitalize on early momentum by addressing gaps in your marketing, generating more consistent enquiries and strengthening the execution channels that help your business reach the right customer bases.",
      },
      {
        title: "Established Businesses",
        description:
          "Refresh your brand, improve your digital experience and develop better campaigns to stay competitive, connect with new audiences and uncover growth opportunities in London's evolving market.",
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
        question: "How Much Does a Growth Marketing Agency in London Cost?",
        answer: [
          "The cost depends on the services you need, project scope, complexity and whether you require a one-off project or ongoing support. To get an accurate quote, you should share your business goals, priorities and requirements so the agency can recommend a suitable scope of work.",
        ],
      },
      {
        question: "How Is a Growth Marketing Agency Different From a Digital Marketing Agency in London?",
        answer: [
          "A digital marketing agency may focus primarily on online channels such as SEO, paid advertising and social media. A growth marketing agency takes a more connected approach, bringing branding, customer acquisition, website experience, content, CRM and performance measurement together where needed to support broader business growth. The difference also depends on each agency's capabilities and approach.",
        ],
      },
      {
        question: "Can a Growth Marketing Agency Work With an Existing In-House Marketing Team?",
        answer: [
          "Yes. A growth marketing agency can complement your internal team by providing specialist expertise, creative production, SEO, or any other missing initiatives. It can also provide additional delivery capacity to already-running campaigns. Both teams should define responsibilities, priorities and communication expectations upfront to ensure they are working towards the same goals.",
        ],
      },
      {
        question: "When Should a London Business Hire a Growth Marketing Agency?",
        answer: [
          "You should consider hiring one when launching a business, struggling to generate consistent leads, reaching the limits of your internal team's capacity or managing disconnected marketing suppliers. An agency can help identify priorities, coordinate the right activities and address gaps that are holding back customer acquisition or sales.",
        ],
      },
      {
        question: "What Should a London Business Look for When Choosing a Growth Marketing Agency?",
        answer: [
          "Look for services that match your needs, relevant case studies, credible client reviews and clear reporting tied to business goals. You should also ask about who will manage your work, how progress will be measured, which services are included and what the fees cover. Choose a team whose approach, communication and scope fit your business, not just listening to their promise of big results.",
        ],
      },
      {
        question: "How Long Does It Take to See Results From Growth Marketing?",
        answer: [
          "Timelines depend on your goals, starting point, competition and the channels involved. Paid campaigns can generate initial data and enquiries relatively quickly, while SEO, brand building and organic content typically take longer to gain traction. Your agency should set realistic milestones, track performance and adjust the strategy as results emerge.",
        ],
      },
    ],
  },

  finalCta: {
    ...home.finalCta,
    heading: "Start Growing Your Business With RestoRefine",
    accent: "Growing",
    body: "Ready to take your business to the next level? Enquire today to discuss your goals and discover how RestoRefine can help you find opportunities, attract more customers, and build lasting growth for your business.",
    headingAsH2: true,
    ctas: home.ctas,
  },
};

/** Sections that only location pages have */
export const londonExtras = {
  benefits: {
    heading: "Benefits of Growth Marketing for London Businesses",
    body: "In a market as competitive as London, attracting attention is only part of the challenge. Your brand needs to stand out, reach the right customers, and turn interest into lasting business relationships. A connected growth marketing approach brings these priorities together, so each activity contributes to a clearer commercial goal.",
    items: [
      {
        title: "Build Brand Recognition",
        description:
          "Make your business easier to recognise across the touchpoints where customers discover and compare brands. A consistent presence gives you a better chance of earning consideration, building trust, and being remembered when they’re ready to buy.",
      },
      {
        title: "Increase Online Visibility",
        description:
          "Reach more potential customers across London when they browse for relevant products or services. Greater visibility puts your business in front of more qualified prospects, creating more opportunities to generate enquiries, win customers and grow revenue.",
      },
      {
        title: "Generate More Enquiries, Bookings and Sales",
        description:
          "Turn customer interest into meaningful business opportunities with marketing that guides people towards taking action. From first click to final enquiry, booking or purchase, create clearer user journeys that move prospects closer to becoming paying customers.",
      },
      {
        title: "Improve Customer Acquisition",
        description:
          "Reach the right prospects by aligning your marketing channels around the customer journey. Acquire customers more effectively, build a stronger sales pipeline, and create a more sustainable foundation for business growth with a coordinated approach.",
      },
      {
        title: "Improve Conversion and Customer Retention",
        description:
          "Make it easier for potential customers to take the next step, while giving existing customers reasons to return. By reducing the user journey friction and maintaining relevant follow-ups, you can make better use of your marketing investment, encourage repeat business, and build sustainable revenue.",
      },
      {
        title: "Track Marketing Performance",
        description:
          "See which marketing activities bring in valuable enquiries and paying customers and which need improvement. Use these insights to refine your campaigns, redirect your budget towards what works, and make smarter decisions about your next growth opportunities.",
      },
    ],
    cta: home.ctas.enquire,
  },

  knowAbout: {
    heading: "Know About London",
    body: "London brings together businesses across finance, professional services, hospitality, retail and creative industries, each competing for attention in a fast-moving market. From the established commercial centres of the City and Canary Wharf to the creative communities of Shoreditch and the West End, London’s diverse markets demand more than disconnected marketing tactics. RestoRefine brings strategy, branding and digital marketing together to help businesses stand out, attract the right customers and turn attention into measurable growth.",
    /** Pinned on the London map; `label` is the side the name sits on */
    places: [
      { name: "The City", lat: 51.5155, lon: -0.0922, label: "bottom" },
      { name: "Shoreditch", lat: 51.5265, lon: -0.0798, label: "top" },
      { name: "West End", lat: 51.5136, lon: -0.1365, label: "left" },
      { name: "Canary Wharf", lat: 51.5054, lon: -0.0235, label: "right" },
    ] as { name: string; lat: number; lon: number; label: "top" | "bottom" | "left" | "right" }[],
    /** Key into AREA_PATHS for the boundary outline */
    boundary: "London",
  },

  /** Schema.org place this page targets */
  area: { name: "London", type: "City" as const },
};

type Section = { heading: string; body: string; items: { title: string; description: string }[] };

/** Every location page's extras; `challenges` is only on pages whose brief has it */
export type LocationExtras = Omit<typeof londonExtras, "area"> & {
  challenges?: Section;
  /** Schema.org place the page targets: a city, or a whole country (Scotland) */
  area: { name: string; type: "City" | "Country" };
};
