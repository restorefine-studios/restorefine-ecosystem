/**
 * Each client's most-viewed TikTok, played in the content page's case-study rail.
 * `id` is the number at the end of the video URL: tiktok.com/@handle/video/<id>.
 * While this list is empty the rail shows the portfolio cards instead.
 */
export type TikTokVideo = { client: string; handle: string; id: string };

export const tiktokVideos: TikTokVideo[] = [
  { client: "Himalayan Dine In", handle: "himalayandinein", id: "7665771825154034966" },
  { client: "Damasqino", handle: "damasqinoglasgow", id: "7645732593220029718" },
  { client: "Zaks", handle: "zaks.spudbox", id: "7664273713625369878" },
  { client: "Mannis", handle: "mannisuk", id: "7682030073574345987" },
  { client: "Masala", handle: "masalatakeawaycumnock", id: "7697298734689946902" },
  { client: "Spuds", handle: "spudsedinburgh", id: "7700688388243967264" },
  { client: "Blanc Events", handle: "blanceventsuk", id: "7666884578019151126" },
];

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

/**
 * A video's view count, read from the playCount in TikTok's public video page.
 * Cached for six hours. Gives null if TikTok blocks or changes the page, and the
 * card then leaves the count out rather than breaking the section.
 */
export async function getTikTokViews(v: TikTokVideo): Promise<number | null> {
  try {
    const res = await fetch(`https://www.tiktok.com/@${v.handle}/video/${v.id}`, {
      headers: { "user-agent": UA, "accept-language": "en-GB,en;q=0.9" },
      next: { revalidate: 21600 },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return null;
    const m = (await res.text()).match(/"playCount":(\d+)/);
    return m ? Number(m[1]) : null;
  } catch {
    return null;
  }
}

/** 194900 → "194.9K" */
export const formatViews = (n: number) => new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);
