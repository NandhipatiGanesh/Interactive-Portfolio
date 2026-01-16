"use client";
import { useState } from "react";
import { LenisProvider } from "@/components/leni-provider"
import { CustomCursor } from "@/components/custom-cursor"
import PinnedImageReveal from "@/components/pinnedImageReveal";
import { EthicalHero } from "@/components/herosections";
import Tabs from "@/components/tabs";
import { PricingSection } from "@/components/pricing-base";
import { FrequencyCircle } from "@/components/FrequencyCircle";
import { Features } from "@/components/features"
import RadialScrollGalleryExample from "@/components/RadialScrollGallery";
import FeaturesSection from "@/components/scrollreveal";
import { InsightsSection } from "@/components/insights-section"
import { ManifestoSection } from "@/components/menifesto-section"
import {ShowcaseSection } from "@/components/showcase"
import {CarouselSection} from "@/components/carousel-section"
export default function PortfolioPage({
  isActiveProp,
}: {
  isActiveProp?: boolean;
}) {
  const [isActive, setIsActive] = useState(false);

  const heroData = {
    title: (
      <>
        I Design Websites 
      
        for
        <br />
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

   
      <EthicalHero
        title={heroData.title}
        subtitle={heroData.subtitle}
        ctaLabel={heroData.ctaLabel}
        ctaHref={heroData.ctaHref}
        features={heroData.features}
      />
      <ManifestoSection />
     
      <Tabs />
      <InsightsSection />
      <PinnedImageReveal />
      <Features />
      <ShowcaseSection />

      <RadialScrollGalleryExample />
      <FrequencyCircle />
      
      <PricingSection />
      <FeaturesSection />
      <CarouselSection />
      </main>
      </LenisProvider>
  
    </>
  );
}
