"use client";

import { MARQUEE_IMAGES } from "./constants";

export function Marquee() {
  const images = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];

  return (
    <section className="mt-16 mb-16 w-full overflow-hidden md:mt-20">
      <div className="flex w-max animate-marquee">
        {images.map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt=""
            className="mx-3 h-[280px] w-auto rounded-2xl object-cover shadow-lg md:h-[500px]"
          />
        ))}
      </div>
    </section>
  );
}
