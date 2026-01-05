"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/all";

interface FlipCarouselProps {
  else?: string;
  els?: string;
}

gsap.registerPlugin(Flip);

export default function FlipCarousel(props: FlipCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const nextBtn = nextBtnRef.current;
    const prevBtn = prevBtnRef.current;

    if (!container || !nextBtn || !prevBtn) return;

    const updateCaterpillar = (forward: boolean) => {
      const cards = gsap.utils.toArray<HTMLImageElement>("img", container);
      const first = cards[0];
      const last = cards[cards.length - 1];
      const state = Flip.getState(cards);
      const newCard = document.createElement("img");
      gsap.set(newCard, { scale: 0, opacity: 0 });
      newCard.className = "w-[20vw] relative";

      if (forward) {
        newCard.src = first.src;
        container.append(newCard);
        first.classList.add("hidden");
      } else {
        newCard.src = last.src;
        container.prepend(newCard);
        last.classList.add("hidden");
      }

      Flip.from(state, {
        targets: "img",
        fade: true,
        absoluteOnLeave: true,
        onEnter: (els: Element | Element[]) => {
          gsap.to(els, {
            opacity: 1,
            scale: 1,
            transformOrigin: forward ? "bottom right" : "bottom left",
          });
        },
        onLeave: (els: Element | Element[]) => {
          gsap.to(els, {
            opacity: 0,
            scale: 0,
            transformOrigin: forward ? "bottom left" : "bottom right",
            onComplete: () => {
              if (Array.isArray(els)) {
                els[0]?.remove();
              } else {
                els.remove?.();
              }
              isAnimatingRef.current = false;
            },
          });
        },
      });
    };

    const handleNext = () => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      updateCaterpillar(true);
    };

    const handlePrev = () => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      updateCaterpillar(false);
    };

    nextBtn.addEventListener("click", handleNext);
    prevBtn.addEventListener("click", handlePrev);

    return () => {
      nextBtn.removeEventListener("click", handleNext);
      prevBtn.removeEventListener("click", handlePrev);
    };
  }, []);

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center overflow-hidden">
        <div
          ref={containerRef}
          className="flex p-[5px] gap-[5px] border-2 border-dashed border-gray-300 rounded-[10px]"
        >
          <img
            src="https://assets.codepen.io/16327/portrait-number-1.png"
            alt=""
            className="w-[20vw] relative"
          />
          <img
            src="https://assets.codepen.io/16327/portrait-number-2.png"
            alt=""
            className="w-[20vw] relative"
          />
          <img
            src="https://assets.codepen.io/16327/portrait-number-3.png"
            alt=""
            className="w-[20vw] relative"
          />
          <img
            src="https://assets.codepen.io/16327/portrait-number-4.png"
            alt=""
            className="w-[20vw] relative"
          />
        </div>
        <div className="mt-5 flex gap-5">
          <button
            ref={prevBtnRef}
            id="prev"
            className="bg-white border-2 border-gray-100 px-4 py-2 rounded-full"
          >
            Previous
          </button>
          <button
            ref={nextBtnRef}
            id="next"
            className="bg-white border-2 border-gray-100 px-4 py-2 rounded-full"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
