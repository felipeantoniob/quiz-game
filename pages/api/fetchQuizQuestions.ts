import { shuffleArray } from '../../utils/shuffleArray'
import { Category, Question, QuestionState } from '../../interfaces/index'

export const fetchQuizQuestions = async (
  numberOfQuestions: number,
  // difficulty: Difficulty
  difficulty: string,
  category: Category
): Promise<QuestionState[]> => {
  try {
    const endpoint = `https://opentdb.com/api.php?amount=${numberOfQuestions}&difficulty=${difficulty}&type=multiple&category=${
      category ? category.id : ''
    }`
    const data = await (await fetch(endpoint)).json()
    return data.results.map((question: Question) => ({
      ...question,
      answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
    }))
  } catch (err) {
    console.log(err)
  }
}
