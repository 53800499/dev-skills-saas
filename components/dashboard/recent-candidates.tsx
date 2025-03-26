"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronDown, ChevronUp, ChevronRight, MoreHorizontal, Download, Mail } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const candidates = [
  {
    id: "C001",
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    test: "Frontend React",
    score: 92,
    date: "2024-02-28",
    status: "completed",
    skills: [
      { name: "JavaScript", score: 95 },
      { name: "React", score: 90 },
      { name: "CSS", score: 88 },
      { name: "HTML", score: 94 },
    ],
  },
  {
    id: "C002",
    name: "Thomas Dubois",
    email: "thomas.dubois@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    test: "Backend Node.js",
    score: 85,
    date: "2024-02-26",
    status: "completed",
    skills: [
      { name: "Node.js", score: 87 },
      { name: "Express", score: 85 },
      { name: "MongoDB", score: 82 },
      { name: "API Design", score: 86 },
    ],
  },
  {
    id: "C003",
    name: "Emma Leroy",
    email: "emma.leroy@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    test: "Algorithmes",
    score: 78,
    date: "2024-02-24",
    status: "completed",
    skills: [
      { name: "Algorithmes", score: 80 },
      { name: "Structures de données", score: 75 },
      { name: "Complexité", score: 78 },
      { name: "Optimisation", score: 79 },
    ],
  },
  {
    id: "C004",
    name: "Lucas Bernard",
    email: "lucas.bernard@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    test: "DevOps",
    score: 88,
    date: "2024-02-22",
    status: "completed",
    skills: [
      { name: "Docker", score: 90 },
      { name: "CI/CD", score: 85 },
      { name: "Kubernetes", score: 87 },
      { name: "Cloud", score: 89 },
    ],
  },
  {
    id: "C005",
    name: "Camille Petit",
    email: "camille.petit@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    test: "Full Stack",
    score: 90,
    date: "2024-02-20",
    status: "completed",
    skills: [
      { name: "React", score: 92 },
      { name: "Node.js", score: 88 },
      { name: "MongoDB", score: 90 },
      { name: "TypeScript", score: 91 },
    ],
  },
]

interface RecentCandidatesProps {
  extended?: boolean
}

export function RecentCandidates({ extended = false }: RecentCandidatesProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  const [sortField, setSortField] = useState<string>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

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

  const sortedCandidates = [...candidates].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    } else if (sortField === "score") {
      return sortDirection === "asc" ? a.score - b.score : b.score - a.score
    } else if (sortField === "date") {
      return sortDirection === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    }
    return 0
  })

  const displayCandidates = extended ? sortedCandidates : sortedCandidates.slice(0, 4)

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
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">
              <button
                className="flex items-center gap-1 hover:text-primary transition-colors"
                onClick={() => handleSort("name")}
              >
                Candidat {getSortIcon("name")}
              </button>
            </TableHead>
            <TableHead>
              <button
                className="flex items-center gap-1 hover:text-primary transition-colors"
                onClick={() => handleSort("score")}
              >
                Score {getSortIcon("score")}
              </button>
            </TableHead>
            <TableHead className={extended ? "w-[180px]" : "hidden md:table-cell"}>Test</TableHead>
            <TableHead className={extended ? "w-[120px]" : "hidden md:table-cell"}>
              <button
                className="flex items-center gap-1 hover:text-primary transition-colors"
                onClick={() => handleSort("date")}
              >
                Date {getSortIcon("date")}
              </button>
            </TableHead>
            {extended && <TableHead className="w-[100px] text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayCandidates.map((candidate) => (
            <>
              <TableRow
                key={candidate.id}
                className="group cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleRow(candidate.id)}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={candidate.avatar} alt={candidate.name} />
                      <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div>{candidate.name}</div>
                      {extended && <div className="text-xs text-muted-foreground">{candidate.email}</div>}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${getScoreColor(candidate.score)}`}>{candidate.score}%</span>
                    <Progress
                      value={candidate.score}
                      className="h-2 w-16"
                      indicatorClassName={
                        candidate.score >= 90
                          ? "bg-green-500"
                          : candidate.score >= 80
                            ? "bg-emerald-500"
                            : candidate.score >= 70
                              ? "bg-yellow-500"
                              : "bg-red-500"
                      }
                    />
                  </div>
                </TableCell>
                <TableCell className={extended ? "" : "hidden md:table-cell"}>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {candidate.test}
                  </Badge>
                </TableCell>
                <TableCell className={extended ? "" : "hidden md:table-cell"}>
                  {new Date(candidate.date).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                {extended && (
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
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Contacter</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Download className="mr-2 h-4 w-4" />
                          <span>Exporter le rapport</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-destructive">Supprimer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
              <AnimatePresence>
                {expandedRow === candidate.id && (
                  <TableRow key={candidate.id}>
                    <TableCell colSpan={extended ? 5 : 4} className="p-0">
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden bg-muted/30 px-4 py-3"
                      >
                        <div className="space-y-3">
                          <h4 className="font-medium">Détails des compétences</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {candidate.skills.map((skill, index) => (
                              <div key={index} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>{skill.name}</span>
                                  <span className={getScoreColor(skill.score)}>{skill.score}%</span>
                                </div>
                                <Progress
                                  value={skill.score}
                                  className="h-2"
                                  indicatorClassName={
                                    skill.score >= 90
                                      ? "bg-green-500"
                                      : skill.score >= 80
                                        ? "bg-emerald-500"
                                        : skill.score >= 70
                                          ? "bg-yellow-500"
                                          : "bg-red-500"
                                  }
                                />
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-end">
                            <Button variant="outline" size="sm" className="gap-1 group">
                              <span>Voir le rapport complet</span>
                              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
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
  )
}

