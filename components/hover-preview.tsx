"use client";

import type React from "react";
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import FlipButton from "@/components/ui/FlipButton";
import { ExpandingHero } from "./expanding-hero";

type HighlightProps = {
  children: React.ReactNode;
  className?: string;
  previewKey?: string;
  onHoverStart?: (key: string, e: React.MouseEvent) => void;
  onHoverMove?: (e: React.MouseEvent) => void;
  onHoverEnd?: () => void;
};

const previewData = {
  Website: {
    image: "/websiteshoverimage.png",
    title: "Website",
    subtitle: "Will Create Stunning Websites",
  },
  Dashboard: {
    image: "/dashboard-template.webp",
    title: "Dashboard",
    subtitle: "Analytics & data visualization",
  },
  MobileApp: {
    image: "/mobile apps.png",
    title: "Mobile App",
    subtitle: "Cross-platform mobile applications",
  },
  Nextjs: {
    image: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png",
    title: "Next.js",
    subtitle: "Server-side rendering & blazing fast performance",
  },
  React: {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png",
    title: "React",
    subtitle: "Component-based interactive user interfaces",
  },
  ReactNative: {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png",
    title: "React Native",
    subtitle: "Native mobile apps with single codebase",
  },
};
const FADE_UP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.8 } },
};
const styles = `

  .hover-preview-container {
    min-height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;

    overflow-x: hidden;
    position: relative;
  }

  .hover-preview-container::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
    z-index: 9999;
  }

  .ambient-glow {
    position: fixed;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 107, 107, 0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 8s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
  }

  .content-container {
    max-width: 900px;
    width: 100%;
  }

  .text-block {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    line-height: 1.6;
    color: #000000;
    font-weight: 400;
    letter-spacing: -0.02em;
  }

  .text-block p {
    margin-bottom: 1.5em;
    opacity: 0;
    animation: fadeUp 0.8s ease forwards;
  }

  .text-block p:nth-child(1) { animation-delay: 0.2s; }
  .text-block p:nth-child(2) { animation-delay: 0.4s; }
  .text-block p:nth-child(3) { animation-delay: 0.6s; }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hover-link {
    color: #000000ff;
    font-weight: 700;
    cursor: pointer;
    position: relative;
    display: inline-block;
    transition: color 0.3s ease;
  }

  .hover-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb);
    transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .hover-link:hover::after {
    width: 100%;
  }

  .preview-card {
    position: fixed;
    pointer-events: none;
    z-index: 1000;
    opacity: 0;
    transform: translateY(10px) scale(0.95);
    transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    will-change: transform, opacity;
  }

  .preview-card.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .preview-card-inner {
    background: #1a1a1a;
    border-radius: 16px;
    padding: 8px;
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.8),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 0 60px rgba(255, 107, 107, 0.1);
    overflow: hidden;
    backdrop-filter: blur(10px);
  }

  .preview-card img {
    width: 280px;
    height: auto;
    border-radius: 10px;
    display: block;
  }

  .preview-card-title {
    padding: 12px 8px 8px;
    font-size: 0.85rem;
    color: #fff;
    font-weight: 700;
    font-family: "Circular";
  }

  .preview-card-subtitle {
    padding: 0 8px 8px;
    font-size: 0.75rem;
    color: #666;
  }
`;

const HoverLink = ({
  previewKey,
  children,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
  className,
}: HighlightProps) => {
  return (
    <h2
      className={`inline-block px-4 py-1 mx-1 my-1 rounded-md bg-[#C8FC75] font-bold hover-link w-[auto] h-[auto] ${className}`}
      onMouseEnter={
        previewKey && onHoverStart
          ? (e) => onHoverStart(previewKey, e)
          : undefined
      }
      onMouseMove={onHoverMove ? (e) => onHoverMove(e) : undefined}
      onMouseLeave={onHoverEnd ? () => onHoverEnd() : undefined}
    >
      {children}
    </h2>
  );
};

const PreviewCard = ({
  data,
  position,
  isVisible,
  cardRef,
}: {
  data: (typeof previewData)[keyof typeof previewData] | null;
  position: { x: number; y: number };
  isVisible: boolean;
  cardRef: React.RefObject<HTMLDivElement | null>;
}) => {
  if (!data) return null;

  return (
    <div
      ref={cardRef}
      className={`preview-card ${isVisible ? "visible" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="preview-card-inner">
        <img
          src={data.image || "/placeholder.svg"}
          alt={data.title || ""}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <div className="preview-card-title">{data.title}</div>
        <div className="preview-card-subtitle">{data.subtitle}</div>
      </div>
    </div>
  );
};

export function HoverPreview() {
  const [activePreview, setActivePreview] = useState<
    (typeof previewData)[keyof typeof previewData] | null
  >(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Preload all images on mount
  useEffect(() => {
    Object.entries(previewData).forEach(([, data]) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = data.image;
    });
  }, []);

  const updatePosition = useCallback((e: React.MouseEvent | MouseEvent) => {
    const cardWidth = 300;
    const cardHeight = 250; // Approximate card height
    const offsetX = 15;
    const offsetY = 20; // Gap between cursor and card bottom

    // Position card so its bottom-left is above the cursor
    let x = e.clientX - cardWidth / 2; // Center horizontally on cursor
    let y = e.clientY - cardHeight - offsetY; // Position above cursor

    // Boundary checks - keep card on screen
    if (x + cardWidth > window.innerWidth - 20) {
      x = window.innerWidth - cardWidth - 20;
    }
    if (x < 20) {
      x = 20;
    }

    // If card would go above viewport, position below cursor instead
    if (y < 20) {
      y = e.clientY + offsetY;
    }

    setPosition({ x, y });
  }, []);

  const handleHoverStart = useCallback(
    (key: string, e: React.MouseEvent) => {
      setActivePreview(previewData[key as keyof typeof previewData]);
      setIsVisible(true);
      updatePosition(e);
    },
    [updatePosition],
  );

  const handleHoverMove = useCallback(
    (e: React.MouseEvent) => {
      if (isVisible) {
        updatePosition(e);
      }
    },
    [isVisible, updatePosition],
  );

  const handleHoverEnd = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="hover-preview-container sm:pt-28 mt-10 ">
        <div className="ambient-glow" />

        <div className="content-container">
          <div className="text-block">
            <h2
              className="font-bold"
              style={{
                letterSpacing: "0.5px",
                lineHeight: "1.6em",
              }}
            >
              I’m Ganesh, a frontend developer building fast, scalable{" "}
              <HoverLink
                previewKey="Website"
                onHoverStart={handleHoverStart}
                onHoverMove={handleHoverMove}
                onHoverEnd={handleHoverEnd}
              >
                websites
              </HoverLink>
              ,{" "}
              <HoverLink
                previewKey="Dashboard"
                onHoverStart={handleHoverStart}
                onHoverMove={handleHoverMove}
                onHoverEnd={handleHoverEnd}
                className="bg-[#ff642d]"
              >
                dashboards
              </HoverLink>{" "}
              and {""}
              <HoverLink
                previewKey="MobileApp"
                onHoverStart={handleHoverStart}
                onHoverMove={handleHoverMove}
                onHoverEnd={handleHoverEnd}
                className="bg-[#b880ff]"
              >
                mobile apps
              </HoverLink>{" "}
              End-to-end development using {""}
              <HoverLink className="!bg-transparent !px-0">
                Next js
              </HoverLink>
              ,{" "}
              <HoverLink className="!bg-transparent !px-0">
                React
              </HoverLink>
              , and{" "}
              <HoverLink className="!bg-transparent !px-0">
                React Native
              </HoverLink>{" "}
              from design to production.
            </h2>

            <motion.div
              className="flex gap-4 mt-6"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3,
                  },
                },
              }}
            >
              <motion.a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-black/5"
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.8 },
                  show: { opacity: 1, y: 0, scale: 1 },
                }}
                whileHover={{
                  scale: 1.15,
                  backgroundColor: "#0077B5",
                  color: "#ffffff",
                  rotate: [0, -10, 10, 0],
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://github.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-black/5"
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.8 },
                  show: { opacity: 1, y: 0, scale: 1 },
                }}
                whileHover={{
                  scale: 1.15,
                  backgroundColor: "#333333",
                  color: "#ffffff",
                  rotate: [0, -10, 10, 0],
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://twitter.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-black/5"
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.8 },
                  show: { opacity: 1, y: 0, scale: 1 },
                }}
                whileHover={{
                  scale: 1.15,
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  rotate: [0, -10, 10, 0],
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
          <motion.div variants={FADE_UP_VARIANTS} className="mt-10">
            <button className="bg-[#c9fd74] rounded-full px-8 py-4 text-black">
              <FlipButton
                className="justify-center items-center"
                label="View my Works"
              />
            </button>
          </motion.div>
        </div>

        <PreviewCard
          data={activePreview}
          position={position}
          isVisible={isVisible}
          cardRef={cardRef}
        />
      </div>
      <ExpandingHero />
    </>
  );
}
