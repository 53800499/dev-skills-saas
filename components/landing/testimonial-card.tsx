"use client"

import { motion } from "framer-motion"

interface TestimonialCardProps {
  quote: string
  name: string
  role: string
  delay?: number
}

export function TestimonialCard({ quote, name, role, delay = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      className="flex flex-col space-y-4 border rounded-lg p-6 bg-background hover:shadow-md transition-all duration-300 group relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-150"></div>
      <div className="relative z-10">
        <svg
          className="h-8 w-8 text-primary/40 mb-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </svg>
        <p className="text-lg font-medium leading-relaxed mb-4">{quote}</p>
      </div>
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}

