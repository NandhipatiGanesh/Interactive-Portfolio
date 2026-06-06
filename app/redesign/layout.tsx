import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ganesh Kumar — Frontend Developer",
  description: "Frontend developer crafting polished web experiences.",
};

// Applies the saved theme before paint to avoid a light/dark flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

export default function RedesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      {children}
    </>
  );
}
