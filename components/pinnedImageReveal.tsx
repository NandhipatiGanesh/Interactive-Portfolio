"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./compoundsstyles.css";
import FlipButton from "@/components/ui/FlipButton";

gsap.registerPlugin(ScrollTrigger);

export default function PinnedImageReveal() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // @ts-expect-error - Lenis type missing 'gestureDirection' property
      gestureDirection: "vertical",
      smoothTouch: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Set z-index for images
    document
      .querySelectorAll(".arch__right .img-wrapper")
      .forEach((element) => {
        const order = element.getAttribute("data-index");
        if (order !== null) {
          (element as HTMLElement).style.zIndex = order;
        }
      });

    // Mobile layout handler (only handle order)
    function handleMobileLayout() {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const leftItems = gsap.utils.toArray<HTMLElement>(
        ".arch__left .arch__info"
      );
      const rightItems = gsap.utils.toArray<HTMLElement>(
        ".arch__right .img-wrapper"
      );

      if (isMobile) {
        // Interleave items using order
        leftItems.forEach((item, i) => {
          item.style.order = String(i * 2);
        });
        rightItems.forEach((item, i) => {
          item.style.order = String(i * 2 + 1);
        });
      } else {
        // Clear order for desktop
        leftItems.forEach((item) => {
          item.style.order = "";
        });
        rightItems.forEach((item) => {
          item.style.order = "";
        });
      }
    }

    // Debounce resize for performance
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleMobileLayout, 100);
    };

    window.addEventListener("resize", handleResize);

    // Run on initial load
    handleMobileLayout();

    const imgs = gsap.utils.toArray<HTMLImageElement>(".img-wrapper img");
    const bgColors = ["#EDF9FF", "#FFECF2", "#FFE8DB"];

    // GSAP Animation with Media Query
    ScrollTrigger.matchMedia({
      "(min-width: 769px)": function () {
        const mainTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".arch",
            start: "top top",
            end: "bottom bottom",
            pin: ".arch__right",
            scrub: true,
          },
        });

        gsap.set(imgs, {
          clipPath: "inset(0)",
          objectPosition: "0px 0%",
        });

        imgs.forEach((_, index) => {
          const currentImage = imgs[index];
          const nextImage = imgs[index + 1] ? imgs[index + 1] : null;

          const sectionTimeline = gsap.timeline();

          if (nextImage) {
            sectionTimeline
              .to(
                "body",
                {
                  backgroundColor: bgColors[index],
                  duration: 1.5,
                  ease: "power2.inOut",
                },
                0
              )
              .to(
                currentImage,
                {
                  clipPath: "inset(0px 0px 100%)",
                  objectPosition: "0px 60%",
                  duration: 1.5,
                  ease: "none",
                },
                0
              )
              .to(
                nextImage,
                {
                  objectPosition: "0px 40%",
                  duration: 1.5,
                  ease: "none",
                },
                0
              );
          }

          mainTimeline.add(sectionTimeline);
        });
      },
      "(max-width: 768px)": function () {
        const mbTimeline = gsap.timeline();
        gsap.set(imgs, {
          objectPosition: "0px 60%",
        });

        imgs.forEach((image, index) => {
          const innerTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: image,
              start: "top-=70% top+=50%",
              end: "bottom+=200% bottom",
              scrub: true,
            },
          });

          innerTimeline
            .to(image, {
              objectPosition: "0px 30%",
              duration: 5,
              ease: "none",
            })
            .to("body", {
              backgroundColor: bgColors[index],
              duration: 1.5,
              ease: "power2.inOut",
            });

          mbTimeline.add(innerTimeline);
        });
      },
    });

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="spacer"></div>

        <div className="arch">
          <div className="arch__left">
            <div className="arch__info" id="green-arch">
              <div className="content">
                <h2 className="header">Website Design</h2>
                <p className="desc">
                  Create stunning, responsive websites that captivate your audience. 
                  We craft beautiful layouts with modern design principles, optimized 
                  for performance and user experience across all devices.
                </p>
                <a
                  className="link px-6"
                  href="#"
                  style={{ backgroundColor: "#c9fd74" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    fill="none"
                  >
                    <path
                      fill="#121212"
                      d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z"
                    />
                  </svg>{" "}
                  <FlipButton className="justify-center items-center px-4" label="Get Started" />
                </a>
              </div>
            </div>

            <div className="arch__info" id="blue-arch">
              <div className="content">
                <h2 className="header">Mobile App Design</h2>
                <p className="desc">
                  Design intuitive mobile experiences for iOS and Android. 
                  From concept to prototype, we build apps that users love with 
                  seamless navigation, engaging interfaces, and pixel-perfect design.
                </p>
                <a
                  className="link px-6"
                  href="#"
                  style={{ backgroundColor: "#c9fd74" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    fill="none"
                  >
                    <path
                      fill="#121212"
                      d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z"
                    />
                  </svg>{" "}
                  <FlipButton className="justify-center items-center px-4" label="Get Started" />
                </a>
              </div>
            </div>

            <div className="arch__info" id="pink-arch">
              <div className="content">
                <h2 className="header">Web & Mobile App Maintenance</h2>
                <p className="desc">
                  Keep your applications running smoothly with our comprehensive 
                  maintenance services. We provide regular updates, bug fixes, 
                  performance optimization, and security patches for long-term success.
                </p>
                <a
                  className="link px-6"
                  href="#"
                  style={{ backgroundColor: "#c9fd74" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    fill="none"
                  >
                    <path
                      fill="#121212"
                      d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z"
                    />
                  </svg>{" "}
                  <FlipButton className="justify-center items-center px-4" label="Get Started" />
                </a>
              </div>
            </div>

            <div className="arch__info" id="orange-arch">
              <div className="content">
                <h2 className="header">Custom Dashboard</h2>
                <p className="desc">
                  Build powerful, data-driven dashboards tailored to your business needs. 
                  Visualize complex data with interactive charts, real-time analytics, 
                  and intuitive controls for better decision-making.
                </p>
                <a
                  className="link px-6"
                  href="#"
                  style={{ backgroundColor: "#c9fd74" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    fill="none"
                  >
                    <path
                      fill="#121212"
                      d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z"
                    />
                  </svg>{" "}
                  <FlipButton className="justify-center items-center px-4" label="Get Started" />
                </a>
              </div>
            </div>
            <div className="arch__info" id="cms-arch">
              <div className="content">
                <h2 className="header">CMS Development</h2>
                <p className="desc">
                  Leverage powerful platforms like WordPress and Framer to build 
                  flexible, easy-to-manage websites. Perfect for content-heavy sites, 
                  blogs, and businesses that need quick updates without coding.
                </p>
                <a
                  className="link px-6"
                  href="#"
                  style={{ backgroundColor: "#c9fd74" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    fill="none"
                  >
                    <path
                      fill="#121212"
                      d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z"
                    />
                  </svg>{" "}
                  <FlipButton className="justify-center items-center px-4" label="Get Started" />
                </a>
              </div>
            </div>
          </div>

          <div className="arch__right">
            <div className="img-wrapper" data-index="5">
              <img
                src="/servicesimages/Web Design.png"
                alt="Website Design"
              />
            </div>

            <div className="img-wrapper" data-index="4">
              <img
                src="/servicesimages/Mobile App Design.png"
                alt="Blue Architecture"
              />
            </div>

            <div className="img-wrapper" data-index="3">
              <img
                src="/servicesimages/Web and Mobile App Maintaince.png"
                alt="Pink Architecture"
              />
            </div>

            <div className="img-wrapper" data-index="2">
              <img
                src="/servicesimages/Custom Dashboard.png"
                alt="Orange Architecture"
              />
            </div>
            <div className="img-wrapper" data-index="1">
              <img
                src="/servicesimages/CMS Development.png"
                alt="Orange Architecture"
              />
            </div>
          </div>
        </div>

        <div className="spacer"></div>
      </div>
    </>
  );
}
