"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { useToast } from "@/components/ui/use-toast"
import {
  User,
  Building2,
  Bell,
  Lock,
  Link,
  Upload,
  Save,
  Globe,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Key,
  LogOut,
  AlertTriangle,
  Check,
} from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("profile")
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)

    // Simuler une sauvegarde
    setTimeout(() => {
      setSaving(false)
      toast({
        title: "Paramètres sauvegardés",
        description: "Vos modifications ont été enregistrées avec succès.",
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
      <DashboardHeader heading="Paramètres" text="Gérez vos préférences et paramètres de compte." />

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full max-w-4xl">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Entreprise</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Sécurité</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            <span className="hidden sm:inline">Intégrations</span>
          </TabsTrigger>
        </TabsList>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>Mettez à jour vos informations personnelles et vos préférences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Avatar" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Upload className="h-4 w-4" />
                      <span>Changer la photo</span>
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Titre / Poste</Label>
                      <Input id="title" defaultValue="Responsable Technique" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Biographie</Label>
                      <Textarea
                        id="bio"
                        defaultValue="Responsable technique avec 10 ans d'expérience dans le recrutement et l'évaluation de développeurs."
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave} disabled={saving} className="gap-2">
                  {saving ? (
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
                      <span>Enregistrement...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Enregistrer</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Préférences</CardTitle>
                <CardDescription>Personnalisez votre expérience sur la plateforme.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Langue</Label>
                  <Select defaultValue="fr">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Sélectionnez une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <Select defaultValue="europe-paris">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Sélectionnez un fuseau horaire" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe-paris">Europe/Paris (GMT+1)</SelectItem>
                      <SelectItem value="europe-london">Europe/London (GMT+0)</SelectItem>
                      <SelectItem value="america-new_york">America/New_York (GMT-5)</SelectItem>
                      <SelectItem value="asia-tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="theme">Thème sombre</Label>
                    <p className="text-sm text-muted-foreground">Activer le thème sombre pour l'interface.</p>
                  </div>
                  <Switch id="theme" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave} disabled={saving} className="gap-2">
                  {saving ? (
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
                      <span>Enregistrement...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Enregistrer</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="company" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de l'entreprise</CardTitle>
                <CardDescription>Gérez les informations de votre entreprise.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="h-24 w-24 rounded-md border flex items-center justify-center bg-muted">
                      <Building2 className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Upload className="h-4 w-4" />
                      <span>Changer le logo</span>
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Nom de l'entreprise</Label>
                      <Input id="companyName" defaultValue="TechCorp" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Site web</Label>
                      <div className="flex">
                        <div className="flex items-center px-3 border rounded-l-md bg-muted">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input id="website" defaultValue="www.techcorp.com" className="rounded-l-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email de contact</Label>
                        <div className="flex">
                          <div className="flex items-center px-3 border rounded-l-md bg-muted">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <Input id="email" defaultValue="contact@techcorp.com" className="rounded-l-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <div className="flex">
                          <div className="flex items-center px-3 border rounded-l-md bg-muted">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <Input id="phone" defaultValue="+33 1 23 45 67 89" className="rounded-l-none" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse</Label>
                      <div className="flex">
                        <div className="flex items-center px-3 border rounded-l-md bg-muted">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                          id="address"
                          defaultValue="123 Avenue de la Tech, 75001 Paris"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        defaultValue="TechCorp est une entreprise innovante spécialisée dans le développement de solutions logicielles pour les entreprises."
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave} disabled={saving} className="gap-2">
                  {saving ? (
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
                      <span>Enregistrement...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Enregistrer</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Facturation</CardTitle>
                <CardDescription>Gérez vos informations de facturation et votre abonnement.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-md border p-4 bg-muted/30">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <h3 className="font-medium">Plan Pro</h3>
                      <p className="text-sm text-muted-foreground">Facturé mensuellement à 99€</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Changer de plan
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Méthode de paiement</h3>
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Visa se terminant par 4242</p>
                        <p className="text-sm text-muted-foreground">Expire le 12/2025</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Modifier
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Historique de facturation</h3>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-4 py-2 text-left font-medium text-sm">Date</th>
                          <th className="px-4 py-2 text-left font-medium text-sm">Montant</th>
                          <th className="px-4 py-2 text-left font-medium text-sm">Statut</th>
                          <th className="px-4 py-2 text-right font-medium text-sm">Facture</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {[
                          { date: "01/02/2024", amount: "99€", status: "Payé" },
                          { date: "01/01/2024", amount: "99€", status: "Payé" },
                          { date: "01/12/2023", amount: "99€", status: "Payé" },
                        ].map((invoice, index) => (
                          <tr key={index} className="hover:bg-muted/30">
                            <td className="px-4 py-3 text-sm">{invoice.date}</td>
                            <td className="px-4 py-3 text-sm">{invoice.amount}</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {invoice.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-right">
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                <span className="sr-only">Télécharger</span>
                                <Download className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Préférences de notifications</CardTitle>
                <CardDescription>Configurez comment et quand vous souhaitez être notifié.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Notifications par email</h3>
                  <div className="space-y-3">
                    {[
                      {
                        title: "Résultats de tests",
                        description: "Recevoir un email lorsqu'un candidat termine un test",
                      },
                      {
                        title: "Nouveaux candidats",
                        description: "Recevoir un email lorsqu'un nouveau candidat s'inscrit",
                      },
                      {
                        title: "Rapports hebdomadaires",
                        description: "Recevoir un résumé hebdomadaire des activités",
                      },
                      {
                        title: "Mises à jour du système",
                        description: "Recevoir des notifications sur les nouvelles fonctionnalités",
                      },
                    ].map((notification, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>{notification.title}</Label>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                        </div>
                        <Switch defaultChecked={index < 2} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Notifications dans l'application</h3>
                  <div className="space-y-3">
                    {[
                      {
                        title: "Activité des tests",
                        description: "Notifications en temps réel sur l'activité des tests",
                      },
                      {
                        title: "Messages",
                        description: "Notifications pour les nouveaux messages",
                      },
                      {
                        title: "Mentions",
                        description: "Notifications lorsque vous êtes mentionné dans un commentaire",
                      },
                    ].map((notification, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>{notification.title}</Label>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="digest">Fréquence du résumé</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="digest">
                      <SelectValue placeholder="Sélectionnez une fréquence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Temps réel</SelectItem>
                      <SelectItem value="daily">Quotidien</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                      <SelectItem value="never">Jamais</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave} disabled={saving} className="gap-2">
                  {saving ? (
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
                      <span>Enregistrement...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Enregistrer</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sécurité du compte</CardTitle>
                <CardDescription>Gérez la sécurité de votre compte et vos options d'authentification.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Changer le mot de passe</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Mot de passe actuel</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nouveau mot de passe</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button className="gap-2">
                      <Key className="h-4 w-4" />
                      <span>Mettre à jour le mot de passe</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="font-medium">Authentification à deux facteurs</h3>
                      <p className="text-sm text-muted-foreground">
                        Ajoutez une couche de sécurité supplémentaire à votre compte.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="rounded-md border p-4 bg-muted/30">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Authentification à deux facteurs activée</p>
                        <p className="text-sm text-muted-foreground">
                          Votre compte est protégé par l'authentification à deux facteurs.
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configurer
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Sessions actives</h3>
                  <div className="space-y-3">
                    {[
                      {
                        device: "MacBook Pro",
                        location: "Paris, France",
                        lastActive: "Actuellement actif",
                        current: true,
                      },
                      {
                        device: "iPhone 13",
                        location: "Paris, France",
                        lastActive: "Il y a 2 heures",
                        current: false,
                      },
                      {
                        device: "Windows PC",
                        location: "Lyon, France",
                        lastActive: "Il y a 3 jours",
                        current: false,
                      },
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            <DeviceIcon device={session.device} />
                          </div>
                          <div>
                            <p className="font-medium flex items-center gap-2">
                              {session.device}
                              {session.current && (
                                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                  Actuel
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {session.location} • {session.lastActive}
                            </p>
                          </div>
                        </div>
                        {!session.current && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            Déconnecter
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Se déconnecter de toutes les sessions</span>
                </Button>
                <Button onClick={handleSave} disabled={saving} className="gap-2">
                  {saving ? (
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
                      <span>Enregistrement...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Enregistrer</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">Zone de danger</CardTitle>
                <CardDescription>Ces actions sont irréversibles. Soyez prudent.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border border-destructive/30 p-4 bg-destructive/5">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Supprimer le compte</p>
                      <p className="text-sm text-muted-foreground">
                        Cette action supprimera définitivement votre compte et toutes vos données.
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Supprimer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Intégrations</CardTitle>
                <CardDescription>Connectez DevEval à vos outils et services préférés.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    {
                      name: "GitHub",
                      description:
                        "Connectez-vous à GitHub pour importer des tests de code et évaluer les contributions.",
                      icon: <GitHubIcon />,
                      connected: true,
                    },
                    {
                      name: "Slack",
                      description: "Recevez des notifications et partagez des résultats directement dans Slack.",
                      icon: <SlackIcon />,
                      connected: true,
                    },
                    {
                      name: "Jira",
                      description: "Synchronisez les résultats des tests avec vos tickets Jira.",
                      icon: <JiraIcon />,
                      connected: false,
                    },
                    {
                      name: "Google Workspace",
                      description: "Importez des candidats depuis Google Workspace et partagez des résultats.",
                      icon: <GoogleIcon />,
                      connected: false,
                    },
                    {
                      name: "Microsoft Teams",
                      description: "Intégrez DevEval à Microsoft Teams pour la collaboration.",
                      icon: <MicrosoftIcon />,
                      connected: false,
                    },
                  ].map((integration, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                          {integration.icon}
                        </div>
                        <div>
                          <p className="font-medium">{integration.name}</p>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                      </div>
                      {integration.connected ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Check className="h-3 w-3" />
                            Connecté
                          </span>
                          <Button variant="ghost" size="sm">
                            Configurer
                          </Button>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm">
                          Connecter
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">API et Webhooks</h3>
                  <div className="space-y-2">
                    <Label htmlFor="api-key">Clé API</Label>
                    <div className="flex">
                      <Input
                        id="api-key"
                        value="sk_live_51NcgYtGjk0DLg7iUNYetUz•••••••••••••••"
                        readOnly
                        className="rounded-r-none font-mono text-sm"
                      />
                      <Button variant="secondary" className="rounded-l-none">
                        Copier
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Utilisez cette clé pour accéder à l'API DevEval. Ne partagez jamais votre clé API.
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" className="gap-2">
                      <span>Régénérer la clé</span>
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <span>Documentation API</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </motion.div>
      </Tabs>
    </DashboardShell>
  )
}

function DeviceIcon({ device }: { device: string }) {
  if (device.includes("iPhone") || device.includes("iPad")) {
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
        className="h-5 w-5 text-muted-foreground"
      >
        <rect width="12" height="20" x="6" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    )
  }

  if (device.includes("Mac")) {
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
        className="h-5 w-5 text-muted-foreground"
      >
        <rect width="18" height="12" x="3" y="4" rx="2" ry="2" />
        <line x1="2" x2="22" y1="20" y2="20" />
      </svg>
    )
  }

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
      className="h-5 w-5 text-muted-foreground"
    >
      <rect width="14" height="8" x="5" y="2" rx="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" />
      <path d="M6 18h2" />
      <path d="M12 18h6" />
    </svg>
  )
}

function GitHubIcon() {
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
      className="h-5 w-5 text-muted-foreground"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function SlackIcon() {
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
      className="h-5 w-5 text-muted-foreground"
    >
      <rect width="3" height="8" x="13" y="2" rx="1.5" />
      <path d="M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5" />
      <rect width="3" height="8" x="8" y="14" rx="1.5" />
      <path d="M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5" />
      <rect width="8" height="3" x="14" y="13" rx="1.5" />
      <path d="M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5" />
      <rect width="8" height="3" x="2" y="8" rx="1.5" />
      <path d="M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5" />
    </svg>
  )
}

function JiraIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-muted-foreground"
    >
      <path d="m12 8.5 4 4-4 4-4-4 4-4Z" />
      <path d="M17 5.5 12 2 7 5.5l5 5 5-5Z" />
      <path d="m7 18.5 5 3.5 5-3.5-5-5-5 5Z" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-muted-foreground"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  )
}

function MicrosoftIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-muted-foreground"
    >
      <rect width="20" height="20" x="2" y="2" rx="2" />
      <path d="M12 2v20" />
      <path d="M2 12h20" />
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

