"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { RecentCandidates } from "@/components/dashboard/recent-candidates"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Filter, Plus, Users } from "lucide-react"
import { motion } from "framer-motion"
import { StatCard } from "@/components/dashboard/stat-card"

export default function CandidatesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Candidats" text="Gérez et suivez les candidats évalués.">
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Ajouter un candidat</span>
        </Button>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <StatCard
            title="Total candidats"
            value={128}
            change={12}
            trend="up"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <StatCard
            title="Candidats actifs"
            value={42}
            change={8}
            trend="up"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <StatCard
            title="Taux de conversion"
            value={68}
            suffix="%"
            change={5}
            trend="up"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <StatCard
            title="Nouveaux ce mois"
            value={24}
            change={15}
            trend="up"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Card className="mt-6">
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
      </motion.div>
    </DashboardShell>
  )
}

