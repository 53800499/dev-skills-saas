"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { TestSessionHeader } from "@/components/test-session/test-session-header"
import { TestSessionTimer } from "@/components/test-session/test-session-timer"
import { CodeEditor } from "@/components/test-session/code-editor"
import { PresenceDetector } from "@/components/test-session/presence-detector"
import { TestInstructions } from "@/components/test-session/test-instructions"
import { TestSubmission } from "@/components/test-session/test-submission"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

// Données de test fictives (à remplacer par des données réelles de l'API)
const mockTest = {
  id: "test-123",
  title: "Test de JavaScript Avancé",
  description:
    "Ce test évalue vos compétences en JavaScript avancé, incluant les closures, les promesses, et les patterns de conception.",
  duration: 60, // minutes
  questions: [
    {
      id: "q1",
      title: "Implémentation d'une fonction de debounce",
      description: "Implémentez une fonction de debounce qui limite le taux d'exécution d'une fonction.",
      instructions: `
        Créez une fonction 'debounce' qui prend deux arguments:
        1. Une fonction 'func' à exécuter
        2. Un délai 'wait' en millisecondes
        
        La fonction debounce doit retourner une nouvelle fonction qui, lorsqu'elle est appelée:
        - Annule tout appel précédent en attente
        - Planifie un nouvel appel après le délai spécifié
        
        Exemple d'utilisation:
        const debouncedFn = debounce(() => console.log('Hello'), 1000);
        // Appeler debouncedFn plusieurs fois rapidement ne déclenchera qu'un seul console.log après 1 seconde
      `,
      starterCode: `function debounce(func, wait) {
  // Votre code ici
}

// Exemple de test
const debouncedFn = debounce(() => console.log('Fonction exécutée'), 1000);
// Tester votre fonction
debouncedFn();
setTimeout(debouncedFn, 500);  // Cet appel devrait annuler le précédent
setTimeout(() => console.log('Test terminé'), 2000);`,
      language: "javascript",
    },
  ],
}

export default function TestSessionPage() {
  const params = useParams()
  const testId = params.id as string

  const [test, setTest] = useState(mockTest)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [code, setCode] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(test.duration * 60) // en secondes
  const [isActive, setIsActive] = useState(true)
  const [warningCount, setWarningCount] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentQuestion = test.questions[currentQuestionIndex]

  // Initialiser le code avec le code de départ de la question
  useEffect(() => {
    if (currentQuestion && currentQuestion.starterCode) {
      setCode(currentQuestion.starterCode)
    }
  }, [currentQuestion])

  // Fonction pour gérer la soumission du test
  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Simulation d'un appel API pour soumettre le test
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirection vers une page de confirmation (à implémenter)
      window.location.href = `/test-session/${testId}/confirmation`
    } catch (error) {
      console.error("Erreur lors de la soumission:", error)
      setIsSubmitting(false)
    }
  }

  // Fonction pour gérer l'absence de l'utilisateur
  const handleUserAbsent = () => {
    setIsActive(false)
    setWarningCount((prev) => prev + 1)
  }

  // Fonction pour gérer le retour de l'utilisateur
  const handleUserPresent = () => {
    setIsActive(true)
  }

  return (
    <div className="all-h-screen flex flex-col">
      <PresenceDetector onUserAbsent={handleUserAbsent} onUserPresent={handleUserPresent} />

      <TestSessionHeader
        title={test.title}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={test.questions.length}
      />

      <div className="flex-1 container py-6">
        {!isActive && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Attention!</AlertTitle>
            <AlertDescription>
              Votre présence n'est pas détectée. Veuillez rester sur cette page pendant le test.
              {warningCount >= 3 && " Trop d'absences peuvent entraîner l'annulation de votre test."}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <TestSessionTimer initialTime={test.duration * 60} onTimeEnd={handleSubmit} />

            <TestInstructions
              title={currentQuestion.title}
              description={currentQuestion.description}
              instructions={currentQuestion.instructions}
            />
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="code" className="w-full">
              <TabsList className="mb-2">
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="preview">Aperçu</TabsTrigger>
              </TabsList>

              <TabsContent value="code" className="mt-0">
                <Card>
                  <CardContent className="p-0">
                    <CodeEditor value={code} onChange={setCode} language={currentQuestion.language} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview" className="mt-0">
                <Card>
                  <CardContent className="p-4 min-h-[400px]">
                    <div className="font-mono text-sm whitespace-pre-wrap">{code}</div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <TestSubmission onSubmit={handleSubmit} isSubmitting={isSubmitting} warningCount={warningCount} />
          </div>
        </div>
      </div>
    </div>
  )
}

