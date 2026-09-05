import {
  DASHBOARD_IMAGES,
  MOBILE_IMAGES,
  WEBSITE_IMAGES,
} from "@/lib/portfolio-images";

// Landscape screenshots that read well at marquee height.
export const MARQUEE_IMAGES = [
  "/webImages/luxhospitalsdesktop.png",
  "/landscape/hero.png",
  "/webImages/praanavaidyalanding.png",
  "/mysterybox/hero.png",
  "/worklance/home-hero.png",
  "/pathlete/hero.png",
  "/healthcare-landing/hero-section.png",
  "/webImages/cryptositeOne.png",
  "/webImages/Gutcare.png",
  "/dashboard-template.webp",
  "/webImages/chiraglandingpage.png",
  "/landscape/fourth.png",
];

export const TESTIMONIALS = [
  {
    name: "Marcus Anderson",
    role: "CEO",
    company: "Data.storage",
    quote:
      "With very little guidance team delivered designs that were consistently spot on. Every iteration felt intentional and aligned with our vision.",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
  },
  {
    name: "alexwu",
    role: "Founder",
    company: "Nexgate",
    quote:
      "Viktor led the creation of our best fundraising deck to date! The storytelling and visual polish helped us close our Series A.",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
  },
  {
    name: "James Mitchell",
    role: "VP Product",
    company: "LaunchPad",
    quote:
      "Working with Viktor transformed our product vision. The design system he built scaled beautifully across our entire platform.",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
  },
  {
    name: "Rachel Foster",
    role: "Co-founder",
    company: "Nexus Labs",
    quote:
      "The design quality exceeded our expectations. Every detail was considered, from micro-interactions to the overall brand narrative.",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
  },
  {
    name: "David Zhang",
    role: "Head of Design",
    company: "Paradigm Labs",
    quote:
      "Incredible work from start to finish. Viktor brings a rare combination of strategic thinking and exceptional craft to every project.",
    avatar:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
  },
];

export const PROJECTS = [
  {
    name: "Websites",
    description:
      "Marketing sites, landing pages and full builds shipped with Next.js, WordPress and Elementor.",
    images: WEBSITE_IMAGES,
    variant: "wide" as const,
  },
  {
    name: "Dashboards",
    description: "Data-dense product interfaces, admin panels and chat tooling.",
    images: DASHBOARD_IMAGES,
    variant: "wide" as const,
  },
  {
    name: "Mobile Apps",
    description: "React Native screens and responsive mobile views.",
    images: MOBILE_IMAGES,
    variant: "phone" as const,
  },
];

export const BOOK_URL = "https://ganeshnandhipati.com/book";

export const PARALLAX_IMAGE =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260330_103804_7aa5494f-4d5b-432e-9dc7-20715275f143.png&w=1280&q=85";

export const CTA_AVATAR =
  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop";
