"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Star, ArrowRight, Quote } from "lucide-react";

interface Review {
  id: number;
  name: string;
  position: string;
  review: string;
  image: string;
  companyLogo: string;
  when?: string;
}

interface ReviewsProps {
  reviews: Review[];
  headline: string;
  subtext: string;
}

/* Reviews sourced from Google. Balraj's Google review is omitted here because
 * the same review already arrives via Contentful. */
const GOOGLE_REVIEWS: Review[] = [
  {
    id: 101,
    name: "Luna Shree Nepal",
    position: "Masala Moves",
    review: "Huge thanks to the team at Resto Refine for helping with the branding for my dance classes. The quality of their work was excellent, and they really took the time to understand what I wanted as a small business owner. They listened carefully, communicated well throughout the process, and delivered something that truly reflected my vision. I'm really happy with the result and look forward to working with them again in the future.",
    image: "",
    companyLogo: "",
    when: "a month ago",
  },
  {
    id: 102,
    name: "Muhammad Arham",
    position: "DFW",
    review: "I had the pleasure of working with this marketing agency and the experience exceeded my expectations. Their expertise and strategic approach played a key role in taking my video viral, significantly increasing both reach and engagement across my platforms. What stood out most was their professionalism, clear communication, and commitment to delivering high-quality results. For anyone looking for proven results, you can check my page DFW on TikTok and Instagram to see the growth and impact firsthand.",
    image: "",
    companyLogo: "",
    when: "3 months ago",
  },
  {
    id: 103,
    name: "ZA Cleaning Team Ltd",
    position: "Za Cleaning",
    review: "They build our website, and it was an amazing service. Thanks to the team, for their support and professionalism. They were very accommodating to our repeated requests. We are happy to give them our marketing business. We are looking forward to a long lasting business relationship.",
    image: "",
    companyLogo: "",
    when: "2 months ago",
  },
  {
    id: 104,
    name: "Zaher Yassin",
    position: "Local Guide",
    review: "Huge thanks to Rohit and his team for the outstanding work on our website. The design, professionalism, and attention to detail were beyond our expectations. Truly impressed with the quality and support throughout the whole process. Highly recommended.",
    image: "",
    companyLogo: "",
    when: "2 months ago",
  },
  {
    id: 105,
    name: "Big Bites",
    position: "Big Bites, Glasgow",
    review: "Resto Refine did amazing job for our BigBites takeaway in Glasgow, they made our sign boards, takeaway menus, TikTok videos and handled all our social media marketing and branding which got over 500 thousand views and helped us have a very busy and successful launch.",
    image: "",
    companyLogo: "",
    when: "8 months ago",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-0.5 text-red-600">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

function Avatar({ review }: { review: Review }) {
  const src = review.companyLogo || review.image;
  if (src) {
    return (
      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-200 shrink-0">
        <Image src={src} alt={review.name} fill className="object-cover" sizes="40px" />
      </div>
    );
  }
  const initials = review.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 text-red-600 flex items-center justify-center text-xs font-black shrink-0">
      {initials}
    </div>
  );
}

function ReviewCard({ review, className = "" }: { review: Review; className?: string }) {
  return (
    <div className={`flex flex-col ${className}`}>
      {/* Speech bubble */}
      <div className="relative bg-white rounded-3xl border border-zinc-100 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.15)] p-7 lg:p-9 flex-1 lg:min-h-[280px]">
        <Stars />
        <p className="text-zinc-600 text-sm lg:text-[15px] leading-relaxed mt-4 lg:mt-5">{review.review}</p>
        {/* Tail */}
        <span className="absolute -bottom-[7px] left-9 w-3.5 h-3.5 bg-white border-b border-r border-zinc-100 rotate-45" />
      </div>
      {/* Author */}
      <div className="flex items-center gap-3 mt-5 pl-4">
        <Avatar review={review} />
        <div>
          <p className="text-sm font-bold text-zinc-900 leading-tight">{review.name}</p>
          <p className="text-[11px] text-zinc-400 leading-tight mt-0.5">
            {review.position}
            {review.when ? ` · ${review.when}` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionHeader() {
  return (
    <>
      <Quote size={48} className="text-red-600 rotate-180" fill="currentColor" strokeWidth={0} />
      <h2 className="font-black text-zinc-950 tracking-tight leading-[1.05] mt-6" style={{ fontSize: "clamp(2.1rem, 3.2vw, 3.1rem)" }}>
        <span className="block uppercase">What Our</span>
        <span className="block uppercase">Clients Are</span>
        <span
          className="block text-red-600 font-normal normal-case"
          style={{ fontFamily: "var(--font-holiday), serif", fontSize: "clamp(2.8rem, 4.4vw, 4.4rem)" }}
        >
          Saying.
        </span>
      </h2>
      <div className="flex items-center gap-3 mt-6">
        <Stars />
        <span className="text-xs text-zinc-500 font-medium">Rated 5.0 by our clients</span>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop: pinned section, cards glide left as the page scrolls       */
/* ------------------------------------------------------------------ */
function DesktopReviews({ reviews }: { reviews: Review[] }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxShift, setMaxShift] = useState(0);

  const { scrollYProgress } = useScroll({ target: pinRef, offset: ["start start", "end end"] });

  useEffect(() => {
    const measure = () => {
      if (!galleryRef.current || !trackRef.current) return;
      setMaxShift(Math.max(0, trackRef.current.scrollWidth - galleryRef.current.clientWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -maxShift]);
  const x = useSpring(rawX, { stiffness: 90, damping: 24, mass: 0.5 });
  const progressScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <div ref={pinRef} className="hidden lg:block relative h-[280vh]">
      <div className="sticky top-0 h-screen flex items-center">
        <div className="w-full flex items-center gap-16 xl:gap-24">
          {/* Fixed left column */}
          <div className="w-[320px] xl:w-[380px] shrink-0">
            <SectionHeader />
            {/* Scroll progress */}
            <div className="flex items-center gap-4 mt-10">
              <div className="relative flex-1 h-px bg-zinc-200 overflow-hidden">
                <motion.div style={{ scaleX: progressScale }} className="absolute inset-0 bg-red-600 origin-left" />
              </div>
              <ArrowRight size={16} className="text-zinc-400 shrink-0" />
            </div>
          </div>

          {/* Gliding cards, alternating vertical offsets to fill the band */}
          <div ref={galleryRef} className="flex-1 overflow-hidden py-10">
            <motion.div ref={trackRef} style={{ x }} className="flex gap-8 items-stretch">
              {reviews.map((review, i) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  className={`w-[400px] xl:w-[460px] shrink-0 ${i % 2 === 1 ? "lg:translate-y-10" : ""}`}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile: header stacked, native swipe with snap                      */
/* ------------------------------------------------------------------ */
function MobileReviews({ reviews }: { reviews: Review[] }) {
  return (
    <div className="lg:hidden py-16">
      <div className="px-1 mb-8">
        <SectionHeader />
      </div>
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scrollbar-hide">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} className="w-[300px] shrink-0 snap-center" />
        ))}
      </div>
    </div>
  );
}

export function Reviews({ reviews }: ReviewsProps) {
  const all = [...reviews, ...GOOGLE_REVIEWS];

  return (
    // No overflow-hidden here: it would break position:sticky for the pinned gallery
    <section className="section-bleed bg-zinc-50">
      <DesktopReviews reviews={all} />
      <MobileReviews reviews={all} />
    </section>
  );
}
