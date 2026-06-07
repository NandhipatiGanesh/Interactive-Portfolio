"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import RedesignFooter from "@/components/redesignfolder/redesignfooter";
import FloatingNav from "@/components/redesignfolder/floatingnav";
import WorkExperience from "@/components/redesignfolder/workexperience";
import Services from "@/components/redesignfolder/services";

const EASE = [0.22, 1, 0.36, 1] as const;
const PHOTO_SRC = "/striped_tshirthandsclosepose-removebg-preview.png";

const DASHBOARD_IMAGES = [
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

const MOBILE_IMAGES = [
  ...MOBILE_APP_FILES.map((f) => `/mobile-apps/${encodeURI(f)}`),
  "/mobileviewimages/landingpraanavaidya.png",
  "/mobileviewimages/luxhospitals.png",
  "/mobileviewimages/gutcaremobileview.png",
  "/mobileviewimages/advaithealthmobile.png",
  "/mobileviewimages/chiragmobile.png",
  "/mobileviewimages/cryptositemobileOne.png",
  "/mobileviewimages/cryptositemobiletwo.png",
  "/mobileviewimages/praanavaidyamobileview.png",
  "/mobileviewimages/revviewsmobile.png",
  "/mobileviewimages/webcomponents.png",
  "/mobileviewimages/somediscussions.png",
  "/mobileviewimages/footermobile.png",
];

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov"];
const isVideo = (src: string) =>
  VIDEO_EXTENSIONS.some((ext) => src.toLowerCase().includes(ext));

const WEBSITE_IMAGES = [
  "/mysterybox/hero.png",
  "/mysterybox/second.png",
  "/mysterybox/third.png",
  "/mysterybox/fourth.png",
  "/mysterybox/fifth.png",
  "/mysterybox/sixth.png",
  "/mysterybox/seventh.png",
  "/mysterybox/eight.png",
  "/mysterybox/nine.png",
  "/mysterybox/10th.png",
  "/worklance/home-hero.png",
  "/worklance/singin.png",
  "/worklance/otppage.png",
  "/worklance/dashboardjobs.png",
  "/worklance/single-job.png",
  "/worklance/pricingpage.png",
  "/worklance/payment-page.png",
  "/pathlete/hero.png",
  "/pathlete/second.png",
  "/pathlete/third.png",
  "/pathlete/fourth.png",
  "/pathlete/fifth-contact.png",
  "/healthcare-landing/hero-section.png",
  "/healthcare-landing/second-section.png",
  "/healthcare-landing/third-section.png",
  "/healthcare-landing/Fourth-section.png",
  "/healthcare-landing/fifth-section.png",
  "/healthcare-landing/sixth-section.png",
  "/healthcare-landing/seventh-section.png",
  "/healthcare-landing/eigth-section.png",
  "/healthcare-landing/ninth-section.png",
  "/healthcare-landing/10th-section.png",
  "/health/Screenshot%202026-02-23%20165010.png",
  "/elementor-templates/hero-section.png",
  "/elementor-templates/why-choose.png",
  "/elementor-templates/trust.png",
  "/elementor-templates/belive.png",
  "/landscape/hero.png",
  "/landscape/second.png",
  "/landscape/third.png",
  "/landscape/fourth.png",
  "/landscape/fifth.png",
  "/landscape/sixth.png",
  "/landscape/seventh.png",
  "/landscape/eight.png",
  "/landscape/nine.png",
  "/landscape/10th.png",
  "/landscape/eleven.png",
  "/landscape/poup.png",
  "/landscape/image.png",
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
  "/webImages/footer.png",
  "/webImages/image.png",
  "/hero.png",
  "/rondom.png",
  "/footers.png",
  "/random-hero.png",
];

/* ------------------------------------------------------------------ */
/*  Edit your details here                                            */
/* ------------------------------------------------------------------ */
const PROFILE = {
  name: "Ganesh Kumar",
  title: "Frontend & React Native Developer.",
  tagline: "Crafting polished websites, dashboards, and mobile apps.",
  more: "4 years of experience shipping web and mobile products, with 3 years leading frontend teams. Built with React.js, Next.js, React Native, WordPress, TypeScript, GSAP, and Framer Motion. Currently in the UK and open to freelance or full-time work.",
  tabs: [
    { key: "websites", label: "Websites" },
    { key: "dashboards", label: "Dashboards" },
    { key: "mobile-apps", label: "Mobile Apps" },
    { key: "experience", label: "Experience" },
    { key: "services", label: "Services" },
  ] as const,
  social: [
    { label: "Email", href: "mailto:hello@ganeshkumar.dev" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
};

type TabKey = (typeof PROFILE.tabs)[number]["key"];

export default function RedesignPage() {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("websites");

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#f4f4f3] text-neutral-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="relative mx-auto flex min-h-screen max-w-[1700px] flex-col gap-16 px-7 py-24 sm:px-10 lg:grid lg:grid-cols-[minmax(260px,1fr)_2.2fr] lg:items-center lg:gap-8 lg:px-12 lg:py-0">
        {/* ----------------------------- Left ----------------------------- */}
        {/* self-start + fixed mt anchors the section's top at a fixed Y,
            so the name stays put no matter how the content below changes. */}
        <section className="relative z-40 lg:max-w-md lg:self-start lg:mt-[14vh]">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-[2.1rem]">
            {PROFILE.name}
          </h1>

          <p className="mt-3 text-2xl font-medium leading-snug text-neutral-700 dark:text-neutral-300 sm:text-[1.7rem]">
            {expanded ? (
              PROFILE.title
            ) : (
              <>
                {PROFILE.title}
                <br />
                {PROFILE.tagline}
              </>
            )}
          </p>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="bio"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="overflow-hidden"
              >
                <p className="mt-2 text-xl font-medium leading-snug text-neutral-700 dark:text-neutral-300 sm:text-[1.35rem]">
                  {PROFILE.tagline} {PROFILE.more}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-6 inline-flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-200"
            aria-expanded={expanded}
          >
            {expanded ? "Close" : "More"}
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-300",
                expanded && "rotate-180",
              )}
            />
          </button>

          <AnimatePresence initial={false}>
            {!expanded && (
              <motion.nav
                key="projects"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className={cn(
                  // Mobile: floating pill at the bottom of the viewport.
                  "fixed bottom-3 left-1/2 z-50 -translate-x-1/2",
                  "max-w-[calc(100vw-1.5rem)] overflow-x-auto hide-scrollbar",
                  "flex flex-row gap-1 rounded-full bg-white/80 p-1.5 backdrop-blur",
                  "shadow-[0_10px_40px_-15px_rgba(0,0,0,0.25)] dark:bg-white/10",
                  // md+: inline vertical list under the "More" button, no pill chrome.
                  "md:static md:mt-9 md:max-w-none md:translate-x-0 md:overflow-visible",
                  "md:flex-col md:rounded-none md:bg-transparent md:p-0",
                  "md:shadow-none md:backdrop-blur-none dark:md:bg-transparent",
                )}
              >
                {PROFILE.tabs.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setActiveTab(t.key)}
                    aria-pressed={activeTab === t.key}
                    className={cn(
                      // Mobile: small pill button.
                      "whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs transition-colors duration-300",
                      // md+: inline tab link with hover-indent.
                      "md:max-w-[260px] md:rounded-2xl md:px-0 md:py-2.5 md:pr-4 md:text-left md:text-sm md:transition-[color,padding] md:hover:pl-4",
                      activeTab === t.key
                        ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 md:glass-bg md:bg-white md:pl-4 md:text-neutral-900 dark:md:bg-transparent dark:md:text-neutral-100"
                        : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100",
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </section>

        {/* ----------------------------- Right ---------------------------- */}
        {/* Full-size project image — swapped by active tab. */}
        <section className="relative flex w-full items-center justify-center lg:justify-end">
          <AnimatePresence initial={false}>
            {!expanded && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="w-full max-w-[1100px]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    {activeTab === "websites" && (
                      <div className="flex h-screen overflow-y-auto mt-16 flex-col gap-5 pr-2 hide-scrollbar">
                        {WEBSITE_IMAGES.map((src, i) => (
                          <div
                            key={src}
                            className="glass-bg rounded-3xl p-3 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.25)] sm:p-4"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={src}
                              alt={`Website project ${i + 1}`}
                              className="h-auto w-full rounded-2xl"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    {activeTab === "dashboards" && (
                      <div className="flex h-screen overflow-y-auto mt-16 flex-col gap-5 pr-2 hide-scrollbar">
                        {DASHBOARD_IMAGES.map((src, i) => (
                          <div
                            key={src}
                            className="glass-bg rounded-3xl p-3 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.25)] sm:p-4"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={src}
                              alt={`Dashboard project ${i + 1}`}
                              className="h-auto w-full rounded-2xl"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    {activeTab === "mobile-apps" && (
                      <div className="flex h-screen overflow-y-auto mt-16 flex-col items-center gap-5 pr-2 hide-scrollbar">
                        {MOBILE_IMAGES.map((src, i) => (
                          <div
                            key={src}
                            className="glass-bg w-full max-w-[340px] rounded-3xl p-3 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.25)] sm:p-4"
                          >
                            {isVideo(src) ? (
                              <video
                                src={src}
                                className="h-auto w-full rounded-2xl"
                                controls
                                playsInline
                                preload="metadata"
                              />
                            ) : (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={src}
                                alt={`Mobile app project ${i + 1}`}
                                className="h-auto w-full rounded-2xl"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {activeTab === "experience" && <WorkExperience />}
                    {activeTab === "services" && <Services />}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Background portrait — always mounted (so the image is preloaded on
            page render and never flickers on first expand). Animated via state,
            not AnimatePresence. pointer-events-none keeps it click-through. */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{
            y: expanded ? 0 : -120,
            opacity: expanded ? 1 : 0,
          }}
          transition={{ duration: 0.75, ease: EASE }}
          style={{
            backgroundImage: `url(${PHOTO_SRC})`,
            willChange: "transform, opacity",
          }}
          className="pointer-events-none absolute md:left-[280px] inset-0 select-none md:bg-[length:auto_88vh] bg-[length:60%_auto] bg-bottom bg-no-repeat"
        />
      </div>

      <RedesignFooter />
      <FloatingNav />
    </main>
  );
}
