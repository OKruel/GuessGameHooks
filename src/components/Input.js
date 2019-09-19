import React from 'react'
import Proptypes from 'prop-types'

import successContext from '../contexts/successContext'
import languageContext from '../contexts/languageContext'
import guessedWordsContext from '../contexts/guessedWordsContext'

import stringsModule from '../helpers/strings'
import { getLetterMatchCount } from '../helpers/index'
import GuessedWords from './GuessedWords'

const Input = props => {
    //*State from Context
    const language = React.useContext(languageContext)
    const [success, setSuccess] = successContext.useSuccess()
    const [guessedWords, setguessedWord] = guessedWordsContext.useGuessedWord()
    //*Local state
    const [currentGuess, setCurrentGuess] = React.useState('')

    if (success) return null

    return (
        <div data-test='component-input'>
            {props.secretWord}
            <form className='form-inline'>
                <input
                    data-test='input-box'
                    className='mb-2 mx-sm-3'
                    type='text'
                    placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
                    value={currentGuess}
                    onChange={event => setCurrentGuess(event.target.value)}
                />
                <button
                    data-test='submit-button'
                    className='btn btn-primary mb-2'
                    onClick={event => {
                        event.preventDefault()
                        //*Checking how many equal letters the guess and the secret word have
                        const letterMatchCount = getLetterMatchCount(currentGuess, props.secretWord)
                        const newGuessedWords = [...guessedWords, {guessedWord: currentGuess, letterMatchCount} ]
                        setguessedWord(newGuessedWords)

                        if (currentGuess === props.secretWord) {
                            setSuccess(true)
                        }
                        setCurrentGuess('')
                    }}
                >{stringsModule.getStringByLanguage(language, 'submit')}</button>
            </form>
        </div>
    )
}

Input.propTypes = {
    secretWord: Proptypes.string.isRequired
}


export default Input