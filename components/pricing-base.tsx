"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import {HeadingPreview} from "./heading"
const plans = [
  {
    name: "BASIC WEBSITE",
    price: "₹9,999",
    period: "starting",
    description: "Best for small businesses & personal websites",
    features: [
      "Up to 5 pages website",
      "WordPress or custom-coded site",
      "Custom domain setup",
      "Google Search Console & Analytics",
      "Unlimited form submissions to email",
      "Clean & responsive UI/UX",
    ],
  },
  {
    name: "PREMIUM WEBSITE",
    price: "Custom",
    period: "pricing",
    description: "For businesses & scalable products",
    features: [
      "20+ pages website",
      "Custom domain & subdomains",
      "On-page SEO setup",
      "Advanced forms & user authentication",
      "Premium UI/UX design",
      "Performance & security optimization",
    ],
    popular: true,
  },
]

export function PricingSection() {
  return (
    <section className="bg-secondary px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <HeadingPreview title="Simple, transparent" subtitle="pricing" />
          
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              className={`relative bg-background rounded-xl p-8 ticket-edge ${plan.popular ? "ring-2 ring-[#C9FD74]" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              data-clickable
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C9FD74] text-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Popular
                </span>
              )}

              <div className="text-center pb-6 border-b border-dashed border-gray-200">
                <h3 className="font-serif text-xl text-foreground">{plan.name}</h3>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="text-4xl md:text-5xl font-serif text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground text-sm mt-2">{plan.description}</p>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
              href="tel:_+917569753062"
                className={`w-full mt-8 py-3 px-6 rounded-full font-medium transition-colors ${
                  plan.popular
                    ? "bg-[#C9FD74] text-black hover:bg-[#C9FD74]/90"
                    : "bg-secondary text-foreground hover:bg-accent/30"
                }`}
              >
                Get started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
