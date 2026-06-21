export const revalidate = 0;

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getEntry } from "@/lib/contentful"
import { StructuredBlogPost } from "@/blocks/blog/structured-post"
import { CaseStudyPost } from "@/blocks/blog/case-study-post"
import { SupabasePost } from "@/blocks/blog/supabase-post"
import { getSupaPost, getAllSupaSlugs } from "@/lib/supabase"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const BASE = "https://www.restorefine.co.uk";
  const canonical = `${BASE}/resources/${params.slug}`;

  // 1. Supabase CMS post — checked first so edits reflect immediately
  const supaPost = await getSupaPost(params.slug);
  if (supaPost) {
    const title = supaPost.meta_title || supaPost.title;
    const description = supaPost.meta_description || supaPost.excerpt || `Read "${supaPost.title}" on the RestoRefine blog.`;
    const ogImage = supaPost.thumbnail?.startsWith("http")
      ? supaPost.thumbnail
      : supaPost.thumbnail
        ? `${BASE}${supaPost.thumbnail}`
        : `${BASE}/image-og.png`;
    return {
      title,
      description,
      alternates: { canonical },
      robots: { index: !supaPost.noindex, follow: true },
      openGraph: {
        title,
        description,
        url: canonical,
        type: "article",
        publishedTime: supaPost.date,
        authors: [supaPost.author],
        images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    };
  }

  const entry = await getEntry(params.slug);
  if (!entry) return {};
  const title = entry.fields?.title || "Blog Post";
  const thumbnail = entry.fields?.blogThumbnail
    ? "https:" + entry.fields.blogThumbnail.fields.file.url
    : undefined;
  return {
    title: `${title}`,
    description: `Read "${title}" on the RestoRefine blog — insights on restaurant branding, design, and hospitality marketing.`,
    keywords: [
      "restaurant branding tips",
      "hospitality marketing advice",
      "restaurant brand strategy UK",
      "food brand design blog",
      "RestoRefine blog",
      "restaurant industry insights UK",
    ],
    alternates: { canonical },
    openGraph: {
      title: `${title} | RestoRefine`,
      description: `Read "${title}" on the RestoRefine blog.`,
      url: canonical,
      type: "article",
      images: thumbnail ? [{ url: thumbnail }] : [],
    },
  };
}

export async function generateStaticParams() {
  const contentfulIds = ['1GbQtiZFH0JMacfoA0lykv', '30ejQTBPwJeuMBmpd30dWk'];
  // Supabase may not be available at build time; fail gracefully so the build succeeds.
  // Posts with revalidate=0 are rendered dynamically anyway.
  let supaSlugs: string[] = [];
  try {
    supaSlugs = await getAllSupaSlugs();
  } catch {
    supaSlugs = [];
  }
  return [
    ...contentfulIds.map((id) => ({ slug: id })),
    ...supaSlugs.map((slug) => ({ slug })),
  ];
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const supaPost = await getSupaPost(params.slug);

  if (supaPost) {
    // structured_data is cleared when a post is edited via the CMS — use SupabasePost for editable rich text
    if (supaPost.structured_data && supaPost.post_type === "blog") {
      return <StructuredBlogPost post={supaPost.structured_data} />;
    }
    if (supaPost.structured_data && supaPost.post_type === "case-study") {
      return <CaseStudyPost caseStudy={supaPost.structured_data} />;
    }
    return <SupabasePost post={supaPost} />;
  }

  const entry = await getEntry(params.slug);

  if (!entry) {
    notFound()
  }

  const title = entry.fields?.title || 'Blog Title';
  const author = entry.fields?.authorName || 'Author';
  const authorImage = entry.fields?.authorImage ? 'https:' + entry.fields.authorImage.fields.file.url : '/placeholder.svg';
  const thumbnail = entry.fields?.blogThumbnail ? 'https:' + entry.fields.blogThumbnail.fields.file.url : '/placeholder.svg';
  const dateRaw = entry.fields?.blogDate || 'Date';
  const date = new Date(dateRaw).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });

  const blogContent = entry.fields?.blogContent;

  return (
    <main>
      <section className="relative h-[500px] w-full">
        <div className="">
          <Image src={thumbnail} alt={title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </section>

      <div className="max-w-3xl relative z-10 container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{title}</h1>
        <div className="flex items-center gap-3 mt-6">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-[#d9d9d9]">
            <Image
              src={authorImage}
              alt={author}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div className="flex items-center text-white text-sm">
            <span>{author}</span>
            <span className="mx-2">•</span>
            <span>{date}</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto py-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-invert max-w-none">
            {blogContent ? documentToReactComponents(blogContent, {
              renderNode: {
                [BLOCKS.EMBEDDED_ASSET]: (node) => (
                  <div className="my-8">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={'https:' + node.data.target.fields.file.url}
                        alt={node.data.target.fields.title || ''}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </div>
                ),
              },
              renderText: (text) => text.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < text.split('\n').length - 1 && <br />}
                </span>
              )),
            }) : <p>No content available.</p>}
          </div>

          <div className="mt-12 pt-8 border-t border-[#464646]">
            <Link href="/resources" className="text-[#999999] hover:text-white transition-colors">
              ← Back to all posts
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
