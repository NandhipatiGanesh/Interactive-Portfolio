import type { Metadata } from "next";
import "./globals.css";
import "./globals.scss";
import Footer from "@/components/modem-animated-footer";
import { WaitlistHero } from "@/components/waitlist-hero";
import Header from "@/components/Header";
import BigHeader from "@/components/bigheader";

export const metadata: Metadata = {
  title: "Ganesh Kumar Frontend Developer",
  description: "Ganesh Kumar Frontend Developer",
};

// Applies the saved theme before paint to avoid a light/dark flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <BigHeader />
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <body className="antialiased">{children}</body>
      <WaitlistHero />
    </html>
  );
}
