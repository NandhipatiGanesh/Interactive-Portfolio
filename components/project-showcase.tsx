"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"

interface Project {
  title: string
  description: string
  year: string
  link: string
  image: string
}

const articles = [
  {
    title: "The Art of Visual Storytelling",
    category: "Design",
    image: "/webImages/image.png",
    link: "#",
    description: "Explore how visual narratives shape user experience and perception in modern digital product design."
  },
  {
    title: "Building a Personal Brand Online",
    category: "Strategy",
    image: "/webImages/luxhospitals.png", 
    link: "#",
    description: "A comprehensive guide to establishing and growing your unique professional identity in the digital space."
  },
  {
    title: "Typography Trends for 2024",
    category: "Typography",
    image: "/webImages/praanavaidya.png",
    link: "#",
    description: "Discover the emerging font styles and typographic treatments defining the visual language of tomorrow."
  },
  {
    title: "Minimalism in Portfolio Design",
    category: "Inspiration",
    image: "/webImages/reviewfeedback.png",
    link: "#",
    description: "Why less is often more: Creating impactful portfolios that let your work speak for itself."
  },
  {
    title: "The Art of Visual Storytelling",
    category: "Design",
    image: "/webImages/image.png",
    link: "#",
    description: "Explore how visual narratives shape user experience and perception in modern digital product design."
  },
  {
    title: "Building a Personal Brand Online",
    category: "Strategy",
    image: "/webImages/luxhospitals.png", 
    link: "#",
    description: "A comprehensive guide to establishing and growing your unique professional identity in the digital space."
  },
  {
    title: "Typography Trends for 2024",
    category: "Typography",
    image: "/webImages/praanavaidya.png",
    link: "#",
    description: "Discover the emerging font styles and typographic treatments defining the visual language of tomorrow."
  },
  {
    title: "Minimalism in Portfolio Design",
    category: "Inspiration",
    image: "/webImages/reviewfeedback.png",
    link: "#",
    description: "Why less is often more: Creating impactful portfolios that let your work speak for itself."
  },
]

export function ProjectShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    setIsVisible(false)
  }

  return (
    <section ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full max-w-5xl mx-auto py-16">
      <motion.p
          className="text-muted-foreground text-sm uppercase tracking-widest mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Insights
        </motion.p>

      <div
        className="pointer-events-none fixed z-50 overflow-hidden rounded-xl shadow-2xl"
        style={{
          left: containerRef.current?.getBoundingClientRect().left ?? 0,
          top: containerRef.current?.getBoundingClientRect().top ?? 0,
          transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative w-[280px] h-[180px] bg-secondary rounded-xl overflow-hidden">
          {articles.map((article, index) => (
            <img
              key={article.title}
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                scale: hoveredIndex === index ? 1 : 1.1,
                filter: hoveredIndex === index ? "none" : "blur(10px)",
              }}
            />
          ))}
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </div>
      </div>

      <div className="space-y-0">
        {articles.map((article, index) => (
          <a
            key={article.title}
            href={article.link}
            className="group block"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative py-5 border-t border-border transition-all duration-300 ease-out">
              {/* Background highlight on hover */}
              <div
                className={`
                  absolute inset-0 -mx-4 px-2 bg-secondary/50 rounded-lg
                  transition-all duration-300 ease-out
                  ${hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                `}
              />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Title with animated underline */}
                  <div className="inline-flex items-center gap-2">
                    <h3 className="text-foreground font-medium text-2xl tracking-tight mb-2">
                      <span className="relative">
                        {article.title}
                        {/* Animated underline */}
                        <span
                          className={`
                            absolute left-0 -bottom-0.5 h-px bg-foreground
                            transition-all duration-300 ease-out
                            ${hoveredIndex === index ? "w-full" : "w-0"}
                          `}
                        />
                      </span>
                    </h3>

                    {/* Arrow that slides in */}
                    <ArrowUpRight
                      className={`
                        w-4 h-4 text-muted-foreground
                        transition-all duration-300 ease-out
                        ${
                          hoveredIndex === index
                            ? "opacity-100 translate-x-0 translate-y-0"
                            : "opacity-0 -translate-x-2 translate-y-2"
                        }
                      `}
                    />
                  </div>

                  {/* Description with fade effect */}
                  <p
                    className={`
                      text-muted-foreground text-sm mt-1 leading-relaxed
                      transition-all duration-300 ease-out
                      ${hoveredIndex === index ? "text-foreground/70" : "text-muted-foreground"}
                    `}
                  >
                    {article.description}
                  </p>
                </div>
              </div>
            </div>
          </a>
        ))}


        {/* Bottom border for last item */}
        <div className="border-t border-border" />
      </div>
    </section>
  )
}