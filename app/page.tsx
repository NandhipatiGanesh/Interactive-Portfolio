"use client";
import { useState } from "react";
import { LenisProvider } from "@/components/leni-provider"
import { CustomCursor } from "@/components/custom-cursor"
import PinnedImageReveal from "@/components/pinnedImageReveal";
import { EthicalHero } from "@/components/herosections";
import Tabs from "@/components/tabs";
import { PricingSection } from "@/components/pricing-base";
import { FrequencyCircle } from "@/components/FrequencyCircle";
import { ProjectShowcase } from "@/components/project-showcase";
import { InsightsSection } from "@/components/insights-section";
import NewFeaturesSection from "@/components/bento-grid"
import RadialScrollGalleryExample from "@/components/RadialScrollGallery";
import FeaturesSection from "@/components/scrollreveal";
import { HoverPreview } from "@/components/hover-preview";
import { ManifestoSection } from "@/components/menifesto-section"
import {HeadingPreview} from "@/components/heading";  
import {CarouselSection} from "@/components/carousel-section"
import { MultiStepForm } from "@/components/multistepform";
export default function PortfolioPage({
  isActiveProp,
}: {
  isActiveProp?: boolean;
}) {
  const [isActive, setIsActive] = useState(false);

  const heroData = {
    title: (
      <>
        I Design Web & Mobile Applications 
       <br />
        for
       
        Founders who move fast{" "}
        
      </>
    ),
    subtitle:
      "GOODFOLIO is a simple and transparent investment platform designed for experienced and aspiring socially responsible investors.",
    ctaLabel: "Join the waitlist",
    ctaHref: "#",
    features: [
      {
        id: "deforestation",
        title: "Websites",
        imageUrl:
          "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop",
        href: "#",
      },
      {
        id: "ocean-health",
        title: "Dashboards",
        imageUrl:
          "https://images.unsplash.com/photo-1503756234508-e32369269deb?q=80&w=800&auto=format&fit=crop",
        href: "#",
      },
      {
        id: "animal-welfare",
        title: "Mobile Apps",
        imageUrl:
          "https://images.unsplash.com/photo-1534759846116-5799c33ce22a?q=80&w=800&auto=format&fit=crop",
        href: "#",
      },
    ],
  };
  return (
    <>
    <LenisProvider>
      <main className="custom-cursor bg-background">
      <CustomCursor />
      <HoverPreview />
      <FrequencyCircle />
      <HeadingPreview title="My " subtitle=" Services" />
      <PinnedImageReveal />
      <HeadingPreview  title="My " subtitle="Works"/>
      <Tabs />   
      {/* <ManifestoSection /> */}
      {/* <ProjectShowcase /> */}
    

      <NewFeaturesSection />
    
      <PricingSection />

      <CarouselSection />
      <div className="flex min-h-screen items-center justify-center bg-background p-4 w-full">
      <MultiStepForm />
      </div>
      </main>
      </LenisProvider>
    </>
  );
}
