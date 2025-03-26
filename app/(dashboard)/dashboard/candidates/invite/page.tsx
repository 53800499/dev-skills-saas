"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Calendar, Clock, Mail, Send, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function InviteCandidatesPage() {
  const { toast } = useToast()
  const [inviteMethod, setInviteMethod] = useState("email")
  const [emails, setEmails] = useState("")
  const [selectedTest, setSelectedTest] = useState("")
  const [expirationDays, setExpirationDays] = useState("7")
  const [sendReminders, setSendReminders] = useState(true)
  const [customMessage, setCustomMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInvite = () => {
    setIsLoading(true)

    // Simuler l'envoi d'invitations
    setTimeout(() => {
      setIsLoading(false)
      const emailList = emails.split(/[\s,;]+/).filter((email) => email.trim() !== "")

      toast({
        title: "Invitations envoyées",
        description: `${emailList.length} invitation(s) envoyée(s) avec succès.`,
      })
    }, 1500)
  }

  const tests = [
    { id: "test1", name: "Frontend React", questions: 15, duration: 60 },
    { id: "test2", name: "Backend Node.js", questions: 12, duration: 45 },
    { id: "test3", name: "Algorithmes et structures de données", questions: 10, duration: 90 },
    { id: "test4", name: "DevOps", questions: 8, duration: 40 },
    { id: "test5", name: "Full Stack", questions: 20, duration: 120 },
  ]

  return (
    <DashboardShell>
      <DashboardHeader heading="Inviter des candidats" text="Invitez des candidats à passer un test d'évaluation." />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Inviter des candidats</CardTitle>
                <CardDescription>Envoyez des invitations pour passer un test d'évaluation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={inviteMethod} onValueChange={setInviteMethod} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>Par email</span>
                    </TabsTrigger>
                    <TabsTrigger value="csv" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      <span>Importer CSV</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="email" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="emails">Adresses email</Label>
                      <Textarea
                        id="emails"
                        placeholder="Entrez les adresses email (séparées par des virgules, espaces ou retours à la ligne)"
                        value={emails}
                        onChange={(e) => setEmails(e.target.value)}
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground">
                        Exemple: john.doe@example.com, jane.smith@example.com
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="csv" className="space-y-4 pt-4">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="mb-2 font-medium">Glissez-déposez un fichier CSV ou</p>
                      <Button variant="outline" size="sm">
                        Parcourir les fichiers
                      </Button>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Le fichier CSV doit contenir une colonne "email" avec les adresses des candidats
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-2">
                  <Label htmlFor="test">Sélectionner un test</Label>
                  <Select value={selectedTest} onValueChange={setSelectedTest}>
                    <SelectTrigger id="test">
                      <SelectValue placeholder="Choisir un test" />
                    </SelectTrigger>
                    <SelectContent>
                      {tests.map((test) => (
                        <SelectItem key={test.id} value={test.id}>
                          {test.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiration">Expiration de l'invitation</Label>
                    <Select value={expirationDays} onValueChange={setExpirationDays}>
                      <SelectTrigger id="expiration">
                        <SelectValue placeholder="Délai d'expiration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 jours</SelectItem>
                        <SelectItem value="7">7 jours</SelectItem>
                        <SelectItem value="14">14 jours</SelectItem>
                        <SelectItem value="30">30 jours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Langue de l'invitation</Label>
                    <Select defaultValue="fr">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Langue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reminders">Envoyer des rappels</Label>
                    <p className="text-sm text-muted-foreground">Envoyer des rappels automatiques aux candidats</p>
                  </div>
                  <Switch id="reminders" checked={sendReminders} onCheckedChange={setSendReminders} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message personnalisé (optionnel)</Label>
                  <Textarea
                    id="message"
                    placeholder="Ajoutez un message personnalisé à l'invitation..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Prévisualiser</Button>
                <Button
                  onClick={handleInvite}
                  disabled={!emails.trim() || !selectedTest || isLoading}
                  className="gap-2"
                >
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
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Envoyer les invitations</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Détails du test</CardTitle>
                <CardDescription>Informations sur le test sélectionné</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedTest ? (
                  <>
                    {tests
                      .filter((test) => test.id === selectedTest)
                      .map((test) => (
                        <div key={test.id} className="space-y-4">
                          <div>
                            <h3 className="font-medium text-lg">{test.name}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{test.duration} min</span>
                              </Badge>
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{test.questions} questions</span>
                              </Badge>
                            </div>
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <h4 className="font-medium">Compétences évaluées</h4>
                            <div className="flex flex-wrap gap-1">
                              {test.id === "test1" && (
                                <>
                                  <Badge className="bg-primary/10 text-primary">JavaScript</Badge>
                                  <Badge className="bg-primary/10 text-primary">React</Badge>
                                  <Badge className="bg-primary/10 text-primary">CSS</Badge>
                                  <Badge className="bg-primary/10 text-primary">HTML</Badge>
                                </>
                              )}
                              {test.id === "test2" && (
                                <>
                                  <Badge className="bg-primary/10 text-primary">Node.js</Badge>
                                  <Badge className="bg-primary/10 text-primary">Express</Badge>
                                  <Badge className="bg-primary/10 text-primary">MongoDB</Badge>
                                  <Badge className="bg-primary/10 text-primary">API Design</Badge>
                                </>
                              )}
                              {test.id === "test3" && (
                                <>
                                  <Badge className="bg-primary/10 text-primary">Algorithmes</Badge>
                                  <Badge className="bg-primary/10 text-primary">Structures de données</Badge>
                                  <Badge className="bg-primary/10 text-primary">Complexité</Badge>
                                </>
                              )}
                              {test.id === "test4" && (
                                <>
                                  <Badge className="bg-primary/10 text-primary">Docker</Badge>
                                  <Badge className="bg-primary/10 text-primary">CI/CD</Badge>
                                  <Badge className="bg-primary/10 text-primary">Kubernetes</Badge>
                                </>
                              )}
                              {test.id === "test5" && (
                                <>
                                  <Badge className="bg-primary/10 text-primary">React</Badge>
                                  <Badge className="bg-primary/10 text-primary">Node.js</Badge>
                                  <Badge className="bg-primary/10 text-primary">MongoDB</Badge>
                                  <Badge className="bg-primary/10 text-primary">TypeScript</Badge>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                    <div className="rounded-full bg-muted p-3 mb-3">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium mb-1">Aucun test sélectionné</h3>
                    <p className="text-sm">Veuillez sélectionner un test pour voir ses détails</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Invitations récentes</CardTitle>
                <CardDescription>Dernières invitations envoyées</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    email: "marie.dupont@example.com",
                    test: "Frontend React",
                    date: "Il y a 2 jours",
                    status: "pending",
                  },
                  {
                    email: "thomas.martin@example.com",
                    test: "Backend Node.js",
                    date: "Il y a 3 jours",
                    status: "completed",
                  },
                  {
                    email: "julie.bernard@example.com",
                    test: "Algorithmes",
                    date: "Il y a 5 jours",
                    status: "expired",
                  },
                ].map((invitation, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                    <div>
                      <p className="font-medium">{invitation.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {invitation.test} • {invitation.date}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        invitation.status === "pending"
                          ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                          : invitation.status === "completed"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : "bg-red-500/10 text-red-500 border-red-500/20"
                      }
                    >
                      {invitation.status === "pending"
                        ? "En attente"
                        : invitation.status === "completed"
                          ? "Complété"
                          : "Expiré"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  Voir toutes les invitations
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardShell>
  )
}

