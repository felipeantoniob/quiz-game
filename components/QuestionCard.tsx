import { Button } from 'react-bootstrap'
import { QuestionCardProps } from '../interfaces/index'
import { decodeHtml } from '../utils/decodeHtml'

const QuestionCard = ({
  answers,
  checkAnswer,
  question,
  questionNumber,
  totalQuestions,
  userAnswer,
}: QuestionCardProps): JSX.Element => (
  <>
    <p className="number pt-4">
      Question: {questionNumber} / {totalQuestions}
    </p>
    <p className="pb-3">{decodeHtml(question)}</p>
    <div className="pb-3">
      {answers.map((answer) => (
        <div key={answer} className="d-grid gap-2">
          <Button
            disabled={!!userAnswer}
            value={answer}
            onClick={checkAnswer}
            className="answer-btn mb-3 fs-3"
          >
            {decodeHtml(answer)}
          </Button>
        </div>
      ))}
    </div>
  </>
)

export default QuestionCard
