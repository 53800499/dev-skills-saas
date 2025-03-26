"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Activity,
  Users,
  Code,
  CheckCircle,
  Clock,
  Calendar,
  BarChart2,
  PieChart,
  TrendingUp,
  Award,
  Zap,
  ChevronRight,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { SkillRadarChart } from "@/components/dashboard/skill-radar-chart"
import { TestsCalendar } from "@/components/dashboard/tests-calendar"
import { RecentCandidates } from "@/components/dashboard/recent-candidates"
import { TestsTable } from "@/components/dashboard/tests-table"
import { StatCard } from "@/components/dashboard/stat-card"
import { NotificationCenter } from "@/components/dashboard/notification-center"
import { UpcomingTests } from "@/components/dashboard/upcoming-tests"
import { SkillDistribution } from "@/components/dashboard/skill-distribution"
import { useToast } from "@/components/ui/use-toast"

export default function DashboardPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [showNotifications, setShowNotifications] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 50)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)
    setProgress(0)

    toast({
      title: "Actualisation en cours",
      description: "Les données sont en cours de mise à jour...",
    })

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Actualisation terminée",
        description: "Les données ont été mises à jour avec succès.",
      })
    }, 1500)
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
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <motion.div
              className="w-16 h-16 mb-4 relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Code className="w-16 h-16 text-primary/30" />
              <Code className="w-16 h-16 text-primary absolute inset-0 opacity-70" />
            </motion.div>
            <h3 className="text-xl font-medium mb-2">Chargement du tableau de bord</h3>
            <div className="w-64 mb-2">
              <Progress value={progress} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground">Préparation de vos données...</p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="flex justify-between items-center mb-8">
        <DashboardHeader heading="Tableau de bord" text="Bienvenue sur votre tableau de bord personnalisé." />
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-1 group" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
            <span>Actualiser</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <div className="relative">
              <Activity className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
            </div>
            <span>Notifications</span>
          </Button>
          <Button>Nouveau test</Button>
        </div>
      </div>

      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 overflow-hidden"
          >
            <NotificationCenter onClose={() => setShowNotifications(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <Tabs defaultValue="overview" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="overview" className="relative overflow-hidden group">
            <span className="relative z-10 flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span>Vue d'ensemble</span>
            </span>
            <span className="absolute inset-0 bg-primary/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300"></span>
          </TabsTrigger>
          <TabsTrigger value="tests" className="relative overflow-hidden group">
            <span className="relative z-10 flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>Tests</span>
            </span>
            <span className="absolute inset-0 bg-primary/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300"></span>
          </TabsTrigger>
          <TabsTrigger value="candidates" className="relative overflow-hidden group">
            <span className="relative z-10 flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Candidats</span>
            </span>
            <span className="absolute inset-0 bg-primary/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300"></span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="relative overflow-hidden group">
            <span className="relative z-10 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span>Analytiques</span>
            </span>
            <span className="absolute inset-0 bg-primary/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300"></span>
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <motion.div custom={0} variants={fadeIn} initial="hidden" animate="visible">
                  <StatCard
                    title="Tests complétés"
                    value={42}
                    change={8}
                    trend="up"
                    icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
                  />
                </motion.div>
                <motion.div custom={1} variants={fadeIn} initial="hidden" animate="visible">
                  <StatCard
                    title="Candidats évalués"
                    value={128}
                    change={12}
                    trend="up"
                    icon={<Users className="h-4 w-4 text-muted-foreground" />}
                  />
                </motion.div>
                <motion.div custom={2} variants={fadeIn} initial="hidden" animate="visible">
                  <StatCard
                    title="Score moyen"
                    value={78}
                    suffix="%"
                    change={5}
                    trend="up"
                    icon={<Award className="h-4 w-4 text-muted-foreground" />}
                  />
                </motion.div>
                <motion.div custom={3} variants={fadeIn} initial="hidden" animate="visible">
                  <StatCard
                    title="Tests en attente"
                    value={15}
                    change={3}
                    trend="down"
                    icon={<Clock className="h-4 w-4 text-muted-foreground" />}
                  />
                </motion.div>
              </div>

              <div className="grid gap-4 md:grid-cols-7">
                <motion.div className="col-span-4" custom={4} variants={fadeIn} initial="hidden" animate="visible">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div className="space-y-1">
                        <CardTitle>Performance des candidats</CardTitle>
                        <CardDescription>Évolution des scores sur les 30 derniers jours</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                          <Filter className="h-3.5 w-3.5" />
                          <span>Filtrer</span>
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                          <Download className="h-3.5 w-3.5" />
                          <span>Exporter</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <PerformanceChart />
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div className="col-span-3" custom={5} variants={fadeIn} initial="hidden" animate="visible">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Compétences évaluées</CardTitle>
                      <CardDescription>Distribution des compétences testées</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                      <SkillRadarChart />
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <motion.div custom={6} variants={fadeIn} initial="hidden" animate="visible" className="md:col-span-1">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Tests à venir</CardTitle>
                      <CardDescription>Prochaines sessions planifiées</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <UpcomingTests />
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full gap-1 group">
                        <span>Voir tous les tests</span>
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
                <motion.div custom={7} variants={fadeIn} initial="hidden" animate="visible" className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Candidats récents</CardTitle>
                      <CardDescription>Les derniers candidats évalués</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentCandidates />
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full gap-1 group">
                        <span>Voir tous les candidats</span>
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="tests" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  title="Tests actifs"
                  value={18}
                  change={3}
                  trend="up"
                  icon={<Zap className="h-4 w-4 text-muted-foreground" />}
                />
                <StatCard
                  title="Tests complétés"
                  value={42}
                  change={8}
                  trend="up"
                  icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
                />
                <StatCard
                  title="Taux de complétion"
                  value={87}
                  suffix="%"
                  change={2}
                  trend="up"
                  icon={<PieChart className="h-4 w-4 text-muted-foreground" />}
                />
                <StatCard
                  title="Temps moyen"
                  value={42}
                  suffix="min"
                  change={-5}
                  trend="down"
                  icon={<Clock className="h-4 w-4 text-muted-foreground" />}
                />
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Tous les tests</CardTitle>
                      <CardDescription>Gérez et analysez vos tests d'évaluation</CardDescription>
                    </div>
                    <Button>Créer un test</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <TestsTable />
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Calendrier des tests</CardTitle>
                    <CardDescription>Planification des sessions d'évaluation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TestsCalendar />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Distribution des compétences</CardTitle>
                    <CardDescription>Répartition des compétences évaluées</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SkillDistribution />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="candidates" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Candidats</CardTitle>
                      <CardDescription>Liste de tous les candidats évalués</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="gap-1">
                        <Filter className="h-4 w-4" />
                        <span>Filtrer</span>
                      </Button>
                      <Button variant="outline" className="gap-1">
                        <Download className="h-4 w-4" />
                        <span>Exporter</span>
                      </Button>
                      <Button>Ajouter un candidat</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <RecentCandidates extended />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  title="Score moyen"
                  value={78}
                  suffix="%"
                  change={5}
                  trend="up"
                  icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
                />
                <StatCard
                  title="Taux de réussite"
                  value={68}
                  suffix="%"
                  change={3}
                  trend="up"
                  icon={<PieChart className="h-4 w-4 text-muted-foreground" />}
                />
                <StatCard
                  title="Tests par mois"
                  value={24}
                  change={8}
                  trend="up"
                  icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
                />
                <StatCard
                  title="Candidats par test"
                  value={8}
                  change={2}
                  trend="up"
                  icon={<Users className="h-4 w-4 text-muted-foreground" />}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance par compétence</CardTitle>
                    <CardDescription>Scores moyens par domaine de compétence</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <PerformanceChart bySkill />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Analyse des compétences</CardTitle>
                    <CardDescription>Répartition des forces et faiblesses</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <SkillRadarChart detailed />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </DashboardShell>
  )
}

