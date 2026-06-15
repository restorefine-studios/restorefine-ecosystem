import { notFound } from "next/navigation";
import { portfolioItems } from "@/lib/portfolio";
import { PortfolioStoryClient } from "./PortfolioStoryClient";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = portfolioItems.find((item) => item.id === params.slug);
  if (!project) return {};
  const canonical = `https://www.restorefine.co.uk/portfolio/${project.id}`;
  return {
    title: `${project.title ?? project.id} — Portfolio`,
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
        : `Portfolio case study — ${project.title ?? project.id}`,
      url: canonical,
      images:
      project.thumbnail && typeof project.thumbnail === "string"
        ? [{ url: project.thumbnail }]
        : [],
    },
  };
}

export async function generateStaticParams() {
  return portfolioItems.map((item) => ({
    slug: item.id,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = portfolioItems.find((item) => item.id === params.slug);

  if (!project) {
    notFound();
  }

  const idx = portfolioItems.indexOf(project);
  const prevProject = idx > 0 ? portfolioItems[idx - 1] : null;
  const nextProject = idx < portfolioItems.length - 1 ? portfolioItems[idx + 1] : null;

  const heroBg = project.heroImage ?? project.thumbnail;

  return (
    <PortfolioStoryClient
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
      heroBg={heroBg}
    />
  );
}
