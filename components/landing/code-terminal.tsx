"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

const codeSnippet = `// Exemple d'évaluation de code
function evaluateCode(code) {
  const metrics = {
    complexity: calculateComplexity(code),
    readability: calculateReadability(code),
    efficiency: calculateEfficiency(code),
    bestPractices: checkBestPractices(code)
  };
  
  return {
    score: calculateOverallScore(metrics),
    feedback: generateFeedback(metrics),
    metrics
  };
}

// Analyse de la complexité cyclomatique
function calculateComplexity(code) {
  // Algorithme d'analyse de complexité
  return 85; // Score sur 100
}

// Évaluation de la lisibilité
function calculateReadability(code) {
  // Analyse de la structure, des noms de variables
  return 92; // Score sur 100
}

// Analyse de l'efficacité algorithmique
function calculateEfficiency(code) {
  // Vérification des performances
  return 78; // Score sur 100
}

// Vérification des bonnes pratiques
function checkBestPractices(code) {
  // Analyse des patterns et standards
  return 88; // Score sur 100
}

// Calcul du score global
function calculateOverallScore(metrics) {
  return Object.values(metrics).reduce((sum, val) => sum + val, 0) / 4;
}

// Génération du feedback détaillé
function generateFeedback(metrics) {
  // Création de recommandations personnalisées
  return "Le code est bien structuré mais pourrait être optimisé...";
}

// Exécution de l'évaluation
const result = evaluateCode(submittedCode);
console.log(\`Score: \${result.score}/100\`);
console.log(\`Feedback: \${result.feedback}\`);`

export function CodeTerminal() {
  const [text, setText] = useState("")
  const [cursorPosition, setCursorPosition] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (cursorPosition < codeSnippet.length) {
      const timeout = setTimeout(
        () => {
          setText((prev) => prev + codeSnippet[cursorPosition])
          setCursorPosition((prev) => prev + 1)

          // Scroll to bottom as text is added
          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight
          }
        },
        Math.random() * 30 + 10,
      ) // Random typing speed for realistic effect

      return () => clearTimeout(timeout)
    } else {
      // Reset and start over after a pause
      const resetTimeout = setTimeout(() => {
        setText("")
        setCursorPosition(0)
      }, 5000)

      return () => clearTimeout(resetTimeout)
    }
  }, [cursorPosition])

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10 bg-black">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="ml-2 text-xs text-white/70">code-evaluation.js</div>
      </div>
      <div
        ref={terminalRef}
        className="flex-1 p-4 font-mono text-sm text-green-400 overflow-auto"
        style={{ backgroundColor: "#0D1117" }}
      >
        <pre className="whitespace-pre-wrap">
          <code>
            {text}
            <motion.span
              animate={{ opacity: cursorVisible ? 1 : 0 }}
              transition={{ duration: 0.1 }}
              className="inline-block w-2 h-4 bg-green-400"
            ></motion.span>
          </code>
        </pre>
      </div>
    </div>
  )
}

