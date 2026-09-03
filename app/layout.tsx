import type { Metadata } from "next";
import "./globals.css";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Ganesh Kumar Frontend Developer",
  description: "Ganesh Kumar Frontend Developer",
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <body className="antialiased">{children}</body>
    </html>
  );
}
