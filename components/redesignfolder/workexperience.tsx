"use client";
// file is in components/redesignfolder/workexperience.tsx

import { Briefcase, Sparkles, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

type Accent = "blue" | "dark" | "green";

const EXPERIENCE: {
  period: string;
  role: string;
  company: string;
  href: string;
  accent: Accent;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    period: "2026 — Present",
    role: "Available in the",
    company: "UK",
    href: "#",
    accent: "green",
    Icon: Sparkles,
  },
  {
    period: "Dec 2023 — Mar 2026",
    role: "Frontend Developer (TL) at",
    company: "Advait Tech",
    href: "#",
    accent: "blue",
    Icon: Briefcase,
  },
  {
    period: "May 2022 — Nov 2023",
    role: "Frontend Dev Intern,",
    company: "Remote",
    href: "#",
    accent: "dark",
    Icon: ShoppingBag,
  },
];

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
        {EXPERIENCE.map((exp) => (
          <div
            key={exp.period}
            className="grid grid-cols-[110px_1fr_auto] items-center gap-4 sm:grid-cols-[160px_1fr_auto] sm:gap-8"
          >
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
                "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium ring-1 transition-transform hover:scale-[1.03]",
                ACCENT_CLASSES[exp.accent],
              )}
            >
              <exp.Icon className="size-4" />
              {exp.company}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
