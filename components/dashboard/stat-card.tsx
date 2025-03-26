"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: number
  suffix?: string
  change: number
  trend: "up" | "down"
  icon: React.ReactNode
}

export function StatCard({ title, value, suffix = "", change, trend, icon }: StatCardProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 1500
    const frameDuration = 1000 / 60
    const totalFrames = Math.round(duration / frameDuration)
    const easeOutQuad = (t: number) => t * (2 - t)

    let frame = 0
    const counter = setInterval(() => {
      frame++
      const progress = easeOutQuad(frame / totalFrames)
      setCount(Math.floor(progress * value))

      if (frame === totalFrames) {
        clearInterval(counter)
        setCount(value)
      }
    }, frameDuration)

    return () => clearInterval(counter)
  }, [value])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <motion.div
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {count}
          {suffix}
        </div>
        <p className="text-xs text-muted-foreground flex items-center mt-1">
          {trend === "up" ? (
            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
          ) : (
            <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
          )}
          <span className={trend === "up" ? "text-green-500" : "text-red-500"}>{change}%</span>
          <span className="ml-1">depuis le mois dernier</span>
        </p>
      </CardContent>
    </Card>
  )
}

