import type { Metadata } from "next";
import { StudioLanding } from "@/components/studio/StudioLanding";
import "./studio.css";

export const metadata: Metadata = {
  title: "Ganesh — Creative Studio",
  description:
    "The creative studio of Viktor Oddy. Build the next wave, the bold way.",
};

export default function StudioPage() {
  return <StudioLanding />;
}
