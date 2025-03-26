"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, X } from "lucide-react"

const testEvents = [
  { date: new Date(2024, 2, 5), title: "Test Frontend React", candidates: 8, type: "frontend" },
  { date: new Date(2024, 2, 8), title: "Test Backend Node.js", candidates: 6, type: "backend" },
  { date: new Date(2024, 2, 12), title: "Test Algorithmes", candidates: 10, type: "algo" },
  { date: new Date(2024, 2, 15), title: "Test DevOps", candidates: 5, type: "devops" },
  { date: new Date(2024, 2, 19), title: "Test Full Stack", candidates: 7, type: "fullstack" },
  { date: new Date(2024, 2, 22), title: "Test Mobile React Native", candidates: 4, type: "mobile" },
  { date: new Date(2024, 2, 26), title: "Test Base de données", candidates: 6, type: "database" },
]

export function TestsCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)

  const handleDayClick = (day: Date | undefined) => {
    setDate(day)

    // Find events for this day
    if (!day) {
      setSelectedEvent(null)
      return
    }

    const events = testEvents.filter(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear(),
    )

    if (events.length > 0) {
      setSelectedEvent(events[0])
    } else {
      setSelectedEvent(null)
    }
  }

  // Function to determine if a day has events
  const isDayWithEvent = (day: Date) => {
    if (!day) return false

    return testEvents.some(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear(),
    )
  }

  // Custom day renderer
  const renderDay = (day: Date, events: any[]) => {
    if (!day) return null

    const hasEvent = isDayWithEvent(day)

    return (
      <div className={`relative w-full h-full flex items-center justify-center ${hasEvent ? "font-medium" : ""}`}>
        {day.getDate()}
        {hasEvent && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary"></div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDayClick}
            className="border rounded-md p-3"
            components={{
              Day: ({ day, displayMonth }) => renderDay(day, []),
            }}
          />
        </div>

        <AnimatePresence mode="wait">
          {selectedEvent ? (
            <motion.div
              key="event-details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1"
            >
              <Card className="p-4 h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-lg">{selectedEvent.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedEvent.date.toLocaleDateString("fr-FR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {selectedEvent.type}
                    </Badge>
                    <Badge variant="outline">{selectedEvent.candidates} candidats</Badge>
                  </div>

                  <div className="text-sm">
                    <p className="mb-2">Compétences évaluées :</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>JavaScript avancé</li>
                      <li>Structures de données</li>
                      <li>Optimisation des performances</li>
                      <li>Architecture logicielle</li>
                    </ul>
                  </div>
                </div>

                <button className="text-sm text-primary flex items-center gap-1 mt-4 self-end group">
                  <span>Voir les détails</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="no-event"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex items-center justify-center"
            >
              <div className="text-center text-muted-foreground">
                <p>Sélectionnez une date avec un test</p>
                <p className="text-sm">Les dates avec des tests sont marquées d'un point</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

