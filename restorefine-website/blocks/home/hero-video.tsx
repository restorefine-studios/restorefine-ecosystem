"use client";
import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, VolumeX, Volume2 } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroVideo({ mobile = false }: { mobile?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  }, []);

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
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
      className={`relative rounded-[20px] overflow-hidden bg-zinc-950 aspect-[9/16] ${mobile ? "w-full max-h-[62vh]" : "w-96"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" muted={isMuted} loop playsInline autoPlay>
        <source src="/reels/damasqino.mp4" type="video/mp4" />
      </video>

      {/* Play / Pause overlay */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${!isPlaying || hovered ? "opacity-100" : "opacity-0"}`}>
        <button onClick={togglePlay} className="bg-black/40 backdrop-blur-sm rounded-full p-4 hover:bg-black/60 transition-colors" aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <Pause size={26} className="text-white" /> : <Play size={26} className="text-white" />}
        </button>
      </div>

      {/* Mute toggle */}
      <button onClick={toggleMute} className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white rounded-full p-2 hover:bg-black/60 transition-colors" aria-label={isMuted ? "Unmute" : "Mute"}>
        {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
      </button>

      {/* Bottom text overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent px-5 py-5 pointer-events-none">
        <h3 className="text-white text-sm font-semibold leading-snug">Damasqino - UK&apos;s Best Lebanese Restaurant</h3>
        <p className="text-white/65 text-xs mt-0.5 leading-snug">Award-winning flavors, legendary hospitality. Experience the heart of Damascus in Glasgow.</p>
      </div>
    </motion.div>
  );
}
