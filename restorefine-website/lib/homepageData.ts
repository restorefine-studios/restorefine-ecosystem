/**
 * Homepage content. Every string rendered on the homepage lives here so copy
 * can be changed without touching the section components in blocks/home.
 *
 * `accent` (where present) is a word inside the heading that is set in the
 * Holiday script face. It must appear verbatim in the heading text.
 */

export const WHATSAPP_HREF = `https://wa.me/441414835850?text=${encodeURIComponent("Hi RestoRefine Studios, I'd like to find out more about your services.")}`;

export const homeContent = {
  meta: {
    title: "Growth Marketing Agency UK | RestoRefine",
    description:
      "RestoRefine is a 5-star-rated UK growth marketing agency offering branding, websites, print, SEO and paid ads, all under one roof, replying in minutes.",
    canonical: "https://www.restorefine.co.uk",
  },

  ctas: {
    enquire: { label: "Enquire Now", href: "/enquire-now" },
    whatsapp: { label: "Chat on WhatsApp", href: WHATSAPP_HREF },
  },

  hero: {
    heading: "Growth Marketing Agency",
    accent: "Growth",
    body: "RestoRefine is a Glasgow-based growth marketing agency serving businesses across the UK. We bring brand strategy, creative design, SEO, paid advertising, and web development together to help businesses reach customers, generate enquiries, and support growth.",
  },

  intro: {
    heading: "#1 Growth Marketing Agency in the UK",
    /** Part of the heading shown in red; the heading text itself is unchanged */
    highlight: "#1",
    body: [
      "Marketing becomes less effective when branding, websites and campaigns work towards different objectives. RestoRefine brings these activities together through coordinated planning, creative work and performance marketing, helping businesses build a consistent customer experience from first contact through to enquiry.",
      "Founded in June 2024, our Glasgow-based studio works with startups, SMEs and larger companies at different stages of growth across Scotland and the UK to help them uncover growth opportunities, bring fresh perspectives to complex challenges, and create meaningful commercial impact.",
    ],
    image: { src: "/companyhuddle.webp", alt: "The RestoRefine team planning a client project in the Glasgow studio" },
  },

  services: {
    heading: "Growth Marketing Services We Provide",
    body: "We believe that sustainable growth isn't built through isolated efforts. Every business has different needs based on its goals and growth stage. By bringing branding, content, and performance together, we offer individual services & connected solutions to support businesses from initial setup and launch through to ongoing development.",
    /** Services with a list of sub-services, shown in the main index */
    core: [
      {
        id: "branding",
        title: "Branding",
        tagline: "Build a business people remember.",
        description:
          "A strong brand does more than just look good. It also builds recognition, earns trust, and strengthens every marketing effort. From brand positioning and messaging to visual identity and creative direction, we create recognisable brands that connect with your audience and grow with your business.",
        items: ["Logo Design", "Brand Identity Development", "Brand Strategy"],
        image: { src: "/services-brand.jpg", alt: "Brand identity stationery with logo, business cards and typography" },
        href: "/services/brand",
      },
      {
        id: "design",
        title: "Design",
        tagline: "Make your brand instantly recognisable.",
        description:
          "We apply your brand identity across the materials customers see and interact with. From menus and packaging to signage, printed materials and social media graphics, our design work keeps your business visually consistent across physical and digital touchpoints.",
        items: ["Menu Design", "Print Design", "Signage Design", "Packaging Design", "Social Media Design", "Merchandise Design"],
        image: { src: "/clients/spudkingz-bg.png", alt: "Spud Kingz shopfront signage designed by RestoRefine" },
        href: "/services/brand",
      },
      {
        id: "content",
        title: "Content",
        tagline: "Create value before you ask for attention.",
        description:
          "We combine content strategy with photography, videography and short-form production to create engaging assets for your website, social channels, campaigns and other marketing touchpoints. Every asset is shaped around your brand, audience and communication goals.",
        items: ["Content Strategy", "Photography", "Videography", "Short-form Content"],
        image: { src: "/services-content.jpg", alt: "Phone filming a restaurant table for short-form social content" },
        href: "/services/content",
      },
      {
        id: "seo",
        title: "SEO",
        tagline: "Get Found Where Your Customers Are Looking.",
        description:
          "SEO helps customers discover your business when they're looking for answers, services, or solutions. We improve your visibility across Google, local Maps, and emerging AI-driven discovery platforms through GBP optimisation, technical improvements, content optimisation, and authority building. By connecting visibility with tracking and conversion insights, we help turn searches into meaningful business opportunities.",
        items: ["On-Page SEO", "Technical SEO", "Local SEO", "AI Search Optimisation (AEO/GEO)"],
        image: { src: "/services/media/pexels-pixabay-262438.webp", alt: "Dart in the bullseye, representing customers finding the right business" },
        href: "/services/performance",
      },
      {
        id: "paid-ads",
        title: "Paid Ads",
        tagline: "Reach the Customers Who Matter the Most",
        description:
          "RestoRefine plans and manages Google Ads and Meta advertising campaigns around customer acquisition and business objectives. We work on audience targeting, ad creative, campaign testing and conversion tracking, using performance data to guide ongoing improvements.",
        items: ["Google Ads", "Meta Ads"],
        image: { src: "/services-performance.jpg", alt: "Rising performance chart for a paid advertising campaign" },
        href: "/services/performance",
      },
    ],
    /** Standalone services without sub-service lists, shown as tiles */
    more: [
      {
        id: "social",
        title: "Social Media Marketing",
        tagline: "Create A Recognisable Social Presence",
        description:
          "A strong social presence takes more than posting occasionally. We help manage your social platforms through content scheduling & ongoing optimization, publishing, performance reporting, and community engagement, keeping your brand active and connected with its audience.",
        image: { src: "/restomedia-photography.webp", alt: "Food photography created for a restaurant's social channels" },
        href: "/services/content",
      },
      {
        id: "web",
        title: "Web Development",
        tagline: "Build Websites that Reflect Your Business",
        description:
          "Your website should do more than tell people what your business does. It should reflect your brand, guide visitors towards the right information, and make taking the next step easy. We create responsive, user-focused websites around your business goals with thoughtful UX, CMS integration, performance, and clear conversion journeys to turn a better digital experience into meaningful action.",
        image: { src: "/clients/quiknest-bg.png", alt: "Quiknest app shown on a smartphone" },
        href: "/services/performance",
      },
      {
        id: "crm",
        title: "CRM and Automation",
        tagline: "Turn customer connections into lasting relationships.",
        description:
          "We help businesses organise customer records, manage incoming leads and automate relevant follow-up activities. Depending on the agreed setup, this can include customer segmentation, enquiry tracking, automated communications and retention workflows.",
        image: null,
        href: "/services/performance",
      },
      {
        id: "nfc",
        title: "NFC Smart Cards",
        tagline: "Make every introduction count.",
        description:
          "Turn a simple introduction into an easy way to connect. RestoRefine's NFC smart cards let you share your digital contact details with a tap on a compatible smartphone, making it easier for people to save your information and stay connected beyond the first meeting.",
        image: { src: "/nfc-card-mkp-u1.webp", alt: "RestoRefine NFC smart business cards" },
        href: "/enquire-now",
      },
    ],
    cta: { label: "Enquire Now", href: "/enquire-now" },
  },

  industries: {
    heading: "Industries We Serve",
    body: "Every industry has different customers, challenges and growth goals. Our Connected Growth Framework brings strategy, branding, marketing and digital experiences together to meet each business's needs.",
    items: [
      {
        title: "Hospitality & Restaurants",
        description:
          "We support restaurants, cafés, takeaways and hospitality groups with branding, menu design, food photography and promotional content. Our work can support new venue launches, communicate food and service offerings, promote special events and help businesses attract local customers.",
        image: { src: "/clients/spudkingz-bg.png", alt: "Spud Kingz restaurant exterior" },
      },
      {
        title: "Sport & Leisure",
        description:
          "We help sport and leisure businesses build distinctive brands and connect with their audiences, from launching new venues and promoting facilities to driving awareness of activities, events and memberships. Our branding, digital and marketing support helps businesses attract visitors and stay visible beyond launch day.",
        image: { src: "/clients/itspadel-bg.png", alt: "It's Padel branded padel rackets on court" },
      },
      {
        title: "Lifestyle Brands",
        description:
          "We help lifestyle brands communicate what makes them distinctive, from shaping a founder's vision into a clear brand identity to creating content and marketing that resonates with their target audience. Whether launching a new product or strengthening an established presence, we help keep the brand consistent across customer touchpoints.",
        image: { src: "/clients/masalamoves-bg.png", alt: "Masala Moves dance studio branding" },
      },
      {
        title: "Professional Services",
        description:
          "We help professional service businesses create and make their value clear to potential clients. Through consistent branding, effective website experiences and targeted marketing, we help communicate expertise, build trust and make it easier for prospective customers to enquire.",
        image: { src: "/clients/ourhq-bg.png", alt: "Our HQ office space branding" },
      },
    ],
  },

  businesses: {
    heading: "Businesses We Work With",
    body: "Whether your business is just a day-old venture or an established brand looking for a new direction, RestoRefine adapts its support to your goals, priorities, and stage of growth.",
    items: [
      {
        title: "New Business",
        description:
          "Getting a new business ready for market means putting the right foundations in place. We help you establish your initial brand identity, prepare your website and plan your first marketing activities so you can launch with clarity and consistency.",
      },
      {
        title: "Growing Business",
        description:
          "A growing business can invite inconsistent marketing and harder to identify opportunities. We help strengthen your existing funnels, improve lead generation and uncover opportunities to build more consistent growth channels for your business.",
      },
      {
        title: "Established Business",
        description:
          "Businesses need to evolve to stay relevant and competitive. Whether you're refreshing your brand, improving your website, launching new campaigns or refining existing systems, we help align your business with its changing goals and customer expectations.",
      },
    ],
  },

  process: {
    heading: "How Our Growth Agency Works",
    lead: "Our service is as simple as RESTO.",
    steps: [
      {
        number: "01",
        title: "Research",
        description:
          "We start by learning about your business, your customers, and your goals. We ask the right questions and research your market to understand what success looks like for you.",
      },
      {
        number: "02",
        title: "Evaluate",
        description:
          "We assess where your brand stands today, what your competitors are doing, and where there’s room for your business to grow more.",
      },
      {
        number: "03",
        title: "Strategise",
        description:
          "We build a tailored plan around measurable goals, prioritising the right services, business outcomes and customers, as well as outlining the next steps.",
      },
      {
        number: "04",
        title: "Transform",
        description:
          "We bring the plan to life, delivering the agreed work, whether branding, websites, content or marketing, with care, creativity and attention to detail.",
      },
      {
        number: "05",
        title: "Optimise",
        description:
          "We track the results and report our performance to review what’s working, identify what can improve, and refine our approach to help you get more from your investment.",
      },
    ],
    cta: { label: "Enquire Now", href: "/enquire-now" },
  },

  whyChoose: {
    heading: "Why choose RestoRefine as your UK Growth Agency?",
    body: "We believe that growth doesn't come from doing more. It comes from doing the right things, in the right order, with every part of your business moving in the same direction.",
    items: [
      {
        id: "roi",
        title: "ROI-Focused Marketing",
        description:
          "Marketing activity should guide business objectives, not just clicks or views. Where tracking allows, we measure performance against agreed goals to help make better decisions.",
      },
      {
        id: "response",
        title: "Response Within Minutes",
        description:
          "Good projects depend on clear communication. We aim to make it easy to get in touch, discuss your needs, and understand the next steps for your business growth.",
      },
      {
        id: "rating",
        title: "5-Star Google Rating",
        description:
          "Hear directly from our clients about their experience working with RestoRefine. Gain a firsthand perspective on how we approach, communicate, and deliver client projects.",
      },
      {
        id: "one-roof",
        title: "All Services Under One Roof",
        description:
          "Managing multiple suppliers can make it harder to keep everything aligned. By connecting relevant services under one roof, we help create a more coordinated approach across branding, content, websites, and marketing.",
      },
      {
        id: "founder-led",
        title: "Founder-Led Projects",
        description:
          "Our founders believe in being directly involved in projects, as clients benefit from closer communication with the people shaping the business's direction. This helps keep the original vision and project objectives in focus throughout delivery.",
      },
      {
        id: "strategy",
        title: "Strategy-Led Creative Work",
        tagline: "Creative decisions with a clear purpose.",
        description:
          "Whether it’s attracting a new audience or generating more enquiries for your new product, we shape messaging, design and campaigns around the outcome your business wants to achieve.",
      },
      {
        id: "case-studies",
        title: "Real Client Case Studies",
        description:
          "Explore our client projects to see the thinking, creative work, and deliverables behind the success stories. We also share the evidence to show what our work achieved and where the results have been measured.",
      },
      {
        id: "reporting",
        title: "Transparent Reporting",
        description:
          "Clear reporting helps you understand what has been delivered, how activity is performing, and where improvements may be needed. We make sure to communicate progress as outlined in planning for each engagement.",
      },
    ],
    closing: "Sustainable growth isn't built through disconnected services. It's built through connected thinking.",
    founderImage: { src: "/staffportrait_rohit.webp", alt: "RestoRefine co-founder" },
    /** Real proof shown inside the bento tiles. Quotes are verbatim excerpts from Google reviews. */
    proof: {
      reviews: [
        { quote: "Huge thanks to the team at Resto Refine for helping with the branding for my dance classes.", name: "Luna Shree Nepal", business: "Masala Moves" },
        { quote: "Huge thanks to Rohit and his team for the outstanding work on our website.", name: "Zaher Yassin", business: "Google Local Guide" },
        { quote: "Resto Refine did amazing job for our BigBites takeaway in Glasgow…", name: "Big Bites", business: "Glasgow" },
      ],
      founders: [
        { src: "/staffportrait_rohit.webp", alt: "Rohit Acharya, RestoRefine co-founder" },
        { src: "/staffportrait_hapreet.webp", alt: "Harpreet Singh, RestoRefine co-founder" },
      ],
      roiImage: { src: "/services-performance.jpg", alt: "Rising performance chart" },
      reportingImage: { src: "/revenuechart.svg", alt: "Monthly performance report chart" },
    },
  },

  reviewsCta: { label: "Chat On WhatsApp", href: WHATSAPP_HREF },

  areas: {
    heading: "Areas We Serve Across the UK",
    body: [
      "Based in Glasgow, RestoRefine works with businesses across the city and surrounding areas, including East Kilbride and Ayr. We support businesses throughout Scotland, helping them align their growth journey around their goals.",
      "We ensure that our services can reach across the UK too. We work with businesses in cities across the UK, including, but not limited to, Manchester, Liverpool, Birmingham and London, bringing our connected approach to businesses wherever they're located.",
    ],
    /**
     * Set `href` once a location landing page exists and the name becomes an
     * internal link. `lat`/`lon` place the pin on the map; `label` is the side
     * the name sits on. The `hub` location is where connection lines start.
     */
    groups: [
      {
        title: "Scotland",
        locations: [
          { name: "Glasgow", href: "/growth-marketing-agency-glasgow" as string | null, lat: 55.8642, lon: -4.2518, label: "left", hub: true },
          { name: "East Kilbride", href: null as string | null, lat: 55.7644, lon: -4.1769, label: "right", hub: false },
          { name: "Ayr", href: null as string | null, lat: 55.4586, lon: -4.6292, label: "left", hub: false },
        ],
      },
      {
        title: "UK",
        locations: [
          { name: "Manchester", href: "/growth-marketing-agency-manchester" as string | null, lat: 53.4808, lon: -2.2426, label: "right", hub: false },
          { name: "Liverpool", href: "/growth-marketing-agency-liverpool" as string | null, lat: 53.4084, lon: -2.9916, label: "left", hub: false },
          { name: "Birmingham", href: "/growth-marketing-agency-birmingham" as string | null, lat: 52.4862, lon: -1.8904, label: "right", hub: false },
          { name: "London", href: "/growth-marketing-agency-london" as string | null, lat: 51.5074, lon: -0.1278, label: "right", hub: false },
        ],
      },
    ],
  },

  resources: {
    heading: "Growth And Marketing Resources",
    body: "Explore our latest insights, portfolios, and perspectives on branding, marketing, and business growth to help you make more informed decisions.",
    tiles: {
      blogs: { label: "Blogs", href: "/resources" },
      caseStudies: { label: "Case Studies", href: "/portfolio" },
    },
  },

  finalCta: {
    heading: "Ready to Build What's Next?",
    accent: "Next?",
    body: "Tell us about your business, the challenges you're facing and what you want to achieve. Our team will review your enquiry and discuss the services and next steps relevant to your project.",
    submitLabel: "Start the Conversation",
    form: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      company: "Business name",
      message: "Tell us about your project",
      success: "Thanks, your enquiry is in. We'll be in touch shortly.",
      error: "Something went wrong. Please try again or chat with us on WhatsApp.",
    },
  },

  faqs: {
    heading: "Frequently Asked Questions",
    items: [
      {
        question: "What Is a Growth Agency?",
        answer: [
          "A growth agency brings together strategy, branding, websites, content, and marketing to help businesses attract customers and grow. Rather than treating each activity separately, it connects them around business goals to create a consistent customer experience and a clearer path from discovery to action.",
        ],
      },
      {
        question: "How Is Growth Marketing Different From Traditional Marketing?",
        answer: [
          "Traditional marketing often focuses on awareness, promotion and individual campaigns. Growth marketing takes a broader, measurable approach to customer acquisition, conversion and retention. It uses performance data, testing and customer insights to identify opportunities and improve results over time. Both approaches can use the same marketing channels, but growth marketing places greater emphasis on measurable outcomes and continuous improvement.",
        ],
      },
      {
        question: "What Are the Benefits of Working With a Growth Agency?",
        answer: [
          "Working with a growth agency can help you coordinate marketing activities, strengthen your brand, attract relevant customers and identify opportunities to improve performance. Bringing strategy and execution together can also make it easier to prioritise your budget and measure progress against business goals.",
        ],
      },
      {
        question: "How Do I Choose the Right Growth Agency?",
        answer: [
          "Look for an agency that understands your business goals and can explain how its approach will help you achieve them. Before committing, consider:",
        ],
        list: [
          { label: "Relevant experience:", text: "Review case studies and client feedback." },
          { label: "Strategic approach:", text: "Check whether the agency understands your audience and objectives before recommending services." },
          { label: "Service delivery:", text: "Clarify which services are handled in-house and which involve external partners." },
          { label: "Measurement:", text: "Ask how progress and performance are tracked and reported." },
          { label: "Communication:", text: "Agree on who you'll work with and how updates will be handled." },
          { label: "Scope and cost:", text: "Make sure deliverables, responsibilities, and fees are clear before work begins." },
        ],
      },
      {
        question: "How Much Does Growth Marketing Cost at RestoRefine?",
        answer: [
          "The cost depends on the services you need and the scope and complexity of the work. It can also vary depending on whether you're commissioning a one-off project or ongoing support. A branding project, for example, will have different requirements from a social media marketing programme. Contact RestoRefine to discuss your goals and requirements so we can provide a tailored quote.",
        ],
      },
      {
        question: "How Long Does Growth Marketing Take to Show Results?",
        answer: [
          "There is no fixed timeframe for growth marketing results. It depends on your starting position, competition, budget, existing marketing performance, chosen services, and how quickly plans are implemented. Paid campaigns may generate early performance signals, while SEO, content, CRM, and customer-retention activities can take longer to develop. RestoRefine reviews progress against agreed business goals rather than promising results by a fixed date.",
        ],
      },
      {
        question: "Does RestoRefine Offer One-Off Projects and Ongoing Marketing Support?",
        answer: [
          "RestoRefine can support businesses with defined projects as well as ongoing marketing needs, depending on the scope of work. Whether you need a new brand identity, a website or continued support across multiple marketing activities, get in touch to discuss the right approach for your goals.",
        ],
      },
      {
        question: "What Happens After I Submit an Enquiry?",
        answer: [
          "Once you submit an enquiry, the next step is to discuss your business, goals and requirements with the RestoRefine team. This helps clarify what you're looking to achieve, the challenges you need to address and which next steps may be appropriate. We follow our RESTO framework with every business to ensure consistency in our time and effort.",
        ],
      },
    ],
  },

  /** Case studies, used by the Resources tab and the client spotlight block. `logo`/`logoBg` drive the logo tiles. */
  clientSpotlight: [
    {
      id: "itspadel",
      logo: "/clients/itspadel-logo.svg",
      logoBg: "#000000",
      tag: "Launch",
      title: "It's",
      titleAccent: "Padel.",
      image: "/clients/itspadel-bg.png",
      isSvg: false,
      meta: { Client: "It's Padel", Industry: "Sports & Recreation", Year: "2024-25" },
      services: ["Branding", "Web Development", "Social Media", "Video Production"],
      description: "A brand built from the ground up. From strategy and identity to website and digital experience, we created everything needed to launch with confidence from day one.",
      href: "/portfolio/itspadel",
    },
    {
      id: "day-today",
      logo: "/clients/day-today.svg",
      logoBg: "#09090b",
      tag: "Grow",
      title: "Day-to",
      titleAccent: "Day.",
      image: "/portfolio-client-thumbnail/day-today.png",
      isSvg: false,
      meta: { Client: "Day-to-Day", Industry: "Retail", Year: "2026" },
      services: ["TikTok Marketing", "Content Strategy", "Video Production", "Local SEO"],
      description: "We transformed content from a publishing routine into a strategic marketing engine: building visibility, engagement, and long-term demand.",
      href: "/portfolio/day-today-tiktok-marketing-case-study",
    },
    {
      id: "masalamoves",
      logo: "/clients/masala-moves-logo.svg",
      logoBg: "#001d1d",
      tag: "Reposition",
      title: "Masala",
      titleAccent: "Moves.",
      image: "/clients/masalamoves-bg.png",
      isSvg: false,
      meta: { Client: "Masala Moves", Industry: "Dance & Performance", Year: "2024" },
      services: ["Brand Identity", "Logo Design", "Social Media", "Merchandise"],
      description: "Realigned the brand to reflect how the business had evolved, creating a stronger identity for its next stage of growth.",
      href: "/portfolio/masala-moves-by-luna-shree",
    },
    {
      id: "zacleaning",
      logo: "/za-cleaning.svg",
      logoBg: "#f2f4f6",
      tag: "Modernize",
      title: "Za",
      titleAccent: "Cleaning.",
      image: "/portfolio-client-thumbnail/za-cleaning.png",
      isSvg: false,
      meta: { Client: "Za Cleaning", Industry: "Cleaning Services", Year: "2026" },
      services: ["Web Design", "Conversion Optimisation", "Mobile-First Design"],
      description: "Refreshed a dated brand and digital presence to reflect the business better today and support future growth.",
      href: "/portfolio/za-cleaning",
    },
  ],
};

/** Trust badges the hero can show under its calls to action */
export type HeroBadge = "rating" | "work" | "roof" | "response" | "studio";

/**
 * Shape every content-driven page (homepage, location pages) follows. Location
 * pages may add a second hero paragraph (`more`) and pick their own three badges.
 */
export type PageContent = Omit<typeof homeContent, "hero"> & {
  hero: (typeof homeContent)["hero"] & { more?: string; badges?: HeroBadge[] };
};
