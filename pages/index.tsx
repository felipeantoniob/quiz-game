import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'

import QuestionCard from '../components/QuestionCard'
import QuizResults from '../components/QuizResults'
import QuizSettings from '../components/QuizSettings'
import { AnswerObject, Category, Difficulty, QuestionState } from '../interfaces/index'
import { fetchQuizQuestions } from './api/fetchQuizQuestions'

export default function Home(): JSX.Element {
  const [category, setCategory] = useState<Category>()
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([])
  const [difficulty, setDifficulty] = useState<Difficulty>()
  const [gameOver, setGameOver] = useState(true)
  const [loading, setLoading] = useState(false)
  const [numberOfQuestions, setNumberOfQuestions] = useState(10)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [score, setScore] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])

  useEffect(() => {
    const getCategoryOptions = async (): Promise<void> => {
      try {
        const endpoint = 'https://opentdb.com/api_category.php'
        const response = await fetch(endpoint)
        const data = await response.json()
        const categories = data.trivia_categories
        setCategoryOptions(categories)
      } catch (err) {
        console.log(err)
      }
    }
    getCategoryOptions()
  }, [])

  const startTrivia: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setLoading(true)
    setGameOver(false)
    const newQuestions = await fetchQuizQuestions(numberOfQuestions, difficulty, category)

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setQuestionNumber(0)
    setLoading(false)
  }

  const checkAnswer: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!gameOver) {
      const question = questions[questionNumber].question
      const answer = e.currentTarget.value
      const correctAnswer = questions[questionNumber].correct_answer
      const correct = correctAnswer === answer
      if (correct) setScore((prev) => prev + 1)
      const answerObject = {
        question: question,
        answer,
        correct,
        correctAnswer: correctAnswer,
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion: React.MouseEventHandler<HTMLButtonElement> = () => {
    const nextQuestion = questionNumber + 1
    if (nextQuestion === numberOfQuestions) {
      // setGameOver(true)
    } else {
      setQuestionNumber(nextQuestion)
    }
  }

  const resetGame: React.MouseEventHandler<HTMLButtonElement> = () => {
    setGameOver(true)
    setUserAnswers([])
    setNumberOfQuestions(10)
  }

  return (
    <>
      <Head>
        <title>Quiz App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="App vh-100 text-white">
        <Container>
          <h1 className="text-center text-white pt-5 pb-3 fw-bold">QUIZ GAME</h1>

          <Row className="justify-content-center">
            <Col xs={12} lg={9}>
              {gameOver && (
                <QuizSettings
                  setNumberOfQuestions={setNumberOfQuestions}
                  startTrivia={startTrivia}
                  categoryOptions={categoryOptions}
                  setCategory={setCategory}
                  setDifficulty={setDifficulty}
                />
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

          {!loading && !gameOver && userAnswers.length !== numberOfQuestions && (
            <p className="text-center text-white fs-3">Score: {score}</p>
          )}

          {!loading && !gameOver && userAnswers.length !== numberOfQuestions && (
            <>
              <Row className="justify-content-center mx-1">
                <Col xs="auto" className="question-card rounded text-center shadow px-5">
                  <QuestionCard
                    questionNumber={questionNumber + 1}
                    totalQuestions={numberOfQuestions}
                    question={questions[questionNumber]?.question}
                    answers={questions[questionNumber]?.answers}
                    userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
                    checkAnswer={checkAnswer}
                  />
                </Col>
              </Row>
            </>
          )}

          {userAnswers.length === numberOfQuestions && (
            <div>
              <QuizResults
                score={score}
                numberOfQuestions={numberOfQuestions}
                userAnswers={userAnswers}
                resetGame={resetGame}
              />
            </div>
          )}

          {!gameOver &&
            !loading &&
            userAnswers.length === questionNumber + 1 &&
            questionNumber !== numberOfQuestions - 1 && (
              <Row className="justify-content-center">
                <Col xs="auto">
                  <Button className="next-btn mt-3" size="lg" onClick={nextQuestion}>
                    Next Question
                  </Button>
                </Col>
              </Row>
            )}
        </Container>
      </main>
    </>
  )
}
