"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { createClient, type BlogPost, type ContentBlock } from "@/lib/supabase";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("./RichTextEditor"), { ssr: false });
const SeoPanel = dynamic(() => import("./SeoPanel"), { ssr: false });
const IconPicker = dynamic(() => import("./IconPicker"), { ssr: false });

interface PostFormProps {
  initialData?: BlogPost;
  mode: "new" | "edit";
}

function mergeBlocks(blocks: ContentBlock[]): ContentBlock[] {
  const out: ContentBlock[] = [];
  let i = 0;
  while (i < blocks.length) {
    const cur = blocks[i];
    // Already a section or image — keep as-is
    if (cur.type === "section" || cur.type === "image") {
      out.push(cur);
      i++;
      continue;
    }
    // heading followed by paragraph → merge into one section
    if (cur.type === "heading") {
      const next = blocks[i + 1];
      if (next && next.type === "paragraph") {
        out.push({ type: "section", heading: cur.content, content: next.content } as unknown as ContentBlock);
        i += 2;
        continue;
      }
      // Lone heading → section with empty paragraph
      out.push({ type: "section", heading: cur.content, content: "" } as unknown as ContentBlock);
      i++;
      continue;
    }
    // Standalone paragraph → section with empty heading
    if (cur.type === "paragraph") {
      out.push({ type: "section", heading: "", content: cur.content } as unknown as ContentBlock);
      i++;
      continue;
    }
    out.push(cur);
    i++;
  }
  return out;
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

export default function PostForm({ initialData, mode }: PostFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [slugLocked, setSlugLocked] = useState(mode === "edit");
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<BlogPost>(
    initialData ? { ...initialData, content: mergeBlocks(initialData.content) } : {
      slug: "",
      title: "",
      subtitle: "",
      thumbnail: "",
      thumbnail_alt: "",
      author: "Restorefine Team",
      author_image: "/blogauthorholder.webp",
      date: new Date().toISOString().split("T")[0],
      excerpt: "",
      meta_title: "",
      meta_description: "",
      noindex: false,
      content: [],
      cta_heading: "Let's craft something great",
      cta_body: "Ready to grow your restaurant or hospitality brand online? Work with RestoRefine to build a digital presence that drives real results.",
      published: false,
    }
  );

  function update(field: keyof BlogPost, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      slug: !slugLocked ? slugify(title) : prev.slug,
    }));
  }

  function buildPath(folder: string, suffix: string, ext: string) {
    const base = form.slug?.trim() || `upload-${Date.now()}`;
    return `${folder}/${base}${suffix}.${ext}`;
  }

  async function uploadImage(file: File, setUploading: (v: boolean) => void, field: "thumbnail" | "author_image") {
    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop() ?? "jpg";
    const suffix = field === "author_image" ? "-author" : "";
    const path = buildPath(field, suffix, ext);
    const { error } = await supabase.storage.from("blog-images").upload(path, file, { upsert: true });
    if (error) { alert("Upload failed: " + error.message); setUploading(false); return; }
    const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
    const publicUrl = data.publicUrl;

    // Update local state
    update(field, publicUrl);

    // Auto-persist to DB immediately so it survives a page refresh
    if (form.slug && mode === "edit") {
      await supabase
        .from("blog_posts")
        .update({ [field]: publicUrl, updated_at: new Date().toISOString() })
        .eq("slug", form.slug);
      queryClient.invalidateQueries({ queryKey: ["post", form.slug] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setSavedMsg("Image saved");
    }

    setUploading(false);
  }

  async function uploadContentImage(file: File, index: number) {
    const supabase = createClient();
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = buildPath("content", `-${index}-${Date.now()}`, ext);
    const { error } = await supabase.storage.from("blog-images").upload(path, file, { upsert: true });
    if (error) { alert("Upload failed: " + error.message); return; }
    const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
    updateBlock(index, { src: data.publicUrl } as Partial<ContentBlock>);
  }

  function addSection() {
    const block: ContentBlock = { type: "section" as ContentBlock["type"], heading: "", content: "" } as ContentBlock;
    setForm((prev) => ({ ...prev, content: [...prev.content, block] }));
  }

  function addFeatures() {
    const block = { type: "features", heading: "", description: "", footerDescription: "", items: [{ icon: "", title: "", description: "" }] } as unknown as ContentBlock;
    setForm((prev) => ({ ...prev, content: [...prev.content, block] }));
  }

  function addImage() {
    const block: ContentBlock = { type: "image", src: "" };
    setForm((prev) => ({ ...prev, content: [...prev.content, block] }));
  }

  function removeBlock(index: number) {
    setForm((prev) => ({ ...prev, content: prev.content.filter((_, i) => i !== index) }));
  }

  function moveBlock(index: number, dir: -1 | 1) {
    setForm((prev) => {
      const blocks = [...prev.content];
      const target = index + dir;
      if (target < 0 || target >= blocks.length) return prev;
      [blocks[index], blocks[target]] = [blocks[target], blocks[index]];
      return { ...prev, content: blocks };
    });
  }

  function updateBlock(index: number, patch: Partial<ContentBlock>) {
    setForm((prev) => {
      const blocks = prev.content.map((b, i) => i === index ? ({ ...b, ...patch } as ContentBlock) : b);
      return { ...prev, content: blocks };
    });
  }

  const saveMutation = useMutation({
    mutationFn: async (publish?: boolean) => {
      const supabase = createClient();
      const isPublished = publish !== undefined ? publish : form.published;
      const payload = {
        ...form,
        published: isPublished,
        updated_at: new Date().toISOString(),
        post_type: "simple",
        structured_data: null,
      };
      if (mode === "new") {
        const { error } = await supabase.from("blog_posts").insert([payload]);
        if (error) throw new Error(error.message);
      } else {
        const { error } = await supabase.from("blog_posts").update(payload).eq("slug", form.slug);
        if (error) throw new Error(error.message);
      }
      return { published: isPublished };
    },
    onSuccess: ({ published }) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", form.slug] });
      setSavedMsg(published ? "Published" : "Saved");
      // Only redirect after creating a brand-new post
      if (mode === "new") router.push(`/dashboard/${form.slug}`);
    },
    onError: (err) => alert("Save failed: " + err.message),
  });

  // Auto-clear the saved message after 3s
  useEffect(() => {
    if (!savedMsg) return;
    const t = setTimeout(() => setSavedMsg(null), 3000);
    return () => clearTimeout(t);
  }, [savedMsg]);

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const supabase = createClient();
      const { error } = await supabase.from("blog_posts").delete().eq("slug", form.slug);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push("/dashboard");
    },
    onError: (err) => alert("Delete failed: " + err.message),
  });

  return (
    <>
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 items-start">
    {/* ── Left: form ── */}
    <div className="space-y-6">
      {/* Post Details */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Post Details</h3>
        <Field label="Title">
          <input value={form.title} onChange={handleTitleChange} placeholder="Post title" className={inputCls} />
        </Field>
        <Field label="Slug">
          <div className="flex gap-2 items-center">
            <input
              value={form.slug}
              onChange={(e) => { setSlugLocked(true); update("slug", e.target.value); }}
              placeholder="post-slug"
              className={inputCls + " flex-1"}
            />
            <button
              type="button"
              title={slugLocked ? "Unlock: auto-generate from title" : "Lock: editing manually"}
              onClick={() => {
                if (slugLocked) {
                  setSlugLocked(false);
                  update("slug", slugify(form.title));
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
            {slugLocked ? "Click Locked to regenerate from title" : "Auto-generating from title"}
          </p>
        </Field>
        <Field label="Meta Title">
          <input
            value={form.meta_title ?? ""}
            onChange={(e) => update("meta_title", e.target.value)}
            placeholder={form.title || "Defaults to post title"}
            className={inputCls}
          />
          <p className="text-[11px] text-gray-400 mt-1">
            {(form.meta_title || form.title || "").length}/60 chars
            {(form.meta_title || form.title || "").length > 60 && <span className="text-red-400 ml-1">Too long</span>}
          </p>
        </Field>
        <Field label="Meta Description">
          <textarea
            value={form.meta_description ?? ""}
            onChange={(e) => update("meta_description", e.target.value)}
            placeholder={form.excerpt || "Defaults to excerpt"}
            rows={3}
            className={inputCls}
          />
          <p className="text-[11px] text-gray-400 mt-1">
            {(form.meta_description || form.excerpt || "").length}/155 chars
            {(form.meta_description || form.excerpt || "").length > 155 && <span className="text-red-400 ml-1">Too long</span>}
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
            Allow search engines to index this post
          </label>
          {form.noindex && (
            <p className="text-[11px] text-amber-500 mt-1">This post will be hidden from search results (noindex).</p>
          )}
        </Field>
        <Field label="Subtitle (optional)">
          <input value={form.subtitle ?? ""} onChange={(e) => update("subtitle", e.target.value)} placeholder="Optional subtitle" className={inputCls} />
        </Field>
        <Field label="Excerpt">
          <textarea value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} placeholder="Short description for SEO and listings" rows={3} className={inputCls} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Author">
            <input value={form.author} onChange={(e) => update("author", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Date">
            <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className={inputCls} />
          </Field>
        </div>
      </section>

      {/* Images */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Images</h3>
        <Field label="Thumbnail">
          <div className="flex gap-3 items-start">
            <input value={form.thumbnail} onChange={(e) => update("thumbnail", e.target.value)} placeholder="URL or upload" className={inputCls + " flex-1"} />
            <button onClick={() => thumbnailInputRef.current?.click()} disabled={uploadingThumbnail} className={uploadBtnCls}>
              {uploadingThumbnail ? "Uploading..." : "Upload"}
            </button>
            <input ref={thumbnailInputRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], setUploadingThumbnail, "thumbnail")} />
          </div>
          {form.thumbnail && (() => {
            const src = form.thumbnail.startsWith("http")
              ? form.thumbnail
              : `https://www.restorefine.co.uk${form.thumbnail}`;
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt="thumbnail preview" className="mt-3 w-full aspect-video object-cover rounded-xl border border-gray-200" />
            );
          })()}
        </Field>
        <Field label="Thumbnail Alt Text">
          <input value={form.thumbnail_alt ?? ""} onChange={(e) => update("thumbnail_alt", e.target.value)} placeholder="Describe the image for SEO" className={inputCls} />
        </Field>
      </section>

      {/* CTA */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Call to Action</h3>
        <Field label="CTA Heading">
          <input
            value={form.cta_heading ?? ""}
            onChange={(e) => update("cta_heading", e.target.value)}
            placeholder="Let's craft something great"
            className={inputCls}
          />
        </Field>
        <Field label="CTA Body">
          <textarea
            value={form.cta_body ?? ""}
            onChange={(e) => update("cta_body", e.target.value)}
            rows={3}
            placeholder="Short persuasive line under the CTA heading"
            className={inputCls}
          />
        </Field>
      </section>

      {/* Content blocks */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-3">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">Content</h3>

        {form.content.length === 0 && (
          <p className="text-gray-400 text-sm py-4 text-center">No sections yet. Hit + to add your first section.</p>
        )}

        {form.content.map((block, i) => {
          // Normalise legacy heading/paragraph blocks into section for display
          const isSection = block.type === "section" || block.type === "heading" || block.type === "paragraph";


          if (block.type === "features") {
            const fb = block as unknown as { type: "features"; heading?: string; description?: string; footerDescription?: string; items: { icon?: string; title?: string; description?: string }[] };
            return (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 bg-gray-50">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Feature List — Section {i + 1}</span>
                  <BlockControls i={i} total={form.content.length} onMove={moveBlock} onRemove={removeBlock} />
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Section Heading (optional)</label>
                    <input value={fb.heading || ""} onChange={e => updateBlock(i, { heading: e.target.value } as Partial<ContentBlock>)} placeholder="e.g. What You Get" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Section Description (optional)</label>
                    <RichTextEditor value={fb.description || ""} onChange={html => updateBlock(i, { description: html } as Partial<ContentBlock>)} />
                  </div>
                  <div className="space-y-3">
                    {fb.items.map((item, idx) => (
                      <div key={idx} className="border border-gray-100 rounded-xl p-3 space-y-2 bg-gray-50">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Item {idx + 1}</span>
                          <button type="button" onClick={() => { const items = fb.items.filter((_, j) => j !== idx); updateBlock(i, { items } as Partial<ContentBlock>); }} className="text-[10px] text-red-400 hover:text-red-600 font-semibold">Remove</button>
                        </div>
                        <IconPicker value={item.icon || ""} onChange={icon => { const items = fb.items.map((it, j) => j === idx ? { ...it, icon } : it); updateBlock(i, { items } as Partial<ContentBlock>); }} />
                        <input value={item.title || ""} onChange={e => { const items = fb.items.map((it, j) => j === idx ? { ...it, title: e.target.value } : it); updateBlock(i, { items } as Partial<ContentBlock>); }} placeholder="Title (optional)" className={inputCls} />
                        <textarea value={item.description || ""} onChange={e => { const items = fb.items.map((it, j) => j === idx ? { ...it, description: e.target.value } : it); updateBlock(i, { items } as Partial<ContentBlock>); }} placeholder="Description (optional)" rows={2} className={inputCls} />
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => updateBlock(i, { items: [...fb.items, { icon: "", title: "", description: "" }] } as Partial<ContentBlock>)} className="text-xs font-bold text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-400 px-4 py-2 rounded-lg transition">
                    + Add Item
                  </button>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Description After Items (optional)</label>
                    <RichTextEditor value={fb.footerDescription || ""} onChange={html => updateBlock(i, { footerDescription: html } as Partial<ContentBlock>)} />
                  </div>
                </div>
              </div>
            );
          }

          if (block.type === "image") {
            return (
              <div key={i} className="border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 bg-gray-100">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Image</span>
                  <BlockControls i={i} total={form.content.length} onMove={moveBlock} onRemove={removeBlock} />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex gap-3">
                    <input value={block.src} onChange={(e) => updateBlock(i, { src: e.target.value })} placeholder="Image URL" className={inputCls + " flex-1"} />
                    <label className={uploadBtnCls + " cursor-pointer"}>
                      Upload
                      <input type="file" accept="image/*" className="hidden"
                        onChange={(e) => e.target.files?.[0] && uploadContentImage(e.target.files[0], i)} />
                    </label>
                  </div>
                  <input value={block.alt ?? ""} onChange={(e) => updateBlock(i, { alt: e.target.value })} placeholder="Alt text" className={inputCls} />
                  <input value={block.caption ?? ""} onChange={(e) => updateBlock(i, { caption: e.target.value })} placeholder="Caption (optional)" className={inputCls} />
                  {block.src && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={block.src} alt={block.alt} className="w-32 h-20 object-cover rounded-lg border border-gray-200 mt-1" />
                  )}
                </div>
              </div>
            );
          }

          // Section block (heading + rich text paragraph combined)
          const headingVal = block.type === "section"
            ? (block as { type: "section"; heading: string; content: string }).heading
            : block.type === "heading" ? block.content : "";
          const contentVal = block.type === "section"
            ? (block as { type: "section"; heading: string; content: string }).content
            : block.type === "paragraph" ? block.content : "";

          return (
            <div key={i} className="border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
              {/* Block header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 bg-gray-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Section {i + 1}</span>
                <BlockControls i={i} total={form.content.length} onMove={moveBlock} onRemove={removeBlock} />
              </div>
              {/* Heading */}
              <div className="px-4 pt-4 pb-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Heading</label>
                <input
                  value={headingVal}
                  onChange={(e) => {
                    if (block.type === "section") {
                      updateBlock(i, { heading: e.target.value } as Partial<ContentBlock>);
                    } else if (block.type === "heading") {
                      updateBlock(i, { content: e.target.value });
                    }
                  }}
                  placeholder="Section heading..."
                  className={inputCls}
                />
              </div>
              {/* Rich text paragraph */}
              <div className="px-4 pb-4">
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 mt-3">Paragraph</label>
                <RichTextEditor
                  value={contentVal}
                  onChange={(html) => {
                    if (block.type === "section") {
                      updateBlock(i, { content: html } as Partial<ContentBlock>);
                    } else if (block.type === "paragraph") {
                      updateBlock(i, { content: html });
                    }
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* Add buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={addSection}
            className="flex items-center gap-2 text-sm font-bold text-gray-900 bg-gray-200 hover:bg-gray-100 border border-gray-300 px-5 py-2.5 rounded-xl transition"
          >
            <span className="text-lg leading-none">+</span> Add Section
          </button>
          <button
            type="button"
            onClick={addFeatures}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300 px-4 py-2.5 rounded-xl transition"
          >
            <span className="text-base leading-none">+</span> Feature List
          </button>
          <button
            type="button"
            onClick={addImage}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300 px-4 py-2.5 rounded-xl transition"
          >
            <span className="text-base leading-none">+</span> Image
          </button>
        </div>
      </section>

    </div>{/* end left column */}

    {/* ── Right: SEO panel ── */}
    <div className="hidden xl:block sticky top-6 self-start max-h-[calc(100vh-5rem)] overflow-y-auto pr-1 scrollbar-thin">
      <SeoPanel
        form={form}
        onKeyphrase={(v) => update("seo_keyphrase" as keyof BlogPost, v)}
      />
    </div>

    </div>

    {/* ── Actions — fixed bottom bar ── */}
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200">
      <div className="max-w-screen-2xl mx-auto px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={() => saveMutation.mutate(undefined)} disabled={saveMutation.isPending}
          className="bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg hover:bg-gray-200 transition disabled:opacity-50 border border-gray-200">
          {saveMutation.isPending ? "Saving..." : "Save Draft"}
        </button>
        <button onClick={() => saveMutation.mutate(true)} disabled={saveMutation.isPending}
          className="bg-gray-900 text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg hover:bg-gray-700 transition disabled:opacity-50">
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
        <button onClick={() => { if (!confirm("Delete this post? This cannot be undone.")) return; deleteMutation.mutate(); }}
          disabled={deleteMutation.isPending}
          className="text-xs font-semibold text-red-400 hover:text-red-600 transition disabled:opacity-50">
          {deleteMutation.isPending ? "Deleting..." : "Delete Post"}
        </button>
      )}
      </div>
    </div>

    {/* Spacer so content isn't hidden behind the fixed bar */}
    <div className="h-16" />
    </>

  );
}

function BlockControls({ i, total, onMove, onRemove }: { i: number; total: number; onMove: (i: number, d: -1 | 1) => void; onRemove: (i: number) => void }) {
  const arrowBtn = "w-7 h-7 rounded-md flex items-center justify-center transition disabled:opacity-25 bg-gray-900 hover:bg-gray-700 text-white";
  return (
    <div className="flex items-center gap-1.5">
      <button type="button" onClick={() => onMove(i, -1)} disabled={i === 0} className={arrowBtn} title="Move up">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 10V2M2 5l4-4 4 4" />
        </svg>
      </button>
      <button type="button" onClick={() => onMove(i, 1)} disabled={i === total - 1} className={arrowBtn} title="Move down">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2v8M2 7l4 4 4-4" />
        </svg>
      </button>
      <button type="button" onClick={() => onRemove(i)}
        className="w-7 h-7 rounded-md flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 transition" title="Remove">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M1 1l8 8M9 1L1 9" />
        </svg>
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
const controlBtnCls = "text-xs text-gray-400 hover:text-gray-700 font-semibold px-2 py-1 rounded transition disabled:opacity-30";
