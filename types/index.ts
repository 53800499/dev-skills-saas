export interface User {
  id: string
  name: string | null
  email: string | null
  image: string | null
}

export interface Test {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  userId: string
  questions: Question[]
}

export interface Question {
  id: string
  content: string
  type: "code" | "multiple-choice" | "true-false"
  testId: string
  options?: Option[]
}

export interface Option {
  id: string
  content: string
  isCorrect: boolean
  questionId: string
}

export interface TestResult {
  id: string
  score: number
  feedback: string
  createdAt: Date
  testId: string
  userId: string
}

