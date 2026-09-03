"use client";
//File :- components/studio/StudioLanding.tsx
//Author :- Ganesh Nandhipati

//Description :- This is a portfolio website for Ganesh Nandhipati  i have 4 years of experience in web development and design. Ganesh Kumar
//Frontend & React Native Developer.
//Crafting polished websites, dashboards, and mobile apps.
// Frontend & React Native Developer.

// Crafting polished websites, dashboards, and mobile apps. 4 years of experience shipping web and mobile products, with 3 years leading frontend teams. Built with React.js, Next.js, React Native, WordPress, TypeScript, GSAP, and Framer Motion. Currently in the UK and open to freelance or full-time work.
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { LinkButton } from "./Button";
import { BOOK_URL } from "./constants";
import { Marquee } from "./Marquee";
import { TestimonialSection } from "./TestimonialSection";
import { PricingSection } from "./PricingSection";
import { TestimonialCarousel } from "./TestimonialCarousel";
import { ProjectsSection } from "./ProjectsSection";
import { PartnerSection } from "./PartnerSection";
import { Footer } from "./Footer";
import { CopyrightBar } from "./CopyrightBar";
import { BottomNav } from "./BottomNav";
import "@/app/studio/studio.css";

export function StudioLanding() {
  const { ref, isInView } = useInViewAnimation();

  const anim = (delay: string) =>
    isInView ? "animate-fade-in-up" : "opacity-0";

  return (
    <div className="studio-landing min-h-screen bg-white pb-24">
      <section
        ref={ref}
        className="mx-auto max-w-[440px] px-6 pt-12 md:pt-16"
      >
        <p
          className={` mb-4 text-[32px] font-semibold tracking-tight text-[#051A24] md:text-[40px] lg:text-[44px] ${anim("0.1s")}`}
          style={{ animationDelay: "0.1s" }}
        >
          Ganesh
        </p>
        <p
          className={`mb-2 font-mono text-xs text-[#051A24] md:text-sm ${anim("0.2s")}`}
          style={{ animationDelay: "0.2s" }}
        >
          Ganesh Kumar Frontend & React Native Developer.
        </p>
        <h1
          className={`text-[32px] leading-[1.1] tracking-tight whitespace-nowrap text-[#0D212C] md:text-[40px] lg:text-[44px] ${anim("0.3s")}`}
          style={{ animationDelay: "0.3s" }}
        >
          Build the <span className="font-serif-accent">next wave,</span>
          <br />
          the <span className="font-serif-accent">bold way.</span>
        </h1>
        <div
          className={`mt-5 flex flex-col gap-6 text-sm leading-relaxed text-[#051A24] md:mt-6 md:text-base ${anim("0.4s")}`}
          style={{ animationDelay: "0.4s" }}
        >
          <p>
            I spent Four years in this field crafting products used by over a
            billion people. I founded myself to bring that same level of
            thinking to innovators shaping what comes next.
          </p>
          <p>
            The studio is deliberately small. I guide the creative vision on
            every project, backed by a veteran design crew that moves fast
            without cutting corners.
          </p>
          <p>Projects start at $5,000 per month.</p>
        </div>
        <div
          className={`mt-5 flex flex-col gap-3 sm:flex-row md:mt-6 md:gap-4 ${anim("0.5s")}`}
          style={{ animationDelay: "0.5s" }}
        >
          <LinkButton href={BOOK_URL}>Start a chat</LinkButton>
          <LinkButton href="#work" variant="secondary">
            View projects
          </LinkButton>
        </div>
      </section>

      <Marquee />
      <TestimonialSection />
      <PricingSection />
      <TestimonialCarousel />
      <div id="work">
        <ProjectsSection />
      </div>
      <PartnerSection />
      <Footer />
      <CopyrightBar />
      <BottomNav />
    </div>
  );
}
