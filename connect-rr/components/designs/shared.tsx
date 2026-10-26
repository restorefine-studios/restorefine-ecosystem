import Image from "next/image";
import { PenTool, TrendingUp, Video } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/social-icons";

// Pieces the alternative designs share; the current design keeps its own copies untouched

export const externalLink = { target: "_blank", rel: "noopener noreferrer" } as const;

export const socialMeta = {
  facebook: { icon: FacebookIcon },
  instagram: { icon: InstagramIcon },
  linkedin: { icon: LinkedInIcon },
} as const;

export const serviceMeta = {
  Brand: { icon: PenTool },
  Content: { icon: Video },
  Performance: { icon: TrendingUp },
} as const;

/** "auto" suits a bg-ink tile: white mark in light mode, black in dark mode. */
export function Logo({ size = 34, tone = "auto" }: { size?: number; tone?: "auto" | "white" }) {
  const height = Math.round(size * (35 / 34));
  if (tone === "white") {
    return <Image src="/restorefine-logowhite.svg" alt="RestoRefine" width={size} height={height} priority />;
  }
  return (
    <>
      <Image src="/restorefine-logowhite.svg" alt="RestoRefine" width={size} height={height} priority className="dark:hidden" />
      <Image src="/restorefine-logoblack.svg" alt="RestoRefine" width={size} height={height} priority className="hidden dark:block" />
    </>
  );
}
