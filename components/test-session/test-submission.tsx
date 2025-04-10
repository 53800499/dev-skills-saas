"use client"

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
import { useState } from "react"
import { Send, Loader2 } from "lucide-react"

interface TestSubmissionProps {
  onSubmit: () => void
  isSubmitting: boolean
  warningCount: number
}

export function TestSubmission({ onSubmit, isSubmitting, warningCount }: TestSubmissionProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const handleConfirmSubmit = () => {
    setIsConfirmOpen(false)
    onSubmit()
  }

  return (
    <div className="mt-6 flex justify-end">
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogTrigger asChild>
          <Button disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Soumission en cours...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Soumettre ma réponse
              </>
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir soumettre?</AlertDialogTitle>
            <AlertDialogDescription>
              Une fois soumise, vous ne pourrez plus modifier votre réponse.
              {warningCount > 0 && (
                <div className="mt-2 text-amber-500">
                  Attention: {warningCount} absence{warningCount > 1 ? "s" : ""}{" "}
                  {warningCount > 1 ? "ont été" : "a été"} détectée{warningCount > 1 ? "s" : ""} pendant votre session.
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSubmit}>Soumettre</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

