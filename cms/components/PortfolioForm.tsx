"use client";

import { Fragment, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Image as ImageIcon, Plus } from "lucide-react";
import { createClient, type ContentBlock } from "@/lib/supabase";
import { uploadImage as uploadToStorage } from "@/lib/upload";
import {
  emptyProject,
  normaliseSections,
  normaliseSectionOrder,
  PORTFOLIO_CATEGORIES,
  SECTION_LABELS,
  DEFAULT_CHART_PALETTE,
  imageKey,
  isImageKey,
  parseTikTokUrl,
  type ChartSeries,
  type ChartTile,
  type ImageBlock,
  type OrderKey,
  type PortfolioProject,
  type PortfolioSections,
  type ProjectSections,
  type SectionKey,
  type ServicePill,
} from "@/lib/portfolio";
import type { SeoInput } from "./SeoPanel";

const SeoPanel = dynamic(() => import("./SeoPanel"), { ssr: false });
const IconPicker = dynamic(() => import("./IconPicker"), { ssr: false });
const ChartPreview = dynamic(() => import("./ChartPreview").then((m) => m.ChartPreview), { ssr: false });

interface PortfolioFormProps {
  initialData?: PortfolioProject;
  mode: "new" | "edit";
}

/** A short id for a new image block, and a timestamp for upload file names. */
const newBlockId = () => crypto.randomUUID().slice(0, 8);
const uploadStamp = () => Date.now();

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
  if (s.stats.enabled) {
    content.push({
      type: "section",
      heading: SECTION_LABELS.stats,
      content: s.stats.items.map((i) => `${i.value} ${i.label} ${i.growth ?? ""}`).join(" "),
    });
  }
  if (s.charts.enabled) {
    const chartText = s.charts.items
      .map((t) =>
        t.kind === "text"
          ? `${t.heading ?? ""} ${(t.bullets ?? []).map((b) => `${b.lead}. ${b.body}`).join(" ")}`
          : `${t.title ?? ""} ${(t.categories ?? []).join(" ")}`
      )
      .join(" ");
    content.push({ type: "section", heading: SECTION_LABELS.charts, content: chartText });
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
  // Id of the image block that is uploading right now, if any
  const [uploadingBlock, setUploadingBlock] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [slugLocked, setSlugLocked] = useState(mode === "edit");
  // The slug the DB row is keyed by right now: kept separate from form.slug so
  // updates still find the row after a slug change.
  const [originalSlug, setOriginalSlug] = useState(initialData?.slug ?? "");

  const [form, setForm] = useState<PortfolioProject>(
    initialData
      ? {
          ...initialData,
          services: initialData.services ?? [],
          sections: normaliseSections(initialData.sections),
          section_order: normaliseSectionOrder(initialData.section_order, normaliseSections(initialData.sections).imageBlocks),
        }
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
      } as ProjectSections,
    }));
  }

  function moveSection(key: OrderKey, direction: -1 | 1) {
    setForm((prev) => {
      const order = normaliseSectionOrder(prev.section_order, prev.sections.imageBlocks);
      const i = order.indexOf(key);
      const j = i + direction;
      if (j < 0 || j >= order.length) return prev;
      const next = [...order];
      [next[i], next[j]] = [next[j], next[i]];
      return { ...prev, section_order: next };
    });
  }

  function handleClientNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const clientName = e.target.value;
    setForm((prev) => ({
      ...prev,
      client_name: clientName,
      slug: !slugLocked ? slugify(clientName) : prev.slug,
    }));
  }

  // -- Uploads --

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
      setSavedMsg("Image saved OK");
    }

    setUploading(false);
  }

  // -- Image blocks: any number, placed anywhere between the sections --

  /** Adds an empty image block at position `at` in the section order. */
  function addImageBlock(at: number) {
    const id = newBlockId();
    setForm((prev) => {
      const order = normaliseSectionOrder(prev.section_order, prev.sections.imageBlocks);
      const next = [...order];
      next.splice(at, 0, imageKey(id));
      return {
        ...prev,
        sections: {
          ...prev.sections,
          imageBlocks: [...prev.sections.imageBlocks, { id, heading: "", layout: "full", items: [] }],
        },
        section_order: next,
      };
    });
  }

  function updateImageBlock(id: string, change: (block: ImageBlock) => ImageBlock) {
    setForm((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        imageBlocks: prev.sections.imageBlocks.map((b) => (b.id === id ? change(b) : b)),
      },
    }));
  }

  function removeImageBlock(id: string) {
    setForm((prev) => ({
      ...prev,
      sections: { ...prev.sections, imageBlocks: prev.sections.imageBlocks.filter((b) => b.id !== id) },
      section_order: prev.section_order.filter((k) => k !== imageKey(id)),
    }));
  }

  /** Uploads the chosen files one by one and adds each to the block as it lands. */
  async function uploadBlockImages(id: string, files: File[]) {
    setUploadingBlock(id);
    for (const [n, file] of files.entries()) {
      try {
        const src = await uploadToStorage({
          file,
          // Same folder as hero images, so no extra storage policy is needed
          folder: "portfolio-hero",
          base: form.slug?.trim() || "",
          suffix: `-content-${uploadStamp()}-${n}`,
          maxPx: 2400,
        });
        updateImageBlock(id, (b) => ({ ...b, items: [...b.items, { src, alt: "", caption: "" }] }));
      } catch (err) {
        alert(`Upload failed for ${file.name}: ` + (err as Error).message);
      }
    }
    setUploadingBlock(null);
  }

  // -- Services --

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

  // -- Save / delete --

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

  // Cmd/Ctrl+S saves without publishing, like any editor
  const saveRef = useRef(() => {});
  useEffect(() => {
    saveRef.current = () => {
      if (!saveMutation.isPending) saveMutation.mutate(undefined);
    };
  });
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        saveRef.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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

  // Section order and numbers are per-project now, not a fixed constant.
  const sectionOrder = normaliseSectionOrder(form.section_order, form.sections.imageBlocks);
  const enabledOrder = sectionOrder.filter((key) => !isImageKey(key) && form.sections[key].enabled);
  const sectionNumber = (key: SectionKey) => {
    const i = enabledOrder.indexOf(key);
    return i === -1 ? "--" : String(i + 1).padStart(2, "0");
  };

  const s = form.sections;

  function updateChartTile(tileIndex: number, patch: Partial<ChartTile>) {
    updateSection("charts", {
      items: s.charts.items.map((t, j) => (j === tileIndex ? { ...t, ...patch } : t)),
    });
  }

  const sectionBodies: Record<SectionKey, React.ReactNode> = {
    overview: (
      <Field label="Overview Text">
        <textarea
          value={s.overview.body}
          onChange={(e) => updateSection("overview", { body: e.target.value })}
          rows={5}
          placeholder="What the project set out to do, and what RestoRefine delivered."
          className={inputCls}
        />
      </Field>
    ),

    liveWebsite: (
      <>
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
      </>
    ),

    challenges: (
      <>
        <div className="space-y-3">
          {s.challenges.items.map((item, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-2 bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-zinc-500">
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
      </>
    ),

    strategy: (
      <>
        <div className="space-y-3">
          {s.strategy.groups.map((group, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-2 bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-zinc-500">
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
      </>
    ),

    execution: (
      <>
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
      </>
    ),

    results: (
      <StringList
        items={s.results.items}
        placeholder="Increased social media engagement through strategic content"
        addLabel="+ Add Result"
        onChange={(items) => updateSection("results", { items })}
      />
    ),

    stats: (
      <>
        <div className="space-y-3">
          {s.stats.items.map((item, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-2 bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-zinc-500">
                  Stat {String(i + 1).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => updateSection("stats", { items: s.stats.items.filter((_, j) => j !== i) })}
                  className={removeBtnCls}
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={item.value}
                  onChange={(e) =>
                    updateSection("stats", {
                      items: s.stats.items.map((it, j) => (j === i ? { ...it, value: e.target.value } : it)),
                    })
                  }
                  placeholder="315.78K"
                  className={inputCls}
                />
                <input
                  value={item.label}
                  onChange={(e) =>
                    updateSection("stats", {
                      items: s.stats.items.map((it, j) => (j === i ? { ...it, label: e.target.value } : it)),
                    })
                  }
                  placeholder="TOTAL IMPRESSIONS"
                  className={inputCls}
                />
              </div>
              <input
                value={item.growth ?? ""}
                onChange={(e) =>
                  updateSection("stats", {
                    items: s.stats.items.map((it, j) => (j === i ? { ...it, growth: e.target.value } : it)),
                  })
                }
                placeholder="+44.98% Growth"
                className={inputCls}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => updateSection("stats", { items: [...s.stats.items, { value: "", label: "", growth: "" }] })}
          className={addBtnCls}
        >
          + Add Stat
        </button>
        <p className="text-[11px] text-gray-400">
          Growth is free text; start it with &quot;-&quot; to show it in red instead of green.
        </p>
      </>
    ),

    charts: (
      <>
        <div className="space-y-4">
          {s.charts.items.map((tile, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => updateChartTile(i, { kind: "chart" })}
                    className={`px-3 py-1.5 rounded-full border text-xs font-medium transition ${
                      tile.kind === "chart" ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 text-gray-500"
                    }`}
                  >
                    Chart
                  </button>
                  <button
                    type="button"
                    onClick={() => updateChartTile(i, { kind: "text" })}
                    className={`px-3 py-1.5 rounded-full border text-xs font-medium transition ${
                      tile.kind === "text" ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 text-gray-500"
                    }`}
                  >
                    Text Card
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => updateSection("charts", { items: s.charts.items.filter((_, j) => j !== i) })}
                  className={removeBtnCls}
                >
                  Remove Tile
                </button>
              </div>

              <ChartOrTextTile tile={tile} onChange={(patch) => updateChartTile(i, patch)} />
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              updateSection("charts", {
                items: [
                  ...s.charts.items,
                  {
                    kind: "chart",
                    chartType: "bar",
                    orientation: "vertical",
                    title: "",
                    xAxisLabel: "",
                    yAxisLabel: "",
                    categoryMode: "custom",
                    showLegend: true,
                    categories: [""],
                    series: [{ name: "", color: DEFAULT_CHART_PALETTE[0], values: [""] }],
                  },
                ],
              })
            }
            className={addBtnCls}
          >
            + Add Chart
          </button>
          <button
            type="button"
            onClick={() =>
              updateSection("charts", {
                items: [...s.charts.items, { kind: "text", heading: "", bullets: [{ lead: "", body: "" }] }],
              })
            }
            className={addBtnCls}
          >
            + Add Text Card
          </button>
        </div>
        <p className="text-[11px] text-gray-400">
          Pie charts use one series (categories become slices); other chart types support any
          number of series.
        </p>
      </>
    ),

    tiktok: (
      <>
        <Field label="Intro Text (optional)">
          <textarea
            value={s.tiktok.intro}
            onChange={(e) => updateSection("tiktok", { intro: e.target.value })}
            rows={2}
            placeholder="A line about the content you made for this client."
            className={inputCls}
          />
        </Field>
        <div className="space-y-3">
          {s.tiktok.videos.map((video, i) => {
            const parsed = parseTikTokUrl(video.url);
            const setVideo = (patch: Partial<typeof video>) =>
              updateSection("tiktok", {
                videos: s.tiktok.videos.map((v, j) => (j === i ? { ...v, ...patch } : v)),
              });
            return (
              <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-2 bg-gray-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-zinc-500">
                    Video {i + 1}
                    {parsed && <span className="ml-2 normal-case tracking-normal text-emerald-600">@{parsed.handle}</span>}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateSection("tiktok", { videos: s.tiktok.videos.filter((_, j) => j !== i) })}
                    className={removeBtnCls}
                  >
                    Remove
                  </button>
                </div>
                <input
                  value={video.url}
                  onChange={(e) => setVideo({ url: e.target.value })}
                  placeholder="https://www.tiktok.com/@handle/video/7665771825154034966"
                  className={inputCls}
                />
                {video.url.trim() && !parsed && (
                  <p className="text-[11px] text-amber-600">
                    Paste the full video link (tiktok.com/@name/video/123...). Short vm.tiktok.com links
                    don&apos;t work: open the video in a browser and copy the address from there.
                  </p>
                )}
                <input
                  value={video.client}
                  onChange={(e) => setVideo({ client: e.target.value })}
                  placeholder="Name shown under the video (defaults to the @handle)"
                  className={inputCls}
                />
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => updateSection("tiktok", { videos: [...s.tiktok.videos, { url: "", client: "" }] })}
          className={addBtnCls}
        >
          + Add Video
        </button>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Button Label (optional)">
            <input
              value={s.tiktok.ctaLabel}
              onChange={(e) => updateSection("tiktok", { ctaLabel: e.target.value })}
              placeholder="Follow on TikTok"
              className={inputCls}
            />
          </Field>
          <Field label="Button Link">
            <input
              value={s.tiktok.ctaHref}
              onChange={(e) => updateSection("tiktok", { ctaHref: e.target.value })}
              placeholder="https://www.tiktok.com/@handle"
              className={inputCls}
            />
          </Field>
        </div>
        <p className="text-[11px] text-gray-400">
          Just paste the links. The website reads each video&apos;s view count from TikTok, refreshes it
          about every six hours, and shows the most-viewed video first. The button only appears when
          both its label and link are filled in.
        </p>
      </>
    ),

    faq: (
      <>
        <div className="space-y-3">
          {s.faq.items.map((item, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-2 bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-zinc-500">Question {i + 1}</span>
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
      </>
    ),
  };

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 items-start">
        {/* -- Left: form -- */}
        <div className="space-y-6">

          {/* Project details */}
          <section className="cms-card">
            <h3 className="cms-card-title">Project Details</h3>

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
                  className={`flex-shrink-0 px-3 py-2.5 rounded-full border text-xs font-medium transition ${
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
          <section className="cms-card">
            <h3 className="cms-card-title">Images</h3>

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
                <img src={form.hero_image} alt="hero preview" className="w-full max-w-md aspect-video object-cover rounded-xl ring-1 ring-zinc-950/10" />
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
          <section className="cms-card cms-card--plain">
            <div>
              <h3 className="cms-card-title">Services</h3>
              <p className="text-[11px] text-gray-400 mt-1">The pill row above the case study, e.g. Branding, Web Development.</p>
            </div>

            {form.services.length === 0 && (
              <p className="text-gray-400 text-sm py-2">No services yet.</p>
            )}

            <div className="space-y-3">
              {form.services.map((service, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-2 bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-zinc-500">Service {i + 1}</span>
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

          {/* -- Case study sections -- */}
          <section className="cms-card cms-card--plain">
            <div>
              <h3 className="cms-card-title">Case Study Sections</h3>
              <p className="text-[11px] text-gray-400 mt-1">
                Reorder with the arrows, fold a section by clicking its name, and switch off anything this
                client doesn&apos;t need. To place pictures anywhere, press &quot;Images here&quot; between two sections.
              </p>
            </div>

            {sectionOrder.map((key, i) => {
              const onMoveUp = i > 0 ? () => moveSection(key, -1) : undefined;
              const onMoveDown = i < sectionOrder.length - 1 ? () => moveSection(key, 1) : undefined;
              const block = isImageKey(key) ? s.imageBlocks.find((b) => imageKey(b.id) === key) : undefined;
              return (
                <Fragment key={key}>
                  <InsertImages onClick={() => addImageBlock(i)} />
                  {isImageKey(key) ? (
                    block && (
                      <ImageBlockPanel
                        block={block}
                        uploading={uploadingBlock === block.id}
                        onChange={(change) => updateImageBlock(block.id, change)}
                        onUpload={(files) => uploadBlockImages(block.id, files)}
                        onRemove={() => {
                          if (block.items.length === 0 || confirm("Remove this image block?")) removeImageBlock(block.id);
                        }}
                        onMoveUp={onMoveUp}
                        onMoveDown={onMoveDown}
                      />
                    )
                  ) : (
                    <SectionPanel
                      num={sectionNumber(key)}
                      label={SECTION_LABELS[key]}
                      enabled={s[key].enabled}
                      onToggle={(enabled) => updateSection(key, { enabled })}
                      onMoveUp={onMoveUp}
                      onMoveDown={onMoveDown}
                    >
                      {sectionBodies[key]}
                    </SectionPanel>
                  )}
                </Fragment>
              );
            })}
            <InsertImages onClick={() => addImageBlock(sectionOrder.length)} />
          </section>

          {/* CTA */}
          <section className="cms-card">
            <h3 className="cms-card-title">Call to Action</h3>
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
          <section className="cms-card">
            <h3 className="cms-card-title">Search</h3>
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

        {/* -- Right: SEO panel -- */}
        <div className="hidden xl:block sticky top-6 self-start max-h-[calc(100vh-5rem)] overflow-y-auto pr-1 scrollbar-thin">
          <SeoPanel form={toSeoInput(form)} onKeyphrase={(v) => update("seo_keyphrase", v)} />
        </div>
      </div>

      {/* -- Actions - fixed bottom bar -- */}
      <div className="fixed bottom-0 left-0 right-0 z-50 cms-bar border-t border-zinc-950/10">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => saveMutation.mutate(undefined)}
              disabled={saveMutation.isPending}
              className="bg-zinc-100 text-zinc-950 text-sm font-medium px-4 py-2 rounded-full hover:bg-zinc-200 transition disabled:opacity-50"
            >
              {saveMutation.isPending ? "Saving..." : "Save draft"}
            </button>
            <button
              onClick={() => saveMutation.mutate(true)}
              disabled={saveMutation.isPending}
              className="bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-red-700 transition disabled:opacity-50"
            >
              {form.published ? "Update and publish" : "Publish"}
            </button>
            {mode === "edit" && (
              <button
                type="button"
                onClick={async () => {
                  const url = `https://www.restorefine.co.uk/preview/portfolio/${originalSlug}`;
                  try {
                    await navigator.clipboard.writeText(url);
                  } catch {}
                  window.open(url, "_blank", "noopener,noreferrer");
                  setSavedMsg("Preview link copied");
                }}
                className="bg-white text-zinc-950 text-sm font-medium px-4 py-2 rounded-full hover:bg-zinc-50 transition ring-1 ring-zinc-950/10"
              >
                Preview
              </button>
            )}
            <span className="hidden text-xs text-zinc-500 lg:inline">Cmd/Ctrl+S saves a draft</span>
            {savedMsg && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                {savedMsg}
              </span>
            )}
          </div>
          {mode === "edit" && (
            <button
              onClick={() => { if (!confirm("Delete this project? This cannot be undone.")) return; deleteMutation.mutate(); }}
              disabled={deleteMutation.isPending}
              className="rounded-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition disabled:opacity-50"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete project"}
            </button>
          )}
        </div>
      </div>

      {/* Spacer so content isn't hidden behind the fixed bar */}
      <div className="h-16" />
    </>
  );
}

// -- Sub-components --

/** Up/down buttons shared by the section panels and the image blocks. */
function MoveButtons({ label, onMoveUp, onMoveDown }: { label: string; onMoveUp?: () => void; onMoveDown?: () => void }) {
  const cls =
    "flex h-7 w-7 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-950/5 hover:text-zinc-950 disabled:opacity-25 disabled:hover:bg-transparent";
  return (
    <div className="flex items-center">
      <button type="button" onClick={onMoveUp} disabled={!onMoveUp} aria-label={`Move ${label} up`} className={cls}>
        <ChevronUp className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      </button>
      <button type="button" onClick={onMoveDown} disabled={!onMoveDown} aria-label={`Move ${label} down`} className={cls}>
        <ChevronDown className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
}

/**
 * One case-study section. The header shows its place in the running order and
 * carries the move buttons and the on/off switch. Clicking the title folds the
 * fields away, so a long case study stays easy to scan.
 */
function SectionPanel({
  num,
  label,
  enabled,
  onToggle,
  onMoveUp,
  onMoveDown,
  children,
}: {
  num: string;
  label: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const showBody = enabled && open;
  return (
    <div className={`overflow-hidden rounded-xl ring-1 transition ${enabled ? "bg-white ring-zinc-950/10" : "bg-zinc-50 ring-zinc-950/5"}`}>
      <div className="flex items-center justify-between gap-3 py-2 pl-2 pr-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          disabled={!enabled}
          aria-expanded={showBody}
          className="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-2 py-1.5 text-left transition enabled:hover:bg-zinc-950/5"
        >
          <ChevronRight
            className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform ${showBody ? "rotate-90" : ""}`}
            strokeWidth={2}
            aria-hidden="true"
          />
          <span className={`w-6 shrink-0 text-xs tabular-nums ${enabled ? "text-zinc-500" : "text-zinc-300"}`}>{num}</span>
          <span className={`truncate text-[0.9375rem] font-medium ${enabled ? "text-zinc-950" : "text-zinc-500"}`}>{label}</span>
          {!enabled && <span className="text-xs text-zinc-500">Hidden</span>}
        </button>
        <div className="flex shrink-0 items-center gap-2">
          <MoveButtons label={label} onMoveUp={onMoveUp} onMoveDown={onMoveDown} />
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            aria-label={`${enabled ? "Hide" : "Show"} ${label}`}
            onClick={() => onToggle(!enabled)}
            className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${enabled ? "bg-emerald-500" : "bg-zinc-300"}`}
          >
            <span
              className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-5" : "translate-x-0"}`}
            />
          </button>
        </div>
      </div>
      {showBody && <div className="space-y-4 border-t border-zinc-950/5 p-4">{children}</div>}
    </div>
  );
}

/** The thin "add images at this spot" row shown between every two panels. */
function InsertImages({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 py-0.5 text-xs font-medium text-zinc-400 transition hover:text-zinc-950"
    >
      <span className="h-px flex-1 border-t border-dashed border-zinc-300 group-hover:border-zinc-500" />
      <span className="flex items-center gap-1">
        <Plus className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
        Images here
      </span>
      <span className="h-px flex-1 border-t border-dashed border-zinc-300 group-hover:border-zinc-500" />
    </button>
  );
}

const IMAGE_LAYOUTS: { value: ImageBlock["layout"]; label: string }[] = [
  { value: "full", label: "One per row (full width)" },
  { value: "two", label: "Two side by side" },
  { value: "three", label: "Three side by side" },
];

/** Editor for one image block: upload several pictures, order them, caption them. */
function ImageBlockPanel({
  block,
  uploading,
  onChange,
  onUpload,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  block: ImageBlock;
  uploading: boolean;
  onChange: (change: (block: ImageBlock) => ImageBlock) => void;
  onUpload: (files: File[]) => void;
  onRemove: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  const setItem = (i: number, patch: Partial<ImageBlock["items"][number]>) =>
    onChange((b) => ({ ...b, items: b.items.map((it, j) => (j === i ? { ...it, ...patch } : it)) }));
  const moveItem = (i: number, dir: -1 | 1) =>
    onChange((b) => {
      const j = i + dir;
      if (j < 0 || j >= b.items.length) return b;
      const items = [...b.items];
      [items[i], items[j]] = [items[j], items[i]];
      return { ...b, items };
    });

  return (
    <div className="overflow-hidden rounded-xl bg-white ring-1 ring-zinc-950/10">
      <div className="flex items-center justify-between gap-3 py-2 pl-4 pr-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <ImageIcon className="h-4 w-4 shrink-0 text-zinc-500" strokeWidth={2} aria-hidden="true" />
          <span className="truncate text-[0.9375rem] font-medium text-zinc-950">
            Images{block.heading?.trim() ? `: ${block.heading.trim()}` : ""}
          </span>
          <span className="shrink-0 text-xs tabular-nums text-zinc-500">{block.items.length}</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <MoveButtons label="images" onMoveUp={onMoveUp} onMoveDown={onMoveDown} />
          <button type="button" onClick={onRemove} className="rounded-full px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50">
            Remove
          </button>
        </div>
      </div>

      <div className="space-y-4 border-t border-zinc-950/5 p-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Heading (optional)">
            <input
              value={block.heading ?? ""}
              onChange={(e) => onChange((b) => ({ ...b, heading: e.target.value }))}
              placeholder="e.g. Brand Identity"
              className={inputCls}
            />
          </Field>
          <Field label="Layout">
            <select
              value={block.layout}
              onChange={(e) => onChange((b) => ({ ...b, layout: e.target.value as ImageBlock["layout"] }))}
              className={inputCls}
            >
              {IMAGE_LAYOUTS.map((l) => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </Field>
        </div>

        {block.items.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {block.items.map((item, i) => (
              <div key={item.src + i} className="border border-gray-100 rounded-xl p-2 space-y-2 bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.alt || "preview"} className="w-full aspect-video object-cover rounded-lg border border-gray-200 bg-white" />
                <input
                  value={item.alt}
                  onChange={(e) => setItem(i, { alt: e.target.value })}
                  placeholder="Describe the image (for SEO)"
                  className={inputCls}
                />
                <input
                  value={item.caption ?? ""}
                  onChange={(e) => setItem(i, { caption: e.target.value })}
                  placeholder="Caption (optional)"
                  className={inputCls}
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    <button type="button" onClick={() => moveItem(i, -1)} disabled={i === 0} className={addBtnCls + " !px-2 !py-1 disabled:opacity-30"} aria-label="Move image earlier">
                      <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                    </button>
                    <button type="button" onClick={() => moveItem(i, 1)} disabled={i === block.items.length - 1} className={addBtnCls + " !px-2 !py-1 disabled:opacity-30"} aria-label="Move image later">
                      <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => onChange((b) => ({ ...b, items: b.items.filter((_, j) => j !== i) }))}
                    className={removeBtnCls}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <label className={uploadBtnCls + " inline-block cursor-pointer" + (uploading ? " opacity-50 pointer-events-none" : "")}>
          {uploading ? "Uploading..." : "+ Upload images"}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              // Reset so picking the same file again still fires a change
              e.target.value = "";
              if (files.length) onUpload(files);
            }}
          />
        </label>
        <p className="text-[11px] text-gray-400">
          You can pick several images at once. Remember to save the project afterwards.
        </p>
      </div>
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

/** Routes a charts-section tile to its chart config editor or its text card editor. */
function ChartOrTextTile({
  tile,
  onChange,
}: {
  tile: ChartTile;
  onChange: (patch: Partial<ChartTile>) => void;
}) {
  if (tile.kind === "text") {
    const bullets = tile.bullets ?? [];
    return (
      <div className="space-y-3">
        <Field label="Heading">
          <input
            value={tile.heading ?? ""}
            onChange={(e) => onChange({ heading: e.target.value })}
            placeholder="Audience Demographics & Geography"
            className={inputCls}
          />
        </Field>
        <div className="space-y-2">
          {bullets.map((b, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-2 bg-white">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-zinc-500">Bullet {i + 1}</span>
                <button
                  type="button"
                  onClick={() => onChange({ bullets: bullets.filter((_, j) => j !== i) })}
                  className={removeBtnCls}
                >
                  Remove
                </button>
              </div>
              <input
                value={b.lead}
                onChange={(e) => onChange({ bullets: bullets.map((bb, j) => (j === i ? { ...bb, lead: e.target.value } : bb)) })}
                placeholder="Geographic Dominance"
                className={inputCls}
              />
              <textarea
                value={b.body}
                onChange={(e) => onChange({ bullets: bullets.map((bb, j) => (j === i ? { ...bb, body: e.target.value } : bb)) })}
                rows={2}
                placeholder="92.17% of overall audience is located in the UK."
                className={inputCls}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onChange({ bullets: [...bullets, { lead: "", body: "" }] })}
          className={addBtnCls}
        >
          + Add Bullet
        </button>
      </div>
    );
  }
  return <ChartTileEditor tile={tile} onChange={onChange} />;
}

/** Chart-type-specific fields plus the category/series spreadsheet editor and live preview. */
function ChartTileEditor({
  tile,
  onChange,
}: {
  tile: ChartTile;
  onChange: (patch: Partial<ChartTile>) => void;
}) {
  const categories = tile.categories ?? [];
  const series = tile.series ?? [];
  const isPie = tile.chartType === "pie";
  const isBar = tile.chartType === "bar";
  const isMonth = !isPie && tile.categoryMode === "month";

  function addCategory() {
    onChange({
      categories: [...categories, ""],
      series: series.map((sr) => ({ ...sr, values: [...sr.values, ""] })),
    });
  }
  function removeCategory(i: number) {
    onChange({
      categories: categories.filter((_, j) => j !== i),
      series: series.map((sr) => ({ ...sr, values: sr.values.filter((_, j) => j !== i) })),
    });
  }
  function updateCategory(i: number, value: string) {
    onChange({ categories: categories.map((c, j) => (j === i ? value : c)) });
  }
  function addSeries() {
    const color = DEFAULT_CHART_PALETTE[series.length % DEFAULT_CHART_PALETTE.length];
    onChange({ series: [...series, { name: "", color, values: categories.map(() => "") }] });
  }
  function removeSeries(i: number) {
    onChange({ series: series.filter((_, j) => j !== i) });
  }
  function updateSeries(i: number, patch: Partial<ChartSeries>) {
    onChange({ series: series.map((sr, j) => (j === i ? { ...sr, ...patch } : sr)) });
  }
  function updateValue(seriesIndex: number, catIndex: number, value: string) {
    onChange({
      series: series.map((sr, j) =>
        j === seriesIndex ? { ...sr, values: sr.values.map((v, k) => (k === catIndex ? value : v)) } : sr
      ),
    });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Chart Type">
          <select
            value={tile.chartType ?? "bar"}
            onChange={(e) => onChange({ chartType: e.target.value as ChartTile["chartType"] })}
            className={inputCls}
          >
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="area">Area</option>
            <option value="pie">Pie / Donut</option>
          </select>
        </Field>
        {isBar && (
          <Field label="Orientation">
            <select
              value={tile.orientation ?? "vertical"}
              onChange={(e) => onChange({ orientation: e.target.value as ChartTile["orientation"] })}
              className={inputCls}
            >
              <option value="vertical">Vertical</option>
              <option value="horizontal">Horizontal</option>
            </select>
          </Field>
        )}
      </div>

      <Field label="Chart Title">
        <input
          value={tile.title ?? ""}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Cross-Platform Performance Breakdown"
          className={inputCls}
        />
      </Field>

      {!isPie && (
        <Field label="Category Type">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onChange({ categoryMode: "custom" })}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                !isMonth
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-200 text-gray-500 hover:border-gray-400"
              }`}
            >
              Custom
            </button>
            <button
              type="button"
              onClick={() => onChange({ categoryMode: "month" })}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                isMonth
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-200 text-gray-500 hover:border-gray-400"
              }`}
            >
              By Month
            </button>
          </div>
          <p className="text-[11px] text-gray-400 mt-1.5">
            &quot;Custom&quot; lets you type any x-axis label (e.g. platform names). &quot;By Month&quot;
            adds a single year and turns each row into a month picker.
          </p>
        </Field>
      )}

      {!isPie && (
        <div className={`grid gap-4 ${isMonth ? "grid-cols-3" : "grid-cols-2"}`}>
          <Field label="X Axis Label">
            <input
              value={tile.xAxisLabel ?? ""}
              onChange={(e) => onChange({ xAxisLabel: e.target.value })}
              placeholder="Platform"
              className={inputCls}
            />
          </Field>
          <Field label="Y Axis Label">
            <input
              value={tile.yAxisLabel ?? ""}
              onChange={(e) => onChange({ yAxisLabel: e.target.value })}
              placeholder="Impressions (%)"
              className={inputCls}
            />
          </Field>
          {isMonth && (
            <Field label="Year">
              <input
                type="number"
                value={tile.year ?? ""}
                onChange={(e) => onChange({ year: e.target.value })}
                placeholder={String(new Date().getFullYear())}
                className={inputCls}
              />
            </Field>
          )}
        </div>
      )}

      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
        <input
          type="checkbox"
          checked={tile.showLegend ?? true}
          onChange={(e) => onChange({ showLegend: e.target.checked })}
          className="w-4 h-4 rounded border-gray-300"
        />
        Show legend
      </label>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2 text-xs font-medium text-zinc-500">
                {isPie ? "Slice" : isMonth ? "Month" : "Category"}
              </th>
              {series.map((sr, si) => (
                <th key={si} className="p-2 min-w-[160px]">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={/^#[0-9a-fA-F]{6}$/.test(sr.color) ? sr.color : "#000000"}
                      onChange={(e) => updateSeries(si, { color: e.target.value })}
                      className="w-7 h-7 rounded border border-gray-200 bg-white p-0.5 cursor-pointer flex-shrink-0"
                    />
                    <input
                      value={sr.name}
                      onChange={(e) => updateSeries(si, { name: e.target.value })}
                      placeholder={isPie ? "Value" : `Series ${si + 1}`}
                      className={inputCls}
                    />
                    {(!isPie || series.length > 1) && (
                      <button type="button" onClick={() => removeSeries(si)} className={removeBtnCls}>
                        &times;
                      </button>
                    )}
                  </div>
                </th>
              ))}
              <th className="p-2 align-bottom">
                {!isPie && (
                  <button type="button" onClick={addSeries} className={addBtnCls}>+ Series</button>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, ci) => (
              <tr key={ci} className="border-t border-gray-100">
                <td className="p-2">
                  <div className="flex items-center gap-1.5">
                    {isMonth ? (
                      <select value={cat} onChange={(e) => updateCategory(ci, e.target.value)} className={inputCls}>
                        <option value="" disabled>
                          Month
                        </option>
                        {MONTH_NAMES.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        value={cat}
                        onChange={(e) => updateCategory(ci, e.target.value)}
                        placeholder={isPie ? "Slice label" : "Category"}
                        className={inputCls}
                      />
                    )}
                    <button type="button" onClick={() => removeCategory(ci)} className={removeBtnCls}>
                      &times;
                    </button>
                  </div>
                </td>
                {series.map((sr, si) => (
                  <td key={si} className="p-2">
                    <input
                      value={sr.values[ci] ?? ""}
                      onChange={(e) => updateValue(si, ci, e.target.value)}
                      placeholder="0"
                      className={inputCls}
                    />
                  </td>
                ))}
                <td />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="button" onClick={addCategory} className={addBtnCls}>
        + Add {isPie ? "Slice" : isMonth ? "Month" : "Category"}
      </button>

      <div className="border border-gray-100 rounded-xl p-4 bg-white">
        <ChartPreview tile={tile} />
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="cms-field">
      <label className="cms-label">{label}</label>
      <div className="min-w-0 space-y-1.5">{children}</div>
    </div>
  );
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const inputCls = "w-full rounded-lg border border-transparent bg-zinc-100 px-3 py-2 text-[0.9375rem] text-zinc-950 placeholder:text-zinc-500 transition hover:bg-zinc-200/70";
const uploadBtnCls = "text-sm font-medium bg-zinc-100 text-zinc-950 px-4 py-2.5 rounded-full hover:bg-zinc-200 transition whitespace-nowrap disabled:opacity-50";
const addBtnCls = "text-sm font-medium text-zinc-950 bg-zinc-100 hover:bg-zinc-200 px-4 py-2 rounded-full transition";
const removeBtnCls = "text-xs font-medium text-red-600 hover:underline";
