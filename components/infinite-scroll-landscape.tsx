"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/dist/Draggable";

export default function InfiniteScrollLandscape() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLUListElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const dragProxyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !cardsRef.current) return;

    gsap.registerPlugin(Draggable);

    const cardElements = cardsRef.current.querySelectorAll("li");
    gsap.set(cardElements, { xPercent: 400, opacity: 0, scale: 0 });

    const spacing = 0.1,
      snapTime = gsap.utils.snap(spacing),
      cards = gsap.utils.toArray<Element>(cardElements),
      animateFunc = (element: Element) => {
        const tl = gsap.timeline();
        tl.fromTo(
          element,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            zIndex: 100,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power1.in",
            immediateRender: false,
          }
        ).fromTo(
          element,
          { xPercent: 400 },
          { xPercent: -400, duration: 1, ease: "none", immediateRender: false },
          0
        );
        return tl;
      },
      seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc),
      playhead = { offset: 0 },
      wrapTime = gsap.utils.wrap(0, seamlessLoop.duration()),
      scrub = gsap.to(playhead, {
        offset: 0,
        onUpdate() {
          seamlessLoop.time(wrapTime(playhead.offset));
        },
        duration: 0.5,
        ease: "power3",
        paused: true,
      });

    function animateToOffset(offset: number) {
      const snappedTime = snapTime(offset);
      scrub.vars.offset = snappedTime;
      scrub.invalidate().restart();
    }

    // Button handlers
    const handleNext = () => animateToOffset(scrub.vars.offset + spacing);
    const handlePrev = () => animateToOffset(scrub.vars.offset - spacing);

    if (nextBtnRef.current) {
      nextBtnRef.current.addEventListener("click", handleNext);
    }
    if (prevBtnRef.current) {
      prevBtnRef.current.addEventListener("click", handlePrev);
    }

    // Dragging functionality
    let draggableInstance: { kill?: () => void } | undefined;
    if (dragProxyRef.current && cardsRef.current) {
      draggableInstance = Draggable.create(dragProxyRef.current, {
        type: "x",
        trigger: cardsRef.current,
        onPress() {
          this.startOffset = scrub.vars.offset;
        },
        onDrag() {
          scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001;
          scrub.invalidate().restart();
        },
        onDragEnd() {
          animateToOffset(scrub.vars.offset);
        },
      })[0] as unknown as { kill?: () => void };
    }

    function buildSeamlessLoop(
      items: Element[],
      spacing: number,
      animateFunc: (element: Element) => gsap.core.Timeline
    ) {
      const overlap = Math.ceil(1 / spacing); // number of EXTRA animations on either side of the start/end to accommodate the seamless looping
      const startTime = items.length * spacing + 0.5; // the time on the rawSequence at which we'll start the seamless loop
      const loopTime = (items.length + overlap) * spacing + 1; // the spot at the end where we loop back to the startTime
      const rawSequence = gsap.timeline({ paused: true }); // this is where all the "real" animations live
      const seamlessLoop = gsap.timeline({
        // this merely scrubs the playhead of the rawSequence so that it appears to seamlessly loop
        paused: true,
        repeat: -1, // to accommodate infinite scrolling/looping
        onRepeat() {
          // works around a super rare edge case bug that's fixed GSAP 3.6.1
          this._time === this._dur && (this._tTime += this._dur - 0.01);
        },
      });
      const l = items.length + overlap * 2;
      let time: number, i: number, index: number;

      // now loop through and create all the animations in a staggered fashion. Remember, we must create EXTRA animations at the end to accommodate the seamless looping.
      for (i = 0; i < l; i++) {
        index = i % items.length;
        time = i * spacing;
        rawSequence.add(animateFunc(items[index]), time);
        i <= items.length && seamlessLoop.add("label" + i, time); // we don't really need these, but if you wanted to jump to key spots using labels, here ya go.
      }

      // here's where we set up the scrubbing of the playhead to make it appear seamless.
      rawSequence.time(startTime);
      seamlessLoop
        .to(rawSequence, {
          time: loopTime,
          duration: loopTime - startTime,
          ease: "none",
        })
        .fromTo(
          rawSequence,
          { time: overlap * spacing + 1 },
          {
            time: startTime,
            duration: startTime - (overlap * spacing + 1),
            immediateRender: false,
            ease: "none",
          }
        );
      return seamlessLoop;
    }

    // Cleanup function
    return () => {
      if (draggableInstance) {
        draggableInstance.kill?.();
      }
      if (nextBtnRef.current) {
        nextBtnRef.current.removeEventListener("click", handleNext);
      }
      if (prevBtnRef.current) {
        prevBtnRef.current.removeEventListener("click", handlePrev);
      }
      scrub.kill();
      seamlessLoop.kill();
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full h-[calc(100dvh-100px)] md:h-screen overflow-hidden flex items-center justify-center "
      >
        <ul
          ref={cardsRef}
          className="absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <li className="list-none p-0 m-0 w-[350px] md:w-[700px] h-[200px] md:h-[50vh] text-center text-2xl absolute top-1/2 -translate-y-1/2 left-[20px] md:left-[400px] rounded-[0.8rem] shadow-lg overflow-hidden">
            <img
              src="https://webcomponents.blog/wp-content/uploads/2025/07/Screenshot-2025-07-14-215853-1536x761.webp"
              alt="Portfolio item"
              className="w-full h-full object-fill"
            />
          </li>
          <li className="list-none p-0 m-0 w-[350px] md:w-[700px] aspect-video md:aspect-auto md:h-[50vh] text-center text-2xl absolute top-1/2 -translate-y-1/2 left-[20px] md:left-[400px] rounded-[0.8rem] shadow-lg overflow-hidden">
            <img
              src="https://webcomponents.blog/wp-content/uploads/2025/06/Screenshot-2025-06-15-213134-1536x770.webp"
              alt="Portfolio item"
              className="w-full h-full object-fill"
            />
          </li>
          <li className="list-none p-0 m-0 w-[350px] md:w-[700px] h-[200px] md:h-[50vh] text-center text-2xl absolute top-1/2 -translate-y-1/2 left-[20px] md:left-[400px] rounded-[0.8rem] shadow-lg overflow-hidden">
            <img
              src="https://webcomponents.blog/wp-content/uploads/2025/06/Screenshot-2025-06-12-220344-1536x854.webp"
              alt="Portfolio item"
              className="w-full h-full object-fill"
            />
          </li>
          <li className="list-none p-0 m-0 w-[350px] md:w-[700px] aspect-video md:aspect-auto md:h-[50vh] text-center text-2xl absolute top-1/2 -translate-y-1/2 left-[20px] md:left-[400px] rounded-[0.8rem] shadow-lg overflow-hidden">
            <img
              src="https://webcomponents.blog/wp-content/uploads/2025/06/Screenshot-2025-06-03-205559.webp"
              alt="Portfolio item"
              className="w-full h-full object-fill"
            />
          </li>
          <li className="list-none p-0 m-0 w-[350px] md:w-[700px] h-[200px] md:h-[50vh] text-center text-2xl absolute top-1/2 -translate-y-1/2 left-[20px] md:left-[400px] rounded-[0.8rem] shadow-lg overflow-hidden">
            <img
              src="https://webcomponents.blog/wp-content/uploads/2025/06/Responsive-Chatbot-window-with-clean-uiux.webp"
              alt="Portfolio item"
              className="w-full h-full object-fill"
            />
          </li>
          <li className="list-none p-0 m-0 w-[350px] md:w-[700px] aspect-video md:aspect-auto md:h-[50vh] text-center text-2xl absolute top-1/2 -translate-y-1/2 left-[20px] md:left-[400px] rounded-[0.8rem] shadow-lg overflow-hidden">
            <img
              src="/webImages/luxhospitals.png"
              alt="Portfolio item"
              className="w-full h-full object-fill"
            />
          </li>
          <li className="list-none p-0 m-0 w-[350px] md:w-[700px] h-[200px] md:h-[50vh] text-center text-2xl absolute top-1/2 -translate-y-1/2 left-[20px] md:left-[400px] rounded-[0.8rem] shadow-lg overflow-hidden">
            <img
              src="https://webcomponents.blog/wp-content/uploads/2025/09/Web-Documentation-React-Template.webp"
              alt="Portfolio item"
              className="w-full h-full object-fill"
            />
          </li>
          <li className="list-none p-0 m-0 w-[350px] md:w-[700px] aspect-video md:aspect-auto md:h-[50vh] text-center text-2xl absolute top-1/2 -translate-y-1/2 left-[20px] md:left-[400px] rounded-[0.8rem] shadow-lg overflow-hidden">
            <img
              src="https://webcomponents.blog/wp-content/uploads/2025/06/dashboard-template.webp"
              alt="Portfolio item"
              className="w-full h-full object-fill"
            />
          </li>
          <li className="list-none p-0 m-0 w-[350px] md:w-[700px] h-[200px] md:h-[50vh] text-center text-2xl absolute top-1/2 -translate-y-1/2 left-[20px] md:left-[400px] rounded-[0.8rem] shadow-lg overflow-hidden">
            <img
              src="https://webcomponents.blog/wp-content/uploads/2025/07/Download-This-Free-PersonalGPT-Chat-UI-%E2%80%93-Open-Source-Next.js-Template.webp"
              alt="Portfolio item"
              className="w-full h-full object-fill"
            />
          </li>
          <li className="list-none p-0 m-0 w-[350px] md:w-[700px] aspect-video md:aspect-auto md:h-[50vh] text-center text-2xl absolute top-1/2 -translate-y-1/2 left-[20px] md:left-[400px] rounded-[0.8rem] shadow-lg overflow-hidden">
            <img
              src="https://webcomponents.blog/wp-content/uploads/2025/07/Screenshot-2025-07-01-165146.webp"
              alt="Portfolio item"
              className="w-full h-full object-fill"
            />
          </li>
          <li className="list-none p-0 m-0 w-[350px] md:w-[700px] h-[200px] md:h-[50vh] text-center text-2xl absolute top-1/2 -translate-y-1/2 left-[20px] md:left-[400px] rounded-[0.8rem] shadow-lg overflow-hidden">
            <img
              src="/webImages/bluehero.png"
              alt="Portfolio item"
              className="w-full h-full object-fill"
            />
          </li>
          <li className="list-none p-0 m-0 w-[350px] md:w-[700px] aspect-video md:aspect-auto md:h-[50vh] text-center text-2xl absolute top-1/2 -translate-y-1/2 left-[20px] md:left-[400px] rounded-[0.8rem] shadow-lg overflow-hidden">
            <img
              src="https://webcomponents.blog/wp-content/uploads/2025/03/design-agency-hero-section.webp"
              alt="Portfolio item"
              className="w-full h-full object-fill"
            />
          </li>
          <li className="list-none p-0 m-0 w-[350px] md:w-[700px] h-[200px] md:h-[50vh] text-center text-2xl absolute top-1/2 -translate-y-1/2 left-[20px] md:left-[400px] rounded-[0.8rem] shadow-lg overflow-hidden">
            <img
              src="https://webcomponents.blog/wp-content/uploads/2025/03/sales-landing-page-poster.webp"
              alt="Portfolio item"
              className="w-full h-full object-fill"
            />
          </li>
          <li className="list-none p-0 m-0 w-[350px] md:w-[700px] aspect-video md:aspect-auto md:h-[50vh] text-center text-2xl absolute top-1/2 -translate-y-1/2 left-[20px] md:left-[400px] rounded-[0.8rem] shadow-lg overflow-hidden">
            <img
              src="https://webcomponents.blog/wp-content/uploads/2025/03/sales-landing-page-poster.webp"
              alt="Portfolio item"
              className="w-full h-full object-fill"
            />
          </li>
           <li className="list-none p-0 m-0 w-[350px] md:w-[700px] aspect-video md:aspect-auto md:h-[50vh] text-center text-2xl absolute top-1/2 -translate-y-1/2 left-[20px] md:left-[400px] rounded-[0.8rem] shadow-lg overflow-hidden">
            <img
              src="/webImages/cryptositeOne.png"
              alt="Portfolio item"
              className="w-full h-full object-fill"
            />
          </li>
          <li className="list-none p-0 m-0 w-[350px] md:w-[700px] aspect-video md:aspect-auto md:h-[50vh] text-center text-2xl absolute top-1/2 -translate-y-1/2 left-[20px] md:left-[400px] rounded-[0.8rem] shadow-lg overflow-hidden">
            <img
              src="/webImages/CRYPTOSITETWO.png"
              alt="Portfolio item"
              className="w-full h-full object-fill"
            />
          </li>
        </ul>
        <div className="absolute bottom-[25px] left-1/2 -translate-x-1/2 flex items-center justify-center gap-6">
          <button
            ref={prevBtnRef}
            className="group w-12 h-12 rounded-full bg-white  border border-gray-100 hover:bg-gray-100 flex items-center justify-center  transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Previous"
          >
            <svg
              className="w-5 h-5 text-black transition-transform group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            ref={nextBtnRef}
            className="group w-12 h-12 rounded-full bg-white  border border-gray-100 hover:bg-gray-200 flex items-center justify-center  transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Next"
          >
            <svg
              className="w-5 h-5 text-black transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
      <div ref={dragProxyRef} className="invisible absolute"></div>
    </>
  );
}
