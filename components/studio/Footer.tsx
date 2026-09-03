import { ArrowUpRight } from "lucide-react";
import { LinkButton } from "./Button";
import { BOOK_URL } from "./constants";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1200px] px-6 py-12">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <LinkButton href={BOOK_URL}>Start a chat</LinkButton>

        <div className="flex items-start gap-6">
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[#051A24]" />
          <div className="flex gap-16">
            <nav className="flex flex-col gap-3">
              <a
                href="#services"
                className="text-base text-[#051A24] transition-opacity hover:opacity-70"
              >
                Services
              </a>
              <a
                href="#work"
                className="text-base text-[#051A24] transition-opacity hover:opacity-70"
              >
                Work
              </a>
              <a
                href="#about"
                className="text-base text-[#051A24] transition-opacity hover:opacity-70"
              >
                About
              </a>
            </nav>
            <nav className="flex flex-col gap-3">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-[#051A24] transition-opacity hover:opacity-70"
              >
                x.com
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-[#051A24] transition-opacity hover:opacity-70"
              >
                LinkedIn
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
