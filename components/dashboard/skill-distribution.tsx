"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from "recharts"

const skillData = [
  { name: "Frontend", value: 35, color: "#60a5fa" },
  { name: "Backend", value: 25, color: "#4ade80" },
  { name: "Algorithmes", value: 15, color: "#facc15" },
  { name: "DevOps", value: 10, color: "#c084fc" },
  { name: "Base de données", value: 10, color: "#f97316" },
  { name: "Mobile", value: 5, color: "#f43f5e" },
]

export function SkillDistribution() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
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

  // Scale data for animation
  const animatedData = skillData.map((item) => ({
    ...item,
    value: item.value * animationProgress,
  }))

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props

    return (
      <g>
        <text x={cx} y={cy} dy={-20} textAnchor="middle" fill={fill} className="text-lg font-medium">
          {payload.name}
        </text>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-2xl font-bold">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
        <text x={cx} y={cy} dy={30} textAnchor="middle" className="text-xs text-muted-foreground">
          {`${value} tests`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.3}
        />
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    )
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={animatedData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            onMouseEnter={onPieEnter}
            animationDuration={1500}
          >
            {animatedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
            formatter={(value: number) => [`${value.toFixed(0)} tests`, "Nombre de tests"]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

