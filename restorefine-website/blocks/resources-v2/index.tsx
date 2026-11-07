import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPostItem } from "@/app/resources/BlogPageClient";

const formatDate = (date: string) => (date ? new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "");

export type ResourcePost = BlogPostItem & { excerpt?: string; postType?: string };

const TYPE_LABEL: Record<string, string> = { blog: "Blog", "case-study": "Case study" };

/* Category (from the post's own type, when it has one) and date */
function Meta({ post }: { post: ResourcePost }) {
  const type = post.postType ? TYPE_LABEL[post.postType] : undefined;
  return (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
      {type && <span className="font-medium text-red-600">{type}</span>}
      {post.date && (
        <time dateTime={post.date} className="text-zinc-500">
          {formatDate(post.date)}
        </time>
      )}
    </span>
  );
}

/* The artwork at its own 16:9 shape, so nothing in the thumbnail is cut off */
function Artwork({ post, priority = false, sizes, radius }: { post: ResourcePost; priority?: boolean; sizes: string; radius: string }) {
  return (
    <span className={`relative block aspect-[16/9] overflow-hidden bg-zinc-100 ${radius} transition-[transform,box-shadow] duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)] motion-reduce:transform-none`}>
      <Image src={post.thumbnail || "/placeholder.svg"} alt={post.thumbnailAlt || post.title} fill priority={priority} sizes={sizes} className="object-cover" />
    </span>
  );
}

/* Newest post: artwork on the left, its details beside it */
function Featured({ post }: { post: ResourcePost }) {
  return (
    <Link href={`/resources/${post.slug}`} className="group grid gap-6 no-underline outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-8 lg:grid-cols-12 lg:items-center lg:gap-12">
      <span className="lg:col-span-7">
        <Artwork post={post} priority sizes="(min-width: 1024px) 58vw, 100vw" radius="rounded-[1.25rem]" />
      </span>
      <span className="lg:col-span-5">
        <Meta post={post} />
        <span className="mt-4 block font-[family-name:var(--font-display)] text-[clamp(1.75rem,2.6vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.03em] text-zinc-950 transition-colors group-hover:text-red-600">{post.title}</span>
        {post.excerpt && <span className="v2-body mt-4 line-clamp-3 block max-w-[52ch] text-zinc-600">{post.excerpt}</span>}
        <span className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-zinc-950 text-white transition-[background-color,transform] duration-300 ease-out-expo group-hover:rotate-45 group-hover:bg-red-600">
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        </span>
      </span>
    </Link>
  );
}

function Card({ post }: { post: ResourcePost }) {
  return (
    <Link href={`/resources/${post.slug}`} className="group block no-underline outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-8">
      <Artwork post={post} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" radius="rounded-[1rem]" />
      <span className="mt-4 block">
        <Meta post={post} />
      </span>
      <span className="mt-2 block font-[family-name:var(--font-display)] text-lg font-medium leading-[1.2] tracking-[-0.015em] text-zinc-950 transition-colors group-hover:text-red-600">{post.title}</span>
    </Link>
  );
}

export function ResourcesV2({ posts }: { posts: ResourcePost[] }) {
  return (
    <>
      {/* Page head, in the homepage's section style */}
      <section className="v2-wrap pb-14 pt-32 lg:pb-16 lg:pt-40">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="v2-display text-[clamp(3rem,6vw,6rem)] text-zinc-950 lg:col-span-8">
            The First Word In{" "}
            <span className="v2-script block pt-[0.6em] text-[1.15em] leading-[0.8] text-red-600">What&apos;s Next</span>
          </h1>
          <p className="v2-body text-zinc-600 lg:col-span-12">
            Bold brands, standout stories, and digital experiences worth remembering. From kitchens to code, it&apos;s all on the table.
          </p>
        </div>
      </section>

      {/* Articles: the newest as a banner, the rest in an even 16:9 grid */}
      {posts[0] && (
        <section aria-label="Latest article" className="v2-wrap pt-4">
          <Featured post={posts[0]} />
        </section>
      )}
      {posts.length > 1 && (
        <section aria-label="Articles" className="v2-wrap pb-24 pt-14 lg:pb-32 lg:pt-16">
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
            {posts.slice(1).map((post) => (
              <li key={post.slug}>
                <Card post={post} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Closing call to action, in the homepage's red card */}
      <section className="px-2 pb-3 sm:px-3">
        <div className="rounded-[1.75rem] bg-red-600 py-20 text-white sm:rounded-[2rem] lg:py-24">
          <div className="v2-wrap flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <h2 className="v2-h2 max-w-[12ch]">
              Let&apos;s craft something{" "}
              <span className="v2-script text-[1.3em] text-zinc-950">Great</span>
            </h2>
            <Link
              href="/enquire-now"
              className="group inline-flex min-h-12 items-center justify-center gap-2 self-start whitespace-nowrap rounded-full bg-white px-7 text-[0.9375rem] font-medium text-zinc-950 no-underline transition-colors hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:self-auto"
            >
              Start a Project
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
