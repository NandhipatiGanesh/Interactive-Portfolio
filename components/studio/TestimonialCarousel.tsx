"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS } from "./constants";

function QuoteIcon() {
  return (
    <svg
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-4 text-[#051A24]/20"
    >
      <path
        d="M0 24V14.4C0 6.4 4.8 0 12.8 0V4.8C8 4.8 4.8 8 4.8 12.8H12.8V24H0ZM19.2 24V14.4C19.2 6.4 24 0 32 0V4.8C27.2 4.8 24 8 24 12.8H32V24H19.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

const tripled = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(TESTIMONIALS.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    setIsTransitioning(true);
    setActiveIndex(index);
  }, []);

  const next = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const prev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleTransitionEnd = () => {
      if (activeIndex >= TESTIMONIALS.length * 2) {
        setIsTransitioning(false);
        setActiveIndex(TESTIMONIALS.length);
      } else if (activeIndex < TESTIMONIALS.length) {
        setIsTransitioning(false);
        setActiveIndex(TESTIMONIALS.length * 2 - 1);
      }
    };

    track.addEventListener("transitionend", handleTransitionEnd);
    return () => track.removeEventListener("transitionend", handleTransitionEnd);
  }, [activeIndex]);

  useEffect(() => {
    if (!isTransitioning) {
      const id = requestAnimationFrame(() => setIsTransitioning(true));
      return () => cancelAnimationFrame(id);
    }
  }, [isTransitioning]);

  return (
    <section
      className="w-full py-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mb-10 flex flex-col gap-4 px-6 md:ml-auto md:max-w-4xl md:flex-row md:items-center md:justify-between">
        <h2 className="text-[32px] leading-[1.1] tracking-tight text-[#0D212C] md:text-[40px] lg:text-[44px]">
          What <span className="font-serif-accent">builders</span> say
        </h2>
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-black text-black" />
          ))}
          <span className="ml-2 text-sm font-medium text-[#051A24]">
            Clutch 5/5
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-6 px-6"
          style={{
            transform: `translateX(calc(-${activeIndex} * (min(427.5px, calc(100vw - 48px)) + 24px)))`,
            transition: isTransitioning
              ? "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
              : "none",
          }}
        >
          {tripled.map((testimonial, i) => (
            <div
              key={`${testimonial.name}-${i}`}
              className="w-[calc(100vw-48px)] shrink-0 rounded-[32px] bg-white px-6 py-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-500 md:w-[427.5px] md:rounded-[40px] md:pl-10 md:pr-24"
              style={{
                opacity: i === activeIndex ? 1 : 0.6,
                transform: i === activeIndex ? "scale(1)" : "scale(0.95)",
              }}
            >
              <QuoteIcon />
              <p className="text-base leading-relaxed text-[#0D212C]">
                {testimonial.quote}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-[#051A24]">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-[#051A24]/70">
                    → {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0D212C]/20 transition-colors hover:bg-[#051A24]/5"
          >
            <ChevronLeft className="h-5 w-5 text-[#051A24]" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0D212C]/20 transition-colors hover:bg-[#051A24]/5"
          >
            <ChevronRight className="h-5 w-5 text-[#051A24]" />
          </button>
        </div>
      </div>
    </section>
  );
}
