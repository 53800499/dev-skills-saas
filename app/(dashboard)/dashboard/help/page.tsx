"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { useToast } from "@/components/ui/use-toast"
import {
  Search,
  HelpCircle,
  Book,
  MessageSquare,
  FileText,
  Video,
  ChevronRight,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  Send,
  Play,
  Clock,
} from "lucide-react"

export default function HelpPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("faq")
  const [chatMessage, setChatMessage] = useState("")
  const [isSending, setIsSending] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Recherche en cours",
      description: `Recherche de "${searchQuery}"...`,
    })
  }

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return

    setIsSending(true)

    // Simuler l'envoi d'un message
    setTimeout(() => {
      setIsSending(false)
      setChatMessage("")
      toast({
        title: "Message envoyé",
        description: "Un agent vous répondra dans les plus brefs délais.",
      })
    }, 1000)
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Aide & Support" text="Trouvez des réponses à vos questions et obtenez de l'aide." />

      <div className="mb-8">
        <form onSubmit={handleSearch} className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher dans l'aide..."
            className="pl-10 pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" size="sm" className="absolute right-1 top-1/2 h-7 -translate-y-1/2 px-2">
            Rechercher
          </Button>
        </form>
      </div>

      <Tabs defaultValue="faq" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden sm:inline">FAQ</span>
          </TabsTrigger>
          <TabsTrigger value="documentation" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span className="hidden sm:inline">Documentation</span>
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Chat</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Ressources</span>
          </TabsTrigger>
          <TabsTrigger value="tutorials" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span className="hidden sm:inline">Tutoriels</span>
          </TabsTrigger>
        </TabsList>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="faq" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Questions fréquentes</CardTitle>
                  <CardDescription>Réponses aux questions les plus courantes.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      question: "Comment créer un nouveau test ?",
                      answer:
                        "Pour créer un nouveau test, accédez à la section Tests dans le menu latéral, puis cliquez sur le bouton 'Créer un test'. Suivez les étapes pour configurer votre test selon vos besoins.",
                    },
                    {
                      question: "Comment inviter des candidats ?",
                      answer:
                        "Vous pouvez inviter des candidats depuis la page 'Candidats' en cliquant sur 'Inviter'. Entrez l'email du candidat et sélectionnez le test à lui assigner.",
                    },
                    {
                      question: "Comment interpréter les résultats ?",
                      answer:
                        "Les résultats des tests sont présentés sous forme de graphiques et de tableaux détaillés. Vous pouvez voir le score global, les performances par compétence et des analyses détaillées du code soumis.",
                    },
                    {
                      question: "Comment exporter les résultats ?",
                      answer:
                        "Pour exporter les résultats, accédez à la page 'Résultats', sélectionnez les candidats ou tests souhaités, puis cliquez sur le bouton 'Exporter' pour télécharger au format CSV ou PDF.",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      className="space-y-2"
                    >
                      <h3 className="font-medium">{item.question}</h3>
                      <p className="text-sm text-muted-foreground">{item.answer}</p>
                      <div className="pt-1">
                        <Button variant="link" className="h-auto p-0 text-primary">
                          En savoir plus
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full gap-1 group">
                    <span>Voir toutes les FAQ</span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Guides populaires</CardTitle>
                    <CardDescription>Guides les plus consultés par nos utilisateurs.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        title: "Guide de démarrage rapide",
                        description: "Apprenez les bases de DevEval en 10 minutes",
                        icon: <Play className="h-4 w-4" />,
                      },
                      {
                        title: "Création de tests personnalisés",
                        description: "Comment créer des tests adaptés à vos besoins",
                        icon: <FileText className="h-4 w-4" />,
                      },
                      {
                        title: "Analyse des résultats",
                        description: "Comment interpréter les données et prendre des décisions",
                        icon: <BarChart2 className="h-4 w-4" />,
                      },
                    ].map((guide, index) => (
                      <motion.div
                        key={index}
                        custom={index}
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center gap-4 p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {guide.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{guide.title}</h3>
                          <p className="text-sm text-muted-foreground">{guide.description}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Besoin d'aide supplémentaire ?</CardTitle>
                    <CardDescription>Contactez notre équipe de support.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Chat en direct</h3>
                        <p className="text-sm text-muted-foreground">Discutez avec notre équipe de support</p>
                      </div>
                      <Button size="sm" onClick={() => setActiveTab("chat")}>
                        Démarrer
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Email</h3>
                        <p className="text-sm text-muted-foreground">Envoyez-nous un email à support@deveval.com</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Envoyer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documentation" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Documentation</CardTitle>
                  <CardDescription>Explorez notre documentation complète.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Guides</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {[
                        {
                          title: "Premiers pas",
                          description: "Guide de démarrage pour les nouveaux utilisateurs",
                          icon: <Play className="h-4 w-4" />,
                        },
                        {
                          title: "Création de tests",
                          description: "Comment créer et configurer des tests",
                          icon: <FileText className="h-4 w-4" />,
                        },
                        {
                          title: "Gestion des candidats",
                          description: "Inviter et gérer les candidats",
                          icon: <Users className="h-4 w-4" />,
                        },
                        {
                          title: "Analyse des résultats",
                          description: "Comprendre et interpréter les résultats",
                          icon: <BarChart2 className="h-4 w-4" />,
                        },
                      ].map((guide, index) => (
                        <motion.div
                          key={index}
                          custom={index}
                          variants={fadeIn}
                          initial="hidden"
                          animate="visible"
                          className="flex items-start gap-4 p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                        >
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                            {guide.icon}
                          </div>
                          <div>
                            <h4 className="font-medium">{guide.title}</h4>
                            <p className="text-sm text-muted-foreground">{guide.description}</p>
                            <Button variant="link" className="h-auto p-0 text-primary mt-1">
                              Lire le guide
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Référence API</h3>
                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-muted p-4">
                        <h4 className="font-medium">API DevEval</h4>
                        <p className="text-sm text-muted-foreground">Documentation complète de notre API RESTful.</p>
                      </div>
                      <div className="p-4 space-y-3">
                        {[
                          {
                            method: "GET",
                            endpoint: "/api/tests",
                            description: "Récupérer tous les tests",
                          },
                          {
                            method: "POST",
                            endpoint: "/api/tests",
                            description: "Créer un nouveau test",
                          },
                          {
                            method: "GET",
                            endpoint: "/api/candidates",
                            description: "Récupérer tous les candidats",
                          },
                        ].map((api, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Badge
                              variant="outline"
                              className={
                                api.method === "GET"
                                  ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                  : api.method === "POST"
                                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                                    : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                              }
                            >
                              {api.method}
                            </Badge>
                            <code className="text-sm font-mono">{api.endpoint}</code>
                            <span className="text-sm text-muted-foreground">{api.description}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 border-t">
                        <Button variant="outline" className="w-full gap-1 group">
                          <span>Voir la documentation API complète</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Catégories</CardTitle>
                    <CardDescription>Parcourez la documentation par catégorie.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      { name: "Démarrage", count: 5 },
                      { name: "Tests", count: 12 },
                      { name: "Candidats", count: 8 },
                      { name: "Résultats", count: 10 },
                      { name: "Analytiques", count: 7 },
                      { name: "API", count: 15 },
                      { name: "Intégrations", count: 9 },
                      { name: "Sécurité", count: 6 },
                    ].map((category, index) => (
                      <motion.div
                        key={index}
                        custom={index}
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md transition-colors cursor-pointer"
                      >
                        <span>{category.name}</span>
                        <Badge variant="secondary">{category.count}</Badge>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cette page vous a-t-elle aidé ?</CardTitle>
                    <CardDescription>Votre feedback nous aide à améliorer notre documentation.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center gap-4">
                      <Button variant="outline" className="gap-2">
                        <ThumbsUp className="h-4 w-4" />
                        <span>Oui</span>
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <ThumbsDown className="h-4 w-4" />
                        <span>Non</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle>Chat avec le support</CardTitle>
                <CardDescription>Discutez en direct avec notre équipe de support.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto border rounded-md p-4 space-y-4">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Support" />
                    <AvatarFallback>S</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-sm">
                      Bonjour ! Je suis Marie du support DevEval. Comment puis-je vous aider aujourd'hui ?
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">10:30</p>
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <div className="bg-primary/10 p-3 rounded-lg rounded-tr-none max-w-[80%]">
                    <p className="text-sm">
                      Bonjour Marie, j'ai des questions sur la création de tests personnalisés. Comment puis-je ajouter
                      des questions de code avec des tests automatisés ?
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">10:32</p>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                    <AvatarFallback>Y</AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Support" />
                    <AvatarFallback>S</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-sm">
                      Bien sûr ! Pour ajouter des questions de code avec des tests automatisés, vous devez :
                    </p>
                    <ol className="text-sm list-decimal pl-5 space-y-1 mt-2">
                      <li>Aller dans la section "Tests" et cliquer sur "Créer un test"</li>
                      <li>Sélectionner "Question de code" comme type de question</li>
                      <li>Écrire l'énoncé de votre question</li>
                      <li>Dans l'onglet "Tests", ajouter vos cas de test</li>
                      <li>Vous pouvez définir des tests unitaires qui seront exécutés automatiquement</li>
                    </ol>
                    <p className="text-sm mt-2">Voulez-vous que je vous montre un exemple ?</p>
                    <p className="text-xs text-muted-foreground mt-1">10:35</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <div className="flex w-full gap-2">
                  <Textarea
                    placeholder="Écrivez votre message..."
                    className="min-h-10 flex-1"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                  />
                  <Button size="icon" onClick={handleSendMessage} disabled={!chatMessage.trim() || isSending}>
                    {isSending ? (
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
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ressources</CardTitle>
                  <CardDescription>
                    Téléchargez des ressources utiles pour votre utilisation de DevEval.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "Guide de l'utilisateur",
                      description: "Manuel complet d'utilisation de DevEval",
                      type: "PDF",
                      size: "2.4 MB",
                      icon: <FileText className="h-4 w-4" />,
                    },
                    {
                      title: "Modèles de tests",
                      description: "Collection de modèles de tests prêts à l'emploi",
                      type: "ZIP",
                      size: "4.1 MB",
                      icon: <FileArchive className="h-4 w-4" />,
                    },
                    {
                      title: "Intégration API",
                      description: "Documentation technique pour l'intégration API",
                      type: "PDF",
                      size: "1.8 MB",
                      icon: <FileCode className="h-4 w-4" />,
                    },
                    {
                      title: "Bonnes pratiques",
                      description: "Guide des bonnes pratiques pour l'évaluation technique",
                      type: "PDF",
                      size: "3.2 MB",
                      icon: <FileCheck className="h-4 w-4" />,
                    },
                  ].map((resource, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      className="flex items-center gap-4 p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                        {resource.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{resource.type}</Badge>
                          <span className="text-xs text-muted-foreground">{resource.size}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Centre de ressources</CardTitle>
                  <CardDescription>Explorez notre bibliothèque de ressources.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Articles récents</h3>
                    {[
                      {
                        title: "5 façons d'améliorer vos tests techniques",
                        date: "Il y a 2 jours",
                        readTime: "5 min",
                      },
                      {
                        title: "Comment évaluer efficacement les compétences en algorithmes",
                        date: "Il y a 1 semaine",
                        readTime: "8 min",
                      },
                      {
                        title: "Les meilleures pratiques pour l'évaluation des développeurs frontend",
                        date: "Il y a 2 semaines",
                        readTime: "6 min",
                      },
                    ].map((article, index) => (
                      <motion.div
                        key={index}
                        custom={index}
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className="p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <h4 className="font-medium">{article.title}</h4>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span>{article.date}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {article.readTime}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Webinaires</h3>
                    {[
                      {
                        title: "Maîtriser l'évaluation technique des candidats",
                        date: "15 mars 2024",
                        status: "upcoming",
                      },
                      {
                        title: "Comment analyser les résultats des tests techniques",
                        date: "28 février 2024",
                        status: "recorded",
                      },
                    ].map((webinar, index) => (
                      <motion.div
                        key={index}
                        custom={index}
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className="p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{webinar.title}</h4>
                          <Badge
                            variant="outline"
                            className={
                              webinar.status === "upcoming"
                                ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                : "bg-green-500/10 text-green-500 border-green-500/20"
                            }
                          >
                            {webinar.status === "upcoming" ? "À venir" : "Enregistré"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{webinar.date}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full gap-1 group">
                    <span>Explorer toutes les ressources</span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Démarrage rapide avec DevEval",
                  description: "Apprenez les bases de DevEval en 10 minutes",
                  duration: "10:25",
                  level: "Débutant",
                  image: "/placeholder.svg?height=180&width=320",
                },
                {
                  title: "Création de tests personnalisés",
                  description: "Apprenez à créer des tests adaptés à vos besoins",
                  duration: "15:40",
                  level: "Intermédiaire",
                  image: "/placeholder.svg?height=180&width=320",
                },
                {
                  title: "Analyse avancée des résultats",
                  description: "Techniques d'analyse pour prendre de meilleures décisions",
                  duration: "12:15",
                  level: "Avancé",
                  image: "/placeholder.svg?height=180&width=320",
                },
                {
                  title: "Configuration des intégrations",
                  description: "Connectez DevEval à vos outils existants",
                  duration: "08:30",
                  level: "Intermédiaire",
                  image: "/placeholder.svg?height=180&width=320",
                },
                {
                  title: "Gestion des candidats",
                  description: "Optimisez votre processus de gestion des candidats",
                  duration: "11:45",
                  level: "Débutant",
                  image: "/placeholder.svg?height=180&width=320",
                },
                {
                  title: "Utilisation de l'API",
                  description: "Automatisez vos processus avec l'API DevEval",
                  duration: "18:20",
                  level: "Avancé",
                  image: "/placeholder.svg?height=180&width=320",
                },
              ].map((tutorial, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  className="border rounded-lg overflow-hidden group cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={tutorial.image || "/placeholder.svg"}
                      alt={tutorial.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-primary/80 flex items-center justify-center">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {tutorial.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="outline"
                        className={
                          tutorial.level === "Débutant"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : tutorial.level === "Intermédiaire"
                              ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                              : "bg-purple-500/10 text-purple-500 border-purple-500/20"
                        }
                      >
                        {tutorial.level}
                      </Badge>
                      <span className="text-xs text-muted-foreground">Tutoriel vidéo</span>
                    </div>
                    <h3 className="font-medium">{tutorial.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{tutorial.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Parcours d'apprentissage</CardTitle>
                <CardDescription>Suivez nos parcours d'apprentissage pour maîtriser DevEval.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "Parcours débutant",
                    description: "Les bases essentielles pour bien démarrer",
                    progress: 75,
                    modules: 5,
                    completed: 3,
                  },
                  {
                    title: "Parcours recruteur",
                    description: "Optimisez votre processus de recrutement technique",
                    progress: 30,
                    modules: 8,
                    completed: 2,
                  },
                  {
                    title: "Parcours administrateur",
                    description: "Configuration avancée et gestion de la plateforme",
                    progress: 0,
                    modules: 6,
                    completed: 0,
                  },
                ].map((path, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    className="border rounded-md p-4 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{path.title}</h3>
                        <p className="text-sm text-muted-foreground">{path.description}</p>
                      </div>
                      {path.progress > 0 ? (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          En cours
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-muted text-muted-foreground">
                          Non commencé
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          {path.completed} / {path.modules} modules
                        </span>
                        <span>{path.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${path.progress}%` }}></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-1 group">
                  <span>Voir tous les parcours</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </motion.div>
      </Tabs>
    </DashboardShell>
  )
}

function Calendar({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}

function Download({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}

function Mail({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function FileArchive({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <rect width="8" height="5" x="8" y="12" rx="1" />
    </svg>
  )
}

function FileCode({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m10 13-2 2 2 2" />
      <path d="m14 17 2-2-2-2" />
    </svg>
  )
}

function FileCheck({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m9 15 2 2 4-4" />
    </svg>
  )
}

function BarChart2({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="18" x2="18" y1="20" y2="10" />
      <line x1="12" x2="12" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="14" />
    </svg>
  )
}

function Users({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

