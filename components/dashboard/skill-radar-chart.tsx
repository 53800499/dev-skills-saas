"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts"

const skillData = [
  { subject: "Frontend", A: 85, B: 90, fullMark: 100 },
  { subject: "Backend", A: 87, B: 80, fullMark: 100 },
  { subject: "Algorithmes", A: 82, B: 85, fullMark: 100 },
  { subject: "DevOps", A: 78, B: 70, fullMark: 100 },
  { subject: "Base de données", A: 80, B: 75, fullMark: 100 },
  { subject: "Mobile", A: 75, B: 65, fullMark: 100 },
]

const detailedSkillData = [
  { subject: "JavaScript", A: 85, B: 90, fullMark: 100 },
  { subject: "React", A: 88, B: 92, fullMark: 100 },
  { subject: "Node.js", A: 82, B: 78, fullMark: 100 },
  { subject: "SQL", A: 80, B: 75, fullMark: 100 },
  { subject: "Python", A: 75, B: 80, fullMark: 100 },
  { subject: "DevOps", A: 78, B: 70, fullMark: 100 },
  { subject: "Algorithmes", A: 82, B: 85, fullMark: 100 },
  { subject: "Architecture", A: 79, B: 72, fullMark: 100 },
]

interface SkillRadarChartProps {
  detailed?: boolean
}

export function SkillRadarChart({ detailed = false }: SkillRadarChartProps) {
  const [animationProgress, setAnimationProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const timer = setInterval(() => {
      setAnimationProgress((prev) => {
        if (prev >= 1) {
          clearInterval(timer)
          return 1
        }
        return prev + 0.02
      })
    }, 20)

    return () => clearInterval(timer)
  }, [])

  const data = detailed ? detailedSkillData : skillData

  // Scale data for animation
  const animatedData = data.map((item) => ({
    ...item,
    A: item.A * animationProgress,
    B: item.B * animationProgress,
  }))

  return (
    <motion.div
      className="w-full h-[300px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={animatedData}>
          <PolarGrid stroke="hsl(var(--muted-foreground) / 0.2)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Radar
            name="Score moyen"
            dataKey="A"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary) / 0.3)"
            dot
            animationDuration={1500}
          />
          <Radar name="Meilleur score" dataKey="B" stroke="#4ade80" fill="#4ade8040" dot animationDuration={1500} />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

