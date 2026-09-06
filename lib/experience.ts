// Shared work history. Consumed by the /redesign Experience tab and the
// studio landing page (main page). Newest first.

export interface Role {
  period: string;
  /** Prefix that reads into `company`, e.g. "Frontend Developer at". */
  role: string;
  company: string;
  href: string;
  points?: string[];
}

export const EXPERIENCE: Role[] = [
  {
    period: "2026 — Present",
    role: "MSc in Artificial Intelligence,",
    company: "UK",
    href: "#",
    points: [
      "Currently based in the UK and open to freelance opportunities and technical internships.",
    ],
  },
  {
    period: "2023 — 2026",
    role: "Web Developer at",
    company: "Advait Technology Labs",
    href: "#",
    points: [
      "Built and shipped client websites end to end, working with stakeholders from brief through to launch and handover.",
      "Handled server maintenance and management — deployments, hosting and domain configuration, DNS connections, backups and uptime.",
      "Integrated third-party and in-house APIs into client sites and web applications.",
      "Maintained and extended live client projects, covering fixes, feature work and ongoing support.",
    ],
  },
  {
    period: "May 2022 — 2026",
    role: "Freelance Web & Mobile Developer,",
    company: "Remote",
    href: "#",
    points: [
      "Delivered complete website projects for clients across multiple sectors, from requirements gathering and wireframing through to build, launch and ongoing support.",
      "Built and customised WordPress themes and plugins in PHP, converting design concepts into responsive, cross-browser page templates.",
      "Developed and maintained WooCommerce storefronts, covering product and checkout configuration, payment and delivery setup, and purchase-event tracking.",
      "Created front-end interfaces with React.js, Next.js and Tailwind CSS using reusable components for consistency across pages.",
      "Shipped mobile apps and web application dashboards alongside marketing sites, reusing a shared component layer across both.",
      "Optimised images, scripts, caching and hosting to improve PageSpeed and Core Web Vitals scores and reduce load times.",
      "Implemented on-page and technical SEO — metadata, schema markup, sitemaps, redirects and internal linking — to strengthen organic visibility.",
      "Configured Google Tag Manager, Google Analytics 4 and Microsoft Clarity to track conversions, then applied the findings to layout and content decisions.",
      "Automated builds and releases with GitHub Actions (CI/CD), removing manual upload steps and reducing deployment errors.",
    ],
  },
];
