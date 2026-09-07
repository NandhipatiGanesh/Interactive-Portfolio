import {
  DASHBOARD_IMAGES,
  MOBILE_IMAGES,
  WEBSITE_IMAGES,
} from "@/lib/portfolio-images";

// Landscape screenshots that read well at marquee height.
export const MARQUEE_IMAGES = [
  // "/webImages/luxhospitalsdesktop.png",
  "/landscape/hero.png",
  // "/webImages/praanavaidyalanding.png",
  "/mysterybox/hero.png",
  "/worklance/home-hero.png",
  "/pathlete/hero.png",
  // "/healthcare-landing/hero-section.png",
  "/webImages/cryptositeOne.png",
  // "/webImages/Gutcare.png",
  "/dashboard-template.webp",
  // "/webImages/chiraglandingpage.png",
  "/landscape/fourth.png",
];

// PLACEHOLDER testimonials. The projects and companies are real, but the
// people, their portraits and their words are invented — replace with real
// client quotes (and get sign-off) before this goes anywhere public.
export const TESTIMONIALS = [
  {
    name: "Rajesh",
    role: "Director",
    company: "LUX Hospitals",
    quote:
      "Our site had to feel calm and be simple for patients to navigate. Ganesh built the desktop and mobile layouts, and pages now open quickly even on a weak connection.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Chethan",
    role: "Founder",
    company: "Praanavaidya",
    quote:
      "He took our wellness brand from a rough brief to a finished site, desktop and mobile, and set up analytics so we can see which pages people actually read.",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    name: "Rahul Nair",
    role: "Product Manager",
    company: "Worklance",
    quote:
      "Ganesh built the whole flow with us: sign-in, OTP, the jobs dashboard, pricing and payments. It is pleasant to use, and support barely gets questions about it.",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Dr. Yuvaraj",
    role: "Clinical Lead",
    company: "GutCare",
    quote:
      "Steady progress every single week and no chasing needed. The booking pages and the mobile views came back exactly as we had described them.",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
  },
  {
    name: "James Whitfield",
    role: "Co-founder",
    company: "Pathlete",
    quote:
      "We wanted a landing page that felt premium and we wanted it quickly. He turned the design and the build around fast, and it has held up ever since.",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Jeff",
    role: "Editor",
    company: "WebComponents",
    quote:
      "He rebuilt our theme and cleared out performance problems we had lived with for a year. Our page speed scores went from red to green.",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
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

export const CTA_AVATAR = "/profileimage.png";
