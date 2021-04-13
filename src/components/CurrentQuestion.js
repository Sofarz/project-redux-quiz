import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { quiz } from '../reducers/quiz'

export const CurrentQuestion = () => {
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex])
  const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex)
  const answers = useSelector((state) => state.quiz.answers)

  const dispatch = useDispatch()

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>
  }

  const onButtonClick = (option) => {
    dispatch(quiz.actions.submitAnswer(
      { questionId: question.id, answerIndex: question.options.indexOf(option) }
    ))
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
    <div className="quiz-body">
      <div className="quiz-container">
        <h1 className="question-text"> Question: {question.questionText}</h1>
        {question.options.map((option, index) => (
          <button
            type="button"
            key={index}
            index={index}
            onClick={() => onButtonClick(option, index)}
            disabled={answers[currentQuestionIndex]}
            className={chooseColor(index)}>
            {option}
          </button>
        ))}
        <button disabled={!answers[currentQuestionIndex]} className="next-question-button" onClick={() => dispatch(quiz.actions.goToNextQuestion())} type="button">
          {currentQuestionIndex < 4 ? 
          "Go to next question" : "Finish"
          }
        </button>
        <p className="current-counter"> {currentQuestionIndex + 1}/5 </p>
      </div>
    </div>
  )
}
