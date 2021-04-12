// Hello everyone?
import { createSlice } from '@reduxjs/toolkit'
// Change these to your own questions! store ALL questions in quiz here!
const questions = [
  { id: 1, questionText: "What was the name of Han Solo's ship?", options: ["Bacon Millennium", "Yolo Yoda", "Millennium Falcon", "Snabb Fågel"], correctAnswerIndex: 2 },
  { id: 2, questionText: "Who was the director of Star Wars IV: A New Hope?", options: ["Quentin Tarantino", "George Lucas", "J.J. Abrams", "Michael Bay", "Steven Spielberg"], correctAnswerIndex: 1 },
  { id: 3, questionText: "What is the name of the mysterious power used throughout Star Wars by the Jedi and Sith? ", options: ["Schnapps","Jante Lagen", "The One Ring To Rule Them All", "Nuclear Power", "The Hammer", "The Force"], correctAnswerIndex: 5},
  { id: 4, questionText: "What was the name of Princess Leia's planet?", options: ["Kepler 22B","Tatooine", "Naboo", "Alderaan", "Mars"], correctAnswerIndex: 3},
  { id: 5, questionText: "What was Leia's last name?", options: ["Organa","Skywalker", "Solo", "Dameron", "Fett"], correctAnswerIndex: 0}
]

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false
}

export const quiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {

    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      console.log('hey!')
      const { questionId, answerIndex } = action.payload
      const question = state.questions.find((q) => q.id === questionId)

      if (!question) {
        throw new Error('Could not find question! Check to make sure you are passing the question id correctly.')
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(`You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`)
      }



      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex
      })
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true
      } else {
        state.currentQuestionIndex += 1
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState
    }

  }
})
