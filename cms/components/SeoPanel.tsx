"use client";

import { useMemo } from "react";
import type { BlogPost, ContentBlock } from "@/lib/supabase";

interface Props {
  form: BlogPost;
  onKeyphrase: (v: string) => void;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function wordCount(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function sentences(text: string) {
  // Avoid splitting on abbreviations like "e.g.", "Dr.", "Mr.", "i.e."
  return text
    .replace(/\b(Dr|Mr|Mrs|Ms|Prof|Sr|Jr|e\.g|i\.e|vs|etc|no|vol|fig)\./gi, "$1DOTPLACEHOLDER")
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map(s => s.replace(/DOTPLACEHOLDER/g, ".").trim())
    .filter(s => s.length > 10);
}

function keyphraseRegex(kp: string) {
  return new RegExp(kp.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
}

// ── Analysis ─────────────────────────────────────────────────────────────────

type Status = "good" | "ok" | "bad";
interface Check { label: string; status: Status; detail: string }

function runSeoChecks(form: BlogPost, kp: string): { checks: Check[]; score: number } {
  const title = (form.meta_title || form.title || "").toLowerCase();
  const slug = (form.slug || "").toLowerCase();
  const metaDescription = (form.meta_description || form.excerpt || "").toLowerCase();
  const kpLower = kp.toLowerCase();

  // Extract plain text from all content blocks (including features)
  function blockToText(b: ContentBlock): string {
    if (b.type === "section") {
      const s = b as unknown as { heading: string; content: string };
      return stripHtml(`${s.heading} ${s.content}`);
    }
    if (b.type === "heading" || b.type === "paragraph") return stripHtml(b.content);
    if (b.type === "features") {
      const f = b as unknown as { heading?: string; items: { title?: string; description?: string }[] };
      const parts = [f.heading || "", ...(f.items || []).flatMap(it => [it.title || "", it.description || ""])];
      return parts.join(" ");
    }
    return "";
  }

  const allText = (form.content || []).map(blockToText).join(" ");

  const firstBlock = (form.content || [])[0];
  const firstText = firstBlock ? blockToText(firstBlock).toLowerCase() : "";

  const totalWords = wordCount(allText);

  // Keyphrase density: (phrase_occurrences × phrase_word_count) / total_words × 100
  const kpWordCount = kp ? kp.trim().split(/\s+/).length : 1;
  const phraseOccurrences = kp && totalWords > 0
    ? (allText.toLowerCase().match(keyphraseRegex(kpLower)) || []).length
    : 0;
  const density = totalWords > 0 ? (phraseOccurrences * kpWordCount / totalWords) * 100 : 0;

  const imgBlocks = (form.content || []).filter((b: ContentBlock) => b.type === "image") as unknown as { alt?: string }[];
  const imgsWithoutAlt = imgBlocks.filter(b => !b.alt || !b.alt.trim()).length;

  // Count thumbnail as an image too
  const hasThumbnail = !!form.thumbnail;
  const thumbnailHasAlt = !!(form.thumbnail_alt?.trim());

  const titleLen = (form.meta_title || form.title || "").length;
  const metaDescriptionLen = (form.meta_description || form.excerpt || "").length;

  const checks: Check[] = [];

  // 1. Keyphrase set (5pts)
  if (!kp) {
    checks.push({ label: "Focus keyphrase", status: "bad", detail: "No focus keyphrase set." });
  } else {
    checks.push({ label: "Focus keyphrase", status: "good", detail: `Keyphrase: "${kp}"` });
  }

  // 2. Keyphrase in title (15pts)
  if (!kp) {
    checks.push({ label: "Keyphrase in SEO title", status: "bad", detail: "Set a focus keyphrase first." });
  } else if (title.includes(kpLower)) {
    checks.push({ label: "Keyphrase in SEO title", status: "good", detail: "Keyphrase found in title." });
  } else {
    checks.push({ label: "Keyphrase in SEO title", status: "bad", detail: "Keyphrase not found in title." });
  }

  // 3. Keyphrase in slug (15pts)
  if (!kp) {
    checks.push({ label: "Keyphrase in slug", status: "bad", detail: "Set a focus keyphrase first." });
  } else if (kpLower.split(" ").some(w => slug.includes(w))) {
    checks.push({ label: "Keyphrase in slug", status: "good", detail: "Keyphrase found in URL slug." });
  } else {
    checks.push({ label: "Keyphrase in slug", status: "bad", detail: "Keyphrase not in URL slug." });
  }

  // 4. Keyphrase in meta description (15pts)
  if (!kp) {
    checks.push({ label: "Keyphrase in meta description", status: "bad", detail: "Set a focus keyphrase first." });
  } else if (metaDescription.includes(kpLower)) {
    checks.push({ label: "Keyphrase in meta description", status: "good", detail: "Keyphrase found in meta description." });
  } else {
    checks.push({ label: "Keyphrase in meta description", status: "bad", detail: "Add keyphrase to meta description." });
  }

  // 5. Keyphrase in intro (10pts)
  if (!kp) {
    checks.push({ label: "Keyphrase in introduction", status: "bad", detail: "Set a focus keyphrase first." });
  } else if (firstText.includes(kpLower)) {
    checks.push({ label: "Keyphrase in introduction", status: "good", detail: "Keyphrase in first paragraph." });
  } else {
    checks.push({ label: "Keyphrase in introduction", status: "ok", detail: "Consider adding keyphrase to intro." });
  }

  // 6. Keyphrase density (10pts)
  if (!kp) {
    checks.push({ label: "Keyphrase density", status: "bad", detail: "Set a focus keyphrase first." });
  } else if (density >= 0.5 && density <= 3) {
    checks.push({ label: "Keyphrase density", status: "good", detail: `${density.toFixed(1)}% — ideal range (0.5–3%).` });
  } else if (density < 0.5) {
    checks.push({ label: "Keyphrase density", status: "ok", detail: `${density.toFixed(1)}% — too low, use keyphrase more.` });
  } else {
    checks.push({ label: "Keyphrase density", status: "bad", detail: `${density.toFixed(1)}% — too high, reduce usage.` });
  }

  // 7. Content length (15pts)
  if (totalWords >= 900) {
    checks.push({ label: "Content length", status: "good", detail: `${totalWords} words — excellent length.` });
  } else if (totalWords >= 300) {
    checks.push({ label: "Content length", status: "ok", detail: `${totalWords} words — aim for 900+.` });
  } else {
    checks.push({ label: "Content length", status: "bad", detail: `${totalWords} words — too short (min 300).` });
  }

  // 8. Meta description length (7pts)
  if (metaDescriptionLen >= 120 && metaDescriptionLen <= 155) {
    checks.push({ label: "Meta description length", status: "good", detail: `${metaDescriptionLen} chars — perfect.` });
  } else if (metaDescriptionLen > 0) {
    checks.push({ label: "Meta description length", status: "ok", detail: `${metaDescriptionLen} chars — aim for 120–155.` });
  } else {
    checks.push({ label: "Meta description length", status: "bad", detail: "No meta description set." });
  }

  // 9. SEO title length (7pts)
  if (titleLen >= 30 && titleLen <= 60) {
    checks.push({ label: "SEO title length", status: "good", detail: `${titleLen} chars — ideal.` });
  } else if (titleLen > 0) {
    checks.push({ label: "SEO title length", status: "ok", detail: `${titleLen} chars — aim for 30–60.` });
  } else {
    checks.push({ label: "SEO title length", status: "bad", detail: "Title is empty." });
  }

  // 10. Image alt text (5pts) — checks thumbnail + content images
  const totalImages = imgBlocks.length + (hasThumbnail ? 1 : 0);
  const totalMissing = imgsWithoutAlt + (hasThumbnail && !thumbnailHasAlt ? 1 : 0);

  if (totalImages === 0) {
    checks.push({ label: "Image alt text", status: "ok", detail: "No images found." });
  } else if (totalMissing === 0) {
    checks.push({ label: "Image alt text", status: "good", detail: "All images have alt text." });
  } else if (hasThumbnail && !thumbnailHasAlt && imgBlocks.length === 0) {
    checks.push({ label: "Image alt text", status: "ok", detail: "Thumbnail alt text missing." });
  } else {
    checks.push({ label: "Image alt text", status: "bad", detail: `${totalMissing} image(s) missing alt text.` });
  }

  // 11. Indexability (5pts)
  if (form.noindex) {
    checks.push({ label: "Indexability", status: "bad", detail: "Noindex is on — this post will be hidden from search results." });
  } else {
    checks.push({ label: "Indexability", status: "good", detail: "Indexable — search engines can show this post." });
  }

  // Score calculation
  const weights: Record<string, number> = {
    "Focus keyphrase": 5, "Keyphrase in SEO title": 15, "Keyphrase in slug": 15,
    "Keyphrase in meta description": 15, "Keyphrase in introduction": 10,
    "Keyphrase density": 10, "Content length": 15, "Meta description length": 7,
    "SEO title length": 7, "Image alt text": 5, "Indexability": 5,
  };
  const maxScore = Object.values(weights).reduce((a, b) => a + b, 0);
  const earned = checks.reduce((sum, c) => {
    const w = weights[c.label] ?? 0;
    return sum + (c.status === "good" ? w : c.status === "ok" ? w * 0.5 : 0);
  }, 0);
  const score = Math.round((earned / maxScore) * 100);

  return { checks, score };
}

function runReadabilityChecks(form: BlogPost): { checks: Check[]; score: number } {
  const blocks = (form.content || []) as unknown as { type: string; heading?: string; content?: string }[];

  const paragraphTexts = blocks
    .filter(b => b.type === "section" || b.type === "paragraph" || b.type === "features")
    .map(b => {
      if (b.type === "features") {
        const f = b as unknown as { items: { description?: string }[] };
        return (f.items || []).map(it => it.description || "").join(" ");
      }
      return stripHtml((b as unknown as { content: string }).content || "");
    });

  const headingCount = blocks.filter(b =>
    b.type === "heading" || (b.type === "section" && b.heading)
  ).length;

  const allText = paragraphTexts.join(" ");
  const totalWords = wordCount(allText);
  const allSentences = sentences(allText);
  const avgSentLen = allSentences.length > 0
    ? allSentences.reduce((s, sent) => s + wordCount(sent), 0) / allSentences.length
    : 0;

  const longParas = paragraphTexts.filter(p => wordCount(p) > 150).length;

  // Consecutive sentences starting with same word
  let consecutiveCount = 0;
  for (let i = 0; i < allSentences.length - 2; i++) {
    const w1 = allSentences[i].split(" ")[0]?.toLowerCase();
    const w2 = allSentences[i + 1].split(" ")[0]?.toLowerCase();
    const w3 = allSentences[i + 2].split(" ")[0]?.toLowerCase();
    if (w1 && w1 === w2 && w1 === w3) consecutiveCount++;
  }

  const checks: Check[] = [];

  // Paragraph length (25pts)
  if (longParas === 0) {
    checks.push({ label: "Paragraph length", status: "good", detail: "All paragraphs are a good length." });
  } else if (longParas <= 2) {
    checks.push({ label: "Paragraph length", status: "ok", detail: `${longParas} paragraph(s) over 150 words — consider splitting.` });
  } else {
    checks.push({ label: "Paragraph length", status: "bad", detail: `${longParas} paragraphs are too long (>150 words).` });
  }

  // Subheading distribution (25pts)
  const wordsPerHeading = headingCount > 0 ? totalWords / headingCount : totalWords;
  if (headingCount === 0 && totalWords < 300) {
    checks.push({ label: "Subheading distribution", status: "ok", detail: "Short post — subheadings optional." });
  } else if (wordsPerHeading <= 300) {
    checks.push({ label: "Subheading distribution", status: "good", detail: "Good use of subheadings." });
  } else if (wordsPerHeading <= 600) {
    checks.push({ label: "Subheading distribution", status: "ok", detail: "Add more subheadings (one per ~300 words)." });
  } else {
    checks.push({ label: "Subheading distribution", status: "bad", detail: "No subheadings or too sparse." });
  }

  // Sentence length (25pts)
  if (avgSentLen <= 20) {
    checks.push({ label: "Sentence length", status: "good", detail: `Avg ${avgSentLen.toFixed(0)} words/sentence — great.` });
  } else if (avgSentLen <= 25) {
    checks.push({ label: "Sentence length", status: "ok", detail: `Avg ${avgSentLen.toFixed(0)} words/sentence — slightly long.` });
  } else {
    checks.push({ label: "Sentence length", status: "bad", detail: `Avg ${avgSentLen.toFixed(0)} words/sentence — too long.` });
  }

  // Consecutive sentences (25pts)
  if (consecutiveCount === 0) {
    checks.push({ label: "Consecutive sentences", status: "good", detail: "Good sentence variety." });
  } else {
    checks.push({ label: "Consecutive sentences", status: "ok", detail: `${consecutiveCount} group(s) of 3+ sentences starting the same way.` });
  }

  const maxScore = 100;
  const perCheck = maxScore / checks.length;
  const earned = checks.reduce((sum, c) => sum + (c.status === "good" ? perCheck : c.status === "ok" ? perCheck * 0.5 : 0), 0);
  const score = Math.round(earned);

  return { checks, score };
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Dot({ status }: { status: Status }) {
  return (
    <span className={`w-3 h-3 rounded-full flex-shrink-0 mt-0.5 ${
      status === "good" ? "bg-green-500" : status === "ok" ? "bg-orange-400" : "bg-red-500"
    }`} />
  );
}

function ScoreCircle({ score, label }: { score: number; label: string }) {
  const color = score >= 71 ? "#22c55e" : score >= 41 ? "#fb923c" : "#ef4444";
  const text = score >= 71 ? "Good" : score >= 41 ? "Needs work" : "Poor";
  const circumference = 2 * Math.PI * 20;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-14 h-14">
        <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" fill="none" stroke="#e5e7eb" strokeWidth="5" />
          <circle cx="24" cy="24" r="20" fill="none" stroke={color} strokeWidth="5"
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.4s ease" }} />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-gray-900">{score}</span>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color }}>{text}</span>
      <span className="text-[10px] text-gray-400 uppercase tracking-widest">{label}</span>
    </div>
  );
}

function CheckList({ checks }: { checks: Check[] }) {
  return (
    <div className="space-y-2">
      {checks.map((c, i) => (
        <div key={i} className="flex items-start gap-2.5">
          <Dot status={c.status} />
          <div>
            <p className="text-xs font-semibold text-gray-600 leading-tight">{c.label}</p>
            <p className="text-[11px] text-gray-400 leading-snug mt-0.5">{c.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Panel ────────────────────────────────────────────────────────────────

const inputCls = "w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-gray-400 placeholder:text-gray-400";

export default function SeoPanel({ form, onKeyphrase }: Props) {
  const kp = form.seo_keyphrase || "";

  const { checks: seoChecks, score: seoScore } = useMemo(
    () => runSeoChecks(form, kp),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form.title, form.meta_title, form.meta_description, form.noindex, form.slug, form.excerpt, form.content, kp]
  );

  const { checks: readChecks, score: readScore } = useMemo(
    () => runReadabilityChecks(form),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form.content]
  );

  return (
    <div className="space-y-4">
      {/* Score indicators */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">SEO Score</p>
        <div className="flex justify-around">
          <ScoreCircle score={seoScore} label="SEO" />
          <ScoreCircle score={readScore} label="Readability" />
        </div>
        {/* Progress bars */}
        <div className="mt-4 space-y-2">
          <div>
            <div className="flex justify-between text-[10px] text-gray-400 mb-1">
              <span>SEO</span><span>{seoScore}/100</span>
            </div>
            <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${seoScore}%`, background: seoScore >= 71 ? "#22c55e" : seoScore >= 41 ? "#fb923c" : "#ef4444" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[10px] text-gray-400 mb-1">
              <span>Readability</span><span>{readScore}/100</span>
            </div>
            <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${readScore}%`, background: readScore >= 71 ? "#22c55e" : readScore >= 41 ? "#fb923c" : "#ef4444" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Focus keyphrase */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Focus Keyphrase</p>
        <input value={kp} onChange={e => onKeyphrase(e.target.value)}
          placeholder="e.g. viral food content" className={inputCls} />
      </div>

      {/* SEO Analysis */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">SEO Analysis</p>
        <CheckList checks={seoChecks} />
      </div>

      {/* Readability */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Readability</p>
        <CheckList checks={readChecks} />
      </div>
    </div>
  );
}
