export type ContentBlock = { type: "paragraph"; content: string } | { type: "heading"; content: string } | { type: "image"; src: string; alt?: string; caption?: string };

export interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  thumbnail: string;
  thumbnailAlt?: string;
  author: string;
  authorImage: string;
  date: string;
  excerpt: string;
  content: ContentBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "psychology-behind-viral-food-content",
    title: "The Psychology Behind Viral Food Content",
    thumbnail: "/blog-thumbnail/psychology-behind-viral-food-content.png",
    thumbnailAlt: "The psychology behind viral food content — why food videos go viral on TikTok and Instagram",
    author: "Restorefine Team",
    authorImage: "/restorefine-logowhite.svg",
    date: "2025-05-31",
    excerpt:
      "Discover why food videos go viral and how restaurants use emotion, storytelling, and social media strategy to create scroll-stopping content.",
    content: [],
  },
  {
    slug: "how-we-helped-padel-academy-scotland-build-brand-from-scratch",
    title: "How We Helped a Padel Academy in Scotland Build Its Brand from Scratch",
    thumbnail: "/blog-thumbnail/how-we-helped-padel-academy-scotland-build-brand-from-scratch.png",
    thumbnailAlt: "How RestoreFine helped a padel academy in Scotland build its brand from scratch",
    author: "Restorefine Team",
    authorImage: "/restorefine-logowhite.svg",
    date: "2025-05-22",
    excerpt:
      "When It's Padel came to us, they had courts, coaches, and passion — but no logo, no website, and no digital strategy. Here's how RestoreFine changed that.",
    content: [],
  },
  {
    slug: "10-signs-your-business-needs-a-digital-marketing-company-in-glasgow",
    title: "10 Signs Your Business Needs a Digital Marketing Company in Glasgow",
    thumbnail: "/blog-thumbnail/10-signs-your-business-needs-a-digital-marketing-company-in-glasgow.png",
    thumbnailAlt: "10 signs your business needs a digital marketing company in Glasgow — RestoRefine blog",
    author: "Restorefine Team",
    authorImage: "/restorefine-logowhite.svg",
    date: "2025-05-22",
    excerpt:
      "Struggling to generate leads online? Discover 10 clear signs your business needs a digital marketing company in Glasgow — and how Restorefine can help you grow.",
    content: [],
  },
];
