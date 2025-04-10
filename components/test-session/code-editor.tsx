"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
}

export function CodeEditor({ value, onChange, language }: CodeEditorProps) {
  const editorRef = useRef<HTMLTextAreaElement>(null)

  // Gérer les tabulations dans l'éditeur
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()

      const start = e.currentTarget.selectionStart
      const end = e.currentTarget.selectionEnd

      // Insérer une tabulation (2 espaces)
      const newValue = value.substring(0, start) + "  " + value.substring(end)
      onChange(newValue)

      // Déplacer le curseur après la tabulation
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.selectionStart = editorRef.current.selectionEnd = start + 2
        }
      }, 0)
    }
  }

  // Ajuster automatiquement la hauteur du textarea
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.style.height = "auto"
      editorRef.current.style.height = `${editorRef.current.scrollHeight}px`
    }
  }, [value])

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 bg-muted text-muted-foreground text-xs px-2 py-1 rounded">{language}</div>
      <textarea
        ref={editorRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full min-h-[400px] p-4 font-mono text-sm bg-background border-0 focus:ring-0 focus:outline-none resize-none"
        spellCheck="false"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        data-gramm="false"
      />
    </div>
  )
}

