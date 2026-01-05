import Script from "next/script";
import Footer from "@/components/modem-animated-footer";
import { WaitlistHero } from "@/components/waitlist-hero";
import Header from "@/components/Header";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Script
        src="https://unpkg.com/gsap@3/dist/gsap.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://unpkg.com/gsap@3/dist/ScrollSmoother.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://unpkg.com/gsap@3/dist/SplitText.min.js"
        strategy="beforeInteractive"
      />
      <main>{children}</main>
      <WaitlistHero />
      <Footer />
    </>
  );
}
