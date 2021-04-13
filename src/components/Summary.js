import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { quiz } from '../reducers/quiz'


export const Summary = () => {
    let counter = 0
    const summaryAnswers = useSelector((state) => state.quiz.answers)
    summaryAnswers.map(answer => {
        if (answer.isCorrect === true) {
            counter = counter + 1
        }
    })
    console.log(counter)
    return (counter)
}