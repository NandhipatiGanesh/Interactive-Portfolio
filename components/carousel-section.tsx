"use client"

import { motion } from "framer-motion"

const portfolioItems = [
  "/webImages/bluehero.png",
  "/webImages/luxhospitals.png",
  "/webImages/bluehero.png",
  "/webImages/luxhospitals.png",
  "/webImages/bluehero.png",
  "/webImages/luxhospitals.png",
]

const portfolioItems2 = [
  "/webImages/Gutcare.png",
  "/webImages/avira.png",
  "/webImages/healthadvait.png",
  "/webImages/Gutcare.png",
  "/webImages/avira.png",
  "/webImages/healthadvait.png",
]

export function CarouselSection() {
  // Duplicate for seamless loop
  const items = [...portfolioItems, ...portfolioItems]
  const items2 = [...portfolioItems2, ...portfolioItems2]

  return (
    <section className="bg-[#C9FD74] py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.h2
          className="text-3xl md:text-4xl font-serif text-[#111111]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Built by creators, for creators.
        </motion.h2>
      </div>
      {/* this part moving   left from right */}
      <div className="relative">
        <motion.div
          className="flex gap-6"
          animate={{ x: [0, "-50%"] }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {items.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[300px] md:w-[400px] rounded-xl overflow-hidden shadow-2xl"
              data-clickable
            >
              <img
                src={src || "/placeholder.svg"}
                alt={`Portfolio example ${(i % portfolioItems.length) + 1}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </motion.div>
      </div>
      {/* this part moving right from left */}
      <div className="relative mt-12">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["-50%", 0] }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {items2.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[300px] md:w-[400px] rounded-xl overflow-hidden shadow-2xl"
              data-clickable
            >
              <img
                src={src || "/placeholder.svg"}
                alt={`Portfolio example ${(i % portfolioItems.length) + 1}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
