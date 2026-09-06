"use client";
// file is in components/redesignfolder/workexperience.tsx

import { Briefcase, GraduationCap, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { EXPERIENCE } from "@/lib/experience";

type Accent = "blue" | "dark" | "green";

// Presentation only — keyed by company so it stays in step with lib/experience.
const STYLES: Record<
  string,
  { accent: Accent; Icon: React.ComponentType<{ className?: string }> }
> = {
  UK: { accent: "green", Icon: GraduationCap },
  "Advait Technology Labs": { accent: "blue", Icon: Briefcase },
  Remote: { accent: "dark", Icon: ShoppingBag },
};

const ACCENT_CLASSES: Record<Accent, string> = {
  blue: "bg-blue-50 text-blue-600 ring-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-400/20",
  dark: "bg-neutral-900 text-white ring-neutral-800 dark:bg-white dark:text-neutral-900 dark:ring-white/20",
  green:
    "bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20",
};

export default function WorkExperience() {
  return (
    <div className="mx-auto w-full max-w-[760px] px-4 pt-8 sm:px-8">
      <h2 className="text-3xl font-semibold tracking-tight">Work Experience</h2>

      <div className="mt-10 flex flex-col gap-7">
        {EXPERIENCE.map((exp) => {
          const { accent, Icon } = STYLES[exp.company] ?? {
            accent: "dark" as Accent,
            Icon: Briefcase,
          };

          return (
            <div key={exp.period} className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 sm:grid sm:grid-cols-[160px_1fr_auto] sm:items-center sm:gap-8">
                <span className="text-xs text-neutral-400 sm:text-sm dark:text-neutral-500">
                  {exp.period}
                </span>
                <span className="text-sm text-neutral-800 sm:text-base dark:text-neutral-200">
                  {exp.role}
                </span>
                <a
                  href={exp.href}
                  target={exp.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className={cn(
                    "inline-flex w-fit items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium ring-1 transition-transform hover:scale-[1.03]",
                    ACCENT_CLASSES[accent],
                  )}
                >
                  <Icon className="size-4" />
                  {exp.company}
                </a>
              </div>

              {/* Responsibilities — indented to line up with the role column. */}
              {exp.points && (
                <ul className="ml-5 flex list-disc flex-col gap-2 pr-2 text-sm leading-relaxed text-neutral-600 marker:text-neutral-300 sm:ml-[192px] dark:text-neutral-400 dark:marker:text-neutral-600">
                  {exp.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
