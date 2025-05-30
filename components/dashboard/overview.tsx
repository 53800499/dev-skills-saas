"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 65,
  },
  {
    name: "Fév",
    total: 72,
  },
  {
    name: "Mar",
    total: 78,
  },
  {
    name: "Avr",
    total: 74,
  },
  {
    name: "Mai",
    total: 80,
  },
  {
    name: "Juin",
    total: 85,
  },
  {
    name: "Juil",
    total: 88,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

