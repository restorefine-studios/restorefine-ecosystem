"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { createClient, type ContentBlock } from "@/lib/supabase";
import { uploadImage as uploadToStorage } from "@/lib/upload";
import {
  emptyProject,
  normaliseSections,
  PORTFOLIO_CATEGORIES,
  SECTION_LABELS,
  SECTION_ORDER,
  type PortfolioProject,
  type PortfolioSections,
  type SectionKey,
  type ServicePill,
} from "@/lib/portfolio";
import type { SeoInput } from "./SeoPanel";

const SeoPanel = dynamic(() => import("./SeoPanel"), { ssr: false });
const IconPicker = dynamic(() => import("./IconPicker"), { ssr: false });

interface PortfolioFormProps {
  initialData?: PortfolioProject;
  mode: "new" | "edit";
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

/**
 * Flatten a project into the shape the SEO analyser reads, so portfolio copy is
 * scored on the same checks as blog copy. Disabled sections are left out -
 * they never reach the page, so they shouldn't count towards word count.
 */
function toSeoInput(form: PortfolioProject): SeoInput {
  const s = form.sections;
  const content: ContentBlock[] = [];

  if (s.overview.enabled && s.overview.body) {
    content.push({ type: "section", heading: SECTION_LABELS.overview, content: s.overview.body });
  }
  if (s.challenges.enabled) {
    content.push({
      type: "section",
      heading: SECTION_LABELS.challenges,
      content: s.challenges.items.map((c) => `${c.title}. ${c.description}`).join(" "),
    });
  }
  if (s.strategy.enabled) {
    content.push({
      type: "section",
      heading: SECTION_LABELS.strategy,
      content: s.strategy.groups.map((g) => `${g.title}. ${g.items.join(". ")}`).join(" "),
    });
  }
  if (s.execution.enabled) {
    content.push({
      type: "section",
      heading: SECTION_LABELS.execution,
      content: `${s.execution.intro} ${s.execution.items.join(". ")}`,
    });
  }
  if (s.results.enabled) {
    content.push({
      type: "section",
      heading: SECTION_LABELS.results,
      content: s.results.items.join(". "),
    });
  }
  if (s.faq.enabled) {
    content.push({ type: "faq", heading: SECTION_LABELS.faq, faqs: s.faq.items });
  }

  return {
    title: form.title,
    slug: form.slug,
    meta_title: form.meta_title,
    meta_description: form.meta_description,
    excerpt: form.description,
    thumbnail: form.hero_image,
    thumbnail_alt: form.hero_image_alt,
    noindex: form.noindex,
    seo_keyphrase: form.seo_keyphrase,
    content,
  };
}

export default function PortfolioForm({ initialData, mode }: PortfolioFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const heroInputRef = useRef<HTMLInputElement>(null);
  const cardInputRef = useRef<HTMLInputElement>(null);

  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingCard, setUploadingCard] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [slugLocked, setSlugLocked] = useState(mode === "edit");
  // The slug the DB row is keyed by right now: kept separate from form.slug so
  // updates still find the row after a slug change.
  const [originalSlug, setOriginalSlug] = useState(initialData?.slug ?? "");

  const [form, setForm] = useState<PortfolioProject>(
    initialData
      ? { ...initialData, services: initialData.services ?? [], sections: normaliseSections(initialData.sections) }
      : emptyProject()
  );

  function update<K extends keyof PortfolioProject>(field: K, value: PortfolioProject[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateSection<K extends SectionKey>(key: K, patch: Partial<PortfolioSections[K]>) {
    setForm((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [key]: { ...prev.sections[key], ...patch },
      } as PortfolioSections,
    }));
  }

  function handleClientNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const clientName = e.target.value;
    setForm((prev) => ({
      ...prev,
      client_name: clientName,
      slug: !slugLocked ? slugify(clientName) : prev.slug,
    }));
  }

  // ── Uploads ────────────────────────────────────────────────────────────────

  async function handleUpload(file: File, kind: "hero" | "card") {
    const isHero = kind === "hero";
    const setUploading = isHero ? setUploadingHero : setUploadingCard;
    const field: keyof PortfolioProject = isHero ? "hero_image" : "card_logo";

    setUploading(true);
    let publicUrl: string;
    try {
      publicUrl = await uploadToStorage({
        file,
        folder: isHero ? "portfolio-hero" : "portfolio-card",
        base: form.slug?.trim() || "",
        suffix: isHero ? `-hero-${Date.now()}` : `-card-${Date.now()}`,
        // Hero images run full-bleed; card logos never render above ~600px
        maxPx: isHero ? 2400 : 1200,
      });
    } catch (err) {
      alert("Upload failed: " + (err as Error).message);
      setUploading(false);
      return;
    }

    update(field, publicUrl);

    // Persist straight away so the image survives a refresh before saving
    if (originalSlug && mode === "edit") {
      const supabase = createClient();
      await supabase
        .from("portfolio_projects")
        .update({ [field]: publicUrl, updated_at: new Date().toISOString() })
        .eq("slug", originalSlug);
      queryClient.invalidateQueries({ queryKey: ["project", originalSlug] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setSavedMsg("Image saved ✓");
    }

    setUploading(false);
  }

  // ── Services ───────────────────────────────────────────────────────────────

  function updateService(index: number, patch: Partial<ServicePill>) {
    setForm((prev) => ({
      ...prev,
      services: prev.services.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    }));
  }

  function addService() {
    setForm((prev) => ({ ...prev, services: [...prev.services, { label: "", icon: "" }] }));
  }

  function removeService(index: number) {
    setForm((prev) => ({ ...prev, services: prev.services.filter((_, i) => i !== index) }));
  }

  // ── Save / delete ──────────────────────────────────────────────────────────

  const saveMutation = useMutation({
    mutationFn: async (publish?: boolean) => {
      if (!form.slug.trim()) throw new Error("Slug is required.");
      if (!form.client_name.trim()) throw new Error("Client name is required.");

      const supabase = createClient();
      const isPublished = publish !== undefined ? publish : form.published;
      const { id: _id, created_at: _createdAt, ...rest } = form;
      const payload = {
        ...rest,
        published: isPublished,
        updated_at: new Date().toISOString(),
      };
      if (mode === "new") {
        const { error } = await supabase.from("portfolio_projects").insert([payload]);
        if (error) throw new Error(error.message);
      } else {
        const { error } = await supabase.from("portfolio_projects").update(payload).eq("slug", originalSlug);
        if (error) throw new Error(error.message);
      }
      return { published: isPublished };
    },
    onSuccess: ({ published }) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", originalSlug] });
      if (form.slug !== originalSlug) queryClient.invalidateQueries({ queryKey: ["project", form.slug] });
      setForm((prev) => ({ ...prev, published }));
      setSavedMsg(published ? "Published" : "Saved");
      if (mode === "new") {
        router.push(`/dashboard/portfolio/${form.slug}`);
      } else if (form.slug !== originalSlug) {
        setOriginalSlug(form.slug);
        router.replace(`/dashboard/portfolio/${form.slug}`);
      }
    },
    onError: (err) => alert("Save failed: " + err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const supabase = createClient();
      const { error } = await supabase.from("portfolio_projects").delete().eq("slug", originalSlug);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      router.push("/dashboard/portfolio");
    },
    onError: (err) => alert("Delete failed: " + err.message),
  });

  useEffect(() => {
    if (!savedMsg) return;
    const t = setTimeout(() => setSavedMsg(null), 3000);
    return () => clearTimeout(t);
  }, [savedMsg]);

  // Section numbers on the live page come from enabled sections only
  const enabledOrder = SECTION_ORDER.filter((key) => form.sections[key].enabled);
  const sectionNumber = (key: SectionKey) => {
    const i = enabledOrder.indexOf(key);
    return i === -1 ? "--" : String(i + 1).padStart(2, "0");
  };

  const s = form.sections;

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 items-start">
        {/* ── Left: form ── */}
        <div className="space-y-6">

          {/* Project details */}
          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Project Details</h3>

            <Field label="Client Name">
              <input value={form.client_name} onChange={handleClientNameChange} placeholder="It's Padel" className={inputCls} />
            </Field>

            <Field label="Slug">
              <div className="flex gap-2 items-center">
                <input
                  value={form.slug}
                  onChange={(e) => { setSlugLocked(true); update("slug", e.target.value); }}
                  placeholder="itspadel"
                  className={inputCls + " flex-1"}
                />
                <button
                  type="button"
                  title={slugLocked ? "Unlock: auto-generate from client name" : "Lock: editing manually"}
                  onClick={() => {
                    if (slugLocked) {
                      setSlugLocked(false);
                      update("slug", slugify(form.client_name));
                    } else {
                      setSlugLocked(true);
                    }
                  }}
                  className={`flex-shrink-0 px-3 py-2.5 rounded-lg border text-[10px] font-black uppercase tracking-widest transition ${
                    slugLocked
                      ? "border-gray-200 bg-gray-100 text-gray-500 hover:text-white"
                      : "border-emerald-700 bg-emerald-950 text-emerald-400"
                  }`}
                >
                  {slugLocked ? "Locked" : "Auto"}
                </button>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Live at /portfolio/{form.slug || "your-slug"}
              </p>
            </Field>

            <Field label="Project Title">
              <input
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="Building a Digital Presence for a Padel Academy"
                className={inputCls}
              />
            </Field>

            <Field label="Short Description">
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                rows={3}
                placeholder="One or two lines shown on listings and used as the fallback meta description."
                className={inputCls}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">
                <select value={form.category} onChange={(e) => update("category", e.target.value)} className={inputCls}>
                  {PORTFOLIO_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Project Date">
                <input
                  type="date"
                  value={form.project_date}
                  onChange={(e) => update("project_date", e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>
          </section>

          {/* Images */}
          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Images</h3>

            <Field label="Hero Image">
              <div className="flex gap-3 items-start">
                <input
                  value={form.hero_image}
                  onChange={(e) => update("hero_image", e.target.value)}
                  placeholder="URL or upload"
                  className={inputCls + " flex-1"}
                />
                <button type="button" onClick={() => heroInputRef.current?.click()} disabled={uploadingHero} className={uploadBtnCls}>
                  {uploadingHero ? "Uploading..." : "Upload"}
                </button>
                <input
                  ref={heroInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "hero")}
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Full-bleed banner at the top of the case study. Wide images work best (roughly 32:15).
              </p>
              {form.hero_image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.hero_image} alt="hero preview" className="mt-3 w-full aspect-video object-cover rounded-xl border border-gray-200" />
              )}
            </Field>

            <Field label="Hero Alt Text">
              <input
                value={form.hero_image_alt}
                onChange={(e) => update("hero_image_alt", e.target.value)}
                placeholder="Describe the image for SEO"
                className={inputCls}
              />
            </Field>

            <div className="h-px bg-gray-100" />

            <Field label="Grid Card Logo">
              <div className="flex gap-3 items-start">
                <input
                  value={form.card_logo}
                  onChange={(e) => update("card_logo", e.target.value)}
                  placeholder="URL or upload (SVG keeps its crispness)"
                  className={inputCls + " flex-1"}
                />
                <button type="button" onClick={() => cardInputRef.current?.click()} disabled={uploadingCard} className={uploadBtnCls}>
                  {uploadingCard ? "Uploading..." : "Upload"}
                </button>
                <input
                  ref={cardInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "card")}
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                The client logo shown on the /portfolio grid. Upload a white or light logo to sit on the card colour.
              </p>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Card Logo Alt Text">
                <input
                  value={form.card_logo_alt}
                  onChange={(e) => update("card_logo_alt", e.target.value)}
                  placeholder="It's Padel logo"
                  className={inputCls}
                />
              </Field>
              <Field label="Card Background">
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={/^#[0-9a-fA-F]{6}$/.test(form.card_bg) ? form.card_bg : "#000000"}
                    onChange={(e) => update("card_bg", e.target.value)}
                    className="w-11 h-11 rounded-lg border border-gray-200 bg-white p-1 cursor-pointer flex-shrink-0"
                  />
                  <input value={form.card_bg} onChange={(e) => update("card_bg", e.target.value)} placeholder="#000000" className={inputCls} />
                </div>
              </Field>
            </div>

            {form.card_logo && (
              <div
                className="rounded-xl border border-gray-200 h-32 flex items-center justify-center"
                style={{ background: form.card_bg }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.card_logo} alt={form.card_logo_alt || "card preview"} className="max-h-[45%] max-w-[55%] object-contain" />
              </div>
            )}
          </section>

          {/* Service pills */}
          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Services</h3>
              <p className="text-[11px] text-gray-400 mt-1">The pill row above the case study, e.g. Branding, Web Development.</p>
            </div>

            {form.services.length === 0 && (
              <p className="text-gray-400 text-sm py-2">No services yet.</p>
            )}

            <div className="space-y-3">
              {form.services.map((service, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-2 bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Service {i + 1}</span>
                    <button type="button" onClick={() => removeService(i)} className={removeBtnCls}>Remove</button>
                  </div>
                  <IconPicker value={service.icon || ""} onChange={(icon) => updateService(i, { icon })} />
                  <input
                    value={service.label}
                    onChange={(e) => updateService(i, { label: e.target.value })}
                    placeholder="Branding"
                    className={inputCls}
                  />
                </div>
              ))}
            </div>

            <button type="button" onClick={addService} className={addBtnCls}>+ Add Service</button>
          </section>

          {/* ── Case study sections ── */}
          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Case Study Sections</h3>
              <p className="text-[11px] text-gray-400 mt-1">
                Fixed order. Switch off anything this client doesn&apos;t need: numbering and the sidebar
                contents renumber automatically.
              </p>
            </div>

            {/* 01 Overview */}
            <SectionPanel
              num={sectionNumber("overview")}
              label={SECTION_LABELS.overview}
              enabled={s.overview.enabled}
              onToggle={(enabled) => updateSection("overview", { enabled })}
            >
              <Field label="Overview Text">
                <textarea
                  value={s.overview.body}
                  onChange={(e) => updateSection("overview", { body: e.target.value })}
                  rows={5}
                  placeholder="What the project set out to do, and what RestoRefine delivered."
                  className={inputCls}
                />
              </Field>
            </SectionPanel>

            {/* 02 Live Website */}
            <SectionPanel
              num={sectionNumber("liveWebsite")}
              label={SECTION_LABELS.liveWebsite}
              enabled={s.liveWebsite.enabled}
              onToggle={(enabled) => updateSection("liveWebsite", { enabled })}
            >
              <Field label="Website URL">
                <input
                  value={s.liveWebsite.url}
                  onChange={(e) => updateSection("liveWebsite", { url: e.target.value })}
                  placeholder="https://www.itspadel.co.uk/"
                  className={inputCls}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Domain">
                  <input
                    value={s.liveWebsite.domain}
                    onChange={(e) => updateSection("liveWebsite", { domain: e.target.value })}
                    placeholder="itspadel.co.uk"
                    className={inputCls}
                  />
                </Field>
                <Field label="Label">
                  <input
                    value={s.liveWebsite.linkLabel}
                    onChange={(e) => updateSection("liveWebsite", { linkLabel: e.target.value })}
                    placeholder="It's Padel"
                    className={inputCls}
                  />
                </Field>
              </div>
            </SectionPanel>

            {/* 03 Challenges */}
            <SectionPanel
              num={sectionNumber("challenges")}
              label={SECTION_LABELS.challenges}
              enabled={s.challenges.enabled}
              onToggle={(enabled) => updateSection("challenges", { enabled })}
            >
              <div className="space-y-3">
                {s.challenges.items.map((item, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-2 bg-gray-50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        Challenge {String(i + 1).padStart(2, "0")}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateSection("challenges", { items: s.challenges.items.filter((_, j) => j !== i) })}
                        className={removeBtnCls}
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      value={item.title}
                      onChange={(e) =>
                        updateSection("challenges", {
                          items: s.challenges.items.map((it, j) => (j === i ? { ...it, title: e.target.value } : it)),
                        })
                      }
                      placeholder="Lack of a Consistent Brand Identity"
                      className={inputCls}
                    />
                    <textarea
                      value={item.description}
                      onChange={(e) =>
                        updateSection("challenges", {
                          items: s.challenges.items.map((it, j) => (j === i ? { ...it, description: e.target.value } : it)),
                        })
                      }
                      rows={2}
                      placeholder="What the problem was, in one or two sentences."
                      className={inputCls}
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => updateSection("challenges", { items: [...s.challenges.items, { title: "", description: "" }] })}
                className={addBtnCls}
              >
                + Add Challenge
              </button>
              <p className="text-[11px] text-gray-400">Four challenges fill the dark block evenly.</p>
            </SectionPanel>

            {/* 04 Strategy */}
            <SectionPanel
              num={sectionNumber("strategy")}
              label={SECTION_LABELS.strategy}
              enabled={s.strategy.enabled}
              onToggle={(enabled) => updateSection("strategy", { enabled })}
            >
              <div className="space-y-3">
                {s.strategy.groups.map((group, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-2 bg-gray-50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        Column {String(i + 1).padStart(2, "0")}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateSection("strategy", { groups: s.strategy.groups.filter((_, j) => j !== i) })}
                        className={removeBtnCls}
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      value={group.title}
                      onChange={(e) =>
                        updateSection("strategy", {
                          groups: s.strategy.groups.map((g, j) => (j === i ? { ...g, title: e.target.value } : g)),
                        })
                      }
                      placeholder="Branding"
                      className={inputCls}
                    />
                    <StringList
                      items={group.items}
                      placeholder="Designed logo and brand guidelines"
                      addLabel="+ Add Bullet"
                      onChange={(items) =>
                        updateSection("strategy", {
                          groups: s.strategy.groups.map((g, j) => (j === i ? { ...g, items } : g)),
                        })
                      }
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => updateSection("strategy", { groups: [...s.strategy.groups, { title: "", items: [""] }] })}
                className={addBtnCls}
              >
                + Add Column
              </button>
              <p className="text-[11px] text-gray-400">Three columns match the It&apos;s Padel layout.</p>
            </SectionPanel>

            {/* 05 Creative Execution */}
            <SectionPanel
              num={sectionNumber("execution")}
              label={SECTION_LABELS.execution}
              enabled={s.execution.enabled}
              onToggle={(enabled) => updateSection("execution", { enabled })}
            >
              <Field label="Intro Line">
                <textarea
                  value={s.execution.intro}
                  onChange={(e) => updateSection("execution", { intro: e.target.value })}
                  rows={2}
                  placeholder="Our team produced a wide range of creative assets, including:"
                  className={inputCls}
                />
              </Field>
              <Field label="Deliverables">
                <StringList
                  items={s.execution.items}
                  placeholder="Logo and brand identity design"
                  addLabel="+ Add Deliverable"
                  onChange={(items) => updateSection("execution", { items })}
                />
              </Field>
            </SectionPanel>

            {/* 06 Results */}
            <SectionPanel
              num={sectionNumber("results")}
              label={SECTION_LABELS.results}
              enabled={s.results.enabled}
              onToggle={(enabled) => updateSection("results", { enabled })}
            >
              <StringList
                items={s.results.items}
                placeholder="Increased social media engagement through strategic content"
                addLabel="+ Add Result"
                onChange={(items) => updateSection("results", { items })}
              />
            </SectionPanel>

            {/* 07 FAQs */}
            <SectionPanel
              num={sectionNumber("faq")}
              label={SECTION_LABELS.faq}
              enabled={s.faq.enabled}
              onToggle={(enabled) => updateSection("faq", { enabled })}
            >
              <div className="space-y-3">
                {s.faq.items.map((item, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-2 bg-gray-50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Question {i + 1}</span>
                      <button
                        type="button"
                        onClick={() => updateSection("faq", { items: s.faq.items.filter((_, j) => j !== i) })}
                        className={removeBtnCls}
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      value={item.question}
                      onChange={(e) =>
                        updateSection("faq", {
                          items: s.faq.items.map((it, j) => (j === i ? { ...it, question: e.target.value } : it)),
                        })
                      }
                      placeholder="Question"
                      className={inputCls}
                    />
                    <textarea
                      value={item.answer}
                      onChange={(e) =>
                        updateSection("faq", {
                          items: s.faq.items.map((it, j) => (j === i ? { ...it, answer: e.target.value } : it)),
                        })
                      }
                      rows={3}
                      placeholder="Answer"
                      className={inputCls}
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => updateSection("faq", { items: [...s.faq.items, { question: "", answer: "" }] })}
                className={addBtnCls}
              >
                + Add Question
              </button>
              <p className="text-[11px] text-gray-400">Published as FAQ schema so it can win rich results.</p>
            </SectionPanel>
          </section>

          {/* CTA */}
          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Call to Action</h3>
            <Field label="CTA Heading">
              <input
                value={form.cta_heading}
                onChange={(e) => update("cta_heading", e.target.value)}
                placeholder="Ready to Elevate Your Brand?"
                className={inputCls}
              />
            </Field>
            <Field label="CTA Body">
              <textarea
                value={form.cta_body}
                onChange={(e) => update("cta_body", e.target.value)}
                rows={3}
                placeholder="Short persuasive line under the CTA heading"
                className={inputCls}
              />
            </Field>
          </section>

          {/* SEO */}
          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Search</h3>
            <Field label="Meta Title">
              <input
                value={form.meta_title}
                onChange={(e) => update("meta_title", e.target.value)}
                placeholder={form.title || "Defaults to the project title"}
                className={inputCls}
              />
              <p className="text-[11px] text-gray-400 mt-1">
                {(form.meta_title || form.title || "").length}/60 chars
                {(form.meta_title || form.title || "").length > 60 && <span className="text-red-400 ml-1">Too long</span>}
              </p>
            </Field>
            <Field label="Meta Description">
              <textarea
                value={form.meta_description}
                onChange={(e) => update("meta_description", e.target.value)}
                placeholder={form.description || "Defaults to the short description"}
                rows={3}
                className={inputCls}
              />
              <p className="text-[11px] text-gray-400 mt-1">
                {(form.meta_description || form.description || "").length}/155 chars
                {(form.meta_description || form.description || "").length > 155 && <span className="text-red-400 ml-1">Too long</span>}
              </p>
            </Field>
            <Field label="Search Engine Indexing">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!form.noindex}
                  onChange={(e) => update("noindex", !e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300"
                />
                Allow search engines to index this project
              </label>
              {form.noindex && (
                <p className="text-[11px] text-amber-500 mt-1">This project will be hidden from search results (noindex).</p>
              )}
            </Field>
          </section>
        </div>

        {/* ── Right: SEO panel ── */}
        <div className="hidden xl:block sticky top-6 self-start max-h-[calc(100vh-5rem)] overflow-y-auto pr-1 scrollbar-thin">
          <SeoPanel form={toSeoInput(form)} onKeyphrase={(v) => update("seo_keyphrase", v)} />
        </div>
      </div>

      {/* ── Actions — fixed bottom bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-screen-2xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => saveMutation.mutate(undefined)}
              disabled={saveMutation.isPending}
              className="bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg hover:bg-gray-200 transition disabled:opacity-50 border border-gray-200"
            >
              {saveMutation.isPending ? "Saving..." : "Save Draft"}
            </button>
            <button
              onClick={() => saveMutation.mutate(true)}
              disabled={saveMutation.isPending}
              className="bg-gray-900 text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
            >
              {form.published ? "Update & Publish" : "Publish"}
            </button>
            {savedMsg && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                {savedMsg}
              </span>
            )}
          </div>
          {mode === "edit" && (
            <button
              onClick={() => { if (!confirm("Delete this project? This cannot be undone.")) return; deleteMutation.mutate(); }}
              disabled={deleteMutation.isPending}
              className="text-xs font-semibold text-red-400 hover:text-red-600 transition disabled:opacity-50"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete Project"}
            </button>
          )}
        </div>
      </div>

      {/* Spacer so content isn't hidden behind the fixed bar */}
      <div className="h-16" />
    </>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function SectionPanel({
  num,
  label,
  enabled,
  onToggle,
  children,
}: {
  num: string;
  label: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div className={`border rounded-xl overflow-hidden transition-colors ${enabled ? "border-gray-200 bg-white" : "border-gray-100 bg-gray-50"}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-3">
          <span className={`text-[11px] font-black tabular-nums ${enabled ? "text-red-600" : "text-gray-300"}`}>{num}</span>
          <span className={`text-[11px] font-black uppercase tracking-widest ${enabled ? "text-gray-700" : "text-gray-400"}`}>
            {label}
          </span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label={`${enabled ? "Hide" : "Show"} ${label}`}
          onClick={() => onToggle(!enabled)}
          className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${enabled ? "bg-emerald-500" : "bg-gray-300"}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-5" : "translate-x-0"}`}
          />
        </button>
      </div>
      {enabled && <div className="p-4 space-y-4">{children}</div>}
    </div>
  );
}

/** Editable list of plain strings: bullets, deliverables, results. */
function StringList({
  items,
  placeholder,
  addLabel,
  onChange,
}: {
  items: string[];
  placeholder: string;
  addLabel: string;
  onChange: (items: string[]) => void;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            value={item}
            onChange={(e) => onChange(items.map((it, j) => (j === i ? e.target.value : it)))}
            placeholder={placeholder}
            className={inputCls + " flex-1"}
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            aria-label="Remove item"
            className="w-8 h-8 flex-shrink-0 rounded-md flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 transition"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M1 1l8 8M9 1L1 9" />
            </svg>
          </button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, ""])} className={addBtnCls}>
        {addLabel}
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-gray-400 placeholder:text-gray-400 resize-none";
const uploadBtnCls = "text-xs font-bold uppercase tracking-widest bg-gray-100 text-gray-700 px-3 py-2.5 rounded-lg hover:bg-gray-200 transition whitespace-nowrap disabled:opacity-50";
const addBtnCls = "text-xs font-bold text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-400 px-4 py-2 rounded-lg transition";
const removeBtnCls = "text-[10px] text-red-400 hover:text-red-600 font-semibold";
