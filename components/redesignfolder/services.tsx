"use client";
// file is in components/redesignfolder/services.tsx

const SERVICES: { title: string; image: string }[] = [
  { title: "Web Design", image: "/servicesimages/Web%20Design.png" },
  { title: "Mobile App Design", image: "/servicesimages/Mobile%20App%20Design.png" },
  { title: "Custom Dashboard", image: "/servicesimages/Custom%20Dashboard.png" },
  { title: "CMS Development", image: "/servicesimages/CMS%20Development.png" },
  { title: "Mobile Features", image: "/servicesimages/mobile%20features.png" },
  {
    title: "Web & Mobile App Maintenance",
    image: "/servicesimages/Web%20and%20Mobile%20App%20Maintaince.png",
  },
];

export default function Services() {
  return (
    <div className="mx-auto w-full max-w-[920px] px-4 pt-6 pb-12 sm:px-6">
      <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
        How Can I Help?
      </h2>
      <p className="mt-3 text-center text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
        Let&apos;s turn your vision into something amazing.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {SERVICES.map((service) => (
          <article
            key={service.title}
            className="group rounded-3xl bg-white p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.12)] transition-shadow hover:shadow-[0_15px_50px_-15px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
          >
            <div className="flex h-44 items-center justify-start pl-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.image}
                alt={service.title}
                className="h-40 w-auto object-contain transition-transform duration-500 group-hover:scale-105 rounded-xl rotate-[-2deg] hover:rotate-0 duration-300 transition-transform"
              />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {service.title}
            </h3>
          </article>
        ))}
      </div>
    </div>
  );
}
