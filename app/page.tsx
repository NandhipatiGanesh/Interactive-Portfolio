import type { Metadata } from "next";
import RedesignPage from "./redesign/page";

export const metadata: Metadata = {
  title: "Ganesh Kumar — Frontend Developer",
  description: "Frontend developer crafting polished web experiences.",
};

export default function HomePage() {
  return <RedesignPage />;
}
