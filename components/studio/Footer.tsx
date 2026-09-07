import { ArrowUpRight } from "lucide-react";
import { LinkButton } from "./Button";
import { BOOK_URL, CONTACT } from "./constants";

const PAGE_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Pricing", href: "#pricing" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: CONTACT.linkedin },
  { label: "GitHub", href: CONTACT.github },
  { label: "Email", href: `mailto:${CONTACT.email}` },
];

const linkClass =
  "text-base text-[#051A24] transition-opacity hover:opacity-70";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1200px] px-6 py-12">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-5">
          <LinkButton href={BOOK_URL}>Start a chat</LinkButton>
          <div className="flex flex-col gap-1 text-sm text-[#051A24]/70">
            <a
              href={`mailto:${CONTACT.email}`}
              className="transition-opacity hover:opacity-70"
            >
              {CONTACT.email}
            </a>
            <a
              href={`tel:${CONTACT.phoneHref}`}
              className="transition-opacity hover:opacity-70"
            >
              {CONTACT.phone}
            </a>
            <span>{CONTACT.location}</span>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[#051A24]" />
          <div className="flex gap-16">
            <nav className="flex flex-col gap-3">
              {PAGE_LINKS.map((link) => (
                <a key={link.label} href={link.href} className={linkClass}>
                  {link.label}
                </a>
              ))}
            </nav>
            <nav className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={linkClass}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
