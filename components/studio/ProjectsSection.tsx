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
      <div className="ml-20 md:ml-28">
        <h3 className="font-serif-accent text-2xl font-semibold text-[#051A24] md:text-3xl">
          {name}
        </h3>
        <p className="mt-2 text-sm text-[#051A24]/70 md:text-base">
          {description}
        </p>
      </div>

      {/* Horizontal, snapping rail — keeps a long screenshot set browsable
          without turning the landing page into an endless scroll. */}
      <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 hide-scrollbar">
        {images.map((src, i) => (
          <div
            key={src}
            className={
              variant === "phone"
                ? "h-[400px] w-[200px] shrink-0 snap-start md:h-[520px] md:w-[260px]"
                : "h-[220px] w-[85vw] shrink-0 snap-start md:h-[400px] md:w-[680px]"
            }
          >
            <Media
              src={src}
              alt={`${name} ${i + 1}`}
              className="h-full w-full rounded-2xl object-cover object-top shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12">
      <div className="flex flex-col gap-16 md:gap-20">
        {PROJECTS.map((project) => (
          <ProjectItem key={project.name} {...project} />
        ))}
      </div>
    </section>
  );
}
