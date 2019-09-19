import React from 'react'
import PropTypes from 'prop-types'

import languageContext from '../contexts/languageContext'
import guessedWordsContext from '../contexts/guessedWordsContext'
import stringModule from '../helpers/strings'

const GuessedWords = () => {
    const [guessedWords] = guessedWordsContext.useGuessedWord()
    const language = React.useContext(languageContext)
    let contents
    if (guessedWords.length === 0) {
        contents = (
            <span data-test='guess-instructions'>
                {stringModule.getStringByLanguage(language, 'guessPrompt')}
            </span>
        )
    } else {
        const guessedWordsRows = guessedWords.map((word, index) => (
            <tr data-test='guessed-word' key={index}>
                <td>{index + 1}</td>
                <td>{word.guessedWord}</td>
                <td>{word.letterMatchCount}</td>
            </tr>
        ))
        contents = (
            <div data-test='guessed-words'>
                <h3>{stringModule.getStringByLanguage(language, 'guessedWords')}</h3>
                <table className='table table-sm'>
                    <thead className='thead-light'>
                        <tr>
                            <th>#</th>
                            <th>{stringModule.getStringByLanguage(language, 'guessColumnReader')}</th>
                            <th>{stringModule.getStringByLanguage(language, 'matchingLettersColumnHeader')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guessedWordsRows}
                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <div data-test='component-guessed-words'>
            {contents}
        </div>
    )
}

GuessedWords.propTypes = {
    guessedWords: PropTypes.arrayOf(
        PropTypes.shape({
            guessedWord: PropTypes.string.isRequired,
            letterMatchCount: PropTypes.number.isRequired
        })
    )
}.isRequired



export default GuessedWords