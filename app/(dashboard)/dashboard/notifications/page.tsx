"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Bell, CheckCircle, Info, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NotificationsPage() {
  const notifications = [
    {
      id: "n1",
      title: "Nouveau candidat",
      message: "Sophie Martin a complété le test Frontend React",
      time: "Il y a 10 minutes",
      type: "info",
      read: false,
    },
    {
      id: "n2",
      title: "Test terminé",
      message: "Le test Backend Node.js a été complété par 8 candidats",
      time: "Il y a 2 heures",
      type: "success",
      read: false,
    },
    {
      id: "n3",
      title: "Nouveau test créé",
      message: "Vous avez créé un nouveau test: Full Stack",
      time: "Il y a 1 jour",
      type: "info",
      read: true,
    },
    {
      id: "n4",
      title: "Score exceptionnel",
      message: "Thomas Dubois a obtenu un score de 95% au test Algorithmes",
      time: "Il y a 2 jours",
      type: "success",
      read: true,
    },
    {
      id: "n5",
      title: "Mise à jour système",
      message: "Une mise à jour du système est prévue pour demain à 22h",
      time: "Il y a 3 jours",
      type: "warning",
      read: true,
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <MessageSquare className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Notifications" text="Gérez vos notifications et alertes.">
        <Button className="gap-2">
          <Bell className="h-4 w-4" />
          <span>Marquer tout comme lu</span>
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="unread">Non lus</TabsTrigger>
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="success">Succès</TabsTrigger>
        </TabsList>

        <Card>
          <CardHeader>
            <CardTitle>Centre de notifications</CardTitle>
            <CardDescription>Vos notifications récentes et alertes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${notification.read ? "bg-background" : "bg-primary/5 border-primary/20"} relative`}
              >
                {!notification.read && <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary"></div>}
                <div className="flex gap-3">
                  <div className="mt-0.5">{getIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex flex-col">
                      <div className="font-medium">{notification.title}</div>
                      <div className="text-sm text-muted-foreground">{notification.message}</div>
                      <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paramètres de notification</CardTitle>
            <CardDescription>Configurez vos préférences de notification</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Pour modifier vos préférences de notification, veuillez vous rendre dans la section
              <Button variant="link" className="px-1 h-auto">
                Paramètres &gt; Notifications
              </Button>
            </p>
          </CardContent>
        </Card>
      </Tabs>
    </DashboardShell>
  )
}

