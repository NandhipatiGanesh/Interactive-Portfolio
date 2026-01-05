"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

export default function Header() {
  const isClosedRef = useRef(false);
  const openAnimationRef = useRef<gsap.core.Timeline | null>(null);
  const closeAnimationRef = useRef<gsap.core.Timeline | null>(null);

  const handleMenuClick = () => {
    if (isClosedRef.current) {
      const navBottomLinks = document.querySelectorAll(
        '[data-nav="bottom-link"]'
      );
      navBottomLinks.forEach((link) => link.classList.remove("fade-in"));
      closeAnimationRef.current?.restart();
    } else {
      const navBottomLinks = document.querySelectorAll(
        '[data-nav="bottom-link"]'
      );
      openAnimationRef.current?.restart().call(() => {
        navBottomLinks.forEach((link) => link.classList.add("fade-in"));
      });
    }
    isClosedRef.current = !isClosedRef.current;
  };

  useEffect(() => {
    // Select various elements in the navigation menu and hero section
    const navBottom = document.querySelector('[data-nav="bottom-wrapper"]');
    const linksImgWrapper = document.querySelectorAll('[data-nav="link-img"]');
    const linksImg = document.querySelectorAll('[data-nav="link-img"] img');
    const navTopLinks = document.querySelectorAll('[data-nav="top-link"]');
    const navBottomLinks = document.querySelectorAll(
      '[data-nav="bottom-link"]'
    );
    const allNavLines = document.querySelectorAll('[data-nav="bottom-line"]');
    const navMenuButton = document.querySelector('[data-nav="menu-button"]');
    const navMenuLines = document.querySelectorAll('[data-nav="menu-line"]');
    const heroTexts = document.querySelectorAll('[data-hero="text"]');

    // Create split animation for each character in top and bottom navigation links
    const navBottomLinksSplits = Array.from(
      navBottomLinks,
      (n) => new SplitType(n as HTMLElement, { types: "chars,lines" })
    );

    const navTopLinksSplits = Array.from(
      navTopLinks,
      (n) => new SplitType(n as HTMLElement, { types: "chars,lines" })
    );

   

    // Set up initial styles for navBottom and link image wrappers
    gsap.set(navBottom, { display: "flex", clipPath: "inset(0 0 100% 0)" });
    gsap.set(linksImgWrapper, {
      clipPath: (index) =>
        index % 2 === 1 ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)",
    });

    // Function to create hover animation for top navigation links
    const createTopLinkHoverAnimation = (index: number) => {
      const chars = navTopLinksSplits[index].chars;
      const staggerFrom = index % 2 === 0 ? "start" : "end";
      // Define animation for mouse enter
      const onEnter = () => {
        const tl = gsap.timeline();
        tl.to(chars, {
          y: "-100%",
          stagger: { each: 0.02, from: staggerFrom },
        });
      };

      // Define animation for mouse leave
      const onLeave = () => {
        const tl = gsap.timeline();
        tl.to(chars, {
          y: 0,
          overwrite: true,
          stagger: { each: 0.02, from: staggerFrom },
        });
      };

      // Attach animations to mouse events
      navTopLinks[index].addEventListener("mouseenter", onEnter);
      navTopLinks[index].addEventListener("mouseleave", onLeave);

      return () => {
        navTopLinks[index].removeEventListener("mouseenter", onEnter);
        navTopLinks[index].removeEventListener("mouseleave", onLeave);
      };
    };

    // Apply hover animations to each top link
    const topLinkCleanups = Array.from(navTopLinks, (_, index) =>
      createTopLinkHoverAnimation(index)
    );

    // Function to create hover animation for bottom navigation links
    const createBottomLinkHoverAnimation = (index: number) => {
      const chars = navBottomLinksSplits[index].chars;
      const staggerFrom = index % 2 === 0 ? "start" : "end";
      // Define animation for mouse enter
      const onEnter = () => {
        const tl = gsap.timeline();
        tl.to(chars, {
          y: "-100%",
          stagger: { each: 0.02, from: staggerFrom },
        })
          .to(
            [linksImgWrapper[2 * index], linksImgWrapper[2 * index + 1]],
            {
              clipPath: "inset(0% 0% 0% 0%)",
            },
            0.2
          )
          .fromTo(
            [linksImg[2 * index], linksImg[2 * index + 1]],
            { scale: 1.5 },
            {
              scale: 1,
              duration: 0.75,
              ease: "expo.out",
            },
            0.2
          );
      };

      // Define animation for mouse leave
      const onLeave = () => {
        const tl = gsap.timeline();
        const split = navBottomLinksSplits[index];
        tl.to(chars, {
          y: "-100%",
          stagger: { each: 0.02, from: staggerFrom },
        })
          .to(
            split.chars?.map((c: Element) => c.nextSibling) || [],
            {
              y: "-100%",
              stagger: { each: 0.02, from: staggerFrom },
            },
            0
          )
          .to(
            [linksImgWrapper[2 * index], linksImgWrapper[2 * index + 1]],
            {
              clipPath: (i) =>
                i % 2 === 1 ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)",
            },
            0.2
          )
          .fromTo(
            [linksImg[2 * index], linksImg[2 * index + 1]],
            { scale: 1 },
            {
              scale: 1.5,
              duration: 0.75,
              ease: "power2.out",
            },
            0.2
          );
      };
      // Attach animations to mouse events
      navBottomLinks[index].addEventListener("mouseenter", onEnter);
      navBottomLinks[index].addEventListener("mouseleave", onLeave);

      return () => {
        navBottomLinks[index].removeEventListener("mouseenter", onEnter);
        navBottomLinks[index].removeEventListener("mouseleave", onLeave);
      };
    };

    // Apply hover animations to each bottom link
    const bottomLinkCleanups = Array.from(navBottomLinks, (_, index) =>
      createBottomLinkHoverAnimation(index)
    );

    // Define the open animation timeline for the menu
    openAnimationRef.current = gsap
      .timeline({ paused: true })
      .fromTo(
        navBottom,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.25,
          ease: "expo.inOut",
        }
      )
      .from(
        allNavLines,
        {
          clipPath: (index) =>
            index % 2 === 1
              ? "inset(1px 100% 1.15px 0%)"
              : "inset(1px 0% 1.15px 100%)",
          duration: 1.25,
          ease: "power3.inOut",
        },
        0.25
      )
      .fromTo(
        navBottomLinksSplits.map((x) => x.lines?.[0]),
        { y: "100%" },
        {
          y: 0,
          duration: 1.5,
          ease: "power3.inOut",
        },
        0
      )
      .to(
        navTopLinks,
        {
          color: "#1e1d1a",
        },
        0.5
      )
      .to(
        navMenuLines,
        {
          backgroundColor: "#1e1d1a",
          duration: 0.125,
          ease: "power2.out",
        },
        0.5
      )
      .to(
        navMenuLines,
        {
          transform: (i) => `translate(0, ${i % 2 === 0 ? "4px" : "-5px"})`,
          duration: 0.5,
          ease: "power2.out",
        },
        0.5
      )
      .to(
        heroTexts,
        {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        0
      );

    // Define the close animation timeline for the menu
    closeAnimationRef.current = gsap
      .timeline({ paused: true })
      .to(navBottom, {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.5,
        ease: "expo.inOut",
      })
      .to(
        allNavLines,
        {
          clipPath: (index) =>
            index % 2 === 1
              ? "inset(1px 100% 1.15px 0%)"
              : "inset(1px 0% 1.15px 100%)",
          duration: 1,
          ease: "power3.inOut",
        },
        0
      )
      .fromTo(
        navBottomLinksSplits.map((x) => x.lines?.[0]),
        { y: 0 },
        {
          y: "100%",
          duration: 1,
          ease: "power3.inOut",
        },
        0
      )
      .to(
        navTopLinks,
        {
          color: "white",
        },
        "-=0.5"
      )
      .to(
        navMenuLines,
        {
          backgroundColor: "white",
          duration: 0.125,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .to(
        navMenuLines,
        {
          transform: "translate(0)",
          duration: 0.75,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .to(
        heroTexts,
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        0.5
      );

    // Cleanup
    return () => {
      topLinkCleanups.forEach((cleanup) => cleanup());
      bottomLinkCleanups.forEach((cleanup) => cleanup());
      navBottomLinksSplits.forEach((split) => split.revert());
      navTopLinksSplits.forEach((split) => split.revert());
    };
  }, []);

  return (
    <>
      <style jsx>{`
        [data-nav="bottom-wrapper"] {
          position: fixed; /* instead of absolute */
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: auto;
          z-index: 9999;
          background: #fff9eee6 !important;
        }
        .nav_link::before {
          content: attr(nav-number);
          font-size: 0.15em;
          position: absolute;
          top: 0.7em;
          text-shadow: none;
          opacity: 0;
          transition: opacity 0.3s ease-out;
        }
        .nav_bottom_link-wrapper:nth-child(2n + 1) .nav_link::before {
          right: -1.2em;
        }
        .nav_bottom_link-wrapper:nth-of-type(4n + 1) .nav_link::before {
          left: -1.2em;
        }
        .nav_link.fade-in::before {
          opacity: 1;
        }
      `}</style>
      <nav className="relative z-10 w-full flex justify-between items-center px-12 py-6 max-sm:px-6 max-sm:py-4">
        <div className="z-[2] flex flex-col justify-center items-center p-4 pb-5 relative">
          <div className="flex justify-between items-center w-full relative">
            {/* <a
              href="https://www.moussamamadou.com/"
              className="text-white font-mono text-xl no-underline overflow-hidden"
              style={{ textShadow: "0px 1em 0px #cb9f4d" }}
              data-nav="top-link"
            >
              MOUSSA
            </a> */}
            <button
              onClick={handleMenuClick}
              className="flex flex-col justify-between items-stretch w-6 h-[0.85rem] absolute left-1/2 top-0 -translate-x-1/2 translate-y-1/4 max-sm:w-5 max-sm:h-[0.7rem]"
              data-nav="menu-button"
            >
              <div
                className="bg-white w-full h-1 absolute top-0"
                style={{ clipPath: "inset(1px 0% 1px 0%)" }}
                data-nav="menu-line"
              ></div>
              <div
                className="bg-white w-full h-1 absolute bottom-0"
                style={{ clipPath: "inset(1px 0% 1px 0%)" }}
                data-nav="menu-line"
              ></div>
              <div className="hidden">Menu</div>
            </button>
            {/* <a
              href="mailto:moussa.mamadou@outook.com"
              className="text-white font-mono text-xl no-underline overflow-hidden"
              style={{ textShadow: "0px 1em 0px #cb9f4d" }}
              data-nav="top-link"
            >
              CONTACT
            </a> */}
          </div>
          <div
            className="absolute w-full h-[3px] -translate-x-1/2 left-1/2"
            style={{ clipPath: "inset(1px 0% 1.15px 0%)", background: "#999" }}
          ></div>
        </div>
        <div
          className="hidden z-0 flex-col justify-between items-stretch w-full h-screen pt-14 pb-0 absolute inset-0 max-sm:pt-20"
          style={{ backgroundColor: "#fff9eee6", willChange: "clip-path" }}
          data-nav="bottom-wrapper"
        >
          <div className="nav_bottom_link-wrapper">
            <div className="nav_bottom_link-img-wrapper" data-nav="link-img">
              <img
                src="https://moussamamadou.github.io/menu-gsap/images/writer-2.jpg"
                loading="lazy"
                sizes="100vw"
                srcSet="https://moussamamadou.github.io/menu-gsap/images/writer-2-p-500.jpg 500w, https://moussamamadou.github.io/menu-gsap/images/writer-2-p-800.jpg 800w, https://moussamamadou.github.io/menu-gsap/images/writer-2-p-1080.jpg 1080w, https://moussamamadou.github.io/menu-gsap/images/writer-2-p-1600.jpg 1600w, https://moussamamadou.github.io/menu-gsap/images/writer-2-p-2000.jpg 2000w, https://moussamamadou.github.io/menu-gsap/images/writer-2-p-2600.jpg 2600w, https://moussamamadou.github.io/menu-gsap/images/writer-2-p-3200.jpg 3200w, https://moussamamadou.github.io/menu-gsap/images/writer-2.jpg 3240w"
                alt="The Wanabe Writing 2"
                className="nav_bottom_link-img"
              />
            </div>
            <div className="nav_link-wrapper">
              <a
                nav-number="01"
                href="#"
                className="nav_link is-large"
                data-nav="bottom-link"
              >
                HOME
              </a>
            </div>
            <div className="nav_bottom_link-img-wrapper" data-nav="link-img">
              <img
                src="https://moussamamadou.github.io/menu-gsap/images/writer-1.jpg"
                loading="lazy"
                sizes="100vw"
                srcSet="https://moussamamadou.github.io/menu-gsap/images/writer-1-p-500.jpg 500w, https://moussamamadou.github.io/menu-gsap/images/writer-1-p-800.jpg 800w, https://moussamamadou.github.io/menu-gsap/images/writer-1-p-1080.jpg 1080w, https://moussamamadou.github.io/menu-gsap/images/writer-1-p-1600.jpg 1600w, https://moussamamadou.github.io/menu-gsap/images/writer-1-p-2000.jpg 2000w, https://moussamamadou.github.io/menu-gsap/images/writer-1-p-2600.jpg 2600w, https://moussamamadou.github.io/menu-gsap/images/writer-1-p-3200.jpg 3200w, https://moussamamadou.github.io/menu-gsap/images/writer-1.jpg 3344w"
                alt="The Wanabe Writing 1"
                className="nav_bottom_link-img"
              />
            </div>
          </div>
          <div className="nav_bottom_line" data-nav="bottom-line"></div>
          <div className="nav_bottom_link-wrapper">
            <div className="nav_bottom_link-img-wrapper" data-nav="link-img">
              <img
                src="https://moussamamadou.github.io/menu-gsap/images/cop-2.jpg"
                loading="lazy"
                sizes="100vw"
                srcSet="https://moussamamadou.github.io/menu-gsap/images/cop-2-p-500.jpg 500w, https://moussamamadou.github.io/menu-gsap/images/cop-2-p-800.jpg 800w, https://moussamamadou.github.io/menu-gsap/images/cop-2-p-1080.jpg 1080w, https://moussamamadou.github.io/menu-gsap/images/cop-2.jpg 1449w"
                alt="The Bored Officer 2"
                className="nav_bottom_link-img"
              />
            </div>
            <div className="nav_link-wrapper">
              <a
                nav-number="02"
                href="#"
                className="nav_link is-large"
                data-nav="bottom-link"
              >
                ABOUT
              </a>
            </div>
            <div className="nav_bottom_link-img-wrapper" data-nav="link-img">
              <img
                src="https://moussamamadou.github.io/menu-gsap/images/cop-1.jpg"
                loading="lazy"
                sizes="100vw"
                srcSet="https://moussamamadou.github.io/menu-gsap/images/cop-1-p-500.jpg 500w, https://moussamamadou.github.io/menu-gsap/images/cop-1-p-800.jpg 800w, https://moussamamadou.github.io/menu-gsap/images/cop-1-p-1080.jpg 1080w, https://moussamamadou.github.io/menu-gsap/images/cop-1-p-1600.jpg 1600w, https://moussamamadou.github.io/menu-gsap/images/cop-1-p-2000.jpg 2000w, https://moussamamadou.github.io/menu-gsap/images/cop-1-p-2600.jpg 2600w, https://moussamamadou.github.io/menu-gsap/images/cop-1-p-3200.jpg 3200w, https://moussamamadou.github.io/menu-gsap/images/cop-1.jpg 3309w"
                alt="The Bored Officer 1"
                className="nav_bottom_link-img"
              />
            </div>
          </div>
          <div className="nav_bottom_line" data-nav="bottom-line"></div>
          <div className="nav_bottom_link-wrapper">
            <div className="nav_bottom_link-img-wrapper" data-nav="link-img">
              <img
                src="https://moussamamadou.github.io/menu-gsap/images/dance-1.jpg"
                loading="lazy"
                sizes="100vw"
                srcSet="https://moussamamadou.github.io/menu-gsap/images/dance-1-p-500.jpg 500w, https://moussamamadou.github.io/menu-gsap/images/dance-1-p-800.jpg 800w, https://moussamamadou.github.io/menu-gsap/images/dance-1-p-1080.jpg 1080w, https://moussamamadou.github.io/menu-gsap/images/dance-1-p-1600.jpg 1600w, https://moussamamadou.github.io/menu-gsap/images/dance-1-p-2000.jpg 2000w, https://moussamamadou.github.io/menu-gsap/images/dance-1-p-2600.jpg 2600w, https://moussamamadou.github.io/menu-gsap/images/dance-1.jpg 3080w"
                alt="The Sticky Dancers 1"
                className="nav_bottom_link-img"
              />
            </div>
            <div className="nav_link-wrapper">
              <a
                nav-number="03"
                href="#"
                className="nav_link is-large"
                data-nav="bottom-link"
              >
                PROJECT
              </a>
            </div>
            <div className="nav_bottom_link-img-wrapper" data-nav="link-img">
              <img
                src="https://moussamamadou.github.io/menu-gsap/images/dance-1.jpg"
                loading="lazy"
                sizes="100vw"
                srcSet="https://moussamamadou.github.io/menu-gsap/images/dance-1-p-500.jpg 500w, https://moussamamadou.github.io/menu-gsap/images/dance-1-p-800.jpg 800w, https://moussamamadou.github.io/menu-gsap/images/dance-1-p-1080.jpg 1080w, https://moussamamadou.github.io/menu-gsap/images/dance-1-p-1600.jpg 1600w, https://moussamamadou.github.io/menu-gsap/images/dance-1-p-2000.jpg 2000w, https://moussamamadou.github.io/menu-gsap/images/dance-1-p-2600.jpg 2600w, https://moussamamadou.github.io/menu-gsap/images/dance-1.jpg 3080w"
                alt="The Sticky Dancers 1"
                className="nav_bottom_link-img"
              />
            </div>
          </div>
          <div className="nav_bottom_line" data-nav="bottom-line"></div>
          <div className="nav_bottom_link-wrapper">
            <div className="nav_bottom_link-img-wrapper" data-nav="link-img">
              <img
                src="https://moussamamadou.github.io/menu-gsap/images/suits-1.jpg"
                loading="lazy"
                sizes="100vw"
                srcSet="https://moussamamadou.github.io/menu-gsap/images/suits-1-p-500.jpg 500w, https://moussamamadou.github.io/menu-gsap/images/suits-1-p-800.jpg 800w, https://moussamamadou.github.io/menu-gsap/images/suits-1-p-1080.jpg 1080w, https://moussamamadou.github.io/menu-gsap/images/suits-1-p-1600.jpg 1600w, https://moussamamadou.github.io/menu-gsap/images/suits-1-p-2000.jpg 2000w, https://moussamamadou.github.io/menu-gsap/images/suits-1-p-2600.jpg 2600w, https://moussamamadou.github.io/menu-gsap/images/suits-1-p-3200.jpg 3200w, https://moussamamadou.github.io/menu-gsap/images/suits-1.jpg 3360w"
                alt="The Gang of Suits 1"
                className="nav_bottom_link-img"
              />
            </div>
            <div className="nav_link-wrapper">
              <a
                nav-number="04"
                href="#"
                className="nav_link is-large"
                data-nav="bottom-link"
              >
                JOURNAL
              </a>
            </div>
            <div className="nav_bottom_link-img-wrapper" data-nav="link-img">
              <img
                src="https://moussamamadou.github.io/menu-gsap/images/suits-1.jpg"
                loading="lazy"
                sizes="100vw"
                srcSet="https://moussamamadou.github.io/menu-gsap/images/suits-1-p-500.jpg 500w, https://moussamamadou.github.io/menu-gsap/images/suits-1-p-800.jpg 800w, https://moussamamadou.github.io/menu-gsap/images/suits-1-p-1080.jpg 1080w, https://moussamamadou.github.io/menu-gsap/images/suits-1-p-1600.jpg 1600w, https://moussamamadou.github.io/menu-gsap/images/suits-1-p-2000.jpg 2000w, https://moussamamadou.github.io/menu-gsap/images/suits-1-p-2600.jpg 2600w, https://moussamamadou.github.io/menu-gsap/images/suits-1-p-3200.jpg 3200w, https://moussamamadou.github.io/menu-gsap/images/suits-1.jpg 3360w"
                alt="The Gang of Suits 1"
                className="nav_bottom_link-img"
              />
            </div>
          </div>
          <div className="nav_bottom_line" data-nav="bottom-line"></div>
          <div className="nav_bottom_link-wrapper">
            <div className="nav_bottom_link-img-wrapper" data-nav="link-img">
              <img
                src="https://moussamamadou.github.io/menu-gsap/images/writer-2.jpg"
                loading="lazy"
                sizes="100vw"
                srcSet="https://moussamamadou.github.io/menu-gsap/images/writer-2-p-500.jpg 500w, https://moussamamadou.github.io/menu-gsap/images/writer-2-p-800.jpg 800w, https://moussamamadou.github.io/menu-gsap/images/writer-2-p-1080.jpg 1080w, https://moussamamadou.github.io/menu-gsap/images/writer-2-p-1600.jpg 1600w, https://moussamamadou.github.io/menu-gsap/images/writer-2-p-2000.jpg 2000w, https://moussamamadou.github.io/menu-gsap/images/writer-2-p-2600.jpg 2600w, https://moussamamadou.github.io/menu-gsap/images/writer-2-p-3200.jpg 3200w, https://moussamamadou.github.io/menu-gsap/images/writer-2.jpg 3240w"
                alt="The Wanabe Writing 2"
                className="nav_bottom_link-img"
              />
            </div>
            <div className="nav_link-wrapper">
              <a
                nav-number="05"
                href="#"
                className="nav_link is-large"
                data-nav="bottom-link"
              >
                CONTACT
              </a>
            </div>
            <div className="nav_bottom_link-img-wrapper" data-nav="link-img">
              <img
                src="https://moussamamadou.github.io/menu-gsap/images/writer-2.jpg"
                loading="lazy"
                sizes="100vw"
                srcSet="https://moussamamadou.github.io/menu-gsap/images/writer-2-p-500.jpg 500w, https://moussamamadou.github.io/menu-gsap/images/writer-2-p-800.jpg 800w, https://moussamamadou.github.io/menu-gsap/images/writer-2-p-1080.jpg 1080w, https://moussamamadou.github.io/menu-gsap/images/writer-2-p-1600.jpg 1600w, https://moussamamadou.github.io/menu-gsap/images/writer-2-p-2000.jpg 2000w, https://moussamamadou.github.io/menu-gsap/images/writer-2-p-2600.jpg 2600w, https://moussamamadou.github.io/menu-gsap/images/writer-2-p-3200.jpg 3200w, https://moussamamadou.github.io/menu-gsap/images/writer-2.jpg 3240w"
                alt="The Wanabe Writing 2"
                className="nav_bottom_link-img"
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
