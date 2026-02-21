"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"

const testimonials = [
  {
    quote: "Cut our AI feature deployment time from 3 weeks to 3 days. The production deployment strategies alone justified the entire webinar.",
    author: "Michael Chen",
    role: "Senior Staff Engineer",
    company: "Google",
  },
  {
    quote: "Finally shipped our LLM-powered fraud detection system after months of stalled demos. The vibe coding methodology was the missing piece.",
    author: "Sarah Williams",
    role: "Principal Engineer",
    company: "PayPal",
  },
  {
    quote: "Reduced our AI infrastructure costs by 40% using the optimization techniques covered. My team thought I was magic.",
    author: "Raj Patel",
    role: "Engineering Manager",
    company: "Amazon Web Services",
  },
  {
    quote: "The prompt engineering and system design sections transformed how we build customer-facing AI features. CSAT scores up 23%.",
    author: "Jennifer Liu",
    role: "Senior Engineering Manager",
    company: "Uber",
  },
  {
    quote: "We went from prototype to production for our real-time translation service in 2 weeks. Our VP of Engineering asked what changed.",
    author: "David Park",
    role: "Staff Software Engineer",
    company: "Western Union",
  },
  {
    quote: "The CI/CD pipeline for AI models section saved us months of trial and error. Now deploying models is as routine as code deploys.",
    author: "Emily Zhao",
    role: "Senior Engineer II",
    company: "Meta",
  },
  {
    quote: "Actually learned how to monitor AI systems in production with proper guardrails. Zero incidents since implementation.",
    author: "James Morrison",
    role: "Tech Lead",
    company: "Netflix",
  },
  {
    quote: "Our AI agent automation reduced manual ticket resolution by 60%. The ROI conversation with leadership was delightful.",
    author: "Anita Krishnamurthy",
    role: "Principal Engineer",
    company: "Salesforce",
  },
  {
    quote: "The distinction between demo engineering and production engineering for AI was eye-opening. Changed our entire roadmap.",
    author: "Thomas Berg",
    role: "Senior Engineering Manager",
    company: "Apple",
  },
  {
    quote: "Built and shipped an AI-powered compliance checker in one sprint. Legal team thinks I'm a wizard now.",
    author: "Lisa Wong",
    role: "Staff Engineer",
    company: "Stripe",
  },
]

export function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const numberX = useTransform(x, [-200, 200], [-20, 20])
  const numberY = useTransform(y, [-200, 200], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }
  }

  const goNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length)
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    const timer = setInterval(goNext, 6000)
    return () => clearInterval(timer)
  }, [])

  const current = testimonials[activeIndex]

  return (
    <div className="flex items-center justify-center min-h-[600px] bg-slate-900/50 overflow-hidden py-16">
      <div ref={containerRef} className="relative w-full max-w-5xl px-4" onMouseMove={handleMouseMove}>
        {/* Oversized index number */}
        <motion.div
          className="absolute -left-8 top-1/2 -translate-y-1/2 text-[28rem] font-bold text-blue-500/[0.05] select-none pointer-events-none leading-none tracking-tighter hidden lg:block"
          style={{ x: numberX, y: numberY }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Main content */}
        <div className="relative flex flex-col lg:flex-row">
          {/* Left column - vertical text */}
          <div className="hidden lg:flex flex-col items-center justify-center pr-16 border-r border-white/10">
            <motion.span
              className="text-xs font-mono text-gray-400 tracking-widest uppercase"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              What Builders Say
            </motion.span>
          </div>

          {/* Center - quote */}
          <div className="flex-1 px-8 lg:px-16 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <blockquote className="text-2xl lg:text-3xl font-light text-white leading-relaxed mb-12">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {current.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{current.author}</div>
                    <div className="text-gray-400 text-sm">
                      {current.role} · {current.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right - navigation */}
          <div className="flex lg:flex-col items-center justify-center gap-4 mt-8 lg:mt-0 lg:pl-8">
            <button
              onClick={goPrev}
              className="w-12 h-12 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all flex items-center justify-center text-white"
              aria-label="Previous testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <div className="flex lg:flex-col gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === activeIndex ? "bg-blue-500 w-8 lg:w-2 lg:h-8" : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="w-12 h-12 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all flex items-center justify-center text-white"
              aria-label="Next testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
