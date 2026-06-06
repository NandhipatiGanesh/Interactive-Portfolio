"use client";
// file is in components/redesignfolder/floatingnav.tsx

import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Home, Instagram } from "lucide-react";

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const NAV_ITEMS: {
  key: string;
  Icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
  dividerAfter?: boolean;
}[] = [
  { key: "home", Icon: Home, href: "/", label: "Home", dividerAfter: true },
  { key: "x", Icon: XIcon, href: "https://x.com", label: "X" },
  { key: "instagram", Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { key: "blog", Icon: FileText, href: "/blog", label: "Blog", dividerAfter: true },
];

export default function FloatingNav() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    /* Desktop only — mobile already has the tabs pill at bottom-center. */
    <div className="pointer-events-none fixed top-5 left-8 z-50 block">
      <div className="glass-bg pointer-events-auto flex items-center gap-0.5 rounded-full p-1.5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.25)]">
        {NAV_ITEMS.map((item) => (
          <Fragment key={item.key}>
            <a
              href={item.href}
              aria-label={item.label}
              onMouseEnter={() => setHovered(item.key)}
              onMouseLeave={() => setHovered(null)}
              className="relative flex size-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
            >
              {hovered === item.key && (
                <motion.span
                  layoutId="floating-nav-hover"
                  className="absolute inset-0 rounded-full bg-neutral-200/70 dark:bg-white/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <item.Icon className="relative size-[18px]" />
            </a>
            {item.dividerAfter && (
              <span className="mx-1.5 h-6 w-px bg-neutral-300 dark:bg-white/15" />
            )}
          </Fragment>
        ))}

        <a
          href="#book"
          className="ml-1 whitespace-nowrap rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.03] dark:bg-white dark:text-neutral-900"
        >
          Book a Call
        </a>
      </div>
    </div>
  );
}
