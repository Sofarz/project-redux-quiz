import React from 'react'


export const OptionButton = ({option, onButtonClick}) => {
    console.log(option)
    return(
        <div>
            <button onClick={onButtonClick}>{option}</button>
        </div>
    )
}