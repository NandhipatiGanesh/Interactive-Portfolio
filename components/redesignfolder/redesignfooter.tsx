"use client";
// file is in components/redesignfolder/redesignfooter.tsx

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "system" | "light" | "dark";

const THEMES: { key: Theme; Icon: typeof Monitor; label: string }[] = [
  { key: "system", Icon: Monitor, label: "System theme" },
  { key: "light", Icon: Sun, label: "Light theme" },
  { key: "dark", Icon: Moon, label: "Dark theme" },
];

const SOCIAL = [
  { label: "Email", href: "mailto:nandhipatiganeshkumar16@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ganesh-nandhipati" },
];

export default function RedesignFooter() {
  const [theme, setTheme] = useState<Theme>("system");

  // Load saved preference after mount (keeps SSR markup stable).
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored === "light" || stored === "dark" || stored === "system") {
      setTheme(stored);
    }
  }, []);

  // Apply + persist, and react to OS changes in system mode.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = (t: Theme) => {
      const isDark = t === "dark" || (t === "system" && mq.matches);
      document.documentElement.classList.toggle("dark", isDark);
    };
    apply(theme);
    localStorage.setItem("theme", theme);

    const onChange = () => theme === "system" && apply("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  return (
    <footer className="px-7 pb-8 sm:px-10 lg:absolute lg:inset-x-0 lg:bottom-0 lg:px-16">
      <div className="flex items-center justify-end gap-7">
        <div className="flex gap-5 text-sm text-neutral-400">
          {SOCIAL.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="transition-colors hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100"
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-0.5 rounded-full border border-black/5 bg-white/70 p-1 backdrop-blur dark:border-white/10 dark:bg-white/5">
          {THEMES.map(({ key, Icon, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTheme(key)}
              aria-label={label}
              aria-pressed={theme === key}
              className={cn(
                "rounded-full p-1.5 text-neutral-400 transition-colors",
                theme === key
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "hover:text-neutral-700 dark:hover:text-neutral-200",
              )}
            >
              <Icon className="size-3.5" />
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
