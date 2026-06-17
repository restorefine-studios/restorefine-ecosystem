"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export interface BlogPostItem {
  slug: string;
  title: string;
  thumbnail: string;
  thumbnailAlt?: string;
  author: string;
  authorImage: string;
  date: string;
}

interface Props {
  posts: BlogPostItem[];
}

export default function BlogPageClient({ posts }: Props) {
  const featuredPosts = posts.slice(0, 2);
  const regularPosts = posts.slice(2);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 md:px-12 lg:px-24 border-b border-zinc-200">
        <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center">
          <motion.span
            className="inline-block text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Resources
          </motion.span>
          <motion.h1
            className="font-black uppercase tracking-tight text-zinc-900 mb-8"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
          >
            <span className="block relative z-0 text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7rem] leading-[0.9]">
              The First Word In
            </span>
            <span
              className="block relative z-10 font-light text-red-600 normal-case leading-none whitespace-nowrap"
              style={{ fontFamily: "var(--font-holiday), serif", fontSize: "clamp(3.5rem, 11vw, 8.5rem)", marginTop: "-1.2rem" }}
            >
              What&apos;s Next
            </span>
          </motion.h1>
          <motion.p
            className="max-w-lg text-sm text-zinc-500 leading-relaxed"
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
          >
            Bold brands, standout stories, and digital experiences worth remembering. From kitchens to code — it&apos;s all on the table.
          </motion.p>
        </div>
      </section>

      {/* Tab Bar */}
      <section className="px-6 md:px-12 lg:px-24 py-6 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto flex items-center gap-1">
          <button className="text-xs font-black uppercase tracking-[0.2em] bg-zinc-900 text-white px-5 py-2.5 rounded-full">
            Blog
          </button>
          <button className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 px-5 py-2.5 rounded-full hover:text-zinc-900 transition-colors">
            Reviews
          </button>
          <button className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 px-5 py-2.5 rounded-full hover:text-zinc-900 transition-colors">
            Events
          </button>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="px-6 md:px-12 lg:px-24 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="text-red-600 font-black text-sm">01</span>
            <div className="h-px flex-1 bg-zinc-200" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Featured</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <Link href={`/resources/${post.slug}`} className="group block">
                  <div className="overflow-hidden rounded-2xl aspect-[16/9] relative mb-5 bg-zinc-100">
                    <Image
                      src={post.thumbnail || "/placeholder.svg"}
                      alt={post.thumbnailAlt || post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/10 transition-colors duration-300" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-zinc-200 flex-shrink-0">
                      <Image
                        src={post.authorImage || "/placeholder.svg"}
                        alt={post.author}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs text-zinc-400 font-medium">{post.author}</span>
                    <span className="text-zinc-200">•</span>
                    <span className="text-xs text-zinc-400">
                      {post.date ? new Date(post.date)?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                    </span>
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 leading-tight group-hover:text-red-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-4 text-xs font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-red-600 transition-colors">
                    Read Article
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="h-px bg-zinc-200" />
      </div>

      {/* Regular Posts */}
      <section className="px-6 md:px-12 lg:px-24 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="text-red-600 font-black text-sm">02</span>
            <div className="h-px flex-1 bg-zinc-200" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">More Articles</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.5}
                variants={fadeUp}
              >
                <Link href={`/resources/${post.slug}`} className="group block">
                  <div className="overflow-hidden rounded-xl aspect-[4/3] relative mb-4 bg-zinc-100">
                    <Image
                      src={post.thumbnail || "/placeholder.svg"}
                      alt={post.thumbnailAlt || post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-zinc-200 flex-shrink-0">
                      <Image
                        src={post.authorImage || "/placeholder.svg"}
                        alt={post.author}
                        width={28}
                        height={28}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs text-zinc-400">{post.author}</span>
                    <span className="text-zinc-200">•</span>
                    <span className="text-xs text-zinc-400">
                      {post.date ? new Date(post.date)?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                    </span>
                  </div>
                  <h3 className="text-base font-black uppercase tracking-tight text-zinc-900 leading-snug group-hover:text-red-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 block mb-3">Ready to build?</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900">
              Let&apos;s craft<br />
              something <span className="text-red-600">great</span>
            </h2>
          </div>
          <Link href="/enquire-now" className="flex items-center gap-2 group">
            <span className="text-sm font-black uppercase tracking-[0.2em] bg-zinc-900 text-white px-8 py-4 rounded-full group-hover:bg-red-600 transition-colors duration-300">
              Start a Project
            </span>
            <span className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center group-hover:bg-zinc-900 transition-colors duration-300">
              <ArrowRight className="w-5 h-5 text-white" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
