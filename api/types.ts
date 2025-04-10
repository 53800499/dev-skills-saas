// Types pour les tests
export interface Test {
  id: string
  title: string
  description: string
  duration: number // en minutes
  difficulty: "easy" | "medium" | "hard"
  skills: string[]
  questions: Question[]
  createdAt: string
  updatedAt: string
}

export interface Question {
  id: string
  type: "multiple_choice" | "coding" | "open_ended"
  content: string
  options?: string[]
  correctAnswer?: string | string[]
  points: number
}

// Types pour les candidats
export interface Candidate {
  id: string
  name: string
  email: string
  status: "invited" | "active" | "completed"
  invitedAt: string
  completedAt?: string
}

// Types pour les soumissions
export interface Submission {
  id: string
  testId: string
  candidateId: string
  answers: Answer[]
  startedAt: string
  completedAt?: string
  score?: number
  maxScore?: number
  status: "in_progress" | "completed" | "evaluated"
}

export interface Answer {
  questionId: string
  value: string | string[]
  codeLanguage?: string
  isCorrect?: boolean
  score?: number
  feedback?: string
}

// Types pour les analytics
export interface AnalyticsData {
  totalTests: number
  totalCandidates: number
  totalSubmissions: number
  averageScore: number
  completionRate: number
  skillPerformance: {
    skill: string
    averageScore: number
  }[]
  testPerformance: {
    testId: string
    testTitle: string
    averageScore: number
    submissions: number
  }[]
  timeDistribution: {
    date: string
    submissions: number
  }[]
}

