import { PhotoRail, PhotoRailItem } from "@/blocks/home-v2/photo-card";
import { getTikTokViews, type TikTokVideo } from "@/lib/tiktok-videos";
import { TikTokCard } from "@/blocks/service-v2/tiktok-card";

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
          <TikTokCard video={v} views={views} />
        </PhotoRailItem>
      ))}
    </PhotoRail>
  );
}
