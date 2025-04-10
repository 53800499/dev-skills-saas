/** @format */

"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { TestsTable } from "@/components/dashboard/tests-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { CheckCircle, Clock, Filter, PieChart, Plus, Zap } from "lucide-react";
import { TestsCalendar } from "@/components/dashboard/tests-calendar";
import { SkillDistribution } from "@/components/dashboard/skill-distribution";
import { StatCard } from "@/components/dashboard/stat-card";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TestPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Tests"
        text="Gérez et analysez vos tests d'évaluation.">
        <Link href="/test-session">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span>Commencer le test</span>
          </Button>
        </Link>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}>
          <StatCard
            title="Tests actifs"
            value={18}
            change={3}
            trend="up"
            icon={<Zap className="h-4 w-4 text-muted-foreground" />}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}>
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
          transition={{ duration: 0.3, delay: 0.3 }}>
          <StatCard
            title="Taux de complétion"
            value={87}
            suffix="%"
            change={2}
            trend="up"
            icon={<PieChart className="h-4 w-4 text-muted-foreground" />}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}>
          <StatCard
            title="Temps moyen"
            value={42}
            suffix="min"
            change={-5}
            trend="down"
            icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}>
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tous les tests</CardTitle>
                <CardDescription>
                  Gérez et analysez vos tests d'évaluation
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filtrer</span>
                </Button>
                <Button>Commencer le test</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <TestsTable />
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}>
          <Card>
            <CardHeader>
              <CardTitle>Calendrier des tests</CardTitle>
              <CardDescription>
                Planification des sessions d'évaluation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TestsCalendar />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}>
          <Card>
            <CardHeader>
              <CardTitle>Distribution des compétences</CardTitle>
              <CardDescription>
                Répartition des compétences évaluées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SkillDistribution />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardShell>
  );
}
