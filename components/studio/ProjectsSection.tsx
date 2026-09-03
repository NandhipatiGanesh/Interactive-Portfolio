"use client";

import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "./constants";

function ProjectItem({
  name,
  description,
  image,
}: {
  name: string;
  description: string;
  image: string;
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
    <div
      ref={ref}
      className={isInView ? "animate-fade-in-up" : "opacity-0"}
    >
      <div className="ml-20 md:ml-28">
        <h3 className="font-serif-accent text-2xl font-semibold text-[#051A24] md:text-3xl">
          {name}
        </h3>
        <p className="mt-2 text-sm text-[#051A24]/70 md:text-base">
          {description}
        </p>
      </div>
      <img
        src={image}
        alt={name}
        className="mt-6 w-full rounded-2xl object-cover shadow-lg"
      />
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
