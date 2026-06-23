"use client";

// Built with the taste-skill design read: designer portfolio → VARIANCE 8 / MOTION 7 / DENSITY 3.
// Neutral base, single accent, drag-and-snap featured showcase. Motion-driven (no useState for the drag value).

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Project = { src: string; title: string; tag: string };

const PROJECTS: Project[] = [
  { src: "/webImages/luxhospitalsdesktop.png", title: "Lux Hospitals", tag: "Healthcare" },
  { src: "/webImages/praanavaidyalanding.png", title: "Praana Vaidya", tag: "Wellness" },
  { src: "/webImages/Gutcare.png", title: "GutCare", tag: "Healthcare" },
  { src: "/webImages/avira.png", title: "Avira", tag: "Brand" },
  { src: "/webImages/cryptositeOne.png", title: "Crypto One", tag: "Web3" },
  { src: "/webImages/chiraglandingpage.png", title: "Chirag", tag: "Landing" },
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

const wrap = (i: number, len: number) => ((i % len) + len) % len;

export function WorkCarousel() {
  const [[page, dir], setPage] = useState<[number, number]>([0, 0]);
  const index = wrap(page, PROJECTS.length);
  const project = PROJECTS[index];

  const paginate = (d: number) => setPage([page + d, d]);

  return (
    <section className="bg-neutral-950 py-24 text-neutral-100 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* header */}
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Selected Work</p>
            <h2 className="mt-3 text-4xl font-medium leading-none tracking-tighter md:text-6xl">
              Things I&apos;ve shipped
            </h2>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous project"
              className="flex size-12 items-center justify-center rounded-full border border-white/15 text-neutral-300 transition-colors hover:border-white/40 hover:text-white"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              onClick={() => paginate(1)}
              aria-label="Next project"
              className="flex size-12 items-center justify-center rounded-full border border-white/15 text-neutral-300 transition-colors hover:border-white/40 hover:text-white"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>

        {/* stage */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 md:aspect-[16/9]">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={page}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 260, damping: 32 }, opacity: { duration: 0.25 } }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) paginate(1);
                else if (info.offset.x > 80) paginate(-1);
              }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <img
                src={project.src}
                alt={project.title}
                draggable={false}
                className="h-full w-full object-cover object-top"
              />
              {/* caption overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 md:p-8">
                <span className="inline-block rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium tracking-wide text-emerald-300">
                  {project.tag}
                </span>
                <h3 className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">{project.title}</h3>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* footer: progress + mobile controls */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to project ${i + 1}`}
                onClick={() => setPage([i, i > index ? 1 : -1])}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-emerald-400" : "w-3 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm tabular-nums text-neutral-500">
              {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-3 md:hidden">
              <button
                onClick={() => paginate(-1)}
                aria-label="Previous project"
                className="flex size-10 items-center justify-center rounded-full border border-white/15 text-neutral-300"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                onClick={() => paginate(1)}
                aria-label="Next project"
                className="flex size-10 items-center justify-center rounded-full border border-white/15 text-neutral-300"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
