export type Question = {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

export type QuestionState = Question & { answers: string[] }

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

export type Category = {
  name: string
  id: number
}

export interface QuestionCardProps {
  answers: string[]
  checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void
  question: string
  questionNumber: number
  totalQuestions: number
  userAnswer: AnswerObject | undefined
}
