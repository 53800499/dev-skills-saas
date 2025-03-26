"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  MoreHorizontal,
  Download,
  Edit,
  Copy,
  Search,
  Filter,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const tests = [
  {
    id: "T001",
    name: "Frontend React",
    description: "Évaluation des compétences en développement frontend avec React",
    candidates: 12,
    avgScore: 85,
    status: "active",
    createdAt: "2024-02-10",
    questions: 15,
    duration: 60,
    skills: ["JavaScript", "React", "CSS", "HTML"],
  },
  {
    id: "T002",
    name: "Backend Node.js",
    description: "Évaluation des compétences en développement backend avec Node.js",
    candidates: 8,
    avgScore: 78,
    status: "active",
    createdAt: "2024-02-12",
    questions: 12,
    duration: 45,
    skills: ["Node.js", "Express", "MongoDB", "API Design"],
  },
  {
    id: "T003",
    name: "Algorithmes et structures de données",
    description: "Évaluation des compétences en algorithmes et structures de données",
    candidates: 15,
    avgScore: 72,
    status: "active",
    createdAt: "2024-02-15",
    questions: 10,
    duration: 90,
    skills: ["Algorithmes", "Structures de données", "Complexité", "Optimisation"],
  },
  {
    id: "T004",
    name: "DevOps",
    description: "Évaluation des compétences en DevOps et CI/CD",
    candidates: 6,
    avgScore: 80,
    status: "active",
    createdAt: "2024-02-18",
    questions: 8,
    duration: 40,
    skills: ["Docker", "CI/CD", "Kubernetes", "Cloud"],
  },
  {
    id: "T005",
    name: "Full Stack",
    description: "Évaluation complète des compétences full stack",
    candidates: 10,
    avgScore: 82,
    status: "draft",
    createdAt: "2024-02-20",
    questions: 20,
    duration: 120,
    skills: ["React", "Node.js", "MongoDB", "TypeScript"],
  },
]

export function TestsTable() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  const [sortField, setSortField] = useState<string>("createdAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [searchQuery, setSearchQuery] = useState("")

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id)
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredTests = tests.filter(
    (test) =>
      test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedTests = [...filteredTests].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    } else if (sortField === "candidates") {
      return sortDirection === "asc" ? a.candidates - b.candidates : b.candidates - a.candidates
    } else if (sortField === "avgScore") {
      return sortDirection === "asc" ? a.avgScore - b.avgScore : b.avgScore - a.avgScore
    } else if (sortField === "createdAt") {
      return sortDirection === "asc"
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
    return 0
  })

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 80) return "text-emerald-500"
    if (score >= 70) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un test..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">
                <button
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                  onClick={() => handleSort("name")}
                >
                  Nom du test {getSortIcon("name")}
                </button>
              </TableHead>
              <TableHead>
                <button
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                  onClick={() => handleSort("candidates")}
                >
                  <Users className="h-4 w-4 mr-1" />
                  Candidats {getSortIcon("candidates")}
                </button>
              </TableHead>
              <TableHead>
                <button
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                  onClick={() => handleSort("avgScore")}
                >
                  Score moyen {getSortIcon("avgScore")}
                </button>
              </TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>
                <button
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                  onClick={() => handleSort("createdAt")}
                >
                  Date de création {getSortIcon("createdAt")}
                </button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTests.map((test) => (
              <>
                <TableRow
                  key={test.id}
                  className="group cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleRow(test.id)}
                >
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{test.name}</span>
                      <span className="text-xs text-muted-foreground truncate max-w-[230px]">{test.description}</span>
                    </div>
                  </TableCell>
                  <TableCell>{test.candidates}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${getScoreColor(test.avgScore)}`}>{test.avgScore}%</span>
                      <Progress
                        value={test.avgScore}
                        className="h-2 w-16"
                        indicatorClassName={
                          test.avgScore >= 90
                            ? "bg-green-500"
                            : test.avgScore >= 80
                              ? "bg-emerald-500"
                              : test.avgScore >= 70
                                ? "bg-yellow-500"
                                : "bg-red-500"
                        }
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        test.status === "active"
                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                          : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                      }
                    >
                      {test.status === "active" ? "Actif" : "Brouillon"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(test.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Modifier</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Dupliquer</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Download className="mr-2 h-4 w-4" />
                          <span>Exporter les résultats</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-destructive">Supprimer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <AnimatePresence>
                  {expandedRow === test.id && (
                    <TableRow key={test.id}>
                      <TableCell colSpan={6} className="p-0">
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden bg-muted/30 px-4 py-3"
                        >
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <h4 className="text-sm font-medium mb-1">Détails du test</h4>
                                <ul className="text-sm space-y-1 text-muted-foreground">
                                  <li>Questions: {test.questions}</li>
                                  <li>Durée: {test.duration} minutes</li>
                                  <li>Candidats: {test.candidates}</li>
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Compétences évaluées</h4>
                                <div className="flex flex-wrap gap-1">
                                  {test.skills.map((skill, index) => (
                                    <Badge key={index} variant="outline" className="bg-primary/10 text-primary">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex justify-end items-end">
                                <Button variant="outline" size="sm" className="gap-1 group">
                                  <span>Voir les détails</span>
                                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </TableCell>
                    </TableRow>
                  )}
                </AnimatePresence>
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

