"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { useRouter } from "next/navigation"
import {
  authService,
  type User,
  type AuthResponse,
  type LoginCredentials,
  type RegisterCredentials,
} from "@/services/authService"


// Type pour l'utilisateur
/* export interface User {
  id: string
  email: string
  name?: string
  // Ajoutez ici d'autres propriétés utilisateur selon votre backend
  role?: string
  avatar?: string
  permissions?: string[]
} */

// Type pour le contexte d'authentification
interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<AuthResponse>
  logout: () => Promise<void>
  register: (userData: RegisterCredentials) => Promise<AuthResponse>
  refreshUser: () => Promise<void>
  updateProfile: (userData: Partial<User>) => Promise<AuthResponse>
  clearError: () => void
}

// Valeur par défaut du contexte
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,
  login: async () => ({ success: false }),
  logout: async () => {},
  register: async () => ({ success: false }),
  refreshUser: async () => {},
  updateProfile: async () => ({ success: false }),
  clearError: () => {},
})

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => useContext(AuthContext)

// Propriétés du provider
interface AuthProviderProps {
  children: ReactNode
}

// Provider d'authentification
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  // Fonction pour mettre à jour l'état d'authentification
  const updateAuthState = (authResponse: AuthResponse) => {
    if (authResponse.success && authResponse.data) {
      setUser(authResponse.data.user)
      setIsAuthenticated(true)
      setError(null)
    } else {
      setUser(null)
      setIsAuthenticated(false)
      setError(authResponse.error?.userMessage || "Une erreur s'est produite")
    }
  }

  // Initialisation de l'authentification
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const response = await authService.getCurrentUser()
          updateAuthState(response)
        }
      } catch (error) {
        console.error("Erreur d'initialisation:", error)
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  // Fonction de connexion
  const login = async (email: string, password: string): Promise<AuthResponse> => {
    setLoading(true)
    try {
      const response = await authService.login({ email, password })
      updateAuthState(response)
      
      if (response.success) {
        router.push("/dashboard")
      }
      
      return response
    } catch (error: any) {
      const errorResponse: AuthResponse = {
        success: false,
        error: {
          message: error.message,
          userMessage: "Erreur lors de la connexion",
        },
      }
      updateAuthState(errorResponse)
      return errorResponse
    } finally {
      setLoading(false)
    }
  }

  // Fonction d'inscription
  const register = async (userData: RegisterCredentials): Promise<AuthResponse> => {
    setLoading(true)
    try {
      const response = await authService.register(userData)
      updateAuthState(response)
      
      if (response.success) {
        router.push("/dashboard")
      }
      
      return response
    } catch (error: any) {
      const errorResponse: AuthResponse = {
        success: false,
        error: {
          message: error.message,
          userMessage: "Erreur lors de l'inscription",
        },
      }
      updateAuthState(errorResponse)
      return errorResponse
    } finally {
      setLoading(false)
    }
  }

  // Fonction de déconnexion
  const logout = async () => {
    setLoading(true)
    try {
      await authService.logout()
      setUser(null)
      setIsAuthenticated(false)
      setError(null)
      router.push("/login")
    } catch (error: any) {
      setError("Erreur lors de la déconnexion")
      console.error("Erreur de déconnexion:", error)
    } finally {
      setLoading(false)
    }
  }

  // Fonction de rafraîchissement des données utilisateur
  const refreshUser = async () => {
    setLoading(true)
    try {
      const response = await authService.getCurrentUser()
      updateAuthState(response)
    } catch (error: any) {
      const errorResponse: AuthResponse = {
        success: false,
        error: {
          message: error.message,
          userMessage: "Erreur lors du rafraîchissement des données",
        },
      }
      updateAuthState(errorResponse)
    } finally {
      setLoading(false)
    }
  }

  // Fonction de mise à jour du profil
  const updateProfile = async (userData: Partial<User>): Promise<AuthResponse> => {
    setLoading(true)
    try {
      const response = await authService.updateProfile(userData)
      updateAuthState(response)
      return response
    } catch (error: any) {
      const errorResponse: AuthResponse = {
        success: false,
        error: {
          message: error.message,
          userMessage: "Erreur lors de la mise à jour du profil",
        },
      }
      updateAuthState(errorResponse)
      return errorResponse
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour effacer les erreurs
  const clearError = () => {
    setError(null)
  }

  // Protection des routes authentifiées
  useEffect(() => {
    const protectedRoutes = ['/dashboard', '/profile', '/settings']
    const isProtectedRoute = protectedRoutes.some(route => 
      window.location.pathname.startsWith(route)
    )

    if (isProtectedRoute && !loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, loading, router])

  // Valeur du contexte
  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    register,
    refreshUser,
    updateProfile,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook personnalisé pour les routes protégées
export function useProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, loading, router])

  return { isAuthenticated, loading }
}

