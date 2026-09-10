"use client";

import { useEffect, useRef, useState } from "react";
import { isVideo } from "@/lib/portfolio-images";
import { PROJECTS } from "./constants";

type Variant = "wide" | "phone";

function Media({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  if (isVideo(src)) {
    return (
      <video
        src={src}
        className={className}
        controls
        playsInline
        preload="metadata"
      />
    );
  }

  return <img src={src} alt={alt} loading="lazy" className={className} />;
}

function ProjectItem({
  name,
  description,
  images,
  variant,
}: {
  name: string;
  description: string;
  images: string[];
  variant: Variant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={isInView ? "animate-fade-in-up" : "opacity-0"}>
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="ml-20 md:ml-28">
          <h3 className="font-serif-accent text-2xl font-semibold text-[#051A24] md:text-3xl">
            {name}
          </h3>
          <p className="mt-2 text-sm text-[#051A24]/70 md:text-base">
            {description}
          </p>
        </div>
      </div>

      {/* Full-bleed horizontal rail — text stays max-w-[1200px] above. */}
      <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 hide-scrollbar">
        {images.map((src, i) => (
          <div
            key={src}
            className={`shrink-0 snap-start ${
              variant === "phone"
                ? "h-[400px] w-[200px] md:h-[560px] md:w-[260px]"
                : "h-[220px] w-[90vw] md:h-[420px] md:w-[800px]"
            }`}
          >
            <Media
              src={src}
              alt={`${name} ${i + 1}`}
              className={
                variant === "phone"
                  ? "h-full w-full rounded-2xl object-cover object-top shadow-lg"
                  : "h-full w-full rounded-2xl bg-[#f7f6f7] object-cover shadow-lg"
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section className="w-full py-12">
      <div className="flex flex-col gap-16 md:gap-20">
        {PROJECTS.map((project) => (
          <ProjectItem key={project.name} {...project} />
        ))}
      </div>
    </section>
  );
}
