import { shuffleArray } from '../../utils/shuffleArray'
import { Category, Question, QuestionState, Difficulty } from '../../interfaces/index'

export const fetchQuizQuestions = async (
  numberOfQuestions: number,
  difficulty: Difficulty | undefined,
  category: Category | undefined
): Promise<QuestionState[]> => {
  try {
    const endpoint = `https://opentdb.com/api.php?type=multiple&amount=${numberOfQuestions}${
      difficulty ? `&difficulty=${difficulty}` : ''
    }${category ? `&category=${category.id}` : ''}`

    const response = await fetch(endpoint)
    const data = await response.json()

    return data.results.map((question: Question) => ({
      ...question,
      answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
    }))
  } catch (error) {
    console.error(error)
    throw error
  }
}
