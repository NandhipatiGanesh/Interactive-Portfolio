"use client";

import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { LinkButton } from "./Button";
import { BOOK_URL } from "./constants";

export function PricingSection() {
  const { ref, isInView } = useInViewAnimation();

  const anim = (delay: string) =>
    isInView ? "animate-fade-in-up" : "opacity-0";

  return (
    <section ref={ref} className="w-full px-6 py-12">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:ml-auto md:grid-cols-2 md:justify-end">
        <div
          className={`rounded-[40px] bg-[#051A24] pb-10 pl-10 pr-10 pt-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] md:pr-24 ${anim("0.1s")}`}
          style={{ animationDelay: "0.1s" }}
        >
          <h3 className="text-[22px] font-medium text-[#F6FCFF]">
            Monthly Partnership
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#E0EBF0]">
            A dedicated creative design team.
            <br />
            You work directly with Viktor.
          </p>
          <div className="mt-6">
            <p className="text-2xl text-[#F6FCFF]">$5,000</p>
            <p className="text-sm text-[#E0EBF0]">Monthly</p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LinkButton href={BOOK_URL}>Start a chat</LinkButton>
            <LinkButton href={BOOK_URL} variant="secondary">
              How it works
            </LinkButton>
          </div>
        </div>

        <div
          className={`rounded-[40px] bg-white pb-10 pl-10 pr-10 pt-3 shadow-[0_4px_16px_rgba(0,0,0,0.08)] md:pr-24 ${anim("0.2s")}`}
          style={{ animationDelay: "0.2s" }}
        >
          <h3 className="text-[22px] font-medium text-[#051A24]">
            Custom Project
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#051A24]/70">
            Fixed scope, fixed timeline.
            <br />
            Same team, same standards.
          </p>
          <div className="mt-6">
            <p className="text-2xl text-[#0D212C]">$5,000</p>
            <p className="text-sm text-[#051A24]/70">Minimum</p>
          </div>
          <div className="mt-6">
            <LinkButton href={BOOK_URL} variant="tertiary">
              Start a chat
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
