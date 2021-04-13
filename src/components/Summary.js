import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { quiz } from '../reducers/quiz'

export const Summary = () => {
    const dispatch = useDispatch()
    let counter = 0
    const summaryAnswers = useSelector((state) => state.quiz.answers)
    summaryAnswers.map(answer => {
        if (answer.isCorrect === true) {
            counter = counter + 1
        }
    })
    console.log(counter)
    return (
        <>
            <div className="summary-container">
                <div className="summary-text">
                    {counter < 3 ?
                    <p>You answered {counter} out of 5 questions correctly. That is not that great TBH</p>
                    :
                    <p>You know your stuff! You answered {counter} out of 5 questions correctly</p>}
                </div>
             <button className="restart-button" onClick={() => dispatch(quiz.actions.restart())} type="button">
            Retake quiz
            </button>
            </div>
        </>
    )

}