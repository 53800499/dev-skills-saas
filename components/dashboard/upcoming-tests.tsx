"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Clock } from "lucide-react"

const upcomingTests = [
  {
    id: "UT001",
    title: "Frontend React",
    date: "2024-03-05",
    time: "14:00",
    candidates: 8,
    duration: 60,
    type: "frontend",
  },
  {
    id: "UT002",
    title: "Backend Node.js",
    date: "2024-03-08",
    time: "10:30",
    candidates: 6,
    duration: 45,
    type: "backend",
  },
  {
    id: "UT003",
    title: "Algorithmes",
    date: "2024-03-12",
    time: "15:00",
    candidates: 10,
    duration: 90,
    type: "algo",
  },
]

export function UpcomingTests() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "frontend":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "backend":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "algo":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "devops":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      default:
        return "bg-primary/10 text-primary border-primary/20"
    }
  }

  return (
    <div className="space-y-3">
      {upcomingTests.map((test, index) => (
        <motion.div
          key={test.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium group-hover:text-primary transition-colors">{test.title}</h3>
            <Badge variant="outline" className={getTypeColor(test.type)}>
              {test.type}
            </Badge>
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {new Date(test.date).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}{" "}
                à {test.time}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5" />
              <span>{test.candidates} candidats</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              <span>{test.duration} minutes</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

