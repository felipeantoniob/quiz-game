import { Button, Col, Form, Row } from 'react-bootstrap'

import { QuizResultsProps } from '../interfaces'
import { decodeHtml } from '../utils/decodeHtml'

const QuizResults = ({
  numberOfQuestions,
  resetGame,
  score,
  userAnswers,
}: QuizResultsProps): JSX.Element => {
  return (
    <div>
      <Form className="question-card justify-content-center text-center rounded shadow mb-3 px-5 py-3">
        <Form.Label className="fs-1 mb-5">Results</Form.Label>
        <h1 className="mb-5">
          You got {score}/{numberOfQuestions} correct answers!
        </h1>
        {userAnswers.map((item, index) => {
          return (
            <div key={index} className="mb-5">
              <p>
                Question {index + 1}: {decodeHtml(item.question)}
              </p>
              <p>Your Answer: {decodeHtml(item.answer)}</p>
              <p>Correct Answer: {decodeHtml(item.correctAnswer)}</p>
            </div>
          )
        })}
        <Form.Group controlId="Results" className="pb-3"></Form.Group>
      </Form>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Button className="replay-btn mt-3 mb-5 fs-1" onClick={resetGame}>
            Play Again
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default QuizResults
