import { ArrowUpRight, Eye } from "lucide-react";
import { PhotoRail, PhotoRailItem } from "@/blocks/home-v2/photo-card";
import { formatViews, getTikTokViews, type TikTokVideo } from "@/lib/tiktok-videos";

/**
 * A rail of client TikToks that play in place through TikTok's embed player.
 * The iframes load lazily, so only the cards near the viewport fetch the player.
 * View counts come from TikTok on the server and are cached (see getTikTokViews).
 */
export async function TikTokRail({ label, videos }: { label: string; videos: TikTokVideo[] }) {
  const counts = await Promise.all(videos.map(getTikTokViews));
  // Most-viewed first; any video whose count couldn't be read goes last, in list order
  const ranked = videos.map((v, i) => ({ v, views: counts[i] })).sort((a, b) => (b.views ?? -1) - (a.views ?? -1));
  return (
    <PhotoRail label={label}>
      {ranked.map(({ v, views }) => (
        <PhotoRailItem key={v.id}>
          <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] bg-zinc-950">
            <iframe
              src={`https://www.tiktok.com/player/v1/${v.id}?description=0&music_info=0&rel=0&native_context_menu=0&closed_caption=0`}
              title={`${v.client} on TikTok`}
              loading="lazy"
              allow="fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
          <a href={`https://www.tiktok.com/@${v.handle}/video/${v.id}`} target="_blank" rel="noopener noreferrer" className="group mt-4 flex items-start justify-between gap-4 px-1 no-underline">
            <span className="min-w-0 flex-1">
              {/* One line on every card: a long name truncates rather than pushing the views below it */}
              <span className="flex items-center gap-3">
                <span title={v.client} className="v2-card-title min-w-0 truncate text-zinc-950">{v.client}</span>
                {views !== null && (
                  <span className="v2-small inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-zinc-100 px-2.5 py-1 font-medium text-zinc-700">
                    <Eye className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                    {formatViews(views)} views
                  </span>
                )}
              </span>
              <span className="v2-small mt-1 block text-zinc-500">@{v.handle}</span>
            </span>
            <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-950 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white">
              <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
            </span>
          </a>
        </PhotoRailItem>
      ))}
    </PhotoRail>
  );
}
