import type { Metadata } from "next";
import { StudioLanding } from "@/components/studio/StudioLanding";
import "./studio.css";

export const metadata: Metadata = {
  title: "Ganesh — Creative Studio",
  description:
    "Ganesh Kumar Nandhipati — frontend and React Native developer. Websites, dashboards and mobile apps, built end to end.",
};

export default function StudioPage() {
  return <StudioLanding />;
}
