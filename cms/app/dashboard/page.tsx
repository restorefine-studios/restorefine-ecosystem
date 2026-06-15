"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchAllPosts, type BlogPost } from "@/lib/supabase";

export default function DashboardPage() {
  const { data: posts = [], isLoading, isError } = useQuery<BlogPost[]>({
    queryKey: ["posts"],
    queryFn: fetchAllPosts,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="w-full aspect-[16/10] bg-gray-100 rounded-2xl mb-4" />
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-gray-100" />
              <div className="h-3 bg-gray-100 rounded w-28" />
            </div>
            <div className="h-5 bg-gray-100 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-100 rounded w-24" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500 text-sm">Failed to load posts. Check your Supabase connection.</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black uppercase tracking-tight text-gray-900">
          All Posts ({posts.length})
        </h2>
        <Link
          href="/dashboard/new"
          className="bg-gray-900 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-2xl p-16 text-center">
          <p className="text-gray-400 text-sm mb-4">No posts yet.</p>
          <Link
            href="/dashboard/new"
            className="text-xs font-bold uppercase tracking-widest text-white bg-gray-900 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/dashboard/${post.slug}`}
              className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-200"
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-[16/9] bg-gray-100 overflow-hidden">
                {post.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.thumbnail}
                    alt={post.thumbnail_alt ?? post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-xs uppercase tracking-widest font-semibold">
                    No image
                  </div>
                )}
                <span
                  className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                    post.published
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-white/90 text-gray-500"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>

              {/* Card body */}
              <div className="p-4">
                {/* Author + date */}
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0 p-1">
                    <img src="/restorefine-logowhite.svg" alt="RestoRefine" style={{ height: "100%", width: "auto" }} />
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium">{post.author || "Restorefine Team"}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="text-[11px] text-gray-400">
                    {post.date
                      ? new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
                      : ""}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-black uppercase tracking-tight text-gray-900 leading-snug mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-[12px] text-gray-400 leading-relaxed line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                )}

                {/* Edit link */}
                <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-gray-900 transition-colors">
                  Edit Post
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
