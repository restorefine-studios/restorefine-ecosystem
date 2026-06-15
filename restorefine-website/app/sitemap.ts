import { MetadataRoute } from "next";
import { portfolioItems } from "@/lib/portfolio";
import { blogPosts } from "@/lib/blogContent";
import { structuredBlogPosts, structuredCaseStudies } from "@/lib/blog/registry";
import { getSupaPosts } from "@/lib/supabase";

const BASE_URL = "https://www.restorefine.co.uk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const supaPosts = await getSupaPosts();

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
      url: `${BASE_URL}/services/restobranding`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/restoweb`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
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
      url: `${BASE_URL}/services/restoprint`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/restosocial`,
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

  const portfolioRoutes: MetadataRoute.Sitemap = portfolioItems.map((item) => ({
    url: `${BASE_URL}/portfolio/${item.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const supaSlugSet = new Set(supaPosts.map((p) => p.slug));

  const structuredSlugs = new Set([
    ...structuredBlogPosts.map((p) => p.slug),
    ...structuredCaseStudies.map((p) => p.slug),
  ]);

  const supaRoutes: MetadataRoute.Sitemap = supaPosts.map((post) => ({
    url: `${BASE_URL}/resources/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts
    .filter((post, index, self) =>
      self.findIndex((p) => p.slug === post.slug) === index &&
      !structuredSlugs.has(post.slug) &&
      !supaSlugSet.has(post.slug)
    )
    .map((post) => ({
      url: `${BASE_URL}/resources/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  const structuredBlogRoutes: MetadataRoute.Sitemap = structuredBlogPosts.map((post) => ({
    url: `${BASE_URL}/resources/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = structuredCaseStudies.map((post) => ({
    url: `${BASE_URL}/resources/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...portfolioRoutes, ...supaRoutes, ...blogRoutes, ...structuredBlogRoutes, ...caseStudyRoutes];
}
