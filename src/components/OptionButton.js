import React from 'react'
import { useSelector } from 'react-redux'


export const OptionButton = ({ option, onButtonClick, correctAnswerIndex, index }) => {
    const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex)
    const currentAnswer = useSelector((state) => state.quiz.answers[currentQuestionIndex])

    // console.log(currentAnswer)

    // const handleButtonStyling = () => {
    //     if (currentAnswer === undefined) {
    //         //neutral className for button. Add 2 more if statements to determine
               //if answer was correct or not
    //     }
    //     return 'green-border'
    // }

    return(
        <div>
            <button 
                type="button"
                // className={handleButtonStyling()}
                // className={index === correctAnswerIndex ? 'green-border' : 'red-border'}
                onClick={onButtonClick}>
                    {option}
            </button>
        </div>
    )
}