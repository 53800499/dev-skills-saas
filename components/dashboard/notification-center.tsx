"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { X, Bell, MessageSquare, CheckCircle, AlertCircle, Info } from "lucide-react"

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

interface NotificationCenterProps {
  onClose: () => void
}

export function NotificationCenter({ onClose }: NotificationCenterProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [notificationState, setNotificationState] = useState(notifications)

  const filteredNotifications = notificationState.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  const markAsRead = (id: string) => {
    setNotificationState((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotificationState((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Notifications
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
            Tout marquer comme lu
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="unread">Non lus</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="success">Succès</TabsTrigger>
          </TabsList>

          <div className="space-y-2">
            <AnimatePresence initial={false}>
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`p-3 rounded-lg border ${notification.read ? "bg-background" : "bg-primary/5 border-primary/20"} relative`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      {!notification.read && (
                        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary"></div>
                      )}
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
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 text-muted-foreground"
                >
                  Aucune notification à afficher
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

