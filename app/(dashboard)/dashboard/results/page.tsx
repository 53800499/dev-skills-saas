"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, CheckCircle, Download, Filter, Search } from "lucide-react"
import { motion } from "framer-motion"
import { StatCard } from "@/components/dashboard/stat-card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { PerformanceChart } from "@/components/dashboard/performance-chart"

export default function ResultsPage() {
  const results = [
    {
      id: "R001",
      candidate: {
        name: "Sophie Martin",
        email: "sophie.martin@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      test: "Frontend React",
      score: 92,
      date: "2024-02-28",
      status: "completed",
    },
    {
      id: "R002",
      candidate: {
        name: "Thomas Dubois",
        email: "thomas.dubois@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      test: "Backend Node.js",
      score: 85,
      date: "2024-02-26",
      status: "completed",
    },
    {
      id: "R003",
      candidate: {
        name: "Emma Leroy",
        email: "emma.leroy@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      test: "Algorithmes",
      score: 78,
      date: "2024-02-24",
      status: "completed",
    },
    {
      id: "R004",
      candidate: {
        name: "Lucas Bernard",
        email: "lucas.bernard@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      test: "DevOps",
      score: 88,
      date: "2024-02-22",
      status: "completed",
    },
    {
      id: "R005",
      candidate: {
        name: "Camille Petit",
        email: "camille.petit@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      test: "Full Stack",
      score: 90,
      date: "2024-02-20",
      status: "completed",
    },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 80) return "text-emerald-500"
    if (score >= 70) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Résultats" text="Consultez et analysez les résultats des tests.">
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          <span>Exporter les résultats</span>
        </Button>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <StatCard
            title="Tests complétés"
            value={42}
            change={8}
            trend="up"
            icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <StatCard
            title="Score moyen"
            value={78}
            suffix="%"
            change={5}
            trend="up"
            icon={<BarChart2 className="h-4 w-4 text-muted-foreground" />}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <StatCard
            title="Taux de réussite"
            value={85}
            suffix="%"
            change={3}
            trend="up"
            icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <StatCard
            title="Résultats ce mois"
            value={24}
            change={12}
            trend="up"
            icon={<BarChart2 className="h-4 w-4 text-muted-foreground" />}
          />
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 my-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher un résultat..." className="pl-10 pr-10" />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            <span>Filtrer</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            <span>Exporter</span>
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Résultats récents</CardTitle>
            <CardDescription>Liste des derniers résultats de tests</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Candidat</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={result.candidate.avatar} alt={result.candidate.name} />
                          <AvatarFallback>{result.candidate.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div>{result.candidate.name}</div>
                          <div className="text-xs text-muted-foreground">{result.candidate.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        {result.test}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${getScoreColor(result.score)}`}>{result.score}%</span>
                        <Progress
                          value={result.score}
                          className="h-2 w-16"
                          indicatorClassName={
                            result.score >= 90
                              ? "bg-green-500"
                              : result.score >= 80
                                ? "bg-emerald-500"
                                : result.score >= 70
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(result.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Complété
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="mt-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Performance par compétence</CardTitle>
            <CardDescription>Scores moyens par domaine de compétence</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <PerformanceChart bySkill />
          </CardContent>
        </Card>
      </motion.div>
    </DashboardShell>
  )
}

