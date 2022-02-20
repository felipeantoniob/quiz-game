import { Button, Col, Form, Row } from 'react-bootstrap'
import { Category, Difficulty, QuizSettingsProps } from '../interfaces/index'

const QuizSettings = ({
  categoryOptions,
  setCategory,
  setDifficulty,
  setNumberOfQuestions,
  startTrivia,
}: QuizSettingsProps): JSX.Element => {
  let chosenCategory: React.SetStateAction<Category[]>
  const categorySelectHandler: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    chosenCategory = categoryOptions.filter((item) => item.name === e.target.value)
    setCategory(chosenCategory[0])
  }

  const categoryOptionsSelect = categoryOptions.map((item, index) => {
    return (
      <option key={index} value={item.name} data-key={item.id}>
        {item.name}
      </option>
    )
  })

  const totalNumberOfQuestions = []
  for (let i = 1; i <= 50; i += 1) {
    totalNumberOfQuestions.push(
      <option key={i} value={i}>
        {i}
      </option>
    )
  }
  return (
    <div>
      <Form className="question-card justify-content-center rounded shadow mb-3 px-5 py-5">
        <Form.Group controlId="length" className="pb-3">
          <Form.Label>Number of Questions:</Form.Label>
          <Form.Control
            as="select"
            className="select"
            defaultValue="10"
            onChange={(e) => {
              setNumberOfQuestions(parseInt(e.target.value))
            }}
          >
            {totalNumberOfQuestions}
          </Form.Control>
        </Form.Group>
        <Form.Group className="pb-3">
          <Form.Label>Select Category:</Form.Label>
          <Form.Control as="select" className="select" onChange={categorySelectHandler}>
            <option key="" value="">
              Any Category
            </option>
            {categoryOptionsSelect}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="difficulty" className="pb-3">
          <Form.Label>Select Difficulty:</Form.Label>
          <Form.Control
            as="select"
            className="select"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setDifficulty(e.target.value as Difficulty)
            }}
          >
            <option value={Difficulty.ANY}>Any Difficulty</option>
            <option value={Difficulty.EASY}>Easy</option>
            <option value={Difficulty.MEDIUM}>Medium</option>
            <option value={Difficulty.HARD}>Hard</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Button className="d-flex start-btn mb-3 fs-3" size="lg" onClick={startTrivia}>
            Start
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default QuizSettings
