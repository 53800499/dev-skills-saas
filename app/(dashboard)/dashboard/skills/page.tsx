"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { useToast } from "@/components/ui/use-toast"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Save,
  Filter,
  Download,
  BarChart2,
  PieChart,
  Code,
  Database,
  Server,
  Layout,
  Smartphone,
  Cloud,
  Shield,
  GitBranch,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

export default function SkillsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [sortField, setSortField] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [showAddSkill, setShowAddSkill] = useState(false)
  const [editingSkill, setEditingSkill] = useState<any>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Recherche en cours",
      description: `Recherche de "${searchQuery}"...`,
    })
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleAddSkill = () => {
    setShowAddSkill(false)
    toast({
      title: "Compétence ajoutée",
      description: "La compétence a été ajoutée avec succès.",
    })
  }

  const handleEditSkill = (skill: any) => {
    setEditingSkill(skill)
  }

  const handleSaveEdit = () => {
    setEditingSkill(null)
    toast({
      title: "Compétence mise à jour",
      description: "La compétence a été mise à jour avec succès.",
    })
  }

  const handleDeleteSkill = (skillId: string) => {
    toast({
      title: "Compétence supprimée",
      description: "La compétence a été supprimée avec succès.",
    })
  }

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  const skills = [
    {
      id: "skill-1",
      name: "JavaScript",
      category: "frontend",
      description: "Langage de programmation pour le développement web frontend",
      level: "advanced",
      tests: 15,
      candidates: 48,
      avgScore: 82,
    },
    {
      id: "skill-2",
      name: "React",
      category: "frontend",
      description: "Bibliothèque JavaScript pour la création d'interfaces utilisateur",
      level: "advanced",
      tests: 12,
      candidates: 42,
      avgScore: 78,
    },
    {
      id: "skill-3",
      name: "Node.js",
      category: "backend",
      description: "Environnement d'exécution JavaScript côté serveur",
      level: "advanced",
      tests: 10,
      candidates: 38,
      avgScore: 75,
    },
    {
      id: "skill-4",
      name: "SQL",
      category: "database",
      description: "Langage de requête structuré pour les bases de données",
      level: "intermediate",
      tests: 8,
      candidates: 35,
      avgScore: 80,
    },
    {
      id: "skill-5",
      name: "Python",
      category: "backend",
      description: "Langage de programmation polyvalent",
      level: "intermediate",
      tests: 14,
      candidates: 40,
      avgScore: 76,
    },
    {
      id: "skill-6",
      name: "Docker",
      category: "devops",
      description: "Plateforme de conteneurisation",
      level: "intermediate",
      tests: 6,
      candidates: 25,
      avgScore: 72,
    },
    {
      id: "skill-7",
      name: "AWS",
      category: "cloud",
      description: "Services cloud d'Amazon Web Services",
      level: "advanced",
      tests: 7,
      candidates: 30,
      avgScore: 68,
    },
    {
      id: "skill-8",
      name: "TypeScript",
      category: "frontend",
      description: "Surensemble typé de JavaScript",
      level: "advanced",
      tests: 9,
      candidates: 36,
      avgScore: 74,
    },
  ]

  const filteredSkills = skills.filter(
    (skill) =>
      (activeTab === "all" || skill.category === activeTab) &&
      (skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const sortedSkills = [...filteredSkills].sort((a, b) => {
    let comparison = 0

    if (sortField === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortField === "category") {
      comparison = a.category.localeCompare(b.category)
    } else if (sortField === "level") {
      const levelOrder = { beginner: 0, intermediate: 1, advanced: 2 }
      comparison = levelOrder[a.level as keyof typeof levelOrder] - levelOrder[b.level as keyof typeof levelOrder]
    } else if (sortField === "tests") {
      comparison = a.tests - b.tests
    } else if (sortField === "candidates") {
      comparison = a.candidates - b.candidates
    } else if (sortField === "avgScore") {
      comparison = a.avgScore - b.avgScore
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "frontend":
        return <Layout className="h-4 w-4" />
      case "backend":
        return <Server className="h-4 w-4" />
      case "database":
        return <Database className="h-4 w-4" />
      case "devops":
        return <GitBranch className="h-4 w-4" />
      case "cloud":
        return <Cloud className="h-4 w-4" />
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "security":
        return <Shield className="h-4 w-4" />
      default:
        return <Code className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "frontend":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "backend":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "database":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "devops":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "cloud":
        return "bg-cyan-500/10 text-cyan-500 border-cyan-500/20"
      case "mobile":
        return "bg-pink-500/10 text-pink-500 border-pink-500/20"
      case "security":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "intermediate":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "advanced":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Compétences" text="Gérez les compétences évaluées sur votre plateforme.">
        <Button onClick={() => setShowAddSkill(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Ajouter une compétence</span>
        </Button>
      </DashboardHeader>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher une compétence..."
              className="pl-10 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="sm" className="absolute right-1 top-1/2 h-7 -translate-y-1/2 px-2">
              Rechercher
            </Button>
          </form>
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

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span>Toutes</span>
          </TabsTrigger>
          <TabsTrigger value="frontend" className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            <span>Frontend</span>
          </TabsTrigger>
          <TabsTrigger value="backend" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            <span>Backend</span>
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Base de données</span>
          </TabsTrigger>
          <TabsTrigger value="devops" className="flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            <span>DevOps</span>
          </TabsTrigger>
          <TabsTrigger value="cloud" className="flex items-center gap-2">
            <Cloud className="h-4 w-4" />
            <span>Cloud</span>
          </TabsTrigger>
        </TabsList>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {showAddSkill ? (
            <Card>
              <CardHeader>
                <CardTitle>Ajouter une compétence</CardTitle>
                <CardDescription>Créez une nouvelle compétence à évaluer.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="skill-name">Nom de la compétence</Label>
                    <Input id="skill-name" placeholder="ex: JavaScript" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skill-category">Catégorie</Label>
                    <Select defaultValue="frontend">
                      <SelectTrigger id="skill-category">
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">Frontend</SelectItem>
                        <SelectItem value="backend">Backend</SelectItem>
                        <SelectItem value="database">Base de données</SelectItem>
                        <SelectItem value="devops">DevOps</SelectItem>
                        <SelectItem value="cloud">Cloud</SelectItem>
                        <SelectItem value="mobile">Mobile</SelectItem>
                        <SelectItem value="security">Sécurité</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skill-description">Description</Label>
                  <Textarea id="skill-description" placeholder="Décrivez cette compétence..." rows={3} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="skill-level">Niveau</Label>
                    <Select defaultValue="intermediate">
                      <SelectTrigger id="skill-level">
                        <SelectValue placeholder="Sélectionnez un niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Débutant</SelectItem>
                        <SelectItem value="intermediate">Intermédiaire</SelectItem>
                        <SelectItem value="advanced">Avancé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skill-tags">Tags (séparés par des virgules)</Label>
                    <Input id="skill-tags" placeholder="ex: web, programmation" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setShowAddSkill(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddSkill} className="gap-2">
                  <Save className="h-4 w-4" />
                  <span>Enregistrer</span>
                </Button>
              </CardFooter>
            </Card>
          ) : editingSkill ? (
            <Card>
              <CardHeader>
                <CardTitle>Modifier la compétence</CardTitle>
                <CardDescription>Modifiez les détails de la compétence.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-skill-name">Nom de la compétence</Label>
                    <Input id="edit-skill-name" defaultValue={editingSkill.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-skill-category">Catégorie</Label>
                    <Select defaultValue={editingSkill.category}>
                      <SelectTrigger id="edit-skill-category">
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">Frontend</SelectItem>
                        <SelectItem value="backend">Backend</SelectItem>
                        <SelectItem value="database">Base de données</SelectItem>
                        <SelectItem value="devops">DevOps</SelectItem>
                        <SelectItem value="cloud">Cloud</SelectItem>
                        <SelectItem value="mobile">Mobile</SelectItem>
                        <SelectItem value="security">Sécurité</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-skill-description">Description</Label>
                  <Textarea id="edit-skill-description" defaultValue={editingSkill.description} rows={3} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-skill-level">Niveau</Label>
                    <Select defaultValue={editingSkill.level}>
                      <SelectTrigger id="edit-skill-level">
                        <SelectValue placeholder="Sélectionnez un niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Débutant</SelectItem>
                        <SelectItem value="intermediate">Intermédiaire</SelectItem>
                        <SelectItem value="advanced">Avancé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-skill-tags">Tags (séparés par des virgules)</Label>
                    <Input id="edit-skill-tags" defaultValue="web, programmation" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setEditingSkill(null)}>
                  Annuler
                </Button>
                <Button onClick={handleSaveEdit} className="gap-2">
                  <Save className="h-4 w-4" />
                  <span>Enregistrer</span>
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Liste des compétences</CardTitle>
                <CardDescription>{sortedSkills.length} compétences trouvées.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">
                        <button
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                          onClick={() => handleSort("name")}
                        >
                          Nom {getSortIcon("name")}
                        </button>
                      </TableHead>
                      <TableHead>
                        <button
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                          onClick={() => handleSort("category")}
                        >
                          Catégorie {getSortIcon("category")}
                        </button>
                      </TableHead>
                      <TableHead>
                        <button
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                          onClick={() => handleSort("level")}
                        >
                          Niveau {getSortIcon("level")}
                        </button>
                      </TableHead>
                      <TableHead>
                        <button
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                          onClick={() => handleSort("tests")}
                        >
                          Tests {getSortIcon("tests")}
                        </button>
                      </TableHead>
                      <TableHead>
                        <button
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                          onClick={() => handleSort("candidates")}
                        >
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
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedSkills.map((skill, index) => (
                      <motion.tr
                        key={skill.id}
                        custom={index}
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className="group hover:bg-muted/50 transition-colors"
                      >
                        <TableCell className="font-medium">{skill.name}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`flex items-center gap-1 ${getCategoryColor(skill.category)}`}
                          >
                            {getCategoryIcon(skill.category)}
                            <span className="capitalize">{skill.category}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getLevelColor(skill.level)}>
                            {skill.level === "beginner" && "Débutant"}
                            {skill.level === "intermediate" && "Intermédiaire"}
                            {skill.level === "advanced" && "Avancé"}
                          </Badge>
                        </TableCell>
                        <TableCell>{skill.tests}</TableCell>
                        <TableCell>{skill.candidates}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{skill.avgScore}%</span>
                            <Progress
                              value={skill.avgScore}
                              className="h-2 w-16"
                              indicatorClassName={
                                skill.avgScore >= 80
                                  ? "bg-green-500"
                                  : skill.avgScore >= 70
                                    ? "bg-blue-500"
                                    : "bg-yellow-500"
                              }
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleEditSkill(skill)}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Modifier</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <BarChart2 className="mr-2 h-4 w-4" />
                                <span>Voir les statistiques</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeleteSkill(skill.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Supprimer</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {!showAddSkill && !editingSkill && (
            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribution des compétences</CardTitle>
                  <CardDescription>Répartition des compétences par catégorie.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <PieChart className="h-48 w-48 text-muted-foreground" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Scores moyens par catégorie</CardTitle>
                  <CardDescription>Performance des candidats par catégorie de compétence.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <BarChart2 className="h-48 w-48 text-muted-foreground" />
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      </Tabs>
    </DashboardShell>
  )
}

