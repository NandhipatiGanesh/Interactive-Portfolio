"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import "../../globals.scss";
export default function secondSection() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scopeRef.current) return;

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // 👇 THIS is the key
    const ctx = gsap.context(() => {
    //   ScrollSmoother.create({
    //     smooth: 1,
    //     effects: true,
    //     normalizeScroll: true,
    //   });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".zoom-container",
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
          },
        })
        .to(
          ".zoom-item[data-layer='3']",
          {
            opacity: 1,
            z: 800,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          ".zoom-item[data-layer='2']",
          {
            opacity: 1,
            z: 600,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          ".zoom-item[data-layer='1']",
          {
            opacity: 1,
            z: 400,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          ".heading",
          {
            opacity: 1,
            z: 50,
            ease: "power1.inOut",
          },
          0
        );

    //   const splitLetters = SplitText.create(
    //     document.querySelector(".opacity-reveal")!
    //   );

    //   gsap.set(splitLetters.chars, { opacity: 0.2 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".section-stick",
            pin: true,
            start: "center center",
            end: "+=1500",
            scrub: 1,
          },
        })
        // .to(splitLetters.chars, {
        //   opacity: 1,
        //   ease: "none",
        //   stagger: 1,
        // })
        .to({}, { duration: 10 })
        .to(".opacity-reveal", {
          opacity: 0,
          scale: 1.2,
          duration: 50,
        });
    }, scopeRef); // 👈 scope to this component ONLY

    return () => ctx.revert(); // 👈 fixes Strict Mode & duplicates
  }, []);
  return (
    <main ref={scopeRef}>
      <div className="zoom-container">
        <h1 className="heading">
          Perspective Zoom Effect
          <br />
          on Scroll
        </h1>
        <div className="zoom-item" data-layer="2">
          <img
            src="https://assets.codepen.io/204808/eugene-chystiakov-W6FESrD-M50-unsplash.jpg"
            alt=""
          />
        </div>
        <div className="zoom-item" data-layer="2">
          <img
            src="https://assets.codepen.io/204808/hendo-wang-DsGeUBaJPwc-unsplash.jpg"
            alt=""
          />
        </div>
        <div className="zoom-item" data-layer="1">
          <img
            src="https://assets.codepen.io/204808/taylor-sondgeroth-ltsKOg_q_Gc-unsplash.jpg"
            alt=""
          />
        </div>
        <div className="zoom-item" data-layer="2">
          <img
            src="https://assets.codepen.io/204808/shayna-douglas-w2tG22s8hEc-unsplash.jpg"
            alt=""
          />
        </div>
        <div className="zoom-item" data-layer="3">
          <img
            src="https://assets.codepen.io/204808/samantha-fortney-o8CA1Kj8TJU-unsplash.jpg"
            alt=""
          />
        </div>
        <div className="zoom-item" data-layer="1">
          <img
            src="https://assets.codepen.io/204808/jakub-dziubak-wvXG_7ebZ18-unsplash.jpg"
            alt=""
          />
        </div>
        <div className="zoom-item" data-layer="3">
          <img
            src="https://assets.codepen.io/204808/golden-retriever-3.png"
            alt=""
          />
        </div>
        <div className="zoom-item" data-layer="3">
          <img
            src="https://assets.codepen.io/204808/golden-retriever-2.png"
            alt=""
          />
        </div>
        <div className="zoom-item" data-layer="1">
          <img
            src="https://assets.codepen.io/204808/golden-retriever-1.png"
            alt=""
          />
        </div>
        <div className="zoom-item" data-layer="3">
          <img
            src="https://assets.codepen.io/204808/richard-brutyo-Sg3XwuEpybU.jpg"
            alt=""
          />
        </div>
        <div className="zoom-item" data-layer="2">
          <img
            src="https://assets.codepen.io/204808/berkay-gumustekin-ngqyo2AYYnE.jpg"
            alt=""
          />
        </div>
        <div className="zoom-item" data-layer="1">
          <img
            src="https://assets.codepen.io/204808/zach-shup-R6SdnJnLJEg.jpg"
            alt=""
          />
        </div>
      </div>

      <section className="section-stick min-h-screen bg-black flex justify-center items-center text-white">
        <p className="opacity-reveal text-7xl text-center w-3/5">
          If you’re lucky, a Golden Retriever will come into your life, steal
          your heart, and change everything.
        </p>
      </section>
    </main>
  );
}
