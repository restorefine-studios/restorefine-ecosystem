"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  TrendingUp,
  Users,
  BarChart2,
  Zap,
  CheckCircle,
  Play,
  Share2,
  Music2,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { CaseStudiesSection } from "./resto-services/case-studies";

// ─── Instagram data ───────────────────────────────────────────────────────────

const IG_POSTS = [
  { id: 1, handle: "@yewtreeinn", avatar: "/services/branding/pexels-duygugungor-19949505.webp", image: "/services/print/pexels-julieaagaard-2351274.webp", caption: "Sunday roasts done right. Every plate tells a story. 🍖", likes: "1.4K", comments: "87", tag: "Food Photography", accent: "#e63946" },
  { id: 2, handle: "@itspadel", avatar: "/services/media/restomediabio.webp", image: "/services/print/pexels-anastasia-nagibina-1116204043-29996215.webp", caption: "Your vibe, your brand. Court is set. 🎾", likes: "2.1K", comments: "134", tag: "Brand Content", accent: "#3a86ff" },
  { id: 3, handle: "@primewash", avatar: "/services/branding/pexels-beyzaa-yurtkuran-279977530-17789088.webp", image: "/services/media/pexels-fauxels-3184431.webp", caption: "Fresh threads, fresh start. Behind the scenes. ✨", likes: "876", comments: "52", tag: "Reels & Stories", accent: "#06d6a0" },
  { id: 4, handle: "@yewtreeinn", avatar: "/services/branding/pexels-duygugungor-19949505.webp", image: "/services/print/pexels-ron-lach-8425210.webp", caption: "The little details that make us different. 🕯️", likes: "3.3K", comments: "210", tag: "Atmosphere Shots", accent: "#e63946" },
  { id: 5, handle: "@itspadel", avatar: "/services/media/restomediabio.webp", image: "/services/branding/pexels-mikael-blomkvist-6476579.webp", caption: "Strategy meets creativity. Growth starts here. 📈", likes: "1.9K", comments: "96", tag: "Strategy Posts", accent: "#3a86ff" },
  { id: 6, handle: "@primewash", avatar: "/services/branding/pexels-beyzaa-yurtkuran-279977530-17789088.webp", image: "/services/media/pexels-cottonbro-3296434.webp", caption: "Making every moment scroll-worthy. 🎬", likes: "4.2K", comments: "317", tag: "Video Content", accent: "#06d6a0" },
];

// ─── TikTok data ──────────────────────────────────────────────────────────────

const TIKTOK_POSTS = [
  { id: 1, handle: "@yewtreeinn", avatar: "/services/branding/pexels-duygugungor-19949505.webp", thumb: "/services/print/pexels-julieaagaard-2351274.webp", caption: "POV: You ordered the Sunday roast and it just landed 👀🍖 #SundayVibes #PubFood #FoodTok", views: "84.2K", likes: "6.1K", comments: "319", shares: "1.4K", sound: "Original Audio – Yew Tree Inn", tag: "Food Reel" },
  { id: 2, handle: "@itspadel", avatar: "/services/media/restomediabio.webp", thumb: "/services/print/pexels-anastasia-nagibina-1116204043-29996215.webp", caption: "This is what 3× engagement growth looks like 👇 #GrowthHack #MarketingTok #RestoSocial", views: "121K", likes: "9.8K", comments: "541", shares: "2.2K", sound: "Trending Sound – itspadel", tag: "Marketing Reel" },
  { id: 3, handle: "@primewash", avatar: "/services/branding/pexels-beyzaa-yurtkuran-279977530-17789088.webp", thumb: "/services/media/pexels-cottonbro-3296434.webp", caption: "Behind the lens of your favourite content 🎬✨ #BTS #ContentCreator #Hospitality", views: "58.7K", likes: "4.3K", comments: "187", shares: "890", sound: "Viral Beat – primewash", tag: "BTS Reel" },
  { id: 4, handle: "@yewtreeinn", avatar: "/services/branding/pexels-duygugungor-19949505.webp", thumb: "/services/print/pexels-ron-lach-8425210.webp", caption: "The atmosphere shots that make guests DM 'table for 2?' every time 🕯️🍷 #Ambience #RestaurantTok", views: "203K", likes: "17.5K", comments: "902", shares: "4.1K", sound: "Chill Lo-fi – Yew Tree Inn", tag: "Atmosphere Reel" },
  { id: 5, handle: "@itspadel", avatar: "/services/media/restomediabio.webp", thumb: "/services/media/pexels-fauxels-3184431.webp", caption: "Your menu is content too — not just a list 📋🔥 #MenuDesign #HospitalityMarketing", views: "37.4K", likes: "2.9K", comments: "143", shares: "620", sound: "Trending Audio – itspadel", tag: "Strategy Reel" },
  { id: 6, handle: "@primewash", avatar: "/services/branding/pexels-beyzaa-yurtkuran-279977530-17789088.webp", thumb: "/services/media/pexels-cottonbro-3296434.webp", caption: "Day in the life of running your venue's TikTok 🎥☕ #ContentDay #SMM #TikTokUK", views: "91.1K", likes: "7.6K", comments: "408", shares: "1.8K", sound: "Morning Vibes – primewash", tag: "Day-in-Life" },
];

const PILLARS = [
  { icon: <TrendingUp className="w-5 h-5" />, title: "Content Strategy", desc: "Monthly content calendars tailored to your audience and season." },
  { icon: <BarChart2 className="w-5 h-5" />, title: "Performance Analytics", desc: "Weekly reports tracking reach, engagement, and follower growth." },
  { icon: <Zap className="w-5 h-5" />, title: "Reels & TikToks", desc: "Short-form video that stops the scroll and drives real actions — on both platforms." },
  { icon: <Users className="w-5 h-5" />, title: "Community Management", desc: "DMs, comments, and replies handled so you never miss a guest." },
];

const DELIVERABLES = [
  "12–20 posts per month",
  "Reels & TikTok videos",
  "Caption copywriting",
  "Hashtag research",
  "Monthly analytics report",
  "Brand tone-of-voice guide",
  "Scheduling & publishing",
  "DM & comment management",
];

// ─── Instagram PostCard ────────────────────────────────────────────────────────

function IGPostCard({ post, delay = 0 }: { post: typeof IG_POSTS[0]; delay?: number }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <motion.div
      className="rounded-2xl overflow-hidden bg-white border border-zinc-100 shadow-sm flex flex-col"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px -8px rgba(0,0,0,0.12)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full overflow-hidden bg-zinc-100 ring-2 ring-red-100">
            <Image src={post.avatar} alt={post.handle} width={28} height={28} className="object-cover w-full h-full" />
          </div>
          <div>
            <p className="text-[10px] font-black text-zinc-900 leading-none">{post.handle}</p>
            <p className="text-[8px] font-medium mt-0.5 px-1.5 py-0.5 rounded-full leading-none" style={{ background: post.accent + "18", color: post.accent }}>{post.tag}</p>
          </div>
        </div>
        <MoreHorizontal className="w-3.5 h-3.5 text-zinc-300" />
      </div>
      {/* Image */}
      <div className="relative aspect-square w-full bg-zinc-100 overflow-hidden">
        <Image src={post.image} alt={post.caption} fill className="object-cover transition-transform duration-500 hover:scale-105" />
      </div>
      {/* Actions */}
      <div className="px-3 pt-2.5 pb-1 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setLiked(v => !v)} className="flex items-center gap-1 group">
            <Heart className={`w-4 h-4 transition-all duration-200 ${liked ? "fill-red-500 text-red-500 scale-110" : "text-zinc-400 group-hover:text-red-400"}`} />
            <span className="text-[10px] text-zinc-500">{liked ? "❤️" : post.likes}</span>
          </button>
          <button className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4 text-zinc-400" />
            <span className="text-[10px] text-zinc-500">{post.comments}</span>
          </button>
          <Send className="w-4 h-4 text-zinc-400" />
        </div>
        <button onClick={() => setSaved(v => !v)}>
          <Bookmark className={`w-4 h-4 transition-colors duration-200 ${saved ? "fill-zinc-900 text-zinc-900" : "text-zinc-400"}`} />
        </button>
      </div>
      <div className="px-3 pb-3">
        <p className="text-[10px] text-zinc-500 leading-relaxed line-clamp-2">{post.caption}</p>
      </div>
    </motion.div>
  );
}

// ─── TikTok ReelCard ────────────────────────────────────────────────────────────

function TikTokCard({ post, delay = 0 }: { post: typeof TIKTOK_POSTS[0]; delay?: number }) {
  const [liked, setLiked] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      className="rounded-2xl overflow-hidden bg-zinc-900 shadow-lg flex flex-col relative group"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, boxShadow: "0 20px 50px -10px rgba(0,0,0,0.4)" }}
      style={{ aspectRatio: "9 / 16", maxHeight: 420 }}
    >
      {/* Thumbnail */}
      <div className="absolute inset-0">
        <Image src={post.thumb} alt={post.caption} fill className="object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />
      </div>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-3 pt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full overflow-hidden ring-1 ring-white/30">
            <Image src={post.avatar} alt={post.handle} width={24} height={24} className="object-cover w-full h-full" />
          </div>
          <span className="text-[9px] font-black text-white">{post.handle}</span>
        </div>
        <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/10 text-white/70">{post.tag}</span>
      </div>

      {/* Centre play button */}
      <div className="absolute inset-0 flex items-center justify-center z-10" onClick={() => setPlaying(v => !v)}>
        <AnimatePresence>
          {!playing && (
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.4 }}
              transition={{ duration: 0.2 }}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 cursor-pointer"
            >
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </motion.div>
          )}
          {playing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-white/60 text-[8px] font-black uppercase tracking-widest"
            >
              ▮▮
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right sidebar actions — TikTok style */}
      <div className="absolute right-3 bottom-24 z-10 flex flex-col items-center gap-4">
        <button onClick={() => setLiked(v => !v)} className="flex flex-col items-center gap-1">
          <div className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <Heart className={`w-5 h-5 transition-all duration-200 ${liked ? "fill-red-500 text-red-500 scale-110" : "text-white"}`} />
          </div>
          <span className="text-[9px] font-semibold text-white/80">{liked ? "🔥" : post.likes}</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <div className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <span className="text-[9px] font-semibold text-white/80">{post.comments}</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <div className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <Share2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-[9px] font-semibold text-white/80">{post.shares}</span>
        </button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-3 pb-4">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Play className="w-3 h-3 text-white/60 fill-white/60" />
          <span className="text-[9px] font-black text-white/70">{post.views} views</span>
        </div>
        <p className="text-[10px] text-white/90 leading-relaxed line-clamp-2 mb-2">{post.caption}</p>
        <div className="flex items-center gap-1.5">
          <Music2 className="w-3 h-3 text-white/50" />
          <p className="text-[8px] text-white/50 truncate">{post.sound}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Combined Social Post Wall with platform tabs ─────────────────────────────

type Platform = "instagram" | "tiktok";

// Platform SVG icons (inline so no external dep)
function IGIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.001" strokeWidth={3} />
    </svg>
  );
}
function TikTokIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.2 8.2 0 0 0 4.8 1.54V6.84a4.85 4.85 0 0 1-1.04-.15z" />
    </svg>
  );
}

function SocialPostWall() {
  const [platform, setPlatform] = useState<Platform>("instagram");

  const igCol1 = [IG_POSTS[0], IG_POSTS[3]];
  const igCol2 = [IG_POSTS[1], IG_POSTS[4]];
  const igCol3 = [IG_POSTS[2], IG_POSTS[5]];

  const ttCol1 = [TIKTOK_POSTS[0], TIKTOK_POSTS[3]];
  const ttCol2 = [TIKTOK_POSTS[1], TIKTOK_POSTS[4]];
  const ttCol3 = [TIKTOK_POSTS[2], TIKTOK_POSTS[5]];

  return (
    <section className={`py-20 px-6 md:px-12 lg:px-24 overflow-hidden transition-colors duration-500 ${platform === "tiktok" ? "bg-zinc-950" : "bg-zinc-50"}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div className="flex items-center gap-3 mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <span className={`font-black text-sm ${platform === "tiktok" ? "text-red-500" : "text-red-600"}`}>02</span>
          <div className={`h-px flex-1 ${platform === "tiktok" ? "bg-zinc-800" : "bg-zinc-200"}`} />
          <span className={`text-xs font-black uppercase tracking-[0.3em] ${platform === "tiktok" ? "text-zinc-600" : "text-zinc-400"}`}>Our Feed</span>
        </motion.div>

        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-10">
          <motion.h2
            className={`text-4xl md:text-5xl font-black uppercase tracking-tight leading-[0.95] flex-1 ${platform === "tiktok" ? "text-white" : "text-zinc-900"}`}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            Content That
            <br />
            <span className="text-red-600">Converts.</span>
          </motion.h2>
          <motion.p
            className={`max-w-xs text-sm leading-relaxed flex-shrink-0 ${platform === "tiktok" ? "text-zinc-400" : "text-zinc-500"}`}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
          >
            {platform === "instagram"
              ? "We've already transformed how these brands show up on Instagram — interactive post wall below."
              : "Reels that rack up views and drive real footfall — TikTok-native content built for hospitality."}
          </motion.p>
        </div>

        {/* Platform tabs */}
        <div className="flex items-center gap-2 mb-12">
          {(["instagram", "tiktok"] as Platform[]).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                platform === p
                  ? p === "instagram"
                    ? "bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white shadow-lg"
                    : "bg-zinc-900 text-white border border-zinc-700"
                  : platform === "tiktok"
                    ? "border border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300"
                    : "border border-zinc-200 text-zinc-400 hover:border-zinc-400 hover:text-zinc-700"
              }`}
            >
              {p === "instagram" ? <IGIcon active={platform === p} /> : <TikTokIcon active={platform === p} />}
              {p === "instagram" ? "Instagram" : "TikTok"}
            </button>
          ))}
          <div className={`h-px flex-1 ${platform === "tiktok" ? "bg-zinc-800" : "bg-zinc-200"}`} />
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={platform}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {platform === "instagram" ? (
              <>
                <div className="flex flex-col gap-5">{igCol1.map((p, i) => <IGPostCard key={p.id} post={p} delay={i * 0.1} />)}</div>
                <div className="flex flex-col gap-5 lg:mt-10">{igCol2.map((p, i) => <IGPostCard key={p.id} post={p} delay={i * 0.1 + 0.05} />)}</div>
                <div className="hidden lg:flex flex-col gap-5 lg:mt-20">{igCol3.map((p, i) => <IGPostCard key={p.id} post={p} delay={i * 0.1 + 0.1} />)}</div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-5">{ttCol1.map((p, i) => <TikTokCard key={p.id} post={p} delay={i * 0.1} />)}</div>
                <div className="flex flex-col gap-5 lg:mt-10">{ttCol2.map((p, i) => <TikTokCard key={p.id} post={p} delay={i * 0.1 + 0.05} />)}</div>
                <div className="hidden lg:flex flex-col gap-5 lg:mt-20">{ttCol3.map((p, i) => <TikTokCard key={p.id} post={p} delay={i * 0.1 + 0.1} />)}</div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div className="flex justify-center mt-12" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <Link href="/enquire-now" className="inline-flex items-center gap-2 group">
            <span className={`text-sm font-black uppercase tracking-[0.15em] px-7 py-3.5 rounded-full transition-colors duration-300 ${platform === "tiktok" ? "bg-white text-zinc-900 group-hover:bg-red-600 group-hover:text-white" : "bg-zinc-900 text-white group-hover:bg-red-600"}`}>
              Start Growing Your Feed
            </span>
            <span className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center group-hover:bg-zinc-900 transition-colors duration-300">
              <ArrowRight className="w-5 h-5 text-white" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Service Pillars ──────────────────────────────────────────────────────────

function SocialPillars() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <span className="text-red-600 font-black text-sm">03</span>
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">What We Do</span>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PILLARS.map((pillar, i) => (
            <motion.div key={pillar.title} className="rounded-2xl border border-zinc-100 p-7 bg-white hover:border-red-100 hover:shadow-lg transition-all duration-300 group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">{pillar.icon}</div>
              <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900 mb-2">{pillar.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Deliverables ─────────────────────────────────────────────────────────────

function Deliverables() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-zinc-900 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <motion.div className="flex items-center gap-3 mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <span className="text-red-500 font-black text-sm">04</span>
          <div className="h-px flex-1 bg-zinc-700" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">Deliverables</span>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white leading-[0.95] mb-5">Everything<br /><span className="text-red-500">Included.</span></h2>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">No add-ons, no hidden extras. Every package handles the full social media lifecycle for your venue — across both Instagram and TikTok.</p>
            <div className="mt-8">
              <Link href="/enquire-now" className="inline-flex items-center gap-2 group">
                <span className="text-sm font-black uppercase tracking-[0.15em] border border-white/20 text-white px-7 py-3.5 rounded-full group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">Get a Quote</span>
                <span className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center group-hover:bg-white group-hover:text-red-600 transition-colors duration-300"><ArrowRight className="w-5 h-5 text-white group-hover:text-red-600 transition-colors duration-300" /></span>
              </Link>
            </div>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
            {DELIVERABLES.map((item, i) => (
              <motion.div key={item} className="flex items-center gap-3 rounded-xl bg-zinc-800/60 border border-zinc-700/50 px-4 py-3" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-xs font-medium text-zinc-300">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } }) };

function RSocial() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-white min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-24 pt-20 pb-24 relative overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-red-50 via-violet-50 to-sky-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="max-w-4xl w-full mx-auto relative flex flex-col items-center">
          <motion.span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-8" initial="hidden" animate="visible" variants={fadeUp}>Resto Social</motion.span>
          <motion.h1 className="font-black uppercase tracking-tight text-zinc-900 mb-10" initial="hidden" animate="visible" custom={1} variants={fadeUp}>
            <span className="block relative z-0 text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7rem] leading-[0.9]">Feed-First</span>
            <span className="block relative z-10 font-light text-red-600 normal-case leading-none whitespace-nowrap" style={{ fontFamily: "var(--font-holiday), serif", fontSize: "clamp(3.5rem, 11vw, 8.5rem)", marginTop: "-1.2rem" }}>
              Real Results.
            </span>
          </motion.h1>
          <motion.p className="max-w-lg text-sm text-zinc-500 leading-relaxed mb-8" initial="hidden" animate="visible" custom={2} variants={fadeUp}>
            Scroll-stopping content and strategy built around your venue — across Instagram and TikTok. Creative direction, caption writing, scheduling, and community management. Done for you.
          </motion.p>
          <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}>
            <Link href="/enquire-now" className="inline-flex items-center gap-2 group">
              <span className="text-sm font-black uppercase tracking-[0.15em] bg-zinc-900 text-white px-7 py-3.5 rounded-full group-hover:bg-red-600 transition-colors duration-300">Let&apos;s Grow Together</span>
              <span className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center group-hover:bg-zinc-900 transition-colors duration-300"><ArrowRight className="w-5 h-5 text-white" /></span>
            </Link>
          </motion.div>
          {/* Stats */}
          <motion.div className="grid grid-cols-3 gap-6 mt-20 pt-12 border-t border-zinc-100 w-full" initial="hidden" animate="visible" custom={4} variants={fadeUp}>
            {[{ value: "3×", label: "Average engagement lift" }, { value: "20+", label: "Posts per month" }, { value: "2 Platforms", label: "Instagram & TikTok" }].map(stat => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-black text-zinc-900">{stat.value}</p>
                <p className="text-xs text-zinc-400 mt-1 leading-tight">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-zinc-50 px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div className="flex items-center gap-3 mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <span className="text-red-600 font-black text-sm">01</span>
            <div className="h-px flex-1 bg-zinc-200" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Overview</span>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 block mb-4">The Service</span>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900 leading-[1] mb-4">What Is Resto Social</h2>
              <p className="text-sm text-zinc-500 leading-relaxed mb-4">RestoSocial is your venue&apos;s fully-managed social media partner. From content creation to community management, we craft a coherent, engaging presence across Instagram and TikTok — built specifically for hospitality and leisure.</p>
              <p className="text-sm text-zinc-500 leading-relaxed">Our team of content strategists, designers, and video editors work as an extension of your team — creating content that resonates with your local audience and beyond.</p>
            </motion.div>
            <motion.div className="relative h-[400px] rounded-2xl overflow-hidden bg-zinc-200" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
              <Image src="/services/media/restomediabio.webp" alt="Social media content creation" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tl from-red-900/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">What you get</p>
                  <p className="text-sm font-semibold text-zinc-900">A full creative team for the price of a part-time hire. 📲</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social post wall with platform tabs */}
      <SocialPostWall />

      <SocialPillars />
      <Deliverables />

      <CaseStudiesSection
        sectionNumber="05"
        sectionLabel="Case Studies"
        categories={["Media", "Branding"]}
      />

      {/* Signature marquee — commented out
      <div className="border-t border-zinc-200 overflow-hidden py-6 bg-white">
        <div className="flex w-full overflow-x-hidden gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex-none flex items-center gap-8 text-sm font-black uppercase tracking-[0.25em] text-zinc-200 whitespace-nowrap">
              <span>RESTO SOCIAL</span>
              <span className="text-red-300">★</span>
            </div>
          ))}
        </div>
      </div> */}

      <Footer />
    </main>
  );
}

export default RSocial;
