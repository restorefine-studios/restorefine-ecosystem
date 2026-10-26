// Single source of truth for everything shown on the connect page.
// Update details here rather than in the components.

export const business = {
  name: "RestoRefine",
  legalName: "RestoRefine LTD",
  tagline: "Social media, content and growth marketing for businesses across Scotland.",
  phoneDisplay: "0141 483 5850",
  phoneHref: "tel:+441414835850",
  email: "hello@restorefine.com",
  whatsappHref: `https://wa.me/441414835850?text=${encodeURIComponent(
    "Hi RestoRefine, I'd like to find out more about your services.",
  )}`,
  enquireHref: "https://www.restorefine.co.uk/enquire-now?utm_source=connect&utm_medium=nfc",
  websiteHref: "https://www.restorefine.co.uk/?utm_source=connect&utm_medium=nfc",
  address: {
    line1: "Unit 54, 24 Fairley Street",
    line2: "Glasgow, G51 2SN",
    full: "Unit 54, 24 Fairley Street, Glasgow, G51 2SN",
    mapEmbedSrc: `https://www.google.com/maps?q=${encodeURIComponent(
      "(Unit 54) 24 Fairley Street, Glasgow, G51 2SN, Scotland",
    )}&z=15&output=embed`,
    directionsHref:
      "https://www.google.com/maps/dir/?api=1&destination=Unit+54%2C+24+Fairley+Street%2C+Glasgow+G51+2SN",
  },
  legalLinks: [
    { label: "Privacy", href: "https://www.restorefine.co.uk/legal/privacy" },
    { label: "Terms", href: "https://www.restorefine.co.uk/legal/terms" },
    { label: "Cookies", href: "https://www.restorefine.co.uk/legal/cookies" },
  ],
  // Shown as round icon buttons, in this order
  socials: [
    // TODO: confirm the Facebook page URL, not listed on the main website
    { network: "facebook", label: "Facebook", href: "https://www.facebook.com/restorefine" },
    { network: "instagram", label: "Instagram", href: "https://www.instagram.com/restorefine/" },
    { network: "linkedin", label: "LinkedIn", href: "https://uk.linkedin.com/company/restorefine" },
  ],
} as const;

const SERVICES_URL = "https://www.restorefine.co.uk/services";
const UTM = "?utm_source=connect&utm_medium=nfc";

export const services = [
  {
    name: "Brand",
    tags: [
      { label: "Identity", icon: "pen" },
      { label: "Websites", icon: "globe" },
    ],
    description: "Logos, guidelines and websites that make you easy to choose.",
    visual: "swatches",
    href: `${SERVICES_URL}/brand${UTM}`,
  },
  {
    name: "Content",
    tags: [
      { label: "Video", icon: "video" },
      { label: "Graphics", icon: "image" },
    ],
    description: "Short-form video and graphics, filmed on site and posted for you.",
    visual: "reels",
    href: `${SERVICES_URL}/content${UTM}`,
  },
  {
    name: "Performance",
    tags: [
      { label: "Meta Ads", icon: "megaphone" },
      { label: "Google", icon: "search" },
    ],
    description: "Meta Ads and Google profiles that bring customers through the door.",
    visual: "chart",
    href: `${SERVICES_URL}/performance${UTM}`,
  },
] as const;

export const TIME_ZONE = "Europe/London";

// Opening hours in UK time, Monday first. `null` = closed all day.
// TODO: confirm real studio hours
export const openingHours: ReadonlyArray<{ day: string; open: string; close: string } | { day: string; open: null; close: null }> = [
  { day: "Monday", open: "09:00", close: "17:30" },
  { day: "Tuesday", open: "09:00", close: "17:30" },
  { day: "Wednesday", open: "09:00", close: "17:30" },
  { day: "Thursday", open: "09:00", close: "17:30" },
  { day: "Friday", open: "09:00", close: "17:30" },
  { day: "Saturday", open: null, close: null },
  { day: "Sunday", open: null, close: null },
];
