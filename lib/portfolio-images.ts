// Shared source of truth for the portfolio screenshots.
// Consumed by the /redesign page and the studio landing page (main page).

export const DASHBOARD_IMAGES = [
  "/dashboard-template.webp",
  "/chatbot.png",
  "/dashboards/docs.png",
];

const MOBILE_APP_FILES = [
  "WhatsApp Image 2026-06-08 at 4.25.07 AM.jpeg",
  "WhatsApp Image 2026-06-08 at 4.25.07 AM (1).jpeg",
  "WhatsApp Image 2026-06-08 at 4.25.07 AM (2).jpeg",
  "WhatsApp Image 2026-06-08 at 4.25.07 AM (3).jpeg",
  "WhatsApp Image 2026-06-08 at 4.25.07 AM (4).jpeg",
  "WhatsApp Image 2026-06-08 at 4.25.07 AM (5).jpeg",
  "WhatsApp Image 2026-06-08 at 4.25.08 AM.jpeg",
  "WhatsApp Image 2026-06-08 at 4.25.08 AM (1).jpeg",
  "WhatsApp Image 2026-06-08 at 4.25.08 AM (2).jpeg",
  "WhatsApp Image 2026-06-08 at 4.25.08 AM (3).jpeg",
  "WhatsApp Image 2026-06-08 at 4.25.08 AM (4).jpeg",
  "WhatsApp Image 2026-06-08 at 4.25.09 AM.jpeg",
  "WhatsApp Image 2026-06-08 at 4.25.10 AM.jpeg",
  "WhatsApp Image 2026-06-08 at 4.25.10 AM (1).jpeg",
  "WhatsApp Video 2026-06-08 at 4.25.26 AM.mp4",
  "WhatsApp Video 2026-06-08 at 4.25.30 AM.mp4",
];

export const MOBILE_IMAGES = [
  ...MOBILE_APP_FILES.map((f) => `/mobile-apps/${encodeURI(f)}`),
  // "/mobileviewimages/landingpraanavaidya.png",
  // "/mobileviewimages/luxhospitals.png",
  // "/mobileviewimages/gutcaremobileview.png",
  // "/mobileviewimages/advaithealthmobile.png",
  // "/mobileviewimages/chiragmobile.png",
  // "/mobileviewimages/cryptositemobileOne.png",
  // "/mobileviewimages/cryptositemobiletwo.png",
  // "/mobileviewimages/praanavaidyamobileview.png",
  // "/mobileviewimages/revviewsmobile.png",
  // "/mobileviewimages/webcomponents.png",
  // "/mobileviewimages/somediscussions.png",
  // "/mobileviewimages/footermobile.png",
];

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov"];
export const isVideo = (src: string) =>
  VIDEO_EXTENSIONS.some((ext) => src.toLowerCase().includes(ext));

export const WEBSITE_IMAGES = [
  "/webImages/Crypto Elementor Template Design One.png",

  "/mysterybox/hero.png",
  "/worklance/home-hero.png",
  "/worklance/singin.png",
  "/pathlete/hero.png",
  "/healthcare-landing/hero-section.png",
  "/health/Screenshot%202026-02-23%20165010.png",
  "/landscape/hero.png",
  "/websiteshoverimage.png",
  "/webImages/luxhospitalsdesktop.png",
  "/webImages/Gutcare.png",
  "/webImages/avira.png",
  "/webImages/bluehero.png",
  "/webImages/chiraglandingpage.png",
  "/webImages/cryptositeOne.png",
  "/webImages/CRYPTOSITETWO.png",
  "/webImages/healthadvait.png",
  "/webImages/praanavaidya.png",
  "/webImages/praanavaidyalanding.png",
  "/webImages/reviewfeedback.png",
  "/webImages/webcomponentsdesktop.png",
  "/webImages/luxhospitals.png",
 
  "/webImages/image.png",
  "/hero.png",
  "/rondom.png",

  "/random-hero.png",
  "https://laatui.com/_next/image?url=https%3A%2F%2Fwebcomponents.blog%2Fwp-content%2Fuploads%2F2025%2F07%2FScreenshot-2025-07-14-215853.webp&w=640&q=75",
  "https://laatui.com/_next/image?url=https%3A%2F%2Fwebcomponents.blog%2Fwp-content%2Fuploads%2F2025%2F06%2FResponsive-Chatbot-window-with-clean-uiux-big-Poster.webp&w=640&q=75",
  "https://laatui.com/_next/image?url=https%3A%2F%2Fwebcomponents.blog%2Fwp-content%2Fuploads%2F2025%2F06%2FScreenshot-2025-06-15-213134.webp&w=640&q=75",
  "https://laatui.com/_next/image?url=https%3A%2F%2Fwebcomponents.blog%2Fwp-content%2Fuploads%2F2025%2F06%2FScreenshot-2025-06-12-220344.webp&w=640&q=75",
];
