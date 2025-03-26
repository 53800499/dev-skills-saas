"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  ComposedChart,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const performanceData = [
  { name: "1 Jan", Frontend: 65, Backend: 68, Algorithmes: 62, DevOps: 55, total: 63 },
  { name: "5 Jan", Frontend: 68, Backend: 72, Algorithmes: 63, DevOps: 57, total: 66 },
  { name: "10 Jan", Frontend: 67, Backend: 70, Algorithmes: 65, DevOps: 60, total: 67 },
  { name: "15 Jan", Frontend: 70, Backend: 74, Algorithmes: 68, DevOps: 62, total: 69 },
  { name: "20 Jan", Frontend: 72, Backend: 75, Algorithmes: 70, DevOps: 65, total: 71 },
  { name: "25 Jan", Frontend: 75, Backend: 78, Algorithmes: 72, DevOps: 68, total: 74 },
  { name: "30 Jan", Frontend: 78, Backend: 80, Algorithmes: 75, DevOps: 70, total: 76 },
  { name: "5 Fév", Frontend: 80, Backend: 82, Algorithmes: 78, DevOps: 72, total: 78 },
  { name: "10 Fév", Frontend: 82, Backend: 85, Algorithmes: 80, DevOps: 75, total: 81 },
  { name: "15 Fév", Frontend: 85, Backend: 87, Algorithmes: 82, DevOps: 78, total: 83 },
]

const skillData = [
  { name: "Frontend", score: 85, candidates: 48 },
  { name: "Backend", score: 87, candidates: 42 },
  { name: "Algorithmes", score: 82, candidates: 38 },
  { name: "DevOps", score: 78, candidates: 32 },
  { name: "Base de données", score: 80, candidates: 36 },
  { name: "Mobile", score: 75, candidates: 28 },
]

interface PerformanceChartProps {
  bySkill?: boolean
}

export function PerformanceChart({ bySkill = false }: PerformanceChartProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [chartType, setChartType] = useState("line")
  const [animatedData, setAnimatedData] = useState<any[]>([])

  useEffect(() => {
    // Animate data loading
    const data = bySkill ? skillData : performanceData
    const timer = setTimeout(() => {
      setAnimatedData(data)
    }, 500)

    return () => clearTimeout(timer)
  }, [bySkill])

  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  }

  if (bySkill) {
    return (
      <div className="h-full w-full">
        <Tabs defaultValue="bar" className="h-full" onValueChange={setChartType}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="bar" className="text-xs">
                Barres
              </TabsTrigger>
              <TabsTrigger value="composed" className="text-xs">
                Composé
              </TabsTrigger>
            </TabsList>
          </div>

          <motion.div
            key={chartType}
            variants={chartVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="h-[calc(100%-40px)]"
          >
            <TabsContent value="bar" className="h-full mt-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={animatedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "var(--radius)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="score"
                    name="Score moyen"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="composed" className="h-full mt-0">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={animatedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" domain={[0, 100]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 60]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "var(--radius)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="candidates"
                    name="Nombre de candidats"
                    fill="hsl(var(--primary) / 0.3)"
                    yAxisId="right"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    name="Score moyen"
                    stroke="hsl(var(--primary))"
                    yAxisId="left"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    animationDuration={1500}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="h-[350px] w-full">
      <Tabs defaultValue="line" className="h-full" onValueChange={setChartType}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="line" className="text-xs">
              Ligne
            </TabsTrigger>
            <TabsTrigger value="area" className="text-xs">
              Aire
            </TabsTrigger>
            <TabsTrigger value="bar" className="text-xs">
              Barres
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span>Total</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span>Frontend</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span>Backend</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <span>Algorithmes</span>
            </div>
          </div>
        </div>

        <motion.div
          key={chartType}
          variants={chartVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="h-[calc(100%-40px)]"
        >
          <TabsContent value="line" className="h-full mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={animatedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis domain={[50, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total"
                  name="Score moyen"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={1500}
                />
                <Line type="monotone" dataKey="Frontend" stroke="#60a5fa" animationDuration={1500} />
                <Line type="monotone" dataKey="Backend" stroke="#4ade80" animationDuration={1500} />
                <Line type="monotone" dataKey="Algorithmes" stroke="#facc15" animationDuration={1500} />
                <Line type="monotone" dataKey="DevOps" stroke="#f87171" animationDuration={1500} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="area" className="h-full mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={animatedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis domain={[50, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="total"
                  name="Score moyen"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary) / 0.2)"
                  animationDuration={1500}
                />
                <Area type="monotone" dataKey="Frontend" stroke="#60a5fa" fill="#60a5fa20" animationDuration={1500} />
                <Area type="monotone" dataKey="Backend" stroke="#4ade80" fill="#4ade8020" animationDuration={1500} />
                <Area
                  type="monotone"
                  dataKey="Algorithmes"
                  stroke="#facc15"
                  fill="#facc1520"
                  animationDuration={1500}
                />
                <Area type="monotone" dataKey="DevOps" stroke="#f87171" fill="#f8717120" animationDuration={1500} />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="bar" className="h-full mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={animatedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis domain={[50, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="total"
                  name="Score moyen"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  )
}

