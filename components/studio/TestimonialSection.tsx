"use client";

import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { PARALLAX_IMAGE } from "./constants";

function ParallaxImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateOffset = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distance = elementCenter - viewportCenter;
      const maxOffset = 200;
      const normalized = distance / viewportHeight;
      const clamped = Math.max(-1, Math.min(1, normalized));
      setOffset(clamped * maxOffset);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateOffset);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", onScroll, { passive: true });
          updateOffset();
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      },
      { threshold: 0 },
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="mt-8 flex justify-center">
      <img
        src={PARALLAX_IMAGE}
        alt="Chris Halaska"
        className="w-full max-w-xs rounded-2xl shadow-lg transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: `translateY(${offset}px)` }}
      />
    </div>
  );
}

export function TestimonialSection() {
  const { ref, isInView } = useInViewAnimation();

  const anim = (delay: string) =>
    isInView ? `animate-fade-in-up` : "opacity-0";

  return (
    <section
      ref={ref}
      className="mx-auto max-w-2xl px-6 py-12 text-center"
    >
      <Quote
        className={`mx-auto mb-6 h-6 w-6 text-slate-900 ${anim("0.1s")}`}
        style={{ animationDelay: "0.1s" }}
      />
      <blockquote
        className={`text-[32px] leading-[1.1] font-normal tracking-tight text-[#0D212C] md:text-[40px] lg:text-[44px] ${anim("0.2s")}`}
        style={{ animationDelay: "0.2s" }}
      >
        I left{" "}
        <span className="font-serif-accent">Apple</span> to build the studio I
        always wanted to work with
      </blockquote>
      <p
        className={`mt-6 text-sm italic text-[#273C46] ${anim("0.3s")}`}
        style={{ animationDelay: "0.3s" }}
      >
        Viktor Oddy
      </p>
      <div
        className={`mt-8 flex items-center justify-center gap-8 ${anim("0.4s")}`}
        style={{ animationDelay: "0.4s" }}
      >
        <span className="w-20 text-2xl font-medium text-slate-900">Apple</span>
        <span className="w-[83px] text-2xl font-medium text-slate-900">
          IDEO
        </span>
        <span className="w-[110px] text-2xl font-medium text-slate-900">
          Polygon
        </span>
      </div>
      <div className={anim("0.5s")} style={{ animationDelay: "0.5s" }}>
        <ParallaxImage />
      </div>
    </section>
  );
}
