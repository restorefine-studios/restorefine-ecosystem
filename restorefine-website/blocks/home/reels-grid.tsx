"use client";
import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, VolumeX, Volume2 } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const items = [
  {
    id: 1,
    video: "/reels/reel1.mp4",
    title: "SpudKingz Launch",
    subtitle: "Launch of SpudKingz — A Crispy Revolution!",
  },
  {
    id: 2,
    video: "/reels/reel2.mp4",
    title: "100 Spuds Giveaway",
    subtitle: "100 Spuds Giveaway. Join us for a chance to win!",
  },
  {
    id: 3,
    video: "/reels/reel3.mp4",
    title: "SpudKingz Location",
    subtitle: "SpudKingz Location Reveal — Find Us Here!",
  },
];

function VideoCard({ video, title, subtitle, sectionVisible }: { video: string; title: string; subtitle: string; sectionVisible: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hovered, setHovered] = useState(false);

  // Auto-play muted when section enters view; pause when leaving
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (sectionVisible) {
      el.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      el.pause();
      setIsPlaying(false);
    }
  }, [sectionVisible]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      el.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;
    el.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative rounded-[20px] overflow-hidden bg-zinc-950 w-full aspect-[9/16]" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" muted={isMuted} loop playsInline autoPlay>
        <source src={video} type="video/mp4" />
      </video>

      {/* Play / Pause overlay — visible on hover or when paused */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${!isPlaying || hovered ? "opacity-100" : "opacity-0"}`}>
        <button onClick={togglePlay} className="bg-black/40 backdrop-blur-sm rounded-full p-4 hover:bg-black/60 transition-colors" aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <Pause size={26} className="text-white" /> : <Play size={26} className="text-white" />}
        </button>
      </div>

      {/* Mute toggle — top right */}
      <button onClick={toggleMute} className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white rounded-full p-2 hover:bg-black/60 transition-colors" aria-label={isMuted ? "Unmute" : "Mute"}>
        {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
      </button>

      {/* Bottom text overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent px-5 py-5 pointer-events-none">
        <h3 className="text-white text-sm font-semibold leading-snug">{title}</h3>
        <p className="text-white/65 text-xs mt-0.5 leading-snug">{subtitle}</p>
      </div>
    </div>
  );
}

// Per-card scroll direction: left=down, middle=up, right=down
const directions = ["down", "up", "down"] as const;

export default function ReelsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  // Track scroll progress as the section enters the viewport
  // "start end"  → section top hits viewport bottom (animation starts)
  // "center center" → section center hits viewport center (animation done)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Smooth spring on top of scroll so it feels physical
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Shared opacity: fade in over first 40% of scroll progress
  const opacity = useTransform(smoothProgress, [0, 0.4], [0, 1]);

  // Each direction gets its own y transform
  const yDown = useTransform(smoothProgress, [0, 1], [160, 0]);
  const yUp = useTransform(smoothProgress, [0, 1], [-160, 0]);

  // IntersectionObserver to trigger video autoplay
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setSectionVisible(entry.isIntersecting), { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="-mt-12 py-20 md:py-28">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        {items.map((item, index) => {
          const y = directions[index] === "up" ? yUp : yDown;

          return (
            <motion.div key={item.id} className={index === 1 ? "pt-14" : ""} style={{ y, opacity }}>
              <VideoCard video={item.video} title={item.title} subtitle={item.subtitle} sectionVisible={sectionVisible} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
