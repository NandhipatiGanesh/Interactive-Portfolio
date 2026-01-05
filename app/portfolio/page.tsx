import IntfiniteScroll from "@/components/inifnite-scroll";
import InfiniteScrollLandscape from "@/components/infinite-scroll-landscape";
import PinnedImageReveal from "@/components/pinnedImageReveal";
import { HeroDemo1, HeroDemo2, HeroDemo3 } from "@/components/hero-usage";
import Tabs from "@/components/tabs";
import HealthcareHero from "@/components/scroll-drivenhero";

export default function PortfolioPage() {
  return (
    <>
      <HeroDemo1 />
      <Tabs />
      <PinnedImageReveal />
      <HealthcareHero />
    </>
  );
}
