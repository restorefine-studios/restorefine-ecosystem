// Matches the blog route: CMS edits go live without a rebuild.
export const revalidate = 0;

import { notFound } from "next/navigation";
import { portfolioItems } from "@/lib/portfolio";
import {
  getPortfolioProject,
  getPortfolioProjects,
  getPortfolioSlugs,
  toPortfolioItem,
} from "@/lib/portfolio-cms";
import { PortfolioStoryClient } from "./PortfolioStoryClient";
import type { Metadata } from "next";

const BASE = "https://www.restorefine.co.uk";
const BRAND_TITLE = "RestoRefine";

function stripBrandSuffix(title: string) {
  return title.replace(/(?:\s*\|\s*(?:RestoRefine|Restorefine)\s*)+$/i, "").trim();
}

function withBrandSuffix(title: string) {
  const cleanTitle = stripBrandSuffix(title);
  return `${cleanTitle} | ${BRAND_TITLE}`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const canonical = `${BASE}/portfolio/${slug}`;
  const project = portfolioItems.find((item) => item.id === slug);

  if (project) {
    const title = stripBrandSuffix(project.title ?? project.id);
    const socialTitle = withBrandSuffix(title);

    return {
      title,
      description: project.description
        ? `${project.description}`.slice(0, 160)
        : `See how RestoRefine delivered brand-defining work for ${project.title ?? project.id}.`,
      alternates: { canonical },
      openGraph: {
        title: socialTitle,
        description: project.description
          ? `${project.description}`.slice(0, 160)
          : `Portfolio case study: ${project.title ?? project.id}`,
        url: canonical,
        images:
          project.thumbnail && typeof project.thumbnail === "string"
            ? [{ url: project.thumbnail }]
            : [],
      },
      twitter: {
        card: "summary_large_image",
        title: socialTitle,
        description: project.description
          ? `${project.description}`.slice(0, 160)
          : `Portfolio case study: ${project.title ?? project.id}`,
        images:
          project.thumbnail && typeof project.thumbnail === "string"
            ? [project.thumbnail]
            : [],
      },
    };
  }

  const cms = await getPortfolioProject(slug);
  if (!cms) return {};

  const title = stripBrandSuffix(cms.meta_title || cms.title || cms.client_name);
  const socialTitle = withBrandSuffix(title);
  const description =
    cms.meta_description ||
    (cms.description ? cms.description.slice(0, 160) : `Portfolio case study: ${cms.client_name}`);
  const image = cms.hero_image || cms.card_logo;

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: !cms.noindex, follow: true },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      type: "article",
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: image ? [image] : [],
    },
  };
}

export async function generateStaticParams() {
  const cmsSlugs = await getPortfolioSlugs();
  return [
    ...portfolioItems.map((item) => ({ slug: item.id })),
    ...cmsSlugs.map((slug) => ({ slug })),
  ];
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Hardcoded projects resolve without touching Supabase
  const project = portfolioItems.find((item) => item.id === slug);

  if (project) {
    const idx = portfolioItems.indexOf(project);
    return (
      <PortfolioStoryClient
        project={project}
        prevProject={idx > 0 ? portfolioItems[idx - 1] : null}
        nextProject={idx < portfolioItems.length - 1 ? portfolioItems[idx + 1] : null}
        heroBg={project.heroImage ?? project.thumbnail}
      />
    );
  }

  const cms = await getPortfolioProject(slug);
  if (!cms) notFound();

  // CMS projects lead the running order (newest work first), then the curated list
  const cmsProjects = await getPortfolioProjects();
  const merged = [...cmsProjects.map(toPortfolioItem), ...portfolioItems];
  const item = toPortfolioItem(cms);
  const idx = merged.findIndex((m) => m.id === cms.slug);

  return (
    <PortfolioStoryClient
      project={item}
      prevProject={idx > 0 ? merged[idx - 1] : null}
      nextProject={idx >= 0 && idx < merged.length - 1 ? merged[idx + 1] : null}
      heroBg={item.heroImage ?? item.thumbnail}
      cmsProject={cms}
    />
  );
}
