/** @format */

import axios from "axios";

// Types
export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  avatar?: string;
  table?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    token: string;
    table?: string;
  };
  message?: string;
  error?: {
    code?: string;
    message: string;
    userMessage: string;
  };
}

// Configuration
//const API_URL = "https://evalution-des-developpeur-back-end.onrender.com/api";
const API_URL = "http://localhost:3003/api/";

// Instance axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Helpers
const setToken = (token: string) => {
  localStorage.setItem("auth_token", token);
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const getToken = (): string | null => {
  return localStorage.getItem("auth_token");
};

const setUserData = (user: User) => {
  localStorage.setItem("user_data", JSON.stringify(user));
};

const getUserData = (): User | null => {
  const userData = localStorage.getItem("user_data");
  return userData ? JSON.parse(userData) : null;
};

const clearAuthData = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user_data");
  delete api.defaults.headers.common["Authorization"];
};

// Gestion des erreurs
const handleApiError = (error: any): AuthResponse => {
  console.error("Erreur API détaillée:", {
    message: error.message,
    response: error.response?.data,
    status: error.response?.status,
  });

  if (error.response) {
    return {
      success: false,
      error: {
        code: `HTTP_${error.response.status}`,
        message: error.response.data?.message || "Erreur serveur",
        userMessage:
          error.response.data?.userMessage || "Une erreur s'est produite",
      },
    };
  }

  if (error.request) {
    return {
      success: false,
      error: {
        code: "NETWORK_ERROR",
        message: "Erreur réseau",
        userMessage:
          "Le serveur ne répond pas. Veuillez vérifier votre connexion.",
      },
    };
  }

  return {
    success: false,
    error: {
      code: "UNKNOWN_ERROR",
      message: error.message || "Erreur inconnue",
      userMessage: "Une erreur inattendue s'est produite",
    },
  };
};

// Service d'authentification
class AuthService {
  isAuthenticated(): boolean {
    return !!getToken();
  }

  getAuthState() {
    return {
      isAuthenticated: !!getToken(),
      user: getUserData(),
      token: getToken(),
    };
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      if (!credentials.email || !credentials.password) {
        return {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Données manquantes",
            userMessage: "L'email et le mot de passe sont requis",
          },
        };
      }

      const loginData = {
        email: credentials.email.trim().toLowerCase(),
        password: credentials.password,
      };

      const response = await api.post("/users/login", loginData);
      console.log("Réponse du serveur:", response.data);
      // Adaptation de la réponse du serveur
      const { token, data: userData, message, table } = response.data;

      if (token && userData) {
        // Transformation des données utilisateur pour correspondre à notre interface User
        const user: User = {
          id: userData.id.toString(),
          email: userData.email,
          name: userData.name,
          role: userData.role,
          avatar: userData.avatar || undefined,
          table: table || userData.table
        };

        setToken(token);
        setUserData(user);

        return {
          success: true,
          data: { 
            user,
            token,
            table
          },
          message // On peut aussi inclure le message du serveur
        };
    }

    throw new Error("Données de réponse invalides");
  } catch (error) {
    return handleApiError(error);
  }
}

  async register(userData: RegisterCredentials): Promise<AuthResponse> {
    try {
      if (!userData.email || !userData.password || !userData.name || !userData.role) {
        return {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Données manquantes",
            userMessage: "Tous les champs sont requis",
          },
        };
      }

      const signupData = {
        name: userData.name.trim(),
        email: userData.email.trim().toLowerCase(),
        password: userData.password,
      };
      console.log(signupData)

      const response = await api.post("/users", signupData);
      // Adaptation de la réponse du serveur
      const { token, data: userDatas, message } = response.data;

      if (token && userDatas) {
        // Transformation des données utilisateur pour correspondre à notre interface User
        const user: User = {
          id: userDatas.id.toString(),
          email: userDatas.email,
          name: userDatas.name,
          role: userDatas.role,
          avatar: userDatas.avatar || undefined,
        };

        setToken(token);
        setUserData(user);

        return {
          success: true,
          data: { 
            user,
            token 
          },
          message // On peut aussi inclure le message du serveur
        };
    }

      throw new Error("Données de réponse invalides");
    } catch (error) {
      return handleApiError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post("/users/logout");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      clearAuthData();
    }
  }

  async getCurrentUser(): Promise<AuthResponse> {
    try {
      const response = await api.get("/users/me");
      const user = response.data.user;

      if (user) {
        setUserData(user);
        return {
          success: true,
          data: {
            user,
            token: getToken()!,
          },
        };
      }

      throw new Error("Données utilisateur invalides");
    } catch (error) {
      return handleApiError(error);
    }
  }

  async updateProfile(userData: Partial<User>): Promise<AuthResponse> {
    try {
      const response = await api.put("/users/profile", userData);
      const updatedUser = response.data.user;

      if (updatedUser) {
        setUserData(updatedUser);
        return {
          success: true,
          data: {
            user: updatedUser,
            token: getToken()!,
          },
        };
      }

      throw new Error("Mise à jour du profil échouée");
    } catch (error) {
      return handleApiError(error);
    }
  }
}

// Export une instance unique du service
export const authService = new AuthService();
