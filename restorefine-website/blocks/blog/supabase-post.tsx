import Image from "next/image";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { jsonLd } from "@/lib/utils";
import { ShareBar } from "./share-bar";
import { TableOfContents, type TocItem } from "./toc";
import { ExpandingCta } from "@/blocks/portfolio/expanding-cta";
import type { SupaBlogPost, ContentBlock, FeatureItem } from "@/lib/supabase";

const SANITIZE_OPTS = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(["s", "br", "strong", "em", "b", "i"]),
  allowedAttributes: {
    a: ["href", "target", "rel"],
    ...sanitizeHtml.defaults.allowedAttributes,
  },
};

function renderHtml(content: string) {
  const isHtml = /<[a-z][\s\S]*>/i.test(content);
  if (!isHtml) return <p className="text-zinc-500 leading-relaxed text-[15px] mb-5">{content}</p>;
  return (
    <div
      className="prose prose-zinc max-w-none
        prose-p:text-zinc-500 prose-p:leading-relaxed prose-p:text-[15px] prose-p:my-5
        prose-strong:font-bold prose-strong:text-zinc-800
        prose-em:italic
        prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline
        prose-ul:text-zinc-500 prose-ol:text-zinc-500 prose-li:my-1"
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(content, SANITIZE_OPTS) }}
    />
  );
}

function TitleWithHighlight({ title }: { title: string }) {
  const words = title.trim().split(" ");
  const cutoff = Math.max(words.length - 2, 1);
  const first = words.slice(0, cutoff).join(" ");
  const last = words.slice(cutoff).join(" ");
  return (
    <>
      {first} {last && <span className="text-red-600">{last}</span>}
    </>
  );
}

function headingId(text: string, index: number) {
  return `section-${index}-${text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 40)}`;
}

export function SupabasePost({ post }: { post: SupaBlogPost }) {
  const BASE = "https://www.restorefine.co.uk";
  const url = `${BASE}/resources/${post.slug}`;
  const ogImage = post.thumbnail?.startsWith("http") ? post.thumbnail : post.thumbnail ? `${BASE}${post.thumbnail}` : `${BASE}/image-og.png`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || "",
    image: [ogImage],
    datePublished: post.date,
    dateModified: post.created_at || post.date,
    author: { "@type": "Organization", name: post.author, url: BASE },
    publisher: {
      "@type": "Organization",
      name: "RestoRefine",
      logo: { "@type": "ImageObject", url: `${BASE}/restorefine-logoblack.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${BASE}/resources` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Build TOC items from section/heading blocks
  const tocItems: TocItem[] = post.content
    .map((block, i) => {
      if (block.type === "section") {
        const s = block as unknown as { heading: string };
        if (!s.heading) return null;
        return { id: headingId(s.heading, i), label: s.heading };
      }
      if (block.type === "heading" && block.content) {
        return { id: headingId(block.content, i), label: block.content };
      }
      return null;
    })
    .filter(Boolean) as TocItem[];

  return (
    <main className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />

      {/* ── Header ── */}
      <section className="pt-32 pb-14">
        {post.subtitle && <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-medium mb-5">{post.subtitle}</p>}

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-zinc-950 leading-[0.92] mb-8 max-w-4xl" style={{ fontFamily: "var(--font-oswald), sans-serif" }}>
          <TitleWithHighlight title={post.title} />
        </h1>

        {post.excerpt && <p className="text-zinc-500 text-base leading-relaxed max-w-2xl mb-8">{post.excerpt}</p>}

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-100 pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-950 flex items-center justify-center flex-shrink-0 overflow-hidden p-1.5">
              <img src="/restorefine-logowhite.svg" alt="RestoRefine" style={{ height: "100%", width: "auto" }} />
            </div>
            <span className="text-sm text-zinc-400 font-medium">{post.author}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-300" />
            <span className="text-sm text-zinc-400">{formattedDate}</span>
          </div>
          <ShareBar title={post.title} />
        </div>
      </section>

      {/* ── Two-column: TOC + Article ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[260px_1fr] gap-x-14 xl:gap-x-16 py-10 pb-24">
        {/* TOC — always occupies the left column; hides itself when empty */}
        <TableOfContents title={post.title} items={tocItems} />

        {/* Article */}
        <article className="self-start">
          {/* Thumbnail */}
          {post.thumbnail && (
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-12">
              <Image src={post.thumbnail} alt={post.thumbnail_alt || post.title} fill className="object-cover" priority />
            </div>
          )}

          {/* Content blocks */}
          <div className="space-y-1">
            {post.content.map((block: ContentBlock, i: number) => {
              if (block.type === "section") {
                const s = block as unknown as { type: "section"; heading: string; content: string };
                const id = s.heading ? headingId(s.heading, i) : undefined;
                return (
                  <div key={i} id={id} className="pt-2 mb-10 scroll-mt-28">
                    {s.heading && (
                      <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-zinc-950 mb-4" style={{ fontFamily: "var(--font-oswald), sans-serif" }}>
                        {s.heading}
                      </h2>
                    )}
                    {s.content && renderHtml(s.content)}
                  </div>
                );
              }

              if (block.type === "features") {
                const fb = block as unknown as { heading?: string; description?: string; footerDescription?: string; items: FeatureItem[] };
                return (
                  <div key={i} className="my-10">
                    {fb.heading && (
                      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-zinc-950 mb-4" style={{ fontFamily: "var(--font-oswald), sans-serif" }}>
                        {fb.heading}
                      </h2>
                    )}
                    {fb.description && renderHtml(fb.description)}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(fb.items || []).map((item, idx) => {
                        const Icon = item.icon ? (LucideIcons[item.icon as keyof typeof LucideIcons] as LucideIcon) : null;
                        return (
                          <div key={idx} className="border border-zinc-100 rounded-2xl p-5 hover:border-zinc-200 hover:bg-zinc-50 transition-colors duration-200">
                            {(Icon || item.title) && (
                              <div className="flex items-center gap-3 mb-3">
                                {Icon && (
                                  <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-4.5 h-4.5 text-red-600" style={{ width: 18, height: 18 }} />
                                  </div>
                                )}
                                {item.title && <h3 className="text-[13px] font-black uppercase tracking-wide text-zinc-900">{item.title}</h3>}
                              </div>
                            )}
                            {item.description && <p className="text-[13px] text-zinc-500 leading-relaxed">{item.description}</p>}
                          </div>
                        );
                      })}
                    </div>
                    {fb.footerDescription && <div className="mt-6">{renderHtml(fb.footerDescription)}</div>}
                  </div>
                );
              }

              if (block.type === "heading") {
                const id = block.content ? headingId(block.content, i) : undefined;
                return (
                  <h2 key={i} id={id} className="text-xl md:text-2xl font-black uppercase tracking-tight text-zinc-950 mt-10 mb-3 scroll-mt-28" style={{ fontFamily: "var(--font-oswald), sans-serif" }}>
                    {block.content}
                  </h2>
                );
              }

              if (block.type === "paragraph") {
                return <div key={i}>{renderHtml(block.content)}</div>;
              }

              if (block.type === "image") {
                return (
                  <figure key={i} className="my-10">
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                      <Image src={block.src} alt={block.alt || ""} fill className="object-cover" />
                    </div>
                    {block.caption && <figcaption className="text-xs text-zinc-400 text-center mt-3">{block.caption}</figcaption>}
                  </figure>
                );
              }

              return null;
            })}
          </div>

          <div className="mt-16 pt-8 border-t border-zinc-100">
            <Link href="/resources" className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-colors">
              ← Back to all posts
            </Link>
          </div>
        </article>
      </div>

      <ExpandingCta heading={post.cta_heading ?? "Let's craft something great"} body={post.cta_body ?? "Ready to grow your restaurant or hospitality brand online? Work with RestoRefine to build a digital presence that drives real results."} />
    </main>
  );
}
