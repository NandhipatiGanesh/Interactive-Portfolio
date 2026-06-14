"use client";
// file is in components/redesignfolder/contact.tsx

import { Mail, Phone, Linkedin, MapPin } from "lucide-react";

const CONTACT_METHODS: {
  label: string;
  value: string;
  href?: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    label: "Email",
    value: "nandhipatiganeshkumar16@gmail.com",
    href: "mailto:nandhipatiganeshkumar16@gmail.com",
    Icon: Mail,
  },
  {
    label: "Phone (UK)",
    value: "+44 7344 760356",
    href: "tel:+447344760356",
    Icon: Phone,
  },
  {
    label: "Phone (India)",
    value: "+91 7569753062",
    href: "tel:+917569753062",
    Icon: Phone,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/ganesh-nandhipati",
    href: "https://linkedin.com/in/ganesh-nandhipati",
    Icon: Linkedin,
  },
  {
    label: "Location",
    value: "United Kingdom — Available to work",
    Icon: MapPin,
  },
];

export default function Contact() {
  return (
    <div className="mx-auto w-full max-w-[760px] px-4 pt-8 pb-12 sm:px-6">
      <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
        Get in Touch
      </h2>
      <p className="mt-3 text-center text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
        Let&apos;s build something together.
      </p>

      <div className="mt-10 flex flex-col gap-3">
        {CONTACT_METHODS.map((method) => {
          const isLink = Boolean(method.href);
          const Wrapper = isLink ? "a" : "div";
          return (
            <Wrapper
              key={method.label}
              {...(isLink && {
                href: method.href,
                target: method.href!.startsWith("http") ? "_blank" : undefined,
                rel: "noreferrer",
              })}
              className={`glass-bg flex items-center gap-4 rounded-2xl p-4 sm:p-5 ${
                isLink ? "transition-transform hover:scale-[1.02]" : ""
              }`}
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 dark:bg-white/10 dark:text-neutral-200">
                <method.Icon className="size-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-neutral-400 dark:text-neutral-500">
                  {method.label}
                </div>
                <div className="truncate text-sm font-medium text-neutral-900 sm:text-base dark:text-neutral-100">
                  {method.value}
                </div>
              </div>
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}
