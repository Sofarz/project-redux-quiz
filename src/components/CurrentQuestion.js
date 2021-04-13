import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { quiz } from '../reducers/quiz'


export const CurrentQuestion = () => {
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex])
  const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex)
  const quizOver = useSelector((state) => state.quiz.quizOver)
  // const answer = useSelector((state) => state.quiz.answers.find((a) => a.questionId === question.id));
  const currentAnswer = useSelector((state) => state.quiz.answers[currentQuestionIndex])
  const answers = useSelector((state) => state.quiz.answers)
  // we can write it store instead of state(optional)

  const dispatch = useDispatch()

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>
  }

  const onButtonClick = (option, index) => {
        dispatch(quiz.actions.submitAnswer(
      { questionId: question.id, answerIndex: question.options.indexOf(option) }
    ))
    console.log(answers)
  }  
  
  return (
    <div className="quiz-container">
      <h1 className="question-text">Question: {question.questionText}</h1>
      {question.options.map((option, index) => (
        <button 
          option={option} 
          key={index}
          index={index} 
          correctAnswerIndex={question.correctAnswerIndex}
          onClick={() => onButtonClick(option, index)}
          disabled={currentAnswer}
          className={
            !currentAnswer
            ? 'button-default'
            : index === question.correctAnswerIndex
            ? 'green-border'
            : 'red-border'
          }
        >
          {option}
        </button>
        
      ))}
      

      <button className="next-question-button" onClick={() => dispatch(quiz.actions.goToNextQuestion())} type="button">
        Go to next question
      </button>
      <p> {currentQuestionIndex+1}/5 </p>
    </div>
  )
}
