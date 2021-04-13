import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { quiz } from '../reducers/quiz'

export const CurrentQuestion = () => {
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex])
  const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex)
  // const currentAnswer = useSelector((state) => state.quiz.answers[currentQuestionIndex])
  const answers = useSelector((state) => state.quiz.answers)

  const dispatch = useDispatch()

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>
  }

  const onButtonClick = (option) => {
    dispatch(quiz.actions.submitAnswer(
      { questionId: question.id, answerIndex: question.options.indexOf(option) }
    ))
    console.log(answers)
  }

  const chooseColor = (index) => {
    // Should only happen after an answer is present
    if (answers[currentQuestionIndex]) {
      // Check if it's correct & check if it's the user's chosen answer
      if (index === question.correctAnswerIndex && index === answers[currentQuestionIndex].answerIndex) {
        return 'green-border'
      // Check if it's the user's chosen answer (and not correct since it didn't match the previous condition)
      } else if (index === answers[currentQuestionIndex].answerIndex) {
        return 'red-border'
      }
    }
  }

  return (
    <div className="quiz-container">
      <h1 className="question-text">Question: {question.questionText}</h1>
      {question.options.map((option, index) => (
        <button
          type="button"
          option={option}
          key={index}
          index={index}
          correctAnswerIndex={question.correctAnswerIndex}
          onClick={() => onButtonClick(option, index)}
          disabled={answers[currentQuestionIndex]}
          className={chooseColor(index)}>
          {option}
        </button>

      ))}

      <button className="next-question-button" onClick={() => dispatch(quiz.actions.goToNextQuestion())} type="button">
        Go to next question
      </button>
      <p> {currentQuestionIndex + 1}/5 </p>
    </div>
  )
}
