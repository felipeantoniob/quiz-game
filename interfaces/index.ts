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

export type Difficulty = 'easy' | 'medium' | 'hard' | ''

export type Question = {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

export interface QuestionCardProps {
  answers: string[]
  checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void
  question: string
  questionNumber: number
  totalQuestions: number
  userAnswer: AnswerObject | undefined
}

export interface QuizSettingsProps {
  categoryOptions: Category[]
  setCategory: (category: Category) => void
  setDifficulty: (difficulty: Difficulty) => void
  setNumberOfQuestions: (numberOfQuestions: number) => void
  startTrivia: React.MouseEventHandler<HTMLElement>
}

export interface QuizResultsProps {
  score: number
  numberOfQuestions: number
  userAnswers: AnswerObject[]
  resetGame: React.MouseEventHandler<HTMLButtonElement>
}

export type QuestionState = Question & { answers: string[] }
