"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"

export function UserAccountNav() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Obtenir les initiales pour l'avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleLogout = async () => {
    try {
      await logout()
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
      })
      router.push("/login")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Un problème est survenu lors de la déconnexion.",
      })
    }
  }

  // Si pas d'utilisateur, ne rien afficher
  if (!user) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar || ""} alt={user.name || "Avatar"} />
            <AvatarFallback>{user.name ? getInitials(user.name) : "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              Tableau de bord
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          {user.role === "developer" && (
            <DropdownMenuItem asChild>
              <Link href="/profile">
                Mon profil
                <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link href="/settings">
              Paramètres
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          {user.role === "admin" && (
            <DropdownMenuItem asChild>
              <Link href="/admin">
                Administration
                <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600"
          onClick={handleLogout}
        >
          Se déconnecter
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Types pour les raccourcis clavier selon le système d'exploitation
const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0

export const Shortcuts = {
  dashboard: isMac ? '⌘D' : 'Ctrl+D',
  profile: isMac ? '⌘P' : 'Ctrl+P',
  settings: isMac ? '⌘S' : 'Ctrl+S',
  admin: isMac ? '⌘A' : 'Ctrl+A',
  logout: isMac ? '⇧⌘Q' : 'Ctrl+Shift+Q',
}

