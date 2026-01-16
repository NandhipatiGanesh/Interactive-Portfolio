import type { Metadata } from "next";
import "./globals.css";
import "./globals.scss";
import  Footer  from "@/components/modem-animated-footer";
import {WaitlistHero} from "@/components/waitlist-hero";  
import Header from "@/components/Header";
import  BigHeader  from "@/components/bigheader";

export const metadata: Metadata = {
  title: "Ganesh Kumar Frontend Developer",
  description: "Ganesh Kumar Frontend Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <BigHeader />
      <body className="antialiased">{children}</body>
      <WaitlistHero />
    </html>
  );
}
