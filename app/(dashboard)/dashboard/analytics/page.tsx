"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Download, PieChart, TrendingUp, Users } from "lucide-react"
import { motion } from "framer-motion"
import { StatCard } from "@/components/dashboard/stat-card"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { SkillRadarChart } from "@/components/dashboard/skill-radar-chart"

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Analytiques" text="Visualisez et analysez les données de performance.">
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          <span>Exporter les données</span>
        </Button>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <StatCard
            title="Score moyen"
            value={78}
            suffix="%"
            change={5}
            trend="up"
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <StatCard
            title="Taux de réussite"
            value={68}
            suffix="%"
            change={3}
            trend="up"
            icon={<PieChart className="h-4 w-4 text-muted-foreground" />}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <StatCard
            title="Tests par mois"
            value={24}
            change={8}
            trend="up"
            icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <StatCard
            title="Candidats par test"
            value={8}
            change={2}
            trend="up"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Analyse des compétences</CardTitle>
              <CardDescription>Répartition des forces et faiblesses</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <SkillRadarChart detailed />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.7 }}
        className="mt-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Tendances de performance</CardTitle>
            <CardDescription>Évolution des scores sur les 30 derniers jours</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <PerformanceChart />
          </CardContent>
        </Card>
      </motion.div>
    </DashboardShell>
  )
}

