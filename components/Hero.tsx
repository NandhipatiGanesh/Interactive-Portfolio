"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const titles = [
  "Simple, reliable, private messages and calls for free.",
  "Speak freely and feel close to the most important people in your life.",
  "No matter where they are.",
  "Stay connected with confidence.",
];

interface CallControlProps {
  icon: React.ReactNode;
  label: string;
  variant?: "default" | "message" | "end";
}

const CallControl = ({
  icon,
  label,
  variant = "default",
}: CallControlProps) => {
  const bgColor =
    variant === "message"
      ? "bg-blue-600"
      : variant === "end"
      ? "bg-red-600"
      : "bg-black/70 backdrop-blur-sm";

  return (
    <button
      className={`${bgColor} text-white rounded-full h-14 w-14 hover:w-auto hover:px-4 border-2 border-white/30 flex items-center justify-center gap-2 text-xl hover:shadow-lg transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden group cursor-pointer`}
    >
      <span className="flex-shrink-0 min-w-[1.5rem] flex items-center justify-center">
        {icon}
      </span>
      <span className="max-w-0 opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden whitespace-nowrap text-base font-medium">
        {label}
      </span>
    </button>
  );
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<HTMLHeadingElement[]>([]);
  const controlsRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!wrapperRef.current || !heroInnerRef.current || !containerRef.current)
      return;

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const ctx = gsap.context(() => {
      // Main timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2.5,
          pin: wrapperRef.current,
          pinSpacing: false,
          anticipatePin: 1,
        },
      });

      // Animate each title with stagger
      titleRefs.current.forEach((titleEl, index) => {
        if (!titleEl) return;

        const startPosition = index * 1.5;

        // Fade in
        mainTl.fromTo(
          titleEl,
          {
            opacity: 0,
            y: 80,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          startPosition
        );

        // Hold
        mainTl.to(titleEl, {
          opacity: 1,
          duration: 0.5,
        });

        // Fade out
        mainTl.to(
          titleEl,
          {
            opacity: 0,
            y: -80,
            scale: 0.95,
            duration: 0.5,
            ease: "power2.in",
          },
          startPosition + 1
        );
      });

      // Zoom out hero container at the end
      mainTl.to(
        heroInnerRef.current,
        {
          scale: 0.95,
          borderRadius: "48px",
          duration: 1,
          ease: "power2.inOut",
        },
        titles.length * 1.5
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-gray-50"
      style={{ height: `${(titles.length + 1) * 100}vh` }}
    >
      {/* Pin target wrapper */}
      <section ref={wrapperRef} className="relative w-full h-screen">
        {/* Hero content */}
        <div
          ref={heroInnerRef}
          className="relative h-screen w-full mx-auto overflow-hidden rounded-[32px] shadow-2xl will-change-transform"
          style={{ maxWidth: "calc(100% - 32px)", margin: "16px auto" }}
        >
          {/* Background video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/herovideo.mp4" type="video/mp4" />
          </video>

          {/* Scroll-animated titles container */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-5xl pointer-events-none">
            {titles.map((text, i) => (
              <h1
                key={i}
                ref={(el) => {
                  if (el) titleRefs.current[i] = el;
                }}
                className={`absolute inset-0 flex items-center justify-center text-white font-bold text-4xl md:text-6xl lg:text-7xl leading-tight text-center px-4
  ${i === 0 ? "opacity-100" : "opacity-0"}`}
                style={{
                  willChange: "transform, opacity",
                }}
              >
                {text}
              </h1>
            ))}
          </div>

          {/* Call controls with labels */}
          <div
            ref={controlsRef}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-4"
            style={{ willChange: "transform, opacity" }}
          >
            <CallControl icon="🎤" label="Mute" />
            <CallControl icon="🔊" label="Speaker" />
            <CallControl icon="🎥" label="Video" />
            <CallControl icon="💬" label="Message" variant="message" />
            <CallControl icon="✕" label="End Call" variant="end" />
          </div>

          {/* Avatar */}
          <div
            ref={avatarRef}
            className="absolute bottom-28 right-10 h-40 w-28 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-5xl">
              👤
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
