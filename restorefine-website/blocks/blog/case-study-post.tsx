import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, AlertCircle, Quote } from "lucide-react";
import { ExpandingCta } from "@/blocks/portfolio/expanding-cta";
import type { CaseStudy } from "@/lib/blog/types";
import { TableOfContents } from "./toc";
import { FaqAccordion } from "./faq-accordion";
import { ShareBar } from "./share-bar";

export function CaseStudyPost({ caseStudy: cs }: { caseStudy: CaseStudy }) {
  const formattedDate = new Date(cs.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const tocItems = [
    { id: "context", label: "Background" },
    { id: "challenges", label: "The Challenge" },
    {
      id: "approach",
      label: "Our Approach",
      children: cs.approach.services.map((s, i) => ({ id: `service-${i}`, label: s.heading })),
    },
    { id: "results", label: "Results" },
    { id: "testimonial", label: "Testimonial" },
    { id: "faqs", label: "FAQs" },
  ];

  return (
    <main className="bg-white min-h-screen">
      {/* Page header */}
      <section className="pt-32 pb-14">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[10px] tracking-[0.3em] uppercase text-red-600 font-black bg-red-50 px-3 py-1 rounded-full">
            {cs.category}
          </span>
        </div>
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-zinc-950 leading-[0.92] mb-8 max-w-4xl"
          style={{ fontFamily: "var(--font-holiday), serif" }}
        >
          {(() => {
            const highlights = ["How We", "Build", "Brand"];
            const pattern = new RegExp(
              `(${highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
              "gi"
            );
            return cs.title.split(pattern).map((part, i) =>
              highlights.some((h) => h.toLowerCase() === part.toLowerCase()) ? (
                <span key={i} className="text-red-600">{part}</span>
              ) : part
            );
          })()}
        </h1>
        <p className="text-zinc-500 text-base leading-relaxed max-w-2xl mb-8">
          {cs.excerpt}
        </p>

        {/* Client info strip */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {[
            { label: "Client", value: cs.client.name },
            { label: "Industry", value: cs.client.industry },
            { label: "Location", value: cs.client.location },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center gap-2 bg-zinc-50 border border-zinc-100 rounded-full px-4 py-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{label}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-300" />
              <span className="text-[13px] font-semibold text-zinc-800">{value}</span>
            </div>
          ))}
          {cs.client.website && (
            <Link
              href={cs.client.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full px-4 py-2 transition-colors duration-200"
              style={{ backgroundColor: "#009ff3" }}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Visit</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="text-[13px] font-semibold text-white">{cs.client.name}</span>
            </Link>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-100 pt-6">
          <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm text-zinc-400 font-medium">{cs.author}</span>
          <span className="w-1 h-1 rounded-full bg-zinc-300" />
          <span className="text-sm text-zinc-400">{formattedDate}</span>
          <span className="w-1 h-1 rounded-full bg-zinc-300" />
          {cs.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs text-zinc-400 bg-zinc-100 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
          </div>
          <ShareBar title={cs.title} />
        </div>
      </section>

      {/* Two-column: TOC + Article */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[260px_1fr] gap-x-14 xl:gap-x-16 py-20">
        <TableOfContents title={cs.title} items={tocItems} />

        <article className="self-start">
          {/* Cover image */}
          {cs.coverImage && (
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-12">
              <Image src={cs.coverImage} alt={cs.title} fill className="object-cover" priority />
            </div>
          )}

          {/* Intro */}
          <p className="text-lg md:text-xl text-zinc-700 leading-relaxed mb-16 border-l-[3px] border-red-600 pl-5">
            {cs.intro}
          </p>

          {/* Context */}
          <div id="context" className="mb-16">
            <h2
              className="text-2xl md:text-3xl font-black tracking-normal text-zinc-950 leading-tight mb-5"
              style={{ fontFamily: "var(--font-holiday), serif" }}
            >
              Background
            </h2>
            <p className="text-zinc-500 leading-relaxed text-[15px]">{cs.context}</p>
          </div>

          <div className="h-px bg-zinc-100 mb-16" />

          {/* Challenges */}
          <div id="challenges" className="mb-16">
            <h2
              className="text-2xl md:text-3xl font-black tracking-normal text-zinc-950 leading-tight mb-2"
              style={{ fontFamily: "var(--font-holiday), serif" }}
            >
              The <span className="text-red-600">Challenge</span>
            </h2>
            <p className="text-zinc-400 text-sm mb-8">What we were up against when we started.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cs.challenges.map((challenge, i) => (
                <div key={i} className="border border-zinc-100 rounded-2xl p-5 hover:border-zinc-200 hover:bg-zinc-50 transition-colors duration-300">
                  <div className="flex items-start gap-3 mb-2">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <h3 className="text-[12px] font-black uppercase tracking-wide text-zinc-900">
                      {challenge.heading}
                    </h3>
                  </div>
                  <p className="text-[13px] text-zinc-400 leading-relaxed pl-7">{challenge.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-zinc-100 mb-16" />

          {/* Approach */}
          <div id="approach" className="mb-16">
            <h2
              className="text-2xl md:text-3xl font-black tracking-normal text-zinc-950 leading-tight mb-5"
              style={{ fontFamily: "var(--font-holiday), serif" }}
            >
              Our <span className="text-red-600">Approach</span>
            </h2>
            <p className="text-zinc-500 leading-relaxed text-[15px] mb-12">{cs.approach.intro}</p>

            <div className="space-y-12">
              {cs.approach.services.map((service, i) => (
                <div key={i} id={`service-${i}`}>
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-red-600 font-black text-xs tracking-[0.2em] mt-1.5 flex-shrink-0 w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className="text-xl md:text-2xl font-black tracking-normal text-zinc-950 leading-tight"
                      style={{ fontFamily: "var(--font-holiday), serif" }}
                    >
                      {service.heading}
                    </h3>
                  </div>
                  <div className="ml-10">
                    <p className="text-zinc-500 leading-relaxed text-[15px] mb-4">{service.content}</p>
                    {service.bulletPoints && (
                      <ul className="space-y-2">
                        {service.bulletPoints.map((point, j) => (
                          <li key={j} className="flex items-start gap-3 text-[14px] text-zinc-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-2" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-zinc-100 mb-16" />

          {/* Results */}
          <div id="results" className="mb-16">
            <h2
              className="text-2xl md:text-3xl font-black tracking-normal text-zinc-950 leading-tight mb-8"
              style={{ fontFamily: "var(--font-holiday), serif" }}
            >
              The <span className="text-red-600">Results</span>
            </h2>
            <div className="space-y-3">
              {cs.results.map((result, i) => (
                <div key={i} className="flex items-start gap-4 bg-zinc-50 rounded-xl px-5 py-4 border border-zinc-100">
                  <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-[14px] text-zinc-700 leading-relaxed font-medium">{result.metric}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div id="testimonial" className="mb-16">
            <div className="bg-zinc-950 rounded-2xl p-8 md:p-10 relative overflow-hidden">
              <Quote className="absolute top-6 right-8 w-16 h-16 text-white/5" />
              <p className="text-white text-lg leading-relaxed mb-6 relative z-10">
                &ldquo;{cs.testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-red-600" />
                <span className="text-zinc-400 text-sm font-medium">{cs.testimonial.author}</span>
              </div>
            </div>
          </div>

          {/* Closing */}
          <div className="bg-zinc-50 rounded-2xl p-8 md:p-10 border-l-4 border-red-600 mb-12">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">Key Takeaway</p>
            <p className="text-zinc-700 text-base leading-relaxed">{cs.closing}</p>
          </div>

          {/* FAQs */}
          <div id="faqs">
            <h2
              className="text-2xl md:text-3xl font-black tracking-normal text-zinc-950 leading-tight mb-8"
              style={{ fontFamily: "var(--font-holiday), serif" }}
            >
              Frequently Asked <span className="text-red-600">Questions</span>
            </h2>
            <FaqAccordion faqs={cs.faqs} />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12">
            {cs.tags.map((tag) => (
              <span key={tag} className="text-xs text-zinc-400 bg-zinc-100 px-3 py-1.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Back */}
          <div className="mt-16 pt-8 border-t border-zinc-100">
            <Link
              href="/resources"
              className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              ← Back to all posts
            </Link>
          </div>
        </article>
      </div>

      {/* Scroll-triggered full-screen CTA */}
      <ExpandingCta
        heading={cs.cta.label}
        body={cs.cta.text}
      />
    </main>
  );
}
