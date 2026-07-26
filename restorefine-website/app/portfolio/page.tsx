// CMS-published projects appear on the grid without a rebuild.
export const revalidate = 0;

import WorkGrid, { type ClientCard } from "@/blocks/work/WorkGrid";
import { Footer } from "@/components/footer";
import { getPortfolioProjects } from "@/lib/portfolio-cms";

/** Perceived brightness, so a pale card gets dark text instead of white. */
function isLightColor(hex: string): boolean {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) return false;
  const int = parseInt(match[1], 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.65;
}

export default async function Portfolio() {
  const projects = await getPortfolioProjects();

  const extraClients: ClientCard[] = projects
    .map((p): ClientCard | null => {
      const logo = p.card_logo || p.hero_image;
      // Nothing to show on a card without an image
      if (!logo) return null;
      const bg = p.card_bg || "#000000";
      return {
        id: `cms-${p.slug}`,
        name: p.client_name,
        category: p.category,
        logo,
        logoType: logo.toLowerCase().endsWith(".svg") ? "svg" : "webp",
        cardColorHex: bg,
        portfolioId: p.slug,
        lightCard: isLightColor(bg),
      };
    })
    .filter((c): c is ClientCard => c !== null);

  return (
    <>
      <WorkGrid extraClients={extraClients} />
      <Footer />
    </>
  );
}
