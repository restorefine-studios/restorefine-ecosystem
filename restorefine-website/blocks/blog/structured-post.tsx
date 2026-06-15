import Link from "next/link";
import Image from "next/image";
import { jsonLd } from "@/lib/utils";
import { ArrowRight, Search, Share2, Target, Palette, TrendingUp, Wrench, Clock } from "lucide-react";

const benefitIcons = [Search, Share2, Target, Palette, TrendingUp, Wrench, Clock];
import type { BlogPost } from "@/lib/blog/registry";
import { TableOfContents } from "./toc";
import { FaqAccordion } from "./faq-accordion";
import { ShareBar } from "./share-bar";
import { ExpandingCta } from "@/blocks/portfolio/expanding-cta";

export function StructuredBlogPost({ post }: { post: BlogPost }) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const BASE = "https://www.restorefine.co.uk";
  const url = `${BASE}/resources/${post.slug}`;
  const ogImage = post.coverImage ? `${BASE}${post.coverImage}` : `${BASE}/image-og.png`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    image: [ogImage],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: { "@type": "Organization", name: post.author, url: BASE },
    publisher: {
      "@type": "Organization",
      name: "RestoRefine",
      logo: { "@type": "ImageObject", url: `${BASE}/restorefine-logoblack.svg` },
    },
    keywords: (post.tags || []).join(", "),
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

  return (
    <main className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      {/* Page header */}
      <section className="pt-32 pb-14">
        <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-medium mb-5">{post.category}</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-zinc-950 leading-[0.92] mb-8 max-w-4xl" style={{ fontFamily: "var(--font-holiday), serif" }}>
          {(() => {
            if (post.titleHighlight) {
              const idx = post.title.indexOf(post.titleHighlight);
              if (idx !== -1) {
                return (
                  <>
                    {post.title.slice(0, idx)}
                    <span className="text-red-600">{post.titleHighlight}</span>
                    {post.title.slice(idx + post.titleHighlight.length)}
                  </>
                );
              }
            }
            const match = post.title.match(/^(\d+\s+\S+)(.*)/);
            return match ? (
              <>
                <span className="text-red-600">{match[1]}</span>
                {match[2]}
              </>
            ) : (
              post.title
            );
          })()}
        </h1>
        <p className="text-zinc-500 text-base leading-relaxed max-w-2xl mb-8">{post.excerpt}</p>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-100 pt-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm text-zinc-400 font-medium">{post.author}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-300" />
            <span className="text-sm text-zinc-400">{formattedDate}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-300" />
            {(post.tags || []).slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-zinc-400 bg-zinc-100 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <ShareBar title={post.title} />
        </div>
      </section>

      {/* Two-column: TOC sidebar + article */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[260px_1fr] gap-x-14 xl:gap-x-16 py-20">
        {/* TOC */}
        <TableOfContents
          title={post.title}
          items={[
            ...(post.sectionLabel
              ? [
                  {
                    id: "signs",
                    label: post.sectionLabel,
                    children: post.sections.map((s, i) => ({ id: `section-${i}`, label: s.heading })),
                  },
                ]
              : post.sections.map((s, i) => ({ id: `section-${i}`, label: s.heading }))),
            ...(post.benefitsLabel ? [{ id: "benefits", label: post.benefitsLabel }] : []),
            ...(post.faqs && post.faqs.length > 0 ? [{ id: "faqs", label: "FAQs" }] : []),
            { id: "conclusion", label: "Conclusion" },
          ]}
        />

        {/* Article */}
        <article className="self-start">
          {/* Cover image */}
          {post.coverImage && (
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-12">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
            </div>
          )}

          {/* Intro */}
          {/* Intro: wrap all paragraphs so the left red border spans full intro height */}
          {(() => {
            const parts = (post.intro || "").split("\n\n");
            const phrase = "restaurant marketing in Glasgow";
            return (
              <div className="border-l-[3px] border-red-600 pl-5 mb-16">
                {parts.map((para, i) => {
                  const isLast = i === parts.length - 1;
                  const paraClass = `text-lg md:text-xl text-zinc-700 leading-relaxed ${isLast ? "" : "mb-6"}`;
                  const idx = para.indexOf(phrase);
                  if (idx !== -1) {
                    const before = para.slice(0, idx);
                    const after = para.slice(idx + phrase.length);
                    return (
                      <p key={i} className={paraClass}>
                        {before}
                        <a href="https://www.restorefine.co.uk/portfolio" className="text-red-600 underline">
                          {phrase}
                        </a>
                        {after}
                      </p>
                    );
                  }
                  return (
                    <p key={i} className={paraClass}>
                      {para}
                    </p>
                  );
                })}
              </div>
            );
          })()}

          {/* Sections */}
          {post.sectionLabel && (
            <div id="signs">
              <h2 className="text-2xl md:text-3xl font-black tracking-normal text-zinc-950 leading-tight mb-10" style={{ fontFamily: "var(--font-holiday), serif" }}>
                {post.sectionLabel}
              </h2>
            </div>
          )}
          <div className="space-y-14 pt-8">
            {post.sections.map((section, index) => (
              <div key={index} id={`section-${index}`}>
                <div className="flex items-start gap-4 mb-3">
                  <span className="text-red-600 font-black text-xs tracking-[0.2em] mt-1.5 flex-shrink-0 w-6">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="text-xl md:text-2xl font-black tracking-tight text-zinc-950 leading-tight" style={{ fontFamily: "var(--font-holiday), serif" }}>
                    {section.heading}
                  </h2>
                </div>
                <div className="ml-10">
                  {section.content.split("\n\n").map((para, pidx, arr) => (
                    <p key={pidx} className={`text-zinc-500 leading-relaxed text-[15px] ${pidx !== arr.length - 1 ? "mb-6" : ""}`}>
                      {para}
                    </p>
                  ))}
                  {section.link && (
                    <Link href={section.link.href} className="inline-flex items-center gap-2 mt-4 text-[11px] font-black uppercase tracking-[0.2em] text-red-600 hover:text-red-700 transition-colors group/link">
                      {section.link.label}
                      <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Divider (hidden for specific posts) */}
          {post.slug !== "psychology-behind-viral-food-content" && (
            <div className="flex items-center gap-4 my-20">
              <div className="h-px flex-1 bg-zinc-100" />
              <span className="text-[9px] font-black uppercase tracking-[0.35em] text-zinc-300">Why Restorefine</span>
              <div className="h-px flex-1 bg-zinc-100" />
            </div>
          )}

          {/* Benefits */}
          {post.benefits && post.benefits.length > 0 && (
            <div id="benefits">
              {post.benefitsLabel && (
                <h2 className="text-3xl md:text-4xl font-black tracking-normal text-zinc-950 leading-tight mb-10" style={{ fontFamily: "var(--font-holiday), serif" }}>
                  {post.benefitsLabel}
                </h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {post.benefits.map((benefit, i) => {
                  const Icon = benefitIcons[i % benefitIcons.length];
                  return (
                    <div key={i} className="border border-zinc-100 rounded-2xl p-5 hover:border-zinc-200 hover:bg-zinc-50 transition-colors duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-red-600" />
                        </div>
                        <h3 className="text-[12px] font-black uppercase tracking-wide text-zinc-900">{benefit.title}</h3>
                      </div>
                      <p className="text-[13px] text-zinc-400 leading-relaxed">{benefit.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-zinc-100 my-20" />

          {/* Conclusion */}
          <div id="conclusion" className="bg-zinc-50 rounded-2xl p-8 md:p-10 border-l-4 border-red-600 mb-12">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">Conclusion</p>
            <p className="text-zinc-700 text-base leading-relaxed">{post.conclusion}</p>
          </div>

          {/* FAQs */}
          {post.faqs && post.faqs.length > 0 && (
            <div id="faqs" className="mb-12">
              <h2 className="text-2xl md:text-3xl font-black tracking-normal text-zinc-950 leading-tight mb-8" style={{ fontFamily: "var(--font-holiday), serif" }}>
                Frequently Asked <span className="text-red-600">Questions</span>
              </h2>
              <FaqAccordion faqs={post.faqs} />
            </div>
          )}

          {/* Tags */}
          {(post.tags || []).length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12">
              {(post.tags || []).map((tag) => (
                <span key={tag} className="text-xs text-zinc-400 bg-zinc-100 px-3 py-1.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-zinc-100">
            <Link href="/resources" className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-colors">
              ← Back to all posts
            </Link>
          </div>
        </article>
      </div>

      {/* Scroll-triggered full-screen CTA */}
      <ExpandingCta heading={post.cta.label} body={post.cta.text} />
    </main>
  );
}
