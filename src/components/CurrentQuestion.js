import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { quiz } from '../reducers/quiz'

import { OptionButton } from './OptionButton'

export const CurrentQuestion = () => {
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex])
  const quizOver = useSelector((state) => state.quiz.quizOver)
  // we can write it store instead of state(optional)

  const dispatch = useDispatch()

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>
  }

  return (
    <div>
      <h1>Question: {question.questionText}</h1>
      {question.options.map((option) => (
        <OptionButton option={option} key={option}/>
      ))}

      <button onClick={() => dispatch(quiz.actions.goToNextQuestion())} type="button">
        Go to next question
      </button>
    </div>
  )
}
