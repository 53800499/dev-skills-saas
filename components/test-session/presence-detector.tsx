"use client"

import { useState, useEffect, useRef } from "react"

interface PresenceDetectorProps {
  onUserAbsent: () => void
  onUserPresent: () => void
  inactivityThreshold?: number // en millisecondes
}

export function PresenceDetector({
  onUserAbsent,
  onUserPresent,
  inactivityThreshold = 10000, // 10 secondes par défaut
}: PresenceDetectorProps) {
  const [isActive, setIsActive] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const visibilityTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Réinitialiser le timer d'inactivité
  const resetInactivityTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setIsActive(false)
      onUserAbsent()
    }, inactivityThreshold)
  }

  // Gérer les événements d'activité de l'utilisateur
  const handleActivity = () => {
    if (!isActive) {
      setIsActive(true)
      onUserPresent()
    }
    resetInactivityTimer()
  }

  // Gérer la visibilité de la page
  const handleVisibilityChange = () => {
    if (document.hidden) {
      // L'utilisateur a changé d'onglet ou minimisé la fenêtre
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current)
      }

      // Donner un court délai avant de marquer l'utilisateur comme absent
      // (pour éviter les faux positifs lors des changements rapides)
      visibilityTimeoutRef.current = setTimeout(() => {
        if (document.hidden) {
          setIsActive(false)
          onUserAbsent()
        }
      }, 1000)
    } else {
      // L'utilisateur est revenu sur l'onglet
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current)
      }
      setIsActive(true)
      onUserPresent()
      resetInactivityTimer()
    }
  }

  useEffect(() => {
    // Initialiser le timer d'inactivité
    resetInactivityTimer()

    // Ajouter les écouteurs d'événements pour détecter l'activité
    window.addEventListener("mousemove", handleActivity)
    window.addEventListener("mousedown", handleActivity)
    window.addEventListener("keypress", handleActivity)
    window.addEventListener("scroll", handleActivity)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Nettoyer les écouteurs d'événements lors du démontage
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current)
      }
      window.removeEventListener("mousemove", handleActivity)
      window.removeEventListener("mousedown", handleActivity)
      window.removeEventListener("keypress", handleActivity)
      window.removeEventListener("scroll", handleActivity)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  // Ce composant ne rend rien visuellement
  return null
}

