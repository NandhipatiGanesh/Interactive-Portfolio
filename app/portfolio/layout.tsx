import  Footer  from "@/components/modem-animated-footer";
import {WaitlistHero} from "@/components/waitlist-hero";  
import Header from "@/components/Header";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
    <main>{children}</main>
      <WaitlistHero />
      <Footer />
    </>
  );
}
