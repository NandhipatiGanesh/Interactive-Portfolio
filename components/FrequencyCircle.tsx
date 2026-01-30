"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, HTMLAttributes, forwardRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export interface RadialScrollGalleryProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

const skills = [
  { label: "Product Design", x: "50%", y: "15%", rotate: -2 },
  { label: "Design Systems", x: "25%", y: "22%", rotate: -8 },
  { label: "User Experience Design", x: "73%", y: "20%", rotate: 5 },
  { label: "User Research", x: "15%", y: "48%", rotate: -12 },
  { label: "User Interface Design", x: "83%", y: "45%", rotate: 8 },
  { label: "Pitch Deck Design", x: "18%", y: "72%", rotate: -6 },
  { label: "Framer Development", x: "48%", y: "82%", rotate: 3 },
  { label: "Visual Design", x: "70%", y: "75%", rotate: -4 },
  { label: "Branding", x: "82%", y: "60%", rotate: 10 },
];

export const FrequencyCircle = forwardRef<
  HTMLDivElement,
  RadialScrollGalleryProps
>(({ className = "", ...rest }, _ref) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !wrapperRef.current) return;

    const centerContent = containerRef.current.querySelector(".fc-center-content");
    const pills = containerRef.current.querySelectorAll(".fc-pill");

    // Set initial states - everything hidden
    gsap.set(centerContent, { opacity: 0, scale: 0.5 });
    gsap.set(pills, { opacity: 0, scale: 0 });

    // Create the pinned scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 1,
        pinSpacing: true,
      },
    });

    // Step 1: Reveal center content (0% - 20% of scroll)
    tl.to(
      centerContent,
      {
        opacity: 1,
        scale: 1,
        duration: 0.2,
        ease: "back.out(1.7)",
      },
      0
    );

    // Step 2: Reveal pills one by one (20% - 90% of scroll)
    pills.forEach((pill, index) => {
      tl.to(
        pill,
        {
          opacity: 1,
          scale: 1,
          duration: 0.08,
          ease: "back.out(2)",
        },
        0.2 + index * 0.07
      );
    });

    // Step 3: Hold at end so user can see everything (90% - 100%)
    tl.to({}, { duration: 0.2 });

  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`w-full relative bg-[#f5f3ef] ${className}`}
      style={{ minHeight: "100vh" }}
      {...rest}
    >
      <div
        ref={containerRef}
        className="w-full h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Center Content */}
        <div className="fc-center-content absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 max-w-lg px-4">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <svg
              width="70"
              height="70"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="32" cy="54" rx="18" ry="4" fill="#1a365d" opacity="0.15" />
              <rect x="22" y="44" width="20" height="10" rx="2" fill="#1a365d" />
              <path d="M18 44h28l-4 4H22l-4-4z" fill="#2d4a6f" />
              <ellipse cx="32" cy="26" rx="22" ry="10" fill="#ff6b35" />
              <ellipse cx="32" cy="26" rx="30" ry="5" fill="#ff6b35" opacity="0.4" />
              <ellipse cx="32" cy="22" rx="14" ry="18" fill="#1a365d" />
              <circle cx="26" cy="18" r="3" fill="#fff" opacity="0.5" />
            </svg>
          </div>

          {/* Title */}
          <h2
            className="text-4xl md:text-5xl lg:text-6xl text-[#1a365d] mb-5"
            style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            What I bring to the table
          </h2>

          {/* Subtitle */}
          <p className="text-[#4a5568] text-lg md:text-xl leading-relaxed max-w-md mx-auto">
            Digital experiences that engage users and help your startup stand out from day one
          </p>
        </div>

        {/* Floating Pills */}
        {skills.map((skill, index) => (
          <div
            key={index}
            className="fc-pill absolute z-10"
            style={{
              left: skill.x,
              top: skill.y,
            }}
          >
            <div
              className="px-5 py-3 rounded-full bg-[#dbeafe] text-[#1a365d] font-medium text-sm md:text-base whitespace-nowrap shadow-sm"
              style={{
                transform: `rotate(${skill.rotate}deg)`,
              }}
            >
              {skill.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

FrequencyCircle.displayName = "FrequencyCircle";
