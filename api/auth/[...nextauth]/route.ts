/** @format */

import axios from "axios";

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

export interface ResetPasswordData {
  email: string;
}

export interface NewPasswordData {
  token: string;
  password: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  userMessage: string;
}

export interface AuthResponse {
  user?: {
    id: string;
    email: string;
    name?: string;
  };
  token?: string;
  error?: ApiError;
  success: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

async function handleResponse<T>(promise: Promise<any>): Promise<T> {
  try {
    const response = await promise;
    return response.data;
  } catch (error: any) {
    const apiError: ApiError = {
      code: error.response?.data?.code || `HTTP_${error.response?.status}`,
      message: error.response?.data?.message || "Une erreur s'est produite",
      details: error.response?.data?.details || null,
      userMessage: getUserFriendlyErrorMessage(
        error.response?.status,
        error.response?.data?.code
      )
    };
    throw apiError;
  }
}

function getUserFriendlyErrorMessage(
  statusCode: number,
  errorCode?: string
): string {
  switch (errorCode) {
    case "AUTH_INVALID_CREDENTIALS":
      return "Email ou mot de passe incorrect. Veuillez réessayer.";
    case "AUTH_USER_NOT_FOUND":
      return "Aucun compte trouvé avec cet email.";
    case "AUTH_EMAIL_ALREADY_EXISTS":
      return "Un compte avec cet email existe déjà.";
    default:
      break;
  }
  switch (statusCode) {
    case 400:
      return "Requête invalide. Vérifiez vos données et réessayez.";
    case 401:
      return "Non autorisé. Veuillez vous connecter.";
    case 500:
      return "Erreur serveur. Veuillez réessayer plus tard.";
    default:
      return "Une erreur inattendue est survenue.";
  }
}

export async function login(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  return handleResponse(apiClient.post("/api/users/login", credentials));
}

export async function register(
  userData: RegisterCredentials
): Promise<AuthResponse> {
  return handleResponse(apiClient.post("/api/users", userData));
}

export async function logout(): Promise<{
  success: boolean;
  error?: ApiError;
}> {
  return handleResponse(apiClient.post("/api/logout"));
}

export async function requestPasswordReset(
  data: ResetPasswordData
): Promise<{ success: boolean; error?: ApiError }> {
  return handleResponse(apiClient.post("/api/reset-password", data));
}

export async function setNewPassword(
  data: NewPasswordData
): Promise<{ success: boolean; error?: ApiError }> {
  return handleResponse(apiClient.post("/api/new-password", data));
}

export async function checkAuthStatus(): Promise<{
  authenticated: boolean;
  user?: AuthResponse["user"];
  error?: ApiError;
}> {
  try {
    const data = await handleResponse(apiClient.get("/api/protected-route"));
    return { authenticated: true, user: data.user };
  } catch (error) {
    return { authenticated: false, error: error as ApiError };
  }
}

export function getAuthToken(): string | null {
  return typeof window !== "undefined"
    ? localStorage.getItem("auth_token")
    : null;
}

export function setAuthToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token);
  }
}

export function removeAuthToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token");
  }
}
