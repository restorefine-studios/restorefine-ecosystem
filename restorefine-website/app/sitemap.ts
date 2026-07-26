import { MetadataRoute } from "next";
import { portfolioItems } from "@/lib/portfolio";
import { blogPosts } from "@/lib/blogContent";
import { getSupaPosts } from "@/lib/supabase";
import { getPortfolioProjects } from "@/lib/portfolio-cms";

const BASE_URL = "https://www.restorefine.co.uk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const supaPosts = await getSupaPosts();
  const cmsProjects = await getPortfolioProjects();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/restomedia`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/restomerch`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/brand`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/content`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/launch-campaigns`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/performance`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/company`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resources`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/enquire-now`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];

  const hardcodedSlugs = new Set(portfolioItems.map((item) => item.id));

  const portfolioRoutes: MetadataRoute.Sitemap = portfolioItems.map((item) => ({
    url: `${BASE_URL}/portfolio/${item.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const cmsPortfolioRoutes: MetadataRoute.Sitemap = cmsProjects
    // A hardcoded page of the same slug wins, so don't list the URL twice
    .filter((p) => !p.noindex && !hardcodedSlugs.has(p.slug))
    .map((p) => ({
      url: `${BASE_URL}/portfolio/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  const supaSlugSet = new Set(supaPosts.map((p) => p.slug));

  const supaRoutes: MetadataRoute.Sitemap = supaPosts.map((post) => ({
    url: `${BASE_URL}/resources/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts
    .filter((post, index, self) =>
      self.findIndex((p) => p.slug === post.slug) === index &&
      !supaSlugSet.has(post.slug)
    )
    .map((post) => ({
      url: `${BASE_URL}/resources/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...portfolioRoutes, ...cmsPortfolioRoutes, ...supaRoutes, ...blogRoutes];
}
