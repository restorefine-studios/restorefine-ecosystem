export type ServiceOption = { id: string; title: string; desc: string };

export const mainServiceOptions: ServiceOption[] = [
  { id: "branding", title: "Branding", desc: "Logos, identity & strategy" },
  { id: "web", title: "Web", desc: "Design, development & SEO" },
  { id: "media", title: "Media", desc: "Photo, video & social" },
  { id: "print", title: "Print", desc: "Menus, flyers & packaging" },
  { id: "merch", title: "Merch", desc: "Apparel & promotional" },
  { id: "tools", title: "Custom Tools", desc: "Software & setup" },
];

export const serviceTypeOptions: Record<string, { id: string; title: string }[]> = {
  branding: [
    { id: "logo-design", title: "Logo Design" },
    { id: "brand-identity", title: "Brand Identity" },
    { id: "brand-strategy", title: "Brand Strategy" },
    { id: "rebranding", title: "Rebranding" },
  ],
  web: [
    { id: "web-design", title: "Web Design" },
    { id: "website-development", title: "Website Development" },
    { id: "ecommerce", title: "Ecommerce" },
    { id: "seo", title: "SEO" },
    { id: "website-redesign", title: "Website Redesign" },
  ],
  media: [
    { id: "photography", title: "Photography" },
    { id: "videography", title: "Videography" },
    { id: "social-media", title: "Social Media Management" },
    { id: "content-creation", title: "Content Creation" },
    { id: "launch-campaigns", title: "Launch Campaigns" },
  ],
  print: [
    { id: "menus", title: "Menus" },
    { id: "flyers", title: "Flyers" },
    { id: "posters", title: "Posters" },
    { id: "packaging", title: "Packaging" },
    { id: "business-cards", title: "Business Cards" },
  ],
  merch: [
    { id: "custom-apparel", title: "Custom Apparel" },
    { id: "branding-merch", title: "Branding Merch" },
    { id: "promotional", title: "Promotional" },
  ],
  tools: [
    { id: "software", title: "Software" },
    { id: "setup", title: "Setup" },
  ],
};

export function getMainServiceLabel(id: string | null | undefined): string {
  if (!id) return "";
  return mainServiceOptions.find((option) => option.id === id)?.title ?? id;
}

export function getServiceTypeLabel(
  mainServiceId: string | null | undefined,
  serviceTypeId: string | null | undefined
): string {
  if (!mainServiceId || !serviceTypeId) return serviceTypeId ?? "";
  return (
    serviceTypeOptions[mainServiceId]?.find((option) => option.id === serviceTypeId)?.title ??
    serviceTypeId
  );
}
