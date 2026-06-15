'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc?: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  title,
  date,
  scrollToExpand,
  children,
}: ScrollExpandMediaProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Tie expansion to natural page scroll through the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // First 60% of scroll = full expansion
  const expansionMV = useTransform(scrollYProgress, [0, 0.6], [0, 1], { clamp: true });

  useMotionValueEvent(expansionMV, 'change', (v) => {
    setScrollProgress(v);
  });

  // Derived dimensions
  const stripVw = isMobile ? 90 : 92;
  const mediaWidth =
    typeof window !== 'undefined' ? window.innerWidth * (stripVw / 100) : 1200;
  const mediaHeight = 3 + scrollProgress * (isMobile ? 420 : 680);
  const borderRadius = 4 + scrollProgress * 20;
  const textOpacity = Math.max(0, 1 - scrollProgress * 3);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div>
    {/* Scroll track — sticky content pins here while page scrolls */}
    <div ref={sectionRef} style={{ height: '280vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        <div className="relative w-full h-full flex flex-col items-center justify-center">

          {/* Expanding strip */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
            style={{
              width: `${mediaWidth}px`,
              height: `${mediaHeight}px`,
              maxWidth: '92vw',
              borderRadius: `${borderRadius}px`,
              boxShadow: scrollProgress > 0.05
                ? `0px 0px ${20 + scrollProgress * 40}px rgba(0,0,0,${0.1 + scrollProgress * 0.2})`
                : 'none',
            }}
          >
            {mediaType === 'video' ? (
              mediaSrc.includes('youtube.com') ? (
                <div className="relative w-full h-full pointer-events-none">
                  <iframe
                    width="100%"
                    height="100%"
                    src={
                      mediaSrc.includes('embed')
                        ? mediaSrc + (mediaSrc.includes('?') ? '&' : '?') +
                          'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                        : mediaSrc.replace('watch?v=', 'embed/') +
                          '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                          mediaSrc.split('v=')[1]
                    }
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative w-full h-full pointer-events-none">
                  <video
                    src={mediaSrc}
                    poster={posterSrc}
                    autoPlay muted loop playsInline preload="auto"
                    className="w-full h-full object-cover"
                    disablePictureInPicture
                    disableRemotePlayback
                  />
                </div>
              )
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={mediaSrc}
                  alt={title || 'Media content'}
                  fill
                  className="object-cover"
                  sizes="92vw"
                />
                <div
                  className="absolute inset-0 bg-black/20"
                  style={{ opacity: Math.max(0, 0.4 - scrollProgress * 0.4) }}
                />
              </div>
            )}
          </div>

          {/* Title text — fades out as strip expands */}
          <div
            className="relative z-10 flex flex-col items-center justify-center text-center gap-3 pointer-events-none"
            style={{ opacity: textOpacity }}
          >
            <motion.h2
              className="font-black uppercase text-zinc-950"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', lineHeight: 0.92 }}
            >
              {firstWord}
            </motion.h2>
            <motion.h2
              className="font-black uppercase"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                lineHeight: 0.92,
                fontFamily: "var(--font-holiday), serif",
                fontWeight: 300,
                color: '#dc2626',
              }}
            >
              {restOfTitle}
              <span style={{ color: '#09090b' }}>.</span>
            </motion.h2>

            {/* Hint text */}
            <div className="mt-4 flex flex-col items-center gap-1">
              {date && (
                <p className="text-lg text-zinc-500 font-medium">{date}</p>
              )}
              {scrollToExpand && (
                <p className="text-xs text-zinc-400 tracking-widest uppercase font-medium">
                  {scrollToExpand}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>

    {/* Children — appear naturally after the scroll track ends */}
    <div className="relative z-10 bg-white">
      {children}
    </div>
    </div>
  );
};

export default ScrollExpandMedia;
