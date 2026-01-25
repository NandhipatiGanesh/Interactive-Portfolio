import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { HeadingPreview } from "./heading";

gsap.registerPlugin(ScrollTrigger);

function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const phone = containerRef.current.querySelector(".phone-center");
    const cards = containerRef.current.querySelectorAll(".feature-card");

    // Set initial states
    gsap.set(phone, { opacity: 0, scale: 0.9, y: 20 });
    gsap.set(cards, { opacity: 0, scale: 0.95, y: 30 });

    // First timeline: entrance animation for phone (normal, not scrubbed)
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        toggleActions: "play none none none",
      },
    });

    entranceTl.to(phone, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    });

    // Second timeline: scroll-based reveal of feature cards
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1500",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    scrollTl.to(cards, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: "power2.out",
    });
  }, []);

  return (
   <>
  <HeadingPreview title="Features" subtitle="What I implement" />

  <div
    ref={containerRef}
    className="min-h-screen bg-white flex items-center justify-center px-4 py-20"
  >
    <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

      {/* Auth */}
      <div className="feature-card bg-[#e8e6e1] rounded-2xl p-8 border border-[#c5c1b8]">
        <div className="w-10 h-10 bg-[#C9FD74] rounded-full flex items-center justify-center mb-6">
          {/* Shield */}
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
          </svg>
        </div>
        <h3 className="text-2xl font-serif text-[#3a3a3a] mb-3">
          Authentication & Secure Access
        </h3>
        <p className="text-[#6b6b6b] leading-relaxed max-w-[90%]">
          Secure authentication flows with protected routes and controlled user access.
        </p>
      </div>

      {/* Phone */}
      <div className="phone-center md:row-span-2 flex justify-center">
        <div className="w-[280px] h-[570px] bg-[#C9FD74] rounded-[50px] p-3 shadow-2xl">
          <div className="w-full h-full bg-[#0f1f14] rounded-[42px] overflow-hidden relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#C9FD74] rounded-b-3xl z-10"></div>
            <img
              src="/servicesimages/mobile features.png"
              alt="Mobile app UI"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* UX */}
      <div className="feature-card bg-[#e8e6e1] rounded-2xl p-8 border border-[#c5c1b8]">
        <div className="w-10 h-10 bg-[#C9FD74] rounded-full flex items-center justify-center mb-6">
          {/* Compass */}
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16 8 14 14 8 16 10 10 16 8" />
          </svg>
        </div>
        <h3 className="text-2xl font-serif text-[#3a3a3a] mb-3">
          Clean Navigation & Thoughtful UX
        </h3>
        <p className="text-[#6b6b6b] leading-relaxed max-w-[90%]">
          Mobile-first navigation designed for clarity, speed, and intuitive user flow.
        </p>
      </div>

      {/* Offline */}
      <div className="feature-card bg-[#e8e6e1] rounded-2xl p-8 border border-[#c5c1b8]">
        <div className="w-10 h-10 bg-[#C9FD74] rounded-full flex items-center justify-center mb-6">
          {/* Cloud off */}
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17.5 19H6a4 4 0 010-8 5 5 0 019.9-1" />
            <line x1="3" y1="3" x2="21" y2="21" />
          </svg>
        </div>
        <h3 className="text-2xl font-serif text-[#3a3a3a] mb-3">
          Offline-Friendly Data Handling
        </h3>
        <p className="text-[#6b6b6b] leading-relaxed max-w-[90%]">
          Local data caching with automatic sync when network connectivity returns.
        </p>
      </div>

      {/* Performance */}
      <div className="feature-card bg-[#e8e6e1] rounded-2xl p-8 border border-[#c5c1b8]">
        <div className="w-10 h-10 bg-[#C9FD74] rounded-full flex items-center justify-center mb-6">
          {/* Bolt */}
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
        <h3 className="text-2xl font-serif text-[#3a3a3a] mb-3">
          Performance-Optimized UI
        </h3>
        <p className="text-[#6b6b6b] leading-relaxed max-w-[90%]">
          Optimized rendering and smooth transitions for fast, responsive experiences.
        </p>
      </div>

    </div>
  </div>
</>
  );
}
export default FeaturesSection;