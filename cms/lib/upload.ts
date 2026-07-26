"use client";

import { createClient } from "@/lib/supabase";

/** Every CMS image lives in this bucket, blogs and portfolio alike. */
export const IMAGE_BUCKET = "blog-images";

/**
 * Compress an image using the Canvas API.
 * - Resizes so the longest side never exceeds `maxPx`.
 * - Re-encodes as WebP at `quality` (0–1). Returns the original file untouched
 *   if the browser can't give us a canvas or a blob.
 * - Returns a new File so the original is unchanged.
 */
export async function compressImage(file: File, maxPx = 2400, quality = 0.95): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > maxPx || height > maxPx) {
        if (width >= height) {
          height = Math.round((height / width) * maxPx);
          width = maxPx;
        } else {
          width = Math.round((width / height) * maxPx);
          height = maxPx;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) { resolve(file); return; }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);
      const mimeType = "image/webp";
      canvas.toBlob(
        (blob) => {
          if (!blob) { resolve(file); return; }
          resolve(new File([blob], file.name.replace(/\.[^.]+$/, ".webp"), { type: mimeType }));
        },
        mimeType,
        quality,
      );
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Image load failed")); };
    img.src = url;
  });
}

/**
 * Storage path for an upload, e.g. `hero/itspadel-hero-1719400000000.webp`.
 * `base` is normally the entry slug so filenames stay readable and predictable.
 */
export function buildUploadPath(folder: string, base: string, suffix: string, ext = "webp") {
  const safeBase = base.trim() || `upload-${Date.now()}`;
  return `${folder}/${safeBase}${suffix}.${ext}`;
}

/** Elements that can execute or embed active content inside an SVG. */
const SVG_FORBIDDEN_TAGS = new Set([
  "script",
  "foreignobject",
  "iframe",
  "embed",
  "object",
  "audio",
  "video",
  "handler",
  "listener",
]);

function isUnsafeUrl(value: string) {
  // Strip whitespace and control chars first: "java\nscript:" is still a URL
  const cleaned = value.replace(/[\s\u0000-\u001F\u007F]/g, "").toLowerCase();
  return cleaned.startsWith("javascript:") || cleaned.startsWith("data:text/html");
}

/**
 * Strip active content from an SVG before it goes to storage.
 *
 * An SVG served from storage and opened directly is a document, not an image,
 * so any script inside it would run on the storage origin. Uses the browser's
 * own XML parser rather than regexes, so it sees the same tree an attacker
 * would rely on. Static logo geometry is untouched.
 *
 * Returns null if the file doesn't parse as SVG, so the caller can reject it.
 */
export async function sanitizeSvg(file: File): Promise<Blob | null> {
  const source = await file.text();
  const doc = new DOMParser().parseFromString(source, "image/svg+xml");

  const root = doc.documentElement;
  // A parse failure yields a <parsererror> document rather than throwing
  if (!root || root.localName.toLowerCase() !== "svg") return null;

  // Walk the tree by hand. getElementsByTagName is unreliable on namespaced XML
  // documents, and a sanitizer that silently matches nothing is worse than none.
  const elements: Element[] = [];
  const collect = (el: Element) => {
    elements.push(el);
    for (const child of Array.from(el.children)) collect(child);
  };
  collect(root);

  for (const el of elements) {
    if (SVG_FORBIDDEN_TAGS.has(el.localName.toLowerCase())) {
      el.remove();
      continue;
    }
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      // Inline event handlers: onload, onclick, and friends
      if (name.startsWith("on")) {
        el.removeAttribute(attr.name);
        continue;
      }
      const isUrlAttr = name === "href" || name === "src" || name.endsWith(":href");
      if (isUrlAttr && isUnsafeUrl(attr.value)) {
        el.removeAttribute(attr.name);
      }
    }
  }

  const cleaned = new XMLSerializer().serializeToString(doc);
  return new Blob([cleaned], { type: "image/svg+xml" });
}

interface UploadOptions {
  file: File;
  /** Storage folder, e.g. "thumbnail", "hero", "card". */
  folder: string;
  /** Filename stem, normally the entry slug. */
  base: string;
  /** Appended to the stem before the extension. Defaults to a timestamp. */
  suffix?: string;
  maxPx?: number;
  quality?: number;
}

/**
 * Compress to WebP, upload to storage, and return the public URL.
 * SVGs skip compression, since rasterising a logo would throw away the very
 * thing that makes it scale, but they are sanitized first.
 * Throws with the storage error message if the upload fails.
 */
export async function uploadImage({
  file,
  folder,
  base,
  suffix = `-${Date.now()}`,
  maxPx = 2400,
  quality = 0.95,
}: UploadOptions): Promise<string> {
  const supabase = createClient();
  const isSvg = file.type === "image/svg+xml";

  let payload: Blob;
  if (isSvg) {
    const cleaned = await sanitizeSvg(file);
    if (!cleaned) throw new Error("That SVG could not be read. Try re-exporting it.");
    payload = cleaned;
  } else {
    payload = await compressImage(file, maxPx, quality).catch(() => file);
  }

  const path = buildUploadPath(folder, base, suffix, isSvg ? "svg" : "webp");

  const { error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(path, payload, { upsert: true, contentType: isSvg ? "image/svg+xml" : "image/webp" });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
