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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const canonical = `${BASE}/portfolio/${params.slug}`;
  const project = portfolioItems.find((item) => item.id === params.slug);

  if (project) {
    return {
      title: `${project.title ?? project.id}: Portfolio`,
      description: project.description
        ? `${project.description}`.slice(0, 160)
        : `See how RestoRefine delivered brand-defining work for ${project.title ?? project.id}.`,
      keywords: [
        project.title ?? project.id,
        "restaurant branding case study",
        "hospitality brand design portfolio",
        "restaurant logo design UK",
        "RestoRefine portfolio",
        "restaurant brand identity work",
      ],
      alternates: { canonical },
      openGraph: {
        title: `${project.title ?? project.id} | RestoRefine Portfolio`,
        description: project.description
          ? `${project.description}`.slice(0, 160)
          : `Portfolio case study: ${project.title ?? project.id}`,
        url: canonical,
        images:
          project.thumbnail && typeof project.thumbnail === "string"
            ? [{ url: project.thumbnail }]
            : [],
      },
    };
  }

  const cms = await getPortfolioProject(params.slug);
  if (!cms) return {};

  const title = cms.meta_title || `${cms.title || cms.client_name}: Portfolio`;
  const description =
    cms.meta_description ||
    (cms.description ? cms.description.slice(0, 160) : `Portfolio case study: ${cms.client_name}`);
  const image = cms.hero_image || cms.card_logo;

  return {
    title,
    description,
    keywords: [
      cms.client_name,
      cms.title,
      "restaurant branding case study",
      "hospitality brand design portfolio",
      "RestoRefine portfolio",
    ].filter(Boolean),
    alternates: { canonical },
    robots: { index: !cms.noindex, follow: true },
    openGraph: {
      title: `${cms.title || cms.client_name} | RestoRefine Portfolio`,
      description,
      url: canonical,
      type: "article",
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
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

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  // Hardcoded projects resolve without touching Supabase
  const project = portfolioItems.find((item) => item.id === params.slug);

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

  const cms = await getPortfolioProject(params.slug);
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
