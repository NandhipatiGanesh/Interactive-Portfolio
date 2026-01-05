"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ZeroExpansion() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const expandedMenuRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const expandedMenu = expandedMenuRef.current;

    if (!trigger || !expandedMenu) return;

    // Create timeline
    const tl = gsap
      .timeline({ paused: true })
      .to(expandedMenu, {
        duration: 1.2,
        delay: 0.1,
        height: "auto",
        ease: "power4.out",
      })
      .to(
        "#sub-menu img",
        {
          duration: 1,
          opacity: 1,
          ease: "power4.inOut",
          stagger: 0.05,
        },
        0.3
      )
      .reverse();

    timelineRef.current = tl;

    const handleClick = () => {
      tl.reversed(!tl.reversed());
    };

    trigger.addEventListener("click", handleClick);

    return () => {
      trigger.removeEventListener("click", handleClick);
      tl.kill();
    };
  }, []);

  return (
    <>
      <nav className="h-[55px] pl-6 flex items-center">
        <div
          ref={triggerRef}
          id="menu-trigger"
          className="hover:cursor-pointer"
        >
          Explore
        </div>
      </nav>
      <div
        ref={expandedMenuRef}
        id="expanded-menu"
        className="bg-transparent border-b border-gray-300 overflow-hidden h-0"
      >
        <div id="sub-menu" className="p-6 flex justify-between">
          <img
            src="https://assets.codepen.io/16327/portrait-image-5.jpg"
            alt=""
            className="w-[32%] max-h-[50vh] object-cover opacity-0"
          />
          <img
            src="https://assets.codepen.io/16327/portrait-image-1.jpg"
            alt=""
            className="w-[32%] max-h-[50vh] object-cover opacity-0"
          />
          <img
            src="https://assets.codepen.io/16327/portrait-image-11.jpg"
            alt=""
            className="w-[32%] max-h-[50vh] object-cover opacity-0"
          />
        </div>
      </div>
    </>
  );
}
