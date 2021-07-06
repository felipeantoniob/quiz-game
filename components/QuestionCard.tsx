import { Col, Button } from 'react-bootstrap'
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
  <Col xs="auto" className="question-card rounded text-center shadow px-5">
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
  </Col>
)

export default QuestionCard
