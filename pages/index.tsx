import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import QuestionCard from '../components/QuestionCard'
import { AnswerObject, Category, Difficulty, QuestionState } from '../interfaces/index'
import { fetchQuizQuestions } from './api/fetchQuizQuestions'
import { decodeHtml } from '../utils/decodeHtml'

export default function Home(): JSX.Element {
  const [category, setCategory] = useState<Category>()
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([])
  const [difficulty, setDifficulty] = useState('easy')
  const [gameOver, setGameOver] = useState(true)
  const [loading, setLoading] = useState(false)
  const [number, setNumber] = useState(0)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [score, setScore] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [numberOfQuestions, setNumberOfQuestions] = useState(10)

  let chosenCategory: React.SetStateAction<Category[]>

  const categorySelectHandler: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    chosenCategory = categoryOptions.filter((item) => item.name === e.target.value)

    setCategory(chosenCategory[0])
  }

  useEffect(() => {
    const getCategoryOptions = async (): Promise<void> => {
      const endpoint = 'https://opentdb.com/api_category.php'
      const response = await fetch(endpoint)
      const data = await response.json()
      setCategoryOptions(data.trivia_categories)
      // console.log(data.trivia_categories);
    }
    getCategoryOptions()
  }, [])

  // useEffect(() => {
  //   console.log(category)
  // }, [category])

  useEffect(() => {
    console.log(userAnswers)
  }, [userAnswers])

  const categoryOptionsSelect = categoryOptions.map((item, index) => {
    return (
      <option key={index} value={item.name} data-key={item.id}>
        {item.name}
      </option>
    )
  })

  const startTrivia = async (): Promise<void> => {
    setLoading(true)
    setGameOver(false)

    const newQuestions = await fetchQuizQuestions(numberOfQuestions, difficulty, category)

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1)
      // Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = (): void => {
    // Move on to the next question if not the last question
    const nextQuestion = number + 1
    console.log(nextQuestion)
    if (nextQuestion === numberOfQuestions) {
      // setGameOver(true)
      console.log('nextQuestion === numberOfQuestions')
    } else {
      setNumber(nextQuestion)
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="App vh-100 text-white">
        <Container>
          <h1 className="text-center text-white pt-5 pb-3 fw-bold">NEXTJS QUIZ</h1>
          <Row className="justify-content-center">
            <Col xs={12} lg={9}>
              {gameOver && (
                <div className="">
                  <Form className="question-card justify-content-center rounded shadow mb-3 px-5 py-5">
                    <Form.Group controlId="length" className="pb-3">
                      <Form.Label>Number of Questions:</Form.Label>
                      <Form.Control
                        as="select"
                        className="select"
                        defaultValue="10"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          setNumberOfQuestions(parseInt(e.target.value))
                        }}
                      >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
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
                          console.log(e)
                          setDifficulty(e.target.value)
                        }}
                      >
                        <option value={Difficulty.EASY}>Easy</option>
                        <option value={Difficulty.MEDIUM}>Medium</option>
                        <option value={Difficulty.HARD}>Hard</option>
                      </Form.Control>
                    </Form.Group>
                  </Form>
                  <Row className="justify-content-center">
                    <Col xs="auto">
                      <Button
                        className="d-flex start-btn mb-3 fs-3"
                        size="lg"
                        onClick={startTrivia}
                      >
                        Start
                      </Button>
                    </Col>
                  </Row>
                </div>
              )}
            </Col>
          </Row>

          {loading && (
            <Row className="justify-content-center p-5">
              <Col xs="auto">
                <Spinner animation="border" role="status" className="text-center"></Spinner>
              </Col>
            </Row>
          )}
          {!loading && !gameOver && (
            <p className="score text-center text-white fs-3">Score: {score}</p>
          )}

          {!loading && !gameOver && userAnswers.length !== numberOfQuestions && (
            <>
              {/* <p className="score text-center text-white fs-3">Score: {score}</p> */}
              <Row className="justify-content-center">
                <QuestionCard
                  questionNumber={number + 1}
                  totalQuestions={numberOfQuestions}
                  question={questions[number].question}
                  answers={questions[number].answers}
                  userAnswer={userAnswers ? userAnswers[number] : undefined}
                  checkAnswer={checkAnswer}
                />
              </Row>
            </>
          )}

          {userAnswers.length === numberOfQuestions && (
            <div>
              <Form className="question-card justify-content-center text-center rounded shadow mb-3 px-5 py-5">
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
                  <Button
                    className="replay-btn mt-3 mb-5 fs-1"
                    onClick={() => {
                      setGameOver(true)
                      setUserAnswers([])
                    }}
                  >
                    Play another round
                  </Button>
                </Col>
              </Row>
            </div>
          )}

          {!gameOver &&
          !loading &&
          userAnswers.length === number + 1 &&
          number !== numberOfQuestions - 1 ? (
            <Row className="justify-content-center">
              <Col xs="auto">
                <Button className="next-btn mt-3" size="lg" onClick={nextQuestion}>
                  Next Question
                </Button>
              </Col>
            </Row>
          ) : null}
        </Container>
      </main>
    </>
  )
}
