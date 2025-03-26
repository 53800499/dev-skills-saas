"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertCircle,
  Check,
  Clock,
  Code,
  FileText,
  GripVertical,
  ListChecks,
  Plus,
  Save,
  Settings,
  Trash2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function CreateTestPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")
  const [testName, setTestName] = useState("")
  const [testDescription, setTestDescription] = useState("")
  const [testDuration, setTestDuration] = useState("60")
  const [passingScore, setPassingScore] = useState("70")
  const [isLoading, setIsLoading] = useState(false)
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "multiple-choice",
      content: "",
      options: [
        { text: "", correct: false },
        { text: "", correct: false },
      ],
    },
  ])

  const handleSaveTest = () => {
    setIsLoading(true)

    // Simuler la sauvegarde du test
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Test créé avec succès",
        description: "Vous pouvez maintenant inviter des candidats à passer ce test.",
      })
    }, 1500)
  }

  const addQuestion = (type: string) => {
    const newQuestion = {
      id: questions.length + 1,
      type,
      content: "",
      options:
        type === "multiple-choice"
          ? [
              { text: "", correct: false },
              { text: "", correct: false },
            ]
          : [],
    }
    setQuestions([...questions, newQuestion])
  }

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const addOption = (questionId: number) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            options: [...q.options, { text: "", correct: false }],
          }
        }
        return q
      }),
    )
  }

  const removeOption = (questionId: number, optionIndex: number) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            options: q.options.filter((_, index) => index !== optionIndex),
          }
        }
        return q
      }),
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Créer un test" text="Configurez un nouveau test d'évaluation.">
        <div className="flex gap-2">
          <Button variant="outline">Prévisualiser</Button>
          <Button onClick={handleSaveTest} disabled={!testName.trim() || isLoading} className="gap-2">
            {isLoading ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                <span>Enregistrement...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Enregistrer le test</span>
              </>
            )}
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Général</span>
              </TabsTrigger>
              <TabsTrigger value="questions" className="flex items-center gap-2">
                <ListChecks className="h-4 w-4" />
                <span>Questions</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Paramètres</span>
              </TabsTrigger>
            </TabsList>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <TabsContent value="general" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations générales</CardTitle>
                    <CardDescription>Configurez les informations de base du test</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="test-name">Nom du test</Label>
                      <Input
                        id="test-name"
                        placeholder="ex: Test Frontend React"
                        value={testName}
                        onChange={(e) => setTestName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="test-description">Description</Label>
                      <Textarea
                        id="test-description"
                        placeholder="Décrivez l'objectif et le contenu du test..."
                        value={testDescription}
                        onChange={(e) => setTestDescription(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="test-category">Catégorie</Label>
                        <Select defaultValue="frontend">
                          <SelectTrigger id="test-category">
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="frontend">Frontend</SelectItem>
                            <SelectItem value="backend">Backend</SelectItem>
                            <SelectItem value="fullstack">Full Stack</SelectItem>
                            <SelectItem value="algorithms">Algorithmes</SelectItem>
                            <SelectItem value="devops">DevOps</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="test-difficulty">Niveau de difficulté</Label>
                        <Select defaultValue="intermediate">
                          <SelectTrigger id="test-difficulty">
                            <SelectValue placeholder="Sélectionner un niveau" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Débutant</SelectItem>
                            <SelectItem value="intermediate">Intermédiaire</SelectItem>
                            <SelectItem value="advanced">Avancé</SelectItem>
                            <SelectItem value="expert">Expert</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="test-duration">Durée (minutes)</Label>
                        <Select value={testDuration} onValueChange={setTestDuration}>
                          <SelectTrigger id="test-duration">
                            <SelectValue placeholder="Sélectionner une durée" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                            <SelectItem value="60">60 minutes</SelectItem>
                            <SelectItem value="90">90 minutes</SelectItem>
                            <SelectItem value="120">120 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="passing-score">Score de réussite (%)</Label>
                        <Select value={passingScore} onValueChange={setPassingScore}>
                          <SelectTrigger id="passing-score">
                            <SelectValue placeholder="Sélectionner un score" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="60">60%</SelectItem>
                            <SelectItem value="70">70%</SelectItem>
                            <SelectItem value="75">75%</SelectItem>
                            <SelectItem value="80">80%</SelectItem>
                            <SelectItem value="90">90%</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Compétences évaluées</Label>
                      <div className="border rounded-md p-4">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge className="bg-primary/10 text-primary">JavaScript</Badge>
                          <Badge className="bg-primary/10 text-primary">React</Badge>
                          <Badge className="bg-primary/10 text-primary">CSS</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Input placeholder="Ajouter une compétence..." className="flex-1" />
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="questions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Questions du test</CardTitle>
                        <CardDescription>Ajoutez et configurez les questions du test</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addQuestion("multiple-choice")}
                          className="gap-1"
                        >
                          <Plus className="h-4 w-4" />
                          <span>QCM</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => addQuestion("code")} className="gap-1">
                          <Code className="h-4 w-4" />
                          <span>Code</span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {questions.map((question, index) => (
                      <Card key={question.id} className="border border-border/50">
                        <CardHeader className="bg-muted/30 flex flex-row items-center justify-between p-4">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                            <div>
                              <CardTitle className="text-base">Question {index + 1}</CardTitle>
                              <CardDescription>
                                {question.type === "multiple-choice"
                                  ? "Question à choix multiples"
                                  : "Question de code"}
                              </CardDescription>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeQuestion(question.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`question-${question.id}`}>Énoncé de la question</Label>
                            <Textarea
                              id={`question-${question.id}`}
                              placeholder="Saisissez l'énoncé de la question..."
                              rows={2}
                            />
                          </div>

                          {question.type === "multiple-choice" && (
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Label>Options de réponse</Label>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addOption(question.id)}
                                  className="h-7 px-2 text-xs gap-1"
                                >
                                  <Plus className="h-3 w-3" />
                                  <span>Ajouter une option</span>
                                </Button>
                              </div>

                              {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center gap-2">
                                  <RadioGroup defaultValue="option-1" className="flex-none">
                                    <RadioGroupItem
                                      value={`option-${optionIndex + 1}`}
                                      id={`option-${question.id}-${optionIndex}`}
                                    />
                                  </RadioGroup>
                                  <Input placeholder={`Option ${optionIndex + 1}`} className="flex-1" />
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeOption(question.id, optionIndex)}
                                    className="flex-none h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                    disabled={question.options.length <= 2}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                              <p className="text-xs text-muted-foreground">
                                Sélectionnez le bouton radio à côté de la réponse correcte
                              </p>
                            </div>
                          )}

                          {question.type === "code" && (
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <Label htmlFor={`code-language-${question.id}`}>Langage de programmation</Label>
                                <Select defaultValue="javascript">
                                  <SelectTrigger id={`code-language-${question.id}`}>
                                    <SelectValue placeholder="Sélectionner un langage" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="javascript">JavaScript</SelectItem>
                                    <SelectItem value="python">Python</SelectItem>
                                    <SelectItem value="java">Java</SelectItem>
                                    <SelectItem value="csharp">C#</SelectItem>
                                    <SelectItem value="cpp">C++</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`code-template-${question.id}`}>Template de code (optionnel)</Label>
                                <Textarea
                                  id={`code-template-${question.id}`}
                                  placeholder="Code de départ fourni au candidat..."
                                  rows={3}
                                  className="font-mono text-sm"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`code-solution-${question.id}`}>Solution attendue</Label>
                                <Textarea
                                  id={`code-solution-${question.id}`}
                                  placeholder="Solution de référence pour l'évaluation..."
                                  rows={3}
                                  className="font-mono text-sm"
                                />
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}

                    {questions.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                        <AlertCircle className="h-12 w-12 mb-4 text-muted-foreground/50" />
                        <h3 className="font-medium text-lg mb-1">Aucune question</h3>
                        <p className="text-sm max-w-md">
                          Ajoutez des questions à votre test en utilisant les boutons ci-dessus.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Paramètres du test</CardTitle>
                    <CardDescription>Configurez les options avancées du test</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="randomize">Ordre aléatoire des questions</Label>
                        <p className="text-sm text-muted-foreground">Présenter les questions dans un ordre aléatoire</p>
                      </div>
                      <Switch id="randomize" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-progress">Afficher la progression</Label>
                        <p className="text-sm text-muted-foreground">Montrer au candidat sa progression dans le test</p>
                      </div>
                      <Switch id="show-progress" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-results">Afficher les résultats immédiatement</Label>
                        <p className="text-sm text-muted-foreground">
                          Montrer les résultats au candidat à la fin du test
                        </p>
                      </div>
                      <Switch id="show-results" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="allow-review">Permettre la révision des réponses</Label>
                        <p className="text-sm text-muted-foreground">
                          Permettre au candidat de revoir ses réponses avant de soumettre
                        </p>
                      </div>
                      <Switch id="allow-review" defaultChecked />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="instructions">Instructions pour les candidats</Label>
                      <Textarea
                        id="instructions"
                        placeholder="Instructions spécifiques pour les candidats..."
                        rows={3}
                        defaultValue="Lisez attentivement chaque question. Vous pouvez naviguer entre les questions et modifier vos réponses jusqu'à la soumission finale du test."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="completion-message">Message de fin de test</Label>
                      <Textarea
                        id="completion-message"
                        placeholder="Message affiché à la fin du test..."
                        rows={3}
                        defaultValue="Merci d'avoir complété ce test. Vos résultats seront analysés et vous serez contacté prochainement."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </Tabs>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Résumé du test</CardTitle>
                <CardDescription>Aperçu des informations du test</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">{testName || "Nouveau test"}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {testDescription || "Aucune description fournie"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{testDuration} min</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <ListChecks className="h-3 w-3" />
                    <span>{questions.length} question(s)</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    <span>{passingScore}% pour réussir</span>
                  </Badge>
                </div>

                <Separator />

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progression</span>
                    <span className="font-medium">
                      {activeTab === "general" ? "33%" : activeTab === "questions" ? "66%" : "100%"}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: activeTab === "general" ? "33%" : activeTab === "questions" ? "66%" : "100%",
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {activeTab === "general"
                      ? "Complétez les informations générales"
                      : activeTab === "questions"
                        ? "Ajoutez des questions au test"
                        : "Configurez les paramètres avancés"}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => {
                    if (activeTab === "general") setActiveTab("questions")
                    else if (activeTab === "questions") setActiveTab("settings")
                    else setActiveTab("general")
                  }}
                >
                  {activeTab === "settings" ? (
                    <>
                      <span>Revenir au début</span>
                    </>
                  ) : (
                    <>
                      <span>Étape suivante</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Conseils</CardTitle>
                <CardDescription>Astuces pour créer un bon test</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Structure du test</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Commencez par des questions simples pour mettre le candidat en confiance</li>
                    <li>Variez les types de questions pour évaluer différentes compétences</li>
                    <li>Limitez le test à 60-90 minutes pour maintenir la concentration</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Rédaction des questions</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Soyez clair et précis dans la formulation</li>
                    <li>Évitez les questions ambiguës ou trop complexes</li>
                    <li>Pour les QCM, incluez une seule réponse correcte</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Questions de code</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Fournissez un template de base pour gagner du temps</li>
                    <li>Définissez clairement les critères d'évaluation</li>
                    <li>Testez la solution vous-même avant de l'inclure</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardShell>
  )
}

