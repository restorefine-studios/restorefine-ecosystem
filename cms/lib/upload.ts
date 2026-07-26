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
 * SVGs are uploaded untouched: rasterising a logo to WebP would throw away
 * the very thing that makes it scale.
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

  const payload = isSvg ? file : await compressImage(file, maxPx, quality).catch(() => file);
  const path = buildUploadPath(folder, base, suffix, isSvg ? "svg" : "webp");

  const { error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(path, payload, { upsert: true, contentType: isSvg ? "image/svg+xml" : "image/webp" });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
