"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Clock } from "lucide-react"

interface TestSessionTimerProps {
  initialTime: number // en secondes
  onTimeEnd: () => void
}

export function TestSessionTimer({ initialTime, onTimeEnd }: TestSessionTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime)
  const [isWarningOpen, setIsWarningOpen] = useState(false)
  const [isTimeUp, setIsTimeUp] = useState(false)

  // Calculer le pourcentage de temps restant
  const percentRemaining = (timeRemaining / initialTime) * 100

  // Formater le temps restant en heures:minutes:secondes
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    // Démarrer le décompte
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          setIsTimeUp(true)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    // Nettoyer le timer lors du démontage du composant
    return () => clearInterval(timer)
  }, [])

  // Afficher un avertissement lorsqu'il reste 5 minutes
  useEffect(() => {
    if (timeRemaining === 300) {
      // 5 minutes en secondes
      setIsWarningOpen(true)
    }
  }, [timeRemaining])

  // Gérer la fin du temps
  useEffect(() => {
    if (isTimeUp) {
      onTimeEnd()
    }
  }, [isTimeUp, onTimeEnd])

  return (
    <>
      <Card className={`${percentRemaining <= 10 ? "border-red-500" : ""}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Clock className={`h-5 w-5 mr-2 ${percentRemaining <= 10 ? "text-red-500 animate-pulse" : ""}`} />
              <h3 className="font-medium">Temps restant</h3>
            </div>
            <span className={`font-mono text-lg font-bold ${percentRemaining <= 10 ? "text-red-500" : ""}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
          <Progress value={percentRemaining} className="h-2" />
        </CardContent>
      </Card>

      {/* Alerte de 5 minutes restantes */}
      <AlertDialog open={isWarningOpen} onOpenChange={setIsWarningOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Plus que 5 minutes!</AlertDialogTitle>
            <AlertDialogDescription>
              Il ne vous reste plus que 5 minutes pour terminer ce test. Assurez-vous de soumettre vos réponses à temps.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Compris</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alerte de fin de temps */}
      <AlertDialog open={isTimeUp}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Temps écoulé!</AlertDialogTitle>
            <AlertDialogDescription>
              Le temps imparti pour ce test est écoulé. Vos réponses vont être soumises automatiquement.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

