import { blogPosts } from "@/lib/blogContent";
import { getSupaPosts } from "@/lib/supabase";
import { homeContent, type PageContent } from "@/lib/homepageData";
import { Reveal } from "./reveal";
import { ResourcesTabs, type PostSummary } from "./resources-tabs";
import { type } from "./type-scale";

async function getLatestPosts(limit: number): Promise<PostSummary[]> {
  let supa: PostSummary[] = [];
  try {
    supa = (await getSupaPosts()).map((p) => ({ slug: p.slug, title: p.title, thumbnail: p.thumbnail, thumbnailAlt: p.thumbnail_alt, date: p.date }));
  } catch {
    // Fall back to the bundled posts if Supabase is unreachable
  }
  const seen = new Set(supa.map((p) => p.slug));
  const local = blogPosts.filter((p) => !seen.has(p.slug));
  return [...supa, ...local].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}

export async function Resources({ resources = homeContent.resources, caseStudies = homeContent.clientSpotlight }: { resources?: PageContent["resources"]; caseStudies?: PageContent["clientSpotlight"] }) {
  const posts = await getLatestPosts(4);

  return (
    <section className="py-24 lg:py-32">
      <Reveal>
        <h2 className={`${type.section} font-black uppercase leading-[0.98] tracking-[-0.04em] text-zinc-950`}>{resources.heading}</h2>
        <p className="mt-7 max-w-[65ch] text-base leading-relaxed text-zinc-600 sm:text-lg">{resources.body}</p>
      </Reveal>
      <ResourcesTabs posts={posts} resources={resources} caseStudies={caseStudies} />
    </section>
  );
}
