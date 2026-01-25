"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"



type HighlightProps = {
children: React.ReactNode
className?: string
previewKey?: string
onHoverStart?: (key: string, e: React.MouseEvent) => void
onHoverMove?: (e: React.MouseEvent) => void
onHoverEnd?: () => void
}
type contentData = {
    title? : string
    subtitle? : string
    
}
const previewData = {
  Website: {
    image: "https://images.unsplash.com/photo-1695144244472-a4543101ef35?w=560&h=320&fit=crop",
    title: "Midjourney",
    subtitle: "Create stunning AI-generated artwork",
  },
  
}

const styles = `

  .heading-preview-container {

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
   
    overflow-x: hidden;
    position: relative;
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
`

const HoverLink = ({
  previewKey,
  children,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
  className
}: HighlightProps) => {
  return (
    <h2
      className={`inline-block px-4 py-1 rounded-md bg-[#C8FC75] font-bold hover-link w-[auto] h-[auto] ${className}`}
     onMouseEnter={previewKey && onHoverStart ? (e) => onHoverStart(previewKey, e) : undefined}
onMouseMove={onHoverMove ? (e) => onHoverMove(e) : undefined}
onMouseLeave={onHoverEnd ? () => onHoverEnd() : undefined}
    >
      {children}
    </h2>
  )
}

const PreviewCard = ({
  data,
  position,
  isVisible,
  cardRef,
}: {
  data: (typeof previewData)[keyof typeof previewData] | null
  position: { x: number; y: number }
  isVisible: boolean
  cardRef: React.RefObject<HTMLDivElement | null>
}) => {
  if (!data) return null

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
  )
}

export function HeadingPreview({ title, subtitle }: contentData) {
  const [activePreview, setActivePreview] = useState<(typeof previewData)[keyof typeof previewData] | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Preload all images on mount
  useEffect(() => {
    Object.entries(previewData).forEach(([, data]) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = data.image
    })
  }, [])

  const updatePosition = useCallback((e: React.MouseEvent | MouseEvent) => {
    const cardWidth = 300
    const cardHeight = 250 // Approximate card height
    const offsetX = 15
    const offsetY = 20 // Gap between cursor and card bottom

    // Position card so its bottom-left is above the cursor
    let x = e.clientX - cardWidth / 2 // Center horizontally on cursor
    let y = e.clientY - cardHeight - offsetY // Position above cursor

    // Boundary checks - keep card on screen
    if (x + cardWidth > window.innerWidth - 20) {
      x = window.innerWidth - cardWidth - 20
    }
    if (x < 20) {
      x = 20
    }

    // If card would go above viewport, position below cursor instead
    if (y < 20) {
      y = e.clientY + offsetY
    }

    setPosition({ x, y })
  }, [])

  const handleHoverStart = useCallback(
    (key: string, e: React.MouseEvent) => {
      setActivePreview(previewData[key as keyof typeof previewData])
      setIsVisible(true)
      updatePosition(e)
    },
    [updatePosition],
  )

  const handleHoverMove = useCallback(
    (e: React.MouseEvent) => {
      if (isVisible) {
        updatePosition(e)
      }
    },
    [isVisible, updatePosition],
  )

  const handleHoverEnd = useCallback(() => {
    setIsVisible(false)
  }, [])

  return (
    <>
      <style>{styles}</style>
      <div className="heading-preview-container mt-8 ">
        <div className="ambient-glow" />

        <div className="content-container" >
          <div className="text-block">
            <h2 className="font-bold" style={{
          letterSpacing:"1px",
          lineHeight:"1.5em"
        }}>
              {title} {" "}
              <HoverLink
                previewKey="Website"
                onHoverStart={handleHoverStart}
                onHoverMove={handleHoverMove}
                onHoverEnd={handleHoverEnd}
              >
              {subtitle}
              </HoverLink>
            </h2>

           
          </div>
         
        </div>
        

        <PreviewCard data={activePreview} position={position} isVisible={isVisible} cardRef={cardRef} />
      </div>
    
    </>
  )
}