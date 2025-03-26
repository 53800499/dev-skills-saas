"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  delay?: number
}

export function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background hover:shadow-md transition-all duration-300 group relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-150"></div>
      <div className="p-2 bg-primary/10 rounded-full relative z-10 group-hover:bg-primary/20 transition-colors duration-300">
        <div className="text-primary w-6 h-6">{icon}</div>
      </div>
      <h3 className="text-xl font-bold relative z-10 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground text-center relative z-10">{description}</p>
    </motion.div>
  )
}

