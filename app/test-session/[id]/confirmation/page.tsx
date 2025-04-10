"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function TestConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const testId = params.id as string

  const handleReturnToDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Test soumis avec succès!</CardTitle>
          <CardDescription>Votre réponse a été enregistrée et sera évaluée prochainement.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Merci d'avoir complété ce test. Vous recevrez une notification lorsque vos résultats seront disponibles.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleReturnToDashboard}>Retourner au tableau de bord</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

