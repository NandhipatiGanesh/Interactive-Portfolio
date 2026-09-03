"use client";

import { useCallback, useRef } from "react";
import { LinkButton } from "./Button";
import { BOOK_URL, CTA_AVATAR, MARQUEE_IMAGES } from "./constants";

interface TrailImage {
  id: number;
  src: string;
  x: number;
  y: number;
  rotation: number;
}

export function PartnerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<TrailImage[]>([]);
  const idCounter = useRef(0);
  const lastSpawn = useRef(0);

  const renderTrail = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    let trailLayer = container.querySelector<HTMLDivElement>(".trail-layer");
    if (!trailLayer) {
      trailLayer = document.createElement("div");
      trailLayer.className =
        "trail-layer pointer-events-none absolute inset-0 overflow-hidden";
      container.appendChild(trailLayer);
    }

    trailLayer.innerHTML = trailRef.current
      .map(
        (img) =>
          `<img src="${img.src}" alt="" class="trail-img absolute h-24 w-32 rounded-xl object-cover shadow-lg md:h-32 md:w-44" style="left:${img.x}px;top:${img.y}px;transform:translate(-50%,-50%) rotate(${img.rotation}deg);animation:trailFade 1000ms ease-out forwards;" />`,
      )
      .join("");
  }, []);

  const spawnImage = useCallback(
    (x: number, y: number) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const relativeX = x - rect.left;
      const relativeY = y - rect.top;
      const id = idCounter.current++;

      const img: TrailImage = {
        id,
        src: MARQUEE_IMAGES[Math.floor(Math.random() * MARQUEE_IMAGES.length)],
        x: relativeX,
        y: relativeY,
        rotation: Math.random() * 20 - 10,
      };

      trailRef.current.push(img);
      renderTrail();

      setTimeout(() => {
        trailRef.current = trailRef.current.filter((t) => t.id !== id);
        renderTrail();
      }, 1000);
    },
    [renderTrail],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const now = Date.now();
      if (now - lastSpawn.current < 80) return;
      lastSpawn.current = now;
      spawnImage(e.clientX, e.clientY);
    },
    [spawnImage],
  );

  const handleMouseMoveWithCleanup = useCallback(
    (e: React.MouseEvent) => {
      handleMouseMove(e);
    },
    [handleMouseMove],
  );

  return (
    <section className="w-full px-6 py-12">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMoveWithCleanup}
        className="relative mx-auto flex max-w-7xl flex-col items-center overflow-hidden rounded-[40px] bg-white py-48 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
      >
        <h2 className="relative z-10 mb-12 text-center font-serif-accent text-[48px] leading-[1.1] tracking-tight text-[#0D212C] md:text-[64px] lg:text-[80px]">
          Partner with us
        </h2>
        <LinkButton
          href={BOOK_URL}
          className="relative z-10 gap-3 !px-5"
        >
          <img
            src={CTA_AVATAR}
            alt="Viktor"
            className="h-10 w-10 rounded-full object-cover"
          />
          Start chat with Viktor
        </LinkButton>
      </div>
    </section>
  );
}
