import React from 'react'

import { shallow, mount } from 'enzyme'

import guessedWordContext from './guessedWordsContext'

const FunctionalComponent = () => {
    guessedWordContext.useGuessedWord();
    return (
        <div></div>
    )
}
test('useGuessedWord throws an error when not wrapped in GuessWordProvider ', () => {
    expect(() => {
        shallow(<FunctionalComponent />)
    }).toThrow('useGuessedWord must be inside of GuessedWordProvider')
});
test('useGuessedWord does not throws an error when wrapped in GuessedWordProvider ', () => {
    expect(() => {
        mount(
            <guessedWordContext.GuessedWordProvider>
                <FunctionalComponent />
            </guessedWordContext.GuessedWordProvider>
        )
    }).not.toThrow()
});