"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "developer",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { register } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }))
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      console.log(formData)
      // Validation basique
      if (!formData.email || !formData.password || !formData.name) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Veuillez remplir tous les champs obligatoires",
        })
        return
      }

      const response = await register(formData)

      if (response.success) {
        toast({
          title: "Inscription réussie",
          description: "Votre compte a été créé avec succès.",
        })
        router.push("/dashboard")
      } else {
        toast({
          variant: "destructive",
          title: "Erreur d'inscription",
          description: response.error?.userMessage || "Une erreur s'est produite lors de l'inscription",
        })
      }
    } catch (error: any) {
      console.error("Erreur lors de l'inscription:", error)
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: "Une erreur s'est produite lors de l'inscription",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Créer un compte
          </h1>
          <p className="text-sm text-muted-foreground">
            Inscrivez-vous pour accéder à la plateforme
          </p>
        </div>
        <div className="grid gap-6">
          <form onSubmit={onSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  autoCapitalize="none"
                  autoCorrect="off"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="nom@exemple.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoCorrect="off"
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Type d'utilisateur</Label>
                <RadioGroup
                  value={formData.role}
                  onValueChange={handleRoleChange}
                  className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="developer" id="developer" />
                    <Label htmlFor="developer">Développeur</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="recruiter" id="recruiter" />
                    <Label htmlFor="recruiter">Recruteur</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin">Admin</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button disabled={isLoading}>
                {isLoading && (
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                )}
                S'inscrire
              </Button>
            </div>
          </form>
        </div>
        <div className="px-8 text-center text-sm text-muted-foreground">
          En vous inscrivant, vous acceptez nos{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary">
            Conditions d'utilisation
          </Link>{" "}
          et notre{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary">
            Politique de confidentialité
          </Link>
          .
        </div>
        <div className="px-8 text-center text-sm text-muted-foreground">
          <div className="underline-offset-4 hover:underline">
            Déjà un compte?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}