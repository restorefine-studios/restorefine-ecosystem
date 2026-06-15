import { blogPost as digitalMarketingGlasgow } from "./10-signs-your-business-needs-a-digital-marketing-company-in-glasgow";
import { caseStudy as padelAcademy } from "./how-we-helped-padel-academy-scotland-build-brand-from-scratch";
import { blogPost as viralFoodContent } from "./psychology-behind-viral-food-content";

export type { BlogPost, BlogSection, BlogBenefit } from "./10-signs-your-business-needs-a-digital-marketing-company-in-glasgow";
export type { CaseStudy, CaseStudyChallenge, CaseStudyService, CaseStudyResult, FAQ } from "./how-we-helped-padel-academy-scotland-build-brand-from-scratch";

export const structuredBlogPosts = [digitalMarketingGlasgow, viralFoodContent];
export const structuredCaseStudies = [padelAcademy];

export type LocalPost =
  | { type: "blog"; data: typeof digitalMarketingGlasgow }
  | { type: "blog"; data: typeof viralFoodContent }
  | { type: "case-study"; data: typeof padelAcademy };

export function getStructuredPost(slug: string): LocalPost | null {
  const blog = structuredBlogPosts.find((p) => p.slug === slug);
  if (blog) return { type: "blog", data: blog };

  const cs = structuredCaseStudies.find((p) => p.slug === slug);
  if (cs) return { type: "case-study", data: cs };

  return null;
}

export const allStructuredSlugs = [
  ...structuredBlogPosts.map((p) => p.slug),
  ...structuredCaseStudies.map((p) => p.slug),
];
