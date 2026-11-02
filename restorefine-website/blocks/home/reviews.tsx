"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GoogleG, GoogleStars, googleReviewsLinkProps } from "@/components/google-reviews";
import { Reveal } from "./reveal";
import { type } from "./type-scale";

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

/** The review shown first in the carousel (it names concrete results) */
const FEATURED_REVIEW_ID = 105;
/** Reviews longer than this are clamped with a "Read more" toggle so cards stay even */
const CLAMP_AT = 240;

function Avatar({ review }: { review: Review }) {
  const src = review.companyLogo || review.image;
  if (src && !src.endsWith("reviewuser.svg")) {
    return (
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-zinc-200">
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
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-red-100 bg-red-50 text-xs font-black text-red-600">
      {initials}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const long = review.review.length > CLAMP_AT;

  return (
    <figure className="flex w-[82vw] shrink-0 snap-start flex-col rounded-[2rem] border border-zinc-200 bg-white p-7 sm:w-[24rem] sm:p-9">
      <div className="flex items-center justify-between">
        <GoogleStars className="h-3.5 w-3.5" />
        <a
          {...googleReviewsLinkProps}
          aria-label="View our reviews on Google"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-50 no-underline transition-transform duration-300 hover:-translate-y-0.5"
        >
          <GoogleG className="h-4 w-4" />
        </a>
      </div>

      {/* Clamped visually only; the full review stays in the DOM */}
      <blockquote className={`mt-6 leading-relaxed text-zinc-700 ${long && !expanded ? "line-clamp-6" : ""}`}>{review.review}</blockquote>
      {long && (
        <button type="button" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded} className="mt-2 self-start text-sm font-semibold text-zinc-950 hover:text-red-600">
          {expanded ? "Show less" : "Read more"}
        </button>
      )}

      <figcaption className="mt-auto flex items-center gap-3 pt-8">
        <Avatar review={review} />
        <div className="min-w-0">
          <p className="text-sm font-bold leading-tight text-zinc-950">{review.name}</p>
          <p className="mt-0.5 text-xs leading-tight text-zinc-500">
            {review.position}
            {review.when ? `, ${review.when}` : ""}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

function RatingBadge() {
  return (
    <a {...googleReviewsLinkProps} className="group flex items-center gap-4 no-underline">
      <span className="text-4xl font-black leading-none tracking-[-0.04em] text-zinc-950">5.0</span>
      <span className="flex flex-col gap-1.5">
        <span className="flex items-center gap-2">
          <GoogleG className="h-4 w-4" />
          <GoogleStars className="h-4 w-4" />
        </span>
        <span className="whitespace-nowrap text-sm font-medium text-zinc-500 transition-colors group-hover:text-zinc-950">Rated 5.0 by our clients</span>
      </span>
    </a>
  );
}

function NavButton({ dir, disabled, onClick }: { dir: "prev" | "next"; disabled: boolean; onClick: () => void }) {
  const Icon = dir === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous reviews" : "Next reviews"}
      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-950 transition-[transform,background-color,opacity] duration-300 hover:-translate-y-0.5 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white active:translate-y-px disabled:pointer-events-none disabled:opacity-30"
    >
      <Icon className="h-5 w-5" strokeWidth={1.75} />
    </button>
  );
}

export function Reviews({ reviews }: ReviewsProps) {
  const all = [...reviews, ...GOOGLE_REVIEWS];
  const featured = all.find((r) => r.id === FEATURED_REVIEW_ID) ?? all[0];
  const ordered = [featured, ...all.filter((r) => r !== featured)];

  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollXProgress } = useScroll({ container: trackRef });
  const progress = useSpring(scrollXProgress, { stiffness: 140, damping: 30 });
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useMotionValueEvent(scrollXProgress, "change", (v) => {
    const start = v <= 0.01;
    const end = v >= 0.99;
    if (start !== atStart) setAtStart(start);
    if (end !== atEnd) setAtEnd(end);
  });

  // One step = the width of a standard card plus the gap
  function step(dir: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("figure:nth-child(2)") ?? track.querySelector<HTMLElement>("figure");
    const amount = card ? card.offsetWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * amount, behavior: reduce ? "auto" : "smooth" });
  }

  // Mouse drag-to-scroll; touch keeps native swiping
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);
  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !trackRef.current) return;
    drag.current = { x: e.clientX, left: trackRef.current.scrollLeft, moved: false };
  }
  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    const track = trackRef.current;
    if (!d || !track) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true;
      setDragging(true);
      track.setPointerCapture(e.pointerId);
    }
    if (d.moved) track.scrollLeft = d.left - dx;
  }
  function endDrag() {
    drag.current = null;
    if (dragging) setDragging(false);
  }

  return (
    <section className="section-bleed overflow-hidden bg-zinc-50 pb-8 pt-24 lg:pt-32">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <h2 className={`${type.section} font-black leading-[1.02] tracking-[-0.04em] text-zinc-950`}>
            <span className="uppercase">What Our Clients Are </span>
            <span className="mt-3 block font-normal normal-case leading-[0.9] text-red-600" style={{ fontFamily: "var(--font-holiday), serif", fontSize: "1.3em" }}>
              Saying.
            </span>
          </h2>
        </Reveal>
        <div className="flex items-center justify-between gap-8">
          <RatingBadge />
          <div className="hidden gap-2 sm:flex">
            <NavButton dir="prev" disabled={atStart} onClick={() => step(-1)} />
            <NavButton dir="next" disabled={atEnd} onClick={() => step(1)} />
          </div>
        </div>
      </div>

      {/* Track bleeds to the viewport edges while cards line up with the page gutter */}
      <div
        ref={trackRef}
        role="region"
        aria-label="Client reviews"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        className={`mt-12 flex items-stretch gap-4 overflow-x-auto pb-2 [scrollbar-width:none] focus-visible:outline-none lg:mt-16 [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing select-none snap-none" : "snap-x snap-mandatory md:cursor-grab"
        } -mx-6 scroll-px-6 px-6 md:-mx-[3.25rem] md:scroll-px-[3.25rem] md:px-[3.25rem] min-[1201px]:-mx-[13rem] min-[1201px]:scroll-px-[13rem] min-[1201px]:px-[13rem]`}
      >
        {ordered.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Position in the carousel */}
      <div className="mt-8 h-[2px] w-full overflow-hidden rounded-full bg-zinc-200">
        <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-red-600" />
      </div>
    </section>
  );
}
