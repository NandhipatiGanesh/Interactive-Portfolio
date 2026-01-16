"use client";
import * as React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming shadcn/ui setup
import FlipButton from "@/components/ui/FlipButton";
import { ExpandingHero } from "./expanding-hero";// Assuming shadcn/ui setup

// --- Animation Variants ---

const FADE_UP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.8 } },
};

const STAGGER_CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// --- Prop Types ---

interface Feature {
  id: string;
  title: string;
  imageUrl: string;
  href: string;
}

interface EthicalHeroProps {
  /**
   * The main title. Can be a string or ReactNode for complex formatting (e.g., line breaks, bolding).
   */
  title: React.ReactNode;
  /**
   * The subtitle text displayed below the main title.
   */
  subtitle: string;
  /**
   * The text label for the call-to-action button.
   */
  ctaLabel: string;
  /**
   * The URL the call-to-action button links to.
   */
  ctaHref: string;
  /**
   * An array of feature objects to be displayed as cards.
   */
  features: Feature[];
}

// --- Component ---

export function EthicalHero({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  features,
}: EthicalHeroProps) {
  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={STAGGER_CONTAINER_VARIANTS}
      className="container mx-auto max-w-6xl px-4 py-16 sm:py-24 my-24"
    >
      {/* 1. Hero Text Content */}
      <div className="mx-auto max-w-3xl text-center pt-16">
        <motion.h1
          variants={FADE_UP_VARIANTS}
          className="text-3xl font-bold tracking-normal text-foreground sm:text-5xl"
          style={{
            lineHeight: "1.2em"
          }}
        >
          {title}
        </motion.h1>

        <motion.p
          variants={FADE_UP_VARIANTS}
          className="mt-6 text-lg leading-8 text-muted-foreground"
        >
          {subtitle}
        </motion.p>

        <motion.div variants={FADE_UP_VARIANTS} className="mt-10">
          <button className="bg-[#c9fd74] rounded-full px-8 py-4 text-black" >
            <FlipButton
                          className="justify-center items-center"
                          label="View my Works"
                        />
          </button>
        </motion.div>
      </div>

      {/* 2. Feature Card Grid */}
      <ExpandingHero /> 
    </motion.section>
  );
}
