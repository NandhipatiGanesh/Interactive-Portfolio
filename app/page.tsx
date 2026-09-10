import type { Metadata } from "next";
import { StudioLanding } from "@/components/studio/StudioLanding";

export const metadata: Metadata = {
  title: "Ganesh Kumar Nandhipati",
  description:
    "Ganesh Kumar Nandhipati — UI/UX, frontend and React Native developer. Websites, dashboards and mobile apps, built end to end.",
};

export default function HomePage() {
  return <StudioLanding />;
}
