"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { EXPERIENCE } from "@/lib/experience";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ExperienceSection() {
  const { ref, isInView } = useInViewAnimation();
  // Accordion: one role open at a time. Newest role is open on load.
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  const anim = () => (isInView ? "animate-fade-in-up" : "opacity-0");

  return (
    <section ref={ref} className="mx-auto max-w-3xl px-6 py-12">
      <h2
        className={`text-[32px] leading-[1.1] font-normal tracking-tight text-[#0D212C] md:text-[40px] lg:text-[44px] ${anim()}`}
        style={{ animationDelay: "0.1s" }}
      >
        Four years of <span className="font-serif-accent">shipping</span> web
        and mobile products
      </h2>

      <div className="mt-12 flex flex-col">
        {EXPERIENCE.map((exp, i) => {
          const isOpen = openIndex === i;
          const panelId = `${baseId}-panel-${i}`;

          return (
            <div
              key={exp.period}
              className={`border-t border-[#051A24]/10 last:border-b ${anim()}`}
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="group flex w-full items-center gap-4 py-6 text-left"
              >
                <span className="flex-1">
                  <span className="block text-lg font-medium tracking-tight text-[#051A24] md:text-xl">
                    {exp.role}{" "}
                    <span className="font-serif-accent">{exp.company}</span>
                  </span>
                  <span className="mt-1 block font-mono text-xs text-[#051A24]/50 md:text-sm">
                    {exp.period}
                  </span>
                </span>

                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                    isOpen
                      ? "border-[#051A24] bg-[#051A24] text-white"
                      : "border-[#051A24]/15 text-[#051A24] group-hover:border-[#051A24]/40"
                  }`}
                >
                  <ChevronDown
                    className={`size-4 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && exp.points && (
                  <motion.div
                    id={panelId}
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <ul className="flex list-disc flex-col gap-2.5 pb-7 pl-5 text-sm leading-relaxed text-[#051A24]/70 marker:text-[#051A24]/25 md:pr-12 md:text-base">
                      {exp.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
