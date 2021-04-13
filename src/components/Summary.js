import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { quiz } from '../reducers/quiz'

export const Summary = () => {
    const dispatch = useDispatch()
    let counter = 0
    const summaryAnswers = useSelector((state) => state.quiz.answers)
    summaryAnswers.forEach((answer) => {
        if (answer.isCorrect === true) {
            return (counter = counter + 1)
        }
    })

    return (
        <>
            <div className="summary-container">
                <div className="summary-text">
                    {counter < 3 ?
                    <p>You answered {counter} out of 5 questions correctly. The force is not strong in this one...</p>
                    :
                    <p>You know your stuff! You answered {counter} out of 5 questions correctly. The force is with you!</p>}
                </div>
             <button className="restart-button" onClick={() => dispatch(quiz.actions.restart())} type="button">
            Retake quiz
            </button>
            </div>
        </>
    )

}