"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LogOut } from "lucide-react"

interface TestSessionHeaderProps {
  title: string
  questionNumber: number
  totalQuestions: number
}

export function TestSessionHeader({ title, questionNumber, totalQuestions }: TestSessionHeaderProps) {
  const router = useRouter()

  const handleExit = () => {
    router.push("/dashboard")
  }

  return (
    <header className="bg-primary text-primary-foreground py-4 sticky top-0 z-10 shadow-md">
      <div className="container flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-sm opacity-90">
            Question {questionNumber} sur {totalQuestions}
          </p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Quitter
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr de vouloir quitter?</AlertDialogTitle>
              <AlertDialogDescription>
                Quitter le test maintenant entraînera la perte de toutes vos réponses non soumises. Cette action ne peut
                pas être annulée.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleExit}>Quitter le test</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  )
}

