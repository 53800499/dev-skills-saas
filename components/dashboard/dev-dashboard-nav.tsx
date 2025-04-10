"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  LayoutDashboard,
  Code,
  CheckCircle,
  Users,
  FileText,
  Settings,
  BookOpen,
  BarChart2,
  HelpCircle,
  MessageSquare,
  ChevronRight,
  Bell,
  Zap,
  Briefcase,
  Award,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  badge?: string
  badgeColor?: string
  submenu?: NavItem[]
}

export function DevDashboardNav() {
  const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Ouvrir automatiquement le sous-menu actif
    items.forEach((item) => {
      if (item.submenu && item.submenu.some((subitem) => pathname === subitem.href)) {
        setOpenSubmenu(item.title)
      }
    })
  }, [pathname])

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title)
  }

  const items: NavItem[] = [
    {
      title: "Tableau de bord",
      href: "/dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Tests",
      href: "/dashboard/test",
      icon: <Code className="mr-2 h-4 w-4" />,
    },
    {
      title: "Résultats",
      href: "/dashboard/results",
      icon: <CheckCircle className="mr-2 h-4 w-4" />,
      badge: "5",
      badgeColor: "bg-green-500",
    },
    {
      title: "Analytiques",
      href: "/dashboard/analytics",
      icon: <BarChart2 className="mr-2 h-4 w-4" />,
    },
    {
      title: "Compétences",
      href: "/dashboard/skills",
      icon: <Award className="mr-2 h-4 w-4" />,
    },
    {
      title: "Notifications",
      href: "/dashboard/notifications",
      icon: <Bell className="mr-2 h-4 w-4" />,
      badge: "3",
      badgeColor: "bg-red-500",
    },
    {
      title: "Paramètres",
      href: "/dashboard/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
    {
      title: "Aide & Support",
      href: "/dashboard/help",
      icon: <HelpCircle className="mr-2 h-4 w-4" />,
    },
  ]

  if (!mounted) return null

  return (
    <nav className="grid items-start gap-2 pr-1">
      {items.map((item, index) => {
        if (item.submenu) {
          const isActive = pathname === item.href || item.submenu.some((subitem) => pathname === subitem.href)
          const isOpen = openSubmenu === item.title

          return (
            <Collapsible
              key={item.title}
              open={isOpen}
              onOpenChange={() => toggleSubmenu(item.title)}
              className="w-full"
            >
              <div className="flex flex-col gap-1">
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full justify-start relative group overflow-hidden",
                    isActive ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
                  )}
                >
                  <motion.div
                    className="absolute inset-0 bg-primary/10 rounded-md -z-10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  <span className="flex items-center">
                    {item.icon}
                    <span>{item.title}</span>
                  </span>
                  {item.badge && (
                    <Badge className={`ml-auto ${item.badgeColor} text-white`} variant="outline">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
                <CollapsibleTrigger asChild>
                  <Button
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-full justify-between h-8 px-2 py-1 ml-6 -mt-1",
                      isActive ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
                    )}
                  >
                    <span className="text-xs text-muted-foreground">Sous-menu</span>
                    <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronRight className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="pl-6 pt-1">
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.title}
                      href={subitem.href}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        "justify-start w-full mb-1",
                        pathname === subitem.href
                          ? "bg-muted hover:bg-muted font-medium"
                          : "hover:bg-transparent hover:underline",
                      )}
                    >
                      {subitem.icon}
                      <span>{subitem.title}</span>
                    </Link>
                  ))}
                </motion.div>
              </CollapsibleContent>
            </Collapsible>
          )
        }

        return (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start relative group overflow-hidden",
              pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
            )}
          >
            <motion.div
              className="absolute inset-0 bg-primary/10 rounded-md -z-10"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <span className="flex items-center">
              {item.icon}
              <span>{item.title}</span>
            </span>
            {item.badge && (
              <Badge className={`ml-auto ${item.badgeColor} text-white`} variant="outline">
                {item.badge}
              </Badge>
            )}
          </Link>
        )
      })}
    </nav>
  )
}

